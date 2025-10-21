import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackageById } from "../../store/packageSlice.ts";
import OrderListItem from "../../components/orders/OrderListItem.tsx";
import OrderDetails from "../../components/orders/OrderDetails.tsx";
import type { RootState, AppDispatch } from "../../store/store.ts";
import type { Package } from "../../types/types.ts";
import ClimateStatusList from "../../components/orders/OrderClimateStatus/ClimateStatusList.tsx";
import OrderDeliveryStatusTimeline from "../../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";

//MOCKSTATUS
import { MOCK_STATUS } from "../../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);

  const [selectedOrder, setSelectedOrder] = useState<Package | null>(null);
  const [packageId, setPackageId] = useState("");
  const [inputPackageId, setInputPackageId] = useState(packageId);
  const [searchedPackage, setSearchedPackage] = useState<Package | null>(null);
  const packageArray = packages && !Array.isArray(packages) ? [packages] : packages ?? [];

  const handleSearch = () => {
    const found = packageArray.find((pkg) => pkg.id === Number(inputPackageId));
    setSearchedPackage(found ?? null);
    setPackageId(inputPackageId);
  };

  React.useEffect(() => {
    if (packageId) {
      dispatch(fetchPackageById({ id: packageId }));
    }
  }, [dispatch, packageId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">{error}</p>;

  if (selectedOrder) {
    return (
      <div className="p-8 text-center bg-neutral-1">
        <OrderDetails pkg={selectedOrder} />
      </div>
    );
  }

  return (
    <>
      <div className="p-1 text-center bg-neutral-1">
        <h1 className="text-3xl font-bold mb-8">Orderlist</h1>
        <div className="mb-4 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Package-ID (Temporary)"
            value={inputPackageId}
            onChange={(e) => setInputPackageId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="border px-2 py-1 rounded w-50"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-primary-1 text-neutral-light-1 rounded hover:bg-primary-1/60 hover:text-neutral-dark-1"
          >
            Search ID
          </button>
        </div>
        <OrderListItem onOrderClick={setSelectedOrder}
          packages={searchedPackage ? [searchedPackage] : packageArray}
        />
        {
          //* For dev: If no packages are found, allow user to use mock data
          packageArray.length == 0 ? (
            <div className="place-items-center">
              <p className="text-center">No packages found</p>
            </div>
          ) : null
        }
      </div>
      <div>
        <ClimateStatusList />
      <OrderDeliveryStatusTimeline status={MOCK_STATUS} />
      </div>
    </>
  );
};

export default OrderList;
