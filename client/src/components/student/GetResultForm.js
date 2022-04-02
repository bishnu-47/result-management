import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { arabToRoman } from "roman-numbers";

import { isValidSessionFormat } from "../../helpers/helperFunctions.js";
import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../redux/messagesSlice";
import { changeSemester } from "../../redux/branchSlice";
import LoadingButton from "../utils/LoadingButton";
import PrintResult from "./PrintResult.js";

const GetResultForm = () => {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState();
  const [studentData, setStudentData] = useState();

  // refs
  const enrollRef = useRef();
  const branchRef = useRef();
  const sessionRef = useRef();
  const semesterRef = useRef();
  const examTypeRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { branches, semesters } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const onGetResultSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // check session input
    if (!isValidSessionFormat(sessionRef.current.value)) {
      setIsLoading(false);
      return dispatch(addWarningMsg("Provide correct session format!"));
    }

    // create form data
    const formData = {
      enrollNo: enrollRef.current.value,
      branch: branchRef.current.value,
      session: sessionRef.current.value,
      semester: semesterRef.current.value,
      examType: examTypeRef.current.value,
    };

    try {
      const res = await axios.post("/api/result/generate", formData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      console.log("hi");

      // on success
      setResultData(res.data.result);
      setStudentData(res.data.student);
      setIsLoading(false);
      setShowResult(true);
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      setIsLoading(false);
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
  const labelStyle =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
  const selectStyle =
    "form-select form-select-lg mb-3 appearance-none block " +
    "w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding " +
    "bg-no-repeat border border-solid border-gray-300 rounded transition " +
    "ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  const textInput =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const fileInput =
    "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border " +
    "border-gray-300 cursor-pointer focus:outline-none focus:border-transparent";
  const buttonStyle =
    "text-white mt-6 bg-gray-800 hover:bg-gray-900 focus:ring-4 " +
    "focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2";
  const gridStyle =
    "my-1 px-1 w-full overflow-hidden sm:my-px sm:px-px " +
    "md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-3 xl:px-3 xl:w-1/2";

  return (
    <>
      <form className="w-11/12 mx-auto" onSubmit={onGetResultSubmit}>
        <div className="flex flex-wrap mx-1 overflow-hidden sm:-mx-px md:-mx-2 lg:-mx-2 xl:-mx-3">
          {/* Enroll input: STARTS */}
          <div className={gridStyle}>
            <div className="mb-6">
              <label className={labelStyle}>Enrollment Number</label>
              <input
                type="text"
                ref={enrollRef}
                placeholder="AJU/191234"
                className={textInput}
                required
              />
            </div>
          </div>
          {/* Enroll input: ENDS */}

          {/* Session input: STARTS */}
          <div className={gridStyle}>
            <div className="mb-6">
              <label className={labelStyle}>Session</label>
              <input
                type="text"
                ref={sessionRef}
                placeholder="2015-18"
                className={textInput}
                required
              />
            </div>
          </div>
          {/* Session input: STARTS */}

          {/* branch select: STARTS */}
          <div className={gridStyle}>
            <div className="mb-6">
              <label className={labelStyle}>Branch</label>
              <select
                className={selectStyle}
                ref={branchRef}
                onChange={handleOnBranchChange}
                required
              >
                <option selected disabled>
                  Select Branch
                </option>
                {branches.map((branch, i) => (
                  <option value={branch.name} key={i}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Branch select: ENDS */}

          {/* Semester select: STARTS */}
          <div className={gridStyle}>
            <div className="mb-6">
              <label className={labelStyle}>Semester</label>
              <select className={selectStyle} ref={semesterRef} required>
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
          </div>
          {/* Semester select: ENDS */}

          {/* Exam Type select: STARTS */}
          <div className={gridStyle}>
            <div className="mb-6">
              <label className={labelStyle}>Exam Type</label>
              <select className={selectStyle} ref={examTypeRef} required>
                <option disabled defaultValue>
                  Select Exam Type
                </option>
                <option value="REGULAR">REGULAR</option>
                <option value="BACKLOG">BACKLOG</option>
              </select>
            </div>
          </div>
          {/* Exam Type select: ENDS */}
        </div>

        {/* Upload Btn: STARTS */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button type="submit" className={buttonStyle}>
            GET RESULT
          </button>
        )}
        {/* Upload Btn: ENDS */}
      </form>

      {showResult && (
        <div className="mt-8">
          <PrintResult result={resultData} student={studentData} />
        </div>
      )}
    </>
  );
};

export default GetResultForm;
