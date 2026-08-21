(() => {
  "use strict";

  const app = document.querySelector("#app");
  const modalRoot = document.querySelector("#modal-root");
  const phaseFade = document.querySelector("#phase-fade");
  const DATA = window.STORY_ONE;
  const DATA_TWO = window.STORY_TWO;
  const DATA_THREE = window.STORY_THREE;
  const DATA_FOUR = window.STORY_FOUR;
  const ASSETS = {
    male: "assets/narrator-male.png",
    female: "assets/narrator-female.png",
    maleStand: "assets/narrator-male-stand.png",
    femaleStand: "assets/narrator-female-stand.png",
    maleBow: "assets/narrator-male-bow.png",
    femaleBow: "assets/narrator-female-bow.png"
  };
  const SCENE_ASSETS = {
    "コンビニ前": "assets/scenes/approved/コンビニ前.png",
    "夕方の道": "assets/scenes/approved/夕方の道.png",
    "夕方の公園": "assets/scenes/approved/夕方の公園.png",
    "夜の公園": "assets/scenes/approved/夜の公園.png",
    "女性が倒れてる画像": "assets/scenes/approved/女性が倒れてる画像.png",
    "女性のアップ": "assets/scenes/approved/女性のアップ.png",
    "オフィス・朝": "assets/scenes/approved/オフィス・朝.png",
    "オフィス・夕方": "assets/scenes/approved/オフィス・夕方.png",
    "オフィス・夜": "assets/scenes/approved/オフィス・夜.png",
    "オフィスビル一階・夜": "assets/scenes/office-building-lobby-night.png",
    "休憩スペース・昼": "assets/scenes/approved/休憩スペース・昼.png",
    "休憩スペース・夜": "assets/scenes/approved/休憩スペース・夜.png",
    "ナースステーション・夕方": "assets/scenes/approved/ナースステーション・夕方.png",
    "ナースステーション・朝": "assets/scenes/approved/ナースステーション・朝.png",
    "ナースステーション・深夜": "assets/scenes/approved/ナースステーション・深夜.png",
    "病棟廊下・夜": "assets/scenes/approved/病棟廊下・夜.png",
    "病棟廊下・朝": "assets/scenes/approved/病棟廊下・朝.png",
    "病棟廊下・深夜": "assets/scenes/approved/病棟廊下・深夜.png",
    "処置室・深夜": "assets/scenes/hospital-treatment-room-night.png",
    "病室504・深夜": "assets/scenes/approved/病室504・深夜.png",
    "病室512・夜": "assets/scenes/approved/病室512・夜.png",
    "病室512・朝": "assets/scenes/approved/病室512・朝.png",
    "病室512・深夜": "assets/scenes/approved/病室512・深夜.png",
    "病室512・深夜・問題時": "assets/scenes/approved/病室512・深夜・問題時.png",
    "編集部・夜": "assets/scenes/approved/編集部・夜.png",
    "編集部・夜／資料表示": "assets/scenes/approved/編集部・夜／資料表示.png",
    "編集部・翌日": "assets/scenes/approved/オフィス・朝.png",
    "秋月駅・改札内": "assets/scenes/approved/秋月駅・コインロッカー.png",
    "秋月駅・コインロッカー": "assets/scenes/approved/秋月駅・コインロッカー.png",
    "駅のホーム・夜": "assets/scenes/station-platform-night.png",
    "黒江第三ビル前・夜": "assets/scenes/kuroe-building-exterior-night.png",
    "黒江第三ビル・ロビー": "assets/scenes/kuroe-building-lobby.png",
    "黒江第三ビル・四階廊下": "assets/scenes/kuroe-fourth-floor-corridor.png",
    "黒江第三ビル・407号室": "assets/scenes/approved/黒江第三ビル・407号室.png",
    "古いエレベーター内": "assets/scenes/old-elevator-interior.png",
    "黒江第三ビル屋上・夜": "assets/scenes/kuroe-rooftop-night.png",
    "黒江第三ビル・地下": "assets/scenes/kuroe-basement.png",
    "黒江第三ビル裏・朝": "assets/scenes/kuroe-back-morning.png",
    "秋月駅・ホーム": "assets/scenes/akizuki-platform.png"
  };
  const CHARACTER_ASSETS = {
    "女性の立ち絵": "assets/characters/gray-woman.png",
    "立ち絵　アキ": "assets/characters/aki.png",
    "伊東優斗": "assets/characters/ito.png",
    "灰色のカーディガンの女性・顔は見せない": "assets/characters/gray-woman.png",
    "灰色のカーディガンの女性・紙袋": "assets/characters/gray-woman-paper-bag.png",
    "吉岡奈々": "assets/characters/yoshioka-nana.png",
    "小宮山直子": "assets/characters/komiyama-naoko.png",
    "小宮山直子・通話中": "assets/characters/komiyama-naoko-phone.png"
  };
  const NARRATOR_CV = {
    male: "もこ山モコ",
    female: "鯱子"
  };
  const PREVIEW_GATE_ENABLED = true;
  const PREVIEW_PIN = "0701";
  const PREVIEW_AUTH_KEY = "badend-preview-auth";
  const VOICE_BASE_PATH = "assets/voice";
  const NARRATOR_VOICE_PREFIX = {
    male: "M",
    female: "F"
  };
  const NARRATOR_SEQUENCE_META = [
    { key: "intro", group: "導入", label: "案内人との初対面", prefix: "INTRO", start: 1 },
    { key: "introYes", group: "導入", label: "選択肢「はい」の後", prefix: "INTRO", start: 8 },
    { key: "introNo", group: "導入", label: "選択肢「いいえ」の後", prefix: "INTRO", start: 11 },
    { key: "firstLead", group: "第一章", label: "初回遷移時", prefix: "EP1", start: 1 },
    { key: "firstAfter", group: "第一章", label: "初回BAD END後", prefix: "EP1", start: 3 },
    { key: "repeatAfter", group: "第一章", label: "二回目以降のBAD END後", prefix: "EP1", start: 11 },
    { key: "clearAfter", group: "第一章", label: "BAD END回避後", prefix: "EP1", start: 15 },
    { key: "chapter2Lead", group: "第二章", label: "初回遷移時", prefix: "EP2", start: 1 },
    { key: "chapter2FirstAfter", group: "第二章", label: "初回BAD END後", prefix: "EP2", start: 3 },
    { key: "chapter2BadEndOneAfter", group: "第二章", label: "BAD END①後", prefix: "EP2", start: 7 },
    { key: "chapter2BadEndTwoAfter", group: "第二章", label: "BAD END②後", prefix: "EP2", start: 9 },
    { key: "chapter2ClearAfter", group: "第二章", label: "BAD END回避後", prefix: "EP2", start: 13 },
    { key: "chapter3Lead", group: "第三章", label: "初回遷移時", prefix: "EP3", start: 1 },
    { key: "chapter3FirstAfter", group: "第三章", label: "初回BAD END後", prefix: "EP3", start: 3 },
    { key: "chapter3BadEndOneAfter", group: "第三章", label: "BAD END①後", prefix: "EP3", start: 8 },
    { key: "chapter3BadEndTwoAfter", group: "第三章", label: "BAD END②後", prefix: "EP3", start: 11 },
    { key: "chapter3ClearAfter", group: "第三章", label: "BAD END回避後", prefix: "EP3", start: 14 },
    { key: "chapter4Lead", group: "第四章", label: "初回遷移時", prefix: "EP4", start: 1 },
    { key: "chapter4FirstAfter", group: "第四章", label: "初回BAD END後", prefix: "EP4", start: 4 },
    { key: "chapter4BadEndOneAfter", group: "第四章", label: "BAD END①後", prefix: "EP4", start: 8 },
    { key: "chapter4BadEndTwoAfter", group: "第四章", label: "BAD END②後", prefix: "EP4", start: 11 },
    { key: "chapter4BadEndThreeAfter", group: "第四章", label: "BAD END③後", prefix: "EP4", start: 14 },
    { key: "chapter4ClearAfter", group: "第四章", label: "BAD END回避後・最終語り", prefix: "EP4", start: 16 }
  ];
  const NARRATOR_SEQUENCE_BY_KEY = Object.fromEntries(NARRATOR_SEQUENCE_META.map((item) => [item.key, item]));
  const SHARE_TEXT = "またのお越しを、お待ちしております。\nhttps://note.com/mei_takanashi/n/na51c05de1f36\n#BADENDから始めましょう";
  const AUDIO_NOTICE_DURATION_MS = 4500;
  const BLACK_FADE_DURATION_MS = 1350;
  const BLACK_FADE_HOLD_MS = 240;
  const CHAPTER_STORIES = {
    1: [
      { id: "1-1", label: "1話", position: "origin", available: true }
    ],
    2: [
      { id: "2-1", label: "1話", position: "origin" },
      { id: "2-2", label: "2話", position: "normal" },
      { id: "2-2a", label: "2話", variant: "改変", position: "altered" }
    ],
    3: [
      { id: "3-1", label: "1話", position: "origin" },
      { id: "3-2", label: "2話", position: "normal" },
      { id: "3-2a", label: "2話", variant: "改変", position: "altered" }
    ],
    4: [
      { id: "4-1", label: "1話", position: "origin" },
      { id: "4-2", label: "2話", position: "normal" },
      { id: "4-2a", label: "2話", variant: "改変", position: "altered" },
      { id: "4-3", label: "3話", position: "normal" },
      { id: "4-3a", label: "3話", variant: "改変", position: "altered" }
    ]
  };
  const CHAPTERS = [1, 2, 3, 4];
  const memoryStorage = new Map();
  const sessionMemoryStorage = new Map();

  function storageGet(key) {
    try { return localStorage.getItem(key); }
    catch { return memoryStorage.get(key) || null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); }
    catch { memoryStorage.set(key, value); }
  }

  function storageRemove(key) {
    try { localStorage.removeItem(key); }
    catch { memoryStorage.delete(key); }
  }

  function sessionGet(key) {
    try { return sessionStorage.getItem(key); }
    catch { return sessionMemoryStorage.get(key) || null; }
  }

  function sessionSet(key, value) {
    try { sessionStorage.setItem(key, value); }
    catch { sessionMemoryStorage.set(key, value); }
  }

  const defaultProgress = () => ({
    schemaVersion: 5,
    guide: null,
    unlockedChapters: [1],
    unlockedStories: { 1: ["1-1"] },
    readStories: [],
    firstBadEndSeen: false,
    chapterFirstBadEnds: {},
    gameCompleted: false
  });

  let progress = loadProgress();
  let runtime = freshRuntime();
  let narratorPlaying = false;
  let narratorAudio = null;
  let phaseTransitioning = false;
  let queuedPhaseAction = null;

  function freshRuntime() {
    return {
      screen: "guide",
      chapter: 1,
      storyId: "1-1",
      phase: "",
      index: 0,
      usedInterventions: 0,
      interventionLocked: false,
      interventionPlayback: false,
      history: [],
      currentBackground: "",
      currentCharacter: "",
      phoneCallActive: false,
      phoneCallStatus: "",
      phoneCallJustEnded: false,
      grayWomanAppearing: false,
      currentEntry: null,
      narratorKey: "",
      narratorIndex: 0,
      voiceReview: false,
      pendingInterventionSuccess: false,
      segmentKey: "story"
    };
  }

  function normalizeProgress(stored = {}) {
      const defaults = defaultProgress();
      const loaded = {
        ...defaults,
        ...stored,
        unlockedChapters: Array.isArray(stored.unlockedChapters) ? stored.unlockedChapters : defaults.unlockedChapters,
        unlockedStories: { ...defaults.unlockedStories, ...(stored.unlockedStories || {}) },
        readStories: Array.isArray(stored.readStories) ? stored.readStories : defaults.readStories,
        chapterFirstBadEnds: {
          ...(stored.firstBadEndSeen ? { 1: true } : {}),
          ...(stored.chapterFirstBadEnds || {})
        }
      };
      const legacyStoryTwoUnlock = !stored.schemaVersion && Object.values(loaded.unlockedStories || {})
        .some((ids) => Array.isArray(ids) && ids.includes("1-2"));
      if (legacyStoryTwoUnlock) {
        loaded.unlockedChapters = Array.from(new Set([...(loaded.unlockedChapters || []), 2]));
        loaded.unlockedStories = Object.fromEntries(
          Object.entries(loaded.unlockedStories || {}).map(([chapter, ids]) => [
            chapter,
            Array.isArray(ids) ? ids.filter((id) => id !== "1-2") : []
          ])
        );
        loaded.unlockedStories[2] = Array.from(new Set([...(loaded.unlockedStories[2] || []), "2-1"]));
      }
      if ((stored.schemaVersion || 0) < 4) {
        const oldChapterTwoStories = loaded.unlockedStories[2] || [];
        const reachedOldAlteredStory = oldChapterTwoStories.includes("2-3") || oldChapterTwoStories.includes("2-3a");
        loaded.unlockedStories[2] = Array.from(new Set([
          ...oldChapterTwoStories.filter((id) => id !== "2-3" && id !== "2-3a"),
          ...(reachedOldAlteredStory ? ["2-2a"] : [])
        ]));

        const oldReadStories = loaded.readStories || [];
        const readOldAlteredStory = oldReadStories.includes("2-3") || oldReadStories.includes("2-3a");
        const oldInternalBranchRead = oldReadStories.includes("2-2a");
        loaded.readStories = Array.from(new Set([
          ...oldReadStories.filter((id) => id !== "2-2a" && id !== "2-3" && id !== "2-3a"),
          ...(oldInternalBranchRead ? ["2-1"] : []),
          ...(readOldAlteredStory ? ["2-2a"] : [])
        ]));
      }
      if ((stored.schemaVersion || 0) < 5) {
        loaded.unlockedStories[4] = (loaded.unlockedStories[4] || []).filter((id) => id !== "4-4");
        loaded.readStories = (loaded.readStories || []).filter((id) => id !== "4-4");
      }
      loaded.schemaVersion = 5;
      return loaded;
  }

  function loadProgress() {
    try {
      const stored = JSON.parse(storageGet("badend-progress") || "{}");
      const loaded = normalizeProgress(stored);
      storageSet("badend-progress", JSON.stringify(loaded));
      return loaded;
    }
    catch { return defaultProgress(); }
  }

  function persistProgress() {
    storageSet("badend-progress", JSON.stringify(progress));
  }

  function transitionPhase(action) {
    if (phaseTransitioning) {
      queuedPhaseAction = action;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      action();
      return;
    }
    phaseTransitioning = true;
    phaseFade.classList.add("transitioning", "active");
    window.setTimeout(() => {
      action();
      window.setTimeout(() => {
        phaseFade.classList.remove("active");
        window.setTimeout(() => {
          phaseFade.classList.remove("transitioning");
          phaseTransitioning = false;
          if (queuedPhaseAction) {
            const nextAction = queuedPhaseAction;
            queuedPhaseAction = null;
            transitionPhase(nextAction);
          }
        }, BLACK_FADE_DURATION_MS);
      }, BLACK_FADE_HOLD_MS);
    }, BLACK_FADE_DURATION_MS);
  }

  function el(markup) {
    const template = document.createElement("template");
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  }

  function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function hasPreviewAccess() {
    return !PREVIEW_GATE_ENABLED || sessionGet(PREVIEW_AUTH_KEY) === "granted";
  }

  function showPreviewGate() {
    stopNarratorVoice();
    runtime = freshRuntime();
    runtime.screen = "preview-gate";
    app.innerHTML = `
      <section class="screen preview-gate fade-in">
        <div class="preview-gate-panel">
          <p class="preview-gate-kicker">LIMITED PREVIEW</p>
          <h1>関係者確認ページ</h1>
          <p class="preview-gate-message">閲覧用の暗証番号を入力してください。</p>
          <form class="preview-gate-form" data-preview-form novalidate>
            <label for="preview-pin">暗証番号</label>
            <input id="preview-pin" name="preview-pin" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="one-time-code" aria-describedby="preview-pin-error">
            <button class="choice-btn" type="submit">開始する</button>
          </form>
          <p id="preview-pin-error" class="preview-gate-error" data-preview-error aria-live="polite"></p>
        </div>
      </section>`;
    const form = app.querySelector("[data-preview-form]");
    const input = app.querySelector("#preview-pin");
    const error = app.querySelector("[data-preview-error]");
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 4);
      error.textContent = "";
      input.removeAttribute("aria-invalid");
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (input.value === PREVIEW_PIN) {
        sessionSet(PREVIEW_AUTH_KEY, "granted");
        return transitionPhase(showAudioNotice);
      }
      input.value = "";
      input.setAttribute("aria-invalid", "true");
      error.textContent = "暗証番号が違います。";
      form.classList.remove("invalid");
      void form.offsetWidth;
      form.classList.add("invalid");
      input.focus();
    });
    input.focus();
  }

  function narratorVoiceId(key, index) {
    const meta = NARRATOR_SEQUENCE_BY_KEY[key];
    if (!meta || !Number.isInteger(index) || index < 0) return "";
    return `${meta.prefix}-${String(meta.start + index).padStart(3, "0")}`;
  }

  function narratorVoiceFileName(key, index, guide = progress.guide) {
    const voiceId = narratorVoiceId(key, index);
    if (!voiceId) return "";
    const guideKey = guide === "female" ? "female" : "male";
    return `${NARRATOR_VOICE_PREFIX[guideKey]}-${voiceId}.wav`;
  }

  function updateVoiceStatus(message, state = "") {
    const status = app.querySelector("[data-voice-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  }

  function stopNarratorVoice() {
    const audio = narratorAudio;
    narratorAudio = null;
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute?.("src");
      audio.load?.();
    }
    catch { /* Audio cleanup is best-effort. */ }
  }

  function playNarratorVoice(key = runtime.narratorKey, index = runtime.narratorIndex) {
    stopNarratorVoice();
    const fileName = narratorVoiceFileName(key, index);
    if (!fileName || typeof window.Audio !== "function") {
      updateVoiceStatus("この環境では音声を再生できません。", "error");
      return;
    }
    const audio = new window.Audio(`${VOICE_BASE_PATH}/${fileName}`);
    narratorAudio = audio;
    audio.preload = "auto";
    updateVoiceStatus("読み込み中…", "loading");
    audio.addEventListener("playing", () => {
      if (narratorAudio === audio) updateVoiceStatus("再生中", "playing");
    });
    audio.addEventListener("ended", () => {
      if (narratorAudio === audio) updateVoiceStatus("再生終了", "ended");
    });
    audio.addEventListener("error", () => {
      if (narratorAudio === audio) updateVoiceStatus("音声ファイルが見つかりません。", "error");
    });
    const playback = audio.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        if (narratorAudio === audio) updateVoiceStatus("「音声を再生」を押してください。", "blocked");
      });
    }
  }

  function startApplication() {
    if (hasPreviewAccess()) showAudioNotice();
    else showPreviewGate();
  }

  function showAudioNotice() {
    stopNarratorVoice();
    runtime = freshRuntime();
    runtime.screen = "audio-notice";
    app.innerHTML = `
      <section class="screen audio-notice fade-in">
        <div class="audio-notice-panel" role="note" aria-labelledby="audio-notice-title" aria-describedby="audio-notice-message">
          <span class="audio-notice-mark" aria-hidden="true">♪</span>
          <p class="audio-notice-kicker">NOTICE</p>
          <h1 id="audio-notice-title">音声について</h1>
          <p id="audio-notice-message" class="audio-notice-message">このゲームでは、音声が再生されます。<br>周囲の環境や音量にご注意のうえ、お楽しみください。</p>
        </div>
      </section>`;
    window.setTimeout(() => {
      if (runtime.screen === "audio-notice") transitionPhase(showGuideSelect);
    }, AUDIO_NOTICE_DURATION_MS);
  }

  function showGuideSelect() {
    stopNarratorVoice();
    runtime = freshRuntime();
    app.innerHTML = `
      <section class="screen guide-select fade-in">
        <h1 class="prompt">暗闇の中、貴方が目にした人は……</h1>
        <div class="guide-grid">
          <button class="guide-card" data-guide="male" aria-label="男性の案内人、CV ${escapeHtml(NARRATOR_CV.male)}"><img src="${ASSETS.male}" alt="男性の案内人"><span class="guide-cv">CV：${escapeHtml(NARRATOR_CV.male)}</span></button>
          <button class="guide-card" data-guide="female" aria-label="女性の案内人、CV ${escapeHtml(NARRATOR_CV.female)}"><img src="${ASSETS.female}" alt="女性の案内人"><span class="guide-cv">CV：${escapeHtml(NARRATOR_CV.female)}</span></button>
        </div>
        <div class="confirm-guide"><p>この案内人ですか？</p><button class="choice-btn" data-confirm>はい</button></div>
      </section>`;
    let selected = progress.guide;
    const update = () => {
      app.querySelectorAll(".guide-card").forEach((card) => card.classList.toggle("selected", card.dataset.guide === selected));
      app.querySelector(".confirm-guide").classList.toggle("visible", Boolean(selected));
    };
    app.querySelectorAll(".guide-card").forEach((card) => card.addEventListener("click", () => { selected = card.dataset.guide; update(); }));
    app.querySelector("[data-confirm]").addEventListener("click", () => {
      progress.guide = selected;
      persistProgress();
      playNarratorSequence("intro");
    });
    update();
  }

  function showIntroChoice() {
    openModal("手伝いますか？", "", [
      { label: "はい", action: () => { closeModal(); playNarratorSequence("introYes"); } },
      { label: "いいえ", action: () => { closeModal(); playNarratorSequence("introNo"); } }
    ]);
  }

  function showCredits() {
    openModal(
      "クレジット",
      `案内人　男：${NARRATOR_CV.male}様\n案内人　女：${NARRATOR_CV.female}様\n\n制作：高無メイ`,
      [{ label: "閉じる", action: closeModal }]
    );
  }

  function voiceReviewCardMarkup(meta, guide) {
    const lines = narratorLines(meta.key);
    const firstFile = narratorVoiceFileName(meta.key, 0, guide);
    const lastFile = narratorVoiceFileName(meta.key, Math.max(0, lines.length - 1), guide);
    const fileRange = firstFile === lastFile ? firstFile : `${firstFile} ～ ${lastFile}`;
    return `
      <article class="voice-review-card">
        <div class="voice-review-card-copy">
          <h3>${escapeHtml(meta.label)}</h3>
          <p>${lines.length}ボイス</p>
          <code>${escapeHtml(fileRange)}</code>
        </div>
        <button class="menu-btn" data-review-sequence="${escapeHtml(meta.key)}">確認する</button>
      </article>`;
  }

  function showVoiceReview() {
    stopNarratorVoice();
    narratorPlaying = false;
    runtime = freshRuntime();
    runtime.screen = "voice-review";
    const guide = progress.guide === "female" ? "female" : "male";
    const groups = [...new Set(NARRATOR_SEQUENCE_META.map((item) => item.group))];
    app.innerHTML = `
      <section class="screen voice-review-screen fade-in">
        <header class="voice-review-header">
          <p class="voice-review-kicker">VOICE CHECK</p>
          <h1>ボイス確認</h1>
          <p>案内人の語りを場面単位で呼び出し、ゲーム画面上で確認できます。</p>
        </header>
        <div class="voice-guide-switch" role="group" aria-label="確認する案内人">
          <button class="voice-guide-button ${guide === "male" ? "active" : ""}" data-review-guide="male">
            <span>男性案内人</span><small>CV：${escapeHtml(NARRATOR_CV.male)}</small>
          </button>
          <button class="voice-guide-button ${guide === "female" ? "active" : ""}" data-review-guide="female">
            <span>女性案内人</span><small>CV：${escapeHtml(NARRATOR_CV.female)}</small>
          </button>
        </div>
        <div class="voice-review-groups">
          ${groups.map((group) => `
            <section class="voice-review-group">
              <h2>${escapeHtml(group)}</h2>
              <div class="voice-review-list">
                ${NARRATOR_SEQUENCE_META.filter((item) => item.group === group).map((item) => voiceReviewCardMarkup(item, guide)).join("")}
              </div>
            </section>`).join("")}
        </div>
        <footer class="voice-review-footer">
          <p>現在の確認対象：${guide === "female" ? "女性案内人" : "男性案内人"}（CV：${escapeHtml(NARRATOR_CV[guide])}）</p>
          <button class="menu-btn subtle-btn" data-voice-review-back>本棚に戻る</button>
        </footer>
      </section>`;
    app.querySelectorAll("[data-review-guide]").forEach((button) => button.addEventListener("click", () => {
      progress.guide = button.dataset.reviewGuide;
      persistProgress();
      showVoiceReview();
    }));
    app.querySelectorAll("[data-review-sequence]").forEach((button) => button.addEventListener("click", () => {
      startVoiceReviewSequence(button.dataset.reviewSequence);
    }));
    app.querySelector("[data-voice-review-back]").addEventListener("click", showChapterSelect);
  }

  function startVoiceReviewSequence(key) {
    if (!NARRATOR_SEQUENCE_BY_KEY[key] || !narratorLines(key).length) return;
    runtime = {
      ...freshRuntime(),
      screen: "novel",
      phase: "narrator",
      narratorKey: key,
      narratorIndex: 0,
      voiceReview: true
    };
    playNarratorSequence(key);
  }

  function showRefusalEnd() {
    stopNarratorVoice();
    app.innerHTML = `<section class="screen" style="display:grid;place-items:center;background:#000"><p style="color:#777;letter-spacing:.2em">……</p></section>`;
  }

  function showChapterSelect() {
    stopNarratorVoice();
    runtime.screen = "chapter-select";
    app.innerHTML = `
      <section class="screen chapter-select fade-in">
        <div class="library-wall" aria-hidden="true">
          <span class="wall-frame frame-left"></span>
          <span class="wall-frame frame-right"></span>
        </div>
        <header class="chapter-header">
          <span class="library-kicker">THE ARCHIVE OF ENDS</span>
          <h1>章選択</h1>
          <p>読み解く一冊を、お選びください。</p>
        </header>
        <div class="bookshelf" aria-label="章選択">
          <div class="shelf-cabinet">
            <span class="shelf-corner corner-left" aria-hidden="true"></span>
            <span class="shelf-corner corner-right" aria-hidden="true"></span>
            <div class="chapter-grid">
              ${chapterShelfMarkup()}
            </div>
            <div class="shelf-board" aria-hidden="true"><span></span></div>
          </div>
        </div>
        <div class="chapter-footer">
          <div class="chapter-footer-tools">
            <button class="menu-btn credit-btn" data-credits>クレジット</button>
            <button class="menu-btn voice-review-entry" data-voice-review>ボイス確認</button>
          </div>
          <button class="menu-btn" data-menu>メニュー</button>
        </div>
      </section>`;
    app.querySelector("[data-menu]").addEventListener("click", showMenu);
    app.querySelector("[data-credits]").addEventListener("click", showCredits);
    app.querySelector("[data-voice-review]").addEventListener("click", showVoiceReview);
    app.querySelectorAll("[data-chapter]").forEach((button) => button.addEventListener("click", () => {
      const chapter = Number(button.dataset.chapter);
      showStoryTree(chapter);
    }));
  }

  function decorativeBookMarkup(classes) {
    return `<span class="decor-book ${classes}" aria-hidden="true"><i></i></span>`;
  }

  function chapterShelfMarkup() {
    return [
      decorativeBookMarkup("book-wine book-tall"),
      decorativeBookMarkup("book-brown book-mid book-lean-left optional-book"),
      decorativeBookMarkup("book-ink book-short book-slim"),
      chapterCardMarkup(1),
      decorativeBookMarkup("book-umber book-mid"),
      decorativeBookMarkup("book-black book-tall book-slim optional-book"),
      decorativeBookMarkup("book-moss book-short"),
      decorativeBookMarkup("book-wine book-mid book-lean-right optional-book"),
      chapterCardMarkup(2),
      decorativeBookMarkup("book-brown book-short book-slim"),
      decorativeBookMarkup("book-ink book-tall optional-book"),
      decorativeBookMarkup("book-umber book-mid book-lean-left"),
      decorativeBookMarkup("book-black book-short book-slim optional-book"),
      chapterCardMarkup(3),
      decorativeBookMarkup("book-moss book-mid"),
      decorativeBookMarkup("book-wine book-tall book-slim optional-book"),
      decorativeBookMarkup("book-brown book-short book-lean-right"),
      decorativeBookMarkup("book-ink book-mid optional-book"),
      chapterCardMarkup(4),
      decorativeBookMarkup("book-umber book-short book-slim"),
      decorativeBookMarkup("book-black book-tall optional-book"),
      decorativeBookMarkup("book-moss book-mid book-lean-left"),
      decorativeBookMarkup("book-wine book-short book-slim optional-book")
    ].join("");
  }

  function chapterCardMarkup(chapter) {
    const isUnlocked = progress.unlockedChapters.includes(chapter);
    const state = isUnlocked ? (chapter === 1 ? "" : "NEW") : "LOCK";
    return `
      <button class="chapter-card ${isUnlocked ? "unsealed" : "sealed"}" data-chapter="${chapter}" ${isUnlocked ? "" : "disabled"} aria-label="第${chapter}章${state ? `、${state}` : ""}">
        <span class="book-ridge ridge-top" aria-hidden="true"></span>
        <span class="book-ridge ridge-bottom" aria-hidden="true"></span>
        <span class="book-ornament" aria-hidden="true">◆</span>
        <span class="chapter-number">第${chapter}章</span>
        ${state ? `<span class="chapter-state">${state}</span>` : ""}
        <span class="chapter-rule" aria-hidden="true"><i></i></span>
        <span class="book-page-edge" aria-hidden="true"></span>
      </button>`;
  }

  function isStoryUnlocked(id) {
    return Object.values(progress.unlockedStories || {}).some((ids) => Array.isArray(ids) && ids.includes(id));
  }

  function storyNodeMarkup(story) {
    const isUnlocked = story.available || isStoryUnlocked(story.id);
    const isRead = progress.readStories.includes(story.id);
    const state = isRead ? "読了" : isUnlocked && story.id !== "1-1" ? "NEW" : !isUnlocked ? "LOCK" : "";
    return `
      <div class="tree-node node-${story.position}">
        <button class="story-node ${story.variant ? "altered" : ""}" data-story="${story.id}" ${isUnlocked ? "" : "disabled"} aria-label="${story.label}${story.variant ? `（${story.variant}）` : ""}${state ? `、${state}` : ""}">
          <span class="story-number">${story.label}</span>
          ${story.variant ? `<span class="story-variant">（${story.variant}）</span>` : '<span class="story-variant" aria-hidden="true">&nbsp;</span>'}
          ${state ? `<span class="story-state">${state}</span>` : ""}
          <span class="node-corner corner-top"></span><span class="node-corner corner-bottom"></span>
        </button>
      </div>`;
  }

  function treeConnector(type) {
    return `<div class="tree-connector connector-${type}" aria-hidden="true"><span class="arm-left"></span><span class="arm-right"></span></div>`;
  }

  function visibleStoryLevels(chapter) {
    const visibleStories = (CHAPTER_STORIES[chapter] || []).filter((story) => story.available || isStoryUnlocked(story.id));
    const labels = [...new Set(visibleStories.map((story) => story.label))];
    return labels.map((label) => visibleStories.filter((story) => story.label === label));
  }

  function connectorBetween(previousLevel, nextLevel) {
    if (previousLevel.length === 1 && nextLevel.length === 2) return "split";
    if (previousLevel.length === 2 && nextLevel.length === 2) return "parallel";
    if (previousLevel.length === 2 && nextLevel.length === 1) return "merge";
    return "straight";
  }

  function storyTreeMarkup(levels) {
    return levels.map((stories, index) => {
      const connector = index === 0 ? "" : treeConnector(connectorBetween(levels[index - 1], stories));
      const levelClass = stories.length > 1 ? "tree-pair" : "tree-single";
      return `${connector}<div class="tree-level ${levelClass}">${stories.map(storyNodeMarkup).join("")}</div>`;
    }).join("");
  }

  function showStoryTree(chapter = runtime.chapter || 1) {
    stopNarratorVoice();
    runtime.screen = "story-select";
    runtime.chapter = chapter;
    const levels = visibleStoryLevels(chapter);
    const hasAlteredStory = levels.some((stories) => stories.some((story) => story.variant));
    app.innerHTML = `
      <section class="screen story-select fade-in">
        <header class="tree-header">
          <h1>第${chapter}章</h1>
          <p>結末へ至る物語を、お選びください。</p>
        </header>
        <div class="story-tree story-tree-branched" aria-label="第${chapter}章の物語分岐図">
          ${storyTreeMarkup(levels)}
        </div>
        <div class="select-footer">
          <button class="menu-btn subtle-btn" data-back-chapters>本棚に戻る</button>
          ${hasAlteredStory ? '<span class="tree-legend"><i></i>改変された物語</span>' : ""}
          <div class="select-footer-tools"><button class="menu-btn voice-review-entry" data-voice-review>ボイス確認</button><button class="menu-btn" data-menu>メニュー</button></div>
        </div>
      </section>`;
    app.querySelector("[data-menu]").addEventListener("click", showMenu);
    app.querySelector("[data-voice-review]").addEventListener("click", showVoiceReview);
    app.querySelector("[data-back-chapters]").addEventListener("click", showChapterSelect);
    app.querySelectorAll("[data-story]").forEach((button) => button.addEventListener("click", () => {
      startStory(button.dataset.story);
    }));
  }

  function showStorySelect() {
    showStoryTree();
  }

  function startStory(id) {
    if (id === "1-1") return startStoryOne();
    if (id.startsWith("2-")) return startStoryTwo(id);
    if (id.startsWith("3-")) return startStoryThree(id);
    if (id.startsWith("4-")) return startStoryFour(id);
    openModal("制作中", "この物語は、次の実装で組み込みます。", [{ label: "閉じる", action: closeModal }]);
  }

  function startStoryOne() {
    runtime = { ...freshRuntime(), screen: "novel", storyId: "1-1", phase: progress.firstBadEndSeen ? "normal" : "first-lead" };
    if (!progress.firstBadEndSeen) playNarratorSequence("firstLead");
    else startNormalStory();
  }

  function startStoryTwo(id) {
    const segments = {
      "2-1": "story1",
      "2-2": "story2",
      "2-2a": "story3"
    };
    const segmentKey = segments[id];
    if (!segmentKey) return;
    runtime = { ...freshRuntime(), screen: "novel", chapter: 2, storyId: id, segmentKey, phase: "normal" };
    if (id === "2-1" && !progress.chapterFirstBadEnds?.[2]) {
      runtime.phase = "first-lead";
      return playNarratorSequence("chapter2Lead");
    }
    startChapterTwoSegment(segmentKey, id);
  }

  function startStoryThree(id) {
    const segments = {
      "3-1": "story1",
      "3-2": "story2",
      "3-2a": "story3"
    };
    const segmentKey = segments[id];
    if (!segmentKey) return;
    runtime = { ...freshRuntime(), screen: "novel", chapter: 3, storyId: id, segmentKey, phase: "normal" };
    if (id === "3-1" && !progress.chapterFirstBadEnds?.[3]) {
      runtime.phase = "first-lead";
      return playNarratorSequence("chapter3Lead");
    }
    startChapterThreeSegment(segmentKey, id);
  }

  function startStoryFour(id) {
    const segments = {
      "4-1": "story1",
      "4-2": "story2",
      "4-2a": "story4",
      "4-3": "story3",
      "4-3a": "story5"
    };
    const segmentKey = segments[id];
    if (!segmentKey) return;
    runtime = { ...freshRuntime(), screen: "novel", chapter: 4, storyId: id, segmentKey, phase: "normal" };
    if (id === "4-1" && !progress.chapterFirstBadEnds?.[4]) {
      runtime.phase = "first-lead";
      return playNarratorSequence("chapter4Lead");
    }
    startChapterFourSegment(segmentKey, id);
  }

  function startChapterTwoSegment(segmentKey, storyId = runtime.storyId, resetHistory = true) {
    runtime.screen = "novel";
    runtime.chapter = 2;
    runtime.storyId = storyId;
    runtime.segmentKey = segmentKey;
    runtime.phase = segmentKey.endsWith("Altered") ? "success" : "normal";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = segmentKey.endsWith("Altered");
    runtime.interventionPlayback = false;
    runtime.pendingInterventionSuccess = false;
    if (resetHistory) runtime.history = [];
    runtime.currentBackground = "暗闇";
    runtime.currentCharacter = "";
    runtime.phoneCallActive = false;
    runtime.phoneCallStatus = "";
    runtime.phoneCallJustEnded = false;
    renderStoryEntry();
  }

  function startChapterThreeSegment(segmentKey, storyId = runtime.storyId, resetHistory = true) {
    runtime.screen = "novel";
    runtime.chapter = 3;
    runtime.storyId = storyId;
    runtime.segmentKey = segmentKey;
    runtime.phase = segmentKey.endsWith("Altered") ? "success" : "normal";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = segmentKey.endsWith("Altered");
    runtime.interventionPlayback = false;
    runtime.pendingInterventionSuccess = false;
    if (resetHistory) runtime.history = [];
    runtime.currentBackground = "暗闇";
    runtime.currentCharacter = "";
    runtime.phoneCallActive = false;
    runtime.phoneCallStatus = "";
    runtime.phoneCallJustEnded = false;
    renderStoryEntry();
  }

  function startChapterFourSegment(segmentKey, storyId = runtime.storyId, resetHistory = true) {
    runtime.screen = "novel";
    runtime.chapter = 4;
    runtime.storyId = storyId;
    runtime.segmentKey = segmentKey;
    runtime.phase = segmentKey.endsWith("Altered") ? "success" : "normal";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = segmentKey.endsWith("Altered");
    runtime.interventionPlayback = false;
    runtime.pendingInterventionSuccess = false;
    if (resetHistory) runtime.history = [];
    runtime.currentBackground = "暗闇";
    runtime.currentCharacter = "";
    runtime.phoneCallActive = false;
    runtime.phoneCallStatus = "";
    runtime.phoneCallJustEnded = false;
    renderStoryEntry();
  }

  function startFirstBadEnd() {
    if (runtime.chapter === 2) return startChapterTwoFirstBadEnd();
    if (runtime.chapter === 3) return startChapterThreeFirstBadEnd();
    if (runtime.chapter === 4) return startChapterFourFirstBadEnd();
    runtime.phase = "first-badend";
    runtime.index = DATA.story.findIndex((entry) => entry.firstStart);
    renderStoryEntry();
  }

  function startChapterTwoFirstBadEnd() {
    runtime.phase = "first-badend";
    runtime.segmentKey = "firstBadEnd";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = true;
    runtime.currentBackground = "駅のホーム・夜";
    renderStoryEntry();
  }

  function startChapterThreeFirstBadEnd() {
    runtime.phase = "first-badend";
    runtime.segmentKey = "firstBadEnd";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = true;
    runtime.currentBackground = "病室504・深夜";
    renderStoryEntry();
  }

  function startChapterFourFirstBadEnd() {
    runtime.phase = "first-badend";
    runtime.segmentKey = "firstBadEnd";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = true;
    runtime.currentBackground = "黒江第三ビル屋上・夜";
    renderStoryEntry();
  }

  function startNormalStory() {
    runtime.phase = "normal";
    runtime.index = 0;
    runtime.usedInterventions = 0;
    runtime.interventionLocked = false;
    runtime.history = [];
    runtime.currentBackground = "コンビニ前";
    renderStoryEntry();
  }

  function currentSequence() {
    if (runtime.chapter === 2) return DATA_TWO.segments[runtime.segmentKey]?.entries || [];
    if (runtime.chapter === 3) return DATA_THREE.segments[runtime.segmentKey]?.entries || [];
    if (runtime.chapter === 4) return DATA_FOUR.segments[runtime.segmentKey]?.entries || [];
    return DATA.story;
  }

  function currentSegmentMeta() {
    if (runtime.chapter === 2) return DATA_TWO.segments[runtime.segmentKey] || null;
    if (runtime.chapter === 3) return DATA_THREE.segments[runtime.segmentKey] || null;
    if (runtime.chapter === 4) return DATA_FOUR.segments[runtime.segmentKey] || null;
    return null;
  }

  function isGrayWomanCharacter(value = "") {
    const name = String(value);
    return name.startsWith("灰色のカーディガンの女性") && !name.includes("削除");
  }

  function renderStoryEntry(skipBackgroundTransition = false) {
    const entry = currentSequence()[runtime.index];
    if (!entry) {
      if (runtime.chapter === 2) return finishStoryTwoSegment();
      if (runtime.chapter === 3) return finishStoryThreeSegment();
      if (runtime.chapter === 4) return finishStoryFourSegment();
      return finishStory(false);
    }
    const backgroundChanged = Boolean(entry.background && entry.background !== runtime.currentBackground);
    if (backgroundChanged && !skipBackgroundTransition && !phaseTransitioning) {
      return transitionPhase(() => {
        renderStoryEntry(true);
      });
    }
    runtime.currentEntry = entry;
    runtime.grayWomanAppearing = false;
    const sceneChanged = entry.text === "場面転換"
      || Boolean(entry.background && entry.background !== runtime.currentBackground)
      || String(entry.effect || "").includes("場面転換");
    if (sceneChanged) runtime.currentCharacter = "";
    if (entry.background) runtime.currentBackground = entry.background;
    if (entry.character) {
      const nextCharacter = entry.character.includes("削除") || entry.character === "なし" ? "" : entry.character;
      runtime.grayWomanAppearing = runtime.chapter === 4
        && isGrayWomanCharacter(nextCharacter)
        && !isGrayWomanCharacter(runtime.currentCharacter);
      runtime.currentCharacter = nextCharacter;
    }
    updatePhoneCall(entry);
    if (entry.text === "場面転換") {
      const advanceScene = () => {
        runtime.index += 1;
        renderStoryEntry();
      };
      if (phaseTransitioning) advanceScene();
      else transitionPhase(advanceScene);
      return;
    }
    if (entry.text === "BADEND") return handleBadEnd();
    if (entry.text === "END") {
      if (runtime.chapter === 2) return finishStoryTwoSegment();
      if (runtime.chapter === 3) return finishStoryThreeSegment();
      if (runtime.chapter === 4) return finishStoryFourSegment();
      return finishStory(true);
    }
    addHistory(entry.speaker, entry.text);
    renderNovel(entry.speaker, entry.text, false);
    runtime.grayWomanAppearing = false;
  }

  function updatePhoneCall(entry) {
    const text = String(entry.text || "");
    const character = String(entry.character || "");
    const se = String(entry.se || "");
    runtime.phoneCallJustEnded = false;

    if (character === "小宮山直子") {
      runtime.phoneCallActive = false;
      runtime.phoneCallStatus = "";
    }

    const callEndPhrase = /(?:通話|電話)[^。\n]{0,24}(?:切|終)/.test(text);
    const keepCallPhrase = /(?:通話|電話)[^。\n]{0,24}(?:切らない|切らず|切らぬ)/.test(text);
    const callEnded = callEndPhrase && !keepCallPhrase;
    if (callEnded) {
      runtime.phoneCallActive = false;
      runtime.phoneCallStatus = "通話終了";
      runtime.phoneCallJustEnded = true;
      runtime.currentCharacter = "";
      return;
    }

    if (se.includes("着信") || text.includes("電話がかかってきた")) {
      runtime.phoneCallActive = true;
      runtime.phoneCallStatus = "着信中";
    }
    if (text.includes("連絡を入れた")) {
      runtime.phoneCallActive = true;
      runtime.phoneCallStatus = "発信中";
    }
    if (character.includes("通話中") || se.includes("通話音")) {
      runtime.phoneCallActive = true;
      runtime.phoneCallStatus = "通話中";
    }
  }

  function effectClasses(effect = "") {
    const value = String(effect);
    const classes = [];
    if (value.includes("赤く") || value.includes("赤いフラッシュ")) classes.push("effect-red-pulse");
    if (value.includes("白") && (value.includes("フェード") || value.includes("フラッシュ"))) classes.push("effect-white-flash");
    if (value.includes("場面転換") && value.includes("黒フェード")) classes.push("effect-black-in");
    else if (value.includes("暗転") || value.includes("黒フェード")) classes.push("effect-black-out");
    if (value.includes("暗く")) classes.push("effect-dim");
    if (value.includes("歪")) classes.push("effect-distort");
    if (value.includes("大きく揺") || value.includes("激しく揺")) classes.push("effect-shake-heavy");
    else if (value.includes("揺")) classes.push("effect-shake");
    if (value.includes("モニター")) classes.push("effect-monitor");
    return classes.join(" ");
  }

  function phoneCallMarkup(speaker) {
    if (!runtime.phoneCallActive && !runtime.phoneCallJustEnded) return "";
    const entry = runtime.currentEntry || {};
    const status = runtime.phoneCallJustEnded ? "通話終了" : runtime.phoneCallStatus || "通話中";
    const speaking = speaker === "小宮山直子" ? " speaking" : "";
    const noisy = String(entry.se || "").includes("ノイズ") ? " noisy" : "";
    const ended = runtime.phoneCallJustEnded ? " ended" : "";
    return `
      <aside class="phone-call${speaking}${noisy}${ended}" aria-label="小宮山チーフとの電話 ${escapeHtml(status)}">
        <div class="call-header"><span class="call-dot"></span><span>VOICE LINK</span><i></i><i></i><i></i></div>
        <p class="call-name">小宮山チーフ</p>
        <div class="call-wave" aria-hidden="true">${"<b></b>".repeat(9)}</div>
        <p class="call-status">${escapeHtml(status)}${noisy ? " ／ ノイズ" : ""}</p>
      </aside>`;
  }

  function renderNovel(speaker, text, interventionText = false) {
    const guideMode = speaker === "案内人";
    const guideImage = ASSETS[`${progress.guide || "male"}Stand`];
    const bg = guideMode ? "" : runtime.currentBackground || "暗闇";
    const sceneAsset = guideMode ? "" : SCENE_ASSETS[bg] || "";
    const characterName = guideMode ? "" : runtime.currentCharacter;
    const suppressPhonePortrait = characterName === "小宮山直子・通話中"
      || (runtime.phoneCallActive && characterName.startsWith("小宮山直子"));
    const characterImage = suppressPhonePortrait ? "" : CHARACTER_ASSETS[characterName] || "";
    const visualEffects = [
      effectClasses(runtime.currentEntry?.effect || ""),
      runtime.grayWomanAppearing ? "effect-distort" : ""
    ].filter(Boolean).join(" ");
    const sceneClass = sceneAsset ? "has-image" : "";
    const sceneStyle = sceneAsset ? ` style="--scene-image: url('${sceneAsset}')"` : "";
    const characterMarkup = guideMode
      ? `<div class="character"><img src="${guideImage}" alt="案内人"></div>`
      : characterImage
        ? `<div class="character story-character"><img src="${characterImage}" alt="${escapeHtml(characterName)}"></div>`
        : "";
    const voiceReviewFile = guideMode && runtime.voiceReview
      ? narratorVoiceFileName(runtime.narratorKey, runtime.narratorIndex)
      : "";
    const topUi = guideMode && runtime.voiceReview
      ? `<div class="voice-playback-toolbar">
          <span class="voice-file-name">${escapeHtml(voiceReviewFile)}</span>
          <span class="voice-playback-status" data-voice-status aria-live="polite">自動再生を開始します。</span>
          <button class="menu-btn voice-replay-button" data-replay-voice>音声を再生</button>
          <button class="menu-btn subtle-btn" data-voice-review-back>一覧へ戻る</button>
        </div>`
      : `${runtime.phase === "normal" ? `<span class="remaining">介入 残り ${Math.max(0, interventionLimit() - runtime.usedInterventions)}回</span><button class="menu-btn intervention" data-intervene ${canIntervene() ? "" : "disabled"}>介入</button>` : ""}<button class="hamburger" data-menu aria-label="メニュー"><span></span><span></span><span></span></button>`;
    app.innerHTML = `
      <section class="screen novel ${guideMode ? "narrator-mode" : ""} ${interventionText ? "intervention-line" : ""} ${visualEffects}">
        <div class="scene-bg ${sceneClass}" data-scene="${escapeHtml(bg)}" aria-label="${bg ? `背景：${escapeHtml(bg)}` : ""}"${sceneStyle}></div>
        <div class="scene-effect" aria-hidden="true"></div>
        ${characterMarkup}
        ${guideMode ? "" : phoneCallMarkup(speaker)}
        <div class="top-ui">${topUi}</div>
        <div class="textbox" data-next>
          <div class="speaker">${escapeHtml(speaker || "　")}</div>
          <p class="line">${escapeHtml(text)}</p><span class="next-mark">▼</span>
        </div>
      </section>`;
    const menuButton = app.querySelector("[data-menu]");
    if (menuButton) menuButton.addEventListener("click", (event) => { event.stopPropagation(); showMenu(); });
    const interventionButton = app.querySelector("[data-intervene]");
    if (interventionButton) interventionButton.addEventListener("click", (event) => { event.stopPropagation(); intervene(); });
    const replayButton = app.querySelector("[data-replay-voice]");
    if (replayButton) replayButton.addEventListener("click", (event) => {
      event.stopPropagation();
      playNarratorVoice();
    });
    const voiceReviewBackButton = app.querySelector("[data-voice-review-back]");
    if (voiceReviewBackButton) voiceReviewBackButton.addEventListener("click", (event) => {
      event.stopPropagation();
      showVoiceReview();
    });
  }

  function interventionLimit() {
    return runtime.chapter === 4 ? 3 : 2;
  }

  function canIntervene() {
    const intervention = runtime.currentEntry?.intervention;
    return runtime.phase === "normal" && runtime.usedInterventions < interventionLimit() && !runtime.interventionLocked && Boolean(intervention);
  }

  function intervene() {
    if (!canIntervene()) return;
    runtime.usedInterventions += 1;
    const entry = runtime.currentEntry;
    const success = runtime.chapter === 2 || runtime.chapter === 3 || runtime.chapter === 4 ? entry.toAltered : entry.successStart;
    const message = entry.intervention;
    if (success) runtime.interventionLocked = true;
    runtime.interventionPlayback = true;
    runtime.pendingInterventionSuccess = success;
    addHistory("介入", message);
    renderNovel("介入", message, true);
    app.querySelector("[data-next]").addEventListener("click", (event) => {
      event.stopPropagation();
      runtime.interventionPlayback = false;
      runtime.pendingInterventionSuccess = false;
      if (success) {
        runtime.phase = "success";
        if (runtime.chapter === 2 || runtime.chapter === 3 || runtime.chapter === 4) {
          const segment = currentSegmentMeta();
          runtime.segmentKey = segment.branchTo;
          runtime.storyId = segment.alteredStoryId;
          runtime.index = 0;
          runtime.interventionLocked = true;
        } else {
          runtime.index = DATA.story.findIndex((item) => item.text === "BADEND") + 1;
        }
      } else {
        runtime.index += 1;
      }
      renderStoryEntry();
    }, { once: true });
  }

  function advanceStory() {
    runtime.index += 1;
    renderStoryEntry();
  }

  function handleBadEnd() {
    if (runtime.phase === "first-badend") {
      progress.firstBadEndSeen = true;
      persistProgress();
      transitionPhase(() => playNarratorSequence("firstAfter"));
    } else {
      transitionPhase(() => playNarratorSequence("repeatAfter"));
    }
  }

  function unlockStory(chapter, id) {
    progress.unlockedStories[chapter] = Array.from(new Set([...(progress.unlockedStories[chapter] || []), id]));
  }

  function markStoryRead(id) {
    if (!progress.readStories.includes(id)) progress.readStories.push(id);
  }

  function finishStoryTwoSegment() {
    const segment = currentSegmentMeta();
    const outcome = segment?.outcome;
    const alreadyRead = progress.readStories.includes(runtime.storyId);

    if (outcome === "firstBadEnd") {
      progress.chapterFirstBadEnds[2] = true;
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter2FirstAfter"));
    }

    if (outcome === "unlockStory2") {
      markStoryRead("2-1");
      const wasUnlocked = isStoryUnlocked("2-2");
      unlockStory(2, "2-2");
      persistProgress();
      return wasUnlocked ? showStoryTree(2) : showUnlock("2-2", "story");
    }

    if (outcome === "unlockAlteredStory2") {
      markStoryRead("2-1");
      const wasUnlocked = isStoryUnlocked("2-2a");
      unlockStory(2, "2-2a");
      persistProgress();
      return alreadyRead || wasUnlocked ? showStoryTree(2) : showUnlock("2-2a", "story");
    }

    if (outcome === "badEndOne") {
      markStoryRead("2-2");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter2BadEndOneAfter"));
    }

    if (outcome === "badEndTwo") {
      markStoryRead("2-2a");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter2BadEndTwoAfter"));
    }

    if (outcome === "clearChapter") {
      markStoryRead("2-2a");
      const nextChapterAlreadyUnlocked = progress.unlockedChapters.includes(3);
      if (nextChapterAlreadyUnlocked) {
        persistProgress();
        return showStoryTree(2);
      }
      progress.unlockedChapters = Array.from(new Set([...(progress.unlockedChapters || []), 3]));
      unlockStory(3, "3-1");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter2ClearAfter"));
    }

    showStoryTree(2);
  }

  function finishStoryThreeSegment() {
    const segment = currentSegmentMeta();
    const outcome = segment?.outcome;
    const alreadyRead = progress.readStories.includes(runtime.storyId);

    if (outcome === "firstBadEnd") {
      progress.chapterFirstBadEnds[3] = true;
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter3FirstAfter"));
    }

    if (outcome === "unlockStory2") {
      markStoryRead("3-1");
      const wasUnlocked = isStoryUnlocked("3-2");
      unlockStory(3, "3-2");
      persistProgress();
      return wasUnlocked ? showStoryTree(3) : showUnlock("3-2", "story");
    }

    if (outcome === "unlockAlteredStory2") {
      markStoryRead("3-1");
      const wasUnlocked = isStoryUnlocked("3-2a");
      unlockStory(3, "3-2a");
      persistProgress();
      return alreadyRead || wasUnlocked ? showStoryTree(3) : showUnlock("3-2a", "story");
    }

    if (outcome === "badEndOne") {
      markStoryRead("3-2");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter3BadEndOneAfter"));
    }

    if (outcome === "badEndTwo") {
      markStoryRead("3-2a");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter3BadEndTwoAfter"));
    }

    if (outcome === "clearChapter") {
      markStoryRead("3-2a");
      const nextChapterAlreadyUnlocked = progress.unlockedChapters.includes(4);
      if (nextChapterAlreadyUnlocked) {
        persistProgress();
        return showStoryTree(3);
      }
      progress.unlockedChapters = Array.from(new Set([...(progress.unlockedChapters || []), 4]));
      unlockStory(4, "4-1");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter3ClearAfter"));
    }

    showStoryTree(3);
  }

  function finishStoryFourSegment() {
    const segment = currentSegmentMeta();
    const outcome = segment?.outcome;

    if (outcome === "firstBadEnd") {
      progress.chapterFirstBadEnds[4] = true;
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter4FirstAfter"));
    }

    if (outcome === "unlockStory2") {
      markStoryRead("4-1");
      const wasUnlocked = isStoryUnlocked("4-2");
      unlockStory(4, "4-2");
      persistProgress();
      return wasUnlocked ? showStoryTree(4) : showUnlock("4-2", "story");
    }

    if (outcome === "unlockAlteredStory2") {
      markStoryRead("4-1");
      const wasUnlocked = isStoryUnlocked("4-2a");
      unlockStory(4, "4-2a");
      persistProgress();
      return wasUnlocked ? showStoryTree(4) : showUnlock("4-2a", "story");
    }

    if (outcome === "unlockStory3") {
      markStoryRead("4-2");
      const wasUnlocked = isStoryUnlocked("4-3");
      unlockStory(4, "4-3");
      persistProgress();
      return wasUnlocked ? showStoryTree(4) : showUnlock("4-3", "story");
    }

    if (outcome === "badEndOne") {
      markStoryRead("4-3");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter4BadEndOneAfter"));
    }

    if (outcome === "badEndTwo") {
      markStoryRead("4-2a");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter4BadEndTwoAfter"));
    }

    if (outcome === "unlockAlteredStory3") {
      markStoryRead("4-2a");
      const wasUnlocked = isStoryUnlocked("4-3a");
      unlockStory(4, "4-3a");
      persistProgress();
      return wasUnlocked ? showStoryTree(4) : showUnlock("4-3a", "story");
    }

    if (outcome === "badEndThree") {
      markStoryRead("4-3a");
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter4BadEndThreeAfter"));
    }

    if (outcome === "clearGame") {
      markStoryRead("4-3a");
      progress.gameCompleted = true;
      persistProgress();
      return transitionPhase(() => playNarratorSequence("chapter4ClearAfter"));
    }

    showStoryTree(4);
  }

  function finishStory(success) {
    if (!success) return showStorySelect(runtime.chapter);
    markStoryRead("1-1");
    progress.unlockedChapters = Array.from(new Set([...(progress.unlockedChapters || []), 2]));
    unlockStory(2, "2-1");
    persistProgress();
    transitionPhase(() => playNarratorSequence("clearAfter"));
  }

  function showUnlock(id, destination = "chapter") {
    const chapterEntry = Object.entries(CHAPTER_STORIES).find(([, stories]) => stories.some((item) => item.id === id));
    const story = chapterEntry?.[1].find((item) => item.id === id);
    if (destination === "story") showStoryTree(Number(chapterEntry?.[0] || runtime.chapter));
    else showChapterSelect();
    const label = story ? `第${chapterEntry[0]}章　${story.label}${story.variant ? `（${story.variant}）` : ""}` : id;
    openModal("新しい物語が解放されました", label, [{ label: "確認", action: closeModal }]);
  }

  function playNarratorSequence(key, startIndex = 0) {
    narratorPlaying = true;
    runtime.screen = "novel";
    runtime.phase = runtime.phase || "narrator";
    runtime.narratorKey = key;
    runtime.narratorIndex = startIndex;
    renderNarratorCurrent();
  }

  function narratorLines(key) {
    const chapterTwoSequences = DATA_TWO ? {
      chapter2Lead: DATA_TWO.lead,
      chapter2FirstAfter: DATA_TWO.firstAfter,
      chapter2BadEndOneAfter: DATA_TWO.badEndOneAfter,
      chapter2BadEndTwoAfter: DATA_TWO.badEndTwoAfter,
      chapter2ClearAfter: DATA_TWO.clearAfter
    } : {};
    const chapterThreeSequences = DATA_THREE ? {
      chapter3Lead: DATA_THREE.lead,
      chapter3FirstAfter: DATA_THREE.firstAfter,
      chapter3BadEndOneAfter: DATA_THREE.badEndOneAfter,
      chapter3BadEndTwoAfter: DATA_THREE.badEndTwoAfter,
      chapter3ClearAfter: DATA_THREE.clearAfter
    } : {};
    const chapterFourSequences = DATA_FOUR ? {
      chapter4Lead: DATA_FOUR.lead,
      chapter4FirstAfter: DATA_FOUR.firstAfter,
      chapter4BadEndOneAfter: DATA_FOUR.badEndOneAfter,
      chapter4BadEndTwoAfter: DATA_FOUR.badEndTwoAfter,
      chapter4BadEndThreeAfter: DATA_FOUR.badEndThreeAfter,
      chapter4ClearAfter: DATA_FOUR.clearAfter
    } : {};
    return chapterTwoSequences[key] || chapterThreeSequences[key] || chapterFourSequences[key] || DATA[key] || [];
  }

  function renderNarratorCurrent() {
    const key = runtime.narratorKey;
    const lines = narratorLines(key);
    const index = runtime.narratorIndex;
    if (index >= lines.length) return completeNarratorSequence(key);
    const show = () => {
      const text = lines[index];
      runtime.currentEntry = { effect: "" };
      addHistory("案内人", text);
      renderNovel("案内人", text);
      playNarratorVoice(key, index);
      app.querySelector("[data-next]").addEventListener("click", (event) => {
        event.stopPropagation();
        runtime.narratorIndex += 1;
        renderNarratorCurrent();
      }, { once: true });
    };
    show();
  }

  function completeNarratorSequence(key) {
    const returnToVoiceReview = runtime.voiceReview;
    stopNarratorVoice();
    narratorPlaying = false;
    runtime.narratorKey = "";
    runtime.narratorIndex = 0;
    if (returnToVoiceReview) return showVoiceReview();
    if (key === "intro") return showIntroChoice();
    if (key === "introYes") return showChapterSelect();
    if (key === "introNo") return showRefusalEnd();
    if (key === "firstLead") return transitionPhase(startFirstBadEnd);
    if (key === "firstAfter") return transitionPhase(startNormalStory);
    if (key === "repeatAfter") return showStoryTree();
    if (key === "clearAfter") return showUnlock("2-1");
    if (key === "chapter2Lead") return transitionPhase(startChapterTwoFirstBadEnd);
    if (key === "chapter2FirstAfter") return transitionPhase(() => startChapterTwoSegment("story1", "2-1"));
    if (key === "chapter2BadEndOneAfter" || key === "chapter2BadEndTwoAfter") return showStoryTree(2);
    if (key === "chapter2ClearAfter") return showUnlock("3-1");
    if (key === "chapter3Lead") return transitionPhase(startChapterThreeFirstBadEnd);
    if (key === "chapter3FirstAfter") return transitionPhase(() => startChapterThreeSegment("story1", "3-1"));
    if (key === "chapter3BadEndOneAfter" || key === "chapter3BadEndTwoAfter") return showStoryTree(3);
    if (key === "chapter3ClearAfter") return showUnlock("4-1");
    if (key === "chapter4Lead") return transitionPhase(startChapterFourFirstBadEnd);
    if (key === "chapter4FirstAfter") return transitionPhase(() => startChapterFourSegment("story1", "4-1"));
    if (key === "chapter4BadEndOneAfter" || key === "chapter4BadEndTwoAfter" || key === "chapter4BadEndThreeAfter") return showStoryTree(4);
    if (key === "chapter4ClearAfter") return transitionPhase(showEnding);
    showChapterSelect();
  }

  function showEnding() {
    runtime = freshRuntime();
    runtime.screen = "ending";
    const selectedGuide = progress.guide === "female" ? "female" : "male";
    const bowAsset = selectedGuide === "female" ? ASSETS.femaleBow : ASSETS.maleBow;
    const fallbackAsset = selectedGuide === "female" ? ASSETS.femaleStand : ASSETS.maleStand;
    const guideLabel = selectedGuide === "female" ? "女性の案内人" : "男性の案内人";
    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(SHARE_TEXT)}`;
    app.innerHTML = `
      <section class="screen ending-screen fade-in" aria-label="エンディング">
        <div class="ending-layout">
          <div class="ending-guide-wrap">
            <img class="ending-guide" data-ending-guide alt="お辞儀をしている${guideLabel}">
          </div>
          <div class="ending-copy">
            <p class="ending-message">
              <span class="ending-line ending-line-thanks">この度は、BADENDの整理にご協力いただき<span class="ending-tail">ありがとうございました。</span></span>
              <span class="ending-line">非常に助かりました。</span>
              <span class="ending-line ending-line-spaced">ですが、貴方もご準備した方がよろしいでしょう。</span>
              <span class="ending-line">貴方の物語は、もう、まもなくなので。</span>
            </p>
            <div class="ending-actions">
              <a class="menu-btn ending-share" href="${shareUrl}" target="_blank" rel="noopener noreferrer">Ｘでシェア</a>
              <button class="menu-btn subtle-btn ending-bookshelf" type="button" data-ending-bookshelf>本棚に戻る</button>
            </div>
          </div>
        </div>
      </section>`;
    const guideImage = app.querySelector("[data-ending-guide]");
    guideImage.addEventListener("error", () => {
      if (guideImage.getAttribute("src") !== fallbackAsset) guideImage.src = fallbackAsset;
    });
    guideImage.src = bowAsset;
    app.querySelector("[data-ending-bookshelf]").addEventListener("click", showChapterSelect);
  }

  function addHistory(speaker, text) {
    if (!text) return;
    runtime.history.push({ speaker: speaker || "", text });
  }

  function showMenu() {
    const forcedFirstView = runtime.phase === "first-lead" || runtime.phase === "first-badend" || runtime.narratorKey.startsWith("intro");
    openModal("メニュー", "", [
      ...(!forcedFirstView ? [{ label: "セーブ", action: showSaveSlots }, { label: "ロード", action: showLoadSlots }] : []),
      { label: "テキスト履歴", action: showHistory },
      ...(runtime.screen === "novel" && !forcedFirstView ? [{ label: "本棚に戻る", action: confirmReturn }] : []),
      { label: "進行状況をリセットする", action: confirmResetProgress },
      { label: "閉じる", action: closeModal }
    ], "menu-list");
  }

  function confirmResetProgress() {
    openModal(
      "進行状況をリセットしますか？",
      "章の解放状況・読了状況・セーブデータをすべて消去し、案内人選択からやり直します。この操作は元に戻せません。",
      [
        { label: "リセットする", action: resetProgress },
        { label: "キャンセル", action: showMenu }
      ]
    );
  }

  function resetProgress() {
    progress = defaultProgress();
    runtime = freshRuntime();
    [1, 2, 3].forEach((slot) => storageRemove(`badend-save-${slot}`));
    persistProgress();
    closeModal();
    showGuideSelect();
  }

  function showSaveSlots() { renderSlots("save"); }
  function showLoadSlots() { renderSlots("load"); }

  function renderSlots(mode) {
    const slots = [1,2,3].map((slot) => readSlot(slot));
    modalRoot.innerHTML = `<div class="overlay"><section class="modal"><h2>${mode === "save" ? "セーブ" : "ロード"}</h2><div class="save-slots">
      ${slots.map((data, i) => `<div class="save-slot"><div><strong>SLOT ${i+1}</strong><small>${data ? `${escapeHtml(data.label)}<br>${escapeHtml(data.savedAt)}` : "データなし"}</small></div><button class="modal-btn" data-slot="${i+1}" ${mode === "load" && !data ? "disabled" : ""}>${mode === "save" ? "保存" : "読込"}</button></div>`).join("")}
      </div><div class="modal-actions"><button class="modal-btn" data-close>戻る</button></div></section></div>`;
    modalRoot.querySelector("[data-close]").addEventListener("click", showMenu);
    modalRoot.querySelectorAll("[data-slot]").forEach((button) => button.addEventListener("click", () => mode === "save" ? saveSlot(Number(button.dataset.slot)) : loadSlot(Number(button.dataset.slot))));
  }

  function snapshot() {
    const savedRuntime = { ...runtime, currentEntry: null };
    if (savedRuntime.interventionPlayback) {
      if (savedRuntime.pendingInterventionSuccess && (savedRuntime.chapter === 2 || savedRuntime.chapter === 3 || savedRuntime.chapter === 4)) {
        const segment = currentSegmentMeta();
        savedRuntime.segmentKey = segment.branchTo;
        savedRuntime.storyId = segment.alteredStoryId;
        savedRuntime.index = 0;
        savedRuntime.interventionLocked = true;
      } else {
        savedRuntime.index = savedRuntime.pendingInterventionSuccess
          ? DATA.story.findIndex((item) => item.text === "BADEND") + 1
          : savedRuntime.index + 1;
      }
      savedRuntime.phase = savedRuntime.pendingInterventionSuccess ? "success" : "normal";
      savedRuntime.interventionPlayback = false;
      savedRuntime.pendingInterventionSuccess = false;
    }
    return {
      version: 2,
      progress,
      runtime: savedRuntime,
      savedAt: new Date().toLocaleString("ja-JP"),
      label: runtime.screen === "novel" ? `${runtime.storyId} / No.${runtime.currentEntry?.no || "案内人"}` : "物語選択"
    };
  }

  function saveSlot(slot) {
    const existing = readSlot(slot);
    const commit = () => { storageSet(`badend-save-${slot}`, JSON.stringify(snapshot())); renderSlots("save"); };
    if (existing) openModal("上書きしますか？", `SLOT ${slot}`, [{ label: "はい", action: commit }, { label: "いいえ", action: showSaveSlots }]);
    else commit();
  }

  function readSlot(slot) {
    try { return JSON.parse(storageGet(`badend-save-${slot}`) || "null"); } catch { return null; }
  }

  function loadSlot(slot) {
    const data = readSlot(slot);
    if (!data) return;
    openModal("ロードしますか？", `SLOT ${slot}\n${data.label}`, [
      { label: "はい", action: () => restoreSnapshot(data) },
      { label: "いいえ", action: showLoadSlots }
    ]);
  }

  function restoreSnapshot(data) {
    progress = normalizeProgress(data.progress || {});
    runtime = { ...freshRuntime(), ...data.runtime };
    if (runtime.chapter === 2) {
      if (runtime.segmentKey === "story1Altered") runtime.storyId = "2-1";
      if (runtime.segmentKey === "story3" || runtime.segmentKey === "story3Altered") runtime.storyId = "2-2a";
    }
    if (runtime.chapter === 3) {
      if (runtime.segmentKey === "story1Altered") runtime.storyId = "3-1";
      if (runtime.segmentKey === "story3" || runtime.segmentKey === "story3Altered") runtime.storyId = "3-2a";
    }
    if (runtime.chapter === 4) {
      if (runtime.segmentKey === "story1Altered") runtime.storyId = "4-1";
      if (runtime.segmentKey === "story3") runtime.storyId = "4-3";
      if (runtime.segmentKey === "story4" || runtime.segmentKey === "story4Altered") runtime.storyId = "4-2a";
      if (runtime.segmentKey === "story5" || runtime.segmentKey === "story5Altered") runtime.storyId = "4-3a";
    }
    persistProgress();
    closeModal();
    if (runtime.screen === "chapter-select") return showChapterSelect();
    if (runtime.screen === "story-select") return showStoryTree(runtime.chapter);
    if (runtime.screen === "novel" && runtime.narratorKey) {
      narratorPlaying = true;
      return renderNarratorCurrent();
    }
    if (runtime.screen === "novel" && Number.isInteger(runtime.index) && runtime.phase !== "narrator") return renderStoryEntry();
    showChapterSelect();
  }

  function showHistory() {
    modalRoot.innerHTML = `<div class="overlay"><section class="modal"><h2>テキスト履歴</h2>${runtime.history.length ? [...runtime.history].reverse().map((item) => `<div class="history-entry"><strong>${escapeHtml(item.speaker || "　")}</strong><p>${escapeHtml(item.text)}</p></div>`).join("") : "<p>履歴はありません。</p>"}<div class="modal-actions"><button class="modal-btn" data-close>戻る</button></div></section></div>`;
    modalRoot.querySelector("[data-close]").addEventListener("click", showMenu);
  }

  function confirmReturn() {
    openModal("本棚へ戻りますか？", "セーブしていない進行状況は失われます。", [
      { label: "はい", action: () => { closeModal(); showChapterSelect(); } },
      { label: "いいえ", action: showMenu }
    ]);
  }

  function openModal(title, message, actions = [], actionsClass = "") {
    modalRoot.innerHTML = `<div class="overlay"><section class="modal"><h2>${escapeHtml(title)}</h2>${message ? `<p>${escapeHtml(message)}</p>` : ""}<div class="modal-actions ${actionsClass}"></div></section></div>`;
    const actionsBox = modalRoot.querySelector(".modal-actions");
    actions.forEach(({ label, action }) => {
      const button = el(`<button class="modal-btn">${escapeHtml(label)}</button>`);
      button.addEventListener("click", action);
      actionsBox.append(button);
    });
  }

  function closeModal() { modalRoot.innerHTML = ""; }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-next]") || event.target.closest("button") || runtime.screen !== "novel") return;
    if (event.target.closest(".narrator-mode") || event.target.closest(".intervention-line")) return;
    if (narratorPlaying || runtime.interventionPlayback) return;
    if (runtime.phase === "normal" || runtime.phase === "success" || runtime.phase === "first-badend") advanceStory();
  });

  document.addEventListener("selectstart", (event) => {
    if (event.target.closest(".history-entry")) return;
    if (event.target.closest("#app, #modal-root, .fiction-notice, #phase-fade")) event.preventDefault();
  });

  document.addEventListener("dragstart", (event) => {
    if (event.target.closest("#app img, #modal-root img")) event.preventDefault();
  });

  startApplication();
})();
