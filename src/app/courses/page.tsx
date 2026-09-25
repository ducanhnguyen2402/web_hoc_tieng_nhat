'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { getAllProgress } from '@/lib/progressService';

// Mock list of levels and lessons
const courseData = [
  {
    level: 'N5',
    title: 'Sơ cấp 1',
    lessons: [
      { id: 'n5-lesson1', title: 'Bài 1: Giới thiệu bản thân', desc: 'Học cách chào hỏi cơ bản và tự giới thiệu bản thân trong tiếng Nhật.' },
      { id: 'n5-lesson2', title: 'Bài 2: Đồ vật xung quanh (これ・それ・あれ)', desc: 'Học cách chỉ định đồ vật ở các vị trí khác nhau và biểu thị quyền sở hữu bằng trợ từ の.' },
      { id: 'n5-lesson3', title: 'Bài 3: Vị trí và Nơi chốn (ここ・そこ・あそこ)', desc: 'Học cách xác định vị trí đồ vật, địa điểm, phòng ban; sử dụng các đại từ chỉ nơi chốn thông thường và lịch sự; hỏi xuất xứ hàng hóa và giá tiền.' },
      { id: 'n5-lesson4', title: 'Bài 4: Thời gian và Ngày tháng (Giờ, Phút, Thứ)', desc: 'Làm chủ cách nói giờ phút, ngày tháng, thứ trong tuần cùng cấu trúc thời gian quan trọng với trợ từ に và ~から ~まで.' },
    ]
  },
  {
    level: 'N4',
    title: 'Sơ cấp 2',
    lessons: [
      { id: 'n4-lesson26', title: 'Bài 26: Giải thích tình huống', desc: 'Học cách dùng ~んです để giải thích lý do, tình huống.', isComingSoon: true },
    ]
  }
];

export default function CoursesPage() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    getAllProgress().then(setProgress);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Danh sách khóa học</h1>
        
        {courseData.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chưa có khóa học nào</h3>
            <p className="text-gray-500 dark:text-gray-400">Các khóa học đang được cập nhật. Vui lòng quay lại sau!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {courseData.map((course) => (
              <div key={course.level} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">{course.level}</span>
                    {course.title}
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {course.lessons.map((lesson: any) => {
                      if (lesson.isComingSoon) {
                        return (
                          <div 
                            key={lesson.id} 
                            className="block p-5 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 opacity-70 relative"
                          >
                            <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded">Sắp ra mắt</div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{lesson.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 pr-16">{lesson.desc}</p>
                          </div>
                        );
                      }
                      
                      const score = progress[lesson.id];
                      
                      return (
                        <Link 
                          key={lesson.id} 
                          href={`/courses/${course.level.toLowerCase()}/${lesson.id}`}
                          className="block p-5 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-slate-750 transition-all group focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <div className="flex flex-col xl:flex-row xl:items-start justify-between mb-2 gap-2">
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{lesson.title}</h3>
                            {score !== undefined && (
                              <div className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs font-bold px-2 py-1 rounded w-fit shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                                Điểm: {score}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{lesson.desc}</p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
