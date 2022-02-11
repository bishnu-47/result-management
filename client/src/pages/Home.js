import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingPage from "./utils/LoadingPage";
import GenerateResultPage from "./student/GenerateResultPage";
import UploadResultPage from "./admin/UploadResultPage";

const Home = () => {
  const { loading, authorized, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      return navigate("/login");
    }
  }, [authorized]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : isAdmin ? (
        <UploadResultPage />
      ) : (
        <GenerateResultPage />
      )}
    </>
  );
};

export default Home;
