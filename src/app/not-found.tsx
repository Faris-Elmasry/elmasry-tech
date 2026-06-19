import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-blue-500/30 font-[family-name:var(--font-poppins)] mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Page Not Found
        </h1>
        <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" href="/en">
            Go Home
          </Button>
          <Button variant="ghost" href="/en/contact">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
