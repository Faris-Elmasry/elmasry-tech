import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers/Providers";

const locales = ["en", "ar"] as const;
type Locale = (typeof locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider messages={messages}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider>
    </div>
  );
}
