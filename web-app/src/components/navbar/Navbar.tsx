import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-accent-4 text-accent-1 p-4 flex justify-center list-none">
      <li className="mx-4 text-2xl hover:bg-accent-2 hover:text-black p-2 rounded">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="mx-4 text-2xl hover:bg-accent-2 hover:text-black p-2 rounded">
        <NavLink to="orders">Orderlist</NavLink>
      </li>
    </nav>
  );
};

export default Navbar;
