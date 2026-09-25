'use client';

import Link from 'next/link';
import { BookOpen, LogOut, Sun, Moon, Menu, X, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from './AuthProvider';
import { getStreakInfo, StreakInfo } from '@/lib/streakService';

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streak, setStreak] = useState<StreakInfo | null>(null);

  useEffect(() => {
    setMounted(true);
    getStreakInfo().then(setStreak);

    const handleStreakUpdate = () => {
      getStreakInfo().then(setStreak);
    };
    window.addEventListener('streak_updated', handleStreakUpdate);
    return () => window.removeEventListener('streak_updated', handleStreakUpdate);
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <header className="border-b bg-white dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <BookOpen className="w-6 h-6" />
          <span className="hidden sm:inline">Học Tiếng Nhật</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link href="/alphabet" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Bảng chữ cái</Link>
          <Link href="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Khóa học</Link>
          <Link href="/review" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Ôn tập</Link>
        </nav>

        <div className="flex gap-2 sm:gap-4 items-center">
          {mounted && (
            <>
              {streak && (
                <div 
                  className="group relative flex items-center gap-1 cursor-default mr-2"
                  title={`Tuyệt vời! Bạn đã duy trì học ${streak.currentStreak} ngày liên tiếp. Hãy học tiếp vào ngày mai để không làm tắt lửa nhé!`}
                >
                  <Flame 
                    className={`w-5 h-5 transition-colors ${streak.isStudiedToday ? 'text-orange-500 fill-orange-500 animate-[pulse_2s_ease-in-out_infinite]' : 'text-gray-400 dark:text-gray-500'}`} 
                  />
                  <span className={`font-bold ${streak.isStudiedToday ? 'text-orange-600 dark:text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {streak.currentStreak}
                  </span>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                title="Chuyển chế độ Sáng/Tối"
                aria-label="Chuyển chế độ Sáng/Tối"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </>
          )}
          
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
          
          {user ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{user.email}</span>
              <button onClick={handleLogout} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none" title="Đăng xuất" aria-label="Đăng xuất">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link href="/login" className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">Đăng nhập</Link>
              <Link href="/login" className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">Đăng ký</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            <Link onClick={() => setMobileMenuOpen(false)} href="/alphabet" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Bảng chữ cái</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Khóa học</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/review" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium">Ôn tập</Link>
          </nav>
          <div className="pt-4 border-t dark:border-slate-800 flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{user.email}</span>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium">Đăng xuất</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="w-full text-center py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium">Đăng nhập</Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium">Đăng ký</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
