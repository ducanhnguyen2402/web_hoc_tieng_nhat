"use client";

import React, { ReactNode } from 'react';
import { useFurigana } from './FuriganaProvider';

interface RubyProps {
  children?: ReactNode;
  kanji?: string;
  furigana?: string;
  text?: string;
}

export function Ruby({ children, kanji, furigana, text }: RubyProps) {
  const { showFurigana } = useFurigana();

  // Mode 1: Parse markdown-like syntax e.g. [漢字](かんじ)
  if (text) {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return (
      <span className="inline-flex flex-wrap items-baseline">
        {parts.map((part, index) => {
          const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (match) {
            const k = match[1];
            const f = match[2];
            return (
              <ruby key={index} className="mx-0.5 group leading-none">
                {k}
                <rt 
                  className={`text-[0.6em] text-gray-500 transition-opacity duration-200 select-none ${
                    showFurigana ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {f}
                </rt>
              </ruby>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }

  // Mode 2: Explicit kanji and furigana props
  if (kanji && furigana) {
    return (
      <ruby className="mx-0.5 group leading-none">
        {kanji}
        <rt 
          className={`text-[0.6em] text-gray-500 transition-opacity duration-200 select-none ${
            showFurigana ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {furigana}
        </rt>
      </ruby>
    );
  }

  return <>{children}</>;
}
