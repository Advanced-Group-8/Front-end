import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
// BEWARE: don't know if any of this works...

const post = (url: string, incomingBody: object, calling: string): any => {
  const [getToken, setGetToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveToken = async (token: string) => {
    await SecureStore.setItemAsync("token", token);
  };
  useEffect(() => {
    const postFunc = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            incomingBody,
          }),
        });

        if (!response.ok) throw new Error(`Error with ${calling}`);

        const data = await response.json(); // token?
        console.log(data);
        setGetToken(data);
        saveToken(getToken);
      } catch (err) {
        console.error(`Error with ${calling}`, error);
        setError(`Failed connection with server`);
      }
    };

    postFunc();
  }, [url, incomingBody, calling]);
  if (error) {
    return null;
  } else {
    return { getToken };
  }
};

export default post;
