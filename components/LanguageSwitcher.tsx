'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/routing';

type Locale = (typeof locales)[number];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (lang: Locale) => {
    // Get the current path without the locale prefix
    const path = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?\//, '/');
    // Navigate to the same path with the new locale
    router.push(`/${lang}${path}`);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            currentLocale === lang 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted hover:bg-muted/80'
          }`}
          aria-pressed={currentLocale === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
