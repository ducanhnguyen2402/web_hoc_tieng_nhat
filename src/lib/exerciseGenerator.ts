import { Lesson } from '@/types/lesson';
import { Question, ExerciseSet } from '@/types/exercise';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

export function generateDynamicQuestions(lesson: Lesson): Question[] {
  const questions: Question[] = [];
  const vocab = lesson.vocabulary || [];

  if (vocab.length < 4) return questions;

  vocab.forEach((v) => {
    // Pick 3 other random words for distractors
    const otherVocab = shuffle(vocab.filter(x => x.id !== v.id)).slice(0, 3);
    
    // Type 1: Nghĩa của từ [word] là gì?
    const options1 = shuffle([v.meaning, ...otherVocab.map(x => x.meaning)]);
    questions.push({
      id: `dyn_mean_${v.id}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple_choice',
      questionText: `Nghĩa của từ "${v.word}" là gì?`,
      options: options1,
      correctAnswer: v.meaning,
      explanation: `Từ "${v.word}" (${v.reading || v.hiragana}) có nghĩa là "${v.meaning}".`
    });

    // Type 2: Từ nào có nghĩa là [meaning]?
    const options2 = shuffle([v.word, ...otherVocab.map(x => x.word)]);
    questions.push({
      id: `dyn_word_${v.id}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiple_choice',
      questionText: `Từ nào có nghĩa là "${v.meaning}"?`,
      options: options2,
      correctAnswer: v.word,
      explanation: `Từ "${v.word}" (${v.reading || v.hiragana}) có nghĩa là "${v.meaning}".`
    });

    // Type 3: Listening
    const options3 = shuffle([v.meaning, ...otherVocab.map(x => x.meaning)]);
    questions.push({
      id: `dyn_listen_${v.id}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'listening',
      questionText: `Nghe và chọn nghĩa đúng của từ:`,
      audioText: v.word,
      options: options3,
      correctAnswer: v.meaning,
      explanation: `Từ bạn vừa nghe là "${v.word}" (${v.reading || v.hiragana}), có nghĩa là "${v.meaning}".`
    });
  });

  return questions;
}

export function buildRandomizedExerciseSet(
  lessonId: string, 
  staticQuestions: Question[], 
  lessonData: Lesson | null,
  totalQuestions: number = 10
): ExerciseSet {
  let pool = [...staticQuestions];
  
  if (lessonData) {
    const dynamicQ = generateDynamicQuestions(lessonData);
    pool = [...pool, ...dynamicQ];
  }

  // Shuffle and pick requested number of questions
  const selectedQuestions = getRandomItems(pool, Math.min(totalQuestions, pool.length));

  // Shuffle options inside selected questions
  const finalizedQuestions = selectedQuestions.map(q => {
    if (q.type === 'multiple_choice' || q.type === 'listening') {
      return {
        ...q,
        options: shuffle(q.options)
      };
    }
    return q;
  });

  return {
    lessonId,
    questions: finalizedQuestions
  };
}
