import React from "react";

const Result = ({ result, student }) => {
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full border text-center">
              {/* table head: STARTS */}
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Subject Name
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Max Marks
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                  >
                    Pass Marks
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4"
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
                    <tr key={idx} class="border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                        {idx + 1}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {sub.subjectName}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {sub.fullMarks}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        {sub.passMarks}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {sub.marks}
                      </td>
                    </tr>
                  ))}

                <tr class="bg-white border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                    3
                  </td>
                  <td
                    colspan="2"
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
                  >
                    Larry the Bird
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    @twitter
                  </td>
                </tr>
              </tbody>
              {/* table body: ENDS */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
