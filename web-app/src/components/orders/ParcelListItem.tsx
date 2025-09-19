import type { PackageTracking } from "../../types/types";

type OrderTrackingProps = {
  readings: PackageTracking[];
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ readings }) => {
  return (
    <div className="bg-white text-black p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tracking Information</h2>
      {readings.length > 0 ? (
        <ul className="space-y-2">
          {readings.map((reading) => (
            <li key={reading.id}>
              <p>
                <strong>Temperature:</strong> {reading.temperature}°C
              </p>
              <p>
                <strong>Humidity:</strong> {reading.humidity}%
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(reading.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracking data available.</p>
      )}
    </div>
  );
};

export default OrderTracking;
