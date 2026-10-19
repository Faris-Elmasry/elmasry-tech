import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/components/archive/demo-kinetic/copy";
import { KineticHero } from "@/components/archive/demo-kinetic/KineticHero";
import { WordTheatre } from "@/components/archive/demo-kinetic/WordTheatre";
import { VelocityBand } from "@/components/archive/demo-kinetic/VelocityBand";
import { Manifesto } from "@/components/archive/demo-kinetic/Manifesto";
import { ClosingCta } from "@/components/archive/demo-kinetic/ClosingCta";

export const metadata: Metadata = {
  title: "Demo — Kinetic type",
  description: "Kinetic typography concept for the Elmasry Tech landing page.",
  robots: { index: false, follow: false },
};

export default async function KineticDemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = asLocale(locale);

  return (
    <div className="relative">
      {/* Without JS the entrance animations never start — show everything. */}
      <noscript>
        <style>{`[data-kinetic-anim]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
      </noscript>
      <KineticHero locale={l} />
      <WordTheatre locale={l} />
      <VelocityBand locale={l} />
      <Manifesto locale={l} />
      <ClosingCta locale={l} />
    </div>
  );
}
