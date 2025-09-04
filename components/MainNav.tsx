'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function MainNav() {
  const t = useTranslations('Navigation');

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {t('home')}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/products" className="hover:text-primary">
            {t('products')}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
