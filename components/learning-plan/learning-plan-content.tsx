"use client";

import * as React from "react";
import Link from "next/link";
import {
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHydratedLearningPlan } from "@/store/learning-plan-store";
import { Workshop } from "@/lib/data/workshops";
import { toast } from "sonner";

interface LearningPlanContentProps {
  allWorkshops: Workshop[];
}

export function LearningPlanContent({
  allWorkshops,
}: LearningPlanContentProps) {
  const { selectedWorkshopIds, isHydrated, removeWorkshop, clearPlan } =
    useHydratedLearningPlan();

  // Match selected IDs against catalogue data
  const selectedWorkshops = React.useMemo(() => {
    if (!isHydrated) return [];
    return allWorkshops.filter((workshop) =>
      selectedWorkshopIds.includes(workshop.id)
    );
  }, [allWorkshops, selectedWorkshopIds, isHydrated]);

  const totalHours = React.useMemo(() => {
    return selectedWorkshops.reduce((acc, workshop) => {
      const match = workshop.duration.match(/([\d.]+)/);
      return acc + (match ? parseFloat(match[1]) : 0);
    }, 0);
  }, [selectedWorkshops]);

  const distinctCategories = React.useMemo(() => {
    return Array.from(new Set(selectedWorkshops.map((w) => w.category)));
  }, [selectedWorkshops]);

  const handleRemove = (id: string, title: string) => {
    removeWorkshop(id);
    toast.info(`Removed "${title}" from your Learning Plan.`);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire learning plan?")) {
      clearPlan();
      toast.success("Learning plan cleared.");
    }
  };

  // SSR Loading state or Hydration guard placeholder
  if (!isHydrated) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-28 rounded-lg bg-muted/60" />
        <div className="h-44 rounded-lg bg-muted/60" />
        <div className="h-44 rounded-lg bg-muted/60" />
      </div>
    );
  }

  // Empty state
  if (selectedWorkshops.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
          <BookOpen className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Your learning plan is empty.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Save workshops here when you find something worth learning. You can review your roadmap, calculate hours, and register when you are ready.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/workshops">
            <Button className="gap-2">
              <span>Explore Workshops</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Plan Summary Statistics Card */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Curriculum Roadmap Overview
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Persistent client state managed via Zustand (stored in browser local storage).
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 border-rose-200 dark:border-rose-900 gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear entire plan
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-5">
          <div className="rounded-md bg-muted/50 p-3.5 border border-border/40">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Selected Workshops
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {selectedWorkshops.length}
            </p>
          </div>

          <div className="rounded-md bg-muted/50 p-3.5 border border-border/40">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Clock className="h-4 w-4 text-primary" />
              Est. Learning Time
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              ~{totalHours} hrs
            </p>
          </div>

          <div className="col-span-2 md:col-span-1 rounded-md bg-muted/50 p-3.5 border border-border/40">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <GraduationCap className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              Skill Disciplines
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {distinctCategories.length} {distinctCategories.length === 1 ? "track" : "tracks"}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Workshops List */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Selected Workshops ({selectedWorkshops.length})
        </h3>

        <div className="space-y-3">
          {selectedWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[11px]">
                    {workshop.category}
                  </Badge>
                  <Badge
                    variant={
                      workshop.difficulty === "Beginner"
                        ? "secondary"
                        : workshop.difficulty === "Intermediate"
                        ? "accent"
                        : "outline"
                    }
                    className="text-[11px]"
                  >
                    {workshop.difficulty}
                  </Badge>
                </div>

                <h4 className="text-base font-bold text-foreground hover:text-primary transition-colors">
                  <Link href={`/workshops/${workshop.id}`}>
                    {workshop.title}
                  </Link>
                </h4>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {workshop.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {workshop.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {workshop.location}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                <Link href={`/enroll?workshop=${workshop.id}`}>
                  <Button size="sm" className="font-medium text-xs">
                    Enroll Now
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(workshop.id, workshop.title)}
                  className="h-8 w-8 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  aria-label={`Remove ${workshop.title} from plan`}
                  title="Remove from plan"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
