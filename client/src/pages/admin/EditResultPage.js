import Layout from "../Layout";
import EditResult from "../../components/admin/EditResult";

const EditResultPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-2/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl block">Edit Result</h1>

        <EditResult />
      </div>
    </Layout>
  );
};

export default EditResultPage;
