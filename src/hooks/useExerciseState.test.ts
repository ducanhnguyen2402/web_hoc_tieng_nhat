import { renderHook, act } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useExerciseState, getOptionClass, getInputClass } from './useExerciseState';
import { MultipleChoiceQuestion } from '@/types/exercise';

test('useExerciseState handles selection, correct submission, and reset', () => {
  const mockQuestion: MultipleChoiceQuestion = {
    id: '1',
    type: 'multiple_choice',
    questionText: 'Test',
    options: ['A', 'B'],
    correctAnswer: 'A',
    explanation: 'Test'
  };

  const { result } = renderHook(() => useExerciseState(mockQuestion));

  expect(result.current.selectedAnswer).toBeNull();
  expect(result.current.isSubmitted).toBe(false);
  
  // Select answer
  act(() => {
    result.current.selectAnswer('A');
  });
  
  expect(result.current.selectedAnswer).toBe('A');
  
  // Submit correct answer
  let isCorrect = false;
  act(() => {
    isCorrect = result.current.submitAnswer();
  });
  
  expect(isCorrect).toBe(true);
  expect(result.current.isSubmitted).toBe(true);
  expect(result.current.isCorrect).toBe(true);
  
  // Reset
  act(() => {
    result.current.resetState();
  });
  
  expect(result.current.selectedAnswer).toBeNull();
  expect(result.current.isSubmitted).toBe(false);
  expect(result.current.isCorrect).toBeNull();
});

test('useExerciseState handles incorrect submission', () => {
  const mockQuestion: MultipleChoiceQuestion = {
    id: '2',
    type: 'multiple_choice',
    questionText: 'Test',
    options: ['A', 'B'],
    correctAnswer: 'A',
    explanation: 'Test'
  };

  const { result } = renderHook(() => useExerciseState(mockQuestion));

  act(() => {
    result.current.selectAnswer('B');
  });
  
  let isCorrect = true;
  act(() => {
    isCorrect = result.current.submitAnswer();
  });
  
  expect(isCorrect).toBe(false);
  expect(result.current.isSubmitted).toBe(true);
  expect(result.current.isCorrect).toBe(false);
});

test('getOptionClass returns correct class based on state', () => {
  const base = "base";
  
  // Unsubmitted, unselected
  expect(getOptionClass('A', null, 'B', false, base)).toContain('bg-white');
  
  // Unsubmitted, selected
  expect(getOptionClass('A', 'A', 'B', false, base)).toContain('bg-blue-50');
  
  // Submitted, correct option (whether selected or not)
  expect(getOptionClass('A', 'B', 'A', true, base)).toContain('bg-green-50');
  
  // Submitted, incorrect selected option
  expect(getOptionClass('A', 'A', 'B', true, base)).toContain('bg-red-50');
  
  // Submitted, unselected incorrect option
  expect(getOptionClass('A', 'C', 'B', true, base)).toContain('opacity-50');
});

test('getInputClass returns correct class', () => {
  const base = "base";
  expect(getInputClass(false, null, base)).toContain('bg-white');
  expect(getInputClass(true, true, base)).toContain('bg-green-50');
  expect(getInputClass(true, false, base)).toContain('bg-red-50');
});
