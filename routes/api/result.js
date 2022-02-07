import express from "express";

import Result from "../../models/Result.js";
import Student from "../../models/Student.js";
import { studentAuth } from "../../middleware/auth.js";

const router = express.Router();

// @route   POST /api/result
// @desc   get Result data based on given datas
// @access   private
router.post("/", studentAuth, async (req, res) => {
  const { enrollNo, session, semester, branch } = req.body;

  // check if all data is passed
  if (!enrollNo || !session || !semester || !branch) {
    return res.status(401).json({ msg: "Provide all details!" });
  }

  // find result data
  const result = await Result.findOne({
    enrollNo: enrollNo,
    session: session,
    semester: semester,
    branch: branch,
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

  // result & student data found at this point
  res
    .status(200)
    .json({ msg: "Result data found.", result: result, student: student });
});

export default router;
