import ReadingItem from "./ReadingItem";
import type { PackageTracking } from "../../types/types";

type ReadingsListProps = {
  pkgReadings: PackageTracking[];
};
const ReadingsList = (props: ReadingsListProps) => {
  const readingsArray = Array.isArray(props.pkgReadings)
    ? props.pkgReadings
    : [];
  console.log("readingsArray in ReadingsList", readingsArray);

  return (
    <div className="flex flex-col bg-neutral-light-1 pt-4 gap-1 rounded-xl max-w-xl w-full">
      <h3 className="text-center text-xl pb-2">Status Log</h3>

      {readingsArray.map((reading) => (
        <ReadingItem key={reading.id} reading={reading} />
      ))}
    </div>
  );
};

export default ReadingsList;
