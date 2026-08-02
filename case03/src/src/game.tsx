"use client";

import { useMemo, useState } from "react";
import {
  Category,
  CONVERSATIONS,
  DEDUCTIONS,
  FINAL_CALLS,
  INFO,
  INVESTIGATIONS,
  LOCATIONS,
  LocationId,
  OPENING_CALL,
  Route,
} from "./game-data";

type Message = { speaker: string; text: string; isNew?: boolean };
type GameState = {
  location: LocationId;
  elevatorReturn: LocationId;
  visited: string[];
  investigated: string[];
  conversations: string[];
  collected: string[];
  flags: string[];
  solved: string[];
  placements: Record<string, string[]>;
  conclusions: Record<string, Route>;
  stage: 1 | 2 | 3;
  route: Route | null;
  introDone: boolean;
  ending: Route | null;
};

type Overlay =
  | null
  | "move"
  | "investigate"
  | "talk"
  | "menu"
  | "system"
  | "keypad"
  | "opening-call"
  | "final-call";

const SAVE_KEYS = ["vanishing-building-save-1", "vanishing-building-save-2", "vanishing-building-save-3"];

function freshState(): GameState {
  return {
    location: "entrance",
    elevatorReturn: "entrance",
    visited: ["entrance"],
    investigated: [],
    conversations: [],
    collected: [],
    flags: [],
    solved: [],
    placements: {},
    conclusions: {},
    stage: 1,
    route: null,
    introDone: false,
    ending: null,
  };
}

const categoryLabel: Record<Category, string> = {
  people: "人物",
  evidence: "証拠",
  keywords: "キーワード",
};

const sameSet = (a: string[], b: string[]) => a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

