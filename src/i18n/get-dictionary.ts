import type { Dictionary } from '@/types/dictionary';
import type { ValidLocale } from './config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  de: () => import('./dictionaries/de.json').then(module => module.default),
  sr: () => import('./dictionaries/sr.json').then(module => module.default),
};

export const getDictionary = async (locale: ValidLocale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }

  try {
    return dictionaries[locale]();
  } catch {
    return dictionaries.en();
  }
};