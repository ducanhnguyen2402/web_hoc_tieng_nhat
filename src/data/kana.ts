export type KanaType = 'basic' | 'dakuten' | 'yoon';

export interface Kana {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  type: KanaType;
  row: string;
  example: {
    word: string;
    reading: string;
    meaning: string;
  };
}

export const kanaData: Kana[] = [
  // Basic A-row
  { id: 'a', hiragana: 'あ', katakana: 'ア', romaji: 'a', type: 'basic', row: 'a', example: { word: 'あき', reading: 'aki', meaning: 'mùa thu' } },
  { id: 'i', hiragana: 'い', katakana: 'イ', romaji: 'i', type: 'basic', row: 'a', example: { word: 'いぬ', reading: 'inu', meaning: 'con chó' } },
  { id: 'u', hiragana: 'う', katakana: 'ウ', romaji: 'u', type: 'basic', row: 'a', example: { word: 'うみ', reading: 'umi', meaning: 'biển' } },
  { id: 'e', hiragana: 'え', katakana: 'エ', romaji: 'e', type: 'basic', row: 'a', example: { word: 'えき', reading: 'eki', meaning: 'nhà ga' } },
  { id: 'o', hiragana: 'お', katakana: 'オ', romaji: 'o', type: 'basic', row: 'a', example: { word: 'おとこ', reading: 'otoko', meaning: 'đàn ông' } },
  // Basic K-row
  { id: 'ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', type: 'basic', row: 'k', example: { word: 'かさ', reading: 'kasa', meaning: 'cái ô' } },
  { id: 'ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', type: 'basic', row: 'k', example: { word: 'きのう', reading: 'kinou', meaning: 'hôm qua' } },
  { id: 'ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', type: 'basic', row: 'k', example: { word: 'くるま', reading: 'kuruma', meaning: 'ô tô' } },
  { id: 'ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', type: 'basic', row: 'k', example: { word: 'けさ', reading: 'kesa', meaning: 'sáng nay' } },
  { id: 'ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', type: 'basic', row: 'k', example: { word: 'こども', reading: 'kodomo', meaning: 'trẻ em' } },
  // Basic S-row
  { id: 'sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', type: 'basic', row: 's', example: { word: 'さくら', reading: 'sakura', meaning: 'hoa anh đào' } },
  { id: 'shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', type: 'basic', row: 's', example: { word: 'した', reading: 'shita', meaning: 'bên dưới' } },
  { id: 'su', hiragana: 'す', katakana: 'ス', romaji: 'su', type: 'basic', row: 's', example: { word: 'すいか', reading: 'suika', meaning: 'dưa hấu' } },
  { id: 'se', hiragana: 'せ', katakana: 'セ', romaji: 'se', type: 'basic', row: 's', example: { word: 'せんせい', reading: 'sensei', meaning: 'giáo viên' } },
  { id: 'so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', type: 'basic', row: 's', example: { word: 'そら', reading: 'sora', meaning: 'bầu trời' } },
  // Basic T-row
  { id: 'ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', type: 'basic', row: 't', example: { word: 'たべもの', reading: 'tabemono', meaning: 'đồ ăn' } },
  { id: 'chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', type: 'basic', row: 't', example: { word: 'ちかてつ', reading: 'chikatetsu', meaning: 'tàu điện ngầm' } },
  { id: 'tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', type: 'basic', row: 't', example: { word: 'つき', reading: 'tsuki', meaning: 'mặt trăng' } },
  { id: 'te', hiragana: 'て', katakana: 'テ', romaji: 'te', type: 'basic', row: 't', example: { word: 'てがみ', reading: 'tegami', meaning: 'bức thư' } },
  { id: 'to', hiragana: 'と', katakana: 'ト', romaji: 'to', type: 'basic', row: 't', example: { word: 'ともだち', reading: 'tomodachi', meaning: 'bạn bè' } },
  // Basic N-row
  { id: 'na', hiragana: 'な', katakana: 'ナ', romaji: 'na', type: 'basic', row: 'n', example: { word: 'なまえ', reading: 'namae', meaning: 'tên' } },
  { id: 'ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', type: 'basic', row: 'n', example: { word: 'にく', reading: 'niku', meaning: 'thịt' } },
  { id: 'nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', type: 'basic', row: 'n', example: { word: 'ぬの', reading: 'nuno', meaning: 'vải' } },
  { id: 'ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', type: 'basic', row: 'n', example: { word: 'ねこ', reading: 'neko', meaning: 'con mèo' } },
  { id: 'no', hiragana: 'の', katakana: 'ノ', romaji: 'no', type: 'basic', row: 'n', example: { word: 'のみもの', reading: 'nomimono', meaning: 'đồ uống' } },
  // Basic H-row
  { id: 'ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', type: 'basic', row: 'h', example: { word: 'はな', reading: 'hana', meaning: 'hoa' } },
  { id: 'hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', type: 'basic', row: 'h', example: { word: 'ひと', reading: 'hito', meaning: 'người' } },
  { id: 'fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', type: 'basic', row: 'h', example: { word: 'ふね', reading: 'fune', meaning: 'tàu thuyền' } },
  { id: 'he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', type: 'basic', row: 'h', example: { word: 'へや', reading: 'heya', meaning: 'căn phòng' } },
  { id: 'ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', type: 'basic', row: 'h', example: { word: 'ほん', reading: 'hon', meaning: 'sách' } },
  // Basic M-row
  { id: 'ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', type: 'basic', row: 'm', example: { word: 'まち', reading: 'machi', meaning: 'thành phố' } },
  { id: 'mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', type: 'basic', row: 'm', example: { word: 'みず', reading: 'mizu', meaning: 'nước' } },
  { id: 'mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', type: 'basic', row: 'm', example: { word: 'むし', reading: 'mushi', meaning: 'côn trùng' } },
  { id: 'me', hiragana: 'め', katakana: 'メ', romaji: 'me', type: 'basic', row: 'm', example: { word: 'めがね', reading: 'megane', meaning: 'mắt kính' } },
  { id: 'mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', type: 'basic', row: 'm', example: { word: 'もの', reading: 'mono', meaning: 'đồ vật' } },
  // Basic Y-row
  { id: 'ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', type: 'basic', row: 'y', example: { word: 'やま', reading: 'yama', meaning: 'ngọn núi' } },
  { id: 'yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', type: 'basic', row: 'y', example: { word: 'ゆき', reading: 'yuki', meaning: 'tuyết' } },
  { id: 'yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', type: 'basic', row: 'y', example: { word: 'よる', reading: 'yoru', meaning: 'buổi tối' } },
  // Basic R-row
  { id: 'ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', type: 'basic', row: 'r', example: { word: 'らいげつ', reading: 'raigetsu', meaning: 'tháng sau' } },
  { id: 'ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', type: 'basic', row: 'r', example: { word: 'りんご', reading: 'ringo', meaning: 'quả táo' } },
  { id: 'ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', type: 'basic', row: 'r', example: { word: 'るす', reading: 'rusu', meaning: 'vắng nhà' } },
  { id: 're', hiragana: 'れ', katakana: 'レ', romaji: 're', type: 'basic', row: 'r', example: { word: 'れきし', reading: 'rekishi', meaning: 'lịch sử' } },
  { id: 'ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', type: 'basic', row: 'r', example: { word: 'ろく', reading: 'roku', meaning: 'số 6' } },
  // Basic W/N-row
  { id: 'wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', type: 'basic', row: 'w', example: { word: 'わたし', reading: 'watashi', meaning: 'tôi' } },
  { id: 'wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', type: 'basic', row: 'w', example: { word: 'を', reading: 'wo', meaning: 'trợ từ' } },
  { id: 'n', hiragana: 'ん', katakana: 'ン', romaji: 'n', type: 'basic', row: 'w', example: { word: 'ほん', reading: 'hon', meaning: 'sách' } },

  // Dakuten (Âm đục)
  { id: 'ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', type: 'dakuten', row: 'g', example: { word: 'がっこう', reading: 'gakkou', meaning: 'trường học' } },
  { id: 'gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', type: 'dakuten', row: 'g', example: { word: 'ぎんこう', reading: 'ginkou', meaning: 'ngân hàng' } },
  { id: 'gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', type: 'dakuten', row: 'g', example: { word: 'ぐらい', reading: 'gurai', meaning: 'khoảng chừng' } },
  { id: 'ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', type: 'dakuten', row: 'g', example: { word: 'げんき', reading: 'genki', meaning: 'khỏe mạnh' } },
  { id: 'go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', type: 'dakuten', row: 'g', example: { word: 'ごはん', reading: 'gohan', meaning: 'cơm' } },

  { id: 'za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', type: 'dakuten', row: 'z', example: { word: 'ざっし', reading: 'zasshi', meaning: 'tạp chí' } },
  { id: 'ji', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', type: 'dakuten', row: 'z', example: { word: 'じかん', reading: 'jikan', meaning: 'thời gian' } },
  { id: 'zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', type: 'dakuten', row: 'z', example: { word: 'ずっと', reading: 'zutto', meaning: 'suốt' } },
  { id: 'ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', type: 'dakuten', row: 'z', example: { word: 'ぜんぶ', reading: 'zenbu', meaning: 'tất cả' } },
  { id: 'zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', type: 'dakuten', row: 'z', example: { word: 'ぞう', reading: 'zou', meaning: 'con voi' } },

  { id: 'da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', type: 'dakuten', row: 'd', example: { word: 'だいがく', reading: 'daigaku', meaning: 'đại học' } },
  { id: 'ji_d', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', type: 'dakuten', row: 'd', example: { word: 'ちぢむ', reading: 'chijimu', meaning: 'co lại' } },
  { id: 'zu_d', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', type: 'dakuten', row: 'd', example: { word: 'つづく', reading: 'tsuzuku', meaning: 'tiếp tục' } },
  { id: 'de', hiragana: 'で', katakana: 'デ', romaji: 'de', type: 'dakuten', row: 'd', example: { word: 'でんわ', reading: 'denwa', meaning: 'điện thoại' } },
  { id: 'do', hiragana: 'ど', katakana: 'ド', romaji: 'do', type: 'dakuten', row: 'd', example: { word: 'ドア', reading: 'doa', meaning: 'cánh cửa' } },

  { id: 'ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', type: 'dakuten', row: 'b', example: { word: 'ばしょ', reading: 'basho', meaning: 'địa điểm' } },
  { id: 'bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', type: 'dakuten', row: 'b', example: { word: 'びょういん', reading: 'byouin', meaning: 'bệnh viện' } },
  { id: 'bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', type: 'dakuten', row: 'b', example: { word: 'ぶたにく', reading: 'butaniku', meaning: 'thịt lợn' } },
  { id: 'be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', type: 'dakuten', row: 'b', example: { word: 'べんきょう', reading: 'benkyou', meaning: 'học tập' } },
  { id: 'bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', type: 'dakuten', row: 'b', example: { word: 'ぼうし', reading: 'boushi', meaning: 'cái mũ' } },

  { id: 'pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', type: 'dakuten', row: 'p', example: { word: 'パン', reading: 'pan', meaning: 'bánh mì' } },
  { id: 'pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', type: 'dakuten', row: 'p', example: { word: 'ピアノ', reading: 'piano', meaning: 'đàn piano' } },
  { id: 'pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', type: 'dakuten', row: 'p', example: { word: 'プール', reading: 'puuru', meaning: 'bể bơi' } },
  { id: 'pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', type: 'dakuten', row: 'p', example: { word: 'ペン', reading: 'pen', meaning: 'cái bút' } },
  { id: 'po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', type: 'dakuten', row: 'p', example: { word: 'ポケット', reading: 'poketto', meaning: 'cái túi' } },

  // Yoon (Âm ghép) - Ky
  { id: 'kya', hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', type: 'yoon', row: 'ky', example: { word: 'きゃく', reading: 'kyaku', meaning: 'khách' } },
  { id: 'kyu', hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', type: 'yoon', row: 'ky', example: { word: 'きゅうり', reading: 'kyuuri', meaning: 'dưa chuột' } },
  { id: 'kyo', hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', type: 'yoon', row: 'ky', example: { word: 'きょう', reading: 'kyou', meaning: 'hôm nay' } },
  // Yoon - Sh
  { id: 'sha', hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', type: 'yoon', row: 'sh', example: { word: 'しゃしん', reading: 'shashin', meaning: 'bức ảnh' } },
  { id: 'shu', hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', type: 'yoon', row: 'sh', example: { word: 'しゅくだい', reading: 'shukudai', meaning: 'bài tập' } },
  { id: 'sho', hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', type: 'yoon', row: 'sh', example: { word: 'しょくどう', reading: 'shokudou', meaning: 'nhà ăn' } },
  // Yoon - Ch
  { id: 'cha', hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', type: 'yoon', row: 'ch', example: { word: 'おちゃ', reading: 'ocha', meaning: 'trà' } },
  { id: 'chu', hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', type: 'yoon', row: 'ch', example: { word: 'ちゅうごく', reading: 'chuugoku', meaning: 'Trung Quốc' } },
  { id: 'cho', hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', type: 'yoon', row: 'ch', example: { word: 'ちょっと', reading: 'chotto', meaning: 'một chút' } },
  // Yoon - Ny
  { id: 'nya', hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', type: 'yoon', row: 'ny', example: { word: 'にゃん', reading: 'nyan', meaning: 'tiếng mèo kêu' } },
  { id: 'nyu', hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', type: 'yoon', row: 'ny', example: { word: 'ぎゅうにゅう', reading: 'gyuunyuu', meaning: 'sữa bò' } },
  { id: 'nyo', hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', type: 'yoon', row: 'ny', example: { word: 'にょうぼう', reading: 'nyoubou', meaning: 'người vợ' } },
  // Yoon - Hy
  { id: 'hya', hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', type: 'yoon', row: 'hy', example: { word: 'ひゃく', reading: 'hyaku', meaning: 'một trăm' } },
  { id: 'hyu', hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', type: 'yoon', row: 'hy', example: { word: 'ひゅっと', reading: 'hyutto', meaning: 'vù vù' } },
  { id: 'hyo', hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', type: 'yoon', row: 'hy', example: { word: 'ひょう', reading: 'hyou', meaning: 'biểu đồ' } },
  // Yoon - My
  { id: 'mya', hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', type: 'yoon', row: 'my', example: { word: 'みゃく', reading: 'myaku', meaning: 'mạch máu' } },
  { id: 'myu', hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', type: 'yoon', row: 'my', example: { word: 'ミュージアム', reading: 'myuujiamu', meaning: 'bảo tàng' } },
  { id: 'myo', hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', type: 'yoon', row: 'my', example: { word: 'みょうじ', reading: 'myouji', meaning: 'họ (tên)' } },
  // Yoon - Ry
  { id: 'rya', hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', type: 'yoon', row: 'ry', example: { word: 'りゃく', reading: 'ryaku', meaning: 'lược bớt' } },
  { id: 'ryu', hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', type: 'yoon', row: 'ry', example: { word: 'りゅうがく', reading: 'ryuugaku', meaning: 'du học' } },
  { id: 'ryo', hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', type: 'yoon', row: 'ry', example: { word: 'りょこう', reading: 'ryokou', meaning: 'du lịch' } },
  // Yoon - Gy
  { id: 'gya', hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', type: 'yoon', row: 'gy', example: { word: 'ぎゃく', reading: 'gyaku', meaning: 'ngược lại' } },
  { id: 'gyu', hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', type: 'yoon', row: 'gy', example: { word: 'ぎゅうにく', reading: 'gyuuniku', meaning: 'thịt bò' } },
  { id: 'gyo', hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', type: 'yoon', row: 'gy', example: { word: 'きんぎょ', reading: 'kingyo', meaning: 'cá vàng' } },
  // Yoon - J
  { id: 'ja', hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', type: 'yoon', row: 'j', example: { word: 'じゃま', reading: 'jama', meaning: 'vướng víu' } },
  { id: 'ju', hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', type: 'yoon', row: 'j', example: { word: 'じゅぎょう', reading: 'jugyou', meaning: 'giờ học' } },
  { id: 'jo', hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', type: 'yoon', row: 'j', example: { word: 'じょせい', reading: 'josei', meaning: 'phụ nữ' } },
  // Yoon - By
  { id: 'bya', hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', type: 'yoon', row: 'by', example: { word: 'さんびゃく', reading: 'sanbyaku', meaning: 'ba trăm' } },
  { id: 'byu', hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', type: 'yoon', row: 'by', example: { word: 'びゅんびゅん', reading: 'byunbyun', meaning: 'tiếng rít gió' } },
  { id: 'byo', hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', type: 'yoon', row: 'by', example: { word: 'びょうき', reading: 'byouki', meaning: 'bệnh tật' } },
  // Yoon - Py
  { id: 'pya', hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', type: 'yoon', row: 'py', example: { word: 'ろっぴゃく', reading: 'roppyaku', meaning: 'sáu trăm' } },
  { id: 'pyu', hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', type: 'yoon', row: 'py', example: { word: 'ピューレ', reading: 'pyuure', meaning: 'xay nhuyễn' } },
  { id: 'pyo', hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', type: 'yoon', row: 'py', example: { word: 'はっぴょう', reading: 'happyou', meaning: 'phát biểu' } },
];
