import React, { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: String;
  startIcon: ReactElement;
}

const defaultStyles = "px-4 py-2 rounded-md font-semibold text-sm";

const variantClasses = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-purple-200 text-indigo-600",
};

const Button = ({ variant, startIcon, text }: ButtonProps) => {
  return (
    <button className={variantClasses[variant] + " " + defaultStyles}>
      <div className="flex gap-2 items-center justify-center">
        {startIcon}
        {text}
      </div>
    </button>
  );
};

export default Button;
