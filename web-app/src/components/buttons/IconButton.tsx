import React from "react";

type IconButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
  iconVariant?: "save" | "cancel" | "confirm" | "edit" | "check";
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
};

const icons = {
  save: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    </svg>
  ),
  cancel: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  confirm: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  check: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  edit: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5h6l3 3v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5h6z" />
    </svg>
  ),
};

const IconButton = ({
  onClick,
  children,
  iconVariant = "check",
  size = "medium",
  disabled,
  type = "button",
  className,
  variant = "primary",
}: IconButtonProps) => {
  const baseClasses = "IconButton flex items-center gap-2 m-2 transition-colors duration-200";
  const variantClasses = variant === "primary"
    ? "bg-primary-1 text-neutral-light-1 hover:bg-primary-1-80 focus:ring-2 focus:ring-accent-1"
    : "bg-secondary-1 text-neutral-dark-1 hover:bg-secondary-2 focus:ring-2 focus:ring-accent-4";
  
  const sizeClasses = {
    large: "px-6 py-3 text-2xl rounded-2xl",
    medium: "px-4 py-2 text-base rounded-xl",
    small: "px-2 py-1 text-sm rounded-lg",
  }[size];

  const iconSizeClasses = {
    large: "w-8 h-8",
    medium: "w-6 h-6",
    small: "w-4 h-4",
  }[size];

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className ?? ""}`;

    // Clone the SVG and apply the correct size class
  const getIcon = () => {
    if (!iconVariant) return null;
    const icon = icons[iconVariant];
    return React.cloneElement(icon, { className: iconSizeClasses });
  };

return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
    >
      {getIcon()}
      {children && <span>{children}</span>}
    </button>
  );
};

export default IconButton;
