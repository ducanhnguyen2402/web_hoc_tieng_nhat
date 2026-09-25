'use client';

import React from 'react';
import { FillInBlankQuestion } from '@/types/exercise';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getInputClass } from '@/hooks/useExerciseState';

interface Props {
  question: FillInBlankQuestion;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelect: (answer: string) => void;
}

export function FillInBlank({ question, selectedAnswer, isSubmitted, onSelect }: Props) {
  const isCorrect = isSubmitted && selectedAnswer?.trim().toLowerCase() === question.correctAnswer.toLowerCase();
  
  const inputClass = getInputClass(
    isSubmitted, 
    isCorrect, 
    "w-full p-4 pr-12 text-lg border-2 rounded-xl outline-none transition-colors jp-text"
  );

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 jp-text">{question.questionText}</h3>
      <div className="relative">
        <input
          type="text"
          disabled={isSubmitted}
          value={selectedAnswer || ''}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Nhập câu trả lời..."
          className={inputClass}
        />
        {isSubmitted && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
        )}
      </div>
      
      {isSubmitted && !isCorrect && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-xl">
          <p className="text-green-800 dark:text-green-300 font-medium">Đáp án đúng: <span className="font-bold jp-text">{question.correctAnswer}</span></p>
        </div>
      )}
    </div>
  );
}
