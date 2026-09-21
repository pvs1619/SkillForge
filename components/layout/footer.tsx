import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 text-muted-foreground mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
                SF
              </span>
              <span className="font-bold text-base text-foreground tracking-tight">
                SkillForge
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              A university learning and practical workshop discovery platform. Built to help students and early-career developers acquire tangible, applied engineering and analytical skills.
            </p>
            <p className="text-xs text-muted-foreground/80 italic">
              Tagline: &ldquo;Learn something worth building.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Curriculum & Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/workshops"
                  className="hover:text-foreground transition-colors"
                >
                  Explore Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/learning-plan"
                  className="hover:text-foreground transition-colors"
                >
                  My Learning Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/enroll"
                  className="hover:text-foreground transition-colors"
                >
                  Workshop Enrollment
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About SkillForge
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture / Assignment Meta */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Technical Standards
            </h4>
            <div className="text-xs space-y-1.5 leading-normal">
              <p>Next.js 16 App Router &amp; RSC</p>
              <p>Zustand Persistent Client State</p>
              <p>React Hook Form &amp; Zod Schema</p>
              <p>Native Next.js Server Actions</p>
              <p>WCAG 2.1 AA Accessible Layout</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} SkillForge Academic Platform. All rights reserved.</p>
          <p className="text-muted-foreground/80">
            Engineered for Full Stack Next.js Academic Assignment 1.
          </p>
        </div>
      </div>
    </footer>
  );
}
