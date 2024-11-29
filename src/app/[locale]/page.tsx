'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/i18n/get-dictionary';
import { type ValidLocale } from '@/i18n/config';
import { usePathname } from 'next/navigation';
import HSCodeForm from '@/app/components/HSCodeForm';

export default function HomePage() {
  const [dictionary, setDictionary] = useState<any>(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as ValidLocale;

  useEffect(() => {
    getDictionary(locale).then(setDictionary);
  }, [locale]);

  if (!dictionary) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {dictionary.home.title}
        </h1>
        <p className="text-muted-foreground">
          {dictionary.home.description}
        </p>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {dictionary.hsCode.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {dictionary.hsCode.description}
          </p>
        </div>
        <div className="p-6 pt-0">
          <HSCodeForm />
        </div>
      </div>
    </div>
  );
}