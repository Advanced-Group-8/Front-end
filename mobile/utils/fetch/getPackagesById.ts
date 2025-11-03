import { useEffect, useState } from "react";
// BEWARE: don't know if any of this works...
const getPackagesById = (
  url: string,
  id: number,
  token: string,
  article: string
) => {
  const [pack, setPack] = useState<object | Array<object> | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error getting package");

        const data = await response.json();
        setPack(data.data);
      } catch (err) {
        console.error("Error getting package", err);
        setError(`Failed connection with server`);
      }
    };

    getPackage();
  }, [url, id, token, article]);
  if (error) {
    return null;
  } else {
    return pack;
  }
};

export default getPackagesById;
