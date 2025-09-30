import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackages } from "../store/packageSlice";
import OrderListItem from "../components/orders/OrderListItem.tsx";
import OrderDetails from "../components/orders/OrderDetails.tsx";
import type { RootState, AppDispatch } from "../store/store";
import type { Package } from "../types/types";
import ClimateStatusList from "../components/orders/OrderClimateStatus/ClimateStatusList.tsx";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);

  const [selectedOrder, setSelectedOrder] = useState<Package | null>(null);

  React.useEffect(() => {
    dispatch(fetchPackages({ senderId: 1, receiverId: 4 }));
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">{error}</p>;

  if (selectedOrder) {
    return (
      <div className="p-8 text-center bg-neutral-1">
        <button
          className="mb-4 px-4 py-2 bg-primary-1 text-neutral-1 rounded hover:bg-primary-1/60 hover:text-neutral-2"
          onClick={() => setSelectedOrder(null)}
        >
          Back
        </button>
        <OrderDetails pkg={selectedOrder} />
      </div>
    );
  }

  return (
    <>
      <div className="p-8 text-center bg-neutral-1">
        <h1 className="text-4xl font-bold mb-8">Orderlist</h1>
        <OrderListItem
          packages={packages ?? []}
          onOrderClick={(id) => {
            const found = packages.find((pkg) => pkg.id === id);
            if (found) setSelectedOrder(found);
          }}
        />
      </div>
      <div>
        <ClimateStatusList />
      </div>
    </>
  );
};

export default OrderList;
