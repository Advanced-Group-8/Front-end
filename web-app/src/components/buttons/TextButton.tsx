type ButtonVariant = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";

type TextButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const TextButton: React.FC<TextButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  children,
  type = "button",
}) => {
  const baseStyles =
    "rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
  const variantStyles = {
    primary: "bg-primary-1 text-white hover:bg-primary-1/80",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
  };
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        disabled ? disabledStyles : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TextButton;
