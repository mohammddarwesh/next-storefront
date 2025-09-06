// app/[locale]/layout.tsx
import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import MainNav from '@/components/MainNav';

// Derive a strict locale type from your routing
type Locale = (typeof routing.locales)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
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
      {children}
    </NextIntlClientProvider>
  );
}