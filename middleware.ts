import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // استثناء api / trpc / _next / _vercel و أي مسار فيه نقطة
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
