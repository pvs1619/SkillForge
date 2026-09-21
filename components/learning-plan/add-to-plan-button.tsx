"use client";

import * as React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHydratedLearningPlan } from "@/store/learning-plan-store";
import { toast } from "sonner";

interface AddToPlanButtonProps {
  workshopId: string;
  workshopTitle: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  showLabel?: boolean;
}

export function AddToPlanButton({
  workshopId,
  workshopTitle,
  variant = "outline",
  size = "sm",
  showLabel = true,
}: AddToPlanButtonProps) {
  const { isSelected, addWorkshop, removeWorkshop, isHydrated } =
    useHydratedLearningPlan();

  const isSaved = isHydrated ? isSelected(workshopId) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      removeWorkshop(workshopId);
      toast.info(`Removed "${workshopTitle}" from your Learning Plan.`);
    } else {
      addWorkshop(workshopId);
      toast.success(`Saved "${workshopTitle}" to your Learning Plan.`);
    }
  };

  return (
    <Button
      variant={isSaved ? "secondary" : variant}
      size={size}
      onClick={handleClick}
      aria-label={
        isSaved
          ? `Remove "${workshopTitle}" from learning plan`
          : `Add "${workshopTitle}" to learning plan`
      }
      className={
        isSaved
          ? "border-emerald-300 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800"
          : ""
      }
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          {showLabel && <span>In Learning Plan</span>}
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
          {showLabel && <span>Add to Plan</span>}
        </>
      )}
    </Button>
  );
}
