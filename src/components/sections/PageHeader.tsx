import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Top banner for inner pages. With `image`, a real photo bleeds behind the
 * title (graded into the dark theme). The H1 is never animated — it is the LCP.
 */
export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  /** Path under /public, e.g. "/images/services/ai-chatbots.jpg". */
  image?: string;
}) {
  return (
    <header className={cn("relative isolate flex items-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40", image ? "min-h-[86svh]" : "min-h-[62svh]")}>
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority sizes="100vw" quality={60} className="photo-in object-cover" />
          <div className="absolute inset-0 bg-[var(--bg-primary)]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
        </div>
      )}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <p className="label in flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--border-hover)]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-balance">
          {title}
        </h1>
        {sub && (
          <p className="in mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty" style={{ "--d": "120ms" } as CSSProperties}>
            {sub}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
