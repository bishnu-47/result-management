import Layout from "../Layout";
import AdminChangePasswordForm from "../../components/admin/AdminChangePasswordForm.js";

const AdminChangePasswordPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-2/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl font-semibold block">Change Password</h1>
        <AdminChangePasswordForm />
      </div>
    </Layout>
  );
};

export default AdminChangePasswordPage;
