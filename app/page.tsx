import Link from "next/link";
import { ArrowRight, BookOpen, Compass, CheckCircle2, Terminal, Code2, Cpu, Shield, LineChart, Palette, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import { getFeaturedWorkshops, CATEGORIES } from "@/lib/data/workshops";

export default function HomePage() {
  const featuredWorkshops = getFeaturedWorkshops();

  const categoryIcons = {
    "Artificial Intelligence": Cpu,
    "Data & Analytics": LineChart,
    "Web Development": Code2,
    "Design": Palette,
    "Cybersecurity": Shield,
    "Finance & Analytics": Terminal,
    "Career Skills": Briefcase,
  };

  const categoryDescriptions: Record<string, string> = {
    "Artificial Intelligence": "Foundational ML pipelines, LLM mechanics, and evaluation metrics.",
    "Data & Analytics": "Data wrangling, statistical visualization, and exploratory pipelines.",
    "Web Development": "Modern frontend layout algorithms, version control, and reactive architectures.",
    "Design": "Typography systems, spatial cadence, and accessible interaction patterns.",
    "Cybersecurity": "Threat modeling, defensive coding standards, and vulnerability triage.",
    "Finance & Analytics": "Time-series modeling, quantitative ratios, and portfolio backtesting.",
    "Career Skills": "Technical interview frameworks, whiteboard communication, and portfolio curation.",
  };

  return (
    <div className="flex flex-col">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="border-b border-border bg-card/40 py-16 sm:py-24 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              PRACTICAL LEARNING • WORKSHOPS • SKILLS
            </div>

            {/* Main Heading */}
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
              Learn something worth building.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Discover practical workshops designed to help you turn curiosity into skills you can actually use. Structured sessions taught by academic fellows and practitioners.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/workshops">
                <Button size="lg" className="gap-2 px-6">
                  <span>Explore Workshops</span>
                  <Compass className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/learning-plan">
                <Button variant="outline" size="lg" className="gap-2 px-6">
                  <span>Build My Learning Plan</span>
                  <BookOpen className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORKSHOP PREVIEWS */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Curated Sessions
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Explore what you could learn next.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Upcoming hands-on lab modules scheduled across academic blocks and online auditoriums.
              </p>
            </div>

            <Link
              href="/workshops"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <span>View all 10 workshops</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FIND YOUR LEARNING DIRECTION (7 CATEGORIES) */}
      <section className="py-16 sm:py-20 bg-muted/20 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Discipline Tracks
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Find your learning direction
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Explore seven key technical disciplines. Each workshop is designed with specific prerequisites, applied exercises, and demonstrable takeaways.
            </p>
          </div>

          {/* Editorial Grid Treatment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => {
              const Icon = categoryIcons[category] || Code2;
              const desc = categoryDescriptions[category] || "Specialized hands-on laboratory modules.";

              return (
                <Link
                  key={category}
                  href={`/workshops?category=${encodeURIComponent(category)}`}
                  className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs"
                >
                  <div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {category}
                    </h3>

                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-primary">
                    <span>Browse modules</span>
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHY: LEARN WITH PURPOSE */}
      <section className="py-16 sm:py-24 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Our Educational Stance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Learn with purpose.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                SkillForge was conceived to dismantle course hoarder syndrome. Modern learners often collect dozens of uncompleted online certificates without writing a single line of original code.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We believe in small, deep cohorts focused on executing a tangible artifact: a clean data pipeline, an accessible interface, a verified classification model, or a secure auth architecture.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-background p-5 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Tangible Artifacts
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every 2–3 hour session concludes with a functioning script, dashboard, or repository module you can inspect and inspect again.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Zero Fluff Curriculum
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No 40-hour introductory filler. We assume foundational numeracy and dive straight into idioms, trade-offs, and mental models.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-5 space-y-2">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Personalized Roadmap
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Use the Learning Plan to collect relevant modules, estimate your semester commitment, and register smoothly.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background p-5 space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Verified Mentorship
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Guided by university research fellows and senior software engineers who evaluate code quality and debugging strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBTLE CTA */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Ready to build your next skill?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Browse our catalog of practical workshops, select what aligns with your academic goals, and reserve your seat.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/workshops">
              <Button size="lg" className="px-6 gap-2">
                <span>Explore Workshops</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
