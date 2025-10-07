import React from "react";
import DeliveredIcon from "../../../assets/svg/check-circle-green.svg";
import InTransitIcon from "../../../assets/svg/transit.svg";
import CancelledIcon from "../../../assets/svg/cancelled.svg";
import PendingIcon from "../../../assets/svg/pending.svg";
import OutForDeliveryIcon from "../../../assets/svg/delivery.svg";

type OrderDeliveryStatusIconProps = {
  status:
    | "pending"
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "out_for_delivery";
};

const statusMap: Record<
  OrderDeliveryStatusIconProps["status"],
  { icon: React.ReactNode; label: string }
> = {
  delivered: {
    icon: <img src={DeliveredIcon} alt="Delivered" className="w-8 h-8" />,
    label: "Delivered",
  },
  in_transit: {
    icon: <img src={InTransitIcon} alt="In transit" className="w-8 h-8" />,
    label: "In transit",
  },
  cancelled: {
    icon: <img src={CancelledIcon} alt="Cancelled" className="w-8 h-8" />,
    label: "Cancelled",
  },
  pending: {
    icon: <img src={PendingIcon} alt="Pending" className="w-8 h-8" />,
    label: "Pending",
  },
  out_for_delivery: {
    icon: (
      <img
        src={OutForDeliveryIcon}
        alt="Out for delivery"
        className="w-8 h-8"
      />
    ),
    label: "Out for delivery",
  },
};

const OrderDeliveryStatusIcon: React.FC<OrderDeliveryStatusIconProps> = ({
  status,
}) => {
  const statusInfo = statusMap[status] || statusMap["pending"];

  return (
    <span
      className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-white"
      title={statusInfo.label}
    >
      {statusInfo.icon}
    </span>
  );
};

export default OrderDeliveryStatusIcon;
