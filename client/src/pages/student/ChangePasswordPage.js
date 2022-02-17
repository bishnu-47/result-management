import Layout from "../Layout";
import ChangePasswordForm from "../../components/student/ChangePasswordForm.js";

const ChangePasswordPage = () => {
  return (
    <Layout>
      <div className="w-3/5 mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl font-semibold block">Change Password</h1>
        <ChangePasswordForm />
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
