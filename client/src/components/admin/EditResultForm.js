import { useState } from "react";
import ordinal from "ordinal";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../redux/messagesSlice";
import CrossIcon from "../utils/CrossIcon";

const EditResultForm = ({ result, setShowForm }) => {
  const [subjects, setSubjects] = useState(result.subjects);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // result data
  const table1 = [
    { key: "Student Name", value: result.studentName },
    { key: "Enrollment Number", value: result.enrollNo },
    { key: "Branch", value: result.branch },
  ];

  const table2 = [
    {
      key: "Semester",
      value: ordinal(parseInt(result.semester)) + " SEMESTER",
    },
    { key: "Session", value: result.session },
    { key: "Exam Type", value: result.examType },
  ];

  // form input change handle
  const handleOnChange = (e, idx) => {
    const subjectVals = [...subjects];
    let val = e.target.value;

    // convert string to float
    subjectVals[idx]["marks"] = parseFloat(val);
    setSubjects(subjectVals);
  };

  // form submit handler
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // create form data
    const formData = {
      id: result._id,
      subjects: subjects,
    };

    try {
      const res = await axios.put("/api/result", formData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

  return (
    <>
      <div className="overflow-x-auto relative sm:-mx-6 lg:-mx-8">
        {/*Close btn :STARTS*/}
        <div
          className="absolute right-12 hover:cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          <CrossIcon />
        </div>
        {/*Close btn :ENDS*/}

        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full flex">
              {/* TABLE #1 */}
              <table className="w-1/2 mr-10 text-left">
                <tbody>
                  {table1.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900 ">
                        {item.key}
                      </td>
                      <td className="text-sm text-gray-900 font-lightpy-4 whitespace-nowrap ">
                        :
                      </td>
                      <td className="text-sm text-gray-900 font-lightpy-4 whitespace-nowrap ">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TABLE #2 */}
              <table className="w-1/2 ml-10 text-left">
                <tbody>
                  {table2.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 whitespace-nowrap text-sm font-medium text-gray-900 ">
                        {item.key}
                      </td>
                      <td className="text-sm text-gray-900 font-light whitespace-nowrap ">
                        :
                      </td>
                      <td className="text-sm text-gray-900 font-light whitespace-nowrap ">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="mt-12 mb-6 text-lg font-bold sm:px-6 lg:px-8">
          Marks in different subjects:
        </p>

        {/*edit result form : STARTS*/}
        <form onSubmit={handleOnSubmit}>
          <table className="w-1/2 ml-10 text-left">
            <tbody>
              {subjects.map((subject, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-10 whitespace-nowrap text-sm font-medium text-gray-900 ">
                    {subject.subjectName}
                  </td>
                  <td className="text-sm text-gray-900 font-lightpy-4">:</td>
                  <td className="pl-10 py-1 text-sm whitespace-nowrap text-gray-900 font-lightpy-4">
                    <input
                      className="bg-gray-50 text-center border inline border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      type="text"
                      name="marks"
                      value={subject.marks}
                      onChange={(e) => handleOnChange(e, idx)}
                    />
                    <span className="pl-2">/ {subject.fullMarks}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn ml-8 mt-2" type="submit">
            UPDATE
          </button>
        </form>

        {/*edit result form : ENDS*/}
      </div>
    </>
  );
};

export default EditResultForm;
