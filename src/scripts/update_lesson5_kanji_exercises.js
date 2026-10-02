const fs = require('fs');
const path = require('path');

// 1. Update lesson data (add kanji)
const lessonPath = path.join(__dirname, '../data/lessons/n5-lesson5.json');
const lessonData = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

const kanjiData = [
  {
    id: "k1", character: "先", meaning: "TIÊN (trước)",
    words: [
      { word: "先生", reading: "せんせい", meaning: "Giáo viên" },
      { word: "先日", reading: "せんじつ", meaning: "Ngày trước" },
      { word: "先週", reading: "せんしゅう", meaning: "Tuần trước" }
    ]
  },
  {
    id: "k2", character: "週", meaning: "CHU (tuần)",
    words: [
      { word: "先週", reading: "せんしゅう", meaning: "Tuần trước" },
      { word: "週間", reading: "しゅうかん", meaning: "~ tuần (số lượng)" }
    ]
  },
  {
    id: "k3", character: "毎", meaning: "MỖI (mỗi)",
    words: [
      { word: "毎日", reading: "まいにち", meaning: "mỗi ngày" },
      { word: "毎週", reading: "まいしゅう", meaning: "mỗi tuần" },
      { word: "毎月", reading: "まいつき", meaning: "mỗi tháng" },
      { word: "毎年", reading: "まいとし", meaning: "mỗi năm" }
    ]
  },
  {
    id: "k4", character: "午", meaning: "NGỌ (giữa trưa)",
    words: [
      { word: "午前", reading: "ごぜん", meaning: "am, sáng" },
      { word: "午後", reading: "ごご", meaning: "buổi chiều, pm" }
    ]
  },
  {
    id: "k5", character: "後", meaning: "HẬU (sau)",
    words: [
      { word: "午後", reading: "ごご", meaning: "buổi chiều, pm" },
      { word: "後ろ", reading: "うしろ", meaning: "phía sau" },
      { word: "後", reading: "あと", meaning: "sau" }
    ]
  },
  {
    id: "k6", character: "見", meaning: "KIẾN (nhìn)",
    words: [
      { word: "見学", reading: "けんがく", meaning: "kiến tập" },
      { word: "見ます", reading: "みます", meaning: "nhìn" }
    ]
  },
  {
    id: "k7", character: "食", meaning: "THỰC (ăn)",
    words: [
      { word: "食べもの", reading: "たべもの", meaning: "Đồ ăn" },
      { word: "食事", reading: "しょくじ", meaning: "Dùng bữa" },
      { word: "食べます", reading: "たべます", meaning: "Ăn" }
    ]
  },
  {
    id: "k8", character: "飲", meaning: "ẨM (uống)",
    words: [
      { word: "飲食", reading: "いんしょく", meaning: "Ăn uống, ẩm thực" },
      { word: "飲みもの", reading: "のみもの", meaning: "Đồ uống" },
      { word: "飲みます", reading: "のみます", meaning: "Uống" }
    ]
  },
  {
    id: "k9", character: "買", meaning: "MÃI (mua)",
    words: [
      { word: "買いもの", reading: "かいもの", meaning: "Mua sắm" },
      { word: "買います", reading: "かいます", meaning: "mua" }
    ]
  },
  {
    id: "k10", character: "物", meaning: "VẬT (đồ vật)",
    words: [
      { word: "買い物", reading: "かいもの", meaning: "Mua sắm" },
      { word: "食べ物", reading: "たべもの", meaning: "Đồ ăn" },
      { word: "飲み物", reading: "のみもの", meaning: "Đồ uống" },
      { word: "人物", reading: "じんぶつ", meaning: "Nhân vật" },
      { word: "見物", reading: "けんぶつ", meaning: "Ngắm cảnh" }
    ]
  },
  {
    id: "k11", character: "行", meaning: "HÀNH/HÀNG (đi)",
    words: [
      { word: "行", reading: "ぎょう", meaning: "dòng (kẻ)" },
      { word: "行きます", reading: "いきます", meaning: "đi" }
    ]
  },
  {
    id: "k12", character: "休", meaning: "HƯU (nghỉ)",
    words: [
      { word: "休み", reading: "やすみ", meaning: "Nghỉ" },
      { word: "休日", reading: "きゅうじつ", meaning: "ngày nghỉ" },
      { word: "休みます", reading: "やすみます", meaning: "nghỉ" }
    ]
  }
];

lessonData.kanji = kanjiData;
fs.writeFileSync(lessonPath, JSON.stringify(lessonData, null, 2), 'utf8');


// 2. Update exercises data
const exercisePath = path.join(__dirname, '../data/exercises/n5-lesson5.json');

