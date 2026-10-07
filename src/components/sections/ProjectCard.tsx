import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localize } from "@/lib/utils";
import type { Locale } from "@/lib/site";

export type ProjectCardData = {
  id: number;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  tech_stack: string[];
  roi_metric?: string | null;
  thumbnail?: string | null;
};

/** Project tile. Without a thumbnail it renders a typographic cover, not a stock image. */
export function ProjectCard({
  project,
  locale,
  categoryLabel,
  index,
}: {
  project: ProjectCardData;
  locale: Locale;
  categoryLabel: string;
  index: number;
}) {
  const title = localize(project, "title", locale);
  return (
    <Link href={`/${locale}/portfolio/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-blueprint absolute inset-0 flex flex-col justify-between p-6">
            <span className="font-mono text-xs text-[var(--text-subtle)]">
              {String(index + 1).padStart(2, "0")} / {categoryLabel}
            </span>
            <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] transition-transform duration-700 group-hover:-translate-y-1">
              {title}
            </span>
          </div>
        )}
        <span className="absolute end-4 top-4 inline-flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 rtl-flip" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">{localize(project, "description", locale)}</p>
        </div>
        {project.roi_metric && (
          <span className="shrink-0 rounded-full bg-[var(--highlight)] px-2.5 py-1 text-xs font-medium text-[#121110]">
            {project.roi_metric}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-xs text-[var(--text-subtle)]" dir="ltr">
        {project.tech_stack.slice(0, 4).join(" · ")}
      </p>
    </Link>
  );
}
