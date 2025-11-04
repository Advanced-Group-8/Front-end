const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://t8-server-d2fee2awcybjcqch.swedencentral-01.azurewebsites.net/";

export default async function getUser(token) {
  console.log("🟡 getUser() called");
  console.log("🔹 Loaded API_URL:", API_URL);
  console.log("🔹 Token (first 20 chars):", token?.slice(0, 20));

  console.log("🔐 Auth header:", `Bearer ${token}`);

  if (!API_URL) {
    console.error("❌ ERROR: API_URL is undefined!");
    return null;
  }

  try {
    const url = `${API_URL}auth/me`;
    console.log("🌍 Fetching:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📡 Response status:", response.status);

    const text = await response.text();
    console.log("📦 Raw response text:", text);

    if (!response.ok) {
      console.error("❌ Response not OK:", response.status, text);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = JSON.parse(text);
    console.log("✅ Parsed user data:", data);
    return data;
  } catch (error) {
    console.error("💥 Fetch threw error:", error.message || error);
    return null;
  }
}
