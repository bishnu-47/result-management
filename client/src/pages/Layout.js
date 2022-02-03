import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <Navbar />

      <div className="w-full bg-slate-300 p-10">
        <div className="w-1/2 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
