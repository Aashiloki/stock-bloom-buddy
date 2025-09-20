import React from "react";
import { cn } from "@/lib/utils";

interface StyledButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const StyledButton = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className,
}: StyledButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-button font-semibold";
      case "secondary":
        return "bg-secondary hover:bg-secondary-hover text-secondary-foreground border border-border font-medium";
      case "success":
        return "bg-gradient-success hover:bg-success text-success-foreground shadow-success font-semibold";
      case "warning":
        return "bg-warning hover:bg-warning/90 text-warning-foreground shadow-button font-semibold";
      case "outline":
        return "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-200";
      default:
        return "bg-gradient-primary hover:bg-primary-hover text-primary-foreground shadow-button font-semibold";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-10 px-4 text-sm";
      case "md":
        return "h-12 px-6 text-base";
      case "lg":
        return "h-14 px-8 text-lg";
      default:
        return "h-12 px-6 text-base";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg",
        "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        getVariantClasses(),
        getSizeClasses(),
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
};