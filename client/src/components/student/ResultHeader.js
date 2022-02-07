import ordinal from "ordinal";

const ResultHeader = ({ student, result }) => {
  const table1 = [
    { key: "Name", value: result.studentName },
    { key: "Father's Name", value: student.fatherName },
    { key: "Mother's Name", value: student.motherName },
    { key: "Program Name", value: result.branch },
  ];

  const table2 = [
    { key: "Registration No", value: result.enrollNo },
    { key: "Year of Registration", value: result.session.slice(0, 4) },
    { key: "Session", value: result.session },
    {
      key: "Examination",
      value: ordinal(parseInt(result.semester)) + " SEMESTER",
    },
  ];

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultHeader;
