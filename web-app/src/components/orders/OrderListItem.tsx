import React, { use, useState } from "react";
import type { Package } from "../../types/types";
import OrderDeliveryStatus from "./OrderDeliveryStatus/OrderDeliveryStatus";
import TextButton from "../buttons/TextButton.tsx";
import { useSearchParams } from "react-router-dom";

type OrderListItemProps = {
  pkg: Package;
};


const OrderListItem: React.FC<OrderListItemProps> = ({ pkg }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(!expanded);

const handleToggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    const current = searchParams.get("orderId");

    if (current === pkg.id.toString()) {
      // Remove param
      searchParams.delete("orderId");
      setSearchParams(searchParams);
      console.log("Hide details for orderId", searchParams.get("orderId"));
    } else {
      // Set param
      setSearchParams({ orderId: pkg.id.toString() });
      console.log("Show details for orderId", searchParams.get("orderId"));
    }
  };
  
  
  return (
    <div className="space-y-4 mx-auto max-w-2xl rounded-lg">
        <div
          key={pkg.id}
          className={`bg-neutral-light-1 text-neutral-dark-1 p-4 rounded-lg ring-2 ring-primary-1 shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 ${
            expanded ? "ring-4 ring-primary-1" : ""
          }`}
          onClick={handleExpand}
        >
          <div className="grid grid-cols-2 gap-2 items-center">
            <div>
              <p className="font-semibold text-left">{pkg.trackingCode}</p>
            </div>
            <div className="flex justify-end">
              <OrderDeliveryStatus status={pkg.status} />
            </div>
            {expanded && (
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
                    onClick={(e) => handleToggleDetails(e)}
                  >
                    {searchParams.get("orderId") === pkg.id.toString()
                      ? "Hide details"
                      : "More details"}
                  </TextButton>
                </div>
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default OrderListItem;

