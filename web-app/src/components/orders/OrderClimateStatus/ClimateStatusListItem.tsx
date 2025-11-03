import type { PackageTracking } from "../../../types/types";
import redIcon from "../../../assets/svg/problem-!-red.svg";
import yellowIcon from "../../../assets/svg/problem-!-yellow.svg";

type ClimateStatusListItemProps = {
  readings: PackageTracking[];
  packageId: number | string;
  minTemp?: number;
  maxTemp?: number;
};

const ClimateStatusListItem: React.FC<ClimateStatusListItemProps> = ({
  readings,
  packageId,
  minTemp = 2,
  maxTemp = 8,
}) => {
  if (!readings.length) {
    return (
      <div className="grid grid-cols-4 gap-4 bg-primary-1/20 text-black p-4 rounded shadow-m text-center">
        <span>{packageId}</span>
        <span className="col-span-3">No tracking data available.</span>
      </div>
    );
  }

  // find the newest reading
  const latest = readings.reduce((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? a : b
  );

  const temperature = latest.temperature ?? null;
  const humidity = latest.humidity ?? null;
  const updatedAt = new Date(latest.createdAt);
  const now = new Date();

  const isOutOfRange =
    typeof temperature === "number" &&
    (temperature < minTemp || temperature > maxTemp);

  // mock duration: how long it's been out of range
  // If reading is older than 5 minutes → red, else yellow
  const minutesDiff = (now.getTime() - updatedAt.getTime()) / 60000;
  const isProblem = isOutOfRange && minutesDiff >= 5;
  const isWarning = isOutOfRange && minutesDiff < 5;

  // choose icon
  const statusIcon = isProblem ? redIcon : isWarning ? yellowIcon : null;

  return (
    <div
      className={`grid grid-cols-4 gap-11 p-4 rounded shadow-m text-center mb-2 transition ${
        isProblem
          ? "bg-red-100 border border-red-400 text-red-800"
          : isWarning
          ? "bg-yellow-100 border border-yellow-400 text-yellow-800"
          : "bg-primary-1/10 text-black"
      }`}
    >
      <span>{packageId}</span>
      <span className="flex justify-center items-center gap-2">
        {temperature}°C
        {statusIcon && (
          <img src={statusIcon} alt="Warning icon" className="w-5 h-5" />
        )}
      </span>
      <span>{humidity}%</span>
      <span>
        {updatedAt.toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      {(isWarning || isProblem) && (
        <div
          className={`col-span-4 mt-3 rounded border px-3 py-2 text-sm ${
            isProblem
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-yellow-300 bg-yellow-50 text-yellow-800"
          }`}
        >
          {isProblem ? (
            <>Temperature {temperature}°C has been outside the safe range ({minTemp}–{maxTemp}°C) for over 5 minutes.</>
          ) : (
            <>Temperature {temperature}°C is outside the safe range ({minTemp}–{maxTemp}°C).</>
          )}
        </div>
      )}
    </div>
  );
};

export default ClimateStatusListItem;
