import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-1 text-neutral-1 p-4 flex justify-center list-none">
      <li className="mx-4 text-2xl hover:bg-accent-2 hover:text-neutral-2 p-2 rounded">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="mx-4 text-2xl hover:bg-accent-2 hover:text-neutral-2 p-2 rounded">
        <NavLink to="orders">Orderlist</NavLink>
      </li>
    </nav>
  );
};

export default Navbar;
