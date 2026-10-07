"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error{error.digest ? ` · ${error.digest}` : ""}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">{t("error_title")}</h1>
        <p className="mt-3 text-[var(--text-muted)]">{t("error_text")}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>{t("try_again")}</Button>
          <Button variant="outline" href={`/${locale}`}>
            {t("home")}
          </Button>
        </div>
      </div>
    </div>
  );
}
