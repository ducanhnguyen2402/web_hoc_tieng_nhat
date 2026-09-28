import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { ExerciseSet, Question } from '@/types/exercise';
import { Lesson } from '@/types/lesson';
import { ExerciseRunner } from '@/components/exercise/ExerciseRunner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { buildRandomizedExerciseSet } from '@/lib/exerciseGenerator';

export const dynamic = 'force-dynamic';

async function getLessonData(lessonId: string): Promise<Lesson | null> {
  try {
    const srcLessonPath = path.join(process.cwd(), 'src', 'data', 'lessons', `${lessonId}.json`);
    const rootLessonPath = path.join(process.cwd(), 'data', 'lessons', `${lessonId}.json`);
    const lessonTarget = fs.existsSync(srcLessonPath) ? srcLessonPath : fs.existsSync(rootLessonPath) ? rootLessonPath : null;
    if (!lessonTarget) return null;
    return JSON.parse(fs.readFileSync(lessonTarget, 'utf8')) as Lesson;
  } catch {
    return null;
  }
}

async function getExerciseData(lessonId: string, lessonData: Lesson | null): Promise<ExerciseSet | null> {
  try {
    let staticQuestions: Question[] = [];

    // 1. Check dedicated exercise files
    const srcExPath = path.join(process.cwd(), 'src', 'data', 'exercises', `${lessonId}.json`);
    const rootExPath = path.join(process.cwd(), 'data', 'exercises', `${lessonId}.json`);
    const exTarget = fs.existsSync(srcExPath) ? srcExPath : fs.existsSync(rootExPath) ? rootExPath : null;

    if (exTarget) {
      const fileContents = fs.readFileSync(exTarget, 'utf8');
      const exSet = JSON.parse(fileContents) as ExerciseSet;
      staticQuestions = exSet.questions || [];
    } else if (lessonData && lessonData.exercises) {
      // 2. Fallback: check if lesson JSON itself contains exercises
      staticQuestions = lessonData.exercises;
    }

    if (staticQuestions.length === 0 && (!lessonData || !lessonData.vocabulary || lessonData.vocabulary.length === 0)) {
      return null; // No static questions and no vocabulary to generate dynamic questions
    }

    // Combine static and dynamic questions, randomize and pick 15
    return buildRandomizedExerciseSet(lessonId, staticQuestions, lessonData, 15);
  } catch (error) {
    return null;
  }
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ level: string; lessonId: string }>
}) {
  const { level, lessonId } = await params;
  const lessonData = await getLessonData(lessonId);
  const exerciseSet = await getExerciseData(lessonId, lessonData);
  
  if (!exerciseSet) {
    notFound();
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-16 z-30 mb-8 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 rounded outline-none">Khóa học</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/courses/${level}/${lessonId}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase focus:ring-2 focus:ring-blue-500 rounded outline-none">{level}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Luyện tập</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <ExerciseRunner exerciseSet={exerciseSet} />
      </div>
    </div>
  );
}
