export type Route = "real" | "occult";
export type Category = "people" | "evidence" | "keywords";

export type LocationId =
  | "entrance" | "manager" | "elevator"
  | "2f" | "towa" | "3f" | "305" | "4f" | "5f" | "mitsuba"
  | "6f" | "kuze" | "7f" | "702" | "8f" | "hokushin" | "8fstairs"
  | "b1" | "b3" | "b301" | "b302" | "b303" | "b304"
  | "9f" | "901" | "902" | "903" | "904";

export type Location = {
  id: LocationId;
  floor: string;
  name: string;
  image: string;
  character?: string;
  characterName?: string;
};

export const LOCATIONS: Record<LocationId, Location> = {
  entrance: { id: "entrance", floor: "1F", name: "エントランス", image: "./assets/backgrounds/bg-01-entrance.png" },
  manager: { id: "manager", floor: "1F", name: "管理人室", image: "./assets/backgrounds/bg-02-manager-office.png", character: "./assets/characters/char-05-manager.png", characterName: "管理人" },
  elevator: { id: "elevator", floor: "—", name: "エレベーター", image: "./assets/backgrounds/bg-03-elevator-interior.png" },
  "2f": { id: "2f", floor: "2F", name: "2F廊下", image: "./assets/backgrounds/bg-04-2f-corridor.png" },
  towa: { id: "towa", floor: "2F", name: "東和コピーサービス入口", image: "./assets/backgrounds/bg-04-2f-corridor.png", character: "./assets/characters/char-06-towa-copy-employee.png", characterName: "東和コピーサービス社員" },
  "3f": { id: "3f", floor: "3F", name: "3F廊下", image: "./assets/backgrounds/bg-05-3f-corridor.png" },
  "305": { id: "305", floor: "3F", name: "305号室", image: "./assets/backgrounds/bg-22-305-room.png" },
  "4f": { id: "4f", floor: "4F", name: "4F廊下", image: "./assets/backgrounds/bg-06-4f-corridor.png" },
  "5f": { id: "5f", floor: "5F", name: "5F廊下", image: "./assets/backgrounds/bg-07-5f-corridor.png" },
  mitsuba: { id: "mitsuba", floor: "5F", name: "三葉産業入口", image: "./assets/backgrounds/bg-07-5f-corridor.png", character: "./assets/characters/char-07-mitsuba-industries-employee.png", characterName: "三葉産業社員" },
  "6f": { id: "6f", floor: "6F", name: "6F廊下", image: "./assets/backgrounds/bg-08-6f-corridor.png" },
  kuze: { id: "kuze", floor: "6F", name: "久瀬ネット販売入口", image: "./assets/backgrounds/bg-08-6f-corridor.png", character: "./assets/characters/char-08-kuze-net-sales-representative.png", characterName: "久瀬ネット販売代表" },
  "7f": { id: "7f", floor: "7F", name: "7F廊下", image: "./assets/backgrounds/bg-09-7f-corridor.png" },
  "702": { id: "702", floor: "7F", name: "702号室", image: "./assets/backgrounds/bg-23-702-room.png" },
  "8f": { id: "8f", floor: "8F", name: "8F廊下", image: "./assets/backgrounds/bg-10-8f-corridor.png" },
  hokushin: { id: "hokushin", floor: "8F", name: "北辰データサービス入口", image: "./assets/backgrounds/bg-10-8f-corridor.png", character: "./assets/characters/char-09-hokushin-data-employee.png", characterName: "北辰データサービス社員" },
  "8fstairs": { id: "8fstairs", floor: "8F", name: "8F奥の階段", image: "./assets/backgrounds/bg-10-8f-corridor.png" },
  b1: { id: "b1", floor: "B1F", name: "機械室", image: "./assets/backgrounds/bg-11-b1f-machine-room.png" },
  b3: { id: "b3", floor: "B3F", name: "廊下", image: "./assets/backgrounds/bg-12-b3f-corridor.png" },
  b301: { id: "b301", floor: "B3F", name: "B301号室", image: "./assets/backgrounds/bg-13-b301-room.png" },
  b302: { id: "b302", floor: "B3F", name: "B302号室", image: "./assets/backgrounds/bg-14-b302-room.png" },
  b303: { id: "b303", floor: "B3F", name: "B303号室", image: "./assets/backgrounds/bg-15-b303-room.png" },
  b304: { id: "b304", floor: "B3F", name: "B304号室", image: "./assets/backgrounds/bg-16-b304-room.png" },
  "9f": { id: "9f", floor: "9F", name: "廊下", image: "./assets/backgrounds/bg-17-9f-corridor.png" },
  "901": { id: "901", floor: "9F", name: "901号室", image: "./assets/backgrounds/bg-18-901-room.png" },
  "902": { id: "902", floor: "9F", name: "902号室", image: "./assets/backgrounds/bg-19-902-room.png" },
  "903": { id: "903", floor: "9F", name: "903号室", image: "./assets/backgrounds/bg-20-903-room.png" },
  "904": { id: "904", floor: "9F", name: "904号室", image: "./assets/backgrounds/bg-21-904-room.png" },
};

