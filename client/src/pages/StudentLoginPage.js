import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { studentLogin } from "../redux/authSlice";

const StudentLoginPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign in
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Student Sign In</p>
          </div>
          <div className="m-7">
            <form onSubmit={handleStudentLogin}>
              <div className="mb-6">
                {/* Enrollment Input : STARTS */}
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  ref={enrollRef}
                  placeholder="AJU/123456"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              {/* Enrollment Input : ENDS */}

              {/* Password : STARTS */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Password
                  </label>
                  {/* <a
                    href="#!"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a> */}
                </div>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
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
                  className="text-indigo-400 focus:outline-none hover:underline hover:text-indigo-500 dark:focus:border-indigo-800"
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
  );
};

export default StudentLoginPage;