export default function Game() {
  const [game, setGame] = useState<GameState>(freshState);
  const [overlay, setOverlay] = useState<Overlay>("opening-call");
  const [message, setMessage] = useState<Message>({ speaker: "調査記録", text: "古びた八階建ての雑居ビル。ここで、四人の来訪者が姿を消している。" });
  const [detail, setDetail] = useState<{ title: string; text: string; image?: string } | null>(null);
  const [systemText, setSystemText] = useState("");
  const [keypad, setKeypad] = useState<{ kind: "elevator" | "stairs"; value: string } | null>(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [boardTab, setBoardTab] = useState<"board" | "archive">("board");
  const [stageTab, setStageTab] = useState(1);
  const [archiveTab, setArchiveTab] = useState<Category>("people");
  const [picker, setPicker] = useState<{ questionId: string; index: number; category: Category } | null>(null);
  const [boardFeedback, setBoardFeedback] = useState("");
  const [saveRevision, setSaveRevision] = useState(0);
  const location = LOCATIONS[game.location];
  const tokenSet = useMemo(() => new Set([...game.collected, ...game.flags]), [game.collected, game.flags]);

  function hasAll(ids?: string[]) {
    return !ids || ids.every((id) => tokenSet.has(id));
  }

  function grant(current: GameState, ids?: string[]) {
    if (!ids?.length) return current;
    const next = { ...current, collected: [...current.collected], flags: [...current.flags] };
    for (const id of ids) {
      if (INFO[id]) {
        if (!next.collected.includes(id)) next.collected.push(id);
      } else if (!next.flags.includes(id)) next.flags.push(id);
    }
    if (next.collected.includes("K03") && next.collected.includes("K04") && !next.collected.includes("K05")) {
      next.collected.push("K05");
    }
    return next;
  }

  const visibleInvestigations = INVESTIGATIONS.filter((item) => {
    if (item.location !== game.location) return false;
    if ((item.stage ?? 1) > game.stage) return false;
    if (item.route && game.route && item.route !== game.route) return false;
    return hasAll(item.requires);
  });

  const visibleConversations = CONVERSATIONS.filter((item) => {
    if (item.location !== game.location || item.intro) return false;
    if ((item.stage ?? 1) > game.stage) return false;
    if (item.hideAtStage && game.stage >= item.hideAtStage) return false;
    if (item.route && game.route && item.route !== game.route) return false;
    return hasAll(item.requires);
  });

  const personIntro = CONVERSATIONS.find((item) => item.location === game.location && item.intro);
  const personMet = personIntro ? game.conversations.includes(personIntro.id) : false;

  function moveOptions(): { id: LocationId; label: string }[] {
    const floorMoves: Record<LocationId, { id: LocationId; label: string }[]> = {
      entrance: [{ id: "manager", label: "管理人室" }, { id: "elevator", label: "エレベーター" }],
      manager: [{ id: "entrance", label: "エントランス" }],
      elevator: [
        { id: "entrance", label: "1F" }, { id: "2f", label: "2F" }, { id: "3f", label: "3F" },
        { id: "4f", label: "4F" }, { id: "5f", label: "5F" }, { id: "6f", label: "6F" },
        { id: "7f", label: "7F" }, { id: "8f", label: "8F" }, { id: "b1", label: "B1F" },
        { id: game.elevatorReturn, label: "エレベーターを出る" },
      ],
      "2f": [{ id: "elevator", label: "エレベーター" }, { id: "towa", label: "東和コピーサービス" }],
      towa: [{ id: "2f", label: "2F廊下" }, { id: "elevator", label: "エレベーター" }],
      "3f": [{ id: "elevator", label: "エレベーター" }, ...(tokenSet.has("P02") ? [{ id: "305" as LocationId, label: "305号室" }] : [])],
      "305": [{ id: "3f", label: "3F廊下" }, { id: "elevator", label: "エレベーター" }],
      "4f": [{ id: "elevator", label: "エレベーター" }],
      "5f": [{ id: "elevator", label: "エレベーター" }, ...(tokenSet.has("P04") ? [{ id: "mitsuba" as LocationId, label: "三葉産業" }] : [])],
      mitsuba: [{ id: "5f", label: "5F廊下" }, { id: "elevator", label: "エレベーター" }],
      "6f": [{ id: "elevator", label: "エレベーター" }, { id: "kuze", label: "久瀬ネット販売" }],
      kuze: [{ id: "6f", label: "6F廊下" }, { id: "elevator", label: "エレベーター" }],
      "7f": [{ id: "elevator", label: "エレベーター" }, ...(tokenSet.has("P01") ? [{ id: "702" as LocationId, label: "702号室" }] : [])],
      "702": [{ id: "7f", label: "7F廊下" }, { id: "elevator", label: "エレベーター" }],
      "8f": [
        { id: "elevator", label: "エレベーター" },
        ...(tokenSet.has("P03") ? [{ id: "hokushin" as LocationId, label: "北辰データサービス" }] : []),
        ...(tokenSet.has("E11") ? [{ id: "8fstairs" as LocationId, label: "8F奥の階段" }] : []),
      ],
      hokushin: [{ id: "8f", label: "8F廊下" }, { id: "elevator", label: "エレベーター" }],
      "8fstairs": [{ id: "8f", label: "8F廊下" }, { id: "elevator", label: "エレベーター" }],
      b1: [{ id: "elevator", label: "エレベーター" }],
      b3: [{ id: "elevator", label: "エレベーター" }, { id: "b301", label: "B301号室" }, { id: "b302", label: "B302号室" }, { id: "b303", label: "B303号室" }, { id: "b304", label: "B304号室" }],
      b301: [{ id: "b3", label: "B3F廊下" }], b302: [{ id: "b3", label: "B3F廊下" }], b303: [{ id: "b3", label: "B3F廊下" }], b304: [{ id: "b3", label: "B3F廊下" }],
      "9f": [{ id: "8fstairs", label: "8F奥の階段" }, { id: "901", label: "901号室" }, { id: "902", label: "902号室" }, { id: "903", label: "903号室" }, { id: "904", label: "904号室" }],
      "901": [{ id: "9f", label: "9F廊下" }], "902": [{ id: "9f", label: "9F廊下" }], "903": [{ id: "9f", label: "9F廊下" }], "904": [{ id: "9f", label: "9F廊下" }],
    };
    return floorMoves[game.location];
  }

  function go(nextLocation: LocationId) {
    setGame((current) => {
      const returnLocation = nextLocation === "elevator" && current.location !== "elevator" ? current.location : current.elevatorReturn;
      return { ...current, location: nextLocation, elevatorReturn: returnLocation, visited: [...new Set([...current.visited, nextLocation])] };
    });
    setMessage({ speaker: "移動", text: `${LOCATIONS[nextLocation].name}へ移動した。` });
    setOverlay(null);
  }

  function inspectItem(id: string) {
    const item = INVESTIGATIONS.find((value) => value.id === id);
    if (!item) return;
    if (item.keypad) {
      setKeypad({ kind: item.keypad, value: "" });
      setOverlay("keypad");
      return;
    }
    setGame((current) => {
      const next = grant(current, item.grants);
      return { ...next, investigated: [...new Set([...next.investigated, item.id])] };
    });
    const newlyGranted = item.grants?.find((value) => INFO[value] && !game.collected.includes(value));
    if (item.image) setDetail({ title: item.target, text: item.text, image: item.image });
    else setMessage({ speaker: "調査", text: item.text, isNew: Boolean(newlyGranted) });
    setOverlay(null);
  }

  function talk() {
    if (!personIntro) return;
    if (!personMet) {
      readConversation(personIntro.id);
    } else {
      setOverlay("talk");
    }
  }

  function readConversation(id: string) {
    const item = CONVERSATIONS.find((value) => value.id === id);
    if (!item) return;
    setGame((current) => {
      const next = grant(current, item.grants);
      return { ...next, conversations: [...new Set([...next.conversations, item.id])] };
    });
    const newlyGranted = item.grants?.some((value) => INFO[value] && !game.collected.includes(value));
    setMessage({ speaker: item.person, text: item.text, isNew: Boolean(newlyGranted) });
    setOverlay(null);
  }

  const finalEvidenceReady = game.route === "real"
    ? hasAll(["E05", "E06", "E07"])
    : game.route === "occult" ? hasAll(["E08", "E09", "E10"]) : false;

  function submitDeduction(questionId: string) {
    const question = DEDUCTIONS.find((value) => value.id === questionId);
    if (!question) return;
    const picks = game.placements[questionId] ?? [];
    let candidate: Route | null = null;
    if (question.stage === 1) {
      candidate = sameSet(picks, question.real.ids) ? "real" : null;
    } else if (question.stage === 2) {
      const matchesReal = sameSet(picks, question.real.ids);
      const matchesOccult = sameSet(picks, question.occult.ids);
      const established = DEDUCTIONS
        .filter((q) => q.stage === 2 && q.id !== questionId && game.solved.includes(q.id))
        .map((q) => game.conclusions[q.id])
        .find(Boolean);
      if (matchesReal && matchesOccult) candidate = established ?? null;
      else if (matchesReal) candidate = "real";
      else if (matchesOccult) candidate = "occult";
    } else if (game.route && sameSet(picks, question[game.route].ids)) {
      candidate = game.route;
    }
    if (!candidate) {
      const needsEarlierResult = question.stage === 2
        && sameSet(question.real.ids, question.occult.ids)
        && !DEDUCTIONS.some((q) => q.stage === 2 && q.id !== questionId && game.solved.includes(q.id));
      setBoardFeedback(needsEarlierResult
        ? "この推理だけでは行き先を絞り込めない。\n先に、存在しない階の場所と、そこへつながる場所を推理しよう。"
        : "推理が成立しない。\n情報の組み合わせを見直そう。");
      return;
    }

    const conflictingQuestions = question.stage === 2
      ? DEDUCTIONS
          .filter((value) => value.stage === 2 && value.id !== questionId && game.conclusions[value.id] && game.conclusions[value.id] !== candidate)
          .map((value) => value.id)
      : [];
    const solved = [...new Set([...game.solved.filter((id) => !conflictingQuestions.includes(id)), questionId])];
    const conclusions = { ...game.conclusions };
    for (const id of conflictingQuestions) delete conclusions[id];
    if (question.stage === 2) conclusions[questionId] = candidate;
    setGame({
      ...game,
      solved,
      conclusions,
    });
    setBoardFeedback("");
  }

  function completeStage(stage: number) {
    if (stage !== game.stage) return;
    const questions = DEDUCTIONS.filter((question) => question.stage === stage);
    if (!questions.every((question) => game.solved.includes(question.id))) return;

    if (stage === 1) {
      setGame({ ...game, stage: 2 });
      setStageTab(2);
      setBoardFeedback("");
      setSystemText("推理ボード1が完了しました。\n新しい会話が発生したり、状況が変化しているかもしれません。\nもう一度、ビル内を調査してみましょう。");
      setBoardOpen(false);
      setOverlay("system");
      return;
    }

    if (stage === 2) {
      const routes = questions.map((question) => game.conclusions[question.id]).filter(Boolean);
      const route = routes[0];
      if (!route || routes.some((value) => value !== route)) {
        setBoardFeedback("推理結果に矛盾がある。\n第2段階の推理を見直そう。");
        return;
      }
      setGame({ ...game, stage: 3, route });
      setStageTab(3);
      setBoardFeedback("");
      setSystemText("推理ボード2が完了しました。\n新しい会話が発生したり、状況が変化しているかもしれません。\nもう一度、ビル内を調査してみましょう。");
      setBoardOpen(false);
      setOverlay("system");
      return;
    }

    if (stage === 3 && game.route) {
      setBoardFeedback("");
      setBoardOpen(false);
      setOverlay("final-call");
    }
  }

  function setPick(questionId: string, index: number, id: string) {
    setGame((current) => {
      const picks = [...(current.placements[questionId] ?? [])];
      picks[index] = id;
      const remainingConclusions = { ...current.conclusions };
      delete remainingConclusions[questionId];
      return {
        ...current,
        solved: current.solved.filter((value) => value !== questionId),
        conclusions: remainingConclusions,
        placements: { ...current.placements, [questionId]: picks },
      };
    });
    setBoardFeedback("");
    setPicker(null);
  }

  function pressKey(value: string) {
    if (!keypad) return;
    if (value === "clear") return setKeypad({ ...keypad, value: "" });
    if (value === "enter") {
      if (keypad.value === "8437") {
        const destination: LocationId = keypad.kind === "elevator" ? "b3" : "9f";
        setGame((current) => ({ ...current, location: destination, visited: [...new Set([...current.visited, destination])] }));
        setMessage({ speaker: "調査", text: keypad.kind === "elevator" ? "表示のない階へ、エレベーターが降りていく。" : "施錠扉がゆっくりと開いた。階段は、さらに上へ続いている。" });
        setKeypad(null);
        setOverlay(null);
      } else {
        setMessage({ speaker: "調査", text: "何も反応しない……。" });
        setKeypad({ ...keypad, value: "" });
      }
      return;
    }
    if (keypad.value.length < 4) setKeypad({ ...keypad, value: keypad.value + value });
  }

  function finishOpening() {
    setGame((current) => ({ ...current, introDone: true }));
    setOverlay(null);
    setMessage({ speaker: "調査記録", text: "森高宵から送られた推理ボードを確認しながら、ビル内を調査しよう。" });
  }

  function finishFinalCall() {
    if (!game.route) return;
    setGame((current) => ({ ...current, ending: current.route }));
    setOverlay(null);
    setBoardOpen(false);
  }

  function save(slot: number) {
    localStorage.setItem(SAVE_KEYS[slot], JSON.stringify({ savedAt: new Date().toISOString(), game }));
    setSaveRevision((value) => value + 1);
  }

  function load(slot: number) {
    const raw = localStorage.getItem(SAVE_KEYS[slot]);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { game: GameState };
      setGame(parsed.game);
      setBoardOpen(false);
      setOverlay(parsed.game.introDone ? null : "opening-call");
      setMessage({ speaker: "記録", text: `${LOCATIONS[parsed.game.location].name}から調査を再開した。` });
    } catch {
      setSystemText("セーブデータを読み込めませんでした。");
      setOverlay("system");
    }
  }

  function resetProgress() {
    if (!window.confirm("現在の進行と3つのセーブデータをすべて削除します。よろしいですか？")) return;
    SAVE_KEYS.forEach((key) => localStorage.removeItem(key));
    setGame(freshState());
    setBoardOpen(false);
    setOverlay("opening-call");
    setSaveRevision((value) => value + 1);
  }

  const collectedCount = game.collected.filter((id) => INFO[id]).length;
  const totalInfo = Object.keys(INFO).length;

  if (game.ending) return <Ending route={game.ending} onReset={resetProgress} />;

  if (boardOpen) {
    return (
      <BoardScreen
        game={game}
        tab={boardTab}
        setTab={setBoardTab}
        stageTab={stageTab}
        setStageTab={setStageTab}
        archiveTab={archiveTab}
        setArchiveTab={setArchiveTab}
        finalEvidenceReady={finalEvidenceReady}
        feedback={boardFeedback}
        onBack={() => { setBoardOpen(false); setPicker(null); }}
        onPick={(questionId, index, category) => setPicker({ questionId, index, category })}
        onRemove={(questionId, index) => {
          setBoardFeedback("");
          setGame((current) => {
            const values = [...(current.placements[questionId] ?? [])];
            values[index] = "";
            const remainingConclusions = { ...current.conclusions };
            delete remainingConclusions[questionId];
            return {
              ...current,
              solved: current.solved.filter((value) => value !== questionId),
              conclusions: remainingConclusions,
              placements: { ...current.placements, [questionId]: values },
            };
          });
        }}
        onSubmit={submitDeduction}
        onCompleteStage={completeStage}
        picker={picker}
        onSetPick={setPick}
        onClosePicker={() => setPicker(null)}
      />
    );
  }

  return (
    <main className="game-shell">
      <section className="scene" aria-label={`${location.floor} ${location.name}`}>
        <img className="scene-background" src={location.image} alt="" />
        {location.character && <img className="scene-character" src={location.character} alt={location.characterName ?? "人物"} />}
        <div className="scene-shade" />
        <div className="case-label"><span>CASE 01</span><strong>人が消えるビル</strong></div>
        <div className="location-label"><span>{location.floor}</span><strong>{location.name}</strong></div>
      </section>

      <section className="dialogue" aria-live="polite">
        <div className="speaker"><span>{message.speaker}</span>{message.isNew && <em>NEW</em>}</div>
        <p>{message.text}</p>
      </section>

      <nav className="command-rail" aria-label="常設メニュー">
        <button onClick={() => setOverlay("move")}><i>01</i><span>移動</span></button>
        <button onClick={() => setOverlay("investigate")} disabled={!visibleInvestigations.length}><i>02</i><span>調べる</span></button>
        <button onClick={talk} disabled={!personIntro}><i>03</i><span>話す</span></button>
        <button onClick={() => { setStageTab(game.stage === 3 && finalEvidenceReady ? 3 : game.stage); setBoardFeedback(""); setBoardOpen(true); setBoardTab("board"); }}><i>04</i><span>推理ボード</span><b>{game.stage}</b></button>
        <button onClick={() => setOverlay("menu")} aria-label="メニュー"><i>05</i><span>記録</span></button>
      </nav>

      <div className="info-counter">取得情報 <strong>{collectedCount}</strong> / {totalInfo}</div>

      {overlay && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget && !["opening-call", "final-call"].includes(overlay)) setOverlay(null); }}>
        {overlay === "move" && <ChoicePanel title="移動先" kicker="MOVE" options={moveOptions().map((item) => ({ id: item.id, label: item.label, done: game.visited.includes(item.id) }))} onChoose={(id) => go(id as LocationId)} onClose={() => setOverlay(null)} />}
        {overlay === "investigate" && <ChoicePanel title="調査対象" kicker="INVESTIGATE" options={visibleInvestigations.map((item) => ({ id: item.id, label: item.target, done: game.investigated.includes(item.id) }))} onChoose={inspectItem} onClose={() => setOverlay(null)} />}
        {overlay === "talk" && <ChoicePanel title={location.characterName ?? "話す"} kicker="TALK" lead={personIntro?.repeatText} options={visibleConversations.map((item) => ({ id: item.id, label: item.topic, done: game.conversations.includes(item.id) }))} onChoose={readConversation} onClose={() => setOverlay(null)} />}
        {overlay === "menu" && <SavePanel game={game} revision={saveRevision} onSave={save} onLoad={load} onReset={resetProgress} onClose={() => setOverlay(null)} />}
        {overlay === "system" && <SystemPanel text={systemText} onClose={() => setOverlay(null)} />}
        {overlay === "keypad" && keypad && <Keypad value={keypad.value} onPress={pressKey} onClose={() => { setKeypad(null); setOverlay(null); }} />}
        {overlay === "opening-call" && <CallPanel text={OPENING_CALL} onClose={finishOpening} />}
        {overlay === "final-call" && game.route && <CallPanel text={FINAL_CALLS[game.route]} onClose={finishFinalCall} />}
      </div>}

      {detail && <div className="overlay"><section className="detail-panel"><button className="close" onClick={() => setDetail(null)}>×</button><div className="detail-image"><img src={detail.image} alt={detail.title} /></div><div className="detail-copy"><span>INVESTIGATION</span><h2>{detail.title}</h2><p>{detail.text}</p><button className="primary" onClick={() => setDetail(null)}>閉じる</button></div></section></div>}
    </main>
  );
}

