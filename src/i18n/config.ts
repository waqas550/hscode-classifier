export const defaultLocale = 'en';
export const locales = ['en', 'de', 'sr'] as const;

export type ValidLocale = (typeof locales)[number];

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  sr: 'Српски',
};

export function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale);
}