import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "accent" | "muted";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "border-transparent bg-primary text-primary-foreground",
    secondary:
      "border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    outline:
      "border-border text-foreground bg-transparent",
    success:
      "border-emerald-200 bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
    accent:
      "border-teal-200 bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    muted:
      "border-slate-200 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
