import Layout from "../Layout";
import ManageStudentsList from "../../components/admin/ManageStudentsList.js";

const ManageStudentsPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-2/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl block">Manage Students</h1>
        <ManageStudentsList />
      </div>
    </Layout>
  );
};

export default ManageStudentsPage;
