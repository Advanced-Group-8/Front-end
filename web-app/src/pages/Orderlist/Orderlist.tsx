import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackageById, fetchPackagesForUser } from "../../store/packageSlice.ts";
import OrderListItem from "../../components/orders/OrderListItem.tsx";
/* import OrderDetails from "../../components/orders/OrderDetails.tsx"; */
import type { RootState, AppDispatch } from "../../store/store.ts";
import type { Package } from "../../types/types.ts";
import ClimateStatusList from "../../components/orders/OrderClimateStatus/ClimateStatusList.tsx";
import OrderDeliveryStatusTimeline from "../../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";

//MOCKSTATUS
import { MOCK_STATUS } from "../../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";

const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((s: RootState) => s.packages);
  const packages = data ?? [];            // <= default to []
  const user = useSelector((s: RootState) => s.auth.profile);

  console.log("packages in Orderlist", packages);

  const [inputPackageId, setInputPackageId] = useState("");
  const [searchedPackage, setSearchedPackage] = useState<Package | null>(null);
  const [packagesToShow, setPackagesToShow] = useState<Package[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

 /* !! NOT WORKING !!! */
/*   React.useEffect(() => {
    if (user) {
      dispatch(fetchPackagesForUser({ userId: user.id, role: user.role }));
    }
  }, [dispatch, user]); */


  const packageArray = packages.filter((pkg: Package | null | undefined) =>
    pkg && pkg.sender && pkg.sender.id !== user?.id
  );

  const handleSearch = async () => {
  setSearchError(null);

  const q = inputPackageId.trim();

  if (!q) {
    setPackagesToShow(packageArray);
    return;
  }

  // validate format (digits only)
  if (!/^\d+$/.test(q)) {
    setPackagesToShow([]);
    setSearchError("Package ID must be numeric.");
    return;
  }

  try {
    const fetched = await dispatch(fetchPackageById({ id: q })).unwrap();
    if (!fetched || !fetched.id) {
      setPackagesToShow([]);
      setSearchError("No package found with that ID.");
      return;
    }
    setPackagesToShow([fetched]);
  } catch (e) {
    setPackagesToShow([]);
    setSearchError("Couldn’t fetch that package. Please try again.");
  }
};

    console.log("packagesToShow in Orderlist", packagesToShow);

    
    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center">{error}</p>;


  return (
    <div className="bg-white rounded-lg p-4">
      <div className="p-1 text-center bg-neutral-1 w-full">
        <h1 className="text-3xl font-bold mb-8">Orderlist</h1>
        <div className="mb-4 flex justify-center gap-2 w-full">
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

        {/* Priority: searchError > no packages at all > no matches > list */}
    {searchError ? (
      <p className="text-center text-red-600">{searchError}</p>
    ) : packageArray.length === 0 ? (
      <p className="text-center">No packages found</p>
    ) : packagesToShow.length === 0 ? (
      <p className="text-center">No results match your search</p>
    ) : (
      <div className="space-y-4">
        {packagesToShow.map((pkg) => (
          <OrderListItem key={pkg.id} pkg={pkg} />
        ))}
      </div>
    )}

      <div>
        <ClimateStatusList />
      <OrderDeliveryStatusTimeline status={MOCK_STATUS} />
      </div>
      </div>
    </div>
  );
};

export default OrderList;
