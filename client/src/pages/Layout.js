import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-row bg-gray-50">
      <div className="sticky">
        <Navbar />
      </div>

      <div className=" w-full bg-slate-300 p-10">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
