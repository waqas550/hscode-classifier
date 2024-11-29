'use client';

import { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n/get-dictionary';
import { type ValidLocale } from '@/i18n/config';
import {HSCodeResponse} from '../../types/hsCode'

const HSCodeForm = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<HSCodeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dictionary, setDictionary] = useState<any>(null);
  
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as ValidLocale;

  useEffect(() => {
    getDictionary(locale).then(setDictionary);
  }, [locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://trader-5n0t.onrender.com/api/v1/hs-code/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://waqas550.github.io',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          product_description: query,
          language: locale
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Classification failed');
      }

      setResult(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!dictionary) {
    return null;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="query" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {dictionary.hsCode.input}
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={dictionary.hsCode.description}
            required
          />
          <p className="text-sm text-muted-foreground">
            {dictionary.hsCode.description}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
              {dictionary.home.processing}
            </>
          ) : (
            dictionary.hsCode.submit
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-center space-x-2 text-sm text-destructive">
            {error}
          </div>
        </div>
      )}

      {result && !error && (
        <div className="rounded-lg border bg-card text-card-foreground">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">
              {dictionary.hsCode.result}
            </h2>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">{dictionary.hsCode.interpretedDescription}</h3>
              <p className="text-sm text-muted-foreground">{result.interpreted_description}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{dictionary.hsCode.hsCodeLabel}</h3>
              <p className="text-sm font-mono">{result.hs_code}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{dictionary.hsCode.explanation}</h3>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HSCodeForm;
