import NavListItem from "./NavListItem";

const NavList = ({ list }) => {
  return (
    <>
      <ul className="flex flex-col py-4">
        {list.map((item, i) => (
          <li key={i}>
            <NavListItem link={item.link} name={item.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavList;
