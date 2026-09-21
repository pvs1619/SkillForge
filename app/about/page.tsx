import { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About SkillForge",
  description:
    "Learn about SkillForge's educational mission, pedagogical stance, and modern Next.js architectural patterns.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Intro Header */}
      <div className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Academic Mission &amp; Methodology
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Learn something worth building.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          SkillForge is an academic workshop discovery platform engineered to bridge the divide between theoretical university coursework and real-world engineering craftsmanship.
        </p>
      </div>

      <Separator />

      {/* Pedagogical Stance */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Our Pedagogical Stance
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Traditional online education rewards passive watching and certificate accumulation. Students watch dozens of hours of video tutorials without gaining the autonomy to initiate, structure, or debug an original technical solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Focus on Applied Artifacts
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every SkillForge workshop centers around writing code or designing components from scratch. At the conclusion of each session, students leave with a verifiable codebase, not a generic certificate.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Short, Deep Engagements
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instead of 12-week survey courses, we offer 2–3 hour focused lab modules that zoom in on specific foundational mechanics: data indexing, defensive coding, container queries, or classification metrics.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Transparent Prerequisites
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No misleading promises that anyone can become an engineer overnight. Each workshop clearly stipulates mathematical or syntax prerequisites so that instructional time is never wasted on generic overviews.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              Open Curriculum Architecture
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Students build a personalized Learning Plan stored directly in their browser session, empowering them to map upcoming semesters without opaque paywalls or locked syllabi.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Technical Architecture Overview (Viva-focused) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full-Stack Assignment Architecture
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            How SkillForge is Built
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            SkillForge was developed as an end-to-end demonstration of the Next.js App Router, combining React Server Components (RSC), lightweight client islands, Zustand persistent client state, and type-safe server mutations.
          </p>
        </div>

        <div className="space-y-4">
          {/* Part A */}
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Layers className="h-4 w-4 text-primary" />
              Part A: Server Components vs. Client Component Islands
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The vast majority of the application—including layouts, discovery catalog data, workshop details, and static editorial sections—runs exclusively on the server as React Server Components (RSC). Only interactive leaf nodes (theme toggle, filter controls, Add to Plan buttons, and the enrollment form) use the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">&quot;use client&quot;</code> directive. All props crossing this boundary are strictly serializable primitives and plain objects.
            </p>
          </div>

          {/* Part B */}
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Part B: Zustand Client State &amp; Hydration Safety
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Student Learning Plans are managed via a centralized Zustand store with <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">persist</code> middleware. Crucially, client state stores only workshop identifiers (<code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">selectedWorkshopIds: string[]</code>) rather than duplicating the server-side catalog. Hydration mismatches are prevented by an explicit hydration guard hook that synchronizes localStorage only after client mounting.
            </p>
          </div>

          {/* Part C */}
          <div className="rounded-lg border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              Part C: Type-Safe Mutations &amp; Native Server Actions
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enrollment submissions utilize a single shared Zod schema (<code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">enrollmentSchema</code>) executed twice: first on the client via React Hook Form and <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">@hookform/resolvers/zod</code> for instantaneous inline feedback, and second on the server inside a native Server Action (<code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-[11px]">&quot;use server&quot;</code>) to sanitize input and prevent spoofing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="rounded-xl border border-border bg-muted/40 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          Ready to discover your next module?
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Explore upcoming sessions, save topics of interest, and secure your place in the university labs.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/workshops">
            <Button className="gap-2">
              <Compass className="h-4 w-4" />
              <span>Browse All Workshops</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
