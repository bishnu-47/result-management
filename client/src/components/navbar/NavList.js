import NavListItem from "./NavListItem";

const NavList = ({ list }) => {
  return (
    <div>
      <ul className="flex flex-col py-4">
        {list.map((item, i) => (
          <li key={i}>
            <NavListItem link={item.link} name={item.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavList;
