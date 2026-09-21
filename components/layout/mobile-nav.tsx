"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, Compass, Info, UserPlus } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useHydratedLearningPlan } from "@/store/learning-plan-store";
import { ThemeToggle } from "./theme-toggle";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { count, isHydrated } = useHydratedLearningPlan();

  const navLinks = [
    { href: "/workshops", label: "Workshops", icon: Compass },
    {
      href: "/learning-plan",
      label: "My Learning Plan",
      icon: BookOpen,
      badge: isHydrated && count > 0 ? count : null,
    },
    { href: "/about", label: "About", icon: Info },
    { href: "/enroll", label: "Enroll Now", icon: UserPlus },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden h-9 w-9 border-border bg-card text-foreground"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6 flex flex-col justify-between">
        <div>
          <SheetHeader className="border-b border-border pb-4 mb-6">
            <SheetTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-primary" />
              SkillForge
            </SheetTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Learn something worth building.
            </p>
          </SheetHeader>

          <nav className="flex flex-col space-y-1.5" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-primary font-semibold"
                      : "text-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {link.label}
                  </span>
                  {link.badge ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
