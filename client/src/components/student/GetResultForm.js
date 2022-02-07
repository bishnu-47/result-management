import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addErrorMsg, addSuccessMsg } from "../../redux/messagesSlice";
import LoadingButton from "../utils/LoadingButton";
import Result from "./Result";

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

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onGetResultSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // create form data
    const formData = {
      enrollNo: enrollRef.current.value,
      branch: branchRef.current.value,
      session: sessionRef.current.value,
      semester: semesterRef.current.value,
    };

    try {
      const res = await axios.post("/api/result", formData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <>
      <form onSubmit={onGetResultSubmit}>
        {/* Enroll input: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Enrollment Number
          </label>
          <input
            type="text"
            ref={enrollRef}
            placeholder="AJU/191234"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* Enroll input: ENDS */}

        {/* branch select: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Branch
          </label>
          <select
            className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            ref={branchRef}
            required
          >
            <option defaultValue>Select Branch</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCom">BCom</option>
          </select>
        </div>
        {/* Branch select: ENDS */}

        {/* Semester select: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Semester
          </label>
          <select
            className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            ref={semesterRef}
            required
          >
            <option defaultValue>Select Semester</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>
        </div>
        {/* Semester select: ENDS */}

        {/* Session input: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Session
          </label>
          <input
            type="text"
            ref={sessionRef}
            placeholder="2015-18"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* Session input: STARTS */}

        {/* Upload Btn: STARTS */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
          >
            GET RESULT
          </button>
        )}
        {/* Upload Btn: ENDS */}
      </form>

      {showResult && (
        <div className="mt-8">
          <Result result={resultData} student={studentData} />
        </div>
      )}
    </>
  );
};

export default GetResultForm;
