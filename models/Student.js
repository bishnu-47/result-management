import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  // personal details
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    requried: true,
  },
  fatherName: {
    type: String,
    requried: true,
  },
  motherName: {
    type: String,
    requried: true,
  },

  // acadamic details
  branch: {
    type: String,
    requried: true,
  },
  enrollNo: {
    type: String,
    requried: true,
    unique: true,
  },
  session: {
    type: String,
    requried: true,
  },

  // others
  password: {
    type: String,
    requried: true,
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
    requried: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
