import { useState, useRef } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbob2MaiB0WkiwYYFZpXWQTB1WJRfwN72M1lHDF_PkSiIlAKBNiQMR6BTUZp3icMw4/exec";

const plants = [
  {
    id: 0, name: "Sunflower", emoji: "🌻",
    color: "#E8A020", dark: "#92510A",
    description: "You radiate energy and do your best work when seen, heard, and included. You bring warmth, momentum, and enthusiasm — and you need environments that match your output with recognition.",
    questions: [
      "I feel more energized after a lively team discussion than after a solo deep-work session.",
      "I lose motivation when I can't see how my work connects to a larger purpose.",
      "I tend to be the one who re-energizes a group when morale starts to dip.",
      "I do my sharpest thinking when I can talk through ideas with others in real time.",
      "I thrive in roles where I'm visible, invited into conversations, or encouraged to lead or present."
    ]
  },
  {
    id: 1, name: "Jade", emoji: "🪴",
    color: "#27A96C", dark: "#0D6640",
    description: "You are steady, self-sufficient, and quietly powerful. You don't need applause — you need trust, autonomy, and space to do work you're proud of.",
    questions: [
      "I'm comfortable working quietly behind the scenes, without needing constant recognition or visibility.",
      "I value stability, clarity, and sustainability over speed, urgency, or constant change.",
      "When things get chaotic, my instinct is to withdraw, focus, and conserve energy rather than escalate.",
      "People often underestimate my engagement or impact because I'm calm, reserved, or not performative.",
      "I find purpose internally — through values or quality of work — rather than needing it reinforced externally."
    ]
  },
  {
    id: 2, name: "Wildflower", emoji: "🌸",
    color: "#D44F8E", dark: "#8C1F54",
    description: "You are creative, non-linear, and energized by possibility. You thrive where originality is welcomed and you're free to experiment without being boxed in.",
    questions: [
      "I need creative freedom to feel genuinely engaged at work.",
      "I thrive in early-stage or undefined projects more than established, structured ones.",
      "I learn best through experimentation rather than instruction or repetition.",
      "My best ideas don't arrive on a schedule — they come in bursts, unexpectedly.",
      "I'd rather produce something original and imperfect than something polished and predictable."
    ]
  },
  {
    id: 3, name: "Bonsai", emoji: "🎋",
    color: "#2A8C5A", dark: "#0F4D2E",
    description: "You are a craftsperson at heart. Depth, precision, and mastery matter more to you than speed or variety — and your best work emerges when you're given time and clarity.",
    questions: [
      "I value quality and precision over speed.",
      "I feel frustrated by constant interruptions or shifting priorities.",
      "I take pride in mastering a specific skill or craft rather than staying generalist.",
      "I prefer going deep on one thing over spreading myself across many.",
      "Vague instructions or unclear expectations genuinely undermine my ability to do good work."
    ]
  },
  {
    id: 4, name: "Aloe", emoji: "🌿",
    color: "#1A9EB5", dark: "#0A5E6D",
    description: "You are the stabilizer — emotionally intelligent, calm under pressure, and often the invisible glue. You need environments that protect your energy as fiercely as you protect everyone else's.",
    questions: [
      "People come to me to calm situations down, even when I wasn't involved in creating the problem.",
      "I'm frequently asked to interpret or translate leadership decisions so others can actually act on them.",
      "I notice issues early, raise them thoughtfully, and often end up managing the fallout anyway.",
      "I'm praised for being steady and reliable — but rarely protected from overload.",
      "I tend to realize I'm exhausted after a crisis ends, not while it's happening."
    ]
  },
  {
    id: 5, name: "Ivy", emoji: "🍃",
    color: "#5B6FD4", dark: "#2D3A8C",
    description: "You are a natural connector and grower. You build bridges, spot opportunities, and thrive in roles where curiosity, relationships, and momentum are the real currency.",
    questions: [
      "I feel energized by meeting new people, building relationships, and exploring new opportunities.",
      "I get restless or disengaged when my role stops offering learning or growth.",
      "I naturally connect ideas, people, or teams that don't yet know they should work together.",
      "I tend to say yes to opportunities because they feel exciting — even when I'm already busy.",
      "I've outgrown roles quickly and felt ready for 'what's next' before others expected it."
    ]
  },
  {
    id: 6, name: "Fern", emoji: "🌾",
    color: "#4A9E3F", dark: "#1E5C18",
    description: "You are deeply reliable, emotionally attuned, and built for sustained contribution. You thrive in steady, supportive environments — and give back far more than most people see.",
    questions: [
      "I feel most fulfilled when I'm supporting others or helping things run smoothly behind the scenes.",
      "I prefer steady routines and predictable environments over fast-paced or constantly changing ones.",
      "I'm sensitive to conflict or emotional volatility at work, even if I don't show it outwardly.",
      "I thrive under managers who provide consistent support and mentorship rather than pressure or urgency.",
      "I feel most confident and calm when expectations are clear and the emotional climate is steady."
    ]
  },
  {
    id: 7, name: "Cactus", emoji: "🌵",
    color: "#C4742A", dark: "#7A3A08",
    description: "You are built for adversity. Direct, resilient, and results-driven — you don't need a perfect environment to perform. You need clarity, real authority, and room to execute without friction.",
    questions: [
      "I stay calm — and often become more focused — when situations get high-pressure or urgent.",
      "I'm more energized by clear responsibility and authority than by group consensus or prolonged discussion.",
      "People often describe me as direct, intense, or no-nonsense — even when I'm simply being efficient.",
      "I've been trusted by peers but perceived as intimidating or threatening by managers.",
      "I tend to show care through action and results rather than verbal reassurance or emotional expression."
    ]
  },
  {
    id: 8, name: "Seedling", emoji: "🌱",
    color: "#8B5DD4", dark: "#4A2290",
    description: "You are in a growth phase — and that's a position of potential, not weakness. With clear expectations, patient mentorship, and safety to learn, you grow fast and flourish.",
    questions: [
      "I learn best through practice, feedback, and repetition rather than immediate performance.",
      "I ask a lot of questions — not because I lack ability, but because I want to understand things fully.",
      "High-pressure environments or constant urgency make it harder for me to think clearly.",
      "I'm more confident when expectations are clearly defined and reinforced over time.",
      "I feel energized by encouragement and reassurance, especially when tackling something new."
    ]
  }
];

