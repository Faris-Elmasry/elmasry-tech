"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  animate?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export function SectionWrapper({
  id,
  className,
  animate = true,
  children,
  fullWidth = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const Wrapper = animate ? motion.section : "section";

  return (
    <Wrapper
      ref={ref}
      id={id}
      className={cn(
        "py-20 px-4",
        !fullWidth && "max-w-7xl mx-auto",
        className
      )}
      {...(animate
        ? {
            initial: { opacity: 0, y: 24 },
            animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }
        : {})}
    >
      {children}
    </Wrapper>
  );
}
