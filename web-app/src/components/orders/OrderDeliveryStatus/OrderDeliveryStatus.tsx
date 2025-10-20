import { statusTextMap } from "./statusTextMap";
import OrderDeliveryStatusIcon from "./OrderDeliveryStatusIcon";

import type { Status } from "./statusTextMap";

export type OrderDeliveryStatusProps = {
  status: Status;
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
