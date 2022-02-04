import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "./Layout";
import LoadingPage from "./utils/LoadingPage";

const Home = () => {
  const { loading, authorized, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : isAdmin ? (
        <Layout>
          <span>Admin page</span>
        </Layout>
      ) : (
        <Layout>
          <span>Student Page</span>
        </Layout>
      )}
    </>
  );
};

export default Home;