export type InfoItem = { id: string; name: string; category: Category; description: string; image?: string };

export const INFO: Record<string, InfoItem> = {
  P01: { id: "P01", name: "日下部美希", category: "people", description: "訪問理由は『知人を訪問』。訪問先は7F・702号室 リーフプランニング。特徴は長髪の若い女性。", image: "./assets/characters/char-01-kusakabe-miki.png" },
  P02: { id: "P02", name: "篠田竜司", category: "people", description: "訪問理由は『商談』。訪問先は3F・305号室 グロウエッジ。特徴は金髪の若い男性。", image: "./assets/characters/char-02-shinoda-ryuji.png" },
  P03: { id: "P03", name: "郷田幹隆", category: "people", description: "訪問理由は『商品の受け取り』。訪問先は8F・803号室 大洋交易。特徴は厳つい見た目の男性。", image: "./assets/characters/char-03-goda-mikitaka.png" },
  P04: { id: "P04", name: "長田直子", category: "people", description: "訪問理由は『業務上の訪問』。訪問先は5F・501号室 三葉産業。特徴は初老の女性。", image: "./assets/characters/char-04-nagata-naoko.png" },
  P05: { id: "P05", name: "管理人", category: "people", description: "ビルの管理人。年齢不詳で、どことなく怪しい雰囲気の人物。", image: "./assets/characters/char-05-manager.png" },
  P06: { id: "P06", name: "東和コピーサービス社員", category: "people", description: "少しガラの悪そうな年配の男性。このビルには長くいるらしい。", image: "./assets/characters/char-06-towa-copy-employee.png" },
  P07: { id: "P07", name: "三葉産業社員", category: "people", description: "真面目そうな女性。会社にはそれなりに在籍しているらしい。", image: "./assets/characters/char-07-mitsuba-industries-employee.png" },
  P08: { id: "P08", name: "久瀬ネット販売代表", category: "people", description: "ひょろひょろで不健康そうな男性。都市伝説やオカルトに興味がある。", image: "./assets/characters/char-08-kuze-net-sales-representative.png" },
  P09: { id: "P09", name: "北辰データサービス社員", category: "people", description: "非常にテンションが高く、独特な話し方をする男性。オカルトに強い興味がある。", image: "./assets/characters/char-09-hokushin-data-employee.png" },
  E01: { id: "E01", name: "マッチングアプリのやり取りが記載された紙", category: "evidence", description: "日下部美希と相手とのやり取りが印刷された紙。相手の名前は見えないが、このビルに誘い出している。", image: "./assets/evidence/evidence-01-matching-app-printout-v2.png" },
  E02: { id: "E02", name: "胡散臭いチラシ", category: "evidence", description: "『楽して金儲け！』と書かれた勧誘チラシ。赤字で『篠田竜司　呼び出し済み』と書き込まれている。", image: "./assets/evidence/evidence-02-suspicious-flyer.png" },
  E03: { id: "E03", name: "昔、防空壕があった書類", category: "evidence", description: "このビルが建つ前、地下に防空壕があったことを示す書類。B1Fより下に空間が残っている可能性がある。", image: "./assets/evidence/evidence-03-air-raid-shelter-record.png" },
  E04: { id: "E04", name: "『特殊清掃室』と書かれた鍵", category: "evidence", description: "古びた鍵。取り付けられた札に『特殊清掃室』と書かれている。用途は不明。", image: "./assets/evidence/evidence-04-special-cleaning-room-key.png" },
  E05: { id: "E05", name: "床に広がる血痕", category: "evidence", description: "洗い流された跡があるが、床の継ぎ目や排水溝には大量の血痕が残っている。", image: "./assets/evidence/evidence-05-floor-bloodstains.png" },
  E06: { id: "E06", name: "共通処理記録", category: "evidence", description: "日付・担当記号・処理方法・清掃状況が記された一覧。直近4件の日付は失踪者の来訪日と一致している。", image: "./assets/evidence/evidence-06-common-processing-record.png" },
  E07: { id: "E07", name: "積み重なった遺体袋", category: "evidence", description: "大型の遺体袋が複数あり、不自然に膨らんでいる。", image: "./assets/backgrounds/bg-15-b303-room.png" },
  E08: { id: "E08", name: "不自然な壁の膨らみ", category: "evidence", description: "人の身体が内側から押しているように、壁の一部が不自然に膨らんでいる。", image: "./assets/backgrounds/bg-18-901-room.png" },
  E09: { id: "E09", name: "落ちている失踪者の所持品", category: "evidence", description: "4人のものと思われる私物が落ちている。どれも少し溶けているようだ。", image: "./assets/backgrounds/bg-19-902-room.png" },
  E10: { id: "E10", name: "かすかに聞こえる鼓動音", category: "evidence", description: "壁に触れると一定間隔の微かな振動が伝わる。設備音というより、生き物の鼓動に近い。" },
  E11: { id: "E11", name: "奇妙な物音", category: "evidence", description: "天井の向こうから、断続的に鼓動のような音がする。" },
  K01: { id: "K01", name: "密売に使われていた", category: "keywords", description: "大洋交易は、かつて密売に関わっていた会社らしい。" },
  K02: { id: "K02", name: "会計監査があった。", category: "keywords", description: "長田は会計監査のためにビルを訪れたらしい。" },
  K03: { id: "K03", name: "エントランスから出た形跡はない", category: "keywords", description: "4人には入館記録があるが、退館記録は残っていない。" },
  K04: { id: "K04", name: "裏口もないから、外には出られないはず", category: "keywords", description: "出入口はエントランスのみで、裏口は存在しない。" },
  K05: { id: "K05", name: "ビルの中にいる", category: "keywords", description: "退館記録がなく裏口もない以上、失踪者はまだビルの中にいるらしい。" },
  K06: { id: "K06", name: "存在しない階の噂", category: "keywords", description: "このビルには『存在しない階』があるという都市伝説。" },
  K07: { id: "K07", name: "足元の振動", category: "keywords", description: "B1Fで、機械の動きとは合わない小さな振動を足元に感じることがある。" },
  K08: { id: "K08", name: "ここの前を通った人が多い", category: "keywords", description: "奇妙な音がすると、8Fの奥へ向かう人が現れるらしい。" },
  K09: { id: "K09", name: "動いているけど、階表示がないエレベーター", category: "keywords", description: "駆動音は聞こえるのに、階表示が変わらないことがある。" },
  K10: { id: "K10", name: "8F奥の階段", category: "keywords", description: "8Fの奥に、普段は存在しない階段が現れることがある。" },
  K11: { id: "K11", name: "ポストの謎", category: "keywords", description: "エントランスのポストは、開いている位置と個数が何かに関係しているらしい。" },
  K12: { id: "K12", name: "防空壕の噂", category: "keywords", description: "地下には昔の防空壕が、埋められずに残っているという。" },
  K13: { id: "K13", name: "リーフプランニング", category: "keywords", description: "日下部美希が訪れたとされる会社。7Fにあったらしい。" },
  K14: { id: "K14", name: "グロウエッジ", category: "keywords", description: "篠田竜司が訪れたとされる会社。3Fにあったらしい。" },
  K15: { id: "K15", name: "大洋交易", category: "keywords", description: "郷田幹隆が訪れたとされる会社。8Fにあったらしい。" },
  K16: { id: "K16", name: "三葉産業", category: "keywords", description: "長田直子が訪れたとされる会社。5Fにある。" },
  K17: { id: "K17", name: "代表交代", category: "keywords", description: "長田の来訪翌日から前代表と連絡が取れず、急遽代表が交代した。" },
};

