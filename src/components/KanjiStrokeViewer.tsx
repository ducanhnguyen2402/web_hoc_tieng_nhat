"use client";

import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play } from 'lucide-react';

interface KanjiStrokeViewerProps {
  character: string;
  width?: number;
  height?: number;
}

export function KanjiStrokeViewer({ character, width = 60, height = 60 }: KanjiStrokeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous instance
    containerRef.current.innerHTML = '';
    
    try {
      writerRef.current = HanziWriter.create(containerRef.current, character, {
        width,
        height,
        padding: 5,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 150,
        charDataLoader: (char, onComplete, onError) => {
          if (!char) return;
          // Use hanzi-writer-data-jp for Japanese kanji stroke orders
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data-jp@latest/${encodeURIComponent(char)}.json`)
            .then(res => {
              if (!res.ok) return null;
              return res.json();
            })
            .then(data => {
              if (data) {
                onComplete(data);
              } else {
                setError(true);
              }
            })
            .catch(err => {
              console.error(err);
              setError(true);
            });
        }
      });
    } catch (e) {
      console.error("Failed to load kanji data:", e);
      setError(true);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [character, width, height]);

  const handleAnimate = () => {
    if (writerRef.current) {
      writerRef.current.animateCharacter();
    }
  };

  if (error || !character) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-1 group relative">
      <div 
        ref={containerRef} 
        className="border border-gray-200 rounded-lg bg-white shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
        onClick={handleAnimate}
        title="Nhấn để xem thứ tự nét viết"
      />
      <button 
        onClick={handleAnimate}
        className="absolute -bottom-2 -right-2 bg-blue-100 text-blue-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Play className="w-3 h-3" />
      </button>
    </div>
  );
}
