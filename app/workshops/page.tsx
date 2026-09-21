import { Metadata } from "next";
import { getWorkshops } from "@/lib/data/workshops";
import { WorkshopFilters } from "@/components/workshops/workshop-filters";

export const metadata: Metadata = {
  title: "Explore Workshops",
  description:
    "Browse practical, hands-on university workshops across AI, Data Science, Web Development, Design, and Cybersecurity.",
};

interface WorkshopsPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export default async function WorkshopsPage({
  searchParams,
}: WorkshopsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialCategory = resolvedParams.category;
  const workshops = getWorkshops();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Academic Discovery
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Explore Workshops
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Short, focused learning experiences built around practical skills. Each module pairs foundational concepts with laboratory implementation.
        </p>
      </div>

      {/* Interactive Filter Island & Workshop Grid */}
      <WorkshopFilters
        workshops={workshops}
        initialCategory={initialCategory}
      />
    </div>
  );
}
