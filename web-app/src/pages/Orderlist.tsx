import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackages } from "../store/packageSlice";
import OrderListItem from "../components/orders/OrderListItem.tsx";
import type { RootState, AppDispatch } from "../store/store";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);

  React.useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Order List</h1>
      <OrderListItem
        packages={packages}
        onOrderClick={(id) => console.log("Clicked order:", id)}
      />
    </div>
  );
};

export default OrderList;
