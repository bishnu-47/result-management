import { Link } from "react-router-dom";

const SidebarList = ({ list }) => {
  return (
    <>
      <ul className="flex flex-col py-4 my-6">
        {list.map((item, i) => (
          <li key={i}>
            <Link
              to={item.link}
              className="flex flex-row text-sm text-gray-100 font-bold text-gray-500
              ml-10 items-center h-12 transform hover:translate-x-2 transition-transform
              ease-in duration-200 hover:text-brinjal"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarList;
