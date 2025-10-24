import { useDispatch, useSelector } from "react-redux";
/* import ProfilePage from "./ProfilePage"; */
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserProfile } from "../store/userSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile: user, loading } = useSelector((state: RootState) => state.user);

    // Fetch profile once on mount if not already fetched
  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUserProfile());
      }
  }, [dispatch, user, loading]);

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

