import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { saveToken } from "../saveSecure";
// BEWARE: don't know if any of this works...

const post = (url: string, incomingBody: object, calling: string) => {
  const [getToken, setGetToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  console.log("inside post");

  useEffect(() => {
    const postFunc = async () => {
      try {
        console.log("inside post try");
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            incomingBody,
          }),
        });
        console.log(response);
        if (!response.ok) throw new Error(`Error with ${calling}`);

        const data = await response.json(); // token?
        console.log(data);
        setGetToken(data);
        console.log(getToken);
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
    return getToken;
  }
};

export default post;
