import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import CrossIcon from "../../utils/CrossIcon.js";
import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../../redux/messagesSlice";
import ResultDataPreview from "./ResultDataPreview";

const DeleteResultForm = ({ setShowForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultDataFound, setResultDataFound] = useState(false);
  const [resultData, setResultData] = useState(null);

  const enrollRef = useRef();
  const examTypeRef = useRef();
  const semesterRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFindResult = async (e) => {
    e.preventDefault();

    const enroll = enrollRef.current.value.trim();
    const semester = semesterRef.current.value;
    const type = examTypeRef.current.value;
    try {
      const res = await axios.get(
        `/api/result/get?enroll=${enroll}&semester=${semester}&type=${type}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // on success
      setResultData(res.data.result);
      console.log(res.data.result);
      setResultDataFound(true);
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  };

  const handleDeleteResultData = async () => {
    const id = resultData._id;

    try {
      const res = await axios.delete(`/api/result/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // on success
      setResultDataFound(false);
      dispatch(addSuccessMsg(res.data.msg));
      setResultData(null);
    } catch (err) {
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  };

  // styles
  const input = "input input-bordered mb-4";
  const spanKey = "font-bold mx-3";
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
        <h1 className="mt-6 mb-4 text-xl">Delete Result Data</h1>
        <span className="cursor-pointer" onClick={() => setShowForm("none")}>
          <CrossIcon />
        </span>
      </div>

      {resultDataFound ? (
        <div className="bg-gray-300 pt-4 rounded">
          <ResultDataPreview resultData={resultData} />

          <p className="text-center pt-6 italic">
            Are you sure you want to delete this result Data?
          </p>

          <div className="py-2 flex justify-evenly">
            <button
              className="btn btn-success w-2/5"
              onClick={() => setResultDataFound(false)}
            >
              No, don't Delete
            </button>
            <button
              className="btn btn-error w-2/5"
              onClick={handleDeleteResultData}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ) : (
        <form className="mx-auto px-2" onSubmit={onFindResult}>
          {/* Enroll input: STARTS */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enrollment Number
            </label>
            <input
              type="text"
              ref={enrollRef}
              placeholder="AJU/191234"
              className={textInput}
              required
            />
          </div>
          {/* Enroll input: ENDS */}

          {/* Enroll input: STARTS */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Semester
            </label>
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
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Exam Type
            </label>
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
      )}
    </>
  );
};

export default DeleteResultForm;
