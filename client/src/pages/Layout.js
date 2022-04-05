import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import HamburgerIcon from "../components/utils/HamburgerIcon.js";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav
        className={`h-16 md:h-20 flex justify-between items-center bg-brinjal ${
          show ? "brightness-[0.3]" : ""
        }`}
      >
        <img
          className="h-16 md:h-20 p-1 rounded-md"
          src="/logos/arka-jain-logo.png"
          alt="Arka Jain University"
        />
        <span className="mr-5 cursor-pointer" onClick={() => setShow(!show)}>
          <HamburgerIcon height={12} width={12} color="text-white" />
        </span>
      </nav>

      <aside
        className={`z-20 fixed top-0 right-0 bg-slate-400 w-[50vw] md:w-[25vw] lg:w-[20vw] h-full ${
          show ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-300`}
      >
        <Sidebar show={show} setShow={setShow} />
      </aside>

      <main
        className={`w-full h-auto min-h-screen bg-slate-300 pt-10 md:p-10 ${
          show ? "brightness-[0.3]" : ""
        }`}
      >
        <div className="pb-10">{children}</div>
      </main>
    </>
  );
};

export default Layout;
