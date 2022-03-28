import { useState } from "react";

import AddStudentActionForm from "./studentActions/AddStudentActionForm.js";
import EditStudentActionForm from "./studentActions/EditStudentActionForm.js";

import AddUserIcon from "../utils/AddUserIcon.js";
import RemoveUserIcon from "../utils/RemoveUserIcon.js";
import EditIcon from "../utils/EditIcon.js";

const ManageStudentsList = () => {
  const [showForm, setShowForm] = useState("none");

  // styles
  const liItem =
    "bg-gray-200 p-5 my-4 rounded flex items-center justify-between ease-out duration-300 cursor-pointer hover:scale-105";
  const liItemIcon = "p-2 rounded-full";

  return (
    <>
      {showForm === "none" ? (
        <ul className="mt-10">
          <li className={liItem} onClick={() => setShowForm("addStudent")}>
            <span className="font-bold">Add Student</span>
            <span className={liItemIcon + " bg-green-400"}>
              <AddUserIcon />
            </span>
          </li>

          <li className={liItem} onClick={() => setShowForm("editStudent")}>
            <span className="font-bold">Edit Student Data</span>
            <span className={liItemIcon + " bg-yellow-300"}>
              <EditIcon />
            </span>
          </li>

          <li className={liItem} onClick={() => setShowForm("deleteStudent")}>
            <span className="font-bold">Delete Student Data</span>
            <span className={liItemIcon + " bg-red-500"}>
              <RemoveUserIcon />
            </span>
          </li>
        </ul>
      ) : showForm === "addStudent" ? (
        <AddStudentActionForm setShowForm={setShowForm} />
      ) : showForm === "editStudent" ? (
        <EditStudentActionForm setShowForm={setShowForm} />
      ) : (
        "delete student"
      )}
    </>
  );
};

export default ManageStudentsList;
