import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { ExerciseSet } from '@/types/exercise';
import { ExerciseRunner } from '@/components/exercise/ExerciseRunner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

async function getExerciseData(lessonId: string): Promise<ExerciseSet | null> {
  try {
    // 1. Check dedicated exercise files
    const srcExPath = path.join(process.cwd(), 'src', 'data', 'exercises', `${lessonId}.json`);
    const rootExPath = path.join(process.cwd(), 'data', 'exercises', `${lessonId}.json`);
    const exTarget = fs.existsSync(srcExPath) ? srcExPath : fs.existsSync(rootExPath) ? rootExPath : null;

    if (exTarget) {
      const fileContents = fs.readFileSync(exTarget, 'utf8');
      return JSON.parse(fileContents) as ExerciseSet;
    }

    // 2. Fallback: check if lesson JSON itself contains exercises
    const srcLessonPath = path.join(process.cwd(), 'src', 'data', 'lessons', `${lessonId}.json`);
    const rootLessonPath = path.join(process.cwd(), 'data', 'lessons', `${lessonId}.json`);
    const lessonTarget = fs.existsSync(srcLessonPath) ? srcLessonPath : fs.existsSync(rootLessonPath) ? rootLessonPath : null;

    if (lessonTarget) {
      const fileContents = fs.readFileSync(lessonTarget, 'utf8');
      const lessonData = JSON.parse(fileContents);
      if (lessonData.exercises && Array.isArray(lessonData.exercises)) {
        return {
          lessonId,
          questions: lessonData.exercises,
        };
      }
    }

    return null;
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
  const exerciseSet = await getExerciseData(lessonId);
  
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
