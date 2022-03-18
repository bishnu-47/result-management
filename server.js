import path from "path";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";

import authRoute from "./routes/api/auth.js";
import studentRoute from "./routes/api/student.js";
import adminRoute from "./routes/api/admin.js";
import fileRoute from "./routes/api/file.js";
import resultRoute from "./routes/api/result.js";
import mailRoute from "./routes/api/mail.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// connect to DB
connectDB();

// routes middleware
app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/admin", adminRoute);
app.use("/api/file", fileRoute);
app.use("/api/result", resultRoute);
app.use("/api/mail", mailRoute);

// server static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on PORT:" + PORT);
});
