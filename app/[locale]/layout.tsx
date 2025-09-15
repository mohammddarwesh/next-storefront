// app/[locale]/layout.tsx - Improved locale layout
import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import MainNav from '@/components/layout/MainNav';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/config';
import { absoluteUrl } from '@/lib/utils/url';
import { Metadata } from 'next';


export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: `%s | ${siteConfig.name}`,
    },
    description: t('description'),
    authors: [
      {
        name: 'Next Storefront',
        url: siteConfig.url,
      },
    ],
    creator: 'Next Storefront',
    openGraph: {
      type: 'website',
      locale: locale,
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl('/og.png'),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [absoluteUrl('/og.png')],
      creator: siteConfig.links.twitter,
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: routing.locales.reduce((acc: Record<string, string>, loc: string) => {
        acc[loc] = absoluteUrl(`/${loc}`);
        return acc;
      }, {}),
    },
  };
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
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}