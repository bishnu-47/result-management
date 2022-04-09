import { useState } from "react";

import AddResultForm from "./resultActions/AddResultForm.js";
import EditResult from "./resultActions/EditResult.js";
import DeleteResultForm from "./resultActions/DeleteResultForm.js";

import AddDocumentIcon from "../utils/AddDocumentIcon.js";
import RemoveDocumentIcon from "../utils/RemoveDocumentIcon.js";
import EditIcon from "../utils/EditIcon.js";

const ManageResultList = () => {
  const [showForm, setShowForm] = useState("none");

  // styles
  const liItem =
    "bg-gray-300 p-5 my-4 rounded flex items-center justify-between ease-out duration-300 cursor-pointer hover:scale-105";
  const liItemIcon = "p-2 rounded-full";

  return (
    <>
      {showForm === "none" ? (
        <ul className="mt-10">
          <li className={liItem} onClick={() => setShowForm("addResult")}>
            <span className="font-bold">Add Result Data</span>
            <span className={liItemIcon + " bg-green-400"}>
              <AddDocumentIcon />
            </span>
          </li>

          <li className={liItem} onClick={() => setShowForm("editResult")}>
            <span className="font-bold">Edit Result Data</span>
            <span className={liItemIcon + " bg-yellow-300"}>
              <EditIcon />
            </span>
          </li>

          <li className={liItem} onClick={() => setShowForm("deleteResult")}>
            <span className="font-bold">Delete Result Data</span>
            <span className={liItemIcon + " bg-red-500"}>
              <RemoveDocumentIcon />
            </span>
          </li>
        </ul>
      ) : showForm === "addResult" ? (
        <AddResultForm setShowForm={setShowForm} />
      ) : showForm === "editResult" ? (
        <EditResult setShowEditResult={setShowForm} />
      ) : (
        <DeleteResultForm setShowForm={setShowForm} />
      )}
    </>
  );
};

export default ManageResultList;
