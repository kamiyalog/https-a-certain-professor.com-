const IMG = {
  hero: 'assets/img/home_hero.jpg',
  coaster: 'assets/img/attraction_ootori_coaster.jpg',
  mirror: 'assets/img/attraction_mirror_house.jpg',
  library: 'assets/img/attraction_cursed_library.jpg',
  carousel: 'assets/img/attraction_merry_go_round.jpg',
  pirates: 'assets/img/attraction_super_pirates.jpg',
  ferris: 'assets/img/attraction_ferris_wheel.jpg',
  swings: 'assets/img/attraction_swing_ride.jpg',
  kart: 'assets/img/attraction_go_go_go_kart.jpg',
  map: 'assets/img/park_map.jpg',
  actionShow: 'assets/img/show_action_final.jpg',
  birdShow: 'assets/img/show_ootori_bird_dance.jpg',
  musicShow: 'assets/img/show_music_stage.jpg',
  ootoriBirdReference: 'assets/img/ootori_bird_reference.jpg',
  mirrorHouseMap: 'assets/img/search_mirror_house_map.jpg',
  villageMapPhoto: 'assets/img/search_houmura_map.jpg',
  endingEmptyChair: 'assets/img/ending_empty_chair.jpg',
  endingMoritakaChair: 'assets/img/ending_moritaka_chair.jpg'
};
function fullImage(src, alt = '') {
  return `<img class="full-image" src="${src}" alt="${alt}">`;
}
function imageBox(src, label, cls = '') {
  return `<div class="image-box ${cls}" style="background-image:url('${src}')"></div>`;
}

function linkButton(pageId, text = '詳細はこちらから') {
  return `<button class="link-button" data-page="${pageId}">${text}</button>`;
}

function articleImage(src, alt = '') {
    return `
        <img
            class="article-image"
            src="${src}"
            alt="${alt}"
        >
    `;
}

function blackBar(label = '████') {
  return `<span class="redacted">${label}</span>`;
}

function newsArticle({ source, date, title, lead, paragraphs = [] }) {
  return `
    <div class="doc news-article">
      <div class="article-meta">${source}　${date}</div>
      <h2>${title}</h2>
      <p class="lead">${lead}</p>
      ${paragraphs.map(p => `<p>${p}</p>`).join('')}
    </div>
  `;
}

function reportDocument({ title, rows = [], sections = [] }) {
  return `
    <div class="doc report-document">
      <div class="report-label">内部資料 / 事故報告書</div>
      <h2>${title}</h2>
      <table class="report-table">
        <tbody>
          ${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}
        </tbody>
      </table>
      ${sections.map(s => `
        <section class="report-section">
          <h3>${s.heading}</h3>
          <p>${s.body}</p>
        </section>
      `).join('')}
    </div>
  `;
}

