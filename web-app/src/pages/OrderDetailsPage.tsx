import OrderDetails from "../components/orders/OrderDetails.tsx";
import ReadingsList from "../components/readingsList/ReadingsList-test.tsx";
import type { Package } from "../types/types.ts";
import ClimateStatusList from "../components/orders/OrderClimateStatus/ClimateStatusList.tsx";
import OrderDeliveryStatusTimeline from "../components/orders/OrderDeliveryStatus/OrderDeliveryStatusTimeline.tsx";
import CTACard from "../components/CTA/CTACard.tsx";

const OrderDetailsPage = (packageData: { pkg: Package }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white h-full rounded-lg">
      <OrderDetails pkg={packageData.pkg} />
      <ClimateStatusList />
      <CTACard />
      <OrderDeliveryStatusTimeline status={packageData.pkg.status} />
      <ReadingsList pkgReadings={packageData.pkg.readings} />
    </div>
  );
};

export default OrderDetailsPage;