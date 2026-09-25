import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { MultipleChoice } from './MultipleChoice';
import { MultipleChoiceQuestion } from '@/types/exercise';

test('MultipleChoice renders options and handles selection', () => {
  const question: MultipleChoiceQuestion = {
    id: 'q1',
    type: 'multiple_choice',
    questionText: 'Chọn từ đúng',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    explanation: 'A là đúng'
  };
  
  const handleSelect = vi.fn();

  render(
    <MultipleChoice 
      question={question}
      selectedAnswer={null}
      isSubmitted={false}
      onSelect={handleSelect}
    />
  );

  expect(screen.getByText('Chọn từ đúng')).toBeTruthy();
  expect(screen.getByText('A')).toBeTruthy();
  
  fireEvent.click(screen.getByText('B'));
  expect(handleSelect).toHaveBeenCalledWith('B');
});
