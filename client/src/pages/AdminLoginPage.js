import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../redux/authSlice";
import { addInfoMsg } from "../redux/messagesSlice";

const AdminLoginPage = () => {
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleUserRegistration(e) {
    e.preventDefault();

    if (authorized) return dispatch(addInfoMsg("Please Logout first."));

    const admin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(adminLogin(admin));
    navigate("/");
  }

  return (
    <>
      <form
        onSubmit={handleUserRegistration}
        className="w-1/4 mx-auto py-5 my-5 bg-gray-300 text-center rounded-md"
      >
        <div>
          <label className="label justify-center">Email</label>
          <input type="email" className="input" ref={emailRef} />
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
          <Link to="/login" className="underline cursor-pointer">
            Student Login
          </Link>
        </span>
      </form>
    </>
  );
};

export default AdminLoginPage;
