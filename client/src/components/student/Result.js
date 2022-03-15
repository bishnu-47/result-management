import React from "react";
import ResultHeader from "./ResultHeader";

const Result = React.forwardRef((props, ref) => {
  const result = props.result;
  const student = props.student;

  return (
    <div className="border rounded-xl mt-20">
      <div className="flex flex-col p-5" ref={ref}>
        <ResultHeader result={result} student={student} />

        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border text-center">
                {/* table head: STARTS */}
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                    >
                      Subject Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                    >
                      Max Marks
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                    >
                      Pass Marks
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4"
                    >
                      Marks Obtained
                    </th>
                  </tr>
                </thead>
                {/* table head: ENDS */}

                {/* table body: STARTS */}
                <tbody>
                  {result.subjects &&
                    result.subjects.map((sub, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                          {idx + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                          {sub.subjectName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                          {sub.fullMarks}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                          {sub.passMarks}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {sub.marks}
                        </td>
                      </tr>
                    ))}

                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r"></td>
                    <td
                      colSpan="3"
                      className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
                    >
                      Percentage
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {result.percentage + "%"}
                    </td>
                  </tr>
                </tbody>
                {/* table body: ENDS */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Result;
