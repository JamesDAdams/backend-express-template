import { PrismaClient, KanaType, CharacterType } from '@prisma/client';

const prisma = new PrismaClient();

const hiragana = [
	"あ", "い", "う", "え", "お",
	"か", "き", "く", "け", "こ",
	"さ", "し", "す", "せ", "そ",
	"た", "ち", "つ", "て", "と",
	"な", "に", "ぬ", "ね", "の",
	"は", "ひ", "ふ", "へ", "ほ",
	"ま", "み", "む", "め", "も",
	"や", "ゆ", "よ",
	"ら", "り", "る", "れ", "ろ",
	"わ", "を", "ん",
	"が", "ぎ", "ぐ", "げ", "ご",
	"ざ", "じ", "ず", "ぜ", "ぞ",
	"だ", "ぢ", "づ", "で", "ど",
	"ば", "び", "ぶ", "べ", "ぼ",
	"ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
	"きゃ", "きゅ", "きょ",
	"しゃ", "しゅ", "しょ",
	"ちゃ", "ちゅ", "ちょ",
	"にゃ", "にゅ", "にょ",
	"ひゃ", "ひゅ", "ひょ",
	"みゃ", "みゅ", "みょ",
	"りゃ", "りゅ", "りょ",
	"ぎゃ", "ぎゅ", "ぎょ",
	"じゃ", "じゅ", "じょ",
	"びゃ", "びゅ", "びょ",
	"ぴゃ", "ぴゅ", "ぴょ"
];

const katakana = [
	"ア", "イ", "ウ", "エ", "オ",
	"カ", "キ", "ク", "ケ", "コ",
	"サ", "シ", "ス", "セ", "ソ",
	"タ", "チ", "ツ", "テ", "ト",
	"ナ", "ニ", "ヌ", "ネ", "ノ",
	"ハ", "ヒ", "フ", "ヘ", "ホ",
	"マ", "ミ", "ム", "メ", "モ",
	"ヤ", "ユ", "ヨ",
	"ラ", "リ", "ル", "レ", "ロ",
	"ワ", "ヲ", "ン",
	"ガ", "ギ", "グ", "ゲ", "ゴ",
	"ザ", "ジ", "ズ", "ゼ", "ゾ",
	"ダ", "ヂ", "ヅ", "デ", "ド",
	"バ", "ビ", "ブ", "ベ", "ボ",
	"パ", "ピ", "プ", "ペ", "ポ",
	"キャ", "キュ", "キョ",
	"シャ", "シュ", "ショ",
	"チャ", "チュ", "チョ",
	"ニャ", "ニュ", "ニョ",
	"ヒャ", "ヒュ", "ヒョ",
	"ミャ", "ミュ", "ミョ",
	"リャ", "リュ", "リョ",
	"ギャ", "ギュ", "ギョ",
	"ジャ", "ジュ", "ジョ",
	"ビャ", "ビュ", "ビョ",
	"ピャ", "ピュ", "ピョ"
];

