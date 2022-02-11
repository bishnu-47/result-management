import express from "express";

import Result from "../../models/Result.js";
import Student from "../../models/Student.js";
import { studentAuth } from "../../middleware/auth.js";

const router = express.Router();

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
