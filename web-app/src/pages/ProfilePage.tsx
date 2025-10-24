import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


const ProfilePage = () => {

  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!profile) {
    return <div>
    <p>
      Please sign in
      <br />
      <a href="/sign-in">Sign in</a>
    </p>
    </div>;
  }

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

