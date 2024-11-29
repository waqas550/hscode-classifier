'use client';

import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { ChevronDownIcon, ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import type { ComponentType } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/providers/AuthProvider';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { type ValidLocale } from '@/i18n/config';

interface ThemeOption {
  id: 'light' | 'dark' | 'system';
  name: string;
  icon: ComponentType<{ className?: string }>;
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [dictionary, setDictionary] = useState<any>(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as ValidLocale;

  useEffect(() => {
    setMounted(true);
    getDictionary(locale).then(setDictionary);
  }, [locale]);

  const themes: ThemeOption[] = [
    { id: 'light', name: dictionary?.common?.light || 'Light', icon: SunIcon },
    { id: 'dark', name: dictionary?.common?.dark || 'Dark', icon: MoonIcon },
    { id: 'system', name: dictionary?.common?.system || 'System', icon: ComputerDesktopIcon },
  ];

  if (!mounted || !dictionary) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <h1 className="font-semibold text-lg tracking-tight">
          {dictionary.common.title}
        </h1>
        
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none">
              <span className="hidden sm:inline-block">{dictionary.common.theme}</span>
              <ThemeIcon theme={theme || 'system'} />
              <ChevronDownIcon className="h-4 w-4 opacity-50" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md border bg-popover text-popover-foreground shadow-md">
                <div className="p-1">
                  {themes.map(({ id, name, icon: Icon }) => (
                    <Menu.Item key={id}>
                      {({ active }) => (
                        <button
                          className={`
                            flex w-full items-center space-x-2 rounded-sm px-2 py-1.5 text-sm
                            ${active ? 'bg-accent text-accent-foreground' : ''}
                            ${theme === id ? 'text-primary' : ''}
                          `}
                          onClick={() => setTheme(id)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center space-x-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none"
            >
              {dictionary.common.logout}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === 'light') return <SunIcon className="h-4 w-4" />;
  if (theme === 'dark') return <MoonIcon className="h-4 w-4" />;
  return <ComputerDesktopIcon className="h-4 w-4" />;
}