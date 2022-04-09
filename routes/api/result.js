import express from "express";

import Result from "../../models/Result.js";
import Student from "../../models/Student.js";
import { studentAuth, adminAuth } from "../../middleware/auth.js";

const router = express.Router();

// @route   POST /api/result
// @desc   create new result data
// @access   private
router.post("/", adminAuth, async (req, res) => {
  try {
    const resultData = req.body;

    // check if student exists with this enrollNo
    const student = await Student.findOne({ enrollNo: resultData.enrollNo });
    if (!student)
      return res
        .status(404)
        .json({ msg: "No Student Found with given enrollment number!" });

    // validate and filter subjects array
    let emptyField = false;
    const newSubjects = resultData.subjects.map((subject, idx) => {
      const filteredSubjectData = subject;

      // iterate over eact object item
      for (const [key, value] of Object.entries(subject)) {
        if (value === "") {
          // check if object contains empty fields
          emptyField = true;
          return;
        }

        // convert string to number
        if (key === "marks") {
          filteredSubjectData[key] = parseFloat(value);
        } else if (key === "fullMarks" || key === "passMarks") {
          filteredSubjectData[key] = parseInt(value);
        }
        // console.log(`${key}: ${value}`);
      }

      return filteredSubjectData;
    });

    if (emptyField)
      return res.status(400).json({ msg: "Please fill all fields!" });

    // create new result
    const newResult = new Result({
      ...resultData,
    });

    // calculate new percentage
    let totalMarksObtained = 0;
    let totalMarks = 0;

    newResult.subjects.forEach((sub) => {
      totalMarksObtained += parseFloat(sub.marks);
      totalMarks += parseInt(sub.fullMarks);
    });

    let newPercentage = parseFloat((totalMarksObtained / totalMarks) * 100);

    // change the data
    newResult.percentage = parseFloat(newPercentage.toFixed(2));
    // append other student datas
    newResult.studentName = student.name;
    newResult.session = student.session;

    // save
    await newResult.save();

    return res.status(200).json({ msg: "Result Data Created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

// @route   GET /api/result/get?enroll=xyz&semester=xyz&type=xyz
// @desc   find a student result by enroll no and semester
// @access   private
router.get("/get", adminAuth, async (req, res) => {
  try {
    const enroll = req.query.enroll;
    const semester = req.query.semester;
    const type = req.query.type;

    const result = await Result.findOne({
      enrollNo: enroll,
      semester: semester,
      examType: type,
    });

    if (!result)
      return res.status(404).json({ success: false, msg: "No Result Found!" });

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   PUT /api/result/:id
// @desc   update result data
// @access   private
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const newSubjects = req.body.subjects;
    const id = req.params.id;
    const result = await Result.findById(id);

    if (!result)
      return res.status(404).json({ success: false, msg: "No Result Found!" });

    // calculate new percentage
    let totalMarksObtained = 0;
    let totalMarks = 0;

    newSubjects.forEach((sub) => {
      totalMarksObtained += sub.marks;
      totalMarks += sub.fullMarks;
    });

    let newPercentage = parseFloat((totalMarksObtained / totalMarks) * 100);

    // change the data and save
    result.subjects = newSubjects;
    result.percentage = parseFloat(newPercentage.toFixed(2));
    await result.save();

    return res.status(200).json({ msg: "Result Updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: err.message });
  }
});

// @route   DELETE /api/result/:id
// @desc   remove a result data
// @access   private
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result)
      return res
        .status(404)
        .json({ success: false, msg: "No Result data found!" });

    const queryRes = await Result.findByIdAndDelete(result._id);
    return res
      .status(200)
      .json({ _id: req.params.id, msg: "Result data deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   POST /api/result/generate
// @desc   generate result data (used by student to get result)
// @access   private - student
router.post("/generate", studentAuth, async (req, res) => {
  const { semester, branch, examType } = req.body;
  const session = req.body.session.trim();
  const enrollNo = req.body.enrollNo.trim();

  // check if all data is passed
  if (!enrollNo || !session || !semester || !branch) {
    return res.status(400).json({ msg: "Provide all details!" });
  }

  // find result data
  const result = await Result.findOne({
    enrollNo: enrollNo,
    session: session,
    semester: semester,
    branch: branch,
    examType: examType,
  });

  // if no result found
  if (!result) {
    return res.status(404).json({ msg: "No Result found for provided data!" });
  }

  // find Student data
  const student = await Student.findOne(
    {
      enrollNo: enrollNo,
      session: session,
      branch: branch,
    },
    // fetch only req data
    { fatherName: 1, motherName: 1 }
  );

  // if no Student data
  if (!student) {
    return res.status(404).json({ msg: "No Student found for provided data!" });
  }

  // check if loged In student is asking for his result only
  if (req.student.enrollNo !== enrollNo) {
    return res.status(401).json({ msg: "Can't access another's result!" });
  }

  // result & student data found at this point
  res
    .status(200)
    .json({ msg: "Result Generated.", result: result, student: student });
});

export default router;
