import Link from "next/link";
import { ArrowRight, BookA, Headphones, GraduationCap, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start bg-white dark:bg-slate-900 transition-colors duration-300 w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full py-20 sm:py-32 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium rounded-full text-sm shadow-sm">
            🚀 Khám phá phương pháp học mới
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Học Tiếng Nhật <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Dễ Dàng Hơn Bao Giờ Hết
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Nền tảng học trực tuyến với lộ trình rõ ràng, hệ thống bài tập đa dạng, luyện nghe phát âm và thẻ flashcard thông minh giúp bạn chinh phục JLPT hiệu quả.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Bắt đầu học ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/alphabet" 
              className="px-8 py-4 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-100 dark:border-slate-700 rounded-xl font-bold text-lg hover:border-blue-200 dark:hover:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-750 transition-colors flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Bảng chữ cái
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tính năng nổi bật</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Công cụ mạnh mẽ được thiết kế để tăng tốc quá trình ghi nhớ và thấu hiểu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookA className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
                title: "Furigana & Hán tự",
                desc: "Hiển thị cách đọc tự động và hoạt ảnh viết từng nét Kanji sinh động."
              },
              {
                icon: <Headphones className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Luyện nghe chuẩn",
                desc: "Giọng đọc bản xứ cho mọi từ vựng và câu ví dụ, bài tập luyện nghe bám sát."
              },
              {
                icon: <LayoutDashboard className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
                title: "Flashcard SRS",
                desc: "Thuật toán lặp lại ngắt quãng giúp bạn ghi nhớ từ vựng vĩnh viễn."
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-violet-600 dark:text-violet-400" />,
                title: "Kiểm tra toàn diện",
                desc: "Đa dạng bài tập: Trắc nghiệm, Điền từ, Sắp xếp câu có giải thích chi tiết."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="w-full py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Lộ trình học tập rõ ràng</h2>
            <p className="text-gray-600 dark:text-gray-400">Đi từ người mới bắt đầu đến giao tiếp thành thạo.</p>
          </div>

          <div className="space-y-6">
            {[
              { level: "N5", title: "Căn bản & Nhập môn", desc: "Học bảng chữ cái, chào hỏi cơ bản, số đếm và các mẫu ngữ pháp nền tảng. Có thể hiểu được các câu giao tiếp đơn giản.", color: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300", active: true },
              { level: "N4", title: "Giao tiếp cơ bản", desc: "Mở rộng vốn từ vựng sinh hoạt, học thêm Kanji và các mẫu câu phức tạp hơn để diễn đạt ý muốn, khả năng.", color: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300", active: false },
              { level: "N3", title: "Trung cấp", desc: "Đọc hiểu các bài báo đơn giản, hội thoại tự nhiên trong đời sống hàng ngày với người bản xứ.", color: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300", active: false },
            ].map((step, i) => (
              <div key={i} className={`flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-3xl border ${step.active ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-600 shadow-md' : 'bg-transparent border-gray-200 dark:border-slate-700 opacity-80'}`}>
                <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center text-2xl font-black ${step.color}`}>
                  {step.level}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                  {step.active && (
                    <Link href="/courses" className="inline-flex mt-4 items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Học ngay <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
