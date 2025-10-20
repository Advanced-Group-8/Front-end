import { useDispatch, useSelector } from "react-redux";
/* import ProfilePage from "./ProfilePage"; */
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserProfile } from "../store/userSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.profile);

    // Fetch profile once on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      {user && <h2>Greetings {user.name}!</h2>}
      {!user && <div><p>Not logged in</p><a href="/sign-in">Sign in</a></div>}

      <div className="bg-accent-4 text-accent-1 flex text-center m-auto h-screen items-center justify-center text-4xl font-bold">
        Home
      </div>

    </>
  );
};

export default Home;