// Hiragana characters data for the new character list
const hiraganaCharacters = [
	{ "char": "あ", "romaji": "a", "groupe": 1, "svg_id": [12354], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "い", "romaji": "i", "groupe": 1, "svg_id": [12356], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "う", "romaji": "u", "groupe": 1, "svg_id": [12358], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "え", "romaji": "e", "groupe": 1, "svg_id": [12360], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "お", "romaji": "o", "groupe": 1, "svg_id": [12362], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "か", "romaji": "ka", "groupe": 2, "svg_id": [12363], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "き", "romaji": "ki", "groupe": 2, "svg_id": [12365], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "く", "romaji": "ku", "groupe": 2, "svg_id": [12367], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "け", "romaji": "ke", "groupe": 2, "svg_id": [12369], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "こ", "romaji": "ko", "groupe": 2, "svg_id": [12371], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "さ", "romaji": "sa", "groupe": 3, "svg_id": [12373], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "し", "romaji": "shi", "groupe": 3, "svg_id": [12375], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "す", "romaji": "su", "groupe": 3, "svg_id": [12377], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "せ", "romaji": "se", "groupe": 3, "svg_id": [12379], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "そ", "romaji": "so", "groupe": 3, "svg_id": [12381], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "た", "romaji": "ta", "groupe": 4, "svg_id": [12383], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ち", "romaji": "chi", "groupe": 4, "svg_id": [12385], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "つ", "romaji": "tsu", "groupe": 4, "svg_id": [12388], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "て", "romaji": "te", "groupe": 4, "svg_id": [12390], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "と", "romaji": "to", "groupe": 4, "svg_id": [12392], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "な", "romaji": "na", "groupe": 5, "svg_id": [12394], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "に", "romaji": "ni", "groupe": 5, "svg_id": [12395], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ぬ", "romaji": "nu", "groupe": 5, "svg_id": [12396], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ね", "romaji": "ne", "groupe": 5, "svg_id": [12397], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "の", "romaji": "no", "groupe": 5, "svg_id": [12398], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "は", "romaji": "ha", "groupe": 6, "svg_id": [12399], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ひ", "romaji": "hi", "groupe": 6, "svg_id": [12402], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ふ", "romaji": "fu", "groupe": 6, "svg_id": [12405], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "へ", "romaji": "he", "groupe": 6, "svg_id": [12408], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ほ", "romaji": "ho", "groupe": 6, "svg_id": [12411], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ま", "romaji": "ma", "groupe": 7, "svg_id": [12414], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "み", "romaji": "mi", "groupe": 7, "svg_id": [12415], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "む", "romaji": "mu", "groupe": 7, "svg_id": [12416], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "め", "romaji": "me", "groupe": 7, "svg_id": [12417], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "も", "romaji": "mo", "groupe": 7, "svg_id": [12418], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "や", "romaji": "ya", "groupe": 8, "svg_id": [12420], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ゆ", "romaji": "yu", "groupe": 8, "svg_id": [12422], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "よ", "romaji": "yo", "groupe": 8, "svg_id": [12424], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ら", "romaji": "ra", "groupe": 9, "svg_id": [12425], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "り", "romaji": "ri", "groupe": 9, "svg_id": [12426], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "る", "romaji": "ru", "groupe": 9, "svg_id": [12427], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "れ", "romaji": "re", "groupe": 9, "svg_id": [12428], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ろ", "romaji": "ro", "groupe": 9, "svg_id": [12429], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "わ", "romaji": "wa", "groupe": 10, "svg_id": [12431], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "を", "romaji": "wo", "groupe": 10, "svg_id": [12434], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ん", "romaji": "n", "groupe": 10, "svg_id": [12435], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "が", "romaji": "ga", "groupe": 11, "svg_id": [12364], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぎ", "romaji": "gi", "groupe": 11, "svg_id": [12366], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぐ", "romaji": "gu", "groupe": 11, "svg_id": [12368], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "げ", "romaji": "ge", "groupe": 11, "svg_id": [12370], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ご", "romaji": "go", "groupe": 11, "svg_id": [12372], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },

	{ "char": "ざ", "romaji": "za", "groupe": 12, "svg_id": [12374], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "じ", "romaji": "ji", "groupe": 12, "svg_id": [12376], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ず", "romaji": "zu", "groupe": 12, "svg_id": [12378], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぜ", "romaji": "ze", "groupe": 12, "svg_id": [12380], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぞ", "romaji": "zo", "groupe": 12, "svg_id": [12382], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },

	{ "char": "だ", "romaji": "da", "groupe": 13, "svg_id": [12384], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぢ", "romaji": "ji", "groupe": 13, "svg_id": [12386], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "づ", "romaji": "zu", "groupe": 13, "svg_id": [12389], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "で", "romaji": "de", "groupe": 13, "svg_id": [12391], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ど", "romaji": "do", "groupe": 13, "svg_id": [12393], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },

	{ "char": "ば", "romaji": "ba", "groupe": 14, "svg_id": [12400], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "び", "romaji": "bi", "groupe": 14, "svg_id": [12403], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぶ", "romaji": "bu", "groupe": 14, "svg_id": [12406], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "べ", "romaji": "be", "groupe": 14, "svg_id": [12409], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぼ", "romaji": "bo", "groupe": 14, "svg_id": [12412], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "HIRAGANA" },

	{ "char": "ぱ", "romaji": "pa", "groupe": 15, "svg_id": [12401], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぴ", "romaji": "pi", "groupe": 15, "svg_id": [12404], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぷ", "romaji": "pu", "groupe": 15, "svg_id": [12407], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぺ", "romaji": "pe", "groupe": 15, "svg_id": [12410], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "HIRAGANA" },
	{ "char": "ぽ", "romaji": "po", "groupe": 15, "svg_id": [12413], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "HIRAGANA" },

	{ "char": "きゃ", "romaji": "kya", "groupe": 16, "svg_id": [12365, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "きゅ", "romaji": "kyu", "groupe": 16, "svg_id": [12365, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "きょ", "romaji": "kyo", "groupe": 16, "svg_id": [12365, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "しゃ", "romaji": "sha", "groupe": 17, "svg_id": [12375, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "しゅ", "romaji": "shu", "groupe": 17, "svg_id": [12375, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "しょ", "romaji": "sho", "groupe": 17, "svg_id": [12375, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ちゃ", "romaji": "cha", "groupe": 18, "svg_id": [12385, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ちゅ", "romaji": "chu", "groupe": 18, "svg_id": [12385, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ちょ", "romaji": "cho", "groupe": 18, "svg_id": [12385, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "にゃ", "romaji": "nya", "groupe": 19, "svg_id": [12395, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "にゅ", "romaji": "nyu", "groupe": 19, "svg_id": [12395, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "にょ", "romaji": "nyo", "groupe": 19, "svg_id": [12395, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ひゃ", "romaji": "hya", "groupe": 20, "svg_id": [12402, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ひゅ", "romaji": "hyu", "groupe": 20, "svg_id": [12402, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ひょ", "romaji": "hyo", "groupe": 20, "svg_id": [12402, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "みゃ", "romaji": "mya", "groupe": 21, "svg_id": [12415, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "みゅ", "romaji": "myu", "groupe": 21, "svg_id": [12415, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "みょ", "romaji": "myo", "groupe": 21, "svg_id": [12415, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "りゃ", "romaji": "rya", "groupe": 22, "svg_id": [12426, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "りゅ", "romaji": "ryu", "groupe": 22, "svg_id": [12426, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "りょ", "romaji": "ryo", "groupe": 22, "svg_id": [12426, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ぎゃ", "romaji": "gya", "groupe": 23, "svg_id": [12366, 12419], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ぎゅ", "romaji": "gyu", "groupe": 23, "svg_id": [12366, 12355], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ぎょ", "romaji": "gyo", "groupe": 23, "svg_id": [12366, 12423], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "じゃ", "romaji": "ja", "groupe": 24, "svg_id": [12376, 12419], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "じゅ", "romaji": "ju", "groupe": 24, "svg_id": [12376, 12355], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "じょ", "romaji": "jo", "groupe": 24, "svg_id": [12376, 12423], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "びゃ", "romaji": "bya", "groupe": 25, "svg_id": [12403, 12419], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "びゅ", "romaji": "byu", "groupe": 25, "svg_id": [12403, 12517], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "びょ", "romaji": "byo", "groupe": 25, "svg_id": [12403, 12423], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "HIRAGANA" },

	{ "char": "ぴゃ", "romaji": "pya", "groupe": 26, "svg_id": [12404, 12419], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ぴゅ", "romaji": "pyu", "groupe": 26, "svg_id": [12404, 12517], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "HIRAGANA" },
	{ "char": "ぴょ", "romaji": "pyo", "groupe": 26, "svg_id": [12404, 12423], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "HIRAGANA" }
];

// Katakana characters data for the new character list
const katakanaCharacters = [
	{ "char": "ア", "romaji": "a", "groupe": 1, "svg_id": [12450], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "イ", "romaji": "i", "groupe": 1, "svg_id": [12452], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ウ", "romaji": "u", "groupe": 1, "svg_id": [12454], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "エ", "romaji": "e", "groupe": 1, "svg_id": [12456], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "オ", "romaji": "o", "groupe": 1, "svg_id": [12458], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "カ", "romaji": "ka", "groupe": 2, "svg_id": [12459], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "キ", "romaji": "ki", "groupe": 2, "svg_id": [12461], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ク", "romaji": "ku", "groupe": 2, "svg_id": [12463], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ケ", "romaji": "ke", "groupe": 2, "svg_id": [12465], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "コ", "romaji": "ko", "groupe": 2, "svg_id": [12467], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "サ", "romaji": "sa", "groupe": 3, "svg_id": [12469], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "シ", "romaji": "shi", "groupe": 3, "svg_id": [12471], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ス", "romaji": "su", "groupe": 3, "svg_id": [12473], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "セ", "romaji": "se", "groupe": 3, "svg_id": [12475], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ソ", "romaji": "so", "groupe": 3, "svg_id": [12477], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "タ", "romaji": "ta", "groupe": 4, "svg_id": [12479], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "チ", "romaji": "chi", "groupe": 4, "svg_id": [12481], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ツ", "romaji": "tsu", "groupe": 4, "svg_id": [12484], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "テ", "romaji": "te", "groupe": 4, "svg_id": [12486], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ト", "romaji": "to", "groupe": 4, "svg_id": [12488], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ナ", "romaji": "na", "groupe": 5, "svg_id": [12490], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ニ", "romaji": "ni", "groupe": 5, "svg_id": [12491], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヌ", "romaji": "nu", "groupe": 5, "svg_id": [12492], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ネ", "romaji": "ne", "groupe": 5, "svg_id": [12493], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ノ", "romaji": "no", "groupe": 5, "svg_id": [12494], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ハ", "romaji": "ha", "groupe": 6, "svg_id": [12495], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヒ", "romaji": "hi", "groupe": 6, "svg_id": [12498], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "フ", "romaji": "fu", "groupe": 6, "svg_id": [12501], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヘ", "romaji": "he", "groupe": 6, "svg_id": [12504], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ホ", "romaji": "ho", "groupe": 6, "svg_id": [12507], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "マ", "romaji": "ma", "groupe": 7, "svg_id": [12510], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ミ", "romaji": "mi", "groupe": 7, "svg_id": [12511], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ム", "romaji": "mu", "groupe": 7, "svg_id": [12512], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "メ", "romaji": "me", "groupe": 7, "svg_id": [12513], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "モ", "romaji": "mo", "groupe": 7, "svg_id": [12514], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ヤ", "romaji": "ya", "groupe": 8, "svg_id": [12516], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ユ", "romaji": "yu", "groupe": 8, "svg_id": [12518], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヨ", "romaji": "yo", "groupe": 8, "svg_id": [12520], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ラ", "romaji": "ra", "groupe": 9, "svg_id": [12521], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "リ", "romaji": "ri", "groupe": 9, "svg_id": [12522], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ル", "romaji": "ru", "groupe": 9, "svg_id": [12523], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "レ", "romaji": "re", "groupe": 9, "svg_id": [12524], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ロ", "romaji": "ro", "groupe": 9, "svg_id": [12525], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ワ", "romaji": "wa", "groupe": 10, "svg_id": [12526], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヲ", "romaji": "wo", "groupe": 10, "svg_id": [12530], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ン", "romaji": "n", "groupe": 10, "svg_id": [12531], "alternative_characters": false, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ガ", "romaji": "ga", "groupe": 11, "svg_id": [12460], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ギ", "romaji": "gi", "groupe": 11, "svg_id": [12462], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "グ", "romaji": "gu", "groupe": 11, "svg_id": [12464], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ゲ", "romaji": "ge", "groupe": 11, "svg_id": [12466], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ゴ", "romaji": "go", "groupe": 11, "svg_id": [12468], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },

	{ "char": "ザ", "romaji": "za", "groupe": 12, "svg_id": [12470], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ジ", "romaji": "ji", "groupe": 12, "svg_id": [12472], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ズ", "romaji": "zu", "groupe": 12, "svg_id": [12474], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ゼ", "romaji": "ze", "groupe": 12, "svg_id": [12476], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ゾ", "romaji": "zo", "groupe": 12, "svg_id": [12478], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },

	{ "char": "ダ", "romaji": "da", "groupe": 13, "svg_id": [12480], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ヂ", "romaji": "ji", "groupe": 13, "svg_id": [12482], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ヅ", "romaji": "zu", "groupe": 13, "svg_id": [12474], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "デ", "romaji": "de", "groupe": 13, "svg_id": [12487], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ド", "romaji": "do", "groupe": 13, "svg_id": [12489], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },

	{ "char": "バ", "romaji": "ba", "groupe": 14, "svg_id": [12496], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ビ", "romaji": "bi", "groupe": 14, "svg_id": [12499], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ブ", "romaji": "bu", "groupe": 14, "svg_id": [12502], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ベ", "romaji": "be", "groupe": 14, "svg_id": [12505], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ボ", "romaji": "bo", "groupe": 14, "svg_id": [12508], "alternative_characters": false, "tenten": true, "maru": false, "dakuon": true, "type": "KATAKANA" },

	{ "char": "パ", "romaji": "pa", "groupe": 15, "svg_id": [12497], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ピ", "romaji": "pi", "groupe": 15, "svg_id": [12500], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "KATAKANA" },
	{ "char": "プ", "romaji": "pu", "groupe": 15, "svg_id": [12503], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ペ", "romaji": "pe", "groupe": 15, "svg_id": [12506], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "KATAKANA" },
	{ "char": "ポ", "romaji": "po", "groupe": 15, "svg_id": [12509], "alternative_characters": false, "tenten": false, "maru": true, "dakuon": true, "type": "KATAKANA" },

	{ "char": "キャ", "romaji": "kya", "groupe": 16, "svg_id": [12461, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "キュ", "romaji": "kyu", "groupe": 16, "svg_id": [12461, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "キョ", "romaji": "kyo", "groupe": 16, "svg_id": [12461, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "シャ", "romaji": "sha", "groupe": 17, "svg_id": [12471, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "シュ", "romaji": "shu", "groupe": 17, "svg_id": [12471, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ショ", "romaji": "sho", "groupe": 17, "svg_id": [12471, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "チャ", "romaji": "cha", "groupe": 18, "svg_id": [12481, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "チュ", "romaji": "chu", "groupe": 18, "svg_id": [12481, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "チョ", "romaji": "cho", "groupe": 18, "svg_id": [12481, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ニャ", "romaji": "nya", "groupe": 19, "svg_id": [12491, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ニュ", "romaji": "nyu", "groupe": 19, "svg_id": [12491, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ニョ", "romaji": "nyo", "groupe": 19, "svg_id": [12491, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ヒャ", "romaji": "hya", "groupe": 20, "svg_id": [12499, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヒュ", "romaji": "hyu", "groupe": 20, "svg_id": [12499, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ヒョ", "romaji": "hyo", "groupe": 20, "svg_id": [12499, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ミャ", "romaji": "mya", "groupe": 21, "svg_id": [12511, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ミュ", "romaji": "myu", "groupe": 21, "svg_id": [12511, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ミョ", "romaji": "myo", "groupe": 21, "svg_id": [12511, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "リャ", "romaji": "rya", "groupe": 22, "svg_id": [12522, 12449], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "リュ", "romaji": "ryu", "groupe": 22, "svg_id": [12522, 12517], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "リョ", "romaji": "ryo", "groupe": 22, "svg_id": [12522, 12519], "alternative_characters": true, "tenten": false, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ギャ", "romaji": "gya", "groupe": 23, "svg_id": [12366, 12449], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ギュ", "romaji": "gyu", "groupe": 23, "svg_id": [12366, 12517], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ギョ", "romaji": "gyo", "groupe": 23, "svg_id": [12366, 12519], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ジャ", "romaji": "ja", "groupe": 24, "svg_id": [12471, 12449], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ジュ", "romaji": "ju", "groupe": 24, "svg_id": [12471, 12517], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ジョ", "romaji": "jo", "groupe": 24, "svg_id": [12471, 12519], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ビャ", "romaji": "bya", "groupe": 25, "svg_id": [12403, 12449], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ビュ", "romaji": "byu", "groupe": 25, "svg_id": [12403, 12517], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ビョ", "romaji": "byo", "groupe": 25, "svg_id": [12403, 12519], "alternative_characters": true, "tenten": true, "maru": false, "dakuon": false, "type": "KATAKANA" },

	{ "char": "ピャ", "romaji": "pya", "groupe": 26, "svg_id": [12404, 12449], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ピュ", "romaji": "pyu", "groupe": 26, "svg_id": [12404, 12517], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "KATAKANA" },
	{ "char": "ピョ", "romaji": "pyo", "groupe": 26, "svg_id": [12404, 12519], "alternative_characters": true, "tenten": false, "maru": true, "dakuon": false, "type": "KATAKANA" }
];

async function main() {
	// Clear existing data
	await prisma.kana.deleteMany();
	await prisma.character.deleteMany();
	await prisma.characterList.deleteMany();

	// Insert hiragana
	for (const char of hiragana) {
		await prisma.kana.create({
			data: {
				character: char,
				type: KanaType.HIRAGANA
			}
		});
	}

	// Insert katakana
	for (const char of katakana) {
		await prisma.kana.create({
			data: {
				character: char,
				type: KanaType.KATAKANA
			}
		});
	}

	// Create hiragana character list with ID 1
	const hiraganaList = await prisma.characterList.create({
		data: {
			id: 1,
			name: "hiragana",
			status: "PUBLIC"
		}
	});

	// Insert hiragana characters
	for (const charData of hiraganaCharacters) {
		// Insert character data including type field
		await prisma.character.create({
			data: {
				char: charData.char,
				romaji: charData.romaji,
				groupe: charData.groupe,
				svg_id: charData.svg_id,
				alternative_characters: charData.alternative_characters,
				tenten: charData.tenten,
				maru: charData.maru,
				dakuon: charData.dakuon,
				type: CharacterType.HIRAGANA,
				characterListId: hiraganaList.id
			}
		});
	}

	// Create katakana character list with ID 2
	const katakanaList = await prisma.characterList.create({
		data: {
			id: 2,
			name: "katakana",
			status: "PUBLIC"
		}
	});

	// Insert katakana characters
	for (const charData of katakanaCharacters) {
		await prisma.character.create({
			data: {
				char: charData.char,
				romaji: charData.romaji,
				groupe: charData.groupe,
				svg_id: charData.svg_id,
				alternative_characters: charData.alternative_characters,
				tenten: charData.tenten,
				maru: charData.maru,
				dakuon: charData.dakuon,
				type: CharacterType.KATAKANA,
				characterListId: katakanaList.id
			}
		});
	}

	console.log('Database has been seeded with Kana characters, Hiragana and Katakana character lists');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});