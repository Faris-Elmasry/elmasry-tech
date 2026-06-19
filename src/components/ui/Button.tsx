"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type ButtonVariant = "primary" | "ghost" | "outline" | "danger";
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
  primary:
    "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_20px_rgba(30,111,255,0.25)] hover:shadow-[0_0_30px_rgba(30,111,255,0.4)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--text-primary)] hover:bg-white/5 active:bg-white/10",
  outline:
    "border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500/10 active:bg-blue-500/20",
  danger:
    "bg-red-600 text-white hover:bg-red-500 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-lg",
  md: "px-6 py-2.5 text-sm gap-2 rounded-lg",
  lg: "px-8 py-3 text-base gap-2.5 rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      href,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </>
    );

    if (href && !disabled) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
