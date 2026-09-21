import Link from "next/link";
import { LearningPlanCounter } from "./learning-plan-counter";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xs transition-colors">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium shadow-md"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-foreground focus-visible:outline-primary rounded-sm"
            aria-label="SkillForge Homepage"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm tracking-tight shadow-xs">
              SF
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                SkillForge
              </span>
              <span className="hidden sm:inline-block text-[10px] tracking-wide text-muted-foreground uppercase font-medium -mt-1">
                Practical Learning
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium"
            aria-label="Main Navigation"
          >
            <Link
              href="/workshops"
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            >
              Workshops
            </Link>

            <Link
              href="/learning-plan"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            >
              <span>My Learning Plan</span>
              <LearningPlanCounter />
            </Link>

            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>

          <Link href="/enroll" className="hidden sm:inline-flex">
            <Button size="sm" className="font-medium px-4">
              Enroll
            </Button>
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
