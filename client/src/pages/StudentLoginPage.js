import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../redux/authSlice";

const StudentLoginPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const enrollRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) navigate("/");
  }, [authorized]);

  function handleUserLogin(e) {
    e.preventDefault();

    const user = {
      email: enrollRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(loginUser(user));
  }

  return (
    <>
      <form
        onSubmit={handleUserLogin}
        className="w-1/4 mx-auto py-5 my-5 bg-gray-300 text-center rounded-md"
      >
        <div>
          <label className="label justify-center">Email</label>
          <input type="email" className="input" ref={enrollRef} />
        </div>

        <div>
          <label className="label justify-center">Password</label>
          <input type="password" className="input" ref={passwordRef} />
        </div>

        <button type="submit" className="btn mt-5">
          Login
        </button>

        <span className="block mt-4 text-sm">
          Click for{" "}
          <Link to="/admin/login" className="underline pointer">
            Admin Login
          </Link>
        </span>
      </form>
    </>
  );
};

export default StudentLoginPage;
