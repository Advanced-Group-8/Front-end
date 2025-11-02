
import OrderDetails from "../components/orders/OrderDetails.tsx";
import ReadingsList from "../components/readingsList/ReadingsList-test.tsx";
import type { Package } from "../types/types.ts";
import IconButton from "../components/buttons/IconButton.tsx";

const OrderDetailsPage = (packageData: {pkg: Package}) => {
/*   const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data: packages, loading } = useSelector(
    (state: RootState) => state.packages
  );
 */
/*   console.log("packages in OrderDetailsPage", packages);

  useEffect(() => {
    if (id) dispatch(fetchPackageById({ id }));
  }, [dispatch, id]);
 */
console.log("packageData in OrderDetailsPage", packageData.pkg);

/*   if (loading) return <p className="text-center">Loading...</p>;
  if (!packages) return <p className="text-center">No order found</p>; */

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white min-h-screen rounded-lg">
      <OrderDetails pkg={packageData.pkg} />
      <ReadingsList pkgReadings={packageData.pkg.readings}/>
    </div>
  );
};

export default OrderDetailsPage;
