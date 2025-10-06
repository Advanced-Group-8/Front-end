import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getRole = (URL: string, token: string) => {
  const BASE_URL = URL;

  useEffect(() => {
    const userFetch = async (token: string): Promise<any> => {
      try {
        //  /auth/me might need changing to something else??
        const response = await fetch(`${BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer${token}`,
          },
        });

        if (!response.ok) throw new Error("Error getting user");

        return await response.json(); //returns profile?
      } catch (error) {
        console.error("Error getting user", error);
        return null;
      }
    };

    userFetch(token);
  }, []);
};

export default getRole;
