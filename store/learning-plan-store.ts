"use client";

import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { useSyncExternalStore } from "react";

export interface LearningPlanStore {
  selectedWorkshopIds: string[];
  addWorkshop: (id: string) => void;
  removeWorkshop: (id: string) => void;
  clearPlan: () => void;
  isSelected: (id: string) => boolean;
  hasWorkshop: (id: string) => boolean;
  toggleWorkshop: (id: string) => void;
}

/**
 * Robust StateStorage adapter for Next.js App Router.
 * Ensures localStorage is accessed at runtime on the client,
 * while safely returning null / no-op during SSR / build time.
 */
const customStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") {
      return null;
    }
    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

export const useLearningPlanStore = create<LearningPlanStore>()(
  persist(
    (set, get) => ({
      selectedWorkshopIds: [],

      addWorkshop: (id: string) =>
        set((state) => {
          if (state.selectedWorkshopIds.includes(id)) {
            return state; // Duplicate prevention
          }
          return {
            selectedWorkshopIds: [...state.selectedWorkshopIds, id],
          };
        }),

      removeWorkshop: (id: string) =>
        set((state) => ({
          selectedWorkshopIds: state.selectedWorkshopIds.filter(
            (itemId) => itemId !== id
          ),
        })),

      clearPlan: () =>
        set({
          selectedWorkshopIds: [],
        }),

      isSelected: (id: string) => get().selectedWorkshopIds.includes(id),

      hasWorkshop: (id: string) => get().selectedWorkshopIds.includes(id),

      toggleWorkshop: (id: string) => {
        const alreadySelected = get().selectedWorkshopIds.includes(id);
        if (alreadySelected) {
          get().removeWorkshop(id);
        } else {
          get().addWorkshop(id);
        }
      },
    }),
    {
      name: "skillforge-learning-plan",
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        selectedWorkshopIds: state.selectedWorkshopIds,
      }),
    }
  )
);

const emptySubscribe = () => () => {};

/**
 * Hydration-safe hook for consuming Learning Plan state in Next.js App Router.
 * Uses React 19's useSyncExternalStore to cleanly distinguish server vs client
 * execution without triggering cascading effect renders or hydration mismatches.
 */
export function useHydratedLearningPlan() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const selectedWorkshopIds = useLearningPlanStore(
    (state) => state.selectedWorkshopIds
  );
  const addWorkshop = useLearningPlanStore((state) => state.addWorkshop);
  const removeWorkshop = useLearningPlanStore((state) => state.removeWorkshop);
  const clearPlan = useLearningPlanStore((state) => state.clearPlan);
  const isSelected = useLearningPlanStore((state) => state.isSelected);
  const hasWorkshop = useLearningPlanStore((state) => state.hasWorkshop);
  const toggleWorkshop = useLearningPlanStore((state) => state.toggleWorkshop);

  return {
    isHydrated,
    selectedWorkshopIds: isHydrated ? selectedWorkshopIds : [],
    count: isHydrated ? selectedWorkshopIds.length : 0,
    addWorkshop,
    removeWorkshop,
    clearPlan,
    isSelected: (id: string) => (isHydrated ? isSelected(id) : false),
    hasWorkshop: (id: string) => (isHydrated ? hasWorkshop(id) : false),
    toggleWorkshop,
  };
}
