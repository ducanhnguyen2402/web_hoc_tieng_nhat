import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Lesson } from '@/types/lesson';
import { BookA, GraduationCap, ChevronRight, PenTool } from 'lucide-react';
import Link from 'next/link';
import { Ruby } from '@/components/Ruby';
import { PlayAudioButton } from '@/components/PlayAudioButton';
import { VocabularyTable } from '@/components/VocabularyTable';

async function getLessonData(lessonId: string): Promise<Lesson | null> {
  try {
    const srcPath = path.join(process.cwd(), 'src', 'data', 'lessons', `${lessonId}.json`);
    const rootPath = path.join(process.cwd(), 'data', 'lessons', `${lessonId}.json`);
    const targetPath = fs.existsSync(srcPath) ? srcPath : fs.existsSync(rootPath) ? rootPath : null;
    if (!targetPath) return null;
    const fileContents = fs.readFileSync(targetPath, 'utf8');
    return JSON.parse(fileContents) as Lesson;
  } catch (error) {
    return null;
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ level: string; lessonId: string }>
}) {
  const { level, lessonId } = await params;
  
  const lesson = await getLessonData(lessonId);
  
  if (!lesson) {
    notFound();
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-16 z-30 transition-colors duration-300 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:ring-2 focus:ring-blue-500 rounded outline-none">Khóa học</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="uppercase">{level}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[150px] sm:max-w-xs">{lesson.title}</span>
          </div>
          <Link 
            href={`/courses/${level}/${lessonId}/practice`}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Luyện tập ngay</span>
            <span className="sm:hidden">Luyện tập</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">{lesson.description}</p>

        <VocabularyTable vocabulary={lesson.vocabulary} />

        {/* Grammar Section */}
        <section>
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ngữ pháp (Grammar)</h2>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {lesson.grammar.length} cấu trúc
            </span>
          </div>

          <div className="space-y-6">
            {lesson.grammar.map((g, index) => (
              <div key={g.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold w-9 h-9 flex items-center justify-center rounded-xl shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white jp-text">{g.pattern}</h3>
                    {g.structure && (
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded inline-block mt-2">
                        Cấu trúc: {g.structure}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 mb-4 text-gray-700 dark:text-gray-300 leading-relaxed border border-gray-100 dark:border-slate-700">
                  {g.explanation}
                </div>

                {g.notes && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 mb-6 text-amber-900 dark:text-amber-200 text-sm">
                    <span className="font-bold block mb-1">💡 Lưu ý:</span>
                    {g.notes}
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase text-xs tracking-wider">Ví dụ minh họa</h4>
                  <ul className="space-y-3">
                    {g.examples.map((ex, i) => (
                      <li key={i} className="pl-4 border-l-2 border-blue-400 dark:border-blue-500 bg-gray-50/50 dark:bg-slate-900/30 py-2 pr-3 rounded-r-lg">
                        <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1 jp-text">
                          <Ruby text={ex.furigana || ex.japanese} />
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ex.vietnamese}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
