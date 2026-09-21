"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  // Hydration-safe mounting check via React's useSyncExternalStore
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-md border border-border bg-card/60 opacity-60"
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const getLabel = () => {
    if (theme === "light") return "Light theme active (click for dark)";
    if (theme === "dark") return "Dark theme active (click for system)";
    return "System theme active (click for light)";
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className="h-9 w-9 border-border bg-card/80 text-foreground transition-colors hover:bg-muted focus-visible:outline-primary"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-blue-400" />
      ) : theme === "system" ? (
        <Laptop className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-amber-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