function ChoicePanel({ title, kicker, lead, options, onChoose, onClose }: { title: string; kicker: string; lead?: string; options: { id: string; label: string; done?: boolean }[]; onChoose: (id: string) => void; onClose: () => void }) {
  return <section className="choice-panel"><header><div><span>{kicker}</span><h2>{title}</h2></div><button className="close" onClick={onClose}>×</button></header>{lead && <p className="choice-lead">{lead}</p>}<div className="choice-list">{options.map((item) => <button key={item.id} onClick={() => onChoose(item.id)} className={item.done ? "done" : ""}><em>{item.done ? "済" : "・"}</em><strong>{item.label}</strong><span>›</span></button>)}</div><button className="back" onClick={onClose}>戻る</button></section>;
}

function SystemPanel({ text, onClose }: { text: string; onClose: () => void }) {
  return <section className="system-panel"><span>SYSTEM</span><p>{text}</p><button className="primary" onClick={onClose}>確認</button></section>;
}

function CallPanel({ text, onClose }: { text: string; onClose: () => void }) {
  return <section className="call-panel"><div className="call-portrait"><img src="./assets/characters/char-10-moritaka-yoi-torso-fixed.png" alt="森高宵" /></div><div className="call-copy"><span>INCOMING CALL</span><h2>森高 宵</h2><p>{text}</p><button className="primary" onClick={onClose}>通話を終える</button></div></section>;
}

