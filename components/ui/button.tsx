import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      default:
        "bg-primary text-primary-foreground hover:bg-blue-800 dark:hover:bg-blue-600 shadow-xs",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-emerald-100 dark:hover:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60",
      outline:
        "border border-border bg-card hover:bg-muted text-foreground hover:border-slate-300 dark:hover:border-slate-700",
      ghost:
        "hover:bg-muted text-muted-foreground hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-rose-700 dark:hover:bg-rose-600",
      accent:
        "bg-accent text-accent-foreground hover:bg-teal-100 dark:hover:bg-teal-950 border border-teal-200/70 dark:border-teal-800/60",
    }[variant];

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-6 text-base font-medium",
      icon: "h-10 w-10 p-0",
    }[size];

    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
