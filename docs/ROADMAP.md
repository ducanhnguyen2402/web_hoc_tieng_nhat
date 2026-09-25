# Đánh giá hiện trạng & Lộ trình phát triển (Roadmap)

**Thời gian tạo:** 24/09/2026

## I. Rà soát hiện trạng

### 1. Kiến trúc tổng thể
- **Routing:** Đã thiết lập chuẩn theo Next.js App Router, phân mảnh tốt các module (`/alphabet`, `/courses`, `/review`, `/login`).
- **State Management:** Xử lý tốt các Global UI State (Theme, Text Size, Furigana) thông qua React Context. Dữ liệu SRS linh hoạt (kết hợp LocalStorage cho tài khoản khách và Supabase DB cho tài khoản đã đăng nhập). Gần đây đã nâng cấp thêm `AuthContext` giúp tối ưu quản lý phiên bản đăng nhập thay vì phân mảnh.
- **Auth Flow:** Tích hợp thành công Supabase (Email/Password & Google), phân quyền an toàn qua Row Level Security (RLS).

### 2. Chất lượng mã nguồn & Kiểm thử
- **Mã nguồn:** Module hóa tốt, tách rời data tĩnh (`kana.ts`, `lessons/`) và component giao diện. Tuy nhiên, logic UI bài tập (kiểm tra đúng/sai, hiển thị màu sắc) đang có dấu hiệu lặp lại ở nhiều dạng bài.
- **Test Coverage:** Hiện tại độ phủ kiểm thử rất mỏng (chủ yếu tập trung ở Unit Test cho thuật toán cốt lõi `srs.ts` và một component đại diện `MultipleChoice.test.tsx`).

### 3. Trải nghiệm người dùng cốt lõi (Core UX)
- **Tính năng nổi bật:** Có các tính năng trợ năng nâng cao (Dark mode, tăng giảm kích thước chữ cho người lớn tuổi, bật tắt Furigana, đọc âm thanh qua Web Speech API).
- **Trạng thái tính năng:** Hệ thống Flashcard SRS, bài tập trắc nghiệm/điền từ/nghe và bảng chữ cái Kana đã chạy ổn định và mượt mà trên đa thiết bị.

---

## II. Điểm nghẽn và Rủi ro kỹ thuật (Bottlenecks)

1. **Thiếu cơ chế đồng bộ và xử lý lỗi mạng (Offline/Sync issues):** Khi mất mạng hoặc Supabase phản hồi lỗi (ví dụ trong `flashcardStore.ts`), hệ thống chưa có cơ chế fallback hoặc thông báo toast rõ ràng, dễ dẫn đến hiện tượng treo UI hoặc mất dữ liệu học khi chuyển đổi giữa Guest và Authenticated.
2. **Code trùng lặp trong module bài tập:** Các logic `selectedAnswer`, `isSubmitted`, kiểm tra đáp án đang bị phân mảnh rải rác trong từng component (Listening, MultipleChoice, FillInBlank). Nếu cần bổ sung thêm dạng bài (vd: Kéo thả), việc bảo trì sẽ khó khăn.
3. **Độ phủ Test quá thấp so với tính phức tạp:** Hệ thống quản lý tiến độ (`user_lesson_progress`) và việc hợp nhất dữ liệu (merge local data vào Supabase) chưa được bao phủ bởi Integration Test, tiềm ẩn rủi ro logic lớn khi scale hệ thống.

---

## III. Lộ trình đề xuất (Roadmap)

### Giai đoạn Ngắn hạn - P0 (Nền móng & Sửa lỗi)
- **Cải thiện xử lý lỗi (Error Handling):** Bổ sung Try/Catch toàn diện khi gọi Supabase, thêm thư viện Toast (như `react-hot-toast` hoặc `sonner`) để báo lỗi Network cho người dùng.
- **Refactor mã nguồn Bài tập:** Tạo một Custom Hook (ví dụ `useExerciseState`) để quản lý toàn bộ trạng thái đúng/sai và style màu sắc chung cho mọi dạng bài tập.
- **Hoàn thiện Đồng bộ dữ liệu:** Xử lý triệt để luồng merge dữ liệu học tập từ LocalStorage đẩy lên Supabase ngay sau khi người dùng đăng ký/đăng nhập lần đầu.

### Giai đoạn Trung hạn - P1 (Gia tăng Trải nghiệm)
- **Hồ sơ cá nhân & Dashboard:** Xây dựng trang Hồ sơ hiển thị thống kê học tập (Số từ vựng đã thuộc, Biểu đồ tiến độ, Chuỗi ngày học liên tục - Streak).
- **Thêm nội dung & Gamification:** Nhập thêm bộ dữ liệu từ N5 đến N3. Thêm hệ thống tính điểm, huy hiệu khi hoàn thành khóa học để tăng động lực.
- **Nâng cấp SRS:** Thay vì chỉ hiển thị chữ cái Kana, mở rộng Flashcard để ôn tập Ngữ pháp và Câu ví dụ.

### Giai đoạn Dài hạn - P2 (Tối ưu hóa & Mở rộng)
- **Thi thử JLPT (Mock Exam):** Xây dựng module thi thử JLPT với đồng hồ đếm ngược, tổng hợp kết quả đánh giá theo từng kỹ năng (Từ vựng, Ngữ pháp, Đọc, Nghe).
- **Gợi ý học tập bằng AI (AI Recommendations):** Phân tích các từ/ngữ pháp người dùng hay sai trong quá trình làm bài và SRS để động tạo ra các bài kiểm tra ôn tập nhắm đúng điểm yếu.
- **Tối ưu hóa & Phân tích:** Tích hợp E2E Test (Playwright/Cypress), phân tích telemetry để xem người dùng thường bỏ cuộc ở bài học nào nhằm cải thiện nội dung bài đó.
