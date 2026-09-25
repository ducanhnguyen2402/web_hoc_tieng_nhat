import { Flashcard } from '@/types/flashcard';
import { initializeSRSData } from './srs';
import { supabase } from './supabase';
import { toast } from 'sonner';

const STORAGE_KEY = 'tieng_nhat_flashcards';

const seedData: Flashcard[] = [
  { id: 'fc1', front: '学校', back: { meaning: 'Trường học', reading: 'がっこう (Gakkou)', example: '学校へ行きます。' }, srs: initializeSRSData() },
  { id: 'fc2', front: '先生', back: { meaning: 'Giáo viên', reading: 'せんせい (Sensei)', example: '先生は優しいです。' }, srs: initializeSRSData() },
  { id: 'fc3', front: '学生', back: { meaning: 'Học sinh', reading: 'がくせい (Gakusei)', example: '私は学生です。' }, srs: initializeSRSData() },
  { id: 'fc4', front: '本', back: { meaning: 'Sách', reading: 'ほん (Hon)', example: '本を読みます。' }, srs: initializeSRSData() },
  { id: 'fc5', front: '食べる', back: { meaning: 'Ăn', reading: 'たべる (Taberu)', example: 'りんごを食べる。' }, srs: initializeSRSData() },
];

export async function mergeLocalFlashcardsToSupabase(userId: string): Promise<void> {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  
  let localCards: Flashcard[] = [];
  try {
    const parsed = JSON.parse(saved);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localCards = parsed.map((card: any) => ({
      ...card,
      srs: {
        ...card.srs,
        nextReviewDate: new Date(card.srs.nextReviewDate)
      }
    }));
  } catch {
    return;
  }
  
  if (localCards.length === 0) return;

  try {
    // 1. Fetch current user cards from Supabase
    const { data: serverCardsData, error: fetchError } = await supabase
      .from('user_flashcards')
      .select('*')
      .eq('user_id', userId);
      
    if (fetchError) throw fetchError;
    
    // 2. Map existing server cards by 'front'
    const serverCardsMap = new Map();
    if (serverCardsData) {
      for (const row of serverCardsData) {
        serverCardsMap.set(row.front, row);
      }
    }

    // 3. Prepare upsert rows
    const upsertRows = [];
    
    for (const lCard of localCards) {
      const sCard = serverCardsMap.get(lCard.front);
      
      let shouldUpsert = false;
      let idToUse = undefined; // DB will generate UUID if undefined
      
      if (!sCard) {
        shouldUpsert = true; // New card from local
      } else {
        // Compare progress (repetition)
        if (lCard.srs.repetition > sCard.repetition) {
          shouldUpsert = true;
          idToUse = sCard.id; // Overwrite existing server card
        }
      }
      
      if (shouldUpsert) {
        upsertRows.push({
          ...(idToUse ? { id: idToUse } : {}),
          user_id: userId,
          front: lCard.front,
          back_meaning: lCard.back.meaning,
          back_reading: lCard.back.reading,
          back_example: lCard.back.example,
          interval: lCard.srs.interval,
          repetition: lCard.srs.repetition,
          ease_factor: lCard.srs.easeFactor,
          next_review_date: lCard.srs.nextReviewDate.toISOString()
        });
      }
    }
    
    if (upsertRows.length > 0) {
      const { error: upsertError } = await supabase.from('user_flashcards').upsert(upsertRows, { onConflict: 'user_id, front' });
      if (upsertError) throw upsertError;
    }

    // 4. Clean up local storage on success
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Đã đồng bộ thành công tiến độ học tập vào tài khoản của bạn!");
    
  } catch (error) {
    console.error("Merge error:", error);
    toast.error("Không thể đồng bộ dữ liệu với máy chủ. Vui lòng kiểm tra kết nối mạng.");
  }
}

export async function getFlashcards(): Promise<Flashcard[]> {
  if (typeof window === 'undefined') return [];

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    try {
      const { data, error } = await supabase
        .from('user_flashcards')
        .select('*')
        .eq('user_id', session.user.id);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        return data.map(row => ({
          id: row.id,
          front: row.front,
          back: {
            meaning: row.back_meaning,
            reading: row.back_reading,
            example: row.back_example
          },
          srs: {
            interval: row.interval,
            repetition: row.repetition,
            easeFactor: row.ease_factor,
            nextReviewDate: new Date(row.next_review_date)
          }
        }));
      } else {
        await saveFlashcards(seedData);
        return seedData;
      }
    } catch (e) {
      console.error(e);
      toast.error("Không thể đồng bộ dữ liệu với máy chủ. Vui lòng kiểm tra kết nối mạng.");
      // On error, we fallback to LocalStorage
    }
  }

  // Fallback to LocalStorage for guest or on error
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  
  try {
    const parsed = JSON.parse(saved);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parsed.map((card: any) => ({
      ...card,
      srs: {
        ...card.srs,
        nextReviewDate: new Date(card.srs.nextReviewDate)
      }
    }));
  } catch {
    return seedData;
  }
}

export async function saveFlashcards(cards: Flashcard[]): Promise<void> {
  if (typeof window === 'undefined') return;

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    try {
      const rows = cards.map(c => ({
        id: c.id.length > 10 ? c.id : undefined, // Let postgres generate UUID if it's a seed id
        user_id: session.user.id,
        front: c.front,
        back_meaning: c.back.meaning,
        back_reading: c.back.reading,
        back_example: c.back.example,
        interval: c.srs.interval,
        repetition: c.srs.repetition,
        ease_factor: c.srs.easeFactor,
        next_review_date: c.srs.nextReviewDate.toISOString()
      }));
      
      const upsertRows = rows.map(r => {
        if (r.id === undefined) delete r.id; // DB generate UUID
        return r;
      });

      const { error } = await supabase.from('user_flashcards').upsert(upsertRows, { onConflict: 'user_id, front' });
      if (error) throw error;
    } catch (e) {
      console.error(e);
      toast.error("Không thể đồng bộ dữ liệu với máy chủ. Vui lòng kiểm tra kết nối mạng.");
      // Fallback to local
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  } else {
    // LocalStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
}

export async function updateFlashcardSRS(id: string, newSRS: Flashcard['srs']): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  
  let fallbackNeeded = false;

  if (session?.user && id.length > 10) { // Check if valid UUID
    try {
      const { error } = await supabase.from('user_flashcards').update({
        interval: newSRS.interval,
        repetition: newSRS.repetition,
        ease_factor: newSRS.easeFactor,
        next_review_date: newSRS.nextReviewDate.toISOString()
      }).eq('id', id);
      
      if (error) throw error;
    } catch (e) {
      console.error(e);
      toast.error("Không thể đồng bộ dữ liệu với máy chủ. Vui lòng kiểm tra kết nối mạng.");
      fallbackNeeded = true;
    }
  } else {
    fallbackNeeded = true;
  }

  if (fallbackNeeded) {
    // Fallback LocalStorage
    const cards = await getFlashcards();
    const updated = cards.map(c => c.id === id ? { ...c, srs: newSRS } : c);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export async function getDueFlashcards(): Promise<Flashcard[]> {
  const cards = await getFlashcards();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return cards.filter(card => card.srs.nextReviewDate.getTime() <= today.getTime());
}
