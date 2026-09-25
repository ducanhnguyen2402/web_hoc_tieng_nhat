# Tiêu chuẩn Cấu trúc Dữ liệu Bài học (Lesson Data Schema)

Tài liệu này định nghĩa cấu trúc JSON chuẩn cho các bài học tiếng Nhật trong hệ thống. Dữ liệu bài học được lưu trữ tại `src/data/lessons/[lesson-id].json` (hoặc `data/lessons/[lesson-id].json`).

---

## 1. Cấu trúc tổng thể (Root Object)

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Có | Định danh duy nhất của bài học (ví dụ: `n5-lesson1`, `n5-lesson2`). |
| `level` | `string` | Có | Cấp độ JLPT tương ứng (`N5`, `N4`, `N3`, `N2`, `N1`). |
| `lessonNumber` | `number` | Không | Số thứ tự bài học (ví dụ: `1`, `2`). |
| `title` | `string` | Có | Tiêu đề bài học (tiếng Việt). |
| `description` | `string` | Có | Mô tả ngắn gọn nội dung và mục tiêu bài học. |
| `vocabulary` | `Vocabulary[]` | Có | Danh sách từ vựng trong bài học (15-20 mục). |
| `grammar` | `Grammar[]` | Có | Danh sách các điểm ngữ pháp (2-3 điểm). |
| `exercises` | `Question[]` | Không | Danh sách các bài tập đi kèm bài học (10 câu). |

---

## 2. Chi tiết Từ vựng (`Vocabulary`)

Mỗi mục từ vựng trong mảng `vocabulary` có cấu trúc:

```typescript
interface VocabularyExample {
  sentence: string;      // Câu ví dụ tiếng Nhật (kanji/kana)
  furigana?: string;     // Câu ví dụ kèm cách đọc furigana định dạng [Hán tự](furigana)
  translation: string;   // Bản dịch tiếng Việt của câu ví dụ
}

interface Vocabulary {
  id: string;            // Mã định danh từ vựng (ví dụ: "v1", "v2")
  word: string;          // Từ hiển thị chính (chữ Hán hoặc Hiragana/Katakana)
  kanji?: string | null; // Chữ Hán tương ứng (null nếu là từ thuần kana/katakana)
  hiragana?: string;     // Cách đọc Hiragana
  reading: string;       // Phiên âm Romaji hoặc cách đọc
  meaning: string;       // Nghĩa tiếng Việt
  partOfSpeech?: string; // Loại từ (Danh từ, Động từ, Tính từ, Đại từ, v.v.)
  example?: VocabularyExample; // Câu ví dụ minh họa
}
```

---

## 3. Chi tiết Ngữ pháp (`Grammar`)

Mỗi điểm ngữ pháp trong mảng `grammar` có cấu trúc:

```typescript
interface GrammarExample {
  japanese: string;    // Câu ví dụ tiếng Nhật
  furigana?: string;   // Furigana minh họa
  vietnamese: string;  // Bản dịch tiếng Việt
}

interface Grammar {
  id: string;              // Mã định danh ngữ pháp (ví dụ: "g1", "g2")
  pattern: string;         // Mẫu cấu trúc ngữ pháp (ví dụ: "これ / それ / あれ は N です")
  structure?: string;      // Tên cấu trúc / công thức
  explanation: string;     // Giải thích cách dùng chi tiết
  usage?: string;          // Hướng dẫn sử dụng
  notes?: string;          // Lưu ý quan trọng khi sử dụng
  examples: GrammarExample[]; // Danh sách ít nhất 3 câu ví dụ minh họa
}
```

---

## 4. Chi tiết Bài tập (`Question`)

Hỗ trợ 3 dạng bài tập chính trong mảng `exercises`:

### 4.1. Trắc nghiệm (`multiple_choice`)
```typescript
interface MultipleChoiceQuestion {
  id: string;
  type: "multiple_choice";
  questionText: string;
  options: string[];       // 4 lựa chọn
  correctAnswer: string;   // Đáp án đúng (phải nằm trong options)
  explanation: string;     // Giải thích chi tiết bằng tiếng Việt
}
```

### 4.2. Điền từ vào chỗ trống (`fill_in_blank`)
```typescript
interface FillInBlankQuestion {
  id: string;
  type: "fill_in_blank";
  questionText: string;
  correctAnswer: string;   // Từ cần điền (chính xác)
  explanation: string;     // Giải thích chi tiết bằng tiếng Việt
}
```

### 4.3. Sắp xếp câu (`ordering`)
```typescript
interface OrderingQuestion {
  id: string;
  type: "ordering";
  questionText: string;
  words: string[];         // Mảng các từ/cụm từ xáo trộn
  correctOrder: string[];  // Thứ tự đúng của các từ ghép lại thành câu hoàn chỉnh
  explanation: string;     // Giải thích chi tiết bằng tiếng Việt
}
```

### 4.4. Luyện nghe (`listening`)
```typescript
interface ListeningQuestion {
  id: string;
  type: "listening";
  questionText: string;
  audioText: string;       // Đoạn text tiếng Nhật sẽ được phát âm qua Web Speech API
  options: string[];       // 4 lựa chọn đáp án
  correctAnswer: string;   // Đáp án đúng
  explanation: string;     // Giải thích chi tiết bằng tiếng Việt
}
```

---

## 5. Mẫu JSON đầy đủ tham khảo

```json
{
  "id": "n5-lesson2",
  "level": "N5",
  "lessonNumber": 2,
  "title": "Bài 2: Đồ vật xung quanh (これ・それ・あれ)",
  "description": "Học cách chỉ định đồ vật ở các cự ly khác nhau và xác định quyền sở hữu.",
  "vocabulary": [
    {
      "id": "v1",
      "word": "これ",
      "kanji": null,
      "hiragana": "これ",
      "reading": "kore",
      "meaning": "Cái này, đây (vật ở gần người nói)",
      "partOfSpeech": "Đại từ chỉ định",
      "example": {
        "sentence": "これ は じしょ です。",
        "furigana": "これ は [辞書](じしょ) です。",
        "translation": "Đây là cuốn từ điển."
      }
    }
  ],
  "grammar": [
    {
      "id": "g1",
      "pattern": "これ / それ / あれ は N です",
      "structure": "これ / それ / あれ + は + Danh từ + です",
      "explanation": "Dùng để chỉ định một đồ vật và nêu rõ vật đó là cái gì.",
      "usage": "これ (gần người nói), それ (gần người nghe), あれ (xa cả hai).",
      "notes": "Không ghép trực tiếp danh từ sau これ/それ/あれ (không nói これ本).",
      "examples": [
        {
          "japanese": "これ は ほん です。",
          "furigana": "これ は [本](ほん) です。",
          "vietnamese": "Đây là cuốn sách."
        }
      ]
    }
  ],
  "exercises": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "questionText": "Chọn từ đúng nghĩa: 'Từ điển'",
      "options": ["ほん", "じしょ", "ざっし", "しんぶん"],
      "correctAnswer": "じしょ",
      "explanation": "Từ 'じしょ' (辞書) có nghĩa là từ điển."
    }
  ]
}
```
