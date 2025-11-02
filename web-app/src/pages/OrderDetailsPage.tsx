
import OrderDetails from "../components/orders/OrderDetails.tsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ReadingsList from "../components/readingsList/ReadingsList-test.tsx";
import type { Package } from "../types/types.ts";
import IconButton from "../components/buttons/IconButton.tsx";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const pkg = useSelector((state: RootState) =>
    state.packages.data.find((p) => String(p.id) === id)
  );

  if (!pkg) return <p>Package not found</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white min-h-screen rounded-lg">
      <OrderDetails pkg={pkg} />
      <ReadingsList pkgReadings={pkg.readings} />
    </div>
  );
};

export default OrderDetailsPage;
