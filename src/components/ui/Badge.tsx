import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "blue" | "green" | "amber" | "red" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
  mono?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)]",
  blue: "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25",
  green: "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/25",
  amber: "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/25",
  red: "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/25",
  outline:
    "bg-transparent text-[var(--text-muted)] border border-[var(--border)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
  mono = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        mono && "font-[family-name:var(--font-mono)]",
        className
      )}
    >
      {children}
    </span>
  );
}
