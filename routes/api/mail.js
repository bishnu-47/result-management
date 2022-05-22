import express from "express";
import nodemailer from "nodemailer";
import generator from "generate-password";
import bcrypt from "bcryptjs";

import Admin from "../../models/Admin.js";
import Student from "../../models/Student.js";
import {
	adminAuth,
	studentAuth
}
from "../../middleware/auth.js";

const router = express.Router();

// @route   POST /api/mail/reset-password/student
// @desc   reset password for student
// @access   private
router.post("/reset-password/student", async (req, res) => {
	const emailAddress = req.body.email;

	try {
		// find the email
		const student = await Student.findOne({
			email: emailAddress
		});

		if (!student) {
			return res.status(400).json({
				msg: "Please check the mail!"
			});
		}

		// generate a new password
		let genPassword = generator.generate({
			length: 10,
			numbers: true,
		});

		// save the generated password
		student.password = genPassword;
		await student.save();

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: process.env.EMAIL_USERNAME,
			to: emailAddress,
			subject: "Password Reset",
			html: "<p>Your password has been reset to password given below:</p><br>" +
				"password: <b>" +
				genPassword +
				"</b><br>" +
				"<p>Login with this password. Then go to <i>change password</i> section to change the password of your own choice.</p>",
		});

		if (info.messageId) {
			return res.status(200).json({
				msg: "Email sent"
			});
		}
		else {
			return res.status(500).json({
				msg: "Could not send email"
			});
		}
	}
	catch (err) {
		return res.status(500).json({
			success: false,
			msg: err.message
		});
	}
});

// @route   POST /api/mail/reset-password/admin
// @desc   reset password for admin
// @access   private
router.post("/reset-password/admin", async (req, res) => {
	const emailAddress = req.body.email;

	try {
		// find the email
		const admin = await Admin.findOne({
			email: emailAddress
		});

		if (!admin) {
			return res.status(400).json({
				msg: "Please check the mail!"
			});
		}

		// generate a new password
		let genPassword = generator.generate({
			length: 10,
			numbers: true,
		});

		// generate salt and hash password then save
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(genPassword, salt, async (err, hash) => {
				if (err) throw err;

				admin.password = hash;
				await admin.save();
			});
		});

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: process.env.EMAIL_USERNAME,
			to: emailAddress,
			subject: "Password Reset",
			html: "<p>Your password has been reset to password given below:</p><br>" +
				"password: <b>" +
				genPassword +
				"</b><br>" +
				"<p>Login with this password. Then go to <i>change password</i> section to change the password of your own choice.</p>",
		});

		if (info.messageId) {
			return res.status(200).json({
				msg: "Email sent"
			});
		}
		else {
			return res.status(500).json({
				msg: "Could not send email"
			});
		}
	}
	catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			msg: err.message
		});
	}
});

export default router;