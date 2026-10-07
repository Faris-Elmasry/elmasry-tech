import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark: a bracket "e" built from two strokes and a signal dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <path d="M9 6 L4 16 L9 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 6 L28 16 L23 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3.6" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <Link href={href} aria-label="Elmasry Tech — home" className={cn("group inline-flex items-center gap-2 text-[var(--text-primary)]", className)}>
      <LogoMark className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180" />
      <span dir="ltr" className="font-display text-lg font-bold tracking-tight">
        elmasry<span className="text-[var(--accent)]">/</span>tech
      </span>
    </Link>
  );
}
