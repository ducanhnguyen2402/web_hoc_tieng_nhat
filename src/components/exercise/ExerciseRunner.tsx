'use client';

import React, { useState, useEffect } from 'react';
import { ExerciseSet, Question } from '@/types/exercise';
import { MultipleChoice } from './MultipleChoice';
import { FillInBlank } from './FillInBlank';
import { Ordering } from './Ordering';
import { Listening } from './Listening';
import { ArrowRight, RefreshCcw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useExerciseState } from '@/hooks/useExerciseState';
import { recordDailyStudy } from '@/lib/streakService';
import { saveLessonProgress } from '@/lib/progressService';
import { toast } from 'sonner';

interface Props {
  exerciseSet: ExerciseSet;
}

export function ExerciseRunner({ exerciseSet }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const questions = exerciseSet.questions;
  const q = questions[currentIdx];

  const {
    selectedAnswer,
    isSubmitted,
    selectAnswer,
    submitAnswer,
    resetState
  } = useExerciseState(q);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const isCorrect = submitAnswer();

    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setWrongQuestions(prev => [...prev, q]);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1);
      resetState();
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    resetState();
    setScore(0);
    setWrongQuestions([]);
    setIsFinished(false);
  };

  useEffect(() => {
    if (isFinished) {
      saveLessonProgress(exerciseSet.lessonId, score);
      
      recordDailyStudy().then(res => {
        if (res.isNewStreak) {
          toast.success('🎉 Bạn đã thắp sáng chuỗi ngày học hôm nay (+1 Streak)!');
          window.dispatchEvent(new Event('streak_updated'));
        }
      });
    }
  }, [isFinished, exerciseSet.lessonId, score]);

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 animate-in fade-in duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Kết quả luyện tập</h2>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-6">
            {score} <span className="text-3xl text-gray-400 dark:text-gray-500">/ {questions.length}</span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {score === questions.length ? 'Tuyệt vời! Bạn đã trả lời đúng tất cả.' : 'Hãy cố gắng hơn trong lần sau nhé!'}
          </p>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <AlertCircle className="text-orange-500 dark:text-orange-400 w-6 h-6" />
              Câu hỏi cần ôn lại:
            </h3>
            <div className="space-y-4">
              {wrongQuestions.map((wq, i) => (
                <div key={i} className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                  <p className="font-medium text-gray-800 dark:text-gray-200 mb-2 jp-text">{wq.questionText}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{wq.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button 
            onClick={resetQuiz}
            className="flex-1 py-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            <RefreshCcw className="w-5 h-5" />
            Làm lại
          </button>
          <Link 
            href={`/courses`}
            className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Danh sách bài học
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Câu hỏi {currentIdx + 1} / {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 w-8 rounded-full transition-colors ${i === currentIdx ? 'bg-blue-600 dark:bg-blue-500' : i < currentIdx ? 'bg-blue-200 dark:bg-blue-900' : 'bg-gray-200 dark:bg-slate-700'}`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8 mb-6 transition-colors">

        {q.type === 'multiple_choice' && (
          <MultipleChoice question={q} selectedAnswer={selectedAnswer} isSubmitted={isSubmitted} onSelect={selectAnswer} />
        )}
        {q.type === 'listening' && (
          <Listening question={q} selectedAnswer={selectedAnswer} isSubmitted={isSubmitted} onSelect={selectAnswer} />
        )}
        {q.type === 'fill_in_blank' && (
          <FillInBlank question={q} selectedAnswer={selectedAnswer} isSubmitted={isSubmitted} onSelect={selectAnswer} />
        )}
        {q.type === 'ordering' && (
          <Ordering question={q} selectedAnswer={selectedAnswer} isSubmitted={isSubmitted} onSelect={selectAnswer} />
        )}

        {isSubmitted && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl animate-in slide-in-from-top-4 duration-300">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Giải thích:</h4>
            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || selectedAnswer.length === 0}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Kiểm tra
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gray-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Tiếp theo <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
