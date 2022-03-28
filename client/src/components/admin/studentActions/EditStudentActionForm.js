import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { isValidSessionFormat } from "../../../helpers/helperFunctions.js";
import CrossIcon from "../../utils/CrossIcon.js";
import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../../redux/messagesSlice";

const EditStudentActionForm = ({ setShowForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  const [student, setStudent] = useState(null);

  const nameRef = useRef();
  const enrollRef = useRef();
  const branchRef = useRef();
  const sessionRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const fatherNameRef = useRef();
  const motherNameRef = useRef();

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

  // handle on update student
  async function handleOnUpdateStudent(e) {
    e.preventDefault();

    // create form data
    const studentData = {
      student: {
        name: nameRef.current.value,
        enrollNo: enrollRef.current.value,
        branch: branchRef.current.value,
        session: sessionRef.current.value,
        email: emailRef.current.value,
        mobileNo: mobileRef.current.value,
        fatherName: fatherNameRef.current.value,
        motherName: motherNameRef.current.value,
      },
    };

    // some validations
    if (!isValidSessionFormat(student.session))
      return dispatch(addWarningMsg("Invalid session format!"));

    if (student.mobileNo.length !== 10 || isNaN(student.mobileNo))
      return dispatch(addWarningMsg("Invalid mobile Number!"));

    try {
      const res = await axios.put("/api/student/" + student._id, studentData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      // on success
      setIsLoading(false);
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

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="mt-6 mb-4 text-xl">Edit Student Data</h1>
        <span className="cursor-pointer" onClick={() => setShowForm("none")}>
          <CrossIcon />
        </span>
      </div>

      {studentFound ? (
        <>
          {/* Edit Student form : STARTS */}
          <form className="form-control flex" onSubmit={handleOnUpdateStudent}>
            <label className="label">
              <span className="label-text">Student Name</span>
            </label>
            <input
              type="text"
              placeholder="Student's Name"
              ref={nameRef}
              defaultValue={student.name}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Enrollment Number</span>
            </label>
            <input
              type="text"
              placeholder="AJU/190342"
              ref={enrollRef}
              defaultValue={student.enrollNo}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Branch</span>
            </label>
            <select
              className="select select-bordered mb-4 w-full max-w-xs"
              ref={branchRef}
              required
            >
              <option disabled>Select Branch</option>
              <option value={student.branch}>{student.branch}</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCom">BCom</option>
            </select>

            <label className="label">
              <span className="label-text">Session</span>
            </label>
            <input
              type="text"
              placeholder="2019-22"
              ref={sessionRef}
              defaultValue={student.session}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              defaultValue={student.email}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              placeholder="Moblie No."
              ref={mobileRef}
              defaultValue={student.mobileNo}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Father's Name</span>
            </label>
            <input
              type="text"
              placeholder="Father's Name"
              ref={fatherNameRef}
              defaultValue={student.fatherName}
              className={input}
              required
            />

            <label className="label">
              <span className="label-text">Mother's Name</span>
            </label>
            <input
              type="text"
              placeholder="Mother's Name"
              ref={motherNameRef}
              defaultValue={student.motherName}
              className={input}
              required
            />

            {isLoading ? (
              <button type="submit" className="btn mt-5" disabled>
                Updating...
              </button>
            ) : (
              <button type="submit" className="btn mt-5">
                Update
              </button>
            )}
          </form>
          {/* Edit Student form : ENDS */}
        </>
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
            Enter the Enrollment number of Student whose data is to be edited.
          </span>

          {isLoading ? (
            <button type="submit" className="btn mt-5" disabled>
              Finding...
            </button>
          ) : (
            <button type="submit" className="btn mt-5">
              Find
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default EditStudentActionForm;
