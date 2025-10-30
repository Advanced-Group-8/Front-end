import OrderList from "./Orderlist";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { Package } from "../../types/types";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchPackageById } from "../../store/packageSlice";
import React from "react";
import OrderDetailsPage from "../OrderDetailsPage";
/* import type { AppDispatch, RootState } from "../../store/store";
import { fetchPackageById } from "../../store/packageSlice";
import { useEffect } from "react"; */

function LayoutWithTwoColumns() {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("orderId");
  const dispatch = useDispatch<AppDispatch>();
  const packages = useSelector((state: RootState) => state.packages);
  console.log("packages in LayoutWithTwoColumns", packages.data);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedIdAsNumber = selectedId ? Number(selectedId) : null;
  console.log("selectedIdAsNumber in LayoutWithTwoColumns", selectedIdAsNumber);

  const packageData = useSelector((state: RootState) =>
    state.packages.data.find(
      (pkg: Package) => Number(pkg.id) === selectedIdAsNumber
    )
  );

  console.log("packageData in LayoutWithTwoColumns", packageData);

  React.useEffect(() => {
    if (selectedIdAsNumber && !packageData) {
      const fetchedPackage = dispatch(
        fetchPackageById({ id: selectedIdAsNumber })
      );
      console.log(
        `fetchedPackage in LayoutWithTwoColumns, ${selectedIdAsNumber} and ID ${selectedIdAsNumber}`,
        fetchedPackage
      );
    }
  }, [dispatch, selectedIdAsNumber, packageData]);

  console.log("selectedId in LayoutWithTwoColumns", selectedId);
  console.log("packageData in LayoutWithTwoColumns", packageData);

  return isMobile ? (
    // Mobile: single column, separate pages for list/details
    <div className="p-4">
      {packageData ? <OrderDetailsPage /> : <OrderList />}
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-4 p-1 lg:p-4">
      <div>
        <OrderList />
      </div>

      <div>
        {packageData ? (
          <OrderDetailsPage />
        ) : (
          <div className="bg-white rounded-lg p-2 h-full flex items-center justify-center">
            <p>Select a package to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LayoutWithTwoColumns;
