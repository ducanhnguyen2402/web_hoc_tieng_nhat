'use client';

import React, { useState, useEffect } from 'react';
import { kanaData } from '@/data/kana';
import { RefreshCcw } from 'lucide-react';

interface Props {
  mode: 'hiragana' | 'katakana';
}

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function KanaQuiz({ mode }: Props) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startQuiz = () => {
    // Generate 10 random questions
    const shuffledData = shuffle(kanaData);
    const selectedKana = shuffledData.slice(0, 10);
    
    const generatedQuestions = selectedKana.map(correctKana => {
      const others = shuffle(kanaData.filter(k => k.id !== correctKana.id)).slice(0, 3);
      const options = shuffle([correctKana, ...others]);
      return {
        correct: correctKana,
        options,
      };
    });
    
    setQuestions(generatedQuestions);
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    startQuiz();
  }, [mode]);

  const handleAnswer = (ans: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(ans);
    
    const isCorrect = ans === questions[currentIdx].correct.romaji;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  if (questions.length === 0) return null;

  if (isFinished) {
    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 text-center animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Kết quả</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Bạn đã hoàn thành bài luyện tập!</p>
        <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          {score} / 10
        </div>
        <button 
          onClick={startQuiz}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <RefreshCcw className="w-5 h-5" />
          Làm lại
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const char = mode === 'hiragana' ? currentQ.correct.hiragana : currentQ.correct.katakana;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <span>Câu hỏi {currentIdx + 1}/10</span>
        <span>Điểm: {score}</span>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 mb-6 flex flex-col items-center transition-colors duration-300">
        <span className="text-8xl font-medium text-gray-800 dark:text-white my-8 jp-text">{char}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((opt: any) => {
          let btnClass = "py-4 text-xl font-medium rounded-2xl border-2 transition-all active:scale-95 focus:ring-2 focus:ring-blue-500 focus:outline-none ";
          if (selectedAnswer) {
            if (opt.romaji === currentQ.correct.romaji) {
              btnClass += "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400"; // correct answer
            } else if (opt.romaji === selectedAnswer) {
              btnClass += "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400"; // wrong selected
            } else {
              btnClass += "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-400 dark:text-gray-600"; // others
            }
          } else {
            btnClass += "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-750";
          }

          return (
            <button
              key={opt.id}
              disabled={!!selectedAnswer}
              onClick={() => handleAnswer(opt.romaji)}
              className={btnClass}
            >
              {opt.romaji}
            </button>
          );
        })}
      </div>
    </div>
  );
}
