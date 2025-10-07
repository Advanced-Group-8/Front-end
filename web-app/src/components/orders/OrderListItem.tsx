import React, { useState } from "react";
import type { Package } from "../../types/types";
import OrderDeliveryStatus from "./OrderDeliveryStatus/OrderDeliveryStatus";

type OrderListItemProps = {
  packages: Package[];
  onOrderClick?: (id: number) => void;
};

const OrderListItem: React.FC<OrderListItemProps> = ({
  packages,
  onOrderClick,
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 mx-auto max-w-2xl rounded-lg ring-2 ring-primary-1">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`bg-white text-black p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 ${
            expandedId === pkg.id ? "ring-4 ring-primary-1" : ""
          }`}
          onClick={() => handleExpand(pkg.id)}
        >
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <p className="font-semibold">{pkg.trackingCode}</p>
            </div>
            <div className="flex justify-end">
              <OrderDeliveryStatus status={pkg.status} />
            </div>
            {expandedId === pkg.id && (
              <>
                <div className="col-span-2">
                  <p>
                    <strong>Estimated delivery:</strong>{" "}
                    {pkg.eta
                      ? new Date(pkg.eta).toLocaleString("sv-SE", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="col-span-2 flex gap-4 mt-4 justify-center">
                  <button className="w-fit text-black font-bold bg-gray-200 rounded-2xl px-4 py-2">
                    Track
                  </button>
                  {onOrderClick && (
                    <button
                      className="w-fit px-4 py-2 bg-primary-1 text-neutral-1 font-bold rounded-2xl hover:bg-primary-1/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderClick(pkg.id);
                      }}
                    >
                      More details
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListItem;
