import React from "react";
import DeliveredIcon from "../../../assets/svg/check-circle-green.svg";
import InTransitIcon from "../../../assets/svg/transit.svg";
import CancelledIcon from "../../../assets/svg/cancelled.svg";
import PendingIcon from "../../../assets/svg/pending.svg";
import OutForDeliveryIcon from "../../../assets/svg/delivery.svg";

// MOCKSTATUS
export const MOCK_STATUS: Status = "in_transit";

type Status =
  | "pending"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

type OrderDeliveryStatusTimelineProps = {
  status: Status;
};

const steps: { key: Status; label: string; icon: string }[] = [
  { key: "pending", label: "Pending", icon: PendingIcon },
  { key: "in_transit", label: "In transit", icon: InTransitIcon },
  {
    key: "out_for_delivery",
    label: "Out for delivery",
    icon: OutForDeliveryIcon,
  },
  { key: "delivered", label: "Delivered", icon: DeliveredIcon },
  { key: "cancelled", label: "Cancelled", icon: CancelledIcon },
];

const getStepIndex = (status: Status) =>
  steps.findIndex((step) => step.key === status);

const OrderDeliveryStatusTimeline: React.FC<
  OrderDeliveryStatusTimelineProps
> = ({ status }) => {
  const currentStep = getStepIndex(status);

  return (
    <div className="flex flex-col items-center">
      {steps.map((step, idx) => {
        if (status === "cancelled" && step.key !== "cancelled") return null;
        if (status !== "cancelled" && step.key === "cancelled") return null;

        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep && status !== "cancelled";

        return (
          <div key={step.key} className="flex flex-col items-center">
            <div
              className={`rounded-full border-4 flex items-center justify-center w-12 h-12 mb-2
                ${isActive ? "border-primary-1 bg-neutral-light-1" : ""}
                ${isCompleted ? "border-primary-1 bg-primary-1/20" : ""}
                ${
                  !isActive && !isCompleted
                    ? "border-gray-300 bg-primary-1/20"
                    : ""
                }
              `}
            >
              <img src={step.icon} alt={step.label} className="w-7 h-7" />
            </div>
            <span
              className={`mb-2 text-sm ${
                isActive
                  ? "font-bold text-primary-1"
                  : isCompleted
                  ? "text-primary-1"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 &&
              (status !== "cancelled" ? idx < 3 : idx < 4) && (
                <div
                  className={`w-1 h-8 ${
                    idx < currentStep && status !== "cancelled"
                      ? "bg-primary-1"
                      : "bg-gray-300"
                  }`}
                />
              )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderDeliveryStatusTimeline;
