"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (data: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const icons: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-400" />,
  error: <AlertCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-400" />,
};

const borderColors: Record<ToastVariant, string> = {
  success: "border-l-green-500",
  error: "border-l-red-500",
  info: "border-l-blue-500",
  warning: "border-l-amber-500",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...data, id }]);
    // Auto-dismiss after 4s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
        {children}
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastPrimitive.Root key={t.id} asChild forceMount>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "bg-[var(--bg-card)] border border-[var(--border)] border-l-4 rounded-lg p-4 shadow-xl",
                  "flex items-start gap-3 min-w-[320px] max-w-[420px]",
                  borderColors[t.variant]
                )}
              >
                <div className="shrink-0 mt-0.5">{icons[t.variant]}</div>
                <div className="flex-1 min-w-0">
                  <ToastPrimitive.Title className="text-sm font-medium text-[var(--text-primary)]">
                    {t.title}
                  </ToastPrimitive.Title>
                  {t.description && (
                    <ToastPrimitive.Description className="text-xs text-[var(--text-muted)] mt-1">
                      {t.description}
                    </ToastPrimitive.Description>
                  )}
                </div>
                <ToastPrimitive.Close asChild>
                  <button
                    onClick={() => removeToast(t.id)}
                    className="shrink-0 p-1 rounded text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Close notification"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </ToastPrimitive.Close>
              </motion.div>
            </ToastPrimitive.Root>
          ))}
        </AnimatePresence>
        <ToastPrimitive.Viewport className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
