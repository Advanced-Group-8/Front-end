import { useEffect } from "react";
import { signInUrl, signUpUrl } from "../base-url";
import getUser from "./getUser";
// BEWARE: don't know if any of this works...

const registerUser = (registerBody: object): any => {
  useEffect(() => {
    const register = async (registerBody: object): Promise<string> | null => {
      try {
        const response = await fetch(signUpUrl, {
          method: "POST",

          body: JSON.stringify({
            registerBody,
          }),
        });

        if (!response.ok) throw new Error("Error registering user");

        const data = await response.json(); // token?
        const newToken: string = data.token;
        return newToken;
        // *** Spara profil i context?
      } catch (error) {
        console.error("Error registering user", error);
        return null;
      }
    };

    register(registerBody);
  }, []);
};

export default registerUser;
