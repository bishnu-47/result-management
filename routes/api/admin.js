import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";
import { adminAuth } from "../../middleware/auth.js";

const router = express.Router();

// @route   POST /api/admin
// @desc   add a new admin
// @access   private
router.post("/", adminAuth, async (req, res) => {
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

        res.status(200).json({
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
    res.status(500).json({ msg: err.message });
  }
});

export default router;
