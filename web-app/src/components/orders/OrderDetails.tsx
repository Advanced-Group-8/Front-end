import type { Package } from "../../types/types";
import { statusTextMap } from "./OrderDeliveryStatus/statusTextMap";

type OrderDetailsProps = {
  pkg: Package;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ pkg }) => {
  console.log("pkg in OrderDetails", pkg);
  
  const statusLabel =
    statusTextMap[pkg.status as keyof typeof statusTextMap] ?? pkg.status;

  return (
    <div className="bg-neutral-light-1 text-neutral-dark-1 p-6 rounded-xl max-w-xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="mb-2">
            <span className="font-semibold">Tracking Code:</span>
            <span className="ml-2">{pkg.trackingCode}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span>
            <span className="ml-2">{statusLabel}</span>
          </p>
          <p className="mb-2"></p>
        </div>
        <div>
          <p className="mb-2">
            <span className="font-semibold">Sender:</span>
            <span className="ml-2">
              {pkg.sender?.name} ({pkg.sender?.email})
            </span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Receiver:</span>
            <span className="ml-2">
              {pkg.receiver?.name} ({pkg.receiver?.email})
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-1">Sender Address</h3>
          <p>
            {pkg.senderAddress?.street}, {pkg.senderAddress?.city}
            <br />
            {pkg.senderAddress?.postalCode}, {pkg.senderAddress?.country}
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Receiver Address</h3>
          <p>
            {pkg.receiverAddress?.street}, {pkg.receiverAddress?.city}
            <br />
            {pkg.receiverAddress?.postalCode}, {pkg.receiverAddress?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
