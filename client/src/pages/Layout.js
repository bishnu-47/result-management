import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex  bg-gray-50">
      <aside className="h-screen sticky top-0">
        <Navbar />
      </aside>

      <main className="w-full bg-slate-300 p-10">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
