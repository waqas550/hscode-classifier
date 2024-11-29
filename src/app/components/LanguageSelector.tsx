'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, CheckIcon } from '@heroicons/react/20/solid';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { locales, type ValidLocale } from '@/i18n/config';

interface Language {
  code: ValidLocale;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { 
    code: 'en', 
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  },
  { 
    code: 'de', 
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  },
  { 
    code: 'sr', 
    name: 'Serbian',
    nativeName: 'Српски',
    flag: '🇷🇸'
  },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] as ValidLocale;

  const handleLanguageChange = useCallback((locale: ValidLocale) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPathname);
  }, [pathname, currentLocale, router]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none">
        <GlobeAltIcon className="h-4 w-4" />
        <span className="hidden sm:inline-block">
          {languages.find(lang => lang.code === currentLocale)?.nativeName}
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    className={`
                      flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm
                      ${active ? 'bg-accent text-accent-foreground' : ''}
                    `}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{language.flag}</span>
                      <span>{language.nativeName}</span>
                    </span>
                    {currentLocale === language.code && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}