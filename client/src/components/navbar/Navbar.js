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
    { link: "/admin/upload-result-file", name: "Upload Result" },
    { link: "/admin/upload-student-file", name: "Uplod Students File" },
    { link: "/admin/create-admin", name: "Create Admin" },
  ];

  const studentNavList = [{ link: "/", name: "Generate Result" }];

  return (
    <>
      {/* LOGO starts */}
      <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden bg-gray-50">
        <div className="flex p-4 items-center justify-center h-20 shadow-md">
          <img src="/logos/arka-jain-logo.png" alt="Arka Jain University" />
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
          text-gray-500 hover:text-red-400  cursor-pointer"
          onClick={handleOnClick}
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"></span>
          <span className="text-sm font-medium">
            {authorized ? "Logout" : "LogIn"}
          </span>
        </div>
        {/* LogIn/LogOut Button ends */}
      </div>
    </>
  );
}
