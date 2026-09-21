import { Metadata } from "next";
import { getWorkshops } from "@/lib/data/workshops";
import { LearningPlanContent } from "@/components/learning-plan/learning-plan-content";

export const metadata: Metadata = {
  title: "My Learning Plan",
  description:
    "Review and manage your personalized workshop curriculum. Persisted in your browser with offline capability.",
};

export default function LearningPlanPage() {
  const allWorkshops = getWorkshops();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Personalized Curriculum
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          My Learning Plan
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Your curated selection of practical modules. Changes are saved automatically in your browser and will persist across sessions.
        </p>
      </div>

      {/* Client Component Island */}
      <LearningPlanContent allWorkshops={allWorkshops} />
    </div>
  );
}
