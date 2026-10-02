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
  image?: string;
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

export interface KanjiWord {
  word: string;
  reading: string;
  meaning: string;
}

export interface Kanji {
  id: string;
  character: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  words: KanjiWord[];
}

export interface Lesson {
  id: string;
  level: string;
  lessonNumber?: number;
  title: string;
  description: string;
  vocabulary: Vocabulary[];
  kanji?: Kanji[];
  grammar: Grammar[];
  exercises?: Question[];
}