function Keypad({ value, onPress, onClose }: { value: string; onPress: (value: string) => void; onClose: () => void }) {
  return <section className="keypad-panel"><button className="close" onClick={onClose}>×</button><span>ACCESS PANEL</span><div className="keypad-display">{value.padEnd(4, "·")}</div><div className="keypad-grid">{[1,2,3,4,5,6,7,8,9].map((n) => <button key={n} onClick={() => onPress(String(n))}>{n}</button>)}<button onClick={() => onPress("clear")}>C</button><button onClick={() => onPress("0")}>0</button><button onClick={() => onPress("enter")}>E</button></div></section>;
}

function SavePanel({ game, revision, onSave, onLoad, onReset, onClose }: { game: GameState; revision: number; onSave: (slot: number) => void; onLoad: (slot: number) => void; onReset: () => void; onClose: () => void }) {
  void revision;
  const slots = SAVE_KEYS.map((key) => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try { return JSON.parse(raw) as { savedAt: string; game: GameState }; } catch { return null; }
  });
  return <section className="save-panel"><header><div><span>RECORD</span><h2>セーブ／ロード</h2></div><button className="close" onClick={onClose}>×</button></header><div className="save-slots">{slots.map((slot, index) => <article key={index}><div><b>SLOT {index + 1}</b><strong>{slot ? `${LOCATIONS[slot.game.location].floor} ${LOCATIONS[slot.game.location].name}` : "データなし"}</strong><small>{slot ? new Date(slot.savedAt).toLocaleString("ja-JP") : "—"}</small></div><button onClick={() => onSave(index)}>セーブ</button><button disabled={!slot} onClick={() => onLoad(index)}>ロード</button></article>)}</div><p>現在地：{LOCATIONS[game.location].floor} {LOCATIONS[game.location].name}</p><button className="danger" onClick={onReset}>進行状況をリセット</button></section>;
}