const TIEBREAKERS = [
  { pair: [1, 3], favorId: 1, text: "I care more about independence and autonomy than about mastering a single craft." },
  { pair: [4, 6], favorId: 4, text: "I often manage others' emotional crises directly, rather than simply supporting them from the sidelines." },
  { pair: [2, 5], favorId: 2, text: "Creative originality matters more to me than building relationships or expanding my network." },
  { pair: [1, 7], favorId: 1, text: "I prefer to stay quiet and conserve energy in conflict rather than taking direct charge." },
  { pair: [3, 6], favorId: 3, text: "Mastering my craft matters more to me than being someone others rely on for support." },
  { pair: [0, 5], favorId: 0, text: "I need to feel seen and recognized — not just to grow, but to stay motivated at all." },
];

const SCALE = [
  { label: "Strongly Agree", value: 2 },
  { label: "Somewhat Agree", value: 1 },
  { label: "Somewhat Disagree", value: 0 },
  { label: "Strongly Disagree", value: -1 },
];

function buildShuffledQuestions() {
  const all = [];
  plants.forEach(plant => {
    plant.questions.forEach((text, qi) => {
      all.push({ text, plantId: plant.id, key: `${plant.id}-${qi}`, isTiebreaker: false });
    });
  });
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}

function findTiebreakerQuestions(scores) {
  const maxScore = Math.max(...scores);
  const tiedIds = scores.map((s, i) => s === maxScore ? i : -1).filter(i => i >= 0);
  if (tiedIds.length <= 1) return [];
  const needed = [];
  for (const tb of TIEBREAKERS) {
    const [a, b] = tb.pair;
    if (tiedIds.includes(a) && tiedIds.includes(b)) {
      needed.push({ ...tb, text: tb.text, plantId: tb.favorId, key: `tb-${a}-${b}`, isTiebreaker: true, pair: tb.pair, favorId: tb.favorId });
    }
  }
  return needed;
}

