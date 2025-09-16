import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackages } from "../store/packageSlice";
import type { RootState, AppDispatch } from "../store/store";

const Orderlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center font-bold p-6">Loading...</p>;
  }

  if (error) {
    return <p className="text-center font-bold p-6">{error}</p>;
  }

  return (
    <div className="bg-accent-4 text-accent-1 p-8">
      <h1 className="text-center text-4xl font-bold mb-8">Order List</h1>
      {packages.length > 0 ? (
        <ul className="space-y-4">
          {packages.map((pkg) => (
            <li
              key={pkg.id}
              className="bg-white text-black p-4 rounded shadow-md"
            >
              <p>
                <strong>Tracking Code:</strong> {pkg.trackingCode}
              </p>
              <p>
                <strong>Status:</strong> {pkg.status}
              </p>
              <p>
                <strong>ETA:</strong> {pkg.eta || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No packages available.</p>
      )}
    </div>
  );
};

export default Orderlist;
