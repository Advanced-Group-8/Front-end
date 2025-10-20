import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getPackageById = (url: string, id: number) => {
  useEffect(() => {
    const getSinglePackage = async (url: string, id: number) => {
      try {
        const response = await fetch(`${url}/package/{${id}}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Error getting user");

        const data: object = await response.json(); //returns profile?
        return data;
      } catch (error) {
        console.error("Error getting user", error);
        return null;
      }
    };

    getSinglePackage(url, id);
  }, []);
};

export default getPackageById;
