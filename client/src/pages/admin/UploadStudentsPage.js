import Layout from "../Layout";
import UploadStudentsForm from "../../components/admin/UploadStudentsForm";

const UploadStudentsPage = () => {
  return (
    <Layout>
      <span className="mb-4 text-xl block">Upload Students Details File</span>
      <UploadStudentsForm />
    </Layout>
  );
};

export default UploadStudentsPage;
