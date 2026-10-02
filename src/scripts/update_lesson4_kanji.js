const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../data/lessons/n5-lesson4.json');
let lessonData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

const kanjiData = [
  {
    id: "k1", character: "東", meaning: "ĐÔNG",
    words: [
      { word: "東", reading: "ひがし", meaning: "Phía đông" },
      { word: "東京", reading: "とうきょう", meaning: "Tokyo" }
    ]
  },
  {
    id: "k2", character: "京", meaning: "KINH",
    words: [
      { word: "東京", reading: "とうきょう", meaning: "Tokyo" }
    ]
  },
  {
    id: "k3", character: "名", meaning: "DANH",
    words: [
      { word: "名", reading: "な", meaning: "Tên" },
      { word: "名前", reading: "なまえ", meaning: "Tên" },
      { word: "名人", reading: "めいじん", meaning: "Danh nhân" }
    ]
  },
  {
    id: "k4", character: "前", meaning: "TIỀN",
    words: [
      { word: "前", reading: "まえ", meaning: "Phía trước" },
      { word: "前日", reading: "ぜんじつ", meaning: "Ngày trước" },
      { word: "名前", reading: "なまえ", meaning: "Tên" }
    ]
  },
  {
    id: "k5", character: "国", meaning: "QUỐC",
    words: [
      { word: "国", reading: "くに", meaning: "Đất nước" },
      { word: "国語", reading: "こくご", meaning: "Quốc ngữ" }
    ]
  },
  {
    id: "k6", character: "男", meaning: "NAM",
    words: [
      { word: "男", reading: "おとこ", meaning: "Đàn ông, con trai" },
      { word: "男の人", reading: "おとこのひと", meaning: "Người đàn ông" },
      { word: "男女", reading: "だんじょ", meaning: "Nam nữ" }
    ]
  },
  {
    id: "k7", character: "女", meaning: "NỮ",
    words: [
      { word: "女", reading: "おんな", meaning: "Con gái, nữ giới" },
      { word: "女の人", reading: "おんなのひと", meaning: "Người phụ nữ" },
      { word: "男女", reading: "だんじょ", meaning: "Nam nữ" }
    ]
  },
  {
    id: "k8", character: "区", meaning: "KHU",
    words: [
      { word: "区", reading: "く", meaning: "Khu, quận" },
      { word: "なごや区", reading: "なごやく", meaning: "Quận Nagoya" }
    ]
  },
  {
    id: "k9", character: "市", meaning: "THỊ",
    words: [
      { word: "市", reading: "し", meaning: "Thành phố" },
      { word: "ホーチミン市", reading: "ホーチミンし", meaning: "TP HCM" }
    ]
  }
];

lessonData.kanji = kanjiData;

fs.writeFileSync(targetPath, JSON.stringify(lessonData, null, 2), 'utf8');
console.log('Successfully updated kanji for n5-lesson4.json');
