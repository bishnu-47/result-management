import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAllMsg } from "../redux/messagesSlice";
import CrossIcon from "./utils/CrossIcon";

const Alerts = () => {
  const { error, info, warning, success } = useSelector(
    (state) => state.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return setTimeout(() => {
      dispatch(removeAllMsg());
    }, 5000);
  }, [error, info, warning, success]);

  function handleRemoveMsg() {
    dispatch(removeAllMsg());
  }

  // styles
  const crossIconStyle = "ml-5 hidden md:inline";

  return (
    <div>
      <div className="fixed ml-5 mb-5 bottom-0 left-0">
        {error && (
          <div
            className="alert flex-1 cursor-pointer bg-red-600 text-white font-bold"
            onClick={handleRemoveMsg}
          >
            {error}
            <span className={crossIconStyle}>
              <CrossIcon />
            </span>
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {success && (
          <div
            className="alert flex-1 cursor-pointer bg-green-500 text-white font-bold"
            onClick={handleRemoveMsg}
          >
            {success}
            <span className={crossIconStyle}>
              <CrossIcon />
            </span>
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {info && (
          <div
            className="alert flex-1 cursor-pointer bg-blue-500 text-white font-bold"
            onClick={handleRemoveMsg}
          >
            {info}
            <span className={crossIconStyle}>
              <CrossIcon />
            </span>
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {warning && (
          <div
            className="alert flex-2 cursor-pointer bg-yellow-400 text-gray-200 font-bold"
            onClick={handleRemoveMsg}
          >
            {warning}
            <span className={crossIconStyle}>
              <CrossIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
