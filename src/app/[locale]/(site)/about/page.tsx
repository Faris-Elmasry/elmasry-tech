import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Rise } from "@/components/motion/Kinetic";
import { Chapter, Figure, SignOff, StudioHero } from "@/components/studio/kit";
import { ScrollLit } from "@/components/studio/ScrollLit";
import { HoverReveal } from "@/components/studio/HoverReveal";
import { tr } from "@/lib/content";
import { commitments, companyFacts, industries, teamRoles } from "@/lib/company";
import { breadcrumbJsonLd, buildMetadata, JsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import { seoFor } from "@/lib/seo-copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const seo = seoFor("about");
  return buildMetadata({ locale, path: "/about", title: tr(seo.title, locale), description: tr(seo.description, locale) });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const label = isAr ? "من نحن" : "About";
  const seo = seoFor("about");

  const principles = isAr
    ? [
        { title: "بالبلدي", text: "مفيش مصطلحات تتوّه. دايمًا هتعرف بنبني إيه، وليه، وهيخلص إمتى." },
        { title: "كل أسبوع", text: "حاجة صغيرة شغالة كل أسبوع، بدل مفاجأة كبيرة في الآخر." },
        { title: "على مقاسك", text: "بنفهم شغلك الأول، وبعدين نبني — مش العكس." },
        { title: "النتيجة", text: "بنقيس نجاحنا بوقتك اللي وفّرناه وفلوسك اللي اتظبطت — مش بعدد الشاشات." },
      ]
    : [
        { title: "Plain words", text: "No jargon. You always know what we’re building, why, and when it’s done." },
        { title: "Every week", text: "Something small that works, every week — instead of one big surprise at the end." },
        { title: "Your shape", text: "We learn how your business works first, then build — never the other way round." },
        { title: "The result", text: "We measure success in hours you saved and money that adds up — not in screens shipped." },
      ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: label, path: "/about" }])} />

      <StudioHero
        locale={locale}
        crumbs={[{ name: label }]}
        sheet={isAr ? "القاهرة · من 2023" : "Cairo · since 2023"}
        kicker={isAr ? "من نحن · الاستوديو" : "About · the studio"}
        keyword={tr(seo.h1!, locale)}
        title={isAr ? "استوديو صغير، بيبني برامج لأصحاب الشغل." : "A small studio that builds software for people who run businesses."}
        sub={tr(seo.intro!, locale)}
        aside={
          <Figure
            src="/images/site/developer.webp"
            alt={isAr ? "مهندس برمجيات شغال على شاشتين في مكتب" : "A software engineer working at two screens in an office"}
            fig="01"
            caption={isAr ? "اللي بيبني نظامك، هو نفسه اللي بيرد عليك." : "The person building your system is the person who answers you."}
            ratio="aspect-[4/3]"
            preload
            sizes="(min-width: 1024px) 36vw, 100vw"
          />
        }
      >
        <dl className="in mb-6 grid grid-cols-2 overflow-hidden rounded-[1.25rem] border border-[var(--border)] lg:grid-cols-4" style={{ "--d": "320ms" } as React.CSSProperties}>
          {companyFacts.map((f, i) => (
            <div
              key={tr(f.label, "en")}
              className={`flex flex-col-reverse justify-end gap-3 bg-[var(--bg-card)]/60 p-6 sm:p-7 ${i % 2 === 1 ? "border-s border-[var(--border)]" : ""} ${i >= 2 ? "border-t border-[var(--border)] lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}
            >
              <dt className="text-[var(--text-muted)]">{tr(f.label, locale)}</dt>
              <dd dir="ltr" className="text-start font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-none tracking-[-0.03em] rtl:text-end">
                {typeof f.value === "string" ? f.value : tr(f.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </StudioHero>

      {/* 01 — why we exist: a statement that lights up as you read */}
      <Chapter index="01" label={isAr ? "ليه بدأنا" : "Why we started"} title={isAr ? "شفنا شغل كويس بيضيع وسط الورق." : "We kept seeing good businesses lost in paperwork."}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ScrollLit
              className="text-[clamp(1.9rem,3.6vw,3.3rem)] leading-[1.2]"
              marks={isAr ? ["شغلك،", "ملكك."] : ["business,", "yours."]}
              text={
                isAr
                  ? "محلات وعيادات ومطاعم ماشية على كشاكيل وجروبات واتساب وبرامج مش فاهماها. فقررنا نعمل العكس: نفهم شغلك، وبعدين نبني حاجة على مقاسه — بسيطة، بالعربي، وملكك."
                  : "Shops, clinics and restaurants running on notebooks, WhatsApp groups and software that doesn’t get them. So we do the opposite: we learn your business, then build something that fits — simple, in Arabic, and yours."
              }
            />
            <Rise className="mt-12 grid gap-6 text-lg leading-relaxed text-[var(--text-muted)] sm:grid-cols-2">
              <p>
                {isAr
                  ? "البرامج الجاهزة بتجبر صاحب الشغل يغيّر طريقته، وكتير من الشركات بتسلّم حاجة شكلها حلو ومحدش بيصونها بعد كده."
                  : "Off-the-shelf software makes owners change how they work, and many agencies hand over something pretty that nobody maintains."}
              </p>
              <p>
                {isAr
                  ? "إحنا بنقعد معاك الأول، ونكتب الخطة بكلام مفهوم، ونوريك الشغل كل أسبوع، ونفضل جنبك بعد التشغيل."
                  : "We sit with you first, write the plan in plain words, show you progress every week, and stay with you after launch."}
              </p>
            </Rise>
          </div>
          <Rise delay={0.1} className="lg:col-span-4">
            <Figure
              src="/images/site/cairo-street.webp"
              alt={isAr ? "راجل بيوزّع العيش على عجلة في شارع زحمة" : "A man delivering bread on a bicycle through a busy street"}
              fig="02"
              caption={isAr ? "الشارع اللي بنشتغل له: سريع، وزحمة، ومبيستناش حد." : "The street we build for: fast, busy, and it waits for no one."}
              ratio="aspect-[3/4]"
              sizes="(min-width: 1024px) 28vw, 100vw"
            />
          </Rise>
        </div>
      </Chapter>

      {/* 02 — principles: each row fills with signal orange on hover */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-5 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:gap-10">
          <Rise className="lg:col-span-3">
            <p className="label flex items-center gap-3 lg:pt-3">
              <span className="text-[var(--accent)]">
                02
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--border-hover)]" />
              {isAr ? "بنشتغل إزاي" : "How we work"}
            </p>
          </Rise>
          <Rise className="lg:col-span-9">
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-balance">{isAr ? "أربع حاجات مش بنتنازل عنها." : "Four things we don’t compromise on."}</h2>
          </Rise>
        </div>
        <ul className="mt-14 border-b border-[var(--border)]">
          {principles.map((p, i) => (
            <li key={p.title} className="group relative isolate overflow-hidden border-t border-[var(--border)]">
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:hidden" />
              <div className="mx-auto grid max-w-[1400px] items-baseline gap-3 px-5 py-9 sm:px-8 md:grid-cols-12 md:gap-10">
                <span className="font-mono text-sm text-[var(--text-subtle)] transition-colors duration-500 group-hover:text-[var(--accent-ink)] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.04em] transition-colors duration-500 group-hover:text-[var(--accent-ink)] md:col-span-5">{p.title}</h3>
                <p className="max-w-lg text-lg leading-relaxed text-[var(--text-muted)] transition-colors duration-500 group-hover:text-[var(--accent-ink)] md:col-span-6">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 — who is on your project */}
      <Chapter index="03" label={isAr ? "مين معاك" : "Who’s with you"} title={isAr ? "فريق صغير كامل، من أول يوم لآخر يوم." : "A small, complete team from the first day to the last."}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Rise className="lg:col-span-5">
            <Figure
              src="/images/site/team-v2.webp"
              alt={isAr ? "فريق بيتناقش في مشروع حوالين ترابيزة في المكتب" : "A team discussing a project around an office table"}
              fig="03"
              caption={isAr ? "كل مشروع بيبدأ بورقة وقلم وأسئلة كتير." : "Every project starts with paper, a pen and a lot of questions."}
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
            <p className="mt-8 text-lg leading-relaxed text-[var(--text-muted)]">
              {isAr
                ? "المؤسسين بنفسهم بيمسكوا كل مشروع، وبنجمّع حواليه الأدوار اللي محتاجها — من غير طبقات إدارة بتأخّر الشغل."
                : "The founders lead every project personally, and we gather the roles it needs around them — without layers of management slowing things down."}
            </p>
          </Rise>
          <ol className="border-b border-[var(--border)] lg:col-span-7">
            {teamRoles.map((r, i) => (
              <Rise as="li" key={r.role.en} delay={i * 0.05} className="grid gap-2 border-t border-[var(--border)] py-7 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-8">
                <span className="font-mono text-sm text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="title-sm text-xl font-bold">{tr(r.role, locale)}</h3>
                <p className="text-lg leading-relaxed text-[var(--text-muted)]">{tr(r.text, locale)}</p>
              </Rise>
            ))}
          </ol>
        </div>
      </Chapter>

      {/* 04 — who we build for (hover image reveal) */}
      <Chapter index="04" label={isAr ? "بنشتغل مع مين" : "Who we work with"} title={isAr ? "بنبني لمين." : "Who we build for."} tone="card">
        <HoverReveal rows={industries.map((it) => ({ title: tr(it.name, locale), text: tr(it.text, locale), photo: it.photo }))} />
      </Chapter>

      {/* 05 — promises */}
      <Chapter index="05" label={isAr ? "وعودنا" : "Our promises"} title={isAr ? "ست وعود بنلتزم بيها في كل مشروع." : "Six promises we keep on every project."}>
        <ul className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c, i) => (
            <Rise as="li" key={c.title.en} delay={(i % 3) * 0.06} className="bg-[var(--bg-primary)] p-7 sm:p-9">
              <span className="font-mono text-sm text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 title-sm text-2xl font-bold">{tr(c.title, locale)}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">{tr(c.text, locale)}</p>
            </Rise>
          ))}
        </ul>
      </Chapter>

      <SignOff locale={locale} title={isAr ? "تعالى نشرب قهوة ونتكلم عن شغلك." : "Let’s grab a coffee and talk about your business."} />
    </>
  );
}
