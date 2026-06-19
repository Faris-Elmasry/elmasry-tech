import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";
type Locale = "en" | "ar";

interface UIStore {
  theme: Theme;
  locale: Locale;
  mobileMenuOpen: boolean;
  activeModal: string | null;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  setMobileMenuOpen: (v: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      locale: "en",
      mobileMenuOpen: false,
      activeModal: null,

      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.dataset.theme = theme;
        }
      },

      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        get().setTheme(next);
      },

      setLocale: (locale) => {
        set({ locale });
        if (typeof document !== "undefined") {
          document.documentElement.lang = locale;
          document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
        }
      },

      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

      openModal: (id) => set({ activeModal: id }),

      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: "elmasry-ui",
      partialize: (state) => ({
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
);
