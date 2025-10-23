import OrderList from "./Orderlist";
import OrderDetails from "../../components/orders/OrderDetails";
import {  useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { Package } from "../../types/types";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchPackageById } from "../../store/packageSlice";
import React from "react";
/* import type { AppDispatch, RootState } from "../../store/store";
import { fetchPackageById } from "../../store/packageSlice";
import { useEffect } from "react"; */

function LayoutWithTwoColumns() {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("orderId");
  const dispatch = useDispatch<AppDispatch>();
  const packages = useSelector((state: RootState) => state.packages);
  console.log("packages in LayoutWithTwoColumns", packages.data);
 
  const selectedIdAsNumber = selectedId ? Number(selectedId) : null;
   console.log("selectedIdAsNumber in LayoutWithTwoColumns", selectedIdAsNumber);

  const packageData = useSelector((state: RootState) =>
    state.packages.data.find((pkg: Package) => Number(pkg.id) === selectedIdAsNumber)
  );

  console.log("packageData in LayoutWithTwoColumns", packageData);

  React.useEffect(() => {
    if (selectedIdAsNumber && !packageData) {
      const fetchedPackage = dispatch(fetchPackageById({ id: selectedIdAsNumber }));
      console.log(`fetchedPackage in LayoutWithTwoColumns, ${selectedIdAsNumber} and ID ${selectedIdAsNumber}`, fetchedPackage);
    }
  }, [dispatch, selectedIdAsNumber, packageData]);


  console.log("selectedId in LayoutWithTwoColumns", selectedId);
  console.log("packageData in LayoutWithTwoColumns", packageData);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="p-4 bg-white">
        <OrderList />
      </div>

      <div className="flex-1 bg-white p-4">
        {packageData ? (
          <OrderDetails pkg={packageData} />
        ) : (
          <p>Select a package to see details</p>
        )}
      </div>
    </div>
  );
}

export default LayoutWithTwoColumns;