export type Investigation = {
  id: string;
  location: LocationId;
  target: string;
  text: string;
  stage?: number;
  route?: Route;
  requires?: string[];
  grants?: string[];
  image?: string;
  keypad?: "elevator" | "stairs";
};

export const INVESTIGATIONS: Investigation[] = [
  { id: "i01", location: "entrance", target: "フロア案内板", text: "B1F～8Fまで記載されている。" },
  { id: "i02", location: "entrance", target: "正面出入口", text: "外へ通じる出入口。内側からは問題なく開く。" },
  { id: "i03", location: "entrance", target: "ポスト", text: "様々な会社の残骸のようなポスト。階によって開いている数が違う。", image: "./assets/investigation/investigation-01-open-mailboxes.png" },
  { id: "i04", location: "entrance", target: "管理人室", text: "年季の入った管理人室。管理人が中にいる。" },
  { id: "i05", location: "manager", target: "来訪者記録", text: "入館記録はあるが、退館記録のない来訪者がいる。管理人に聞けば情報を得られそうだ。", grants: ["FLAG_VISITOR_LOG"] },
  { id: "i06", location: "manager", target: "室内の図面", text: "1F外周に非常口や搬入口はない。窓から出た痕跡も確認できない。", grants: ["FLAG_BLUEPRINT"] },
  { id: "i07", location: "manager", target: "遺失物箱", text: "『特殊清掃室』と書かれた古い鍵が入っている。何かに使えるのだろうか。", grants: ["E04"] },
  { id: "i08", location: "elevator", target: "階数ボタン", text: "B1F～8Fのボタンがある。階数ボタンの下部に鍵穴がある。" },
  { id: "i09", location: "elevator", target: "下部パネルの鍵穴", text: "『特殊清掃室』の鍵を差し込むと、階数ボタンが点滅し始めた。", stage: 3, route: "real", requires: ["E04"], keypad: "elevator" },
  { id: "i11", location: "2f", target: "廊下", text: "東和コピーサービスという会社だけが営業中のようだ。ほかは空室になっている。" },
  { id: "i13", location: "3f", target: "305号室の扉", text: "グロウエッジという会社があった場所。施錠されておらず、中を確認できる。", requires: ["P02"], grants: ["UNLOCK_305"] },
  { id: "i14", location: "3f", target: "廊下", text: "営業中の会社はなく、すべて空室のようだ。" },
  { id: "i15", location: "305", target: "机の引き出し", text: "『楽して金儲け！』と書かれたチラシ。赤字で『篠田竜司　呼び出し済み』とある。", grants: ["E02"], image: "./assets/evidence/evidence-02-suspicious-flyer.png" },
  { id: "i16", location: "305", target: "ホワイトボード", text: "数字と矢印が消し残されているが、意味は読み取れない。" },
  { id: "i17", location: "305", target: "窓", text: "固着しているうえ、人が外へ出られる大きさではない。" },
  { id: "i18", location: "4f", target: "廊下", text: "営業中の会社はなく、すべて空室のようだ。" },
  { id: "i21", location: "5f", target: "廊下", text: "三葉産業という会社だけが営業中のようだ。ほかは空室になっている。" },
  { id: "i23", location: "6f", target: "廊下", text: "久瀬ネット販売という会社だけが営業中のようだ。ほかは空室になっている。" },
  { id: "i25", location: "7f", target: "702号室の扉", text: "リーフプランニングという会社があった場所。施錠されておらず、中を確認できる。", requires: ["P01"], grants: ["UNLOCK_702"] },
  { id: "i26", location: "7f", target: "廊下", text: "営業中の会社はなく、すべて空室のようだ。" },
  { id: "i27", location: "702", target: "机の下", text: "失踪者とのマッチングアプリのやり取りを印刷した紙。最後はこの場所へ呼び出したところで終わっている。", grants: ["E01"], image: "./assets/evidence/evidence-01-matching-app-printout-v2.png" },
  { id: "i28", location: "702", target: "壁の社名跡", text: "『リーフプランニング』の文字跡だけが残る。家具はほぼ撤去されている。" },
  { id: "i29", location: "702", target: "窓とカーテン", text: "窓は内側から施錠され、外へ出た形跡はない。" },
  { id: "i30", location: "8f", target: "天井", text: "天井の向こうから、断続的に鼓動のような音がする。", stage: 2, grants: ["E11"] },
  { id: "i32", location: "8f", target: "廊下", text: "北辰データサービスという会社だけが営業中のようだ。ほかは空室になっている。" },
  { id: "i35", location: "8fstairs", target: "最上部の施錠扉", text: "『特殊清掃室』の鍵が合う。鍵を回すと、扉に数字入力部が現れた。", stage: 3, route: "occult", requires: ["E04"], keypad: "stairs" },
  { id: "i38", location: "b1", target: "室内", text: "清掃用品と壊れた備品がある。事件に関するものはなさそうだ。" },
  { id: "i40", location: "b3", target: "廊下", text: "湿った消毒薬と、鉄が錆びたような臭いがする。左右に4つの部屋がある。" },
  { id: "i41", location: "b301", target: "床と排水溝", text: "洗い流されているが、床の継ぎ目と排水溝に大量の血液が残っている。", grants: ["E05"], image: "./assets/evidence/evidence-05-floor-bloodstains.png" },
  { id: "i42", location: "b301", target: "壁の工具棚", text: "用途の違う工具が何種類も置かれている。すべて赤黒く汚れている。" },
  { id: "i43", location: "b302", target: "施錠机のファイル", text: "日付・担当記号・処理方法・清掃状況の一覧。直近4件は失踪者の来訪日と一致する。", grants: ["E06"], image: "./assets/evidence/evidence-06-common-processing-record.png" },
  { id: "i44", location: "b302", target: "記録の筆跡", text: "最新の4件は、筆跡も使用された筆記具も異なる。別々の人物が書いたようだ。" },
  { id: "i45", location: "b303", target: "積み上げられた袋", text: "大型の遺体袋が複数あり、不自然に膨らんでいる。", grants: ["E07"], image: "./assets/backgrounds/bg-15-b303-room.png" },
  { id: "i46", location: "b304", target: "清掃用品", text: "清掃用品が大量にある。どれも頻繁に使用されているようだ。" },
  { id: "i47", location: "9f", target: "廊下", text: "壁がゆっくり脈打ち、奥へ進むほど外の音が消えていく。" },
  { id: "i48", location: "901", target: "壁", text: "人の身体が内側から押しているように、壁の一部が不自然に膨らんでいる。", grants: ["E08"], image: "./assets/backgrounds/bg-18-901-room.png" },
  { id: "i49", location: "901", target: "壁の表面", text: "膨らみに触れると、一瞬だけ指の形がこちらを押し返してきた。" },
  { id: "i50", location: "902", target: "床の所持品", text: "失踪者4人のものと思われる私物が落ちている。どれも少し溶けているようだ。", grants: ["E09"], image: "./assets/backgrounds/bg-19-902-room.png" },
  { id: "i51", location: "902", target: "窓のような窪み", text: "外は見えず、暗い肉壁のようなものが奥で収縮している。" },
  { id: "i52", location: "903", target: "壁に耳を当てる", text: "壁に手を触れると、内側から一定の間隔で微かな振動が伝わってくる。設備音というより、生き物の鼓動に近い。", grants: ["E10"] },
  { id: "i53", location: "904", target: "中央のくぼみ", text: "部屋の中央だけ床が柔らかく沈む。飲み込まれるように足が沈んでいく。" },
];

