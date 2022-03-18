import Layout from "../Layout";
import AdminChangePasswordForm from "../../components/admin/AdminChangePasswordForm.js";

const AdminChangePasswordPage = () => {
  return (
    <Layout>
      <div className="w-3/5 mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl font-semibold block">Change Password</h1>
        <AdminChangePasswordForm />
      </div>
    </Layout>
  );
};

export default AdminChangePasswordPage;
