import { Outlet } from "react-router-dom";
import OrderList from "./Orderlist";

export default function LayoutWithTwoColumns() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 bg-white p-4">
      <OrderList />
      <Outlet /> {/* this will show OrderDetails when a specific ID is selected */}
    </div>
  );
}
