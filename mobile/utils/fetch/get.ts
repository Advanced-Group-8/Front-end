import { useEffect, useState } from "react";
// lägg till att hämta profilen med användarnamn osv

// BEWARE: don't know if any of this works...
const get = (url: string, token: string, article: string) => {
  const [getValue, setGetValue] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        console.log(token);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (!response.ok) throw new Error(`Error getting ${article}`);

        const data = await response.json();
        console.log(data);
        setGetValue(data);
      } catch (err) {
        console.error(`Error getting ${article}`, err);
        setError(`Failed connection with server`);
      }
    };

    fetchFunc();
  }, [url, token, article]);
  if (error) {
    return null;
  } else {
    return { getValue };
  }
};

export default get;
