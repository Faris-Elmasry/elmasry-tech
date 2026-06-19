"use client";

import { useEffect, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  maxWidth = "max-w-lg",
}: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild>
              <motion.div
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)]",
                  maxWidth,
                  "bg-[var(--bg-secondary)] border border-[var(--border)]",
                  "rounded-2xl p-6 shadow-2xl",
                  "focus:outline-none",
                  className
                )}
                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {title && (
                  <DialogPrimitive.Title className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    {title}
                  </DialogPrimitive.Title>
                )}
                {description && (
                  <DialogPrimitive.Description className="text-sm text-[var(--text-muted)] mb-4">
                    {description}
                  </DialogPrimitive.Description>
                )}
                {children}
                <DialogPrimitive.Close asChild>
                  <button
                    className="absolute top-4 right-4 p-1 rounded-lg text-[var(--text-subtle)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
