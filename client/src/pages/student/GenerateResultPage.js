import Layout from "../Layout";
import GetResultForm from "../../components/student/GetResultForm";

const GenerateResultPage = () => {
  return (
    <Layout>
      <div className="w-11/12 md:w-3/4 mx-auto bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="mb-4 text-xl font-semibold block">Get Result</h1>
        <GetResultForm />
      </div>
    </Layout>
  );
};

export default GenerateResultPage;
