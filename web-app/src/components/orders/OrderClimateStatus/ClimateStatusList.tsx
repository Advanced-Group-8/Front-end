import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ClimateStatusListItem from "./ClimateStatusListItem";
import type { RootState } from "../../../store/store";

// ✅ Mock per-package limits (fallback to default if not listed)
const DEFAULT_LIMITS = { min: 0, max: 8 }; // °C
const MOCK_LIMITS: Record<number, { min: number; max: number }> = {
  16: { min: 0, max: 8 },
  12: { min: 0, max: 8 },
  // add more ids if you want
};

const ClimateStatusList = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");

  const packages = useSelector((s: RootState) => s.packages.data ?? []);
  const selected = orderId ? packages.find(p => String(p.id) === orderId) : null;
  const source = selected ? [selected] : packages.slice(-1);

  if (source.length === 0) return null;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Climate Status</h1>

      <div className="grid grid-cols-4 gap-4 font-semibold w-full max-w-3xl text-center mb-2">
        <h2>ID</h2>
        <h2 className="overflow-ellipsis overflow-clip">Temperature</h2>
        <h2 className="overflow-ellipsis overflow-clip">Humidity</h2>
        <h2 className="overflow-ellipsis overflow-clip">Updated</h2>
      </div>

      <div className="w-full max-w-3xl">
        {source.map(pkg => {
          const limits = MOCK_LIMITS[pkg.id] ?? DEFAULT_LIMITS;
          return (
            <ClimateStatusListItem
              key={pkg.id}
              packageId={pkg.id}
              readings={pkg.readings ?? []}
              minTemp={limits.min}
              maxTemp={limits.max}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClimateStatusList;
