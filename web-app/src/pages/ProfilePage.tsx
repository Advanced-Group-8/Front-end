import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { profile, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <p>Loading...</p>;

  if (!profile) {
    return (
      <div className="text-center mt-8">
        <p className="mb-4">You need to be logged in to view your profile.</p>
        <Link
          to="/sign-in"
          className="text-primary-1 underline hover:text-primary-1/80"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center bg-neutral-300 p-2">
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Company: {profile.companyName}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default ProfilePage;