function profileBox({ name, rows = [], note = '' }) {
  return `
    <div class="doc profile-document">
      <div class="profile-header">
        <div class="profile-photo">NO IMAGE</div>
        <div>
          <div class="profile-label">PROFILE</div>
          <h2>${name}</h2>
          <p>${note}</p>
        </div>
      </div>
      <table class="profile-table">
        <tbody>
          ${rows.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function lockedMemoBox() {
  return `
    <div class="doc locked-document">
      <h2>青木丈一郎のメモ書き</h2>
      <p>この資料は保護されています。</p>
      <p class="hint">パスワードのヒント：パスワードは鳳村が終わった年4桁</p>
      <div class="password-box">
        <input id="memoPass" placeholder="4桁のパスワード">
        <button onclick="unlockMemo()">開く</button>
      </div>
      <p id="memoError" class="error"></p>
    </div>
  `;
}

const attractionList = [
  { no:'①', name:'おおとりコースター', img:IMG.coaster, catch:'興奮度No.1！<br> 園内を駆け抜ける看板コースター！', meta:'スリル：★★★★★ / 対象：身長120cm以上' },
  { no:'②', name:'千枚ミラーハウス', img:IMG.mirror, catch:'何枚もの鏡が作る<br>不思議で少しこわい迷路空間', meta:'不思議：★★★★★ / 対象：小学生以上推奨' },
  { no:'③', name:'呪いの図書館', img:IMG.library, catch:'本棚の奥から聞こえる声を頼りに進む<br>屋内型ホラーアトラクション', meta:'こわさ：★★★★☆ / 対象：小学生以上推奨' },
  { no:'④', name:'メリーゴーラウンド', img:IMG.carousel, catch:'小さなお子さまにも人気の<br>昔ながらの回転木馬', meta:'やさしさ：★★★★★ / 対象：全年齢' },
  { no:'⑤', name:'スーパーパイレーツ', img:IMG.pirates, catch:'大きく揺れる海賊船で<br>空へ飛び出すような体験を', meta:'スリル：★★★★☆ / 対象：身長110cm以上' },
  { no:'⑥', name:'大観覧車', img:IMG.ferris, catch:'園内を一望できる<br>おおとり遊園地のランドマーク', meta:'景色：★★★★★ / 対象：全年齢' },
  { no:'⑦', name:'回転ブランコ', img:IMG.swings, catch:'風を感じながら空中をくるくる回る<br>爽快アトラクション', meta:'爽快感：★★★★☆ / 対象：身長100cm以上' },
  { no:'⑧', name:'ゴーゴーゴーカート', img:IMG.kart, catch:'カラフルなカートでコースを走る<br>家族で楽しめる人気施設', meta:'わくわく：★★★★☆ / 対象：小学生以上' }
];

const showList = [
  { code:'A', title:'アクションショー', term:'2023年10月10日～2023年10月31日', img:IMG.actionShow, text:'ヒーローたちが最後の戦いに挑む<br>迫力満点のアクションステージ' },
  { code:'B', title:'おおとり鳥のダンスショー', term:'2023年9月5日～2023年10月31日', img:IMG.birdShow, text:'園内マスコットおおとり鳥と踊れる<br>にぎやかな参加型ショー' },
  { code:'C', title:'みんなで踊ろう音楽ステージ', term:'2022年2月8日～2023年10月31日', img:IMG.musicShow, text:'音楽に合わせてみんなで楽しむ<br>ファミリー向けステージイベント' }
];

const publicNews = [
  { date:'2023年8月20日', title:'閉園のお知らせ', body:'おおとり遊園地は、2023年10月31日をもちまして閉園いたします。<br>10年という長きにわたり、たくさんのお客様にご来園いただき、心より御礼申し上げます。<br>最後の日まで、皆さまの思い出に残る場所であり続けられるよう、<br>スタッフ一同努めてまいります。' },
  { date:'2023年5月12日', title:'千枚ミラーハウス再開のお知らせ', body:'一時停止しておりました千枚ミラーハウスにつきまして<br>安全確認および清掃が完了いたしましたため<br>本日より営業を再開いたします。' },
  { date:'2023年4月12日', title:'千枚ミラーハウス　一時停止のお知らせ', body:'アトラクション内事故により、千枚ミラーハウスの営業を一時停止いたします。<br>再開時期につきましては、追ってご報告いたします。' },
  { date:'2022年9月4日', title:'呪いの図書館再開のお知らせ', body:'一時停止しておりました呪いの図書館につきまして、<br>清掃作業が完了いたしましたため、営業を再開いたします。' },
  { date:'2022年6月15日', title:'呪いの図書館　一時停止のお知らせ', body:'アトラクション内事故により、呪いの図書館の営業を一時停止いたします。<br>再開時期につきましては、追ってご報告いたします。' },
  { date:'2022年1月15日', title:'園長交代のお知らせ', body:'おおとり遊園地をより一層盛り上げていくため、このたび園長が交代いたしました。<br>今後とも変わらぬご愛顧を賜りますようお願い申し上げます。' }
];

const PAGES = {
  home: { no:1, title:'昔懐かしい遊園地で遊ぼう！', body:`
    <section class="hero-visual">
      ${imageBox(IMG.hero, '画像：おおとり遊園地 正門と園内風景', 'hero-image')}
      <div class="hero-copy">
        <p class="eyebrow">OHTORI AMUSEMENT PARK</p>
        <h1>昔懐かしい<br>遊園地で遊ぼう！</h1>
        <p>家族で、友人と、思い出に残る一日を。<br>おおとり遊園地には、どこか懐かしくて、<br>何度でも訪れたくなる楽しさが詰まっています。</p>
      </div>
    </section>

    <section class="section-block">
      <div class="section-head"><p class="eyebrow">ATTRACTIONS</p><h2>興奮度No1！　アトラクション紹介！</h2></div>
      <div class="feature-grid">
        ${attractionList.slice(0,3).map(a=>`<article class="feature-card">${imageBox(a.img, '画像：'+a.name)}<div><h3>${a.no}${a.name}</h3><p>${a.catch}</p></div></article>`).join('')}
      </div>
      ${linkButton('attractions')}
    </section>

    <section class="section-block">
      <div class="section-head"><p class="eyebrow">STAGE SHOW</p><h2>いろんなショーが盛りだくさん！</h2></div>
      <div class="feature-grid">
        ${showList.map(s=>`<article class="feature-card">${imageBox(s.img, '画像：'+s.title)}<div><h3>${s.title}</h3><p>${s.text}</p></div></article>`).join('')}
      </div>
      ${linkButton('schedule')}
    </section>

    <section class="section-block">
      <div class="section-head"><p class="eyebrow">NEWS</p><h2>お知らせ</h2></div>
      <div class="news-list compact">
        ${publicNews.slice(0,3).map(n=>`<article class="news-row"><time>${n.date}</time><h3>${n.title}</h3><p>${n.body}</p></article>`).join('')}
      </div>
      ${linkButton('news')}
    </section>`},

  map: { no:2, title:'園内マップ', body:`
    <section class="page-title"><p class="eyebrow">PARK MAP</p><h1>園内マップ</h1><p>園内の各施設の位置をご確認いただけます。番号はアトラクション・施設一覧と対応しています。</p></section>
    <section class="map-section">
      <div class="map-visual" style="background-image:url('${IMG.map}')">
 
      </div>
      <div class="legend-grid">
        ${['⓪入口','①おおとりコースター','②千枚ミラーハウス','③呪いの図書館','④メリーゴーラウンド','⑤スーパーパイレーツ','⑥大観覧車','⑦回転ブランコ','⑧ゴーゴーゴーカート','⑨ショーステージ','⑩スタッフルーム'].map(x=>`<div>${x}</div>`).join('')}
      </div>
    </section>`},

  attractions: { no:3, title:'アトラクション', body:`
    <section class="page-title"><p class="eyebrow">ATTRACTIONS</p><h1>アトラクション</h1><p>小さなお子さま向けの乗り物から、スリル満点の大型アトラクションまで。おおとり遊園地の人気施設をご紹介します。</p></section>
    <div class="attraction-grid">
      ${attractionList.map(a=>`<article class="attraction-card">${imageBox(a.img, '画像：'+a.name)}<div class="attraction-body"><span class="number-badge">${a.no}</span><h2>${a.name}</h2><p>${a.catch}</p><p class="meta">${a.meta}</p></div></article>`).join('')}
    </div>`},

  schedule: { no:4, title:'ショースケジュール', body:`
    <section class="page-title"><p class="eyebrow">SHOW SCHEDULE</p><h1>ショースケジュール</h1><p>おおとり遊園地で現在開催しているステージショーのご案内です。</p></section>
    <div class="show-grid">
      ${showList.map(s=>`<article class="show-card">${imageBox(s.img, '画像：'+s.title)}<div><span class="code-badge">${s.code}</span><h2>${s.title}</h2><p>${s.text}</p><p class="meta">開催期間：${s.term}</p></div></article>`).join('')}
    </div>
    <section class="section-block">
      <h2>本日のタイムテーブル</h2>
      <table class="schedule-table"><tbody>
        <tr><th>10：00～10：30</th><td>A　アクションショー</td></tr>
        <tr><th>11：00～11：30</th><td>B　おおとり鳥のダンスショー</td></tr>
        <tr><th>13：00～13：30</th><td>C　みんなで踊ろう音楽ステージ</td></tr>
        <tr><th>14：00～14：30</th><td>A　アクションショー</td></tr>
        <tr><th>15：00～15：30</th><td>B　おおとり鳥のダンスショー</td></tr>
        <tr><th>16：00～16：30</th><td>C　みんなで踊ろう音楽ステージ</td></tr>
      </tbody></table>
    </section>`},

  news: { no:5, title:'お知らせ', body:`
    <section class="page-title"><p class="eyebrow">NEWS</p><h1>お知らせ</h1><p>営業情報、アトラクション再開・停止、園からのお知らせを掲載しています。</p></section>
    <div class="news-list">
      ${publicNews.map(n=>`<article class="news-card text-only"><div class="news-text"><time>${n.date}</time><h2>${n.title}</h2><p>${n.body}</p></div></article>`).join('')}
    </div>`},

  contact: { no:6, title:'お問い合わせ', body:`
    <section class="page-title"><p class="eyebrow">CONTACT</p><h1>お問い合わせ</h1></section>
    <section class="contact-card">
      <p class="error big">現在お問い合わせは停止しております。</p>
      <form class="dummy-form">
        <label>お名前<input type="text" disabled placeholder="入力できません"></label>
        <label>メールアドレス<input type="email" disabled placeholder="入力できません"></label>
        <label>お問い合わせ種別<select disabled><option>選択できません</option></select></label>
        <label>お問い合わせ内容<textarea disabled placeholder="入力できません"></textarea></label>
        <button disabled>送信できません</button>
      </form>
    </section>`},

  mascot: { no:7, title:'園内マスコット', body:`<h1>園内マスコット</h1><div class="card"><h2>おおとり鳥</h2><p>開園当初から存在する、おおとり遊園地のマスコット。<br>脚一本、指4本の鳥。チャーミングな見た目で、みんなを癒すぞ！</p>${fullImage(IMG.ootoriBirdReference, 'おおとり鳥')}</div>`},
  mirrorNews: {
    no: 8,
    title: '千枚ミラーハウスのネットニュース記事',
    body: `
      <h1>千枚ミラーハウスで来園客が行方不明　園は一時営業停止を発表</h1>
      ${newsArticle({
        source: '地方ニュースおおとり',
        date: '2023年4月13日 18:20配信',
        title: 'おおとり遊園地「千枚ミラーハウス」で事故か　配信中の男性と連絡取れず',
        lead: 'おおとり市郊外の遊園地「おおとり遊園地」で、来園していた男性客と連絡が取れなくなる事案が発生した。',
        paragraphs: [
          '関係者によると、男性は園内アトラクション「千枚ミラーハウス」に入場した後、<br>同行者および家族との連絡が途絶えたという。<br>男性は当時、園内を紹介する目的で動画配信を行っていたとみられる。',
          '園は12日夜、同アトラクションの営業を一時停止し、施設内の確認と安全点検を行うと発表した。<br>再開時期については「確認が取れ次第、公式サイトで知らせる」としている。',
          '現時点で詳しい状況は明らかになっていない。'
        ]
      })}
    `
  },
  libraryNews: {
    no: 9,
    title: '呪いの図書館のネットニュース記事',
    body: `
      <h1>「呪いの図書館」で事故との情報　園側は詳細を明かさず</h1>
      ${newsArticle({
        source: 'おおとり地域通信',
        date: '2022年6月16日 09:40配信',
        title: '屋内型アトラクションでトラブルか　おおとり遊園地が一部施設を停止',
        lead: 'おおとり遊園地の屋内型ホラーアトラクション「呪いの図書館」で、トラブルがあったとの情報が寄せられている。',
        paragraphs: [
          '15日夕方、同園を訪れていた客から「施設の入口付近が急に封鎖された」などの投稿が相次いだ。',
          '園は公式サイトで「アトラクション内事故により営業を一時停止する」と発表したが、<br>事故の詳細や負傷者の有無については明らかにしていない。',
          '当該施設は暗所演出や音響効果を用いた体験型アトラクションで、再開時期は未定としている。'
        ]
      })}
    `
  },
  mirrorReport: {
    no: 10,
    title: '千枚ミラーハウス事故報告書',
    body: `
      <h1>千枚ミラーハウス事故報告書</h1>
      ${reportDocument({
        title: '千枚ミラーハウス来園客行方不明事案 報告書',
        rows: [
          ['管理番号', 'OH-MH-2023-0412'],
          ['発生日時', '2023年4月12日　16時20分頃'],
          ['発生場所', '千枚ミラーハウス内部　C-5地点付近'],
          ['対象者', '氏名不詳 / 男性 / 動画配信者とみられる'],
          ['対応区分', '施設内事故 / 要追加調査'],
          ['初動対応', 'アトラクション停止、施設内捜索、関係部署へ連絡']
        ],
        sections: [
          {
            heading: '概要',
            body: '対象者は一人で入場。入場後、動画配信を継続していたが、<br>C-5地点付近で不明瞭な発言を残したのち通信が途絶。<br>以後、施設出口および園内カメラに対象者の姿は確認されていない。'
          },
          {
            heading: '確認事項',
            body: 'C-5地点周辺に破損、血痕、争った形跡は確認されなかった。<br>ただし、該当地点の鏡面および壁面に一部清掃困難な赤色付着物を確認。<br>塗料の可能性が高いものとして処理。'
          },
          {
            heading: '対応内容',
            body: '同日より千枚ミラーハウスを営業停止。<br>翌13日以降、設備点検、鏡面清掃、通路確認を実施。<br>C-5地点については追加確認が必要。'
          },
          {
            heading: '備考',
            body: '配信記録内にノイズのような音声が残っているとの報告あり。事故との関連は不明。'
          }
        ]
      })}
    `
  },
  c5map: {
    no: 11,
    title: '千枚ミラーハウス内部地図',
    body: `
      <h1>千枚ミラーハウス内部地図</h1>
      <div class="doc">
        <p>千枚ミラーハウス内部の地図</p>
        ${articleImage(IMG.mirrorHouseMap, '千枚ミラーハウス内部地図')}
      </div>
    `
  },
  diary: { no:12, title:'抜粋されたスタッフ日誌', body:`<h1>抜粋されたスタッフ日誌</h1><div class="doc"><p><b>2022年1月15日</b><br>園長が交代となった。<br>新しく園長となった鳳園長はこの辺りの出身者らしいが…<br>少し不気味な雰囲気だ。</p><p><b>2023年4月14日</b><br>本日は千枚ミラーハウスの清掃<br>俺の担当はC-5付近。<br>正面の壁になっている部分に赤いペンキ？が付着していた。<br>「我を■■■■■」のように書かれていたように思えたが…。よく読めなかった<br>なんだろうこれ</p><p><b>2023年8月10日</b><br>ショールームの裏にあった石の墓のようなものが壊れていた。<br>誰がやったかわからないが、これはまずい気がする…</p></div>`},
  ritual: { no:13, title:'鳳村、豊穣の儀', body:`<h1>鳳村、豊穣の儀</h1><div class="doc"><p>年に一度、定められた祭祀場にて<br>自身を贄とし、捧げることを口にすることで、その人物は「贄人」となる。</p><p>贄人として選ばれたものが、<br>祭司によって死を与えられ、石碑の下に埋葬された時、<br>豊穣の儀は完了とし、1年間の豊穣が約束される。</p><p><b>石碑は必ず保持すること。石碑が崩れし時、村に災厄が襲わん。</b></p><p>備考：祭祀場は不浄が溜まるため、年ごとに交互に使用すること。</p></div>`},
  niebito: { no:14, title:'贄人の条件', body:`<h1>贄人の条件</h1><div class="doc"><p>贄人となる者の条件は、使用される祭祀場によって異なる。</p><p>祭祀場①：この地で5年以上商いを行っている者。</p><p>祭祀場②：外から来た者。</p></div>`},
  villageMap: { no:15, title:'村の地図の撮影データ', body:`<h1>村の地図の撮影データ</h1><div class="doc"><p>鳳村がなくなる直前、1985年に撮影された村の地図。</p>${articleImage(
    IMG.villageMapPhoto,
    '村の地図の撮影データ'
)}</div>`},
  priests: {
    no: 16,
    title: '歴代祭司',
    body: `
      <h1>歴代祭司</h1>
      <div class="doc">
        <h2>鳳村祭司記録</h2>
        <p>鳳村に伝わる祭司の記録。紙面の損傷が激しく、多くの氏名は判読不能となっている。</p>
        <table class="report-table priest-table">
          <tbody>
            <tr><th>初代</th><td>鳳　██</td></tr>
            <tr><th>二代</th><td>鳳　██</td></tr>
            <tr><th>三代</th><td>鳳　██</td></tr>
            <tr><th>四代</th><td>鳳　██</td></tr>
            <tr><th>五代</th><td>鳳　██</td></tr>
            <tr><th>六代</th><td>鳳　██</td></tr>
            <tr><th>七代</th><td>鳳　██</td></tr>
            <tr><th>八代</th><td>鳳　██</td></tr>
            <tr><th>九代</th><td>鳳　██</td></tr>
            <tr><th>十代</th><td>鳳　██</td></tr>
            <tr><th>十一代</th><td>鳳　██</td></tr>
            <tr><th>十二代</th><td>鳳　██</td></tr>
            <tr><th>十三代</th><td>鳳　██</td></tr>
            <tr><th>十四代</th><td>鳳　██</td></tr>
            <tr><th>十五代</th><td>鳳　██</td></tr>
            <tr><th>十六代</th><td>鳳　██</td></tr>
            <tr><th>十七代</th><td>鳳　██</td></tr>
            <tr><th>十八代</th><td>鳳　██</td></tr>
            <tr><th>十九代</th><td>鳳　██</td></tr>
            <tr><th>二十代</th><td>鳳　丈一郎</td></tr>
          </tbody>
        </table>
        <p class="hint">※二十代目以外の氏名は、墨・汚損・破損により判別不能。</p>
      </div>
    `
  },
  aoki: {
    no: 17,
    title: '青木丈一郎プロフィール',
    body: `
      <h1>青木丈一郎プロフィール</h1>
      ${profileBox({
        name: '青木 丈一郎',
        note: 'おおとり遊園地 最後の園長。旧姓については一部資料で別名の記載あり。',
        rows: [
          ['氏名', '青木 丈一郎'],
          ['旧姓', '鳳'],
          ['出身', '鳳村'],
          ['経歴', '上京後、アミューズメント系企業に勤務'],
          ['退職理由', '一身上の都合'],
          ['就任', '2022年1月　おおとり遊園地 園長に就任'],
          ['備考', '幼少期に両親の離婚により青木姓となる']
        ]
      })}
      <div class="doc attachment-list">
        <h2>関連資料</h2>
        <p>関連資料として「青木丈一郎のメモ書き」が確認されています。</p>
             </div>
    `
  },
  memoGate: {
    no: 18,
    title: '青木丈一郎のメモ書き',
    body: `
      <h1>青木丈一郎のメモ書き</h1>
      ${lockedMemoBox()}
    `
  },
  memo: {
    no: 'MEMO',
    title: '青木丈一郎のメモ書き',
    body: `
      <h1>青木丈一郎のメモ書き</h1>
      <div class="doc memo-doc">
        <section class="memo-entry">
          <h2>走り書き１</h2>
          <p>最悪だ。<br>
          あの村から母と共に、やっと離れられたと思ったのに</p>

          <p>仕事場まできやがった。<br>
          鳳村…そんな名前二度と聞きたくなかった</p>

          <p>それに、今更豊穣の儀とか無意味だろ<br>
          既に村はないし、あの村のために何かをするなんて<br>
          反吐が出る。</p>

          <p>だけど、母が捕まった。<br>
          儀式を行わないと母の身が危ないと脅されている。</p>

          <p>どうすればいい…！</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き２</h2>
          <p>母のためとはいえ、他の人を犠牲にするのは違う。<br>
          だが、俺の行動は見張られている。<br>
          しばらくは従っている振りをするしかないが…<br>
          時間はない。急いで考えないと。</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き３</h2>
          <p>対象の連絡がきた。<br>
          対象は前園長で、場所は呪いの図書館。<br>
          儀式は、祭司が自ら手を下す必要があるとのことだが<br>
          これを利用できないか？</p>

          <p>「神聖な儀式だから一人でやる」とか理由を付けて。<br>
          急げ。用意することが多い。<br>
見張りを何とかできないか</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き４</h2>
          <p>成功した！　前園長には俺が用意した部屋に避難してもらっている。<br>
          折を見て遠くに離れてもらおう。</p>

          <p>だが、この儀式自体どうにかしないと。<br>
          母も心配だ。</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き５</h2>
          <p>次の儀式を早めると連絡がきた<br>
          効果が上がらなかったため　らしい<br>
          そりゃあそうだ。</p>

          <p>早く準備しなければ<br>常に見張られているのも気持ちが悪い</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き６</h2>
          <p>次の対象は「外からきた者」つまり、旅行者だ。<br>
          ならば、とひそかに昔の友人に連絡を取り、<br>
          「配信者」という体で協力してもらえることになった。</p>

          <p>見張りをうまく誘導できればいいが…。<br>
          実行のタイミングになるまでに、このくだらない儀式を終わらせる方法を調べておかなければ…</p>
        </section>

        <section class="memo-entry">
          <h2>走り書き７</h2>
          <p>ようやく終わらせるためのものを見つけた。<br>
          これで終わらせられる。</p>

          <p>タイミングを見計らうんだ<br>
          そして、俺が終わらせる。</p>

          <p>あんな石碑、俺が壊してやる</p>
        </section>

        <p class="memo-end">これ以降はない</p>
      </div>

    `
  }
};

const SEARCH_INDEX = [
  ['おおとり鳥','mascot'],['おおとりどり','mascot'], ['千枚ミラーハウス事故報告書','mirrorReport'],['千枚ミラーハウスの事故の報告書','mirrorReport'],['千枚ミラーハウス','mirrorNews'],['呪いの図書館','libraryNews'],
 ['C-5','c5map'],['C-5地点','c5map'],
  ['スタッフ日誌','diary'],['我を贄に捧げる','ritual'],['贄人','niebito'],['祭祀場','villageMap'],['祭祀場①','villageMap'],['祭祀場②','villageMap'],['鳳村','villageMap'],['石碑','villageMap'],
  ['鳳丈一郎','priests'],['青木丈一郎のメモ書き','memoGate'],['青木丈一郎メモ書き','memoGate'],['青木丈一郎','aoki']
];
