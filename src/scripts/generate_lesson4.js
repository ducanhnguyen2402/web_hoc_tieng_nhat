const fs = require('fs');
const path = require('path');

const lessonData = {
  id: "n5-lesson4",
  level: "N5",
  lessonNumber: 4,
  title: "Bài 4: Phương hướng, Phương tiện & Miêu tả bằng Tính từ",
  description: "Học về phương hướng, phương tiện giao thông, cách sử dụng tính từ đuôi i và đuôi na để miêu tả người, vật, địa điểm, và các phó từ chỉ mức độ.",
  vocabulary: [
    { id: "v1", word: "東", kanji: "東", hiragana: "ひがし", reading: "higashi", meaning: "Đông / Phía Đông" },
    { id: "v2", word: "西", kanji: "西", hiragana: "にし", reading: "nishi", meaning: "Tây / Phía Tây" },
    { id: "v3", word: "南", kanji: "南", hiragana: "みなみ", reading: "minami", meaning: "Nam / Phía Nam" },
    { id: "v4", word: "北", kanji: "北", hiragana: "きた", reading: "kita", meaning: "Bắc / Phía Bắc" },
    { id: "v5", word: "真ん中", kanji: "真ん中", hiragana: "まんなか", reading: "mannaka", meaning: "Chính giữa / Trung tâm" },
    { id: "v6", word: "車", kanji: "車", hiragana: "くるま", reading: "kuruma", meaning: "Ô tô" },
    { id: "v7", word: "新幹線", kanji: "新幹線", hiragana: "しんかんせん", reading: "shinkansen", meaning: "Tàu cao tốc Shinkansen" },
    { id: "v8", word: "電車", kanji: "電車", hiragana: "でんしゃ", reading: "densha", meaning: "Tàu điện" },
    { id: "v9", word: "飛行機", kanji: "飛行機", hiragana: "ひこうき", reading: "hikouki", meaning: "Máy bay" },
    { id: "v10", word: "バイク", hiragana: "バイク", reading: "baiku", meaning: "Xe máy" },
    { id: "v11", word: "自転車", kanji: "自転車", hiragana: "じてんしゃ", reading: "jitensha", meaning: "Xe đạp" },
    { id: "v12", word: "タクシー", hiragana: "タクシー", reading: "takushii", meaning: "Xe taxi" },
    { id: "v13", word: "歩いて", kanji: "歩いて", hiragana: "あるいて", reading: "aruite", meaning: "Đi bộ" },
    { id: "v14", word: "駅", kanji: "駅", hiragana: "えき", reading: "eki", meaning: "Nhà ga" },
    { id: "v15", word: "町", kanji: "町", hiragana: "まち", reading: "machi", meaning: "Thành phố / Thị trấn" },
    { id: "v16", word: "時間", kanji: "時間", hiragana: "じかん", reading: "jikan", meaning: "Tiếng / Giờ (khoảng thời gian)" },
    { id: "v17", word: "時間半", kanji: "時間半", hiragana: "じかんはん", reading: "jikanhan", meaning: "Tiếng rưỡi (vd: 1 tiếng rưỡi)" },
    { id: "v18", word: "分", kanji: "分", hiragana: "ふん", reading: "fun/pun", meaning: "Phút (khoảng thời gian)" },
    { id: "v19", word: "どのくらい", hiragana: "どのくらい", reading: "donokurai", meaning: "Bao lâu / Khoảng bao lâu" },
    { id: "v20", word: "くらい", hiragana: "くらい", reading: "kurai", meaning: "Khoảng..." }
  ],
  grammar: [
    {
      id: "g1",
      pattern: "N1 は N2(đất nước) の [hướng] です",
      structure: "N1 は N2 の [Phương hướng] です。",
      explanation: "Dùng để diễn tả vị trí của một thành phố, địa điểm nằm ở hướng nào của một đất nước hay địa phương lớn hơn.",
      examples: [
        {
          japanese: "ハノイは ベトナムの 北です。",
          furigana: "ハノイは ベトナムの [北](きた)です。",
          vietnamese: "Hà Nội ở phía Bắc của Việt Nam."
        },
        {
          japanese: "ホアン・マイは ハノイの 南です。",
          furigana: "ホアン・マイは ハノイの [南](みなみ)です。",
          vietnamese: "Hoàng Mai ở phía Nam của Hà Nội."
        }
      ]
    },
    {
      id: "g2",
      pattern: "なんでいきますか -> Phương tiện + で",
      structure: "何で (なんで) 行きますか。 -> [Phương tiện] + で 行きます。",
      explanation: "Hỏi và đáp về phương tiện di chuyển. Trợ từ 'で' đứng sau danh từ chỉ phương tiện. Riêng 'đi bộ' dùng '歩いて' (không có で).",
      examples: [
        {
          japanese: "なんで フランスへ 行きますか。",
          furigana: "なんで フランスへ [行](い)きますか。",
          vietnamese: "Bạn đi Pháp bằng gì?"
        },
        {
          japanese: "飛行機で 行きます。",
          furigana: "[飛行機](ひこうき)で [行](い)きます。",
          vietnamese: "Tôi đi bằng máy bay."
        },
        {
          japanese: "歩いて 行きます。",
          furigana: "[歩](ある)いて [行](い)きます。",
          vietnamese: "Tôi đi bộ."
        }
      ]
    },
    {
      id: "g3",
      pattern: "どのくらい かかりますか",
      structure: "A から B まで どのくらいですか / どのくらい かかりますか。",
      explanation: "Dùng để hỏi mất khoảng bao lâu để di chuyển từ điểm A đến điểm B. Trả lời bằng khoảng thời gian + 'くらい' (khoảng).",
      examples: [
        {
          japanese: "うちから 会社まで どのくらいですか。",
          furigana: "うちから [会社](かいしゃ)まで どのくらいですか。",
          vietnamese: "Từ nhà đến công ty mất khoảng bao lâu?"
        },
        {
          japanese: "電車で 20分くらいです。",
          furigana: "[電車](でんしゃ)で [二十分](にじゅっぷん)くらいです。",
          vietnamese: "Đi bằng tàu điện mất khoảng 20 phút."
        }
      ]
    },
    {
      id: "g4",
      pattern: "N は Adj です",
      structure: "[Danh từ] は [Tính từ đuôi い / đuôi な] です。",
      explanation: "Dùng tính từ để miêu tả tính chất, trạng thái của danh từ. Để hỏi 'N như thế nào?', ta dùng mẫu câu 'N は どうですか。'",
      examples: [
        {
          japanese: "このコーヒーは 熱いです。",
          furigana: "このコーヒーは [熱](あつ)いです。",
          vietnamese: "Cốc cà phê này nóng."
        },
        {
          japanese: "わかば公園は 静かです。",
          furigana: "わかば[公園](こうえん)は [静](しず)かです。",
          vietnamese: "Công viên Wakaba yên tĩnh."
        },
        {
          japanese: "鈴木さんの家は どうですか。",
          furigana: "[鈴木](すずき)さんの[家](いえ)は どうですか。",
          vietnamese: "Nhà của anh Suzuki như thế nào?"
        }
      ]
    },
    {
      id: "g5",
      pattern: "N1 は Adj + N2 です",
      structure: "N1 は [Tính từ đuôi い] + N2 です。 / N1 は [Tính từ đuôi な + な] + N2 です。",
      explanation: "Tính từ bổ nghĩa trực tiếp cho danh từ. Tính từ đuôi い giữ nguyên 'い', tính từ đuôi な thêm 'な' rồi ghép với danh từ đứng sau. Để hỏi 'N1 là nơi/vật/người như thế nào?', dùng 'どんな N2 ですか。'",
      examples: [
        {
          japanese: "富士山は 高い 山です。",
          furigana: "[富士山](ふじさん)は [高](たか)い [山](やま)です。",
          vietnamese: "Núi Phú Sĩ là ngọn núi cao."
        },
        {
          japanese: "富士山は きれいな 山です。",
          furigana: "[富士山](ふじさん)は きれいな [山](やま)です。",
          vietnamese: "Núi Phú Sĩ là ngọn núi đẹp."
        },
        {
          japanese: "みどり公園は どんな 所ですか。",
          furigana: "みどり[公園](こうえん)は どんな [所](ところ)ですか。",
          vietnamese: "Công viên Midori là nơi như thế nào?"
        }
      ]
    },
    {
      id: "g6",
      pattern: "N1 に N2 があります",
      structure: "[Địa điểm] に [Sự vật] が あります。",
      explanation: "Dùng để diễn tả sự tồn tại của đồ vật, sự vật ở một địa điểm nào đó. Trợ từ 'に' chỉ vị trí, trợ từ 'が' đi với chủ thể tồn tại.",
      examples: [
        {
          japanese: "箱根に 温泉が あります。",
          furigana: "[箱根](はこね)に [温泉](おんせん)が あります。",
          vietnamese: "Ở Hakone có suối nước nóng."
        },
        {
          japanese: "私の町に 大きい お城が あります。",
          furigana: "[私](わたし)の[町](まち)に [大](おお)きい お[城](しろ)が あります。",
          vietnamese: "Ở thành phố của tôi có một tòa lâu đài lớn."
        }
      ]
    },
    {
      id: "g7",
      pattern: "Nối câu với そして và が",
      structure: "Mệnh đề 1。そして、Mệnh đề 2。 / Mệnh đề 1 が、Mệnh đề 2。",
      explanation: "Dùng để nối 2 mệnh đề có chứa tính từ. 'そして' (Và) dùng khi 2 vế có ý nghĩa tương đồng (cùng khen hoặc cùng chê). 'が' (Nhưng) dùng khi 2 vế mang ý nghĩa trái ngược nhau.",
      examples: [
        {
          japanese: "姫路城は きれいです。そして、有名です。",
          furigana: "[姫路城](ひめじじょう)は きれいです。そして、[有名](ゆうめい)です。",
          vietnamese: "Lâu đài Himeji rất đẹp. Và còn nổi tiếng nữa."
        },
        {
          japanese: "私の部屋は 小さいですが、きれいです。",
          furigana: "[私](わたし)の[部屋](へや)は [小](ちい)さいですが、きれいです。",
          vietnamese: "Căn phòng của tôi tuy nhỏ nhưng đẹp."
        }
      ]
    },
    {
      id: "g8",
      pattern: "Phủ định của tính từ",
      structure: "Aい -> Aくないです。 / Aな -> Aじゃありません。",
      explanation: "Để chia tính từ sang dạng phủ định (hiện tại), tính từ đuôi い bỏ 'い' thêm 'くないです'. Tính từ đuôi な bỏ 'な' thêm 'じゃありません'.",
      examples: [
        {
          japanese: "このジュースは 冷たくないです。",
          furigana: "このジュースは [冷](つめ)たくないです。",
          vietnamese: "Nước ép này không lạnh."
        },
        {
          japanese: "ここは 静かじゃありません。",
          furigana: "ここは [静](しず)かじゃありません。",
          vietnamese: "Chỗ này không yên tĩnh."
        }
      ]
    },
    {
      id: "g9",
      pattern: "～ね (Nhỉ!)",
      structure: "Câu + ね。",
      explanation: "Trợ từ 'ね' đứng ở cuối câu dùng để thể hiện sự cảm thán, hoặc để xác nhận, mong muốn sự đồng tình từ người nghe.",
      examples: [
        {
          japanese: "暑いですね。",
          furigana: "[暑](あつ)いですね。",
          vietnamese: "Nóng quá nhỉ!"
        },
        {
          japanese: "天気が いいですね。",
          furigana: "[天気](てんき)が いいですね。",
          vietnamese: "Thời tiết đẹp nhỉ."
        }
      ]
    },
    {
      id: "g10",
      pattern: "とても / すこし / あまり / ぜんぜん",
      structure: "とても / すこし + [Câu khẳng định] | あまり / ぜんぜん + [Câu phủ định]",
      explanation: "Các phó từ chỉ mức độ. 'とても' (Rất) và 'すこし' (Một chút) đứng trước tính từ trong câu khẳng định. 'あまり' (Không... lắm) và 'ぜんぜん' (Hoàn toàn không...) luôn đi kèm câu dạng phủ định.",
      examples: [
        {
          japanese: "とても 大きい です。",
          furigana: "とても [大](おお)きい です。",
          vietnamese: "Rất lớn."
        },
        {
          japanese: "あまり 暑くない です。",
          furigana: "あまり [暑](あつ)くない です。",
          vietnamese: "Không nóng lắm."
        }
      ]
    },
    {
      id: "g11",
      pattern: "N(国・町)は [thời gian]、Adjです。",
      structure: "N (đất nước/thành phố) は [Thời gian]、Adj です。",
      explanation: "Dùng để miêu tả đặc điểm, thời tiết của một vùng đất vào một khoảng thời gian cụ thể trong năm (tháng, mùa).",
      examples: [
        {
          japanese: "私の国は 8月、とても 暑いです。",
          furigana: "[私](わたし)の[国](くに)は [八月](はちがつ)、とても [暑](あつ)いです。",
          vietnamese: "Đất nước tôi vào tháng 8 thì rất nóng."
        },
        {
          japanese: "私の町は 秋、天気が いいです。",
          furigana: "[私](わたし)の[町](まち)は [秋](あき)、[天気](てんき)が いいです。",
          vietnamese: "Thành phố tôi vào mùa thu thời tiết rất đẹp."
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, '../data/lessons/n5-lesson4.json'), JSON.stringify(lessonData, null, 2), 'utf8');
console.log('Successfully generated n5-lesson4.json');
