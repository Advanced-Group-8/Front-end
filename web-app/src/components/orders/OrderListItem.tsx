import React, { useState } from "react";
import type { Package } from "../../types/types";
import OrderDeliveryStatus from "./OrderDeliveryStatus/OrderDeliveryStatus";
import OrderDetails from "./OrderDetails";
import TextButton from "../buttons/TextButton.tsx";

type OrderListItemProps = {
  packages: Package[];
  onOrderClick?: (id: number) => void;
};

const OrderListItem: React.FC<OrderListItemProps> = ({ packages }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailsExpandedId, setDetailsExpandedId] = useState<number | null>(
    null
  );

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToggleDetails = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDetailsExpandedId(detailsExpandedId === id ? null : id);
  };

  return (
    <div className="space-y-4 mx-auto max-w-2xl rounded-lg">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`bg-neutral-light-1 text-neutral-dark-1 p-4 rounded-lg ring-2 ring-primary-1 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 ${
            expandedId === pkg.id ? "ring-4 ring-primary-1" : ""
          }`}
          onClick={() => handleExpand(pkg.id)}
        >
          <div className="grid grid-cols-2 gap-2 items-center">
            <div>
              <p className="font-semibold text-left">{pkg.trackingCode}</p>
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
                  <TextButton
                    size="medium"
                    variant="secondary"
                    disabled
                    onClick={() => {}}
                  >
                    Track
                  </TextButton>

                  <TextButton
                    size="medium"
                    variant="primary"
                    onClick={(e) => handleToggleDetails(e, pkg.id)}
                  >
                    {detailsExpandedId === pkg.id
                      ? "Hide details"
                      : "More details"}
                  </TextButton>
                </div>

                {detailsExpandedId === pkg.id && (
                  <div className="col-span-2 mt-4">
                    <OrderDetails pkg={pkg} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListItem;
