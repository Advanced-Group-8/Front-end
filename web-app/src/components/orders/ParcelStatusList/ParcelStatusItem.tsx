import type { PackageTracking } from "../../../types/types";

type PackageTrackingProps = {
  readings: PackageTracking[];
  packageId: number | string;
};

const ParcelStatusItem: React.FC<PackageTrackingProps> = ({
  readings,
  packageId,
}) => {
  if (!readings.length) {
    return (
      <div className="grid grid-cols-4 gap-4 bg-accent-1 text-black p-4 rounded shadow-m text-center">
        <span>{packageId}</span>
        <span className="col-span-3">No tracking data available.</span>
      </div>
    );
  }

  const latest = readings.reduce((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? a : b
  );

  return (
    <div className="grid grid-cols-4 gap-11 bg-accent-1 text-black p-4 rounded shadow-m text-center mb-2">
      <span>{packageId}</span>
      <span>{latest.temperature}°C</span>
      <span>{latest.humidity}%</span>
      <span>
        {new Date(latest.createdAt).toLocaleString("sv-SE", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </span>
    </div>
  );
};

export default ParcelStatusItem;
