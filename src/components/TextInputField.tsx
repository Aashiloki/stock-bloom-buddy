import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextInputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password" | "number";
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  ({ label, placeholder, value, onChange, type = "text", required = false, error, disabled = false, className }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-foreground">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={cn(
            "h-12 px-4 w-full bg-card border-2 border-border rounded-lg",
            "text-foreground placeholder:text-muted-foreground font-medium",
            "transition-all duration-200",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none",
            "hover:border-primary/50",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        />
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

TextInputField.displayName = "TextInputField";