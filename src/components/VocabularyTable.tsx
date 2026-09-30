'use client';

import React, { useState } from 'react';
import { PlayAudioButton } from '@/components/PlayAudioButton';
import { AddFlashcardButton } from '@/components/AddFlashcardButton';
import { Vocabulary } from '@/types/lesson';
import { BookA } from 'lucide-react';
import { KanjiStrokeViewer } from '@/components/KanjiStrokeViewer';
import { VocabularyImage } from '@/components/VocabularyImage';
import { Ruby } from '@/components/Ruby';

interface Props {
  vocabulary: Vocabulary[];
}

export function VocabularyTable({ vocabulary }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(vocabulary.map(v => v.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedIds(newSet);
  };

  const selectedVocab = vocabulary.filter(v => selectedIds.has(v.id));

  return (
    <section className="mb-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BookA className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Từ vựng (Vocabulary)</h2>
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {vocabulary.length} từ
          </span>
        </div>
        
        {selectedVocab.length > 0 ? (
          <AddFlashcardButton vocabList={selectedVocab} />
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">Chọn từ để thêm vào Flashcard</div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-100 dark:border-slate-700 text-gray-500 dark:text-gray-400 font-medium text-sm">
                <th className="py-4 px-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={selectedIds.size === vocabulary.length && vocabulary.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-4 px-6 min-w-[140px]">Từ vựng</th>
                <th className="py-4 px-6 min-w-[140px]">Cách đọc</th>
                <th className="py-4 px-6 min-w-[280px]">Ý nghĩa & Ví dụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {vocabulary.map((v) => (
                <tr 
                  key={v.id} 
                  className={`transition-colors ${selectedIds.has(v.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : 'hover:bg-blue-50/50 dark:hover:bg-slate-750'}`}
                  onClick={() => handleSelectOne(v.id, !selectedIds.has(v.id))}
                >
                  <td className="py-4 px-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-2"
                      checked={selectedIds.has(v.id)}
                      onChange={(e) => handleSelectOne(v.id, e.target.checked)}
                    />
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex flex-col gap-2 items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-gray-900 dark:text-white jp-text">{v.word}</span>
                        <PlayAudioButton text={v.word} />
                      </div>
                      
                      {v.kanji && v.kanji !== v.word && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">Hán tự: <span className="jp-text">{v.kanji}</span></span>
                        </div>
                      )}

                      {v.kanji && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {v.kanji.split('').filter(c => /[\u4e00-\u9faf]/.test(c)).map((char, i) => (
                            <KanjiStrokeViewer key={i} character={char} width={45} height={45} />
                          ))}
                        </div>
                      )}

                      {v.partOfSpeech && (
                        <span className="inline-block bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded font-medium mt-1">
                          {v.partOfSpeech}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="text-gray-800 dark:text-gray-200 font-medium jp-text">
                      {v.hiragana || v.reading}
                    </div>
                    {v.hiragana && v.reading && v.reading !== v.hiragana && (
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{v.reading}</div>
                    )}
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex gap-4 items-start">
                      {v.image && (
                        <VocabularyImage 
                          src={v.image} 
                          alt={v.word} 
                          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm shrink-0 hover:scale-105 transition-transform duration-300" 
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 dark:text-gray-100 font-semibold mb-2">{v.meaning}</div>
                        {v.example && (
                          <div className="mt-2 text-xs bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                            <div className="text-gray-900 dark:text-gray-200 font-medium text-sm mb-1.5 flex items-start gap-1 jp-text">
                              <div className="flex-1"><Ruby text={v.example.furigana || v.example.sentence} /></div>
                              <PlayAudioButton text={v.example.sentence} className="mt-[-4px]" />
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.example.translation}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
