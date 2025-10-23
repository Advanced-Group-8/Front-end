import React from "react";
import { useParams } from "react-router-dom";
import LayoutWithTwoColumns from "./LayoutWithTwoColumns";
import OrderList from "./Orderlist";
import OrderDetailsPage from "../OrderDetailsPage";

// Simple hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1000);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export const OrdersLayout = () => {
  const isMobile = useIsMobile();
  const { id } = useParams(); // get :id if present

  if (!isMobile) {
    // Desktop: two-column layout always
    return <LayoutWithTwoColumns />;
  }

  // Mobile: show list or details depending on URL
  if (id) {
    return <OrderDetailsPage />;
  }

  return <OrderList />;
};
