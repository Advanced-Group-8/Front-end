import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getPackage = (URL: string, id: number) => {
  const BASE_URL = URL;

  useEffect(() => {
    // Is token needed?
    const userFetch = async (id: number): Promise<any> => {
      try {
        const response = await fetch(`${BASE_URL}/package/{${id}}`);

        if (!response.ok) throw new Error("Error getting package");

        const fetchedPackage = await response.json(); //gets package?
        const packageStatus = fetchedPackage.find(
          (item: { statusCode: number }) => item.statusCode
        ); //finds the package status?
        // return packageStatus instead?
        return fetchedPackage;
      } catch (error) {
        console.error("Error getting package", error);
        return null;
      }
    };

    userFetch(id);
  }, []);
};

export default getPackage;
