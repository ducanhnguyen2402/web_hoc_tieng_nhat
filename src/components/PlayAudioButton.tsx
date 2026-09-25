"use client";

import { Volume2, AlertCircle } from 'lucide-react';
import React from 'react';
import { useSpeech } from '@/hooks/useSpeech';

interface PlayAudioButtonProps {
  text: string;
  className?: string;
}

export function PlayAudioButton({ text, className = "" }: PlayAudioButtonProps) {
  const { play, stop, isPlaying, isSupported, error } = useSpeech();

  const handlePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play(text);
    }
  };

  if (!isSupported) {
    return (
      <button 
        disabled
        className={`p-1.5 rounded-full text-gray-300 cursor-not-allowed ${className}`}
        title="Trình duyệt không hỗ trợ"
      >
        <Volume2 className="w-4 h-4 opacity-50" />
      </button>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handlePlay}
        className={`p-1.5 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          isPlaying ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800'
        } ${className}`}
        title={isPlaying ? "Dừng" : "Nghe phát âm"}
        aria-label="Nghe phát âm"
      >
        <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
      </button>
      
      {error && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 bg-red-100 text-red-600 text-xs rounded shadow-sm flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}
