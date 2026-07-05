const game = {
  route: '共通ルート',
  waiting: 'intro',
  flags: new Set(),
  visited: new Set(),
  busy: false
};

const DESTINATIONS = {
  'おおとりコースター': 'A',
  'メリーゴーラウンド': 'A',
  'スーパーパイレーツ': 'A',
  '大観覧車': 'A',
  '回転ブランコ': 'A',
  'ゴーゴーゴーカート': 'A',
  '千枚ミラーハウス': 'B',
  '呪いの図書館': 'C',
  'ショーステージ': 'D',
  'スタッフルーム': 'E',
  '入口': 'Z',
  '入り口': 'Z',
  'いりぐち': 'Z'
};

const ROUTE_LABELS = {
  A: 'Aルート', B: 'Bルート', C: 'Cルート', D: 'Dルート', E: 'Eルート', Z: 'Zルート',
  E1: 'E1ルート', E2: 'E2ルート', E3: 'E3ルート',
  B1: 'B1ルート', B2: 'B2ルート', B3: 'B3ルート', B4: 'B4ルート',
  D1: 'D1ルート', D2: 'D2ルート', D4: 'D4ルート',
  C2: 'C2ルート', C4: 'C4ルート',
  Z1: 'Z1ルート', Z2: 'Z2ルート', Z3: 'Z3ルート', Z9: 'Z9ルート'
};

const WRONG_DEST = 'ふむ…？\n正式名称でお願いしていいかい？\n認識の齟齬があると危険だからね';
const WRONG_QUIZ = '本当にそうだろうか？\n私にはそうは思えないが…。';

const CHAT_IMG = {
  dialLock: 'assets/img/chat_dial_lock.jpg',
  staffRoom: 'assets/img/chat_staff_room.jpg',
  mirrorPhoto: 'assets/img/chat_mirror_photo.jpg',
  brokenMonument: 'assets/img/chat_broken_monument.jpg',
  burnedBusinessCard: 'assets/img/chat_burned_business_card.jpg',
  moritakaSelfie: 'assets/img/chat_moritaka_selfie.jpg',
  endingEmptyChair: 'assets/img/ending_empty_chair.jpg',
  endingMoritakaChair: 'assets/img/ending_moritaka_chair.jpg'
};


function initChat() {
  setupChatMenu();
  hideRouteDisplay();

  startNewChat({ keepSave: true });
}

function startNewChat(options = {}) {
  game.route = '共通ルート';
  game.waiting = 'intro';
  game.flags = new Set();
  game.visited = new Set();
  game.busy = false;

  const log = document.getElementById('chatLog');
  if (log) log.innerHTML = '';

  hideRouteDisplay();

  say([
    'やぁ',
    'こんにちは',
    'あるいは、はじめまして　かな？'
  ], () => {
    game.waiting = 'introReply';
  });
}

function bot(text, type = 'moritaka') { addBubble(text, type); }
function player(text) { addBubble(text, 'player'); }
function system(text) { addBubble(text, 'system'); }

