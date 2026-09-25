"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type TextSize = 'normal' | 'large';

interface TextSizeContextType {
  textSize: TextSize;
  toggleTextSize: () => void;
  // A helper class to apply to Japanese text
  jpTextClass: string;
}

const TextSizeContext = createContext<TextSizeContextType>({
  textSize: 'normal',
  toggleTextSize: () => {},
  jpTextClass: '',
});

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('textSize') as TextSize;
    if (saved && (saved === 'normal' || saved === 'large')) {
      setTextSize(saved);
    }
  }, []);

  const toggleTextSize = () => {
    setTextSize((prev) => {
      const next = prev === 'normal' ? 'large' : 'normal';
      localStorage.setItem('textSize', next);
      return next;
    });
  };

  // When not mounted, default to 'normal' to avoid hydration mismatch, 
  // but this is mostly used as a CSS class helper.
  const jpTextClass = (mounted && textSize === 'large') ? 'text-3xl' : 'text-xl';

  return (
    <TextSizeContext.Provider value={{ textSize, toggleTextSize, jpTextClass }}>
      <div className={mounted && textSize === 'large' ? 'text-size-large' : 'text-size-normal'}>
        {children}
      </div>
    </TextSizeContext.Provider>
  );
}

export const useTextSize = () => useContext(TextSizeContext);
