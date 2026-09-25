export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-800 py-12 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Học Tiếng Nhật. Mọi bản quyền được bảo lưu.</p>
        <p className="mt-2 text-sm">Hệ thống học tiếng Nhật trực tuyến hiệu quả.</p>
      </div>
    </footer>
  )
}
