import { useEffect, useState } from "react";
// BEWARE: don't know if any of this works...
const getPackageById = (url: string, id: number, token: string) => {
  const [pack, setPack] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getSinglePackage = async () => {
      try {
        const response = await fetch(`${url}/package/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error getting package");

        const data = await response.json(); //returns profile?
        setPack(data.data);
      } catch (err) {
        console.error("Error getting package", err);
        setError(`Failed connection with server`);
      }
    };

    getSinglePackage();
  }, [url, id, token]);
  if (error) {
    return null;
  } else {
    return pack;
  }
};

export default getPackageById;
