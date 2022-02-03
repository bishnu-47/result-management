import { Link } from "react-router-dom";

const NavListItem = ({ link, name }) => {
  return (
    <Link
      to={link}
      className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
    >
      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
        <i className="bx bx-home"></i>
      </span>
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
};

export default NavListItem;
