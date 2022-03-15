import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import Result from "../student/Result";

const Print = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <Result ref={componentRef} />
    </div>
  );
};

export default Print;
