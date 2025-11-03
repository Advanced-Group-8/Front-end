import { useSelector } from "react-redux";
import ReadingItem from "./ReadingItem";
import type { PackageTracking } from "../../types/types";
import type { RootState } from "../../store/store";

type ReadingsListProps = {
  pkgReadings: PackageTracking[];
};

const ReadingsList = ({ pkgReadings }: ReadingsListProps) => {
  const userRole = useSelector((state: RootState) => state.auth.profile?.role);
  const readingsArray = Array.isArray(pkgReadings) ? pkgReadings : [];

  console.log("readingsArray in ReadingsList", readingsArray);
  console.log("userRole in ReadingsList", userRole);

  // 👇 Decide what to show
  const visibleReadings =
    userRole === "receiver"
      ? readingsArray.slice(-1) // last item only
      : readingsArray;          // full list for others

  return (
    <div className="flex flex-col bg-neutral-light-1 pt-4 gap-1 rounded-xl max-w-xl w-full">
      <h3 className="text-center text-xl pb-2">Status Log</h3>

      {visibleReadings.length > 0 ? (
        visibleReadings.map((reading) => (
          <ReadingItem key={reading.id} reading={reading} />
        ))
      ) : (
        <p className="text-center text-gray-500 pb-2">No readings available</p>
      )}
    </div>
  );
};

export default ReadingsList;
