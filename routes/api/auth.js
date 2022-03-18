import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";

import Admin from "../../models/Admin.js";
import Student from "../../models/Student.js";
import { adminAuth, studentAuth } from "../../middleware/auth.js";
const router = express.Router();

// TODO: Remove this api
// @route   POST /api/auth/admin/register
// @desc   register an admin
// @access   public
router.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check all data is recived
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Provide all credentials" });

    // check if password length > 8
    if (password.length < 8)
      return res.status(400).json({
        msg: "password length should be greater than or equal 8 characters",
      });

    // check for existing admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ msg: "Admin already exists" });

    // create new admin
    const newAdmin = new Admin({ name, email, password });

    // generate salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, async (err, hash) => {
        if (err) throw err;

        newAdmin.password = hash;
        await newAdmin.save();
      });
    });

    // create a jwt token and attach it to response
    jwt.sign(
      { id: newAdmin.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          token,
          admin: {
            id: newAdmin.id,
            name: newAdmin.name,
            email: newAdmin.email,
          },
          msg: "New Admin Created.",
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});

// @route   POST /api/auth/admin/login
// @desc   login an admin
// @access   public
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check all data is recived
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, msg: "Provide all credentials" });

    // check for admin dosen't exists
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials!" });

    // compare the given pwd with hashed pwd
    const match = await bcrypt.compare(password, admin.password);

    // if hashed pwd do not match
    if (match === false) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    // create a jwt token and attach it to response
    jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          token,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
          },
          msg: "Logged In.",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST /api/auth/student/login
// @desc   login an admin
// @access   public
router.post("/student/login", async (req, res) => {
  const { enrollNo, password } = req.body;

  try {
    // check all data is recived
    if (!enrollNo || !password)
      return res
        .status(400)
        .json({ success: false, msg: "Provide all credentials" });

    // check for student dosen't exists
    const student = await Student.findOne({ enrollNo });
    if (!student)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials!" });

    // check if password is correct
    if (password !== student.password) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    // create a jwt token and attach it to response
    jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        return res.status(200).json({
          token,
          student: {
            id: student.id,
            name: student.name,
            enrollNo: student.enrollNo,
          },
          msg: "Logged In.",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// @route   GET /api/auth/check-admin
// @desc   check if user is admin
// @access   public
router.get("/check-admin", adminAuth, (req, res) => {
  // extract token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    if (!token) {
      return res.status(401).json({ msg: "Invalid Authorization!" });
    }

    // verify jwt token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Invalid Authorization!" });

      // find admin based on decoded data
      const admin = await Admin.findById(decoded.id);

      // if no admin found
      if (!admin)
        return res.status(401).json({ msg: "Not Authorized!", isAdmin: false });

      // else user is admin
      return res.status(200).json({ msg: "Welcome Admin", isAdmin: true });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// @route   GET /api/auth/check-student
// @desc   check if user is student
// @access   public
router.get("/check-student", studentAuth, (req, res) => {
  // extract token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    if (!token) {
      return res.status(401).json({ msg: "Invalid Authorization!" });
    }

    // verify jwt token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Invalid Authorization!" });

      // find student based on decoded data
      const student = await Student.findById(decoded.id);

      // if no student found
      if (!student)
        return res.status(401).json({ msg: "Not Authorized!", isAdmin: false });

      // else user is student
      return res.status(200).json({ msg: "Welcome Admin", isAdmin: false });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default router;
