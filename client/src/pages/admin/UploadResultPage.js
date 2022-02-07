import Layout from "../Layout";
import UploadResultForm from "../../components/admin/UploadResultForm";

const UploadResultPage = () => {
  return (
    <Layout>
      <div className="w-2/4 mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl block">Upload Result</h1>
        <UploadResultForm />
      </div>
    </Layout>
  );
};

export default UploadResultPage;
