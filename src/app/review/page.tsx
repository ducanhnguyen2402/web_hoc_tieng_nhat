'use client';

import React, { useState, useEffect } from 'react';
import { Flashcard } from '@/types/flashcard';
import { getDueFlashcards, updateFlashcardSRS } from '@/lib/flashcardStore';
import { calculateNextReview, Grade } from '@/lib/srs';
import { recordDailyStudy } from '@/lib/streakService';
import { toast } from 'sonner';
import { CheckCircle2, RotateCcw, Frown, Smile, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const due = await getDueFlashcards();
      setCards(due);
      setLoading(false);
    }
    load();
  }, []);

  const handleScore = async (grade: Grade) => {
    const card = cards[currentIdx];
    const newSRS = calculateNextReview(grade, card.srs);
    
    // Save to store
    await updateFlashcardSRS(card.id, newSRS);

    const nextIdx = currentIdx + 1;
    
    if (nextIdx >= cards.length) {
      recordDailyStudy().then(res => {
        if (res.isNewStreak) {
          toast.success('🎉 Bạn đã thắp sáng chuỗi ngày học hôm nay (+1 Streak)!');
          window.dispatchEvent(new Event('streak_updated'));
        }
      });
    }

    // Next card
    setIsFlipped(false);
    setCurrentIdx(nextIdx);
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Đang tải...</div>;
  }

  if (currentIdx >= cards.length) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center shadow-sm border border-gray-100 dark:border-slate-700 max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Hoàn thành!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Bạn đã ôn tập xong tất cả thẻ nhớ cho hôm nay. Hãy quay lại vào ngày mai nhé.</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const card = cards[currentIdx];

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900 flex flex-col items-center py-12 px-4 transition-colors">
      <div className="w-full max-w-xl mb-6 flex justify-between items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        <span>Ôn tập hôm nay</span>
        <span>Thẻ {currentIdx + 1} / {cards.length}</span>
      </div>

      <div className="w-full max-w-xl perspective-1000 h-96 relative">
        <div className={`w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`} onClick={() => !isFlipped && setIsFlipped(true)}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm rounded-3xl flex flex-col items-center justify-center p-8 hover:shadow-md transition-shadow">
            <span className="text-7xl font-medium text-gray-900 dark:text-white mb-6 jp-text">{card.front}</span>
            <span className="text-gray-400 dark:text-gray-500 text-sm uppercase tracking-widest font-medium">Chạm để xem mặt sau</span>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm rounded-3xl flex flex-col items-center justify-center p-8">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">{card.back.meaning}</h3>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6 jp-text">{card.back.reading}</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center w-full">
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">Ví dụ:</p>
              <p className="text-gray-800 dark:text-gray-200 text-lg jp-text">{card.back.example}</p>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="w-full max-w-xl mt-8 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-center text-gray-500 dark:text-gray-400 font-medium mb-4 uppercase text-xs tracking-wider">Đánh giá độ khó</p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <button onClick={() => handleScore(0)} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-colors group">
              <RotateCcw className="w-6 h-6 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-red-700 dark:text-red-400 font-medium text-sm">Quên</span>
            </button>
            <button onClick={() => handleScore(3)} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-orange-100 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-700 transition-colors group">
              <Frown className="w-6 h-6 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="text-orange-700 dark:text-orange-400 font-medium text-sm">Khó</span>
            </button>
            <button onClick={() => handleScore(4)} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group">
              <Smile className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">Được</span>
            </button>
            <button onClick={() => handleScore(5)} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-green-100 dark:border-green-900/30 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 transition-colors group">
              <BrainCircuit className="w-6 h-6 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
              <span className="text-green-700 dark:text-green-400 font-medium text-sm">Dễ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
