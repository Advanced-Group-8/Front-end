import OrderCard from "./OrderCard";
import type { Package } from "../../types/types";

type OrderListItemProps = {
  packages: Package[];
  onOrderClick?: (id: number) => void;
};

const OrderListItem: React.FC<OrderListItemProps> = ({
  packages,
  onOrderClick,
}) => {
  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <OrderCard
          key={pkg.id}
          pkg={pkg}
          onClick={() => onOrderClick && onOrderClick(pkg.id)}
        />
      ))}
    </div>
  );
};

export default OrderListItem;
