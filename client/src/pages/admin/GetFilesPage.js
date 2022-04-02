import Layout from "../Layout";
import GetFileForm from "../../components/admin/GetFileForm.js";

const GetFilesPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-3/4 lg:w-2/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl block">Download Templates and Samples</h1>
        <GetFileForm />
      </div>
    </Layout>
  );
};

export default GetFilesPage;
