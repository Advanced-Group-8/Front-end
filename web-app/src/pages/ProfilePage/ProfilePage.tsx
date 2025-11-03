import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { UserGreetings } from "../../components/user/UserGreetings";

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
    <div className="text-center p-4 gap-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary-1 opacity-50">Profile Information</h1>
      <UserGreetings user={profile} />
      
      <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg">
        <p className="font-mono text-primary-1">User ID: {profile.id}</p>
        <div>
           <h3 className="font-semibold text-primary-1">User Information</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          
        </div>
        <div>
           <h3 className="font-semibold text-primary-1">Account Information</h3>
          <p>
            Created:{" "}
            {new Intl.DateTimeFormat("sv-SE", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(profile.createdAt))}
          </p>
          <p>Updated: {profile.updatedAt || "N/A"}</p>
        </div>

        <div>
          <h3 className="font-semibold text-primary-1">Company Information</h3>
          <p>Company: {profile.companyName}</p>
          <p>Role: {profile.role}</p>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
