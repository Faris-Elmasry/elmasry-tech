import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "glass";

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[var(--bg-card)] border border-[var(--border)] rounded-xl",
  elevated:
    "bg-[var(--bg-card)] border border-[var(--border)] rounded-xl card-hover",
  glass:
    "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl",
};

export function Card({
  variant = "default",
  children,
  className,
  padding = true,
}: CardProps) {
  return (
    <div
      className={cn(
        variantStyles[variant],
        padding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
