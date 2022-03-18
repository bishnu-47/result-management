import express from "express";

import Result from "../../models/Result.js";
import Student from "../../models/Student.js";
import { studentAuth, adminAuth } from "../../middleware/auth.js";

const router = express.Router();

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

// @route   PUT /api/result
// @desc   update result data
// @access   private
router.put("/", adminAuth, async (req, res) => {
  try {
    const newSubjects = req.body.subjects;
    const id = req.body.id;
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
    return res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   POST /api/result
// @desc   get Result data based on given datas
// @access   private
router.post("/", studentAuth, async (req, res) => {
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
