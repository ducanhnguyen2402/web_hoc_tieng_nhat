import { supabase } from './supabase';

const LOCAL_PROGRESS_KEY = 'tieng_nhat_progress';

export async function getAllProgress(): Promise<Record<string, number>> {
  if (typeof window === 'undefined') return {};

  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user) {
    const { data, error } = await supabase
      .from('user_lesson_progress')
      .select('lesson_id, score')
      .eq('user_id', session.user.id);

    if (!error && data) {
      const progressMap: Record<string, number> = {};
      data.forEach(row => {
        progressMap[row.lesson_id] = row.score;
      });
      return progressMap;
    }
  }

  // Fallback to LocalStorage
  const saved = localStorage.getItem(LOCAL_PROGRESS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }

  return {};
}

export async function saveLessonProgress(lessonId: string, score: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const currentProgress = await getAllProgress();
  const oldScore = currentProgress[lessonId] || 0;

  // Only overwrite if the new score is strictly greater than the old score,
  // OR if this is the first time taking it (it doesn't exist in the map yet)
  if (lessonId in currentProgress && score <= oldScore) {
    return; 
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const { error } = await supabase.from('user_lesson_progress').upsert({
      user_id: session.user.id,
      lesson_id: lessonId,
      score: score,
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id, lesson_id' });

    if (error) {
      console.error("Failed to save progress to Supabase:", error);
      saveLocalProgress(lessonId, score, currentProgress);
    }
  } else {
    saveLocalProgress(lessonId, score, currentProgress);
  }
}

function saveLocalProgress(lessonId: string, score: number, currentProgress: Record<string, number>) {
  const newProgress = { ...currentProgress, [lessonId]: score };
  localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(newProgress));
}
