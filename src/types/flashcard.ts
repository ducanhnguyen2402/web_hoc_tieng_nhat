import { SRSData } from '@/lib/srs';

export interface Flashcard {
  id: string;
  front: string; // Từ tiếng Nhật
  back: {
    meaning: string;
    reading: string;
    example: string;
  };
  srs: SRSData;
}
