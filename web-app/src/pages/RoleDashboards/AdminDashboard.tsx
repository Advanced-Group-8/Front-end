import IconButton from "../../components/buttons/IconButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { UserGreetings } from "../../components/user/UserGreetings";

const AdminDashboard = () => {
  const { profile, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <p>Loading...</p>;

  if (!profile) {
    return (
      <div className="text-center mt-8">
        <p className="mb-4">Sign in to view your orders!</p>
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
    <div className="p-4 flex flex-col items-center flex-wrap gap-4">
      <h1 className="text-4xl font-bold text-primary-1 opacity-50">Receiver Dashboard </h1>
      <UserGreetings user={profile} />
        <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg">
        <IconButton iconVariant="search" onClick={() => (window.location.href = "/orders")}> Search for packages</IconButton>
        </div>
    </div>
  );
};

export default AdminDashboard;