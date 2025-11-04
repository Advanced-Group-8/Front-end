import React from "react";
import IconButton from "../buttons/IconButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Package } from "../../types/types";

type CTACardProps = {
  onClick?: () => void;
  currentPackage: Package;
};

const CTACard: React.FC<CTACardProps> = ( { onClick, currentPackage }) => {
  // default behavior if no onClick is passed
  const user = useSelector((state: RootState) => state.auth.profile);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  console.log ("user role:", user.role);
  console.log("package status:", currentPackage?.status);

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

  if (user.role === "sender" && currentPackage?.status === "pending") {
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

  if (user.role === "receiver" && currentPackage?.status === "out_for_delivery") {
    return (
      <section className="bg-neutral-light-1 card border-2 border-primary-1">
        <h2 className="text-2xl font-bold">Track Order</h2>
        <p className="text-lg text-neutral-dark-1"> Your package is out for delivery. You can follow the delivery live.</p>
        <IconButton
          iconVariant="truck"
          onClick={() => {handleClick}}
        >
          Follow Live Location
        </IconButton>
      </section>
    )
  }

  if (user.role === "receiver" && currentPackage?.status === "in_transit") {
    return (
      <section className="bg-neutral-light-1 card border-2 border-primary-1">
        <h2 className="text-2xl font-bold">Track Order</h2>
        <p className="text-lg text-neutral-dark-1"> Your package is being handed over to the carrier. <br/><br/> Once the carrier picks it up, you can follow the delivery live.</p>
        <IconButton
          iconVariant="truck" disabled={true}
          onClick={() => {handleClick}}
        >
          Follow Live Location
        </IconButton>
      </section>
    )
  }

  if (user.role === "carrier" && currentPackage?.status === "out_for_delivery") {
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
  }
  
  return (
    <section className="bg-neutral-light-1 card border-2 border-primary-1">
      <h2 className="text-2xl font-bold">No action required</h2>
    </section>
  );
};

export default CTACard;
