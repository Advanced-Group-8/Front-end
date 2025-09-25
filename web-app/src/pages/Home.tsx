

import PrimaryButton from "../components/buttons/PrimaryButton";
import { useState } from "react";
import {
  getPackages,
  createPackage,
  getPackageById,
  getPackageByDeviceId,
  updatePackage,
  deletePackage,
} from "../api/api";

const Home = () => {

  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState<string>("");

  // Hjälpfunktion för att visa JSON snyggt
  // Om data är en array av paket, visa lista med id, trackingCode och status, annars JSON
  const pretty = (data: any) => {
    if (Array.isArray(data) && data.length && data[0]?.id) {
      return (
        <ul className="list-disc pl-6">
          {data.map((pkg: any) => (
            <li key={pkg.id}>
              Paket-ID: {pkg.id}
              {pkg.trackingCode && <> | TrackingCode: {pkg.trackingCode}</>}
              {pkg.status && <> | Status: {pkg.status}</>}
            </li>
          ))}
        </ul>
      );
    }
    return typeof data === "string"
      ? data
      : JSON.stringify(data, null, 2);
  };

  const handleGetPackages = async () => {
    setError("");
    setResponse("");
    try {
      const data = await getPackages();
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  const handleCreatePackage = async () => {
    setError("");
    setResponse("");
    // Prompts för alla obligatoriska fält
    const trackingCode = prompt("Tracking code på nytt paket?");
    if (!trackingCode) return;
    const senderId = prompt("Sender ID?");
    if (!senderId) return;
    const receiverId = prompt("Receiver ID?");
    if (!receiverId) return;
    const currentCarrierId = prompt("Current Carrier ID?");
    if (!currentCarrierId) return;
    const senderStreet = prompt("Avsändarens gata?");
    const senderCity = prompt("Avsändarens stad?");
    const senderPostalCode = prompt("Avsändarens postnummer?");
    const senderCountry = prompt("Avsändarens land?");
    if (!senderStreet || !senderCity || !senderPostalCode || !senderCountry) return;
    const receiverStreet = prompt("Mottagarens gata?");
    const receiverCity = prompt("Mottagarens stad?");
    const receiverPostalCode = prompt("Mottagarens postnummer?");
    const receiverCountry = prompt("Mottagarens land?");
    if (!receiverStreet || !receiverCity || !receiverPostalCode || !receiverCountry) return;
    // deviceId kan vara valfri eller genereras, men vi frågar efter den
    const deviceId = prompt("Device ID?");
    if (!deviceId) return;
    // status default till pending
    const status = "pending";
    try {
      const data = await createPackage({
        trackingCode,
  senderId: Number(senderId),
  receiverId: Number(receiverId),
  currentCarrierId: Number(currentCarrierId),
        senderAddress: {
          id: 0,
          street: senderStreet,
          city: senderCity,
          postalCode: senderPostalCode,
          country: senderCountry,
        },
        receiverAddress: {
          id: 0,
          street: receiverStreet,
          city: receiverCity,
          postalCode: receiverPostalCode,
          country: receiverCountry,
        },
        deviceId,
        status,
      });
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  const handleGetPackageById = async () => {
    setError("");
    setResponse("");
    const id = prompt("Ange paket-ID:");
    if (!id) return;
    try {
      const data = await getPackageById(id);
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  const handleGetPackageByDeviceId = async () => {
    setError("");
    setResponse("");
    const deviceId = prompt("Ange deviceId:");
    if (!deviceId) return;
    try {
      const data = await getPackageByDeviceId(deviceId);
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  const handleUpdatePackage = async () => {
    setError("");
    setResponse("");
    const id = prompt("Ange ID på paket att uppdatera:");
    if (!id) return;
    const status = prompt(
      "Ny status (pending, in_transit, delivered, cancelled, out_for_delivery):"
    );
    if (!status) return;
    // Kontrollera att status är giltig
    const validStatuses = [
      "pending",
      "in_transit",
      "delivered",
      "cancelled",
      "out_for_delivery",
    ];
    if (!validStatuses.includes(status)) {
      setError("Ogiltig status!");
      return;
    }
    try {
      const data = await updatePackage(id, { status: status as any });
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  const handleDeletePackage = async () => {
    setError("");
    setResponse("");
    const id = prompt("Ange ID på paket att ta bort:");
    if (!id) return;
    try {
      const data = await deletePackage(id);
      setResponse(pretty(data));
    } catch (err: any) {
      setError(err.message || "Något gick fel");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-accent-4 p-8">
      <h1 className="text-5xl font-extrabold text-accent-1 mb-8 drop-shadow-lg">Logistik Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl mb-8">
        <PrimaryButton onClick={handleGetPackages}>Hämta alla paket</PrimaryButton>
        <PrimaryButton onClick={handleCreatePackage}>Skapa nytt paket</PrimaryButton>
        <PrimaryButton onClick={handleGetPackageById}>Hämta paket med ID</PrimaryButton>
        <PrimaryButton onClick={handleGetPackageByDeviceId}>Hämta paket via deviceId</PrimaryButton>
        <PrimaryButton onClick={handleUpdatePackage}>Uppdatera paket</PrimaryButton>
        <PrimaryButton onClick={handleDeletePackage}>Ta bort paket</PrimaryButton>
      </div>
      {response && (
        <div className="bg-white text-black rounded shadow p-4 w-full max-w-xl mb-4">
          <strong>Respons:</strong>
          <pre className="whitespace-pre-wrap text-xs md:text-sm">{response}</pre>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 rounded shadow p-4 w-full max-w-xl">
          <strong>Fel:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Home;
