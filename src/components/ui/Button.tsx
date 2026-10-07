"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "accent" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Signal-orange pill — the main call to action.
  primary: "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--text-primary)]",
  accent: "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--text-primary)]",
  outline:
    "border border-[var(--border-hover)] text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]",
  ghost: "text-[var(--text-primary)] hover:bg-white/[0.06]",
  danger: "bg-[var(--danger)] text-white hover:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

/**
 * Pill button. The label "rolls" on hover: a copy slides up from below while
 * the original slides out — a small crafted detail instead of a colour fade.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, fullWidth = false, href, className, children, disabled, ...props }, ref) => {
    const classes = cn(
      "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium whitespace-nowrap select-none",
      "transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97]",
      "disabled:pointer-events-none disabled:opacity-50",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    const label =
      typeof children === "string" ? (
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-full">
            {children}
          </span>
          <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:translate-y-0">
            {children}
          </span>
        </span>
      ) : (
        children
      );

    const content = (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && leftIcon}
        {label}
        {!loading && rightIcon}
      </>
    );

    if (href && !disabled) {
      if (/^(https?:|mailto:|tel:)/.test(href)) {
        return (
          <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
