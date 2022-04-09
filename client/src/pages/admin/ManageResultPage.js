import Layout from "../Layout";
import ManageResultList from "../../components/admin/ManageResultList.js";

const ManageResultPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-3/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl block">Manage Result Data</h1>
        <ManageResultList />
      </div>
    </Layout>
  );
};

export default ManageResultPage;
