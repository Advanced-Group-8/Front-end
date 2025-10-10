import { useEffect } from "react";
// BEWARE: don't know if any of this works...
const getUser = (url: string, token: string) => {
  useEffect(() => {
    const userFetch = async (url: string, token: string): Promise<any> => {
      try {
        const response = await fetch(`${url}/auth/me`, {
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

    userFetch(url, token);
  }, []);
};

export default getUser;
