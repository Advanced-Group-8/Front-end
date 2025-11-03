import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ClimateStatusListItem from "./ClimateStatusListItem";
import type { RootState } from "../../../store/store";

const ClimateStatusList = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const packagesFromStore = useSelector(
    (state: RootState) => state.packages.data ?? []
  );

  // If we have a URL param, show that specific package
  const selectedPackage = orderId
    ? packagesFromStore.find((pkg) => String(pkg.id) === orderId)
    : null;

  // Fallback: show the latest package if no orderId
  const packagesToShow = selectedPackage
    ? [selectedPackage]
    : packagesFromStore.slice(-1);

  if (packagesToShow.length === 0) return null; // nothing to display

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
