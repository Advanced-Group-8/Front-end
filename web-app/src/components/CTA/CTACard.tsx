import React from "react";
import IconButton from "../buttons/IconButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type CTACardProps = {
  onClick?: () => void;
};

const CTACard: React.FC<CTACardProps> = () => {
  // default behavior if no onClick is passed
  const user = useSelector((state: RootState) => state.auth.profile);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user.role === "carrier") {
      event.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set("signatureRequestInitialized", "true");
      window.location.href = url.toString();
    }
    if (user.role === "sender") {
      console.log("To be implemented for sender");
      return;
    }
    if (user.role === "receiver") {
      console.log("To be implemented for receiver");
      return;
    }
  };

  if (user.role === "sender") {
    return (
      <section className="bg-neutral-light-1 card border-2 border-primary-1">
        <h2 className="text-2xl font-bold">Register Order</h2>
        <p className="text-lg text-neutral-dark-1">
          1. Pack your parcel, including the sensor
        </p>
        <p className="text-lg text-neutral-dark-1">
          2. Attach QR-code to the parcel
        </p>
        <p className="text-lg text-neutral-dark-1">3. Scan QR-code</p>
        <IconButton
          iconVariant="edit"
          onClick={() => (window.location.href = "/scanner")}
        >
          Scan
        </IconButton>
        <p className="text-lg text-neutral-dark-1">4. Repeat for each parcel</p>
      </section>
    );
  }

  if (user.role === "receiver") {
    return 
  }

  return (
    <section className="bg-neutral-light-1 card border-2 border-primary-1">
      <h2 className="text-2xl font-bold">Complete Delivery</h2>
      <p className="text-lg text-neutral-dark-1">1. Scan QR-code</p>
      <IconButton
        iconVariant="edit"
        onClick={() => (window.location.href = "/scanner")}
      >
        Scan
      </IconButton>
      <p className="text-lg text-neutral-dark-1">2. Repeat for each parcel</p>
      <p className="text-lg text-neutral-dark-1">3. Receive signature</p>
      <IconButton iconVariant="edit" onClick={handleClick}>
        Request Signature
      </IconButton>
    </section>
  );
};

export default CTACard;
