"use client";

import React from 'react';
import { ListeningQuestion } from '@/types/exercise';
import { CheckCircle2, Circle, XCircle, CircleDot } from 'lucide-react';
import { PlayAudioButton } from '../PlayAudioButton';
import { getOptionClass } from '@/hooks/useExerciseState';

interface Props {
  question: ListeningQuestion;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelect: (answer: string) => void;
}

export function Listening({ question, selectedAnswer, isSubmitted, onSelect }: Props) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 jp-text">{question.questionText}</h3>
      
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full px-6 py-3 shadow-sm">
          <span className="text-blue-800 dark:text-blue-300 font-medium text-sm">Nhấn để nghe:</span>
          <PlayAudioButton text={question.audioText} className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 hover:text-white p-3 shadow-md" />
        </div>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          
          const stateClass = getOptionClass(
            option,
            selectedAnswer,
            question.correctAnswer,
            isSubmitted,
            "w-full flex items-center p-4 rounded-xl border-2 transition-all text-left focus:ring-2 focus:ring-blue-500 focus:outline-none"
          );

          let Icon = Circle;
          let iconColor = "text-gray-300 dark:text-slate-600";

          if (isSubmitted) {
            if (isCorrect) {
              Icon = CheckCircle2;
              iconColor = "text-green-500 dark:text-green-400";
            } else if (isSelected) {
              Icon = XCircle;
              iconColor = "text-red-500 dark:text-red-400";
            }
          } else if (isSelected) {
            Icon = CircleDot;
            iconColor = "text-blue-500 dark:text-blue-400";
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && onSelect(option)}
              disabled={isSubmitted}
              className={stateClass}
            >
              <Icon className={`w-6 h-6 mr-4 flex-shrink-0 ${iconColor}`} />
              <span className="font-medium text-lg flex-1 jp-text">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
