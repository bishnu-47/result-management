// native packages
import fs from "fs";
import path from "path";
import util from "util";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// third party packages
import express from "express";
import multer from "multer";
import xlxs from "xlsx";

// custom files
import { adminAuth } from "../../middleware/auth.js";
import Result from "../../models/Result.js";
import Student from "../../models/Student.js";

const router = express.Router();

// path where to put file
const uploadPath = path.join(__dirname, "../../", "files", "uploads");
// multer file storage setup
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // create folder if dosen't exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    return cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// multer middleware
const upload = multer({ storage: fileStorageEngine });

// @route   POST /api/file/upload-result-file
// @desc   upload and save result file
// @access   private
router.post(
  "/upload-result-file",
  [adminAuth, upload.single("file")],
  async (req, res) => {
    const file = req.file;
    const { session, semester, branch, examType } = req.body;

    // check if All details are passed
    if (!session || !semester || !branch || !examType || !file) {
      return res.status(400).json({ msg: "Provide all data!" });
    }

    // check for valid filetype
    if (!isFileValid(file.mimetype)) {
      fs.unlinkSync(uploadPath + "/" + file.filename); // remove unwanted saved file
      return res.status(400).json({ msg: "Only excel file accepted!" });
    }

    try {
      // parse data from excel
      const parsedData = parseResultExcelData(
        uploadPath + "/" + file.filename,
        {
          session,
          semester,
          branch,
          examType,
        }
      );

      // save to DB
      await Result.insertMany(parsedData);

      res.status(200).json({ msg: "file upload successful." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  }
);

// @route   POST /api/file/upload-student-file
// @desc   upload and save student file
// @access   private
router.post(
  "/upload-student-file",
  [adminAuth, upload.single("file")],
  async (req, res) => {
    const file = req.file;
    const { session, branch } = req.body;

    // check for valid filetype
    if (!isFileValid(file.mimetype)) {
      fs.unlinkSync(uploadPath + "/" + file.filename); // remove unwanted saved file
      return res.status(400).json({ msg: "Only excel file accepted!" });
    }

    try {
      // parse data from excel
      const parsedData = parseStudentExcelData(
        uploadPath + "/" + file.filename,
        {
          session,
          branch,
          createdBy: req.admin.email,
        }
      );

      // save to DB
      await Student.insertMany(parsedData);

      res.status(200).json({ msg: "file upload successful." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  }
);

// @route   POST /api/file/get-student-file-template
// @desc   get template for Student file
// @access   private
router.get("/get-student-file-template", adminAuth, (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "files",
      "templates",
      "student-file-template.xlsx"
    );
    return res.status(200).download(filePath);
  } catch (err) {
    return res.status(500).json({ msg: "File Not Found!" });
  }
});

// @route   POST /api/file/get-student-file-sample
// @desc   get sample for Student file
// @access   private
router.get("/get-student-file-sample", adminAuth, (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "files",
      "samples",
      "student-file-sample.xlsx"
    );
    return res.status(200).download(filePath);
  } catch (err) {
    return res.status(500).json({ msg: "File Not Found!" });
  }
});

// @route   POST /api/file/get-result-file-template
// @desc   get template for Result file
// @access   private
router.get("/get-result-file-template", adminAuth, (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "files",
      "templates",
      "result-file-template.xlsx"
    );
    return res.download(filePath);
  } catch (err) {
    return res.status(500).json({ msg: "File Not Found!" });
  }
});

// @route   POST /api/file/get-result-file-sample
// @desc   get sample for Result file
// @access   private
router.get("/get-result-file-sample", adminAuth, (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../",
      "files",
      "samples",
      "result-file-sample.xlsx"
    );
    return res.status(200).download(filePath);
  } catch (err) {
    return res.status(500).json({ msg: "File Not Found!" });
  }
});

// function to check file extention
function isFileValid(mimetype) {
  const validFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  return mimetype && validFileTypes.indexOf(mimetype) > -1;
}

