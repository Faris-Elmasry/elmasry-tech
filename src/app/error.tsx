"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Something went wrong
        </h1>
        <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Button variant="ghost" href="/en">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