const exerciseData = {
  lessonId: "n5-lesson5",
  questions: [
    {
      id: "q1", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 先生",
      options: ["せんじつ", "せんせい", "せんぱい", "せんしゅう"],
      correctAnswer: "せんせい",
      explanation: "先生 (せんせい) nghĩa là giáo viên."
    },
    {
      id: "q2", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 毎日",
      options: ["まいとし", "まいにち", "まいしゅう", "まいつき"],
      correctAnswer: "まいにち",
      explanation: "毎日 (まいにち) nghĩa là mỗi ngày."
    },
    {
      id: "q3", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 見学",
      options: ["きんかく", "けんがく", "みがく", "けんぶつ"],
      correctAnswer: "けんがく",
      explanation: "見学 (けんがく) nghĩa là kiến tập / tham quan học hỏi."
    },
    {
      id: "q4", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 食事",
      options: ["しょくじ", "どくじ", "かくじ", "たべもの"],
      correctAnswer: "しょくじ",
      explanation: "食事 (しょくじ) nghĩa là dùng bữa / bữa ăn."
    },
    {
      id: "q5", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 買い物",
      options: ["はいもの", "かいもの", "まいもの", "たべもの"],
      correctAnswer: "かいもの",
      explanation: "買い物 (かいもの) nghĩa là mua sắm."
    },
    {
      id: "q6", type: "multiple_choice",
      questionText: "Chọn cách đọc kanji đúng: 休日",
      options: ["きゅうじつ", "やすみ", "あさひ", "まいにち"],
      correctAnswer: "きゅうじつ",
      explanation: "休日 (きゅうじつ) nghĩa là ngày nghỉ."
    },
    {
      id: "q7", type: "fill_in_blank",
      questionText: "Điền trợ từ thích hợp vào chỗ trống: やま___ のぼります。(Leo núi)",
      correctAnswer: "に",
      explanation: "Với động từ 登ります (leo, trèo), ta dùng trợ từ に để chỉ đích đến. (山に登ります)"
    },
    {
      id: "q8", type: "fill_in_blank",
      questionText: "Điền trợ từ thích hợp vào chỗ trống: レストラン___ しょくじします。(Dùng bữa ở nhà hàng)",
      correctAnswer: "で",
      explanation: "Xảy ra hành động (しょくじします - dùng bữa) tại một địa điểm thì dùng trợ từ で."
    },
    {
      id: "q9", type: "multiple_choice",
      questionText: "Hoàn thành câu: あそこで くるまを ___。(Đã thuê ô tô ở đằng kia)",
      options: ["借（か）りました", "はいりました", "せんたくしました"],
      correctAnswer: "借（か）りました",
      explanation: "借りました (đã mượn/thuê) phù hợp ngữ cảnh. はいりました (đã vào), せんたくしました (đã giặt giũ) không hợp nghĩa."
    },
    {
      id: "q10", type: "fill_in_blank",
      questionText: "Điền trợ từ thích hợp: あした かぞく___ 東京へ 行きます。(Ngày mai tôi đi Tokyo cùng gia đình)",
      correctAnswer: "と",
      explanation: "Làm gì cùng với ai dùng trợ từ と (かぞくと: cùng gia đình)."
    },
    {
      id: "q11", type: "multiple_choice",
      questionText: "Hoàn thành câu: きのう、天気（てんき）が ___ ですから、どこも いきませんでした。(Hôm qua, vì thời tiết... nên tôi đã không đi đâu cả)",
      options: ["わるい", "わるかった", "わるくない"],
      correctAnswer: "わるかった",
      explanation: "Sự việc trong quá khứ nên dùng わるかった (đã xấu). 'ですから' (vì) nối câu chỉ lý do."
    },
    {
      id: "q12", type: "multiple_choice",
      questionText: "Hoàn thành câu: きのうのばん DVDを みました。あまり ___ です。",
      options: ["おもしろい", "おもしろかった", "おもしろくなかった"],
      correctAnswer: "おもしろくなかった",
      explanation: "あまり đi với phủ định (không... lắm). Sự việc quá khứ nên chia phủ định quá khứ -> おもしろくなかった."
    },
    {
      id: "q13", type: "multiple_choice",
      questionText: "Hoàn thành câu: 私は あたらしいカメラ ___ ほしいです。(Tôi muốn có một chiếc máy ảnh mới)",
      options: ["が", "に", "と", "を"],
      correctAnswer: "が",
      explanation: "Cấu trúc muốn có vật gì: N + が ほしいです."
    },
    {
      id: "q14", type: "multiple_choice",
      questionText: "A: きのう やまの 天気（てんき）は どうでしたか。B: ＿＿＿＿＿＿＿。",
      options: ["いいでした", "よかったです", "いかったです", "わるいです"],
      correctAnswer: "よかったです",
      explanation: "Tính từ 'いい' (tốt/đẹp) chia quá khứ thành 'よかった' (よかったです)."
    },
    {
      id: "q15", type: "multiple_choice",
      questionText: "A: 先週（せんしゅう）、___ いきましたか。 B: いいえ、どこも いきませんでした。",
      options: ["どこか", "どこ", "なにか", "どうして"],
      correctAnswer: "どこか",
      explanation: "Hỏi 'có đi ĐÂU ĐÓ không' dùng 'どこか'. Trả lời 'いいえ' nghĩa là không đi đâu cả."
    },
    {
      id: "q16", type: "multiple_choice",
      questionText: "きのうのパーティーは あまり ___。",
      options: ["にぎやかです", "にぎやかじゃありませんでした", "にぎやかくなかったです"],
      correctAnswer: "にぎやかじゃありませんでした",
      explanation: "'にぎやか' là tính từ đuôi な. Thể phủ định quá khứ là 'にぎやかじゃありませんでした'."
    },
    {
      id: "q17", type: "multiple_choice",
      questionText: "先週の土曜日、図書館（としょかん）で べんきょうしました。___、美術館（びじゅつかん）へ いきました。",
      options: ["が", "から", "それから", "でも"],
      correctAnswer: "それから",
      explanation: "Nối 2 hành động theo trình tự thời gian dùng 'それから' (Sau đó)."
    }
  ]
};

fs.writeFileSync(exercisePath, JSON.stringify(exerciseData, null, 2), 'utf8');
console.log('Successfully updated kanji and exercises for Lesson 5.');
