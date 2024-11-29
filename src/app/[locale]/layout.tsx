import type { Metadata } from "next";
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Header } from '@/app/components/Header';
import { locales } from '@/i18n/config';
import localFont from "next/font/local";
import { Suspense } from 'react';
import Loading from './loading';
import "../globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "HS Code Classifier",
  description: "Classify products with HS codes",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Wait for params to resolve
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative min-h-screen bg-background font-sans antialiased">
              <Suspense fallback={<Loading />}>
                <Header />
                <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
                  <main className="flex-1">
                    <div className="container relative py-6">
                      {children}
                    </div>
                  </main>
                </div>
              </Suspense>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}