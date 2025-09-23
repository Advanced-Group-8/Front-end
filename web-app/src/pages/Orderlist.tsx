import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackages } from "../store/packageSlice";
import OrderListItem from "../components/orders/OrderListItem.tsx";
import OrderDetails from "../components/orders/OrderDetails.tsx";
import type { RootState, AppDispatch } from "../store/store";
import type { Package } from "../types/types";
import ParcelStatusList from "../components/orders/ParcelStatusList/ParcelStatusList.tsx";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);

  const [selectedOrder, setSelectedOrder] = useState<Package | null>(null);

  React.useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (selectedOrder) {
    return (
      <div className="p-8 text-center bg-gray-200">
        <button
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
          onClick={() => setSelectedOrder(null)}
        >
          Tillbaka
        </button>
        <OrderDetails pkg={selectedOrder} />
      </div>
    );
  }

  return (
    <>
      <div className="p-8 text-center bg-gray-200">
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
        <ParcelStatusList />
      </div>
    </>
  );
};

export default OrderList;
