import React from 'react';
import { Kanji } from '@/types/lesson';
import { Type } from 'lucide-react';

export function KanjiSection({ kanjiList }: { kanjiList?: Kanji[] }) {
  if (!kanjiList || kanjiList.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Type className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Chữ Hán (Kanji)</h2>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {kanjiList.length} chữ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kanjiList.map((k) => (
          <div key={k.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 flex gap-4">
            <div className="flex flex-col items-center justify-start">
              <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-4xl font-black text-indigo-700 dark:text-indigo-400 jp-text">
                {k.character}
              </div>
              <div className="mt-2 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-center">
                {k.meaning}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              {(k.onyomi || k.kunyomi) && (
                <div className="mb-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  {k.onyomi && <p>Onyomi: <span className="text-gray-800 dark:text-gray-200 jp-text">{k.onyomi}</span></p>}
                  {k.kunyomi && <p>Kunyomi: <span className="text-gray-800 dark:text-gray-200 jp-text">{k.kunyomi}</span></p>}
                </div>
              )}
              <div className="space-y-2">
                {k.words.map((w, i) => (
                  <div key={i} className="text-sm flex flex-col border-b border-gray-100 dark:border-slate-700 pb-1 last:border-0 last:pb-0">
                    <span className="font-medium text-gray-800 dark:text-gray-200 jp-text text-base">
                      {w.word} <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">({w.reading})</span>
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{w.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
