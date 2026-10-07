import {
  Boxes,
  BrainCircuit,
  Calculator,
  CalendarClock,
  Code,
  Dumbbell,
  Globe,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  PencilRuler,
  Pill,
  PlayCircle,
  ScanBarcode,
  Settings,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// Explicit map instead of `import * as Icons` so only used icons are bundled.
// Admin-entered service icons fall back to <Code /> if not listed here.
const icons: Record<string, LucideIcon> = {
  Boxes,
  BrainCircuit,
  Calculator,
  CalendarClock,
  Code,
  Dumbbell,
  Globe,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  PencilRuler,
  Pill,
  PlayCircle,
  ScanBarcode,
  Settings,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  UtensilsCrossed,
  Workflow,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Code;
  return <Icon className={className} aria-hidden="true" />;
}
