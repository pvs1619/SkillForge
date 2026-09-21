import { Metadata } from "next";
import { getWorkshops } from "@/lib/data/workshops";
import { EnrollmentForm } from "@/components/enrollment/enrollment-form";

export const metadata: Metadata = {
  title: "Enroll in a Workshop",
  description:
    "Register for SkillForge practical engineering and analytics workshops. Type-safe validation with instant confirmation.",
};

interface EnrollPageProps {
  searchParams?: Promise<{
    workshop?: string;
  }>;
}

export default async function EnrollPage({ searchParams }: EnrollPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const defaultWorkshopId = resolvedParams.workshop;
  const workshops = getWorkshops();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Seat Reservation
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Workshop Enrollment
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Submit your university registration to reserve a lab seat. Each submission is validated on both client and server via shared Zod schemas and processed atomically.
        </p>
      </div>

      {/* Form Island */}
      <EnrollmentForm
        workshops={workshops}
        defaultWorkshopId={defaultWorkshopId}
      />
    </div>
  );
}
