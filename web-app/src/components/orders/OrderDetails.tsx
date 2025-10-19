import type { Package } from "../../types/types";

type OrderDetailsProps = {
  pkg: Package;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ pkg }) => {
  return (
    <div className="bg-white text-black p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-8 border-2 border-primary-1">
      <h2 className="text-3xl font-bold mb-6 text-primary-1 text-center">
        Order Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="mb-2">
            <span className="font-semibold">Tracking Code:</span>
            <span className="ml-2">{pkg.trackingCode}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span>
            <span className="ml-2">{pkg.status}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Estimated Delivery:</span>
            <span className="ml-2">
              {pkg.eta
                ? new Date(pkg.eta).toLocaleString("sv-SE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </span>
          </p>
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
          <h3 className="font-bold mb-1 text-primary-1">Sender Address</h3>
          <p>
            {pkg.senderAddress?.street}, {pkg.senderAddress?.city}
            <br />
            {pkg.senderAddress?.postalCode}, {pkg.senderAddress?.country}
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-1 text-primary-1">Receiver Address</h3>
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
