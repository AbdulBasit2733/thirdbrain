import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: String;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const defaultStyles = "px-4 py-2 rounded-md font-semibold text-sm cursor-pointer tracking-wider";

const variantClasses = {
  primary: "bg-orange-500 text-white",
  secondary: "bg-orange-100 text-orange-500",
};

const Button = ({
  variant,
  startIcon,
  text,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        variantClasses[variant] +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full" : ""} ${loading ? " disabled opacity-75 cursor-none" : ""}`
      }
      disabled={loading}
    >
      <div className="flex gap-2 items-center justify-center">
        {startIcon}
        {text}
      </div>
    </button>
  );
};

export default Button;
