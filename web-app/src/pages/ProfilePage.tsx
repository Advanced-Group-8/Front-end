import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserProfile } from "../store/userSlice";


const ProfilePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!profile && token) dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
/*   if (error) return <p>Error: {error}</p>; */

  if (!profile) {
    // User not logged in or fetch failed
    return <div>
    <p>
      Please sign in
      <br />
      <a href="/sign-in">Sign in</a>
    </p>
    </div>;
  }

  // Now profile is guaranteed to be not null
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Company: {profile.companyName}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};


export default ProfilePage;

