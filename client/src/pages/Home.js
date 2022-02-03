import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "./Layout";

const Home = () => {
  const { loading, authorized, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      {loading ? (
        "Loading"
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
