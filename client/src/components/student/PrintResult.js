import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import Result from "./Result.js";

const PrintResult = ({ result, student }) => {
  const componentRef = useRef();
  const fileName = `Result_${result.enrollNo}-Sem_${result.semester}-${result.branch}-${result.session}`

  return (
    <div>
      <Result result={result} student={student} ref={componentRef} />
      <ReactToPrint
        trigger={() => <button className="btn mt-5">Print Result</button>}
        content={() => componentRef.current}
        documentTitle={fileName}
      />
    </div>
  );
};

export default PrintResult;
