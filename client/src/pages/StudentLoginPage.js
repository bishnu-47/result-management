import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { studentLogin } from "../redux/authSlice";
import PasswordResetModal from "../components/utils/PasswordResetModal";

const StudentLoginPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const enrollRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) navigate("/");
  }, [authorized]);

  function handleStudentLogin(e) {
    e.preventDefault();

    const student = {
      enrollNo: enrollRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(studentLogin(student));
  }

  return (
    <>
      <PasswordResetModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={"student"}
      />
      <div className="flex items-center min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Sign in
              </h1>
              <p className="text-gray-500">Student Sign In</p>
            </div>
            <div className="m-7">
              <form onSubmit={handleStudentLogin}>
                <div className="mb-6">
                  {/* Enrollment Input : STARTS */}
                  <label className="block mb-2 text-sm text-gray-600">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    ref={enrollRef}
                    placeholder="AJU/123456"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
                {/* Enrollment Input : ENDS */}

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
                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md font-bold tracking-wide hover:bg-indigo-600 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                {/* Sign In btn : ENDS */}

                <p className="text-sm text-center text-gray-400">
                  Not a Student? Click for{" "}
                  <Link
                    to="/admin/login"
                    className="text-indigo-400 focus:outline-none hover:underline hover:text-indigo-500"
                  >
                    Admin Login
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

export default StudentLoginPage;
