# Web Học Tiếng Nhật

Nền tảng học tiếng Nhật trực tuyến, hỗ trợ lộ trình học rõ ràng và bài tập thực hành JLPT.

## Yêu cầu hệ thống
- Node.js 18.x trở lên
- npm / pnpm / yarn

## Hướng dẫn cài đặt và chạy cục bộ

1. Clone dự án và di chuyển vào thư mục:
```bash
git clone <repository_url>
cd web_hoc_tieng_nhat
```

2. Cài đặt các thư viện:
```bash
npm install
```

3. Cấu hình biến môi trường:
Tạo file `.env.local` từ `.env.example`:
```bash
cp .env.example .env.local
```
Điền các giá trị Supabase `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` vào `.env.local`.

4. Chạy dự án ở môi trường phát triển:
```bash
npm run dev
```

Dự án sẽ chạy tại địa chỉ [http://localhost:3000](http://localhost:3000).

## Cấu trúc dự án
- `src/app`: Giao diện Next.js App Router.
- `src/components`: Các UI component có thể tái sử dụng.
- `src/lib`: Các tiện ích, cấu hình như `supabase.ts`.
- `src/data`: Dữ liệu mock tĩnh.
- `docs`: Các tài liệu dự án như PRD, SCHEMA, CURRICULUM.

## Quy định đóng góp
Vui lòng đọc kỹ `AGENTS.md` trước khi tham gia phát triển dự án này.
