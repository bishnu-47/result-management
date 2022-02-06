import express from "express";
import Student from "../../models/Student.js";
import { adminAuth } from "../../middleware/auth.js";

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

export default router;
