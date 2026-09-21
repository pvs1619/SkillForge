import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:outline-destructive ring-1 ring-destructive/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
