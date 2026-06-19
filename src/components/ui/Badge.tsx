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
  blue: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  green: "bg-green-500/15 text-green-400 border border-green-500/25",
  amber: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  red: "bg-red-500/15 text-red-400 border border-red-500/25",
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
