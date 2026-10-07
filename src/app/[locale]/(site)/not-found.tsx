import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("common");
  return (
    <section className="bg-blueprint relative flex min-h-[80vh] items-center px-5 pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-[clamp(6rem,22vw,14rem)] font-semibold leading-none tracking-[-0.06em] text-[var(--text-primary)]">
          4<span className="font-serif italic text-[var(--accent)]">0</span>4
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{t("not_found_title")}</h1>
        <p className="mt-3 text-[var(--text-muted)]">{t("not_found_text")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={`/${locale}`}>{t("home")}</Button>
          <Button href={whatsappLink(t("whatsapp_message"))} variant="outline">
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
