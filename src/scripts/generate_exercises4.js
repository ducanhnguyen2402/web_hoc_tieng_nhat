const fs = require('fs');
const path = require('path');

const exerciseData = {
  lessonId: "n5-lesson4",
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      questionText: "Từ nào sau đây thuộc nhóm [乗り物 - Phương tiện giao thông]?",
      options: [
        "バス",
        "真ん中",
        "教会",
        "北"
      ],
      correctAnswer: "バス",
      explanation: "バス (Xe buýt) là phương tiện giao thông. 真ん中 (Chính giữa), 北 (Bắc) chỉ hướng. 教会 (Nhà thờ)."
    },
    {
      id: "q2",
      type: "multiple_choice",
      questionText: "Chọn cách phủ định đúng của tính từ [高い] (Cao / Đắt):",
      options: [
        "高くないです",
        "高いじゃないです",
        "高いじゃありません",
        "高くありませんでした"
      ],
      correctAnswer: "高くないです",
      explanation: "高い là tính từ đuôi い. Phủ định ở hiện tại là 高くないです."
    },
    {
      id: "q3",
      type: "multiple_choice",
      questionText: "Chọn cách phủ định đúng của tính từ [静か] (Yên tĩnh):",
      options: [
        "静かくないです",
        "静かじゃありません",
        "静かいじゃないです",
        "静かなじゃありません"
      ],
      correctAnswer: "静かじゃありません",
      explanation: "静か là tính từ đuôi な. Phủ định ở hiện tại là 静かじゃありません."
    },
    {
      id: "q4",
      type: "fill_in_blank",
      questionText: "Điền trợ từ thích hợp vào chỗ trống: ホアン・マイは ハノイ ___ 南です。(Hoàng Mai ở phía Nam của Hà Nội)",
      correctAnswer: "の",
      explanation: "Cấu trúc N1 は N2 の [Phương hướng] です: N1 ở phía... của N2."
    },
    {
      id: "q5",
      type: "fill_in_blank",
      questionText: "Điền trợ từ thích hợp vào chỗ trống: 何 ___ フランスへ 行きますか。(Bạn đi Pháp bằng gì?)",
      correctAnswer: "で",
      explanation: "Trợ từ で chỉ phương tiện giao thông: 何で (bằng gì), 飛行機で (bằng máy bay)."
    },
    {
      id: "q6",
      type: "fill_in_blank",
      questionText: "Điền từ tiếng Nhật (hiragana) vào chỗ trống: 富士山は きれい ___ 山です。(Núi Phú Sĩ là ngọn núi đẹp)",
      correctAnswer: "な",
      explanation: "きれい là tính từ đuôi な. Khi bổ nghĩa cho danh từ (山), ta thêm な thành きれいな."
    },
    {
      id: "q7",
      type: "multiple_choice",
      questionText: "Chọn từ thích hợp điền vào chỗ trống: 私の部屋は 小さいです___、きれいです。(Phòng của tôi nhỏ nhưng đẹp)",
      options: [
        "が",
        "そして",
        "から",
        "ね"
      ],
      correctAnswer: "が",
      explanation: "Hai vế mang nghĩa trái ngược nhau (nhỏ >< đẹp) nên dùng trợ từ nối 'が' (nhưng)."
    },
    {
      id: "q8",
      type: "multiple_choice",
      questionText: "Chọn từ thích hợp điền vào chỗ trống: 姫路城は きれいです。___、有名です。(Lâu đài Himeji đẹp. Và còn nổi tiếng nữa)",
      options: [
        "そして",
        "が",
        "から",
        "でも"
      ],
      correctAnswer: "そして",
      explanation: "Hai vế mang nghĩa tương đồng (cùng tốt) nên dùng 'そして' (Và / Hơn nữa)."
    },
    {
      id: "q9",
      type: "multiple_choice",
      questionText: "Chọn từ thích hợp: 日本からアメリカまで [ _______ ] かかりますか。",
      options: [
        "どのくらい",
        "なん",
        "どこ",
        "だれ"
      ],
      correctAnswer: "どのくらい",
      explanation: "Hỏi về khoảng thời gian mất bao lâu, dùng 'どのくらい' (Khoảng bao lâu)."
    },
    {
      id: "q10",
      type: "multiple_choice",
      questionText: "Cách nói 'Rất lớn' trong tiếng Nhật là gì?",
      options: [
        "とても おおきいです",
        "あまり おおきいです",
        "ぜんぜん おおきいです",
        "すこし おおきいです"
      ],
      correctAnswer: "とても おおきいです",
      explanation: "とても (Rất) đi với tính từ khẳng định. すこし là 'một chút'. あまり, ぜんぜん dùng với phủ định."
    },
    {
      id: "q11",
      type: "multiple_choice",
      questionText: "Cách nói 'Không nóng lắm' trong tiếng Nhật là gì?",
      options: [
        "あまり あつくないです",
        "とても あつくないです",
        "すこし あつくないです",
        "ぜんぜん あつくないです"
      ],
      correctAnswer: "あまり あつくないです",
      explanation: "あまり + phủ định mang nghĩa 'không... lắm'. ぜんぜん + phủ định là 'hoàn toàn không'."
    },
    {
      id: "q12",
      type: "multiple_choice",
      questionText: "Trợ từ nào dùng cuối câu để thể hiện sự cảm thán (Ví dụ: Trời nóng quá nhỉ!)",
      options: [
        "ね",
        "よ",
        "か",
        "わ"
      ],
      correctAnswer: "ね",
      explanation: "Trợ từ 'ね' đặt ở cuối câu để cảm thán hoặc mong người nghe đồng tình. (あついですね - Nóng nhỉ!)"
    },
    {
      id: "q13",
      type: "ordering",
      questionText: "Sắp xếp thành câu: 'Hà Nội ở phía Bắc Việt Nam.'",
      words: [
        "ハノイ",
        "ベトナムの",
        "北",
        "です",
        "は"
      ],
      correctOrder: [
        "ハノイ",
        "は",
        "ベトナムの",
        "北",
        "です"
      ],
      explanation: "Cấu trúc: N1(thành phố) は N2(đất nước) の [hướng] です。"
    },
    {
      id: "q14",
      type: "ordering",
      questionText: "Sắp xếp thành câu: 'Từ nhà đến công ty bằng tàu điện mất khoảng 20 phút.'",
      words: [
        "会社まで",
        "うちから",
        "20分くらい",
        "電車で",
        "です"
      ],
      correctOrder: [
        "うちから",
        "会社まで",
        "電車で",
        "20分くらい",
        "です"
      ],
      explanation: "Trật tự: Điểm A から Điểm B まで + Phương tiện で + Thời gian くらい + です。"
    },
    {
      id: "q15",
      type: "ordering",
      questionText: "Sắp xếp thành câu: 'Ở Hakone có suối nước nóng.'",
      words: [
        "が",
        "箱根",
        "あります",
        "に",
        "温泉"
      ],
      correctOrder: [
        "箱根",
        "に",
        "温泉",
        "が",
        "あります"
      ],
      explanation: "Cấu trúc tồn tại: N1(địa điểm) に N2(sự vật) が あります。"
    }
  ]
};

fs.writeFileSync(path.join(__dirname, '../data/exercises/n5-lesson4.json'), JSON.stringify(exerciseData, null, 2), 'utf8');
console.log('Successfully wrote exercises to n5-lesson4.json');
