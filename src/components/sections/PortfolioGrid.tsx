"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard, type ProjectCardData } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/site";

export function PortfolioGrid({
  projects,
  locale,
  labels,
  emptyLabel,
}: {
  projects: ProjectCardData[];
  locale: Locale;
  labels: Record<string, string>;
  emptyLabel: string;
}) {
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-12 flex flex-wrap gap-2" role="group">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
                filter === c
                  ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                  : "border-[var(--border-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              {labels[c] ?? c}
            </button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className="text-[var(--text-muted)]">{emptyLabel}</p>
      ) : (
        <motion.div layout className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <ProjectCard project={p} locale={locale} categoryLabel={labels[p.category] ?? p.category} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
