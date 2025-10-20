export type Status =
  | "pending"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export const statusTextMap: Record<Status, string> = {
  pending: "Pending",
  in_transit: "In transit",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
