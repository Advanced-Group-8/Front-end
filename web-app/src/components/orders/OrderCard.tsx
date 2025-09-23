import type { Package } from "../../types/types";

type OrderCardProps = {
  pkg: Package;
  onClick?: () => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ pkg, onClick }) => {
  return (
    <div
      className="bg-white text-black p-4 rounded shadow-md cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <p>
        <strong>Tracking code:</strong> {pkg.trackingCode}
      </p>
      <p>
        <strong>Status:</strong> {pkg.status}
      </p>
      <p>
        <strong>Estimated delivery:</strong>{" "}
        {pkg.eta
          ? new Date(pkg.eta).toLocaleString("sv-SE", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "N/A"}
      </p>
      <p>
        <strong>ID:</strong> {pkg.id}
      </p>
      <p>
        <strong>Device ID:</strong> {pkg.deviceId}
      </p>
    </div>
  );
};

export default OrderCard;
