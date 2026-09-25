'use client';

import React, { useState, useEffect } from 'react';
import { OrderingQuestion } from '@/types/exercise';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  question: OrderingQuestion;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelect: (answer: string) => void;
}

export function Ordering({ question, selectedAnswer, isSubmitted, onSelect }: Props) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedAnswer) {
      setSelectedIndices([]);
    }
  }, [selectedAnswer]);
  const isCorrect = isSubmitted && selectedAnswer === question.correctOrder.join(',');

  const handleWordClick = (index: number) => {
    if (isSubmitted) return;
    const newIndices = [...selectedIndices, index];
    setSelectedIndices(newIndices);
    onSelect(newIndices.map(i => question.words[i]).join(','));
  };

  const handleRemoveWord = (indexInArray: number) => {
    if (isSubmitted) return;
    const newIndices = [...selectedIndices];
    newIndices.splice(indexInArray, 1);
    setSelectedIndices(newIndices);
    onSelect(newIndices.map(i => question.words[i]).join(','));
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 jp-text">{question.questionText}</h3>
      
      {/* Target Area */}
      <div className={`min-h-[80px] p-4 rounded-xl border-2 mb-6 flex flex-wrap gap-2 transition-colors ${
        isSubmitted
          ? isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          : 'bg-gray-50 dark:bg-slate-900/50 border-dashed border-gray-300 dark:border-slate-600'
      }`}>
        {selectedIndices.map((wordIndex, idx) => (
          <button
            key={`selected-${idx}`}
            onClick={() => handleRemoveWord(idx)}
            disabled={isSubmitted}
            className="px-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm rounded-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none jp-text"
          >
            {question.words[wordIndex]}
          </button>
        ))}
        {isSubmitted && (
          <div className="ml-auto flex items-center">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
        )}
      </div>

      {/* Available Words */}
      <div className="flex flex-wrap gap-3">
        {question.words.map((word, idx) => {
          if (selectedIndices.includes(idx)) return null;
          
          return (
            <button
              key={`avail-${idx}`}
              onClick={() => handleWordClick(idx)}
              disabled={isSubmitted}
              className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-lg font-medium text-gray-800 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-750 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:outline-none jp-text"
            >
              {word}
            </button>
          );
        })}
      </div>

      {isSubmitted && !isCorrect && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-xl">
          <p className="text-green-800 dark:text-green-300 font-medium mb-2">Đáp án đúng:</p>
          <div className="flex flex-wrap gap-2">
            {question.correctOrder.map((word, idx) => (
              <span key={`correct-${idx}`} className="px-4 py-2 bg-white dark:bg-slate-800 border border-green-200 dark:border-green-800 shadow-sm rounded-lg font-medium text-green-800 dark:text-green-400 jp-text">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
