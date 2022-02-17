import express from "express";
import Student from "../../models/Student.js";
import { adminAuth, studentAuth } from "../../middleware/auth.js";

const router = express.Router();

// @route   GET /api/student
// @desc   get all students
// @access   private
router.get("/", adminAuth, async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }).sort({
      createdAt: -1,
    });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ success: false, msg: error.message });
    console.log(err);
  }
});

// @route   POST /api/student
// @desc   create a student
// @access   private
router.post("/", adminAuth, async (req, res) => {
  const student = req.body;

  const newStudent = new Student({
    ...student,
    createdBy: req.admin.email,
  });

  try {
    // save newItem
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   DELETE /api/student/:id
// @desc   remove a student
// @access   private
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student)
      res.status(404).json({ success: false, msg: "No Student Found!" });

    const queryRes = await Student.deleteOne(student);
    res.status(200).json({ _id: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, msg: error.message });
    console.log(err);
  }
});

// @route   POST /api/student/password/reset
// @desc   reset student password
// @access   private
router.post("/password/reset", studentAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "Provide all fields!" });
    }

    // check password length
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password length must be greater than 6!" });
    }

    // check if currentPassword is same
    const student = await Student.findById(req.student._id);

    if (currentPassword !== student.password) {
      return res.status(400).json({ msg: "Incorrect password!" });
    }

    // everything is correct at this point(update password)
    student.password = newPassword;
    await student.save();

    res.status(200).json({ msg: "Password changed successfuly." });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

export default router;
