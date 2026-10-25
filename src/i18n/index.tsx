import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { fa } from './fa';
import { ar } from './ar';
import { tr } from './tr';
import { en } from './en';
import type { Direction, Language, Translation } from './types';

export const languageOptions: { code: Language; native: string }[] = [
  { code: 'fa', native: 'فارسی' },
  { code: 'ar', native: 'العربية' },
  { code: 'tr', native: 'Türkçe' },
  { code: 'en', native: 'English' },
];

const translations: Record<Language, Translation> = { fa, ar, tr, en };
const locales: Record<Language, string> = { fa: 'fa-IR', ar: 'ar-EG', tr: 'tr-TR', en: 'en-US' };
const supportedLanguages = languageOptions.map((item) => item.code);

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: Direction;
  copy: Translation;
  arrowIcon: string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('afshin-language') as Language | null;
    if (saved && supportedLanguages.includes(saved)) return saved;
  } catch {
    // Storage can be disabled; browser language remains a safe fallback.
  }
  const browserLanguage = navigator.language.toLowerCase().split('-')[0] as Language;
  return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'fa';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const direction: Direction = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr';
  const copy = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.language = language;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.meta.description);
    try {
      localStorage.setItem('afshin-language', language);
    } catch {
      // Language selection still works when storage is unavailable.
    }
  }, [language, direction, copy]);

  const formatNumber = useCallback(
    (value: number, options?: Intl.NumberFormatOptions) => new Intl.NumberFormat(locales[language], options).format(value),
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      direction,
      copy,
      arrowIcon: direction === 'rtl' ? 'ri-arrow-left-line' : 'ri-arrow-right-line',
      formatNumber,
    }),
    [language, direction, copy, formatNumber]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

export type { JournalArticle, GalleryProject, Translation } from './types';
