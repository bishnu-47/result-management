import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
	// personal details
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	mobileNo: {
		type: String,
		required: true,
	},
	fatherName: {
		type: String,
		required: true,
	},
	motherName: {
		type: String,
		required: true,
	},

	// acadamic details
	branch: {
		type: String,
		required: true,
	},
	enrollNo: {
		type: String,
		required: true,
		unique: true,
	},
	session: {
		type: String,
		required: true,
	},

	// others
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: String,
		required: true,
	},
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;