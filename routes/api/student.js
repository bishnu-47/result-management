import express from "express";
import Student from "../../models/Student.js";
import { adminAuth, studentAuth } from "../../middleware/auth.js";

const router = express.Router();

// @route   POST /api/student
// @desc   create a student
// @access   private
router.post("/", adminAuth, async (req, res) => {
  const student = req.body;

  try {
    const newStudent = new Student({
      ...student,
      createdBy: req.admin.email,
    });

    // check if student already exists
    const existingStudent = await Student.findOne({
      enrollNo: newStudent.enrollNo,
    });
    if (existingStudent)
      return res.status(400).json({ msg: "Student already exists" });

    // create default password = enrollNo
    newStudent.password = newStudent.enrollNo;

    // save newItem
    await newStudent.save();
    return res
      .status(201)
      .json({ msg: "Student created successfully.", data: newStudent });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   GET /api/student
// @desc   get all students
// @access   private
router.get("/", adminAuth, async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }).sort({
      createdAt: -1,
    });
    return res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   GET /api/student/:id
// @desc   get single student data
// @access   private
router.get("/:id", adminAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findById(id, { password: 0 });

    if (!student) return res.status(404).json({ msg: "Student not found!" });

    return res.status(201).json({ msg: "Student Data Found.", data: student });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   PUT /api/student/:id
// @desc   upadate a student
// @access   private
router.put("/:id", adminAuth, async (req, res) => {
  const id = req.params.id;
  const student = req.body;

  try {
    const queryRes = await Student.findByIdAndUpdate(id, { ...student });

    if (!queryRes) return res.status(404).json({ msg: "Student not found!" });

    return res.status(201).json({ msg: "Data Updated successfuly." });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
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
      return res.status(404).json({ success: false, msg: "No Student Found!" });

    const queryRes = await Student.findByIdAndDelete(student._id);
    return res
      .status(200)
      .json({ _id: req.params.id, msg: "Student data deleted successfuly." });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
    console.log(err);
  }
});

// @route   POST /api/student/password/change
// @desc   reset student password
// @access   private
router.post("/password/change", studentAuth, async (req, res) => {
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

    // check if currentPassword matches
    const student = await Student.findById(req.student._id);

    // check if new password is same as prev
    if (student.password === newPassword) {
      return res
        .status(400)
        .json({ msg: "New password cannot be same as previous!" });
    }

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
