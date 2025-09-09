import React from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import MainNav from "@/components/MainNav";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable server-side helpers below this layout
  setRequestLocale(locale);

  // Load messages via next-intl (uses i18n/request.ts under the hood)
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MainNav />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </NextIntlClientProvider>
  );
}
