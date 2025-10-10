import { useEffect } from "react";
import url from "./base-url";
import getUser from "./getUser";
// BEWARE: don't know if any of this works...
const login = (loginBody: object) => {
  useEffect(() => {
    const loginAuth = async (loginBody: object): Promise<any> => {
      try {
        const response = await fetch(`${url}/auth/sign-in`, {
          method: "POST",
          body: JSON.stringify({
            loginBody,
          }),
        });

        if (!response.ok) throw new Error("Error getting user");

        const token = await response.json(); // gets token?
        const profileInfo = getUser(url, token);
        // *** Spara profil i context?
      } catch (error) {
        console.error("Error getting user", error);
        return null;
      }
    };

    loginAuth(loginBody);
  }, []);
};

export default login;
