import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackageById, fetchPackagesForUser } from "../../store/packageSlice.ts";
import OrderListItem from "../../components/orders/OrderListItem.tsx";
/* import OrderDetails from "../../components/orders/OrderDetails.tsx"; */
import type { RootState, AppDispatch } from "../../store/store.ts";
import type { Package } from "../../types/types.ts";
import ClimateStatusList from "../../components/orders/OrderClimateStatus/ClimateStatusList.tsx";


const OrderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: packages,
    loading,
    error,
  } = useSelector((state: RootState) => state.packages);
  const user = useSelector((state: RootState) => state.user.profile);
  console.log("packages in Orderlist", packages);
  console.log("user in Orderlist", user);

  const [inputPackageId, setInputPackageId] = useState("");
  const [searchedPackage, setSearchedPackage] = useState<Package | null>(null);
  const [packagesToShow, setPackagesToShow] = useState<Package[]>([]);
  const [userPackages, setUserPackages] = useState<Package[]>([]);

 
  React.useEffect(() => {
    if (user) {
      dispatch(fetchPackagesForUser({ userId: user.id, role: user.role }));
      console.log("user in Orderlist inside useEffect", user);
    }
  }, [dispatch, user]);

/*   React.useEffect(() => {
    if (user) {
      setUserPackages(packages.filter((pkg: Package) => pkg.sender.id === user.id));
    }
    const userPackages = packages.filter((pkg: Package) => pkg.sender.id === user?.id);
  }, [packages, user]); */

  const packageArray = packages;
  console.log("packageArray in Orderlist", packageArray);

  // Handle manual search (optional)
  const handleSearch = async () => {
      if (!inputPackageId.trim()) {
      // Reset search if input is empty
      setSearchedPackage(null);
      setPackagesToShow(packageArray);
      return;
    }
    console.log("inputPackageId in handleSearch", inputPackageId);
     try {
          const response = await dispatch(fetchPackageById({ id: inputPackageId }));
          const fetchedPackage = response.payload;

          if (!fetchedPackage || !fetchedPackage.id) {
            console.error("Failed to fetch package by ID in Orderlist");
            setSearchedPackage(null);
            setPackagesToShow([]);
            return;
          }

          setSearchedPackage(fetchedPackage);
          setPackagesToShow([fetchedPackage]);
        } catch (err) {
          console.error("Error fetching package by ID:", err);
          setSearchedPackage(null);
          setPackagesToShow([]);
      }

    };

    console.log("packagesToShow in Orderlist", packagesToShow);

    
    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center">{error}</p>;


  return (
    <div className="bg-white rounded-lg p-2 pt-4 h-100%">
      <div className="p-1 text-center bg-neutral-1 w-100%">
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

        <div className="space-y-4">
        {packagesToShow.length > 0 ? (
          packagesToShow.map((pkg) => <OrderListItem key={pkg.id} pkg={pkg} />)
        ) : (
          <p>No packages found</p>
        )}
      </div>
        {
          packageArray.length == 0 ? (
            <div className="place-items-center">
              <p className="text-center">No packages found</p>
            </div>
          ) : null
        }
      <div>
        <ClimateStatusList />
      </div>
      </div>
    </div>
  );
};

export default OrderList;

