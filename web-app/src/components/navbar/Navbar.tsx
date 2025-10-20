import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-1 text-neutral-light-1 p-4 flex justify-center list-none">
      <NavLink
        className={
          "mx-4 text-2xl hover:bg-neutral-light-1 hover:text-neutral-dark-1 p-2 rounded"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={
          "mx-4 text-2xl hover:bg-neutral-light-1 hover:text-neutral-dark-1 p-2 rounded"
        }
        to="orders"
      >
        Orderlist
      </NavLink>
      <NavLink
        className={
          "mx-4 text-2xl hover:bg-neutral-light-1 hover:text-neutral-dark-1 p-2 rounded"
        }
        to="profile"
      >
        Profile
      </NavLink>
      {
        localStorage.getItem('signatureRequestInitialized') === 'true' &&
        <NavLink
          className={
            "mx-4 text-2xl hover:bg-neutral-light-1 hover:text-neutral-dark-1 p-2 rounded"
          }
          to="signature"
        >
          Signature
        </NavLink>
      }
    </nav>
  );
};

export default Navbar;
