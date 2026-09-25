'use client';

import React, { useState } from 'react';
import { KanaTable } from '@/components/alphabet/KanaTable';
import { KanaModal } from '@/components/alphabet/KanaModal';
import { KanaQuiz } from '@/components/alphabet/KanaQuiz';
import { Kana } from '@/data/kana';
import { BookOpen, Gamepad2 } from 'lucide-react';

export default function AlphabetPage() {
  const [tab, setTab] = useState<'learn' | 'practice'>('learn');
  const [mode, setMode] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<Kana | null>(null);

  return (
    <div className="flex-1 bg-gray-50/50 dark:bg-slate-900 pb-20 transition-colors duration-300">
      {/* Header Tabs */}
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-16 z-40 transition-colors duration-300 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setTab('learn')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                tab === 'learn' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Học
            </button>
            <button
              onClick={() => setTab('practice')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                tab === 'practice' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
              Luyện tập
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
        {/* Toggle Mode */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 dark:bg-slate-800 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setMode('hiragana')}
              className={`px-6 py-2 rounded-lg font-medium transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                mode === 'hiragana' ? 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Hiragana
            </button>
            <button
              onClick={() => setMode('katakana')}
              className={`px-6 py-2 rounded-lg font-medium transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                mode === 'katakana' ? 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Katakana
            </button>
          </div>
        </div>

        {/* Content */}
        {tab === 'learn' ? (
          <KanaTable mode={mode} onSelectKana={setSelectedKana} />
        ) : (
          <KanaQuiz mode={mode} />
        )}
      </div>

      {/* Modal */}
      <KanaModal kana={selectedKana} mode={mode} onClose={() => setSelectedKana(null)} />
    </div>
  );
}
