"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCharCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, showCharCount, className, id, required, value, maxLength, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--text-primary)] mb-1.5"
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg",
            "px-4 py-2.5 text-sm text-[var(--text-primary)]",
            "placeholder:text-[var(--text-subtle)]",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 focus:outline-none",
            "transition-colors duration-200",
            "resize-y min-h-[120px]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className
          )}
          required={required}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {error && <p className="text-xs text-red-400">{error}</p>}
          {showCharCount && maxLength && (
            <p
              className={cn(
                "text-xs text-[var(--text-subtle)] ml-auto",
                charCount > maxLength * 0.9 && "text-amber-400",
                charCount >= maxLength && "text-red-400"
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
