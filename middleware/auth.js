import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Student from "../models/Student.js";

export const adminAuth = async (req, res, next) => {
  // extract token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ msg: "Invalid Authorization!" });
  }

  try {
    // verify jwt token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Invalid Authorization!" });

      // find admin based on decoded data
      const admin = await Admin.findById(decoded.id);

      // if no admin found
      if (!admin) return res.status(401).json({ msg: "Not Authorized!" });

      // add the data to request for routes
      req.admin = admin; // admin contains {id,name,email}
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: e.message });
  }
};

export const studentAuth = async (req, res, next) => {
  // extract token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ msg: "Invalid Authorization!" });
  }

  try {
    // verify jwt token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json({ msg: "Invalid Authorization!" });

      // find student based on decoded data
      const student = await Student.findOne(
        { _id: decoded.id },
        { password: 0 }
      ); // exclude password from result

      // if no student found
      if (!student) return res.status(401).json({ msg: "Not Authorized!" });

      // add the data to request for routes
      req.student = student; // student contains {name, email,...}(all except password)
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: e.message });
  }
};
