import Link from "next/link";
import { Clock, Calendar, MapPin, User, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToPlanButton } from "@/components/learning-plan/add-to-plan-button";
import { Workshop } from "@/lib/data/workshops";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const difficultyBadgeVariant = {
    Beginner: "secondary" as const,
    Intermediate: "accent" as const,
    Advanced: "outline" as const,
  }[workshop.difficulty];

  return (
    <article className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs">
      <div>
        {/* Meta badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            {workshop.category}
          </span>
          <Badge variant={difficultyBadgeVariant} className="text-[11px] font-medium">
            {workshop.difficulty}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          <Link
            href={`/workshops/${workshop.id}`}
            className="focus-visible:outline-none focus-visible:underline"
          >
            {workshop.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {workshop.shortDescription}
        </p>

        {/* Details list */}
        <div className="mt-4 space-y-1.5 text-xs text-muted-foreground border-t border-border/60 pt-3">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-foreground">
              {workshop.instructor.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="truncate">{workshop.instructor.department}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {workshop.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {workshop.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              {workshop.isOnline ? "Online & Campus" : "Campus Lab"}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons footer */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/80 pt-3.5">
        <AddToPlanButton
          workshopId={workshop.id}
          workshopTitle={workshop.title}
          variant="outline"
          size="sm"
        />

        <Link
          href={`/workshops/${workshop.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus-visible:underline"
        >
          <span>View Details</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