// parse and filter result excel sheet
function parseResultExcelData(filePath, formData) {
  // -> Read Excel File to Json Data
  try {
    // get whole workbook
    const wb = xlxs.readFile(filePath);

    // get individual worksheets
    const resultWs = wb.Sheets["RESULT"];
    const legendWs = wb.Sheets["LEGEND"];

    // check if worksheets are avaliable
    if (!resultWs || !legendWs) {
      throw new Error("Wrong Worksheet format!");
    }

    // convert to JSON format
    const result = xlxs.utils.sheet_to_json(resultWs);
    const legend = xlxs.utils.sheet_to_json(legendWs);

    // filter result data
    const newParsedData = result.map((res) => {
      // check if required columns are given
      if (!res["Enrollment No."] || !res["Student Name"]) {
        throw new Error("Invalid Worksheet format!");
      }

      // store enroll & name
      const enroll = res["Enrollment No."];
      const name = res["Student Name"];
      // delte unwanted keys from obj
      delete res["S.No"];
      delete res["Student Name"];
      delete res["Enrollment No."];

      let totalMarksObtained = 0;
      let totalMarks = 0;
      // create subjects array
      const subjects = Object.keys(res).map((key) => {
        // find correct subject from <legend>
        const sub = legend.find(
          (legendSub) => legendSub["Subject Code"] === key
        );

        // store req values
        const newObj = {};
        newObj.subjectCode = key;
        newObj.marks = res[key];
        newObj.subjectName = sub["Subject Name"];
        newObj.fullMarks = sub["Full Marks"];
        newObj.passMarks = sub["Pass Marks"];

        totalMarksObtained += res[key];
        totalMarks += sub["Full Marks"];

        return newObj;
      });
      let percentage = parseFloat((totalMarksObtained / totalMarks) * 100);

      // create a new Obj
      const newResultObj = {};

      newResultObj.enrollNo = enroll;
      newResultObj.studentName = name;
      newResultObj.session = formData.session;
      newResultObj.branch = formData.branch;
      newResultObj.semester = formData.semester;
      newResultObj.examType = formData.examType;
      newResultObj.subjects = subjects;
      newResultObj.percentage = parseFloat(percentage.toFixed(2));

      return newResultObj;
    });

    // remove file after parsing is done
    fs.unlinkSync(filePath);

    // console.log(util.inspect(newParsedData, false, null, true));
    return newParsedData;
  } catch (err) {
    throw err;
  }
}

// parse and filter student excel sheet
function parseStudentExcelData(filePath, formData) {
  // -> Read Excel File to Json Data
  try {
    // get whole workbook
    const wb = xlxs.readFile(filePath);

    // get individual worksheets
    const studentWs = wb.Sheets["STUDENT DETAILS"];
    //check if worksheet is present
    if (!studentWs) {
      throw new Error("Invalid worksheet format!");
    }

    // convert to JSON format
    const students = xlxs.utils.sheet_to_json(studentWs);

    // filter result data
    const newParsedData = students.map((student) => {
      //check if required columns are given
      if (
        !student["Name"] ||
        !student["Email"] ||
        !student["Mobile No."] ||
        !student["Father's Name"] ||
        !student["Mother's Name"] ||
        !student["Enrollment No."]
      ) {
        throw new Error("Invalid worksheet format!");
      }

      // delete unwanted keys from obj
      delete student["S.No."];

      // create new student obj
      const newStudentObj = {};

      // personal details
      newStudentObj.name = student["Name"];
      newStudentObj.email = student["Email"];
      newStudentObj.mobileNo = student["Mobile No."];
      newStudentObj.fatherName = student["Father's Name"];
      newStudentObj.motherName = student["Mother's Name"];
      // acadamic details
      newStudentObj.branch = formData.branch;
      newStudentObj.enrollNo = student["Enrollment No."];
      newStudentObj.session = formData.session;

      // others
      newStudentObj.password = newStudentObj.enrollNo;
      newStudentObj.createdBy = formData.createdBy;

      return newStudentObj;
    });

    // remove file after parsing is done
    fs.unlinkSync(filePath);

    // console.log(util.inspect(newParsedData, false, null, true));
    return newParsedData;
  } catch (err) {
    throw err;
  }
}

export default router;
