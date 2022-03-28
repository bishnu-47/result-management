import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import CrossIcon from "../../utils/CrossIcon.js";
import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../../redux/messagesSlice";

const DeleteStudentActionForm = ({ setShowForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  const [student, setStudent] = useState(null);

  const enrollRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // handle on find student by enroll no
  async function handleOnFindStudent(e) {
    e.preventDefault();
    setIsLoading(true);

    const enrollNo = enrollRef.current.value;

    try {
      const res = await axios.get("/api/student/find?enroll=" + enrollNo, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      // on success
      setIsLoading(false);
      setStudent(res.data.data);
      setStudentFound(true);
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  }

  // handle on student delete
  async function handleOnStudentDelete() {
    setIsLoading(true);

    try {
      const res = await axios.delete("/api/student/" + student._id, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      // on success
      setIsLoading(false);
      setStudentFound(false);
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      setIsLoading(false);
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  }

  // styles
  const input = "input input-bordered mb-4";
  const spanKey = "font-bold mx-3";

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="mt-6 mb-4 text-xl">Delete Student Data</h1>
        <span className="cursor-pointer" onClick={() => setShowForm("none")}>
          <CrossIcon />
        </span>
      </div>

      {studentFound ? (
        <div className="bg-gray-300 pt-4 rounded">
          <div>
            <span className={spanKey}>Name:</span>
            <span>{student.name}</span>
          </div>

          <div>
            <span className={spanKey}>Enrollment Number:</span>
            <span>{student.enrollNo}</span>
          </div>

          <div>
            <span className={spanKey}>Branch:</span>
            <span>{student.branch}</span>
          </div>

          <p className="text-center pt-6 italic">
            Are you sure you want to delete the student with above Data?
          </p>

          <div className="py-2 flex justify-evenly">
            <button
              className="btn btn-success w-2/5"
              onClick={() => setStudentFound(false)}
            >
              No, don't Delete
            </button>
            <button
              className="btn btn-error w-2/5"
              onClick={handleOnStudentDelete}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ) : (
        <form className="form-control flex" onSubmit={handleOnFindStudent}>
          <label className="label">
            <span className="label-text">Enrollment Number</span>
          </label>
          <input
            type="text"
            placeholder="AJU/190342"
            ref={enrollRef}
            className={input + "mb-0"}
            required
          />
          <span className="text-sm ml-2 text-gray-600">
            Enter the Enrollment number of Student whose data is to be deleted.
          </span>

          {isLoading ? (
            <button type="submit" className="btn mt-5" disabled>
              Finding...
            </button>
          ) : (
            <button type="submit" className="btn mt-5">
              Delete
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default DeleteStudentActionForm;
