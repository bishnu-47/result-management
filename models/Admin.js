import mongoose from "mongoose";

const Schema = mongoose.Schema;

// create Schema
const AdminSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;