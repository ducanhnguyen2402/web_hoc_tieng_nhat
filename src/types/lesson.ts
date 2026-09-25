import { Question } from './exercise';

export interface VocabularyExample {
  sentence: string;
  furigana?: string;
  translation: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  kanji?: string | null;
  hiragana?: string;
  reading: string;
  meaning: string;
  partOfSpeech?: string;
  example?: VocabularyExample;
}

export interface Example {
  japanese: string;
  furigana?: string;
  vietnamese: string;
}

export interface Grammar {
  id: string;
  pattern: string;
  structure?: string;
  explanation: string;
  usage?: string;
  notes?: string;
  examples: Example[];
}

export interface Lesson {
  id: string;
  level: string;
  lessonNumber?: number;
  title: string;
  description: string;
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  exercises?: Question[];
}
