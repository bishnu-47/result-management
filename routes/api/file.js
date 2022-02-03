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
// @desc   upload and save file
// @access   private
router.post(
  "/upload-result-file",
  [adminAuth, upload.single("file")],
  async (req, res) => {
    const file = req.file;
    const { session, semester, branch } = req.body;

    // check for valid filetype
    if (!isFileValid(file.mimetype)) {
      fs.unlinkSync(uploadPath + "/" + file.filename); // remove unwanted saved file
      return res.status(400).json({ msg: "Only excel file accepted!" });
    }

    try {
      // parse data from excel
      const parsedData = parseExcelData(uploadPath + "/" + file.filename, {
        session,
        semester,
        branch,
      });

      // save to DB
      await Result.insertMany(parsedData);

      res.status(200).json({ msg: "file upload successful." });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  }
);

// function to check file extention
function isFileValid(mimetype) {
  const validFileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  return mimetype && validFileTypes.indexOf(mimetype) > -1;
}

// Import Excel File to MongoDB database
function parseExcelData(filePath, formData) {
  // -> Read Excel File to Json Data
  // get whole workbook
  try {
    const wb = xlxs.readFile(filePath);

    // get individual worksheets
    const resultWs = wb.Sheets["RESULT"];
    const legendWs = wb.Sheets["LEGEND"];

    // convert to JSON format
    const result = xlxs.utils.sheet_to_json(resultWs);
    const legend = xlxs.utils.sheet_to_json(legendWs);

    // filter result data
    const newParsedData = result.map((res) => {
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

export default router;
