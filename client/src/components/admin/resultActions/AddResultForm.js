import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { arabToRoman } from "roman-numbers";

import { changeSemester } from "../../../redux/branchSlice";
import { addErrorMsg, addSuccessMsg } from "../../../redux/messagesSlice";
import CrossIcon from "../../utils/CrossIcon.js";

const AddResultForm = ({ setShowForm }) => {
  const [subjects, setSubjects] = useState([
    {
      subjectName: "",
      subjectCode: "",
      marks: "",
      fullMarks: "",
      passMarks: "",
    },
  ]);

  // refs
  const enrollRef = useRef();
  const branchRef = useRef();
  const semesterRef = useRef();
  const examTypeRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { branches, semesters } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const onAddResultSubmit = async (e) => {
    e.preventDefault();

    // construct data
    const result = {
      enrollNo: enrollRef.current.value.trim(),
      branch: branchRef.current.value.trim(),
      semester: semesterRef.current.value.trim(),
      examType: examTypeRef.current.value.trim(),
      subjects: subjects,
    };

    try {
      const res = await axios.post("/api/result", result, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // on success
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  };

  const handleChange = (e, idx) => {
    let newSubjects = [...subjects];
    newSubjects[idx][e.target.name] = e.target.value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        subjectName: "",
        subjectCode: "",
        marks: "",
        fullMarks: "",
        passMarks: "",
      },
    ]);
  };

  const removeSubject = (idx) => {
    let newSubjects = [...subjects];
    newSubjects.splice(idx, 1);
    setSubjects(newSubjects);
  };

  function handleOnBranchChange() {
    const currentSeem = branches.find(
      (branch) => branch.name === branchRef.current.value
    );
    const seemArr = [];

    // create semester arr
    for (let i = 0; i < currentSeem.totalSeem; i++) {
      seemArr[i] = arabToRoman(i + 1);
    }

    dispatch(changeSemester(seemArr));
  }

  // styles
  const label = "block mb-2 text-sm font-medium text-gray-900";
  const textInput =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const select =
    "form-select form-select-lg mb-3 appearance-none block " +
    "w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding " +
    "bg-no-repeat border border-solid border-gray-300 rounded transition " +
    "ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="mt-6 mb-4 text-xl">Add Result Data</h1>
        <span className="cursor-pointer" onClick={() => setShowForm("none")}>
          <CrossIcon />
        </span>
      </div>
      <form className="mx-auto px-2" onSubmit={onAddResultSubmit}>
        {/* Enroll input: STARTS */}
        <div className="mb-6">
          <label className={label}>Enrollment Number</label>
          <input
            type="text"
            ref={enrollRef}
            placeholder="AJU/191234"
            className={textInput}
            required
          />
        </div>
        {/* Enroll input: ENDS */}

        {/* branch select: STARTS */}
        <div className="mb-4">
          <label className={label}>Branch</label>
          <select
            className={select}
            ref={branchRef}
            onChange={handleOnBranchChange}
            required
          >
            <option disabled selected>
              Select Branch
            </option>
            {branches.map((branch, i) => (
              <option value={branch.name} key={i}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        {/* Branch select: ENDS */}

        {/* Semester input: STARTS */}
        <div className="mb-6">
          <label className={label}>Semester</label>
          <select className={select} ref={semesterRef} required>
            <option disabled defaultValue>
              Select Semester
            </option>
            {semesters &&
              semesters.map((seem, idx) => (
                <option value={idx + 1} key={idx}>
                  {seem}
                </option>
              ))}
          </select>
        </div>
        {/* Semester input: ENDS */}

        {/* Exam type input: STARTS */}
        <div className="mb-6">
          <label className={label}>Exam Type</label>
          <select className={select} ref={examTypeRef} required>
            <option disabled defaultValue>
              Select Exam Type
            </option>
            <option value="REGULAR">REGULAR</option>
            <option value="BACKLOG">BACKLOG</option>
          </select>
        </div>
        {/* Exam type input: ENDS */}

        <p className="mt-8 mb-2 text-sm font-medium">
          Add marks in different subjects:
        </p>
        {/* Subjects input: STARTS */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Marks Obtained</th>
                <th>Full Marks</th>
                <th>Pass Marks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <input
                      type="text"
                      name="subjectName"
                      value={subject.subjectName || ""}
                      onChange={(e) => handleChange(e, idx)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="subjectCode"
                      value={subject.subjectCode || ""}
                      onChange={(e) => handleChange(e, idx)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="marks"
                      value={subject.marks || ""}
                      onChange={(e) => handleChange(e, idx)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="fullMarks"
                      value={subject.fullMarks || ""}
                      onChange={(e) => handleChange(e, idx)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="passMarks"
                      value={subject.passMarks || ""}
                      onChange={(e) => handleChange(e, idx)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </td>
                  <td>
                    {idx ? (
                      <button type="button" onClick={() => removeSubject(idx)}>
                        <CrossIcon width={6} height={6} color="text-red-500" />
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Subjects input: ENDS */}

        <div className="flex justify-between">
          <button className="btn mt-5" type="submit">
            Submit Result Data
          </button>

          <button
            className="btn btn-success mt-5"
            type="button"
            onClick={() => addSubject()}
          >
            + Add more subject
          </button>
        </div>
      </form>
    </>
  );
};

export default AddResultForm;
