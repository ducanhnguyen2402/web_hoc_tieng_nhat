import { supabase } from './supabase';

const LOCAL_STREAK_KEY = 'tieng_nhat_streak';

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  isStudiedToday: boolean;
}

function getLocalYYYYMMDD(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export async function getStreakInfo(): Promise<StreakInfo> {
  const today = getLocalYYYYMMDD(new Date());

  if (typeof window === 'undefined') {
    return { currentStreak: 0, longestStreak: 0, lastStudyDate: null, isStudiedToday: false };
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const { data, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (!error && data) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = getLocalYYYYMMDD(yesterdayDate);

      let currentStreak = data.current_streak;
      if (data.last_study_date && data.last_study_date < yesterday && data.last_study_date !== today) {
        currentStreak = 0; // Broken streak
      }

      return {
        currentStreak,
        longestStreak: data.longest_streak,
        lastStudyDate: data.last_study_date,
        isStudiedToday: data.last_study_date === today
      };
    }
  }

  // Local storage fallback
  const saved = localStorage.getItem(LOCAL_STREAK_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = getLocalYYYYMMDD(yesterdayDate);

      let currentStreak = parsed.currentStreak || 0;
      if (parsed.lastStudyDate && parsed.lastStudyDate < yesterday && parsed.lastStudyDate !== today) {
        currentStreak = 0;
      }

      return {
        currentStreak,
        longestStreak: parsed.longestStreak || 0,
        lastStudyDate: parsed.lastStudyDate || null,
        isStudiedToday: parsed.lastStudyDate === today
      };
    } catch {
      // ignore
    }
  }

  return { currentStreak: 0, longestStreak: 0, lastStudyDate: null, isStudiedToday: false };
}

export async function recordDailyStudy(): Promise<{ currentStreak: number, isNewStreak: boolean }> {
  const today = getLocalYYYYMMDD(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalYYYYMMDD(yesterdayDate);

  const currentInfo = await getStreakInfo();
  
  if (currentInfo.isStudiedToday) {
    return { currentStreak: currentInfo.currentStreak, isNewStreak: false };
  }

  let newStreak = 1;
  if (currentInfo.lastStudyDate === yesterday) {
    // Note: getStreakInfo handles the reset to 0 internally if it was broken, 
    // so we can also just use currentInfo.currentStreak + 1
    newStreak = currentInfo.currentStreak + 1;
  }
  
  const newLongest = Math.max(currentInfo.longestStreak, newStreak);

  if (typeof window !== 'undefined') {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      await supabase.from('user_streaks').upsert({
        user_id: session.user.id,
        current_streak: newStreak,
        longest_streak: newLongest,
        last_study_date: today
      }, { onConflict: 'user_id' });
    } else {
      localStorage.setItem(LOCAL_STREAK_KEY, JSON.stringify({
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastStudyDate: today
      }));
    }
  }

  return { currentStreak: newStreak, isNewStreak: true };
}

export async function mergeLocalStreakToSupabase(userId: string): Promise<void> {
  const saved = localStorage.getItem(LOCAL_STREAK_KEY);
  if (!saved) return;

  try {
    const localParsed = JSON.parse(saved);
    const localCurrent = localParsed.currentStreak || 0;
    const localLongest = localParsed.longestStreak || 0;
    const localLastStudy = localParsed.lastStudyDate || null;

    if (!localLastStudy) return;

    // Fetch server streak
    const { data: serverData, error } = await supabase
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    let mergedCurrent = localCurrent;
    let mergedLongest = localLongest;
    let mergedLastStudy = localLastStudy;

    if (!error && serverData) {
      mergedLongest = Math.max(localLongest, serverData.longest_streak);
      
      const serverDateStr = serverData.last_study_date || '';
      const localDateStr = localLastStudy || '';

      if (serverDateStr > localDateStr) {
        mergedCurrent = serverData.current_streak;
        mergedLastStudy = serverData.last_study_date;
      } else if (serverDateStr === localDateStr) {
        mergedCurrent = Math.max(localCurrent, serverData.current_streak);
        mergedLastStudy = localLastStudy;
      }
    }

    const { error: upsertError } = await supabase.from('user_streaks').upsert({
      user_id: userId,
      current_streak: mergedCurrent,
      longest_streak: mergedLongest,
      last_study_date: mergedLastStudy
    }, { onConflict: 'user_id' });

    if (upsertError) throw upsertError;

    localStorage.removeItem(LOCAL_STREAK_KEY);
  } catch (e) {
    console.error("Streak merge error:", e);
  }
}
