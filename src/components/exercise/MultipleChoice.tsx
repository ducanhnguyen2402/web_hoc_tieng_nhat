'use client';

import React from 'react';
import { MultipleChoiceQuestion } from '@/types/exercise';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getOptionClass } from '@/hooks/useExerciseState';

interface Props {
  question: MultipleChoiceQuestion;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelect: (answer: string) => void;
}

export function MultipleChoice({ question, selectedAnswer, isSubmitted, onSelect }: Props) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 jp-text">{question.questionText}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, idx) => {
          const btnClass = getOptionClass(
            option, 
            selectedAnswer, 
            question.correctAnswer, 
            isSubmitted, 
            "p-4 text-left border-2 rounded-xl font-medium transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none jp-text"
          );

          const isSelected = option === selectedAnswer;
          const isCorrect = option === question.correctAnswer;

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => onSelect(option)}
              className={btnClass}
            >
              <div className="flex justify-between items-center">
                <span>{option}</span>
                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
