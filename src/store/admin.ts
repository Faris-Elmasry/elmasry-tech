import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  sidebarCollapsed: boolean;
  activeSection: string;
  unsavedChanges: boolean;
  toggleSidebar: () => void;
  setActiveSection: (s: string) => void;
  setUnsavedChanges: (v: boolean) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      activeSection: "dashboard",
      unsavedChanges: false,

      toggleSidebar: () =>
        set({ sidebarCollapsed: !get().sidebarCollapsed }),

      setActiveSection: (activeSection) => set({ activeSection }),

      setUnsavedChanges: (unsavedChanges) => set({ unsavedChanges }),
    }),
    {
      name: "elmasry-admin",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
