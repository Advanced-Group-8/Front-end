import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.profile);

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <nav className="text-neutral-light-1 flex-1 p-4 flex justify-center items-center list-none">
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
      {localStorage.getItem("signatureRequestInitialized") === "true" && (
        <NavLink
          className={
            "mx-4 text-2xl hover:bg-neutral-light-1 hover:text-neutral-dark-1 p-2 rounded"
          }
          to="signature"
        >
          Signature
        </NavLink>
      )}
      <div className="flex-1" />
      {isLoggedIn ? (
        <button
          onClick={handleSignOut}
          className="ml-auto px-4 py-2 bg-neutral-light-1 text-primary-1 rounded hover:bg-neutral-200 font-semibold"
        >
          Sign out
        </button>
      ) : (
        <NavLink
          className="ml-auto px-4 py-2 bg-neutral-light-1 text-primary-1 rounded hover:bg-neutral-200 font-semibold"
          to="/sign-in"
        >
          Sign in
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
