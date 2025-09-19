import type { Package } from "../../types/types";

type OrderDetailsProps = {
  pkg: Package;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ pkg }) => {
  return (
    <div className="bg-white text-black p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p>
        <strong>Tracking Code:</strong> {pkg.trackingCode}
      </p>
      <p>
        <strong>Status:</strong> {pkg.status}
      </p>
      <p>
        <strong>ETA:</strong> {pkg.eta || "N/A"}
      </p>
      <p>
        <strong>Sender:</strong> {pkg.sender.name} ({pkg.sender.email})
      </p>
      <p>
        <strong>Receiver:</strong> {pkg.receiver.name} ({pkg.receiver.email})
      </p>
      <p>
        <strong>Sender Address:</strong> {pkg.senderAddress.street},{" "}
        {pkg.senderAddress.city}, {pkg.senderAddress.country}
      </p>
      <p>
        <strong>Receiver Address:</strong> {pkg.receiverAddress.street},{" "}
        {pkg.receiverAddress.city}, {pkg.receiverAddress.country}
      </p>
    </div>
  );
};

export default OrderDetails;
