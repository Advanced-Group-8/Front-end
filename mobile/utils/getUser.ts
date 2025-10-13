import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getUser = (url: string, token: string) => {
  useEffect(() => {
    const userFetch = async (url: string, token: string) => {
      try {
        const response = await fetch(`${url}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer${token}`,
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

    userFetch(url, token);
  }, []);
};

export default getUser;
