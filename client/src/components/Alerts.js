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

  return (
    <div>
      <div className="fixed ml-5 mb-5 bottom-0 left-0">
        {error && (
          <div
            className="alert alert-error flex-1 cursor-pointer"
            onClick={handleRemoveMsg}
          >
            {error}
            <CrossIcon />
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {success && (
          <div
            className="alert alert-success flex-1 cursor-pointer"
            onClick={handleRemoveMsg}
          >
            {success}
            <CrossIcon />
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {info && (
          <div
            className="alert alert-info flex-1 cursor-pointer"
            onClick={handleRemoveMsg}
          >
            {info}
            <CrossIcon />
          </div>
        )}
      </div>

      <div className="fixed ml-5 mb-5 bottom-0">
        {warning && (
          <div
            className="alert alert-warning flex-1 cursor-pointer"
            onClick={handleRemoveMsg}
          >
            {warning}
            <CrossIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
