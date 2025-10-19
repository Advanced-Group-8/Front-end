import { useSelector } from "react-redux";
import ClimateStatusListItem from "./ClimateStatusListItem";
import type { RootState } from "../../../store/store";
import { MOCK_PACKAGES } from "../../../api/mockData";

const ClimateStatusList = () => {
  const packagesFromStore = useSelector((state: RootState) => state.packages.data ?? []);

    //! Use mock data if store is empty
  const packagesToShow = packagesFromStore.length > 0 ? packagesFromStore : MOCK_PACKAGES;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Climate Status</h1>
      <div className="grid grid-cols-4 gap-4 font-semibold w-full max-w-3xl text-center mb-2">
        <h2>ID</h2>
        <h2>Temperature</h2>
        <h2>Humidity</h2>
        <h2>Updated</h2>
      </div>
      <div className="w-full max-w-3xl">
        {packagesToShow.map((pkg) => (
          <ClimateStatusListItem
            key={pkg.id}
            packageId={pkg.id}
            readings={pkg.readings ?? []}
          />
        ))}
      </div>
    </div>
  );
};

export default ClimateStatusList;
