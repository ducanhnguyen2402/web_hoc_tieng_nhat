"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function VocabularyImage({ src, alt, className }: Props) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
    />
  );
}
