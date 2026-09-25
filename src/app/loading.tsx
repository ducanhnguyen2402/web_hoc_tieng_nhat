import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-slate-900">
      <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
      <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">Đang tải dữ liệu...</p>
    </div>
  );
}
