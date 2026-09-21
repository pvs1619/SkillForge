"use client";

import * as React from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkshopCard } from "./workshop-card";
import {
  Workshop,
  Category,
  Difficulty,
  CATEGORIES,
  DIFFICULTIES,
} from "@/lib/data/workshops";

interface WorkshopFiltersProps {
  workshops: Workshop[];
  initialCategory?: string;
}

export function WorkshopFilters({
  workshops,
  initialCategory,
}: WorkshopFiltersProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<
    Category | "All"
  >(
    initialCategory && CATEGORIES.includes(initialCategory as Category)
      ? (initialCategory as Category)
      : "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    Difficulty | "All"
  >("All");

  const filteredWorkshops = React.useMemo(() => {
    return workshops.filter((workshop) => {
      // 1. Category filter
      if (
        selectedCategory !== "All" &&
        workshop.category !== selectedCategory
      ) {
        return false;
      }

      // 2. Difficulty filter
      if (
        selectedDifficulty !== "All" &&
        workshop.difficulty !== selectedDifficulty
      ) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = workshop.title.toLowerCase().includes(query);
        const matchesDesc = workshop.shortDescription
          .toLowerCase()
          .includes(query);
        const matchesInstructor = workshop.instructor.name
          .toLowerCase()
          .includes(query);
        const matchesCategory = workshop.category
          .toLowerCase()
          .includes(query);

        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesInstructor &&
          !matchesCategory
        ) {
          return false;
        }
      }

      return true;
    });
  }, [workshops, selectedCategory, selectedDifficulty, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops by skill, topic, or instructor..."
            className="pl-9 pr-8"
            aria-label="Search workshops"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Category
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
              aria-pressed={selectedCategory === "All"}
            >
              All Categories
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter Pills and Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Level:
            </span>
            <div className="flex gap-1" role="group" aria-label="Filter by difficulty">
              {(["All", ...DIFFICULTIES] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`rounded-sm px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    selectedDifficulty === diff
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={selectedDifficulty === diff}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Showing{" "}
              <strong className="text-foreground font-semibold">
                {filteredWorkshops.length}
              </strong>{" "}
              of {workshops.length} workshops
            </p>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
              >
                <X className="h-3 w-3" />
                Reset filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Workshop Grid or Empty Filter Result */}
      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            No workshops match your criteria
          </h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms or resetting the category and level filters.
          </p>
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Reset all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
