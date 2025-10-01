import React from 'react';
import IconButton from '../buttons/IconButton';

interface CTACardProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CTACard = ({ onClick }: CTACardProps) => {
  // default behavior if no onClick is passed
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else {
      event.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set('signatureRequestInitialized', 'true');
      window.location.href = url.toString();
    }
  };

  return (
    <section className="bg-neutral-light-1 card border-2 border-primary-1">
      <h2 className="text-2xl font-bold">Register Delivery</h2>
      <p className="text-lg text-neutral-dark-1">
        1. Scan QR-code
      </p>
      <IconButton iconVariant="edit" onClick={() => window.location.href = '/scanner'}>
        Scan
      </IconButton>
      <p className="text-lg text-neutral-dark-1">
        2. Repeat for each parcel
      </p>
      <p className="text-lg text-neutral-dark-1">
        3. Receive signature
      </p>
      <IconButton iconVariant="edit" onClick={handleClick}>
        Request Signature
      </IconButton>
    </section>
  );
};

export default CTACard;
