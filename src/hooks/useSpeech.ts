'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechResult {
  play: (text: string) => void;
  stop: () => void;
  isPlaying: boolean;
  isSupported: boolean;
  error: string | null;
}

export function useSpeech(): UseSpeechResult {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  
  // Use refs to avoid closures issues in callbacks
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Force loading voices in some browsers
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      // Cleanup: cancel any ongoing speech when the component unmounts
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (isSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [isSupported]);

  const play = useCallback((text: string) => {
    if (!isSupported || !window.speechSynthesis) {
      setError("Trình duyệt không hỗ trợ Web Speech API.");
      return;
    }

    if (!text.trim()) {
      setError("Không có nội dung để đọc.");
      return;
    }

    setError(null);
    stop(); // Dọn dẹp hàng đợi trước khi đọc câu mới

    // Lọc bỏ cú pháp furigana markdown [A](B) -> A
    const cleanText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    
    // Cố gắng tìm giọng đọc tiếng Nhật chuẩn nhất
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(voice => voice.lang.includes('ja') || voice.lang.includes('jp'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    
    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      // Bỏ qua lỗi "canceled" khi bị người dùng ngắt
      if (event.error !== 'canceled') {
        setError(`Lỗi phát âm: ${event.error}`);
      }
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;

    // setTimeout workaround cho bug kẹt queue của Safari/Chrome
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);

  }, [isSupported, stop]);

  return { play, stop, isPlaying, isSupported, error };
}
