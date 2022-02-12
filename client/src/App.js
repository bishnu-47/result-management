import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/Home";
import Alerts from "./components/Alerts";
import { checkAdmin, checkStudent } from "./redux/authSlice";

// student realeted
import StudentLoginPage from "./pages/StudentLoginPage";
import GenerateResultPage from "./pages/student/GenerateResultPage";
// admin releated
import AdminLoginPage from "./pages/AdminLoginPage";
import CreateAdminPage from "./pages/admin/CreateAdminPage";
import UploadResultPage from "./pages/admin/UploadResultPage";
import UploadStudentsPage from "./pages/admin/UploadStudentsPage";
import GetFilesPage from "./pages/admin/GetFilesPage";

// other pages
import PageNotFound from "./pages/utils/PageNotFound";
import LoadingPage from "./pages/utils/LoadingPage";

const App = () => {
  const { isAdmin, loading, isStudent } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkWhoUserIs = () => {
      dispatch(checkAdmin());
      dispatch(checkStudent());
    };
    checkWhoUserIs();
  }, []);

  return (
    <div className="h-screen">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Routes>
            {isAdmin && (
              <>
                <Route
                  path="/admin/upload-result-file"
                  element={<UploadResultPage />}
                  exact
                />
                <Route
                  path="/admin/upload-student-file"
                  element={<UploadStudentsPage />}
                  exact
                />
                <Route
                  path="/admin/get-files"
                  element={<GetFilesPage />}
                  exact
                />
                <Route
                  path="/admin/create-admin"
                  element={<CreateAdminPage />}
                  exact
                />
              </>
            )}
            {isStudent && (
              <>
                <Route path="/" element={<GenerateResultPage />} exact />
              </>
            )}
            <Route path="/admin/login" element={<AdminLoginPage />} exact />
            <Route path="/login" element={<StudentLoginPage />} exact />
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<PageNotFound />} exact />
          </Routes>

          <Alerts />
        </>
      )}
    </div>
  );
};

export default App;
