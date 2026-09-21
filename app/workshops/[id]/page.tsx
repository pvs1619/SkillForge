import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  MapPin,
  User,
  GraduationCap,
  CheckCircle,
  Users,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileCode2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddToPlanButton } from "@/components/learning-plan/add-to-plan-button";
import { getWorkshopById, getWorkshops } from "@/lib/data/workshops";

interface WorkshopPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: WorkshopPageProps): Promise<Metadata> {
  const { id } = await params;
  const workshop = getWorkshopById(id);

  if (!workshop) {
    return {
      title: "Workshop Not Found",
    };
  }

  return {
    title: `${workshop.title} (${workshop.category})`,
    description: workshop.shortDescription,
  };
}

export async function generateStaticParams() {
  const workshops = getWorkshops();
  return workshops.map((workshop) => ({
    id: workshop.id,
  }));
}

export default async function WorkshopDetailPage({
  params,
}: WorkshopPageProps) {
  const { id } = await params;
  const workshop = getWorkshopById(id);

  if (!workshop) {
    notFound();
  }

  const difficultyVariant = {
    Beginner: "secondary" as const,
    Intermediate: "accent" as const,
    Advanced: "outline" as const,
  }[workshop.difficulty];

  const percentFilled = Math.round(
    ((workshop.totalSeats - workshop.seatsAvailable) / workshop.totalSeats) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button link */}
      <div className="mb-6">
        <Link
          href="/workshops"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all workshops</span>
        </Link>
      </div>

      {/* Main Grid: Details on Left, Interactive Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Workshop Curriculum & Description (Server-rendered) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {workshop.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Badge variant={difficultyVariant} className="text-xs font-medium">
                {workshop.difficulty} Level
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {workshop.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {workshop.description}
            </p>
          </div>

          <Separator />

          {/* What You Will Learn */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              What You Will Learn &amp; Build
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workshop.whatYouWillLearn.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 rounded-md border border-border/80 bg-card p-3.5 text-xs text-foreground"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Prerequisites */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Prerequisites &amp; Equipment
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {workshop.prerequisites.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Format & Structure */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileCode2 className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              Instructional Format
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {workshop.format}
            </p>
          </div>
        </div>

        {/* Right Column: Key Meta Card & Actions Island */}
        <aside className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Session Logistics
              </span>
              <p className="text-lg font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {workshop.date}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="space-y-3.5 text-xs border-y border-border/80 py-4">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Duration:</span>{" "}
                  <span className="text-muted-foreground">{workshop.duration}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Location:</span>{" "}
                  <span className="text-muted-foreground">{workshop.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Instructor:</span>{" "}
                  <span className="text-muted-foreground">
                    {workshop.instructor.name} ({workshop.instructor.role},{" "}
                    {workshop.instructor.department})
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">Capacity:</span>{" "}
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                    {workshop.seatsAvailable} seats remaining
                  </span>{" "}
                  <span className="text-muted-foreground">
                    ({workshop.totalSeats} capacity)
                  </span>
                </div>
              </div>
            </div>

            {/* Seat Capacity Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Enrollment status</span>
                <span className="font-semibold text-foreground">{percentFilled}% reserved</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${percentFilled}%` }}
                />
              </div>
            </div>

            {/* Actions: Client Island + Link */}
            <div className="space-y-3 pt-2">
              <Link href={`/enroll?workshop=${workshop.id}`} className="block">
                <Button className="w-full font-medium gap-2">
                  <span>Enroll in this Workshop</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              {/* Client Component Island */}
              <div className="w-full">
                <AddToPlanButton
                  workshopId={workshop.id}
                  workshopTitle={workshop.title}
                  variant="outline"
                  size="default"
                  showLabel={true}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
