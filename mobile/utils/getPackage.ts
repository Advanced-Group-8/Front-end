import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getPackage = (URL: string, token: string) => {
  const BASE_URL = URL;

  useEffect(() => {
    // Is token needed?
    const userFetch = async (token: string): Promise<any> => {
      try {
        const response = await fetch(`${BASE_URL}/package`, {
          method: "GET",
          headers: {
            Authorization: `Bearer${token}`,
          },
        });

        if (!response.ok) throw new Error("Error getting user");

        return await response.json(); //returns package?
      } catch (error) {
        console.error("Error getting package", error);
        return null;
      }
    };

    userFetch(token);
  }, []);
};

export default getPackage;
