import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackageById } from "../store/packageSlice";
import OrderListItem from "../components/orders/OrderListItem.tsx";
import OrderDetails from "../components/orders/OrderDetails.tsx";
import type { RootState, AppDispatch } from "../store/store";
import type { Package } from "../types/types";
import ClimateStatusList from "../components/orders/OrderClimateStatus/ClimateStatusList.tsx";
import OrderDeliveryStatusTimeline from "../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";

//MOCKSTATUS
import { MOCK_STATUS } from "../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";
import { MOCK_PACKAGES } from "../api/mockData.ts";
import IconButton from "../components/buttons/IconButton.tsx";



const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);
  //MOCK start
  const [localPackages, setLocalPackages] = useState<Package[] | null>(MOCK_PACKAGES);
  const packageArray = localPackages ?? (packages && !Array.isArray(packages) ? [packages] : packages ?? []);
  let packagesToShow = packageArray.length > 0 ? packageArray : MOCK_PACKAGES;
  //MOCK end

  const [selectedOrder, setSelectedOrder] = useState<Package | null>(null);
  const [packageId, setPackageId] = useState("");
  const [inputPackageId, setInputPackageId] = useState(packageId);
  const [searchedPackage, setSearchedPackage] = useState<Package | null>(null);

  const handleSearch = () => {
    const found = packageArray.find(pkg => pkg.id === Number(inputPackageId));
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
        <button
          className="mb-4 px-4 py-2 bg-primary-1 text-neutral-light-1 rounded hover:bg-primary-1/60 hover:text-neutral-dark-1"
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
        <div className="mb-4 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Paket-ID"
            value={inputPackageId}
            onChange={(e) => setInputPackageId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-primary-1 text-neutral-light-1 rounded hover:bg-primary-1/60 hover:text-neutral-dark-1"
          >
            Sök
          </button>
        </div>
        <OrderListItem
          packages={searchedPackage ? [searchedPackage] : packagesToShow}
          onOrderClick={(id) => {
            const found = packageArray.find((pkg) => pkg.id === Number(id)); 
            if (found) setSelectedOrder(found);
          }}
        />
        { //* For dev: If no packages are found, allow user to use mock data 
        packageArray.length == 0 ? 
        <div className="place-items-center">
          <p className="text-center">No packages found</p> 
        </div> 
        : null}
      </div>
      <div>
        <ClimateStatusList />
      </div>
      <OrderDeliveryStatusTimeline status={MOCK_STATUS} />
    </>
  );
};

export default OrderList;
