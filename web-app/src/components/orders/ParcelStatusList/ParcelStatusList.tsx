import { useSelector } from "react-redux";
import ParcelStatusItem from "./ParcelStatusItem";
import type { RootState } from "../../../store/store";

const ParcelStatusList = () => {
  const packages = useSelector((state: RootState) => state.packages.data ?? []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Parcel Status</h1>
      <div className="grid grid-cols-4 gap-4 font-semibold w-full max-w-3xl text-center mb-2">
        <h2>ID</h2>
        <h2>Temperature</h2>
        <h2>Humidity</h2>
        <h2>Timestamp</h2>
      </div>
      <div className="w-full max-w-3xl">
        {packages.map((pkg) => (
          <ParcelStatusItem
            key={pkg.id}
            packageId={pkg.id}
            readings={pkg.readings ?? []}
          />
        ))}
      </div>
    </div>
  );
};

export default ParcelStatusList;
