import { useState, useCallback } from 'react';
import { Question } from '@/types/exercise';

export function useExerciseState(question: Question) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const selectAnswer = useCallback((answer: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(answer);
  }, [isSubmitted]);

  const submitAnswer = useCallback((): boolean => {
    if (!selectedAnswer) return false;
    
    let correct = false;
    if (question.type === 'multiple_choice' || question.type === 'fill_in_blank' || question.type === 'listening') {
      correct = selectedAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    } else if (question.type === 'ordering') {
      correct = selectedAnswer === question.correctOrder.join(',');
    }

    setIsCorrect(correct);
    setIsSubmitted(true);
    return correct;
  }, [selectedAnswer, question]);

  const resetState = useCallback(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, []);

  return {
    selectedAnswer,
    isSubmitted,
    isCorrect,
    selectAnswer,
    submitAnswer,
    resetState
  };
}

export function getOptionClass(
  option: string, 
  selectedAnswer: string | null, 
  correctAnswer: string, 
  isSubmitted: boolean,
  baseClass: string = ""
): string {
  const isSelected = option === selectedAnswer;
  const isCorrectOption = option === correctAnswer;
  
  if (isSubmitted) {
    if (isCorrectOption) {
      return `${baseClass} bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400`.trim();
    }
    if (isSelected) {
      return `${baseClass} bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400`.trim();
    }
    return `${baseClass} bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-500 opacity-50`.trim();
  }
  
  if (isSelected) {
    return `${baseClass} bg-blue-50 dark:bg-blue-900/40 border-blue-500 text-blue-700 dark:text-blue-300`.trim();
  }
  
  return `${baseClass} bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-750`.trim();
}

export function getInputClass(isSubmitted: boolean, isCorrect: boolean | null, baseClass: string = ""): string {
  if (isSubmitted) {
    if (isCorrect) {
      return `${baseClass} bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300`.trim();
    }
    return `${baseClass} bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300`.trim();
  }
  return `${baseClass} bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 focus:border-blue-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`.trim();
}
