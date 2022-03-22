#!/usr/bin/env node

"use strict";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import inquirer from "inquirer";
import { program } from "commander";
import chalk from "chalk";
import mongoose from "mongoose";

import Admin from "../models/Admin.js";

dotenv.config();

// program help details
program.description("A cli to manage admins for result-management app");

// to add admin
program
  .command("admin:add")
  .description("To add an Admin")
  .action((options) => {
    // questions
    const questions = [
      { type: "input", name: "email", message: "Enter your email:" },
      { type: "input", name: "username", message: "Enter a username:" },
      {
        type: "password",
        name: "password",
        mask: "*",
        message: "Enter a password:",
      },
    ];

    // inquirer for cli inputs
    inquirer
      .prompt(questions)
      .then(async (answers) => {
        // on successful inquirer inputs
        // connect to DB
        return mongoose
          .connect(process.env.MONGO_URI)
          .then(() => {
            // on successful mongoose connection
            // destructure the inputs(answers)
            const { email, username, password } = answers;
            return createAdmin(email.trim(), username.trim(), password.trim());
          })
          .catch((err) => {
            // mongoose connection error
            console.log(chalk.red("Connection to database failed!"));
            process.exit();
          });
      })
      .then((result) => {
        // on successful processing of inquirer inputs
        // on successful creation of admin
        console.log(chalk.green(`Admin:${result.name} created successfully.`));
        process.exit();
      })
      .catch((err) => {
        // handle inquirer errors
        if (err.isTtyError) {
          console.log(
            chalk.red("Prompt couldn't be rendered in the current environment")
          );
          process.exit();
        } else {
          console.log(err); // TODO: remove this line
          console.log(chalk.red(err.message));
          process.exit();
        }
      });
  });

// to remove an admin
program
  .command("admin:remove")
  .description("To remove an Admin")
  .action((options) => {
    // questions
    const questions = [
      {
        type: "input",
        name: "email",
        message: "Enter the email of admin to be removed:",
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to remove this admin?",
      },
    ];

    // inquirer for cli inputs
    inquirer
      .prompt(questions)
      .then(async (answers) => {
        // on successful inquirer inputs
        // connect to DB
        return mongoose
          .connect(process.env.MONGO_URI)
          .then(() => {
            // on successful mongoose connection
            // destructure the inputs(answers)
            const { email, confirm } = answers;

            if (confirm) {
              return removeAdmin(email.trim());
            } else {
              console.log(chalk.blue("Task Aborted!"));
              process.exit();
            }
          })
          .catch((err) => {
            // mongoose connection error
            console.log(chalk.red("Connection to database failed!"));
            process.exit();
          });
      })
      .then((result) => {
        // on successful processing of inquirer inputs
        // on successful creation of admin
        console.log(chalk.green(`Admin:${result.name} removed.`));
        process.exit();
      })
      .catch((err) => {
        // handle inquirer errors
        if (err.isTtyError) {
          console.log(
            chalk.red("Prompt couldn't be rendered in the current environment")
          );
          process.exit();
        } else {
          console.log(err); // TODO: remove this line
          console.log(chalk.red(err.message));
          process.exit();
        }
      });
  });

// to list all admins
program
  .command("admin:list")
  .description("To list all Admins")
  .action((options) => {
    // questions
    const questions = [];

    // inquirer for cli inputs
    inquirer
      .prompt(questions)
      .then(async (answers) => {
        // on successful inquirer inputs
        // connect to DB
        return mongoose
          .connect(process.env.MONGO_URI)
          .then(() => {
            // on successful mongoose connection
            // destructure the inputs(answers)
            return listAdmins();
          })
          .catch((err) => {
            // mongoose connection error
            console.log(chalk.red("Connection to database failed!"));
            process.exit();
          });
      })
      .then((result) => {
        // on successful processing of inquirer inputs
        // on successful fetch of admins
        result.forEach((admin, idx) => {
          console.log(chalk.cyan(`${idx + 1}. ${admin.email}`));
        });
        process.exit();
      })
      .catch((err) => {
        // handle inquirer errors
        if (err.isTtyError) {
          console.log(
            chalk.red("Prompt couldn't be rendered in the current environment")
          );
          process.exit();
        } else {
          console.log(err); // TODO: remove this line
          console.log(chalk.red(err.message));
          process.exit();
        }
      });
  });

function createAdmin(email, name, password) {
  // check all data is recived
  if (!name || !email || !password) throw new Error("Provide all credentials");

  // check if password length > 6
  if (password.length < 6)
    throw new Error(
      "password length should be greater than or equal 6 characters"
    );

  // check for existing admin
  return Admin.findOne({ email })
    .then((result) => {
      if (result) throw new Error("Admin already exists with that email.");

      // create new admin
      const newAdmin = new Admin({ name, email, password });

      // hash password(synchronously)
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(newAdmin.password, salt);
      newAdmin.password = hash; // store the hashed password

      return newAdmin.save();
    })
    .catch((err) => {
      console.log(chalk.red(err.message));
      process.exit();
    });
}

function removeAdmin(email) {
  // check all data is recived
  if (!email) throw new Error("Provide all credentials");

  // find the admin
  return Admin.findOneAndRemove({ email })
    .then((result) => {
      if (!result) throw new Error("Admin not Found!");

      return result;
    })
    .catch((err) => {
      console.log(chalk.red(err.message));
      process.exit();
    });
}

function listAdmins() {
  // find the admins
  return Admin.find()
    .then((result) => {
      if (!result || result.length === 0) throw new Error("No admins found!");

      return result;
    })
    .catch((err) => {
      console.log(chalk.red(err.message));
      process.exit();
    });
}

program.parse();
