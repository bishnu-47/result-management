import mongoose from "mongoose";

const Schema = mongoose.Schema;

// create Schema
const ResultSchema = new Schema({
  enrollNo: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  examType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.model("Result", ResultSchema);

export default Result;
