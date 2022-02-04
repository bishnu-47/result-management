import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

import NavList from "./NavList";

export default function Navbar() {
  const { authorized, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleOnClick() {
    if (authorized) dispatch(logout());
    navigate("/login");
  }

  const adminNavList = [
    { link: "/admin/create-admin", name: "Create Admin" },
    { link: "/admin/upload-result-file", name: "Upload Result" },
    { link: "/admin/upload-student-file", name: "Uplod Students File" },
  ];

  const studentNavList = [{ link: "/", name: "Home" }];

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* LOGO starts */}
      <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-indigo-500">Logo</h1>
        </div>
        {/* LOGO Ends */}

        {/* NavList Starts */}
        <div>
          {isAdmin ? (
            <NavList list={adminNavList} />
          ) : (
            <NavList list={studentNavList} />
          )}
        </div>
        {/* NavList Starts */}

        {/* LogIn/LogOut Button starts */}
        <div
          className="flex flex-row items-center h-12 transform
          hover:translate-x-2 transition-transform ease-in duration-200
          text-gray-500 hover:text-gray-800  cursor-pointer"
          onClick={handleOnClick}
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i className="bx bx-log-out"></i>
          </span>
          <span className="text-sm font-medium">
            {authorized ? "Logout" : "LogIn"}
          </span>
        </div>
        {/* LogIn/LogOut Button ends */}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-purple-400">
      <div className="btn"></div>
    </div>
  );
}
