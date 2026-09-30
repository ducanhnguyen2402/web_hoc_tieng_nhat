'use client';

import React, { useState } from 'react';
import { BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { Vocabulary } from '@/types/lesson';
import { addFlashcards } from '@/lib/flashcardStore';
import { toast } from 'sonner';

interface Props {
  vocabList: Vocabulary[];
  className?: string;
}

export function AddFlashcardButton({ vocabList, className = '' }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = async () => {
    if (vocabList.length === 0) return;
    setIsAdding(true);

    try {
      const cards = vocabList.map(v => ({
        front: v.word,
        back: {
          meaning: v.meaning,
          reading: v.reading || v.hiragana || '',
          example: v.example?.sentence || ''
        }
      }));

      const addedCount = await addFlashcards(cards);
      
      if (addedCount > 0) {
        toast.success(`Đã thêm ${addedCount} từ mới vào kho Ôn tập Flashcard!`);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast.info(`Tất cả từ vựng này đã có trong kho Ôn tập của bạn.`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi thêm vào Flashcard.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdding}
      className={`flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors focus:ring-2 focus:ring-indigo-500 outline-none text-sm ${className}`}
    >
      {isSuccess ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          <span>Đã thêm vào Ôn tập</span>
        </>
      ) : (
        <>
          <BookmarkPlus className="w-4 h-4" />
          <span>{isAdding ? 'Đang thêm...' : 'Thêm vào Flashcard'}</span>
        </>
      )}
    </button>
  );
}