export type Conversation = {
  id: string;
  person: string;
  location: LocationId;
  topic: string;
  text: string;
  intro?: boolean;
  repeatText?: string;
  stage?: number;
  route?: Route;
  requires?: string[];
  grants?: string[];
  hideAtStage?: number;
};

export const CONVERSATIONS: Conversation[] = [
  { id: "c01", person: "管理人", location: "manager", topic: "はじめに", intro: true, repeatText: "おや、まだ聞きたいことがおありですか？", text: "おや、何か用でしょうか？\n………あぁ、貴方が先生の言っていた助手の方？\nえぇ、話は伺ってます。\nこのビルの噂の調査でしょう？\n今入っている会社の方にも通達しているので、ご自由に調査してください。\nそれで……何か聞きたいことはありますか？", grants: ["P05"] },
  { id: "c03", person: "管理人", location: "manager", topic: "来訪者について", text: "来訪者について…ですか。\n私もこのビルの管理を引き継いであんまり経ってないのですが、\nえーっと…、入った記録はあって、出た記録がないのは、\n日下部美希、篠田竜司、郷田幹隆、長田直子の4名ですね。\nどの情報が聞きたいですか？", requires: ["FLAG_VISITOR_LOG"], grants: ["K03", "FLAG_VISITOR_TOPIC"], hideAtStage: 2 },
  { id: "c04", person: "管理人", location: "manager", topic: "日下部美希について", text: "日下部美希は…、こちらですね。\n訪問理由は「知人を訪問」\n訪問先は「7F・702号室　リーフプランニング」\n特徴は長髪の若い女性。\nとのことです。\n訪問先の会社はすでに空室ですが、\n鍵は空いてますので、調べるならご自由にどうぞ", requires: ["FLAG_VISITOR_TOPIC"], grants: ["P01", "K13"], hideAtStage: 2 },
  { id: "c05", person: "管理人", location: "manager", topic: "篠田竜司について", text: "篠田竜司は…、こちらですね。\n訪問理由は「商談」\n訪問先は「3F・305号室　グロウエッジ」\n特徴は金髪の若い男性。\nとのことです。\n訪問先の会社はすでに空室ですが、\n鍵は空いてますので、調べるならご自由にどうぞ", requires: ["FLAG_VISITOR_TOPIC"], grants: ["P02", "K14"], hideAtStage: 2 },
  { id: "c06", person: "管理人", location: "manager", topic: "郷田幹隆について", text: "郷田幹隆は…、こちらですね。\n訪問理由は「商品の受け取り」\n訪問先は「8F・803号室　大洋交易」\n特徴は厳つい見た目の男性。\nとのことです。\n訪問先の会社は既に別の会社様がはいておりますが、\n話はしてありますので、ご自由にお伺いください。", requires: ["FLAG_VISITOR_TOPIC"], grants: ["P03", "K15"], hideAtStage: 2 },
  { id: "c07", person: "管理人", location: "manager", topic: "長田直子について", text: "長田直子は…、こちらですね。\n訪問理由は「業務上の訪問」\n訪問先は「5F・501号室　三葉産業」\n特徴は初老の女性。\nとのことです。\n訪問先の会社は変わらずありますので、ご自由にお伺いください。", requires: ["FLAG_VISITOR_TOPIC"], grants: ["P04", "K16"], hideAtStage: 2 },
  { id: "c08", person: "管理人", location: "manager", topic: "このビルについて", text: "ここは昔からあるビルでして、それこそ私が子供のころからあります。\n私が管理人になったのは比較的最近のことですが、昔から「お化けビル」とか言われてましたよ" },
  { id: "c09", person: "管理人", location: "manager", topic: "調査について", text: "ご自由に調査頂いて問題ありませんよ。\n空室の扉は基本開けてありますし、入ってる会社様には通達してあります。\nどうぞ心行くまで調査してください。" },
  { id: "c10", person: "管理人", location: "manager", topic: "落とし物の鍵について", text: "あぁ、この鍵ですか。\nこの前届けられたんですが、このような場所、このビルにはないはずなんですよね…。\n気になるようでしたら、そのままお持ちになっていただいて結構ですよ。", requires: ["E04"], hideAtStage: 2 },
  { id: "c11", person: "管理人", location: "manager", topic: "建物の出入口について", text: "出入口…ですか？\nこのビルの出入り口は、エントランスの扉のみとなります。\n裏口もないので、正面からしか外には出られないはずです。", requires: ["FLAG_BLUEPRINT"], grants: ["K04"], hideAtStage: 2 },
  { id: "c12", person: "管理人", location: "manager", topic: "思い出したこと", text: "そういえば…、\n私は仕事上、B1Fに頻繁に出向くのですが、\nその時、機械の動きとは合わない小さな振動を足元に感じることがあるのです。\n昔からここにいる人なら何か知っているかもしれませんね？", stage: 2, route: "real", grants: ["K07"] },
  { id: "c13", person: "管理人", location: "manager", topic: "防空壕の噂", text: "防空壕…ですか？\nなるほど…少々お待ちください。\n\nありました。棚の奥の方に書類がありまして、\nそれによると、確かに昔防空壕があったようです。\nこの書類はお渡ししますね\n\nここへの行き方ですか…？\n残念ながら私は、存じません。\nどなたか知っていればよいのですが…。", requires: ["K12"], route: "real", grants: ["E03"] },
  { id: "c20", person: "東和コピーサービス社員", location: "towa", topic: "はじめに", intro: true, repeatText: "ん？　まだ聞きたいことあんの？", text: "はい、東和コピーサービスです！\n何かご入用でしょうか！？\n\n……調査？\nあぁ、管理人が言ってたヤツか。\n\nまぁいいや。で、何が聞きたいの？", grants: ["P06"] },
  { id: "c21", person: "東和コピーサービス社員", location: "towa", topic: "東和コピーサービスについて", text: "ウチ？\n\nウチはしがない印刷屋だよ。\n歴史だけは長いけどな。\nこのビルが建った時から入ってるし。" },
  { id: "c22", person: "東和コピーサービス社員", location: "towa", topic: "グロウエッジについて", text: "グロウエッジ…？\nあぁ、あのチャラいとこか。\n入ってすぐ潰れたっぽいけど、いかにも詐欺っぽいとこだったな", requires: ["K14"], hideAtStage: 2 },
  { id: "c23", person: "東和コピーサービス社員", location: "towa", topic: "B1Fの下について", text: "B1Fの下？　うーん…？\nあ！　そうだ！　思い出した！\nこのビルの地下って昔防空壕があったらしいんだよ。\nで、その防空壕を埋めずにビル立てたとかって噂聞いたことあったなぁ。\n管理人室なら履歴とかあるんじゃないか？", requires: ["K07"], route: "real", grants: ["K12"] },
  { id: "c24", person: "東和コピーサービス社員", location: "towa", topic: "8Fの階段奥について", text: "８Fの奥？　行ったことねぇからわからないけど…、\nあぁ～、そういや久瀬ネットのとこのがなんかブツブツ言ってたな\n８Fの暗号が何とか。\n関係あるんじゃね？", requires: ["K10"], route: "occult" },
  { id: "c30", person: "三葉産業社員", location: "mitsuba", topic: "はじめに", intro: true, repeatText: "まだ何か…？", text: "はい、三葉産業でございます。\nどのようなご用でしょうか？\n\n調査…ですか？\nはい、伺っております。\n\n何をお聞きになりたいのでしょうか？", grants: ["P07"] },
  { id: "c31", person: "三葉産業社員", location: "mitsuba", topic: "三葉産業について", text: "三葉産業について…ですか。\nこんな名前をしておりますが、仲買の会社ですね。\n古くからこのビルで事業をしております。" },
  { id: "c32", person: "三葉産業社員", location: "mitsuba", topic: "長田直子について", text: "長田様は、前社長の代の時に会計監査でお世話になっておりました。\nちょうど前社長が退任する前にもいらっしゃる予定でしたが……\nそういえば来られなかったですね…", requires: ["P04"], grants: ["K02", "K17"] },
  { id: "c33", person: "三葉産業社員", location: "mitsuba", topic: "代表交代について", text: "急に前代表と連絡が取れなくなってしまいまして…\nそれで急遽代表交代となったのです。\nそういえばその前日に長田様がいらっしゃっていたかと思います。", requires: ["K17"] },
  { id: "c34", person: "三葉産業社員", location: "mitsuba", topic: "B1Fの下について", text: "B1Fの下…ですか？\n申し訳ありませんが、存じませんね…。\nもう少しこのビルに長い方でしたら分かるかもしれません。", requires: ["K07"], route: "real" },
  { id: "c40", person: "久瀬ネット販売代表", location: "kuze", topic: "はじめに", intro: true, repeatText: "あの……まだ何か……？", text: "はい……？\nすみませんが、対面での販売は行っていないので……\n\nえ……調査？\nあー……、そんなこと言われた気がします……。\n\nといっても……僕に話せることはとくにないですよ……？\nここにきたのも最近ですし……\n\n都市伝説方面でしたら、少しは力になれるかもですが……", grants: ["P08"] },
  { id: "c41", person: "久瀬ネット販売代表", location: "kuze", topic: "久瀬ネット販売について", text: "ネットで販売をしてます……\nここは在庫をおかせてもらってる倉庫みたいなものです……" },
  { id: "c42", person: "久瀬ネット販売代表", location: "kuze", topic: "このビルの噂", text: "噂……ですか？\nそういったことに興味がおありで……！？\n\nでしたらこのビルにある噂をお話しましょう……\n\nこのビルには存在しない階があるらしいんです……\n僕も気になって追ってるんですが、そんなに芳しくなくて……\n何かわかったら僕にも教えてくださいね……？", requires: ["P01", "P02", "P03", "P04"], grants: ["K06"] },
  { id: "c43", person: "久瀬ネット販売代表", location: "kuze", topic: "８F階段の奥について", text: "おや…、その情報に行きついたんですね……。\n素晴らしいです……。\n\n私も、それ怪しいと思ってたんです……。\nでもあの階段、出るときと出ない時があって……。\n\n来る人来る人、ポストを見てるとか情報があったので、\nそれが怪しいと思ったんですが……。", requires: ["K10"], route: "occult", grants: ["K11"] },
  { id: "c44", person: "久瀬ネット販売代表", location: "kuze", topic: "都市伝説について", text: "何年か前に都市伝説であったんです……。\nビルが人を呼ぶっていう……。\n\nいろんな内容で人をビルに誘いこんで、\n誘いこまれた人はビルに動かされるがまま、取り込まれるっていう……\n\nそれがこのビルだとは思いませんでしたが……\nもしかしたら……", requires: ["K11"], route: "occult" },
  { id: "c50", person: "北辰データサービス社員", location: "hokushin", topic: "はじめに", intro: true, repeatText: "お！　調査に何か進展ございましたでしょうか？？", text: "はいドーモ！　北辰データサービスのオオタキでございまーす！\nおはようから、おやすみまで貴方のデータをお守りします！\n\nさてさてー？　お客様のご要望をお伺いしまァす！\n\n……調査？\n\nふむ……。なァーるほど！\nそういった事でございましたか！\nえぇ、えぇ分かりましたとも！\nなんでもお聞きください！", grants: ["P09"] },
  { id: "c51", person: "北辰データサービス社員", location: "hokushin", topic: "北辰データサービスについて", text: "弊社についてでございますねェ？\n\n弊社はいわゆるデータにまつわる色々なことをしてる企業になりますヨ！\nえぇ、えぇ。まったくもって健全な企業になります！" },
  { id: "c52", person: "北辰データサービス社員", location: "hokushin", topic: "大洋交易について", text: "大洋交易様は、弊社がここに入る前にあった企業様ですねェ\n\nここだけの話…、どうもあまり人に言えないお仕事してたらしいですヨ…！\n噂ですが、密売とか…。怖いですねェ！", requires: ["K15"], grants: ["K01"] },
  { id: "c53", person: "北辰データサービス社員", location: "hokushin", topic: "郷田幹隆について", text: "郷田様…ですか？\n最近はお客様自体来られてないですからねェ…\n\nおそらく大洋交易に来られたかと思いますが…、こちらにはいらしてないですねェ", requires: ["K01"] },
  { id: "c54", person: "北辰データサービス社員", location: "hokushin", topic: "地下への行き方について", text: "地下への行き方…でございますか？\nえぇ、えぇ。そう言った話、とても興味あります！\n\nそうですねぇ。ワタクシは行ったことございませんが、こんな噂を聞いたことがございます。\n「動いているけど、階表示がないエレベーター」\n\nこのビルのエレベーターは動いているときに、階表示がされるのでございますが、「動いている駆動音は聞こえるのに、\n階表示がされない」というものでございます。\n\n不思議ですねェ？　何かエレベーターに秘密があるのでしょうか？", requires: ["E03"], route: "real", grants: ["K09"] },
  { id: "c55", person: "北辰データサービス社員", location: "hokushin", topic: "エレベーターの秘密について", text: "そうですねェ……\nあぁ！　エレベーターとは直接関係あるか分かりませんが、\nこんな話もございましたヨ！\n\nその名もポストの秘密！\nエントランスにあるポスト、なぜか開いてるところがありますデショ？\nあれって、何者かが暗号のためにやってるらしいんですって！\nエレベーターと関係があるか分かりませんが、気になりますねェ！", requires: ["K09"], route: "real", grants: ["K11"] },
  { id: "c56", person: "北辰データサービス社員", location: "hokushin", topic: "奇妙な物音について", text: "あぁ、貴方にも聞こえてしまいましたかァ！？\nここ、たまに変な音が聞こえるんです。\nドクン、ドクンって…\n\n実に面白いですよねェ！\n\nそして、この音が聞こえるとですね。\nよくこの扉の前を通る人が出るんですヨ！\nこの先には何もないはずなのにねェ…！", requires: ["E11"], route: "occult", grants: ["K08"] },
  { id: "c57", person: "北辰データサービス社員", location: "hokushin", topic: "その人たちの行方について", text: "えぇ、えぇ。もちろんついていきましたとも！\nそんな面白そうなこと、このワタクシが見逃すはずござァません！\n\nでも…残念ながらみなさん階段を上った後、何かカチャカチャやって奥に消えちゃったんです！\n\n急いで向かったんですけど、鍵穴っぽいのしかなくて進めなかったんですよねェ…\n\nそういえば、あの人たち、みんな目が虚ろだったような…。", requires: ["K08"], route: "occult", grants: ["K10"] },
];