function addBubble(text, type) {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'bubble ' + type;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function addImageBubble(src, alt = '送信画像', caption = '') {
  const log = document.getElementById('chatLog');
  const div = document.createElement('div');
  div.className = 'bubble moritaka image-bubble';

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';

  div.appendChild(img);

  if (caption) {
    const p = document.createElement('p');
    p.className = 'image-caption';
    p.textContent = caption;
    div.appendChild(p);
  }

  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function photo(src, alt = '送信画像', caption = '') {
  return { photo: true, src, alt, caption };
}

function setRoute(route) {
  game.route = ROUTE_LABELS[route] || route;

  const routeLabel = document.getElementById('routeLabel');
  if (routeLabel) {
    routeLabel.textContent = '';
    routeLabel.style.display = 'none';
  }
}

const CHAT_SPEED = {
  firstReply: 2000,
  normal: 1400,
  photo: 3000,
  wait: 3500,
  longWait: 5000
};

function isWaitCommand(line) {
  if (typeof line !== 'string') return false;
  return line.trim().toLowerCase().startsWith('wait:') ||
         line.trim().toLowerCase().startsWith('weit:');
}

function getWaitValue(line) {
  const value = Number(String(line).split(':')[1]);
  return value || CHAT_SPEED.wait;
}

function getChatDelay(line) {
  if (typeof line === 'object' && line !== null && line.photo) {
    return CHAT_SPEED.photo;
  }

  if (typeof line === 'object' && line !== null && line.wait) {
    return Number(line.wait) || CHAT_SPEED.wait;
  }

  if (isWaitCommand(line)) {
    return getWaitValue(line);
  }

  if (typeof line !== 'string') {
    return CHAT_SPEED.normal;
  }

  if (line.includes('写真送信')) {
    return CHAT_SPEED.photo;
  }

  if (line.includes('………') || line.includes('……')) {
    return CHAT_SPEED.longWait;
  }

  return CHAT_SPEED.normal;
}

function say(lines, done) {
  game.busy = true;
  const arr = Array.isArray(lines) ? lines : [lines];
  let i = 0;

  const next = () => {
    if (i >= arr.length) {
      game.busy = false;
      if (done) done();
      return;
    }

    const line = arr[i++];
    const delay = getChatDelay(line);

    if (typeof line === 'object' && line !== null && line.wait) {
      setTimeout(next, delay);
      return;
    }

    if (typeof line === 'object' && line !== null && line.photo) {
      addImageBubble(line.src, line.alt, line.caption);
      setTimeout(next, delay);
      return;
    }

    if (isWaitCommand(line)) {
      setTimeout(next, delay);
      return;
    }

    bot(line);
    setTimeout(next, delay);
  };

  setTimeout(next, CHAT_SPEED.firstReply);
}

function waitDestination(prompt = 'では、どこへ向かおうか。') {
  game.waiting = 'destination';
  say(prompt);
}

function handleChat(raw) {
  const text = raw.trim();
  if (!text) return;
  player(text);
  if (game.busy) return;
  if (handleCasual(text)) return;

  if (game.waiting === 'introReply') return continueIntro();
  if (game.waiting === 'destination') return handleDestination(text);
  if (game.waiting === 'ePass') return handleStaffPassword(text);
  if (game.waiting === 'mirrorInfo') return handleMirrorInfo(text);
  if (game.waiting === 'mirrorPhrase') return handleMirrorPhrase(text);
  if (game.waiting === 'stageSearch') return handleStageSearch(text);
  if (game.waiting === 'ready') return handleReady(text);
  if (game.waiting && game.waiting.startsWith('quiz')) return handleQuiz(text);

  say(WRONG_DEST);
}

function continueIntro() {
  say([
    '今日は調査に協力してくれてありがとう。',
    'ここは、廃園となった「おおとり遊園地」',
    'とある筋から、ここで不可解な現象が起きている、と聞いてね。',
    'それは「神隠しに遭う」というものだ',
    'もちろん、ただの家出等かもしれないが…\nもしかしたら本当に「神隠し」かもしれない',
    'だから調査に来た、というわけだ。',
    'あぁ、許可は取っているから安心してくれ。',
    'さて、前置きが長くなったが、\n調査を始めよう',
    '………と、言っても、私はただの学者だ。',
    '闇雲に探すとしても、時間がかかりすぎる\nだから、君に協力してもらおうかと思ってね。',
    'あ、もしすべてが分かったら、一度「入口」に戻ってこよう。\nそこで答え合わせとしよう。',
    'さぁ、どこへ行ったらいいと思う？'
  ], () => { game.waiting = 'destination'; });
}

function handleCasual(text) {
  const finalZone = game.route.startsWith('Z') || game.waiting === 'ready' || (game.waiting || '').startsWith('quiz');
  const entries = [
    [['格好いい', 'かっこいい'], finalZone ? 'おや、嬉しいね。' : 'そうかい？　ありがとう'],
    [['可愛い', 'かわいい'], finalZone ? 'そう言っている君の方が可愛いと思うけどね。' : '可愛いって…、はは、面白い人だね'],
    [['好き', 'すき'], finalZone ? '好意はありがたく受け取っておこう。' : 'ほう、ありがとう'],
    [['自撮り', 'じどり'], finalZone ? ['しょうがないな…', photo(CHAT_IMG.moritakaSelfie, '口から下の自撮り画像', '口から下の自撮り画像')] : '私の自撮りかい？\n調査が終わったらね'],
    [['怖い', 'こわい'], finalZone ? 'そうかい？' : '怖い？　ふむ…。何か憑いているかもしれないね'],
    [['帰れ', 'かえれ'], finalZone ? 'あぁ、調査が完了次第ね。' : '調査はまだ終わってないんだが…'],
    [['年齢', '歳'], finalZone ? 'そんなに気になるかい？\nそれなりに歳は重ねてるよ' : '私の歳？\nうーん、非公開ってことで。']
  ];
  const hit = entries.find(([words]) => words.some(w => text.includes(w)));
  if (hit) { say(hit[1]); return true; }
  return false;
}

function destinationKey(text) {
  return Object.keys(DESTINATIONS).find(k => text.includes(k));
}

function handleDestination(text) {
  const key = destinationKey(text);
  if (!key) return say(WRONG_DEST);
  const route = DESTINATIONS[key];
  setRoute(route);

  if (route === 'A') return routeA(key);
  if (route === 'B') return routeB();
  if (route === 'C') return routeC();
  if (route === 'D') return routeD();
  if (route === 'E') return routeE();
  if (route === 'Z') return routeZ();
}

function routeA(key) {
  game.visited.add('A');
  say([
    '行ってみよう',
    'Weit:3500',
    '到着した。',
    'ふむ…。人が立ち入った形跡はないようだね。',
    'ここは関係ないんじゃないかな？',
    '次はどこへ行ったらいいかい？'
  ], () => { game.waiting = 'destination'; });
}

function routeE() {
  if (game.flags.has('staffOpen')) {
    setRoute('E3');
    return say(['ここで見るべきはもうないと思うが…。\n違う場所に行った方がいいだろう。', 'では、どこへ向かおうか。'], () => { game.waiting = 'destination'; });
  }
  setRoute('E');
  game.visited.add('E');
  say([
    'スタッフルーム…か。確かに何かありそうだ。',
    '向かってみよう',
    'Weit:3500',
    '着いた…が、鍵がかかってるな',
    'シンプルな4桁のダイアル錠だ',
    photo(CHAT_IMG.dialLock, 'ダイアル錠の写真', 'ダイアル錠の写真'),
    'ふむ…。番号に覚えはあるかい？'
  ], () => { game.waiting = 'ePass'; });
}

function handleStaffPassword(text) {
  if (text.includes('2013') || text.includes('２０１３')) {
    game.flags.add('staffOpen');
    setRoute('E1');
    return say([
      'お、開いた。流石だね。',
      'さて、中に何があるかな…？',
      '中はこんな感じだね',
      photo(CHAT_IMG.staffRoom, 'スタッフルームの中の写真', 'スタッフルームの中の写真'),
      'これは………報告書か',
      'なるほど。\n「千枚ミラーハウスの事故の報告書」みたいだね。\nデータもあるらしい。',
      '君も確認してみてくれ',
      'しかし……これは怪しい。\n直接現場を見たいね。',
      'さて、あらかた見終わったかな。',
      'では、どこへ向かおうか。'
    ], () => { game.waiting = 'destination'; });
  }
  if (text.includes('戻る') || text.includes('もどる')) {
    setRoute('E2');
    return waitDestination('では、どこへ向かおうか。');
  }
  say('………違うようだ。\n他の場所に向かうなら、「戻る」と教えてくれ');
}

function routeB() {
  if (game.flags.has('mirrorDone')) {
    setRoute('B4');
    return say(['ここで見るべきはもうないと思うが…。\n違う場所に行った方がいいだろう。', 'では、次はどこへ向かおうか。'], () => { game.waiting = 'destination'; });
  }
  setRoute('B');
  game.visited.add('B');
  say([
    '千枚ミラーハウスか。\nわかった。',
    '到着した。',
    'Weit:2500',
    'ここは、HPのお知らせにも書いてあった場所だね。\n早速中に入ってみよう',
    'ふむ…',
    'ここは、ちょうど中央ぐらいだね。\n小部屋になっている。',
    '私も調べてみるが、ここについての何か情報はあるかい？'
  ], () => { game.waiting = 'mirrorInfo'; });
}

function handleMirrorInfo(text) {
  if (['隠し扉', '隠しドア', '扉', '隠扉', '隠し戸', '隠戸'].some(w => text.includes(w))) {
    setRoute('B1');
    return say([
      '隠し扉…？\nふむ。調べてみよう',
      'お、この壁、回転扉みたいになっているな。',
      'お手柄だ。さぁ先に行ってみよう。',
      photo(CHAT_IMG.mirrorPhoto, 'ミラーハウスの鏡の写真', 'ミラーハウスの鏡の写真'),
      'どうやらここが突き当りのようだ。',
      'この文字、明らかに怪しいが……',
      '「贄に捧げる」…一部掠れて読めないな',
      '君には分かるかい？'
    ], () => { game.waiting = 'mirrorPhrase'; });
  }
  if (['進む', 'すすむ', '出る', 'でる'].some(w => text.includes(w))) {
    setRoute('B3');
    return waitDestination('では、次はどこへ向かおうか。');
  }
  say('ふむ…？\nもしこの場所の調査を切り上げるなら「出る」と教えてくれ');
}

function handleMirrorPhrase(text) {
  if (text.includes('我を贄に捧げる')) {
    game.flags.add('mirrorDone');
    setRoute('B2');
    return say([
      '………ふむ。なるほど。',
      '確かにそう見える。',
      'これは無暗に口に出してはいけなそうだね',
      '他には特に気になるものもなさそうだし、\n一旦出てから考えよう',
      'よし、外に出た。',
      '先ほどの文言、儀式などに使われる言葉のようにも思える',
      '特定の場所にて、口に出すことで儀式に参加するような、ね。',
      '何か文献があるかもしれない。\n先ほどの言葉、調べておいてくれると助かる。',
      'では、次はどこへ向かおうか。'
    ], () => { game.waiting = 'destination'; });
  }
  if (['出る', 'でる'].some(w => text.includes(w))) {
    setRoute('B3');
    return waitDestination('では、次はどこへ向かおうか。');
  }
  say('何かしっくりこないな…\nもしこの場所の調査を切り上げるなら「出る」と教えてくれ');
}

function routeD() {
  if (game.flags.has('stageDone')) {
    setRoute('D4');
    return say(['ここで見るべきはもうないと思うが…。\n違う場所に行った方がいいだろう。', '次はどこへ向かおうか。'], () => { game.waiting = 'destination'; });
  }
  setRoute('D');
  game.visited.add('D');
  say([
    'ショーステージだね。\n何かあればいいが…',
    'Weit:3500',
    '到着した。',
    'ふむ、控室には鍵がかかっており、入れないみたいだ。',
    'ステージ上も怪しいところはなさそうだ。',
    '他に、ここで調べるべきところに検討はつくかい？'
  ], () => { game.waiting = 'stageSearch'; });
}

function handleStageSearch(text) {
  if (['裏', 'うら', 'ウラ', '後ろ', 'うしろ', 'ショーステージの裏', '石の墓', '石碑'].some(w => text.includes(w))) {
    game.flags.add('stageDone');
    setRoute('D1');
    return say([
      'ショーステージの裏…？\n見てみよう。',
      'ほう…これは…',
      photo(CHAT_IMG.brokenMonument, '破壊された石碑', '破壊された石碑'),
      'どうやら石碑のようだ。',
      'ふむふむ！　いいね。',
      '私の好きな展開になってきたようだ。',
      'おっと……失礼した。',
      '石碑を調べてみたが、\n文字はほとんど削れてしまっているようだ',
      'かろうじて読めるところとしては、\n祭司と記載されているところに、丈一郎と書かれている',
      '残念ながら、苗字はつぶれて読めないな…',
      'さて、ここで調べられることはこれぐらいか',
      '次はどこへ向かおうか。'
    ], () => { game.waiting = 'destination'; });
  }
  if (['出る', 'でる'].some(w => text.includes(w))) {
    setRoute('D2');
    return waitDestination('次はどこへ向かおうか。');
  }
  say('ふむ……？　何もなさそうだ。\nどこかを指定してくれると助かる。\nもしこの場所の調査を切り上げるなら「出る」と教えてくれ');
}

function routeC() {
  if (game.flags.has('libraryDone')) {
    setRoute('C4');
    return say(['ここで見るべきはもうないと思うが…。\n違う場所に行った方がいいだろう。', '次はどこへ向かおうか。'], () => { game.waiting = 'destination'; });
  }
  game.flags.add('libraryDone');
  setRoute('C');
  say([
    '呪いの図書館か。',
    'わかった。向かおう',
    'Weit:3500',
    '到着した。さっそく入ってみよう',
    'ふむ…。中に変わった様子はないが…\nん？',
    'あぁ失礼。　何かいたような気がしたのだが…',
    '気のせいのようだ',
    'ここに痕跡はなさそうだね',
    '次はどこへ向かおうか。'
  ], () => { game.waiting = 'destination'; });
}

function routeZ() {
  setRoute('Z');
  say([
    'ほう',
    'わかった。一度戻ろうか。',
    'Weit:3500',
    '入口についたよ。',
    'さて、入口に戻ってきたということは……おや？',
    'あぁ、来た時には気が付かなかったが、\n門のところにこんなものが落ちていてね',
    photo(CHAT_IMG.burnedBusinessCard, '半分に焼け焦げた名刺', '半分に焼け焦げた名刺'),
    '特に関係はなさそうかな…？\nいやしかし…？',
    'おっと、脱線するところだった。',
    'さぁ答え合わせをしようかと思うが',
    '準備はいいかな？'
  ], () => { game.waiting = 'ready'; });
}

function handleReady(text) {
  if (['OK', 'オーケー', 'はい', '始めよう', 'スタート', '開始', 'いいよ'].some(w => text.includes(w))) {
    setRoute('Z1');
    return say([
      'それでは始めよう。\nもし途中で答え合わせを辞めたくなったら、\n「終了」と送ってくれ',
      '1つ目',
      'この遊園地の、閉園時の園長は誰だった？'
    ], () => { game.waiting = 'quiz1'; });
  }
  if (['いいえ', 'だめ', 'ダメ', 'まだ', '戻って', '戻れ', '無理', 'NO', 'ノー', 'いや', '違う'].some(w => text.includes(w))) {
    setRoute('Z9');
    return say(['おや、まだ調査が足りないかな？', 'よし、それではどこへ向かう？'], () => { game.waiting = 'destination'; });
  }
  say('うん？　始めていいなら「はい」\nまだなら「いいえ」で答えてもらってもいいかな？');
}

function handleQuiz(text) {
  if (text.includes('終了')) {
    setRoute('Z9');
    return say(['おや、まだ調査が足りないかな？', 'よし、それではどこへ向かう？'], () => { game.waiting = 'destination'; });
  }

  if (game.waiting === 'quiz1') {
    if (['鳳丈一郎', 'おおとり丈一郎', '青木丈一郎'].some(w => text.includes(w))) {
      return say(['私もそう思う。', '丈一郎氏が最後の園長だった', 'では2つ目', '被害者と思われる人々はどうなっている？'], () => { game.waiting = 'quiz2'; });
    }
    return say('本当にそうだったのだろうか？\n私にはそうは思えないが…。');
  }

  if (game.waiting === 'quiz2') {
    if (['逃がされている', '逃げている', '生きている', 'いきている', '脱出している', '逃げた', '助かった', '避難'].some(w => text.includes(w)) || text === '生') {
      setRoute('Z3');
      return say(['ほう…？　それは興味深い。', 'で、あるならばだが、丈一郎氏はなぜ儀式模していた？', 'そうしなければならなかった？', 'なぜだろうか？'], () => { game.waiting = 'quiz6'; });
    }
    if (['死んでいる', '死を与えられている', '殺害されている', 'しんでいる', '贄人', '埋められている'].some(w => text.includes(w)) || text === '死') {
      setRoute('Z2');
      return say(['そうだね。', 'おそらくもう殺害されてしまっているだろう。', 'では次だ', 'この場所には昔、村があった。村の名前は何だったのだろう？'], () => { game.waiting = 'quiz3'; });
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz3') {
    if (['鳳村', 'おおとり村', 'おおとりむら'].some(w => text.includes(w))) {
      return say(['そう。鳳村だ。', 'ここまでくると何があったかわかってくるね', 'それでは次だ', '丈一郎氏は、\n被害者と思われる人を使って何をした？'], () => { game.waiting = 'quiz4'; });
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz4') {
    if (['豊穣の儀', '豊穣', '儀式', 'ほうじょうのぎ'].some(w => text.includes(w)) || text === '儀') {
      return say(['豊穣の儀', 'どうやらそのような儀式があったようだね', 'それによって、遊園地を盛り返そうとしたのかもしれないが…', '遊園地は閉園した。', '何故、遊園地は閉園した？'], () => { game.waiting = 'quiz5'; });
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz5') {
    if (['災厄', '災い', '厄', '石碑を壊した', '石碑が壊れた', '石碑が崩れた'].some(w => text.includes(w))) {
      return say(['そうだ。', '石碑が壊れたことによって、災厄が引き起こされ、', '閉園へと導かれた…。', '………', '調べた結果からみると、そのように見える', 'だが何か………', 'いや、ここで追及しても意味はないだろう', '協力、感謝するよ', '君のおかげで一つ明らかになった', '警察へは私の方から通報しておこう', 'このようなことでも調べてくれる刑事の知り合いがいるんでね', 'それでは、またどこかで'], () => ending(1));
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz6') {
    if (['見張られていた', '見張り', 'ごまかす', '嘘', '監視'].some(w => text.includes(w))) {
      return say(['なるほど…監視されていた…。', 'つまり、儀式を行っているように見せなければならなかった。', 'ということは、石碑を壊したのは…'], () => { game.waiting = 'quiz7'; });
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz7') {
    if (['鳳丈一郎', 'おおとり丈一郎', '青木丈一郎', '丈一郎'].some(w => text.includes(w))) {
      return say(['その可能性が高そうだね。', 'では、最後にだが、', '何故、丈一郎氏はそのようなことを？'], () => { game.waiting = 'quiz8'; });
    }
    return say(WRONG_QUIZ);
  }

  if (game.waiting === 'quiz8') {
    if (['終わらせる', '壊す'].some(w => text.includes(w)) || text === '終') {
      return say(['終わらせるため…か。', 'なるほど。', '何か要因がるみたいだね？', 'それにしても、\n丈一郎氏に行わさせていた連中は\n何が目的だったんだろうね', '昔の儀式を蘇らせることに、何か意図が…？', 'おっと、また脱線するところだった。すまない。', '帰ったら詳しく聞かせてほしい', 'それでは、また'], () => ending(2));
    }
    return say(WRONG_QUIZ);
  }
}

function ending(no) {
  game.waiting = 'end';
  const routeLabel = document.getElementById('routeLabel');
  if (routeLabel) {
    routeLabel.textContent = '';
    routeLabel.style.display = 'none';
  }

  const NOTE_URL = 'ここにnoteのURL';

  if (no === 1) {

    const share =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(
        '「あなたは、行われた儀式を暴きましたが、まだ秘密があるようです」\n' +
        NOTE_URL +
        '\n\n#ARG #ある廃遊園地と、ある教授'
      );

    renderPage({
      no: 'END1',
      title: 'エンディング 1',
      body: `
<section class="page-title">
  <p class="eyebrow">ENDING</p>
  <h1>エンディング 1</h1>
</section>

<div class="doc ending-doc">

<p>調査に協力頂き、感謝する。</p>

<p>この件は、私が責任をもって警察に届け出ておくよ。</p>

<p>ところで、なんだけど。</p>

<p>被害者たちは本当に亡くなったのかな？</p>

<p>この件は、もう少し調べてみる必要がありそうだね。</p>

<p>私ももう一度調べに行ってみるとしよう。</p>

<img class="ending-image" src="${CHAT_IMG.endingEmptyChair}" alt="誰も座っていない研究室の椅子">

<a class="share" href="${share}" target="_blank">
Xでシェア
</a>

</div>
`
    });

  } else {

    const share =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(
        '「あなたは、この事件の真相にたどり着きました」\n' +
        NOTE_URL +
        '\n\n#ARG #ある廃遊園地と、ある教授'
      );

    renderPage({
      no: 'END2',
      title: 'エンディング 2',
      body: `
<section class="page-title">
  <p class="eyebrow">ENDING</p>
  <h1>エンディング 2</h1>
</section>

<div class="doc ending-doc">

<p>なるほど……君が調べた情報の数には驚愕するよ。</p>

<p>よくここまで調べたものだね。</p>

<p>おかげでこの遊園地で起きたことが全てわかったよ。</p>

<p>とはいえ、謎がまた増えたけどね…。</p>

<p>君とはいいパートナーになれそうだ。</p>

<p>また連絡するよ！</p>

<img class="ending-image" src="${CHAT_IMG.endingMoritakaChair}" alt="森高宵が座る研究室の椅子">

<a class="share" href="${share}" target="_blank">
Xでシェア
</a>

</div>
`
    });

  }
}


/* =====================================================
   Chat Hamburger Menu / Save / Load / Restart
   3スロット式。セーブデータは「最初から」では削除しない。
===================================================== */

const CHAT_SAVE_PREFIX = 'ohtori_yuenchi_chat_save_slot_';
let currentMenuMode = 'main';

function hideRouteDisplay() {
  const routeLabel = document.getElementById('routeLabel');
  if (!routeLabel) return;

  routeLabel.textContent = '';
  routeLabel.style.display = 'none';

  const parent = routeLabel.parentElement;
  if (parent && parent.textContent.includes('ルート')) {
    parent.style.display = 'none';
  }
}

function saveKey(slot) {
  return CHAT_SAVE_PREFIX + slot;
}

function toKanjiNumber(n) {
  return ({ 1: '一', 2: '二', 3: '三' }[n] || String(n));
}

function formatSaveTime(iso) {
  if (!iso) return '空き';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '保存あり';

  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');

  return `${mm}/${dd} ${hh}:${mi}`;
}

function setupChatMenu() {
  const chatHead = document.querySelector('.chat-head');
  const chatPanel = document.getElementById('chatPanel');

  if (!chatPanel || document.getElementById('chatMenuButton')) return;

  const menuButton = document.createElement('button');
  menuButton.id = 'chatMenuButton';
  menuButton.className = 'chat-menu-button';
  menuButton.type = 'button';
  menuButton.textContent = '☰';
  menuButton.setAttribute('aria-label', 'メニュー');
  menuButton.addEventListener('click', toggleChatMenu);

  if (chatHead) {
    chatHead.appendChild(menuButton);
  } else {
    chatPanel.insertBefore(menuButton, chatPanel.firstChild);
  }

  const overlay = document.createElement('div');
  overlay.id = 'chatMenuOverlay';
  overlay.className = 'chat-menu-overlay';
  overlay.addEventListener('click', closeChatMenu);

  const drawer = document.createElement('div');
  drawer.id = 'chatMenuDrawer';
  drawer.className = 'chat-menu-drawer';
  drawer.innerHTML = `
    <div class="chat-menu-title">
      <span>メニュー</span>
      <button type="button" class="chat-menu-close" aria-label="閉じる">×</button>
    </div>
    <div id="chatMenuContent" class="chat-menu-content"></div>
  `;

  drawer.querySelector('.chat-menu-close').addEventListener('click', closeChatMenu);

  chatPanel.appendChild(overlay);
  chatPanel.appendChild(drawer);

  renderChatMenuMain();
}

function toggleChatMenu() {
  const chatPanel = document.getElementById('chatPanel');
  if (!chatPanel) return;

  if (chatPanel.classList.contains('menu-open')) {
    closeChatMenu();
  } else {
    openChatMenu();
  }
}

function openChatMenu() {
  const chatPanel = document.getElementById('chatPanel');
  if (!chatPanel) return;

  currentMenuMode = 'main';
  renderChatMenuMain();
  chatPanel.classList.add('menu-open');
}

function closeChatMenu() {
  const chatPanel = document.getElementById('chatPanel');
  if (!chatPanel) return;

  chatPanel.classList.remove('menu-open');
}

function getMenuContent() {
  return document.getElementById('chatMenuContent');
}

function renderChatMenuMain() {
  const content = getMenuContent();
  if (!content) return;

  content.innerHTML = `
    <button type="button" class="chat-menu-item" data-menu="save">セーブ</button>
    <button type="button" class="chat-menu-item" data-menu="load">ロード</button>
    <button type="button" class="chat-menu-item danger" data-menu="restart">最初から</button>
  `;

  content.querySelector('[data-menu="save"]').addEventListener('click', renderChatMenuSave);
  content.querySelector('[data-menu="load"]').addEventListener('click', renderChatMenuLoad);
  content.querySelector('[data-menu="restart"]').addEventListener('click', confirmRestartChat);
}

function renderChatMenuSave() {
  const content = getMenuContent();
  if (!content) return;

  currentMenuMode = 'save';
  content.innerHTML = `
    <button type="button" class="chat-menu-back">← 戻る</button>
    <div class="chat-menu-section-title">セーブ</div>
    ${[1, 2, 3].map(slot => {
      const data = readSaveData(slot);
      return `
        <button type="button" class="chat-menu-slot" data-save-slot="${slot}">
          <span>セーブ枠${slot}</span>
          <small>${data ? formatSaveTime(data.savedAt) : '空き'}</small>
        </button>
      `;
    }).join('')}
  `;

  content.querySelector('.chat-menu-back').addEventListener('click', renderChatMenuMain);
  content.querySelectorAll('[data-save-slot]').forEach(button => {
    button.addEventListener('click', () => {
      const slot = Number(button.dataset.saveSlot);
      const ok = window.confirm(`セーブ枠${slot}に保存しますか？`);
      if (!ok) return;

      saveChat(slot, true);
      renderChatMenuSave();
    });
  });
}

function renderChatMenuLoad() {
  const content = getMenuContent();
  if (!content) return;

  currentMenuMode = 'load';
  content.innerHTML = `
    <button type="button" class="chat-menu-back">← 戻る</button>
    <div class="chat-menu-section-title">ロード</div>
    ${[1, 2, 3].map(slot => {
      const data = readSaveData(slot);
      return `
        <button type="button" class="chat-menu-slot ${data ? '' : 'empty'}" data-load-slot="${slot}">
          <span>ロード枠${slot}</span>
          <small>${data ? formatSaveTime(data.savedAt) : '空き'}</small>
        </button>
      `;
    }).join('')}
  `;

  content.querySelector('.chat-menu-back').addEventListener('click', renderChatMenuMain);
  content.querySelectorAll('[data-load-slot]').forEach(button => {
    button.addEventListener('click', () => {
      const slot = Number(button.dataset.loadSlot);
      const data = readSaveData(slot);

      if (!data) {
        showSaveToast(`ロード枠${slot}は空です`);
        return;
      }

      const ok = window.confirm(`ロード枠${slot}を読み込みますか？\\n現在のチャット内容は上書きされます。`);
      if (!ok) return;

      loadChat(slot, true);
      closeChatMenu();
    });
  });
}

function confirmRestartChat() {
  const ok = window.confirm('最初から始めますか？\\nセーブデータは削除されません。');
  if (!ok) return;

  startNewChat({ keepSave: true });
  closeChatMenu();
  showSaveToast('最初から開始しました');
}

function serializeBubbles() {
  const log = document.getElementById('chatLog');
  if (!log) return [];

  return Array.from(log.querySelectorAll('.bubble')).map(bubble => {
    const img = bubble.querySelector('img');
    const caption = bubble.querySelector('.image-caption');

    if (img) {
      return {
        type: bubble.className.replace('bubble', '').trim(),
        image: true,
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
        caption: caption ? caption.textContent : ''
      };
    }

    return {
      type: bubble.className.replace('bubble', '').trim(),
      text: bubble.textContent
    };
  });
}

function restoreBubbles(bubbles) {
  const log = document.getElementById('chatLog');
  if (!log) return;

  log.innerHTML = '';

  bubbles.forEach(item => {
    if (item.image) {
      const div = document.createElement('div');
      div.className = 'bubble ' + item.type;

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '送信画像';
      img.loading = 'lazy';
      div.appendChild(img);

      if (item.caption) {
        const p = document.createElement('p');
        p.className = 'image-caption';
        p.textContent = item.caption;
        div.appendChild(p);
      }

      log.appendChild(div);
      return;
    }

    const div = document.createElement('div');
    div.className = 'bubble ' + item.type;
    div.textContent = item.text;
    log.appendChild(div);
  });

  log.scrollTop = log.scrollHeight;
}

function makeSaveData(slot) {
  return {
    slot,
    route: game.route,
    waiting: game.waiting,
    flags: Array.from(game.flags),
    visited: Array.from(game.visited),
    busy: false,
    bubbles: serializeBubbles(),
    savedAt: new Date().toISOString()
  };
}

function readSaveData(slot) {
  try {
    const raw = localStorage.getItem(saveKey(slot));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('readSaveData failed', e);
    return null;
  }
}

function saveChat(slot, showMessage = false) {
  try {
    localStorage.setItem(saveKey(slot), JSON.stringify(makeSaveData(slot)));

    if (showMessage) {
      showSaveToast(`セーブ枠${slot}に保存しました`);
    }

    return true;
  } catch (e) {
    console.error('saveChat failed', e);
    if (showMessage) showSaveToast('セーブに失敗しました');
    return false;
  }
}

function loadChat(slot, showMessage = false) {
  try {
    const data = readSaveData(slot);

    if (!data) {
      if (showMessage) showSaveToast(`ロード枠${slot}は空です`);
      return false;
    }

    game.route = data.route || '共通ルート';
    game.waiting = data.waiting || 'destination';
    game.flags = new Set(data.flags || []);
    game.visited = new Set(data.visited || []);
    game.busy = false;

    restoreBubbles(data.bubbles || []);
    hideRouteDisplay();

    if (showMessage) {
      showSaveToast(`ロード枠${slot}を読み込みました`);
    }

    return true;
  } catch (e) {
    console.error('loadChat failed', e);
    if (showMessage) showSaveToast('ロードに失敗しました');
    return false;
  }
}

function showSaveToast(message) {
  let toast = document.getElementById('chatSaveToast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'chatSaveToast';
    toast.className = 'chat-save-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  window.clearTimeout(showSaveToast.timer);
  showSaveToast.timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1600);
}

document.addEventListener('DOMContentLoaded', () => {
  hideRouteDisplay();
});

