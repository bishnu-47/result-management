import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/Home";
import Alerts from "./components/Alerts";
import { checkAdmin } from "./redux/authSlice";

import StudentLoginPage from "./pages/StudentLoginPage";
import PageNotFound from "./pages/utils/PageNotFound";
import LoadingPage from "./pages/utils/LoadingPage";

// admin releated
import AdminLoginPage from "./pages/AdminLoginPage";
import CreateAdminPage from "./pages/admin/CreateAdminPage";
import UploadResultPage from "./pages/admin/UploadResultPage";
import UploadStudentsPage from "./pages/admin/UploadStudentsPage";

const App = () => {
  const { isAdmin, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdmin());
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
                  path="/admin/create-admin"
                  element={<CreateAdminPage />}
                  exact
                />
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
                <Route path="*" element={<PageNotFound />} exact />
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
