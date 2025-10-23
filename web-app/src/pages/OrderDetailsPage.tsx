import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackageById } from "../store/packageSlice";
import OrderDetails from "../components/orders/OrderDetails.tsx";
import type { RootState, AppDispatch } from "../store/store";

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: packages, loading } = useSelector(
    (state: RootState) => state.packages
  );

  useEffect(() => {
    if (id) dispatch(fetchPackageById({ id }));
  }, [dispatch, id]);

  const pkg =
    Array.isArray(packages) && id
      ? packages.find((p) => p.id === Number(id))
      : null;

  if (loading) return <p className="text-center">Loading...</p>;
  if (!pkg) return <p className="text-center">No order found</p>;

  return (
    <div>
      <OrderDetails pkg={pkg} />
    </div>
  );
};

export default OrderDetailsPage;
