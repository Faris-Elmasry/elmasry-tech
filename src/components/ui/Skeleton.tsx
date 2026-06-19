import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "card" | "image" | "avatar";

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  width?: string;
  height?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 rounded",
  card: "h-48 rounded-xl",
  image: "aspect-video rounded-xl",
  avatar: "h-10 w-10 rounded-full",
};

export function Skeleton({
  variant = "text",
  className,
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--bg-card)] relative overflow-hidden",
        variantStyles[variant],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>
  );
}
