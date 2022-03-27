import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addErrorMsg,
  addSuccessMsg,
  addWarningMsg,
} from "../../redux/messagesSlice";

const AdminChangePasswordForm = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // refs
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  async function onChangePassword(e) {
    e.preventDefault();

    const currentPassword = currentPasswordRef.current.value.trim();
    const newPassword = newPasswordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();
    // check passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      return dispatch(addWarningMsg("Please Enter all fields!"));
    }

    // if new pass & confirm pass dosen't match
    if (newPassword !== confirmPassword) {
      return dispatch(addWarningMsg("Passwords dosen't match!"));
    }

    // change password
    try {
      const res = await axios.post(
        "/api/admin/password/change",
        { currentPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      // on success
      dispatch(addSuccessMsg(res.data.msg));
    } catch (err) {
      if (err.response) {
        dispatch(addErrorMsg(err.response.data.msg));
      } else {
        dispatch(addErrorMsg("There was a problem with the server"));
      }
    }
  }

  return (
    <>
      <form onSubmit={onChangePassword}>
        {/* current password: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Current Password
          </label>
          <input
            type="text"
            ref={currentPasswordRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* current password: ENDS */}

        {/* new password: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            New Password
          </label>
          <input
            type="password"
            ref={newPasswordRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* new password: ENDS */}

        {/* confirm password: STARTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <input
            type="password"
            ref={confirmPasswordRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* confirm password: ENDS */}

        {/* Submit Btn: STARTS */}
        <button
          type="submit"
          className="text-white bg-gray-800 mt-6 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
        >
          Change
        </button>
        {/* Submit Btn: ENDS */}
      </form>
    </>
  );
};

export default AdminChangePasswordForm;
