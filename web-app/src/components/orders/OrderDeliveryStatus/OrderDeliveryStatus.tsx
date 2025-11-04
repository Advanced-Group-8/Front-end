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
    <span className="font-medium">{statusTextMap[status]}</span>
    <OrderDeliveryStatusIcon status={status} />
  </div>
);

export default OrderDeliveryStatus;
