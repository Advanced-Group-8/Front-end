import React from "react";
import type { Package } from "../../types/types";
import CTACard from "../CTA/CTACard";
import ReadingsList from "../readingsList/ReadingsList-test";
import { statusTextMap } from "./OrderDeliveryStatus/statusTextMap";
import OrderDetailsItem from "./OrderDetailsItem";

type OrderDetailsProps = {
  pkg: Package;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ pkg }) => {
  const statusLabel =
    statusTextMap[pkg.status as keyof typeof statusTextMap] ?? pkg.status;

  // Define your package info in an array
  const packageInfo = [
    { title: "Package ID:", input: pkg.id },
    { title: "Tracking Code:", input: pkg.trackingCode },
    {
      title: "Sender:",
      input: `${pkg.sender?.name ?? "N/A"} (${pkg.sender?.email ?? "N/A"})`,
    },
    {
      title: "Receiver:",
      input: `${pkg.receiver?.name ?? "N/A"} (${pkg.receiver?.email ?? "N/A"})`,
    },
    { title: "Status:", input: statusLabel },
  ];

  return (
      <div>
      <div className="bg-neutral-light-1 text-neutral-dark-1 p-6 rounded-xl max-w-xl mx-auto mt-8">
        <h2 className="text-center text-2xl font-bold mb-4">Order Details</h2>
        <div className="flex-col mb-4">
          {/* Map through the info items */}
          {packageInfo.map((item, index) => (
            <OrderDetailsItem
              key={index}
              title={item.title}
              input={item.input}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

      <CTACard onClick={() => {}}></CTACard>
    </div>
  );
};

export default OrderDetails;
