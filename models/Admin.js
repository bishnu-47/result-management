import mongoose from "mongoose";

const Schema = mongoose.Schema;

// create Schema
const AdminSchema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
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
