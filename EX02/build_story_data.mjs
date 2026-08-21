import fs from "node:fs";
import path from "node:path";

const sourcePath = path.resolve("../tmp/episode1_table.json");
const outputPath = path.resolve("data/story1.js");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const rows = source.values.slice(31).filter((row) => row[3]);

const story = rows.map((row) => ({
  no: typeof row[1] === "number" ? row[1] : null,
  speaker: row[2] || "",
  text: row[3] || "",
  character: row[4] || "",
  background: row[5] || "",
  se: row[6] || "",
  effect: row[7] || "",
  intervention: row[8] || "",
  firstStart: row[9] === "〇",
  successStart: row[10] === "〇"
}));

const payload = {
  intro: [
    "おや、こんなところに。どなたでしょうか？",
    "…まぁいいでしょう。",
    "ここは悲劇的な結末。——いわゆるBADENDが集まる場所。",
    "せっかくですし、少し見ていきますか？",
    "あぁ、そうだ。見ていくのであれば、ついでに手伝ってくれませんか？",
    "なぁに、そんなに難しい事ではありませんよ。",
    "物語に介入して、悲劇を変える。それだけです。"
  ],
  introYes: ["そうですか。それはよかった！", "実はちょっと飽き……おっと。", "それでは、こちらへどうぞ。"],
  introNo: ["そうですか。では、お帰りください。", "もう迷い込まれませんように…。", "次は、ないですよ？"],
  firstLead: ["これは、とある青年の身に起こったＢＡＤＥＮＤです。", "さぁどのような結末を迎えるのか。見てみましょう…。"],
  firstAfter: [
    "残念ながら、刺されてしまったみたいですね？",
    "それでは、こうなった原因…最初から見ていきましょうか",
    "あぁ、そうだ。この後は自由に介入して頂けます。",
    "ただ…介入といっても、大したことはできないんです。",
    "その場面で起こりうることしか出来ません。",
    "例えば……、鳥が飛んだり、何かを気にさせたり……、ですね。",
    "それによって、話が変わるかは……分かりません。",
    "あと、介入できる回数は限りがあります。お気を付けて…。"
  ],
  repeatAfter: [
    "おや、結末を変えられなかったみたいですね……。",
    "まぁそういうときもありますよね。お気を落とさず。",
    "どうやら、だいぶ執着が強い人みたいですね。",
    "スマホの連絡は無視しない方がよさそうですよ？"
  ],
  clearAfter: [
    "BADEND回避、おめでとうございます。",
    "しかし……、彼女がいるのに、他の女性に見惚れるなんて、悪い人ですね？",
    "ともあれ、これでこのBADENDは終幕です。",
    "さぁ、次のBADENDへ参りましょうか。"
  ],
  story
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `window.STORY_ONE = ${JSON.stringify(payload, null, 2)};\n`);
