'use client';

import React from 'react';
import { Kana } from '@/data/kana';
import { X, Volume2 } from 'lucide-react';
import { PlayAudioButton } from '@/components/PlayAudioButton';

interface Props {
  kana: Kana | null;
  mode: 'hiragana' | 'katakana';
  onClose: () => void;
}

export function KanaModal({ kana, mode, onClose }: Props) {
  if (!kana) return null;

  const char = mode === 'hiragana' ? kana.hiragana : kana.katakana;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8 flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
            <span className="text-7xl font-medium text-blue-600 dark:text-blue-400 jp-text">{char}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{kana.romaji}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest text-sm">Romaji</p>
          
          <div className="w-full bg-gray-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">Ví dụ:</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-medium text-gray-800 dark:text-gray-200 jp-text">{kana.example.word}</span>
              <PlayAudioButton text={kana.example.word} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 jp-text">{kana.example.reading}</p>
            <p className="text-base text-gray-700 dark:text-gray-300 mt-2 font-medium">{kana.example.meaning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
