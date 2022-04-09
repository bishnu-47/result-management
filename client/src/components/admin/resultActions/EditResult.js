import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { arabToRoman } from "roman-numbers";

import { changeSemester } from "../../../redux/branchSlice";
import { addErrorMsg, addSuccessMsg } from "../../../redux/messagesSlice";
import CrossIcon from "../../utils/CrossIcon.js";
import EditResultForm from "./EditResultForm";

const EditResult = ({ setShowEditResult }) => {
  const [resultData, setResultData] = useState();
  const [showForm, setShowForm] = useState(false);

  const enrollRef = useRef();
  const branchRef = useRef();
  const semesterRef = useRef();
  const examTypeRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { branches, semesters } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const onEditResultSubmit = async (e) => {
    e.preventDefault();

    const enroll = enrollRef.current.value.trim();
    const semester = semesterRef.current.value;
    const type = examTypeRef.current.value;
    const branch = branchRef.current.value.trim();
    try {
      const res = await axios.get(
        `/api/result/get?enroll=${enroll}&semester=${semester}&type=${type}&branch=${branch}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // on success
      setResultData(res.data.result);
      setShowForm(true);
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
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
      {showForm ? (
        <EditResultForm result={resultData} setShowForm={setShowForm} />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between">
            <h1 className="mt-6 mb-4 text-xl">Edit Result Data</h1>
            <span
              className="cursor-pointer"
              onClick={() => setShowEditResult("none")}
            >
              <CrossIcon />
            </span>
          </div>
          <form className="mx-auto px-2" onSubmit={onEditResultSubmit}>
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

            {/* Enroll input: STARTS */}
            <div className="mb-6">
              <label className={label}>Semester</label>
              <select className={select} ref={semesterRef} required>
                <option disabled defaultValue>
                  Select Semester
                </option>
                <option value="1">I</option>
                <option value="2">II</option>
                <option value="3">III</option>
                <option value="4">IV</option>
                <option value="5">V</option>
                <option value="6">VI</option>
                <option value="7">VII</option>
                <option value="8">VIII</option>
                <option value="9">IX</option>
                <option value="10">X</option>
              </select>
            </div>
            {/* Enroll input: ENDS */}

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

            <button className="btn" type="submit">
              Get Result
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default EditResult;