function resolveTies(scores, tbAnswers) {
  const bonuses = Array(9).fill(0);
  for (const answer of tbAnswers) {
    const [a, b] = answer.pair;
    if (answer.value >= 1) {
      bonuses[answer.favorId] += answer.value;
    } else {
      const otherId = answer.pair.find(id => id !== answer.favorId);
      bonuses[otherId] += (1 - answer.value);
    }
  }
  const maxScore = Math.max(...scores);
  const tiedIds = scores.map((s, i) => s === maxScore ? i : -1).filter(i => i >= 0);
  let winner = tiedIds[0];
  let bestBonus = bonuses[tiedIds[0]];
  for (const id of tiedIds) {
    if (bonuses[id] > bestBonus) { bestBonus = bonuses[id]; winner = id; }
  }
  const stillTied = tiedIds.filter(id => bonuses[id] === bestBonus);
  if (stillTied.length > 1) {
    return { winnerId: null, tiedIds: stillTied };
  }
  return { winnerId: winner, tiedIds: [] };
}

function ScoreBar({ plant, score, maxScore, rank, isBlend }) {
  const pct = Math.max(0, (score / maxScore)) * 100;
  const isPrimary = rank === 0 && !isBlend;
  const isBlendPrimary = isBlend && rank <= 1;
  const isSecondary = !isBlend && rank === 1 && score >= 6;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontSize: 15, color: (isPrimary || isBlendPrimary) ? "#f5f0e8" : "#b0a898", fontFamily: "Georgia, serif", fontStyle: (isPrimary || isBlendPrimary) ? "italic" : "normal", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{plant.emoji}</span>
          {plant.name}
          {isPrimary && <span style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: plant.color, fontFamily: "sans-serif", fontStyle: "normal", fontWeight: 700, border: `1px solid ${plant.color}60`, borderRadius: 3, padding: "2px 7px" }}>Primary</span>}
          {isBlendPrimary && <span style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: plant.color, fontFamily: "sans-serif", fontStyle: "normal", fontWeight: 700, border: `1px solid ${plant.color}60`, borderRadius: 3, padding: "2px 7px" }}>Blend</span>}
          {isSecondary && <span style={{ fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#b0a898", fontFamily: "sans-serif", fontStyle: "normal", border: "1px solid #5a5040", borderRadius: 3, padding: "2px 7px" }}>Secondary</span>}
        </span>
        <span style={{ fontSize: 13, color: (isPrimary || isBlendPrimary) ? plant.color : "#8a8070", fontFamily: "sans-serif", fontWeight: 600 }}>{score}</span>
      </div>
      <div style={{ height: 5, background: "#3a3428", borderRadius: 999 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: (isPrimary || isBlendPrimary) ? `linear-gradient(90deg, ${plant.dark}, ${plant.color})` : isSecondary ? `${plant.color}77` : "#4a4438", borderRadius: 999, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
      </div>
    </div>
  );
}

export default function PlantQuiz() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | tiebreaker | capture | results
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState(Array(9).fill(0));
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);
  const [history, setHistory] = useState([]);

  const [tbQuestions, setTbQuestions] = useState([]);
  const [tbCurrent, setTbCurrent] = useState(0);
  const [tbAnswers, setTbAnswers] = useState([]);
  const [tbSelected, setTbSelected] = useState(null);
  const [tbFading, setTbFading] = useState(false);

  const [result, setResult] = useState(null);

  // Email capture state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const cardRef = useRef(null);

  function start() {
    setQuestions(buildShuffledQuestions());
    setScores(Array(9).fill(0));
    setCurrent(0);
    setSelected(null);
    setFading(false);
    setHistory([]);
    setTbQuestions([]);
    setTbCurrent(0);
    setTbAnswers([]);
    setTbSelected(null);
    setTbFading(false);
    setResult(null);
    setName("");
    setEmail("");
    setSubmitError(false);
    setPhase("quiz");
  }

  function handleSelect(value) {
    if (fading) return;
    setSelected(value);
    setTimeout(() => {
      const newScores = [...scores];
      const plantId = questions[current].plantId;
      newScores[plantId] = Math.max(0, newScores[plantId] + value);
      setScores(newScores);
      setHistory(h => [...h, { plantId, value }]);
      setFading(true);
      setTimeout(() => {
        if (current + 1 >= questions.length) {
          finishQuiz(newScores);
        } else {
          setCurrent(c => c + 1);
          setSelected(null);
          setFading(false);
        }
      }, 300);
    }, 180);
  }

  function finishQuiz(finalScores) {
    const needed = findTiebreakerQuestions(finalScores);
    if (needed.length > 0) {
      setTbQuestions(needed);
      setTbCurrent(0);
      setTbAnswers([]);
      setTbSelected(null);
      setTbFading(false);
      setPhase("tiebreaker");
    } else {
      const maxScore = Math.max(...finalScores);
      const tiedIds = finalScores.map((s, i) => s === maxScore ? i : -1).filter(i => i >= 0);
      if (tiedIds.length === 1) {
        setResult({ winnerId: tiedIds[0], isBlend: false, blendIds: [] });
      } else {
        setResult({ winnerId: null, isBlend: true, blendIds: tiedIds });
      }
      setPhase("capture"); // go to email capture before showing results
    }
  }

  function handleTbSelect(value) {
    if (tbFading) return;
    setTbSelected(value);
    setTimeout(() => {
      const answer = { pair: tbQuestions[tbCurrent].pair, favorId: tbQuestions[tbCurrent].favorId, value };
      const newAnswers = [...tbAnswers, answer];
      setTbAnswers(newAnswers);
      setTbFading(true);
      setTimeout(() => {
        if (tbCurrent + 1 >= tbQuestions.length) {
          const { winnerId, tiedIds } = resolveTies(scores, newAnswers);
          if (winnerId !== null) {
            setResult({ winnerId, isBlend: false, blendIds: [] });
          } else {
            setResult({ winnerId: null, isBlend: true, blendIds: tiedIds });
          }
          setPhase("capture"); // go to email capture before showing results
        } else {
          setTbCurrent(c => c + 1);
          setTbSelected(null);
          setTbFading(false);
        }
      }, 300);
    }, 180);
  }

  async function handleCapture(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitError(false);

    // Determine result string for Kit tag
    const isBlend = result?.isBlend;
    const resultName = isBlend
      ? result.blendIds.map(id => plants[id].name.toLowerCase()).join("-")
      : plants[result.winnerId].name.toLowerCase();

    const payload = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      status: "complete",
      questionReached: questions.length,
      sunflower: scores[0],
      jade: scores[1],
      wildflower: scores[2],
      bonsai: scores[3],
      aloe: scores[4],
      ivy: scores[5],
      fern: scores[6],
      cactus: scores[7],
      seedling: scores[8],
      result: resultName,
      isBlend: isBlend
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setPhase("results");
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    if (current === 0 || fading) return;
    const prev = history[history.length - 1];
    if (!prev) return;
    const newScores = [...scores];
    newScores[prev.plantId] = Math.max(0, newScores[prev.plantId] - prev.value);
    setScores(newScores);
    setHistory(h => h.slice(0, -1));
    setCurrent(c => c - 1);
    setSelected(null);
  }

  const progress = questions.length ? (current / questions.length) * 100 : 0;
  const ranked = plants.map(p => ({ ...p, score: scores[p.id] })).sort((a, b) => b.score - a.score);
  const MAX = 10;

  const baseStyle = { minHeight: "100vh", background: "#16120C", fontFamily: "Georgia, serif", position: "relative", overflow: "hidden" };

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === "intro") return (
    <div style={{ ...baseStyle, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(42,140,90,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      {plants.map((p, i) => (
        <div key={p.id} style={{ position: "absolute", fontSize: `${20+(i%4)*8}px`, opacity: 0.06+(i%3)*0.02, top: `${8+(i*79)%82}%`, left: `${4+(i*113)%92}%`, transform: `rotate(${i*41-80}deg)`, pointerEvents: "none", userSelect: "none" }}>{p.emoji}</div>
      ))}
      <div style={{ maxWidth: 500, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#5a7a5f", marginBottom: 28, fontFamily: "sans-serif", fontWeight: 500 }}>Garden Theory</div>
        <h1 style={{ fontSize: "clamp(38px,8vw,62px)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.5px" }}>
          What Kind of<br /><em style={{ color: "#4A9E3F" }}>Plant</em> Are You?
        </h1>
        <p style={{ fontSize: 16, color: "#6b6050", lineHeight: 1.8, marginBottom: 48, fontStyle: "italic" }}>45 questions · ~5 minutes</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          {plants.map(p => <span key={p.id} style={{ fontSize: 13, color: "#4a4030", padding: "5px 12px", border: "1px solid #2a2518", borderRadius: 999, fontFamily: "sans-serif" }}>{p.emoji}</span>)}
        </div>
        <button onClick={start} style={{ background: "linear-gradient(135deg,#2A8C5A,#1A6B42)", color: "#f5f0e8", border: "none", padding: "18px 52px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 3, textTransform: "uppercase", fontFamily: "sans-serif", boxShadow: "0 0 50px rgba(42,140,90,0.25)", transition: "all 0.25s" }}>Begin →</button>
      </div>
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = questions[current];
    return (
      <div style={{ ...baseStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 620, marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <button onClick={handleBack} disabled={current === 0} style={{ background: "transparent", border: "none", cursor: current === 0 ? "default" : "pointer", color: current === 0 ? "#3a3528" : "#d0c8b8", fontSize: 13, fontFamily: "sans-serif", letterSpacing: 1, padding: 0, transition: "color 0.2s" }}>← Back</button>
            <span style={{ fontSize: 12, color: "#e0d8c8", fontWeight: 500, fontFamily: "sans-serif" }}>{current+1} <span style={{ color: "#a09880" }}>/ {questions.length}</span></span>
          </div>
          <div style={{ height: 3, background: "#3a3428", borderRadius: 999 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#2A8C5A,#4ade80)", borderRadius: 999, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
          <div style={{ display: "flex", gap: 3, marginTop: 8, flexWrap: "wrap" }}>
            {Array.from({ length: questions.length }).map((_, i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i < current ? "#2A8C5A" : i === current ? "#4ade80" : "#3a3428", transition: "background 0.3s", flexShrink: 0 }} />
            ))}
          </div>
        </div>
        <div ref={cardRef} style={{ maxWidth: 620, width: "100%", opacity: fading ? 0 : 1, transform: fading ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.28s ease, transform 0.28s ease" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: "16px 16px 0 0", padding: "48px 44px 40px", textAlign: "center" }}>
            <p style={{ fontSize: "clamp(15px,2.8vw,20px)", color: "#d8cfbe", lineHeight: 1.75, fontStyle: "italic", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>"{q?.text}"</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.055)", borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
            {SCALE.map((opt, i) => {
              const isSel = selected === opt.value;
              return (
                <button key={opt.value} onClick={() => handleSelect(opt.value)}
                  onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#f0ead8"; }}}
                  onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8bfae"; }}}
                  style={{ width: "100%", padding: "17px 44px", background: isSel ? "rgba(42,140,90,0.2)" : "transparent", border: "none", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none", color: isSel ? "#4ade80" : "#c8bfae", fontSize: 13, fontWeight: isSel ? 600 : 400, letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif", cursor: "pointer", textAlign: "center", transition: "all 0.18s" }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── TIEBREAKER ─────────────────────────────────────────────────────────────
  if (phase === "tiebreaker") {
    const tbQ = tbQuestions[tbCurrent];
    return (
      <div style={{ ...baseStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 620, marginBottom: 44 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#5a7a5f", fontFamily: "sans-serif" }}>Almost there</div>
            <span style={{ fontSize: 12, color: "#a09880", fontFamily: "sans-serif" }}>{tbCurrent + 1} / {tbQuestions.length}</span>
          </div>
          <p style={{ fontSize: 13, color: "#4a4538", lineHeight: 1.7, fontStyle: "italic", marginBottom: 0 }}>
            Your answers put two plants neck and neck. One more question to find your fit.
          </p>
        </div>
        <div style={{ maxWidth: 620, width: "100%", opacity: tbFading ? 0 : 1, transform: tbFading ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.28s ease, transform 0.28s ease" }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: "16px 16px 0 0", padding: "48px 44px 40px", textAlign: "center" }}>
            <p style={{ fontSize: "clamp(15px,2.8vw,20px)", color: "#d8cfbe", lineHeight: 1.75, fontStyle: "italic", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>"{tbQ?.text}"</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.055)", borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
            {SCALE.map((opt, i) => {
              const isSel = tbSelected === opt.value;
              return (
                <button key={opt.value} onClick={() => handleTbSelect(opt.value)}
                  onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#f0ead8"; }}}
                  onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8bfae"; }}}
                  style={{ width: "100%", padding: "17px 44px", background: isSel ? "rgba(42,140,90,0.2)" : "transparent", border: "none", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none", color: isSel ? "#4ade80" : "#c8bfae", fontSize: 13, fontWeight: isSel ? 600 : 400, letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif", cursor: "pointer", textAlign: "center", transition: "all 0.18s" }}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── CAPTURE ────────────────────────────────────────────────────────────────
  if (phase === "capture") {
    const previewPlant = result?.isBlend
      ? plants[result.blendIds[0]]
      : plants[result.winnerId];

    return (
      <div style={{ ...baseStyle, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 72, marginBottom: 16, filter: `drop-shadow(0 0 30px ${previewPlant.color}55)` }}>
            {previewPlant.emoji}
          </div>
          <h2 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 400, color: "#f5f0e8", marginBottom: 12, fontFamily: "Georgia, serif" }}>
            Your results are ready
          </h2>
          <p style={{ fontSize: 15, color: "#6b6050", lineHeight: 1.7, marginBottom: 36, fontStyle: "italic" }}>
            Enter your details below to reveal your plant type and full profile.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: "16px 20px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif", outline: "none" }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: "16px 20px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif", outline: "none" }}
            />
            {submitError && (
              <p style={{ color: "#f87171", fontSize: 13, fontFamily: "sans-serif", margin: 0 }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button
              onClick={handleCapture}
              disabled={submitting || !email}
              style={{ background: submitting ? "rgba(42,140,90,0.5)" : "linear-gradient(135deg,#2A8C5A,#1A6B42)", color: "#f5f0e8", border: "none", padding: "18px 48px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: submitting || !email ? "not-allowed" : "pointer", letterSpacing: 3, textTransform: "uppercase", fontFamily: "sans-serif", marginTop: 8, transition: "all 0.2s" }}
            >
              {submitting ? "Submitting…" : "Reveal My Plant Type →"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#3a3528", marginTop: 16, fontFamily: "sans-serif", lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  const isBlend = result?.isBlend;
  const blendPlants = isBlend ? result.blendIds.map(id => plants[id]) : [];
  const winnerPlant = !isBlend && result ? plants[result.winnerId] : null;
  const displayTop = winnerPlant || blendPlants[0];

  return (
    <div style={{ ...baseStyle, padding: "64px 24px 80px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#3a3528", marginBottom: 20, fontFamily: "sans-serif" }}>Your Result</div>

          {isBlend ? (
            <>
              <div style={{ display: "flex", justifyContent: "center", gap: -8, marginBottom: 20 }}>
                {blendPlants.map((p, i) => (
                  <div key={p.id} style={{ fontSize: 64, filter: `drop-shadow(0 0 30px ${p.color}55)`, marginLeft: i > 0 ? -10 : 0 }}>{p.emoji}</div>
                ))}
              </div>
              <h1 style={{ fontSize: "clamp(28px,6vw,46px)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#f5f0e8", lineHeight: 1.15, marginBottom: 20 }}>
                You're a{" "}
                {blendPlants.map((p, i) => (
                  <span key={p.id}><em style={{ color: p.color }}>{p.name}</em>{i < blendPlants.length - 1 ? <span style={{ color: "#4a4030" }}> – </span> : ""}</span>
                ))}
                {" "}Blend
              </h1>
              <p style={{ fontSize: 15, color: "#6b6050", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 28px", fontStyle: "italic" }}>
                Your scores were genuinely equal — you carry the strengths of both plants. Read both descriptions below; the blend is your real answer.
              </p>
              {blendPlants.map(p => (
                <div key={p.id} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.color}33`, borderRadius: 12, padding: "20px 24px", marginBottom: 12, textAlign: "left" }}>
                  <div style={{ fontSize: 13, color: p.color, fontFamily: "sans-serif", letterSpacing: 1, marginBottom: 8 }}>{p.emoji} {p.name}</div>
                  <p style={{ fontSize: 14, color: "#6b6050", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{p.description}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={{ fontSize: 80, marginBottom: 20, filter: `drop-shadow(0 0 40px ${displayTop.color}55)` }}>{displayTop.emoji}</div>
              <h1 style={{ fontSize: "clamp(34px,7vw,54px)", fontFamily: "Georgia, serif", fontWeight: 400, color: "#f5f0e8", lineHeight: 1.15, marginBottom: 20 }}>
                You're a <em style={{ color: displayTop.color }}>{displayTop.name}</em>
              </h1>
              <p style={{ fontSize: 16, color: "#6b6050", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 28px", fontStyle: "italic" }}>{displayTop.description}</p>
              <div style={{ display: "inline-flex", gap: 24, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "14px 28px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: displayTop.color, fontFamily: "sans-serif" }}>{scores[displayTop.id]}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#3a3528", marginTop: 3, fontFamily: "sans-serif" }}>Score</div>
                </div>
                <div style={{ width: 1, background: "#2a2518" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#4a4538", fontFamily: "sans-serif" }}>{MAX}</div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#3a3528", marginTop: 3, fontFamily: "sans-serif" }}>Max</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 16, padding: "32px 36px", marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: "#3a3528", marginBottom: 28, fontFamily: "sans-serif" }}>Full Profile</div>
          {ranked.map((p, i) => <ScoreBar key={p.id} plant={p} score={p.score} maxScore={MAX} rank={i} isBlend={isBlend} />)}
        </div>

        {!isBlend && ranked[1].score >= 6 && ranked[0].id !== ranked[1].id && (
          <div style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.045)", borderRadius: 12, padding: "24px 28px", marginBottom: 28 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#3a3528", marginBottom: 10, fontFamily: "sans-serif" }}>{ranked[1].emoji} Strong Secondary — {ranked[1].name}</div>
            <p style={{ fontSize: 14, color: "#5a5040", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>{ranked[1].description}</p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={start} style={{ background: "transparent", border: "1px solid #2a2518", color: "#4a4030", padding: "12px 36px", borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", fontFamily: "sans-serif", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a4030"; e.currentTarget.style.color = "#8a7060"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2518"; e.currentTarget.style.color = "#4a4030"; }}
          >Retake Quiz</button>
        </div>
      </div>
    </div>
  );
}
