import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { arabToRoman } from "roman-numbers";

import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../redux/messagesSlice";
import { changeSemester } from "../../redux/branchSlice";
import { isValidSessionFormat } from "../../helpers/helperFunctions.js";
import LoadingButton from "../utils/LoadingButton";

const UploadResultForm = () => {
  // states
  const [file, setFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // refs
  const branchRef = useRef();
  const sessionRef = useRef();
  const semesterRef = useRef();
  const examTypeRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { branches, semesters } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function onResultSubmit(e) {
    e.preventDefault();
    setIsUploading(true);

    // check session input
    if (!isValidSessionFormat(sessionRef.current.value)) {
      setIsUploading(false);
      return dispatch(addWarningMsg("Provide correct session format!"));
    }

    // create form data
    const formData = new FormData();
    formData.append("branch", branchRef.current.value);
    formData.append("semester", semesterRef.current.value);
    formData.append("session", sessionRef.current.value);
    formData.append("examType", examTypeRef.current.value);
    formData.append("file", file);

    try {
      const res = await axios.post("/api/file/upload-result-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      // on success
      setIsUploading(false);
      // const { fileName, filePath } = res.data;
      dispatch(addSuccessMsg("File Uploaded"));
    } catch (err) {
      setIsUploading(false);
      if (err.response.status === 500) {
        dispatch(addErrorMsg("There was a problem with the server"));
      } else {
        dispatch(addErrorMsg(err.response.data.msg));
      }
    }
  }

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
  const select =
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
  const button =
    "text-white mt-6 bg-gray-800 hover:bg-gray-900 focus:ring-4 " +
    "focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2";

  return (
    <>
      <form onSubmit={onResultSubmit}>
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

        {/* Semester select: STARTS */}
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
        {/* Semester select: ENDS */}

        {/* Session input: STARTS */}
        <div className="mb-6">
          <label className={label}>Session</label>
          <input
            type="text"
            ref={sessionRef}
            placeholder="2021-23"
            className={textInput}
            required
          />
        </div>
        {/* Session input: STARTS */}

        {/* Exam Type select: STARTS */}
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
        {/* Exam Type Select: ENDS */}

        {/* file upload: STARTS */}
        <div>
          <label className={label}>Upload file</label>
          <input className={fileInput} type="file" onChange={onFileChange} />
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Choose an excel file to upload.
          </div>
        </div>
        {/* file upload: ENDS */}

        {/* Upload Btn: STARTS */}
        {isUploading ? (
          <div className="mt-6">
            <LoadingButton />
          </div>
        ) : (
          <button type="submit" className={button}>
            Upload
          </button>
        )}
        {/* Upload Btn: ENDS */}
      </form>
    </>
  );
};

export default UploadResultForm;