export type DeductionQuestion = {
  id: string;
  stage: number;
  title: string;
  slots: Category[];
  real: { answer: string; ids: string[] };
  occult: { answer: string; ids: string[] };
};

export const DEDUCTIONS: DeductionQuestion[] = [
  { id: "d11", stage: 1, title: "このビルで消えたのは誰か？", slots: ["people", "people", "people", "people"], real: { answer: "4人の来訪者", ids: ["P01", "P02", "P03", "P04"] }, occult: { answer: "4人の来訪者", ids: ["P01", "P02", "P03", "P04"] } },
  { id: "d12", stage: 1, title: "失踪者たちが訪れた本当の理由は？", slots: ["evidence", "evidence", "keywords", "keywords"], real: { answer: "それぞれ別の理由で呼び出された", ids: ["E01", "E02", "K01", "K02"] }, occult: { answer: "それぞれ別の理由で呼び出された", ids: ["E01", "E02", "K01", "K02"] } },
  { id: "d13", stage: 1, title: "失踪者たちはどこへ消えた？", slots: ["keywords", "keywords", "keywords", "keywords"], real: { answer: "存在しないはずの階", ids: ["K03", "K04", "K05", "K06"] }, occult: { answer: "存在しないはずの階", ids: ["K03", "K04", "K05", "K06"] } },
  { id: "d21", stage: 2, title: "存在しない階はどこにある？", slots: ["evidence", "keywords"], real: { answer: "B1Fより地下", ids: ["E03", "K07"] }, occult: { answer: "9F", ids: ["E11", "K08"] } },
  { id: "d22", stage: 2, title: "その階へつながっている場所は？", slots: ["keywords"], real: { answer: "エレベーター", ids: ["K09"] }, occult: { answer: "階段", ids: ["K10"] } },
  { id: "d23", stage: 2, title: "どうすれば、その階へ行ける？", slots: ["evidence", "keywords"], real: { answer: "鍵を使い、階数ボタンを特定の順で押す", ids: ["E04", "K11"] }, occult: { answer: "鍵を使い、暗証番号を入力する", ids: ["E04", "K11"] } },
  { id: "d31", stage: 3, title: "失踪者たちはどうなった？", slots: ["evidence", "evidence", "evidence"], real: { answer: "それぞれ殺害され、遺体を処理された", ids: ["E05", "E06", "E07"] }, occult: { answer: "ビルに取り込まれ、その一部になった", ids: ["E08", "E09", "E10"] } },
];

export const OPENING_CALL = "あ、もしもし？\nちょうどついたころかと思ってね。\n\n今回は調査に協力してくれてありがとう。\n早速なんだけど、\n君の端末に「推理ボード」を送っておいた\n\n調べたり、人に聞いた情報から、\nその推理ボードを組み立ててほしいんだ\n\nじゃ、任せたよ";

export const FINAL_CALLS: Record<Route, string> = {
  real: "やぁ\n推理ボード、こちらからも見させてもらったよ。\n\n随分と凄惨な事件があったようだね。\n察するに、別々の犯人による、\n共同の処理場ってところかな？\n\nいやー、人っていうのは怖いものだよね。\n\nとにかく、状況は分かった。\n速やかに帰ってきてくれ。",
  occult: "やぁ\n推理ボード、こちらからも見させてもらったよ。\n\n随分と面白いことになってるみたいだね？\n私もそっちに行ければよかったなぁ……\n\nおっと、無駄話をしている余裕はないね。\nこのままだと君まで、\n飲み込まれてしまうかもしれない。\n速やかに帰ってきてくれ。",
};
