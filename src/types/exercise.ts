export type QuestionType = 'multiple_choice' | 'fill_in_blank' | 'ordering' | 'listening';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  questionText: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correctAnswer: string;
}

export interface ListeningQuestion extends BaseQuestion {
  type: 'listening';
  audioText: string;
  options: string[];
  correctAnswer: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill_in_blank';
  correctAnswer: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  words: string[];
  correctOrder: string[];
}

export type Question = MultipleChoiceQuestion | FillInBlankQuestion | OrderingQuestion | ListeningQuestion;

export interface ExerciseSet {
  lessonId: string;
  questions: Question[];
}
