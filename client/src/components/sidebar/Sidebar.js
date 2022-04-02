import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/authSlice";
import SidebarList from "./SidebarList";
import CrossIcon from "../utils/CrossIcon.js";

export default function Sidebar({ show, setShow }) {
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
    { link: "/admin/get-files", name: "Download Files" },
    { link: "/admin/edit-result", name: "Edit Result" },
    { link: "/admin/manage-students", name: "Manage Students" },
    { link: "/admin/change-password", name: "Change Password" },
  ];

  const studentNavList = [
    { link: "/", name: "Generate Result" },
    { link: "/change-password", name: "Change Password" },
  ];

  return (
    <>
      <div
        className={`top-0 right-0 fixed bg-slate-400 w-[50vw] md:w-[25vw] lg:w-[20vw] h-full ${
          show ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300`}
      >
        {/* NavList Starts */}
        <div>
          {isAdmin ? (
            <SidebarList list={adminNavList} />
          ) : (
            <SidebarList list={studentNavList} />
          )}
        </div>
        {/* NavList Starts */}

        {/* LogIn/LogOut Button starts */}
        <div
          className="transform
          hover:translate-x-2 transition-transform ease-in duration-200
          text-gray-100 hover:text-red-600 cursor-pointer"
          onClick={handleOnClick}
        >
          <span className="ml-10 text-sm font-bold">
            {authorized ? "Logout" : "LogIn"}
          </span>
        </div>
        {/* LogIn/LogOut Button ends */}
      </div>

      {/*Cross button : STARTS */}
      {show ? (
        <>
          <button
            className="fixed top-4 right-4 z-10"
            onClick={() => setShow(!show)}
          >
            <CrossIcon height={6} width={6} color="text-gray-100" />
          </button>
        </>
      ) : (
        ""
      )}
      {/*Cross button : ENDS */}
    </>
  );
}
