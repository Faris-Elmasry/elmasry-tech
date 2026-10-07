import type { ReactNode } from "react";
import { Rise, SplitWords } from "@/components/motion/Kinetic";
import { cn } from "@/lib/utils";

/** Section label (index · name) + word-reveal headline + optional intro. */
export function Heading({
  index,
  label,
  title,
  sub,
  className,
  as: Tag = "h2",
  size = "lg",
}: {
  index?: string;
  label: string;
  title: string;
  sub?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  size?: "lg" | "xl";
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Rise>
        <p className="label flex items-center gap-3">
          {index && <span className="text-[var(--accent)]">{index}</span>}
          <span className="h-px w-10 bg-[var(--border-hover)]" aria-hidden="true" />
          {label}
        </p>
      </Rise>
      <Tag
        className={cn(
          "mt-6 font-display font-bold leading-[0.98] tracking-[-0.035em] text-balance",
          size === "xl" ? "text-[clamp(2.8rem,7.5vw,7rem)]" : "text-[clamp(2.2rem,5vw,4.6rem)]"
        )}
      >
        <SplitWords text={title} />
      </Tag>
      {sub && (
        <Rise delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] text-pretty">{sub}</p>
        </Rise>
      )}
    </div>
  );
}
