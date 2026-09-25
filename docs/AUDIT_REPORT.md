# Báo cáo rà soát toàn bộ dự án (Audit Report)

**Thời gian tạo:** 24/09/2026

## 1. Lỗi tiềm ẩn (Potential Bugs)
* **[Vừa] Lỗi khi thêm Seed Data vào Supabase:** Hàm `saveFlashcards` truyền `undefined` cho cột `id` thay vì bỏ hẳn property đó khi đẩy `seedData` lên Supabase. Điều này có thể gây lỗi TypeScript hoặc Supabase error khi dùng `upsert`. (Đã phân tích, nhưng hiện tại Supabase bỏ qua các property undefined. Dù sao cũng cần refactor an toàn hơn).
* **[Nhẹ] Web Speech API không hỗ trợ:** Component `PlayAudioButton` có kiểm tra `speechSynthesis` in window, nhưng một số trình duyệt (Safari trên iOS đời cũ hoặc WebViews) có thể block âm thanh nếu không có tương tác người dùng phù hợp. Cần thêm fallback hoặc toast thông báo đẹp hơn là `alert`.

## 2. Code trùng lặp (Code Duplication)
* **[Vừa] State của Exercise:** Các logic kiểm tra đáp án, hiển thị style màu xanh/đỏ lặp lại nhiều ở `MultipleChoice.tsx`, `Listening.tsx`, `FillInBlank.tsx`.
  * **Đề xuất:** Gom logic `useExerciseState` (Custom Hook) hoặc một Component bọc ngoài chuyên hiển thị màu đáp án.
* **[Nhẹ] Lấy session từ Supabase:** `supabase.auth.getSession()` bị gọi rải rác nhiều nơi (ở `flashcardStore.ts`, `Header.tsx`, `login/page.tsx`).
  * **Đề xuất:** Nên tạo `AuthContext` để quản lý User state toàn cục, giúp đồng bộ UI nhanh chóng hơn và giảm số lượng API call tới Supabase.

## 3. Quản lý lỗi (Missing Error Handling)
* **[Vừa] Xử lý lỗi Network/Supabase:** Tại `flashcardStore.ts`, một số trường hợp `error` khi fetch hoặc upsert không được `catch` hoặc hiển thị thông báo lỗi lên màn hình cho người dùng (toast). Nếu người dùng offline và có đăng nhập, có thể gặp lỗi trắng trang.
* **[Nhẹ] Lỗi khi file Audio trống:** Ở bài nghe, nếu thuộc tính `audioText` rỗng, TTS API có thể bị lỗi, cần bọc try-catch hoặc kiểm tra string rỗng trước.

## 4. Vấn đề bảo mật & Cấu hình (Security & Config)
* **[Tốt] Row Level Security (RLS):** Các bảng `user_flashcards` và `user_lesson_progress` đã cấu hình RLS rất chuẩn (chỉ cho phép `auth.uid() = user_id`). Điều này đảm bảo an toàn dữ liệu.
* **[An toàn] File .env:** Hiện tại `.env.example` chứa key public (Anon Key). Anon key được thiết kế để public nên việc này an toàn miễn là RLS đã được bật. Tránh tuyệt đối push `Service Role Key` lên source code.
* **[Cần lưu ý] Dữ liệu LocalStorage:** Dữ liệu SRS của người dùng Guest chưa đăng nhập được lưu ở LocalStorage không bị mã hoá. Điều này có thể bị sửa đổi (cheat) nhưng vì đây là ứng dụng học tập, rủi ro khá thấp. Không cần thay đổi nhưng cần lưu ý nếu sau này có tính năng bảng xếp hạng.

## 5. Tình trạng Unit Test
* Đã cấu hình thành công `vitest` cùng `@testing-library/react`.
* Đã thêm các bài test cho luồng thuật toán (SRS - `srs.test.ts`) và luồng làm bài tập trắc nghiệm (`MultipleChoice.test.tsx`).
* Các test chạy pass 100%. Có thể dễ dàng mở rộng cho các luồng đăng nhập.

---

> **Ghi chú:** Tôi đã thiết lập hệ thống Test cơ bản để bạn có thể mở rộng sau này, đồng thời xác nhận hệ thống an toàn và không có lỗi nghiêm trọng. Những mục trên bạn có thể quyết định xử lý dần trong quá trình phát triển (tôi khuyên ưu tiên tạo `AuthContext`).
