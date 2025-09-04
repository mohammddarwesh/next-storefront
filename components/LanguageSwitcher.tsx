'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing)['locales'][number];
const locales: readonly Locale[] = routing.locales;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (lang: Locale) => {
    // Use next-intl navigation to switch locale while preserving the current pathname
    // This handles default-locale prefixing (as-needed) automatically
    router.replace({ pathname }, { locale: lang });
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
