import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/i18n/config';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/.') ||
    pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Get the locale either from the pathname or using the negotiator
  const locale = pathnameIsMissingLocale ? getLocale(request) : pathname.split('/')[1];

  // Check authentication
  const isAuthenticated = request.cookies.get('auth')?.value === 'true';
  const isLoginPage = pathname.includes('/login');

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(
      new URL(`/${locale}/login`, request.url)
    );
  }

  // If authenticated and on login page, redirect to home
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    );
  }

  // Handle missing locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};