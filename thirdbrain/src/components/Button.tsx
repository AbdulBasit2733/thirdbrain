import React, { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: String;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const defaultStyles = "px-4 py-2 rounded-md font-semibold text-sm cursor-pointer";

const variantClasses = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-purple-200 text-indigo-600",
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
