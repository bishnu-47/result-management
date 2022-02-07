import Layout from "../Layout";
import UploadStudentsForm from "../../components/admin/UploadStudentsForm";

const UploadStudentsPage = () => {
  return (
    <Layout>
      <div className="w-2/4 p-8 mx-auto bg-white rounded-md shadow-xl">
        <h1 className="mb-4 text-xl block">Upload Students Details File</h1>
        <UploadStudentsForm />
      </div>
    </Layout>
  );
};

export default UploadStudentsPage;
