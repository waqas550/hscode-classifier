import type { ValidLocale } from './config';
import type { Dictionary } from '@/types/i18n';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  de: () => import('./dictionaries/de.json').then(module => module.default),
  sr: () => import('./dictionaries/sr.json').then(module => module.default),
} as const;

export const getDictionary = async (locale: ValidLocale): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    return await dictionaries.en();
  }
};