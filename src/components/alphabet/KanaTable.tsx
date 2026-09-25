'use client';

import React from 'react';
import { Kana, kanaData } from '@/data/kana';

interface Props {
  mode: 'hiragana' | 'katakana';
  onSelectKana: (kana: Kana) => void;
}

const basicRows = ['a', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
const dakutenRows = ['g', 'z', 'd', 'b', 'p'];
const yoonRows = ['ky', 'sh', 'ch', 'ny', 'hy', 'my', 'ry', 'gy', 'j', 'by', 'py'];

const getCols = (row: string) => {
  if (['ky', 'sh', 'ch', 'ny', 'hy', 'my', 'ry', 'gy', 'j', 'by', 'py'].includes(row)) return 'grid-cols-3';
  return 'grid-cols-5';
};

const getKanaInRow = (row: string, type: 'basic' | 'dakuten' | 'yoon') => {
  const items = kanaData.filter((k) => k.row === row && k.type === type);
  if (row === 'y') {
    return [items.find(i => i.id === 'ya'), null, items.find(i => i.id === 'yu'), null, items.find(i => i.id === 'yo')];
  }
  if (row === 'w') {
    return [items.find(i => i.id === 'wa'), null, null, null, items.find(i => i.id === 'wo'), items.find(i => i.id === 'n')];
  }
  return items;
};

export function KanaTable({ mode, onSelectKana }: Props) {
  const renderGrid = (rows: string[], type: 'basic' | 'dakuten' | 'yoon', title: string) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-400">{title}</h3>
      <div className="flex flex-col gap-2">
        {rows.map((row) => {
          const colsClass = getCols(row);
          const items = getKanaInRow(row, type);
          return (
            <div key={row} className={`grid ${colsClass} gap-2`}>
              {items.map((kana, idx) => {
                if (!kana) {
                  return <div key={`${row}-empty-${idx}`} className="h-16 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100/50 dark:border-slate-800" />;
                }
                const char = mode === 'hiragana' ? kana.hiragana : kana.katakana;
                return (
                  <button
                    key={kana.id}
                    onClick={() => onSelectKana(kana)}
                    className="flex flex-col items-center justify-center h-16 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all active:scale-95 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <span className="text-2xl font-medium text-gray-800 dark:text-white jp-text">{char}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{kana.romaji}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-lg mx-auto">
      {renderGrid(basicRows, 'basic', 'Âm cơ bản')}
      {renderGrid(dakutenRows, 'dakuten', 'Âm đục (Dakuten / Handakuten)')}
      {renderGrid(yoonRows, 'yoon', 'Âm ghép (Yoon)')}
    </div>
  );
}
