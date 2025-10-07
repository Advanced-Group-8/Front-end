import React from "react";
import OrderDeliveryStatusIcon from "./OrderDeliveryStatusIcon";

type OrderDeliveryStatusProps = {
  status:
    | "pending"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "out_for_delivery";
};

const statusTextMap: Record<OrderDeliveryStatusProps["status"], string> = {
  pending: "Pending",
  in_transit: "In transit",
  delivered: "Delivered",
  cancelled: "Cancelled",
  out_for_delivery: "Out for delivery",
};

const OrderDeliveryStatus: React.FC<OrderDeliveryStatusProps> = ({
  status,
}) => (
  <div className="flex items-center gap-2">
    <OrderDeliveryStatusIcon status={status} />
    <span className="font-medium">{statusTextMap[status]}</span>
  </div>
);

export default OrderDeliveryStatus;