type BoardProps = {
  game: GameState;
  tab: "board" | "archive";
  setTab: (tab: "board" | "archive") => void;
  stageTab: number;
  setStageTab: (stage: number) => void;
  archiveTab: Category;
  setArchiveTab: (tab: Category) => void;
  finalEvidenceReady: boolean;
  feedback: string;
  onBack: () => void;
  onPick: (questionId: string, index: number, category: Category) => void;
  onRemove: (questionId: string, index: number) => void;
  onSubmit: (questionId: string) => void;
  onCompleteStage: (stage: number) => void;
  picker: { questionId: string; index: number; category: Category } | null;
  onSetPick: (questionId: string, index: number, id: string) => void;
  onClosePicker: () => void;
};

function BoardScreen(props: BoardProps) {
  const { game } = props;
  const availableStages = [1, ...(game.stage >= 2 ? [2] : []), ...(game.stage >= 3 && props.finalEvidenceReady ? [3] : [])];
  const questions = DEDUCTIONS.filter((question) => question.stage === props.stageTab);
  const pickerItems = props.picker ? game.collected.map((id) => INFO[id]).filter((item) => item?.category === props.picker?.category) : [];
  const stageLocked = props.stageTab < game.stage;
  const stageReady = props.stageTab === game.stage && questions.every((question) => game.solved.includes(question.id));
  return <main className="board-screen"><header className="board-header"><div><span>MORITAKA YOI / DEDUCTION BOARD</span><h1>推理ボード</h1></div><button onClick={props.onBack}>ゲームに戻る</button></header><nav className="board-main-tabs"><button className={props.tab === "board" ? "active" : ""} onClick={() => props.setTab("board")}>推理ボード</button><button className={props.tab === "archive" ? "active" : ""} onClick={() => props.setTab("archive")}>取得情報一覧 <b>{game.collected.length}</b></button></nav>
    {props.tab === "board" ? <section className="board-body"><div className="stage-tabs">{availableStages.map((stage) => <button key={stage} className={props.stageTab === stage ? "active" : ""} onClick={() => props.setStageTab(stage)}>第{stage}段階</button>)}</div>{props.feedback && <div className="board-feedback" role="alert"><span>DEDUCTION</span><p>{props.feedback}</p></div>}<div className="question-grid">{questions.map((question, qIndex) => {
      const solved = game.solved.includes(question.id);
      const picks = game.placements[question.id] ?? [];
      const chosenRoute = game.conclusions[question.id];
      const resultRoute = question.stage === 1 ? "real" : question.stage === 2 ? chosenRoute : game.route;
      return <article className={`question ${solved ? "solved" : ""}`} key={question.id}><div className="question-number">0{qIndex + 1}</div><div className="question-title"><h2>{question.title}</h2>{solved && <span>（済）</span>}</div><div className="thread-line" /><div className="slots">{question.slots.map((category, index) => <button key={index} disabled={stageLocked} className={picks[index] ? "filled" : ""} onClick={() => picks[index] ? props.onRemove(question.id, index) : props.onPick(question.id, index, category)}><small>{categoryLabel[category]}</small><strong>{picks[index] ? INFO[picks[index]]?.name : "？"}</strong></button>)}</div>{solved && resultRoute && <div className={`deduction-result ${resultRoute}`}><small>推理結果</small><strong>{question[resultRoute].answer}</strong></div>}<button className="deduce" disabled={stageLocked || picks.filter(Boolean).length !== question.slots.length} onClick={() => props.onSubmit(question.id)}>{stageLocked ? "推理済み" : solved ? "再推理する" : "推理する"}</button></article>;
    })}</div>{stageReady && <div className="stage-complete"><p>すべての推理が成立している。内容を見直すなら、各項目から再推理できる。</p><button onClick={() => props.onCompleteStage(props.stageTab)}>この段階の推理を完了する</button></div>}</section> : <Archive game={game} tab={props.archiveTab} setTab={props.setArchiveTab} />}
    {props.picker && <div className="overlay"><section className="choice-panel"><header><div><span>SELECT CARD</span><h2>{categoryLabel[props.picker.category]}を選ぶ</h2></div><button className="close" onClick={props.onClosePicker}>×</button></header><div className="choice-list">{pickerItems.length ? pickerItems.map((item) => <button key={item.id} onClick={() => props.onSetPick(props.picker!.questionId, props.picker!.index, item.id)}><em>{item.id}</em><strong>{item.name}</strong><span>›</span></button>) : <p className="empty">使用できる情報がない。</p>}</div><button className="back" onClick={props.onClosePicker}>戻る</button></section></div>}
  </main>;
}

