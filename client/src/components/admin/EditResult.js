import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addErrorMsg, addSuccessMsg } from "../../redux/messagesSlice";
import EditResultForm from "./EditResultForm";

const EditResult = () => {
  const [resultData, setResultData] = useState();
  const [showForm, setShowForm] = useState(false);

  const enrollRef = useRef();
  const semesterRef = useRef();
  const examTypeRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onEditResultSubmit = async (e) => {
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

  // styles
  const textInput =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const gridStyle =
    "my-1 px-1 w-full overflow-hidden sm:my-px sm:px-px " +
    "md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-3 xl:px-3 xl:w-1/2";
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
        <form className="mx-auto" onSubmit={onEditResultSubmit}>
          <div className="flex">
            {/* Enroll input: STARTS */}
            <div className={gridStyle}>
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
            </div>
            {/* Enroll input: ENDS */}

            {/* Enroll input: STARTS */}
            <div className={gridStyle}>
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
            </div>
            {/* Enroll input: ENDS */}
          </div>

          {/* Exam type input: STARTS */}
          <div className={gridStyle}>
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

export default EditResult;
