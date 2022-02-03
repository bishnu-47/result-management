import Layout from "../Layout";
import UploadResultForm from "../../components/admin/UploadResultForm";

const UploadResultPage = () => {
  return (
    <Layout>
      <span className="mb-4 text-xl block">Upload Result</span>
      <UploadResultForm />
    </Layout>
  );
};

export default UploadResultPage;
