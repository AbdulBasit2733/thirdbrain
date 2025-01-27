import * as React from "react";
import { cn } from "@/lib/utils";

const buttonStyles = {
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  },
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof (typeof buttonStyles)["variants"];
  size?: keyof (typeof buttonStyles)["sizes"];
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", onClick, size = "default", ...props },
    ref
  ) => {
    const combinedClassName = cn(
      buttonStyles.base,
      buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      className
    );

    return (
      <button
        onClick={onClick}
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
