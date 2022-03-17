import Axios from "axios";
import fileDownload from "js-file-download";
import { useSelector, useDispatch } from "react-redux";

import { addErrorMsg } from "../../redux/messagesSlice.js";
import FileDownloadIcon from "../utils/FileDownloadIcon";

const GetFileForm = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function download(url: string, filename: string) {
    Axios.get(url, {
      responseType: "blob",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      fileDownload(res.data, filename);
    });
  }

  function handleOnResultTemplateDownload() {
    try {
      download("/api/file/get-result-file-template", "result-template.xlsx");
    } catch (err) {
      dispatch(addErrorMsg("Server error!"));
    }
  }

  function handleOnResultSampleDownload() {
    try {
      download("/api/file/get-result-file-sample", "result-sample.xlsx");
    } catch (err) {
      dispatch(addErrorMsg("Server error!"));
    }
  }

  function handleOnStudentTemplateDownload() {
    try {
      download("/api/file/get-student-file-template", "student-template.xlsx");
    } catch (err) {
      dispatch(addErrorMsg("Server error!"));
    }
  }

  function handleOnStudentSampleDownload() {
    try {
      download("/api/file/get-student-file-sample", "student-sample.xlsx");
    } catch (err) {
      dispatch(addErrorMsg("Server error!"));
    }
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 mt-4 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    File
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Template File
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
                  >
                    Sample File
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b odd:bg-white even:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Result Data
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      className="flex cursor-pointer hover:text-gray-800"
                      onClick={handleOnResultTemplateDownload}
                    >
                      Download <FileDownloadIcon />
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      className="flex cursor-pointer hover:text-gray-800"
                      onClick={handleOnResultSampleDownload}
                    >
                      Download <FileDownloadIcon />
                    </span>
                  </td>
                </tr>

                <tr className="border-b odd:bg-white even:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Student Data
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      className="flex cursor-pointer hover:text-gray-800"
                      onClick={handleOnStudentTemplateDownload}
                    >
                      Download <FileDownloadIcon />
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                    <span
                      className="flex cursor-pointer hover:text-gray-800"
                      onClick={handleOnStudentSampleDownload}
                    >
                      Download <FileDownloadIcon />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetFileForm;
