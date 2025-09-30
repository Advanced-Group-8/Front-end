import { useEffect, useState } from "react";
import CTACard from "../components/CTA/CTACard";
import IconButton from "../components/buttons/IconButton";
const SignaturePage = () => {
  const [initialized, setInitialized] = useState(false);

  // Sync state with URL on mount & whenever URL changes
  useEffect(() => {
    const url = new URL(window.location.href);
    setInitialized(url.searchParams.get("signatureRequestInitialized") === "true");
  }, []);

  const enableSignatureRequest = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("signatureRequestInitialized", "true");
    window.history.pushState({}, "", url.toString());
    setInitialized(true);
  };

  const disableSignatureRequest = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("signatureRequestInitialized");
    window.history.pushState({}, "", url.toString());
    setInitialized(false);
  };
  
  return (
    <>
      
      {initialized ? (
        <div className="card">
          <p>Sign here</p>
          <canvas id="signature-canvas" className="border-2 w-full text-neutral-dark-1"> Signature canvas </canvas>
          <div className="flex items-center justify-center space-x-4">
            <IconButton variant="secondary" iconVariant="cancel" onClick={disableSignatureRequest}>Cancel</IconButton>
            <IconButton variant="primary" onClick={() => window.location.href = "/"}>Confirm</IconButton>
          </div>
        </div>
      ) : (
        <>
          <div className="card border-2 border-red-500 p-4">
            <p className="text-red-500">Order Detailed Information Component here</p>
            {/* TODO add component*/}
          </div>
          <CTACard onClick={initialized ? disableSignatureRequest : enableSignatureRequest}/> 
        </>
      )}


    </>
  );
};

export default SignaturePage;
