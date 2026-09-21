"use client";

import { useHydratedLearningPlan } from "@/store/learning-plan-store";

export function LearningPlanCounter() {
  const { count, isHydrated } = useHydratedLearningPlan();

  if (!isHydrated || count === 0) {
    return null;
  }

  return (
    <span
      className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 transition-all duration-200"
      aria-label={`${count} saved workshops in your learning plan`}
    >
      {count}
    </span>
  );
}
