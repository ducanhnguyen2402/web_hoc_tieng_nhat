"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FuriganaContextType {
  showFurigana: boolean;
  toggleFurigana: () => void;
}

const FuriganaContext = createContext<FuriganaContextType>({
  showFurigana: true,
  toggleFurigana: () => {},
});

export function FuriganaProvider({ children }: { children: React.ReactNode }) {
  const [showFurigana, setShowFurigana] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('showFurigana');
    if (saved !== null) {
      setShowFurigana(saved === 'true');
    }
  }, []);

  const toggleFurigana = () => {
    setShowFurigana((prev) => {
      const next = !prev;
      localStorage.setItem('showFurigana', next.toString());
      return next;
    });
  };

  return (
    <FuriganaContext.Provider value={{ showFurigana, toggleFurigana }}>
      {children}
    </FuriganaContext.Provider>
  );
}

export const useFurigana = () => useContext(FuriganaContext);
