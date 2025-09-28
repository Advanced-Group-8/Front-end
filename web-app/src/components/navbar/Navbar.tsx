import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-1 text-neutral-1 p-4 flex justify-center list-none">
      <NavLink
        className={
          "mx-4 text-2xl hover:bg-neutral-1 hover:text-neutral-2 p-2 rounded"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={
          "mx-4 text-2xl hover:bg-neutral-1 hover:text-neutral-2 p-2 rounded"
        }
        to="orders"
      >
        Orderlist
      </NavLink>
    </nav>
  );
};

export default Navbar;
