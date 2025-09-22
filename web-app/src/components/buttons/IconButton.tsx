import React from "react";

type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  type?: "button" | "submit" | "reset";
  className?: string; // in case you want to extend styling
  variant?: "primary" | "secondary";
};

const IconButton = ({
  onClick,
  children,
  icon,
  size = "medium",
  disabled,
  type = "button",
  className,
  variant = "primary",
}: IconButtonProps) => {
  const baseClasses = "IconButton flex items-center gap-2 m-2 hover:cursor-pointer";
  const variantClasses = variant === "primary"
    ? "bg-primary-1 text-neutral-light-1 hover:bg-primary-1-80 focus:ring-2 focus:ring-accent-1"
    : "bg-secondary-1 text-neutral-dark-1 hover:bg-secondary-2 focus:ring-2 focus:ring-accent-4";
  const sizeClasses = {
    large: "px-6 py-3 text-2xl rounded-2xl",
    medium: "px-4 py-2 text-base rounded-xl",
    small: "px-2 py-1 text-sm rounded-lg",
  }[size];
  const iconSizeClasses = {
    large: "text-4xl",
    medium: "text-3xl",
    small: "text-2xl",
  }[size];
  const disabledClasses = disabled ? "opacity-50 disabled:cursor-not-allowed" : "";

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className ?? ""}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
    >
      <span className={iconSizeClasses}>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default IconButton;

