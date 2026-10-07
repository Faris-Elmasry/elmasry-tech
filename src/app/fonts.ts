import { Hanken_Grotesk, IBM_Plex_Sans_Arabic, JetBrains_Mono, Reem_Kufi, Syne } from "next/font/google";

// Latin display — wide, idiosyncratic grotesk for oversized headlines.
export const display = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display-var",
  display: "swap",
});

// Latin body.
export const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-var",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono-var",
  display: "swap",
  preload: false,
});

// Arabic display — geometric Kufi that sits naturally next to Syne.
export const arabicDisplay = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["700"],
  variable: "--font-arabic-display-var",
  display: "swap",
  // Preloaded: it renders the Arabic H1 (the LCP element on /ar).
});

// Arabic body — IBM Plex Sans Arabic: clean, professional, and ~4x lighter than Noto Kufi.
export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-arabic-var",
  display: "swap",
  preload: false,
});

export const fontVariables = [display, body, mono, arabicDisplay, arabic].map((f) => f.variable).join(" ");
