import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('aboutUs')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('aboutText')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('quickLinks')}</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">{t('home')}</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">{t('products')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('contact')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('email')}: info@example.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