function Archive({ game, tab, setTab }: { game: GameState; tab: Category; setTab: (tab: Category) => void }) {
  const items = game.collected.map((id) => INFO[id]).filter((item) => item?.category === tab);
  const [selected, setSelected] = useState<string | null>(null);
  const detail = selected ? INFO[selected] : null;
  return <section className="archive-body"><nav>{(["people", "evidence", "keywords"] as Category[]).map((category) => <button className={tab === category ? "active" : ""} key={category} onClick={() => { setTab(category); setSelected(null); }}>{categoryLabel[category]} <b>{game.collected.filter((id) => INFO[id]?.category === category).length}</b></button>)}</nav>{detail ? <article className="archive-detail"><button onClick={() => setSelected(null)}>← 一覧へ</button>{detail.image && <img src={detail.image} alt={detail.name} />}<div><span>{detail.id} / {categoryLabel[detail.category]}</span><h2>{detail.name}</h2><p>{detail.description}</p></div></article> : <div className="archive-cards">{items.length ? items.map((item) => <button key={item.id} onClick={() => setSelected(item.id)}><span>{item.id}</span><strong>{item.name}</strong><small>{item.description}</small></button>) : <p className="empty">まだ取得していない。</p>}</div>}</section>;
}

function Ending({ route, onReset }: { route: Route; onReset: () => void }) {
  const real = route === "real";
  const share = `${real ? "森高宵の調査助手として強制的に任命された。" : "森高宵にオカルト調査助手として認められた。"}\nhttps://note.com/mei_takanashi/n/n9b2cab5e1496\n#あるビルとある教授`;
  return <main className={`ending-screen ${route}`}><section><span>{real ? "REAL END" : "OCCULT END"}</span><h1>{real ? "森高宵　調査助手" : "森高宵　オカルト調査助手"}</h1><div className="ending-image-frame"><img src={real ? "./assets/endings/end-01-real-nameplate.png" : "./assets/endings/end-02-occult-nameplate.png"} alt={real ? "森高宵 調査助手のネームプレート" : "森高宵 オカルト調査助手のネームプレート"} /></div><p className="ending-lead">家へと帰ると、机の上に見慣れないプレートが置いてあった。</p><p>{real ? "今回は調査に協力してくれてありがとう。\nこれからも調査に協力してくれるとありがたい。\nこれは研究室の机にはめるプレートなんだけど、\nぜひ研究室に来た暁には、これを机にはめて、手伝ってくれないかな？" : "今回は調査に協力してくれてありがとう。\nいやー、オカルトって本当に面白いよね。\n君にも、この面白さが伝わったようで、非常に嬉しいよ。\n今後とも、助手としてよろしくね？"}</p><div className="ending-actions"><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(share)}`} target="_blank" rel="noreferrer">Xで結果を共有する</a><button onClick={onReset}>最初から調査する</button></div><small>この作品はフィクションです。</small></section></main>;
}
