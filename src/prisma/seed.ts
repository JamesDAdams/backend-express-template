import { PrismaClient, KanaType } from '@prisma/client';

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

async function main() {
	// Clear existing data
	await prisma.kana.deleteMany();

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

	console.log('Database has been seeded with Kana characters');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});