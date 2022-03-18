import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../redux/authSlice";
import { addInfoMsg } from "../redux/messagesSlice";
import PasswordResetModal from "../components/utils/PasswordResetModal";

const AdminLoginPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (authorized) navigate("/admin/upload-result-file");
  }, [authorized]);

  function handleAdminLogin(e) {
    e.preventDefault();

    if (authorized) return dispatch(addInfoMsg("Please Logout first."));
    const admin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(adminLogin(admin));

    if (authorized) {
      navigate("/admin/upload-result-file");
    }
  }

  return (
    <>
      <PasswordResetModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={"admin"}
      />
      <div className="flex items-center min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Sign in
              </h1>
              <p className="text-gray-500">Admin Sign In</p>
            </div>
            <div className="m-7">
              <form onSubmit={handleAdminLogin}>
                <div className="mb-6">
                  {/* Email Input : STARTS */}
                  <label className="block mb-2 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    placeholder="xyz@gmail.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
                {/* Email Input : ENDS */}

                {/* Password : STARTS */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-gray-600">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
                {/* Password : ENDS */}

                {/* Sign In btn : STARTS */}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white font-bold tracking-wide bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                {/* Sign In btn : ENDS */}

                <p className="text-sm text-center text-gray-400">
                  Not an Admin? Click for{" "}
                  <Link
                    to="/login"
                    className="text-indigo-400 focus:outline-none hover:underline hover:text-indigo-500"
                  >
                    Student Login
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
