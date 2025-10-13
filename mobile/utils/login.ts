import { useEffect } from "react";
import url from "./base-url";
import getUser from "./getUser";
// BEWARE: don't know if any of this works...
const login = (loginBody: object): any => {
  useEffect(() => {
    const loginAuth = async (loginBody: object): Promise<string> | null => {
      try {
        const response = await fetch(`${url}/auth/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loginBody,
          }),
        });

        if (!response.ok) throw new Error("Error getting user");

        const data = await response.json(); // token?
        const newToken: string = data.token;
        return newToken;
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
