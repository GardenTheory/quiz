import { useState, useEffect } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbob2MaiB0WkiwYYFZpXWQTB1WJRfwN72M1lHDF_PkSiIlAKBNiQMR6BTUZp3icMw4/exec";

const _fontLink = document.createElement("link");
_fontLink.rel = "stylesheet";
_fontLink.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap";
document.head.appendChild(_fontLink);

// ─── PLANT DEFINITIONS ───────────────────────────────────────────────────────
const plantData = [
  {
    id: "sunflower", name: "Sunflower", emoji: "🌻", color: "#D97706", bg: "#FFFBEB",
    description: "You radiate energy and do your best work when seen, heard, and included. You bring warmth, momentum, and enthusiasm — and you need environments that match your output with recognition.",
    questions: [
      "When I do strong work that nobody acknowledges, I find it genuinely hard to stay motivated — even if I know the work was good.",
      "I perform noticeably better when a leader or colleague expresses belief in me — it's not just nice, it actually changes my output.",
      "I find it draining to be in a role where I'm doing meaningful work but have no visibility into how it's being received.",
      "Being left out of a key conversation or decision — even one I could have contributed to — bothers me more than most people would understand.",
      "I genuinely bring more energy and do better work when I feel like the people around me are engaged and invested in what we're building together."
    ]
  },
  {
    id: "jade", name: "Jade", emoji: "🪴", color: "#059669", bg: "#ECFDF5",
    description: "You are steady, self-sufficient, and quietly powerful. You don't need applause — you need trust, autonomy, and space to do work you're proud of.",
    questions: [
      "I'm comfortable working quietly behind the scenes, without needing constant recognition or visibility.",
      "I value stability, clarity, and sustainability over speed, urgency, or constant change.",
      "When things get chaotic, my instinct is to withdraw, focus, and conserve energy rather than escalate.",
      "People often underestimate my engagement or impact because I'm calm, reserved, or not performative.",
      "I know my own standards well enough that I don't need external reinforcement to feel confident in my work."
    ]
  },
  {
    id: "wildflower", name: "Wildflower", emoji: "🌸", color: "#DB2777", bg: "#FDF2F8",
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
    id: "bonsai", name: "Bonsai", emoji: "🎋", color: "#065F46", bg: "#F0FDF4",
    description: "You are a craftsperson at heart. Depth, precision, and mastery matter more to you than speed or variety — and your best work emerges when you're given time and clarity to do it right.",
    questions: [
      "I feel genuinely frustrated when I'm forced to produce work quickly that I know could be significantly better with more time.",
      "I feel frustrated by constant interruptions or shifting priorities.",
      "I take pride in mastering a specific skill or craft rather than staying generalist.",
      "I prefer going deep on one thing over spreading myself across many.",
      "Vague instructions or unclear expectations genuinely undermine my ability to do good work."
    ]
  },
  {
    id: "aloe", name: "Aloe", emoji: "🌿", color: "#0891B2", bg: "#F0F9FF",
    description: "You are the stabilizer — emotionally intelligent, calm under pressure, and often the invisible glue. You need environments that protect your energy as fiercely as you protect everyone else's.",
    questions: [
      "People come to me to calm situations down, even when I wasn't involved in creating the problem.",
      "I'm frequently asked to interpret or translate leadership decisions so others can actually act on them.",
      "I notice issues early, raise them thoughtfully, and often end up managing the fallout anyway.",
      "I regularly take on emotional and relational work that isn't in my job description — because if I don't, no one will.",
      "I tend to realize I'm exhausted after a crisis ends, not while it's happening."
    ]
  },
  {
    id: "ivy", name: "Ivy", emoji: "🍃", color: "#4F46E5", bg: "#EEF2FF",
    description: "You are a natural connector and grower. You build bridges, spot opportunities, and thrive in roles where curiosity, relationships, and momentum are the real currency.",
    questions: [
      "I get restless or disengaged when my role stops offering learning or growth.",
      "I naturally connect ideas, people, or teams that don't yet know they should work together.",
      "I tend to say yes to opportunities because they feel exciting — even when I'm already busy.",
      "I've outgrown roles quickly and felt ready for 'what's next' before others expected it.",
      "The relationships I build at work aren't just pleasant — they're genuinely how I get my best work done."
    ]
  },
  {
    id: "fern", name: "Fern", emoji: "🌾", color: "#15803D", bg: "#F7FEE7",
    description: "You are deeply reliable, emotionally attuned, and built for sustained contribution. You thrive in steady, supportive environments — and you give back far more than most people see.",
    questions: [
      "I feel most fulfilled when I'm supporting others or helping things run smoothly behind the scenes.",
      "I prefer steady routines and predictable environments over fast-paced or constantly changing ones.",
      "I'm sensitive to conflict or emotional volatility at work, even if I don't show it outwardly.",
      "I notice when the emotional temperature of a team shifts — often before anyone else names it.",
      "I feel most confident and calm when expectations are clear and the emotional climate is steady."
    ]
  },
  {
    id: "cactus", name: "Cactus", emoji: "🌵", color: "#B45309", bg: "#FEF3C7",
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
    id: "bamboo", name: "Bamboo", emoji: "🌱", color: "#7C3AED", bg: "#F5F3FF",
    description: "You are in a growth phase — and that's a position of potential, not weakness. With clear expectations, patient mentorship, and safety to learn, you grow fast and flourish.",
    questions: [
      "I learn best through practice, feedback, and repetition rather than immediate performance.",
      "I ask a lot of questions — not because I lack ability, but because I want to understand things fully.",
      "I do my best work when I feel genuinely safe to make mistakes without it affecting how I'm perceived.",
      "I'm more confident when expectations are clearly defined and reinforced over time.",
      "I feel energized by encouragement and reassurance, especially when tackling something new."
    ]
  }
];

// ─── FIB QUESTIONS ───────────────────────────────────────────────────────────
// Each option awards 1 point to the specified plant id
const fibQuestions = [
  {
    id: "fib1",
    text: "When I complete a project I'm proud of, what I want most is:",
    options: [
      { label: "For the right people to notice and say so — recognition closes the loop for me", plant: "sunflower" },
      { label: "To know I did it well — the work itself is the reward", plant: "jade" },
      { label: "To understand how it contributed to something bigger", plant: "ivy" },
      { label: "To immediately start refining it — I can already see what I'd do better", plant: "bonsai" },
      { label: "To put it out into the world — even imperfect, I want it seen", plant: "wildflower" }
    ]
  },
  {
    id: "fib2",
    text: "When I'm given a vague brief with lots of creative freedom, I feel:",
    options: [
      { label: "Energized — the open space is where I do my best work", plant: "wildflower" },
      { label: "Uncomfortable — I need clearer parameters before I can really dig in", plant: "bonsai" },
      { label: "Cautious — I want to understand what success looks like first", plant: "bamboo" },
      { label: "Neutral — I'll define my own structure and get on with it", plant: "jade" },
      { label: "Excited, but I want to riff on it with someone before I dive in", plant: "sunflower" }
    ]
  },
  {
    id: "fib3",
    text: "When tension rises in a team meeting, my instinct is to:",
    options: [
      { label: "Step in and actively manage the dynamic — redirect, reframe, de-escalate", plant: "aloe" },
      { label: "Go quiet and hope it resolves — conflict drains me even when I'm not involved", plant: "fern" },
      { label: "Stay focused on the task and push past the emotion", plant: "cactus" },
      { label: "Try to find the root cause so we can actually fix it", plant: "bonsai" }
    ]
  },
  {
    id: "fib4",
    text: "The part of a new project I find most exciting is:",
    options: [
      { label: "Meeting the people involved and figuring out how everyone connects", plant: "ivy" },
      { label: "The blank canvas — before any rules or structure exist", plant: "wildflower" },
      { label: "Understanding the full scope so I can plan my contribution precisely", plant: "bonsai" },
      { label: "Knowing my role is clear and I can get to work", plant: "cactus" },
      { label: "Scanning for where things might go wrong so I can get ahead of them", plant: "aloe" },
      { label: "Being handed something half-formed and figuring it out as I go", plant: "bamboo" }
    ]
  },
  {
    id: "fib5",
    text: "When I'm given a struggling project with no clear owner, I:",
    options: [
      { label: "Step up, take charge, and start making calls — someone has to", plant: "cactus" },
      { label: "Do my part quietly and well, but I'm not reaching for the wheel", plant: "jade" },
      { label: "Try to figure out who the right person to lead it is and connect them to it", plant: "ivy" },
      { label: "Feel anxious until the expectations and ownership are clearer", plant: "bamboo" },
      { label: "Start quietly absorbing what's broken and managing the people dynamics", plant: "aloe" }
    ]
  },
  {
    id: "fib6",
    text: "When I think about the best manager I've ever had, what made them great was:",
    options: [
      { label: "They checked in consistently, gave clear direction, and never left me guessing", plant: "bamboo" },
      { label: "They were steady, warm, and genuinely invested in my wellbeing over time", plant: "fern" },
      { label: "They trusted me completely and stayed out of my way", plant: "jade" },
      { label: "They pushed me into visible opportunities and advocated for me loudly", plant: "sunflower" },
      { label: "They connected me to the right people and opened doors I didn't know existed", plant: "ivy" }
    ]
  },
  {
    id: "fib7",
    text: "After a high-stakes, high-pressure situation at work, I usually feel:",
    options: [
      { label: "Wired — pressure activates me and I often want to debrief and go again", plant: "cactus" },
      { label: "Quietly drained — I held a lot together and now I need to recover alone", plant: "aloe" },
      { label: "Fine, honestly — I stayed in my lane and didn't absorb much of the chaos", plant: "jade" },
      { label: "Unsettled — I replay what happened and worry about what I could have done better", plant: "fern" },
      { label: "Restless — I'm already thinking about what I'd do differently or explore next", plant: "ivy" },
      { label: "Buzzing — high pressure brings out something in me I can't quite manufacture any other way", plant: "wildflower" }
    ]
  },
  {
    id: "fib8",
    text: "When I'm new to something, what helps me most is:",
    options: [
      { label: "A patient guide who checks in often and reassures me I'm on track", plant: "bamboo" },
      { label: "A calm, stable environment where I can observe and absorb before performing", plant: "fern" },
      { label: "Clear written expectations I can return to on my own", plant: "bonsai" },
      { label: "Being thrown in — I learn fastest by doing, even if it's messy", plant: "wildflower" },
      { label: "Encouragement from someone who genuinely believes I can do it — that unlocks everything", plant: "sunflower" }
    ]
  },
  {
    id: "fib9",
    text: "What drives me to build relationships at work is primarily:",
    options: [
      { label: "Genuine curiosity — I want to know what people are working on and where things connect", plant: "ivy" },
      { label: "Energy — being around engaged, invested people makes me perform better", plant: "sunflower" },
      { label: "Pragmatism — relationships are simply how things actually get done", plant: "cactus" },
      { label: "Loyalty — I invest deeply in a small number of people over a long time", plant: "fern" },
      { label: "Care — I invest in people because someone needs to hold the thread", plant: "aloe" }
    ]
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildStatementQuestions() {
  const all = [];
  plantData.forEach((plant) => {
    plant.questions.forEach((q, qi) => {
      all.push({ text: q, plantId: plant.id, id: `${plant.id}-${qi}`, type: "statement" });
    });
  });
  return shuffle(all);
}

function buildFibQuestions() {
  return shuffle(fibQuestions.map(q => ({ ...q, type: "fib" })));
}

function buildAllQuestions() {
  // Interleave: roughly every 5 statement questions, insert 1 FIB
  const statements = buildStatementQuestions(); // 45 questions
  const fibs = buildFibQuestions();             // 9 questions
  const result = [];
  let fibIdx = 0;
  statements.forEach((q, i) => {
    result.push(q);
    if ((i + 1) % 5 === 0 && fibIdx < fibs.length) {
      result.push(fibs[fibIdx++]);
    }
  });
  return result;
}

const TOTAL_STATEMENTS = 45;
const TOTAL_FIBS = 9;
const TOTAL_QUESTIONS = TOTAL_STATEMENTS + TOTAL_FIBS; // 54

const initialScores = () => Object.fromEntries(plantData.map(p => [p.id, 0]));

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PlantQuiz() {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState(initialScores());
  const [fibAnswers, setFibAnswers] = useState({});
  const [animating, setAnimating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [selectedFib, setSelectedFib] = useState(null);
  const [history, setHistory] = useState([]);

  function startQuiz() {
    const qs = buildAllQuestions();
    setQuestions(qs);
    setScores(initialScores());
    setFibAnswers({});
    setHistory([]);
    setCurrent(0);
    setSelectedFib(null);
    setPhase("quiz");
  }

  function handleStatementAnswer(value) {
    if (animating) return;
    setAnimating(true);
    setHistory(prev => [...prev, { scores: { ...scores }, fibAnswers: { ...fibAnswers } }]);
    if (value !== 0) {
      const q = questions[current];
      setScores(prev => ({
        ...prev,
        [q.plantId]: Math.max(0, prev[q.plantId] + value)
      }));
    }
    setTimeout(() => {
      advanceQuestion();
      setAnimating(false);
    }, 260);
  }

  function handleFibSelect(optionPlant, questionId) {
    if (animating) return;
    setAnimating(true);
    setHistory(prev => [...prev, { scores: { ...scores }, fibAnswers: { ...fibAnswers } }]);
    setScores(prev => ({ ...prev, [optionPlant]: prev[optionPlant] + 1 }));
    setFibAnswers(prev => ({ ...prev, [questionId]: optionPlant }));
    setSelectedFib(null);
    setTimeout(() => {
      advanceQuestion();
      setAnimating(false);
    }, 260);
  }

  function goBack() {
    if (animating || history.length === 0) return;
    setAnimating(true);
    const snap = history[history.length - 1];
    setScores(snap.scores);
    setFibAnswers(snap.fibAnswers);
    setHistory(h => h.slice(0, -1));
    setSelectedFib(null);
    setTimeout(() => {
      setCurrent(c => c - 1);
      setAnimating(false);
    }, 260);
  }

  function advanceQuestion() {
    if (current + 1 >= questions.length) {
      setPhase("capture");
    } else {
      setCurrent(c => c + 1);
    }
  }

  // ─── Scoring / results ────────────────────────────────────────────────────
  // Statement max = 5 per plant, FIB max = 5 per plant (balanced)
  // Normalize: statement score / 5 + fib score / 5, then rank
  const ranked = plantData
    .map(p => ({ ...p, score: scores[p.id] }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];

  // Statements answered so far (for progress)
  const statementsAnswered = questions.slice(0, current).filter(q => q.type === "statement").length;
  const progressPct = (statementsAnswered / TOTAL_STATEMENTS) * 100;

  // ─── Submit to Google Sheets ──────────────────────────────────────────────
  async function handleCapture() {
    if (!email) return;
    setSubmitting(true);
    setSubmitError(false);

    const payload = {
      timestamp: new Date().toISOString(),
      name,
      email,
      status: "complete",
      totalQuestions: TOTAL_QUESTIONS,
      // Statement scores (max 5 each)
      sunflower_statements: scores["sunflower"],
      jade_statements: scores["jade"],
      wildflower_statements: scores["wildflower"],
      bonsai_statements: scores["bonsai"],
      aloe_statements: scores["aloe"],
      ivy_statements: scores["ivy"],
      fern_statements: scores["fern"],
      cactus_statements: scores["cactus"],
      bamboo_statements: scores["bamboo"],
      // FIB answers (which plant each FIB awarded a point to)
      fib1: fibAnswers["fib1"] || "",
      fib2: fibAnswers["fib2"] || "",
      fib3: fibAnswers["fib3"] || "",
      fib4: fibAnswers["fib4"] || "",
      fib5: fibAnswers["fib5"] || "",
      fib6: fibAnswers["fib6"] || "",
      fib7: fibAnswers["fib7"] || "",
      fib8: fibAnswers["fib8"] || "",
      fib9: fibAnswers["fib9"] || "",
      // Combined totals (statement + fib points, max 10 per plant)
      sunflower: scores["sunflower"],
      jade: scores["jade"],
      wildflower: scores["wildflower"],
      bonsai: scores["bonsai"],
      aloe: scores["aloe"],
      ivy: scores["ivy"],
      fern: scores["fern"],
      cactus: scores["cactus"],
      bamboo: scores["bamboo"],
      // Primary result tag
      result: top.id,
      result_secondary: second.score >= 3 ? second.id : ""
    };

    // Send via GET with query params — works reliably with Apps Script no-cors
    const params = new URLSearchParams({
      timestamp: payload.timestamp,
      name: payload.name,
      email: payload.email,
      status: payload.status,
      sunflower: payload.sunflower,
      jade: payload.jade,
      wildflower: payload.wildflower,
      bonsai: payload.bonsai,
      aloe: payload.aloe,
      ivy: payload.ivy,
      fern: payload.fern,
      cactus: payload.cactus,
      bamboo: payload.bamboo,
      result: payload.result,
      result_secondary: payload.result_secondary
    });

    fetch(APPS_SCRIPT_URL + "?" + params.toString(), {
      method: "GET",
      mode: "no-cors"
    }).catch(() => {});

    setPhase("results");
    setSubmitting(false);
  }

  function restart() {
    setPhase("intro");
    setName("");
    setEmail("");
    setScores(initialScores());
    setFibAnswers({});
    setSelectedFib(null);
  }

  // ─── STYLES (shared) ──────────────────────────────────────────────────────
  const darkBg = {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #0f1a12 0%, #1a2e1e 40%, #0d1a1f 100%)",
    fontFamily: "'Lora', 'Georgia', serif",
    position: "relative",
    overflow: "hidden"
  };

  // ─── PHASE: INTRO ─────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div style={{ ...darkBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        {["🌻","🪴","🌸","🎋","🌿","🍃","🌾","🌵","🌱"].map((e, i) => (
          <div key={i} style={{
            position: "absolute", fontSize: `${18 + (i % 3) * 10}px`,
            opacity: 0.07, top: `${10 + (i * 83) % 80}%`, left: `${5 + (i * 97) % 90}%`,
            transform: `rotate(${i * 37}deg)`, pointerEvents: "none", userSelect: "none"
          }}>{e}</div>
        ))}
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4ade80, #34d399)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontSize: 13, letterSpacing: 4, textTransform: "uppercase",
            marginBottom: 20, fontStyle: "italic"
          }}>What's Your Plant Type?</div>
          <h1 style={{
            fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 400,
            color: "#f0f9f0", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.5px"
          }}>
            Garden Theory Quiz<br />
          </h1>
          <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.8, marginBottom: 10, fontStyle: "italic" }}>
           Find your plant type and the environment where you grow best.
          </p>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 40, fontFamily: "sans-serif" }}>
            ~5 minutes · Trust your first instinct
          </p>
          <button onClick={startQuiz} style={{
            background: "linear-gradient(135deg, #16a34a, #059669)",
            color: "white", border: "none", padding: "18px 48px", borderRadius: 4,
            fontSize: 15, fontWeight: 600, cursor: "pointer",
            letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
            boxShadow: "0 0 40px rgba(74,222,128,0.2)", transition: "all 0.2s"
          }}
            onMouseEnter={e => e.target.style.boxShadow = "0 0 60px rgba(74,222,128,0.4)"}
            onMouseLeave={e => e.target.style.boxShadow = "0 0 40px rgba(74,222,128,0.2)"}
          >Begin →</button>
        </div>
      </div>
    );
  }

  // ─── PHASE: QUIZ ──────────────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = questions[current];
    const isFib = q?.type === "fib";

    return (
      <div style={{ ...darkBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
        {/* Progress bar */}
        <div style={{ width: "100%", maxWidth: 580, marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif" }}>
              {isFib ? "Choose one" : "Select what feels most like you"}
            </span>
            <span style={{ fontSize: 12, color: "#6b7280", letterSpacing: 1, fontFamily: "sans-serif" }}>
              {current + 1} <span style={{ color: "#374151" }}>/ {TOTAL_QUESTIONS}</span>
            </span>
          </div>
          <div style={{ height: 3, background: "#1f2d22", borderRadius: 999 }}>
            <div style={{
              height: "100%", width: `${progressPct}%`,
              background: "linear-gradient(90deg, #16a34a, #4ade80)",
              borderRadius: 999, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)"
            }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{
          maxWidth: 580, width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: isFib ? "40px 36px" : "52px 44px", textAlign: "center",
          backdropFilter: "blur(10px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: animating ? "none" : "auto"
        }}>
          <p style={{
            fontSize: isFib ? "clamp(15px, 2.5vw, 18px)" : "clamp(16px, 3vw, 22px)",
            color: "#e5e7eb", lineHeight: 1.7,
            fontWeight: 400, fontStyle: "italic",
            marginBottom: isFib ? 28 : 44,
            minHeight: isFib ? "auto" : 100,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            "{q?.text}"
          </p>

          {isFib ? (
            // FIB: multiple choice — selecting immediately advances
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleFibSelect(opt.plant, q.id)}
                  style={{
                    padding: "14px 20px", borderRadius: 8, textAlign: "left",
                    border: "1.5px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.02)",
                    color: "#9ca3af",
                    fontSize: 14, fontFamily: "sans-serif", cursor: "pointer",
                    transition: "all 0.18s", lineHeight: 1.5
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#e5e7eb"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <span style={{ marginRight: 10, opacity: 0.5, fontFamily: "monospace" }}>
                    {String.fromCharCode(65 + i)})
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            // Statement: 4-point Likert scale
            <>
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
                .likert-btn {
                  padding: 13px 18px;
                  border-radius: 4px;
                  flex: 1 1 120px;
                  max-width: 160px;
                  border: 1.5px solid rgba(255,255,255,0.15);
                  background: transparent;
                  color: #9ca3af;
                  font-size: 12px;
                  font-weight: 700;
                  cursor: pointer;
                  letter-spacing: 1.5px;
                  text-transform: uppercase;
                  font-family: sans-serif;
                  transition: all 0.18s;
                  line-height: 1.3;
                  text-align: center;
                }
                .likert-btn:hover {
                  background: rgba(74,222,128,0.1);
                  border-color: #4ade80;
                  color: #4ade80;
                }
              `}</style>
              <div key={current} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { label: "Strongly Agree", value: 2 },
                  { label: "Agree", value: 1 },
                  { label: "Disagree", value: 0 },
                  { label: "Strongly Disagree", value: -1 }
                ].map(btn => (
                  <button
                    key={btn.label}
                    className="likert-btn"
                    onClick={() => handleStatementAnswer(btn.value)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Dot progress */}
        <div style={{ display: "flex", gap: 5, marginTop: 32, flexWrap: "wrap", justifyContent: "center", maxWidth: 440 }}>
          {Array.from({ length: TOTAL_STATEMENTS }).map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i < statementsAnswered ? "#16a34a" : i === statementsAnswered ? "#4ade80" : "rgba(255,255,255,0.1)",
              transition: "background 0.3s"
            }} />
          ))}
        </div>

        {/* Back button */}
        {history.length > 0 && (
          <button
            onClick={goBack}
            style={{
              marginTop: 20, background: "transparent", border: "none",
              color: "#4b5563", fontSize: 12, fontFamily: "sans-serif",
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
              transition: "color 0.18s", fontWeight: 600
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#9ca3af"}
            onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
          >
            ← Back
          </button>
        )}
      </div>
    );
  }

  // ─── PHASE: CAPTURE ───────────────────────────────────────────────────────
  if (phase === "capture") {
    return (
      <div style={{ ...darkBg, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16, filter: "drop-shadow(0 0 20px rgba(74,222,128,0.3))" }}>
            {top.emoji}
          </div>
          <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 400, color: "#f0f9f0", marginBottom: 12 }}>
            Your results are ready
          </h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, marginBottom: 36, fontStyle: "italic" }}>
            Enter your details below to reveal your plant type and full profile.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: "16px 20px", borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif", outline: "none"
              }}
            />
            <input
              type="text"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: "16px 20px", borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif", outline: "none"
              }}
            />
            {submitError && (
              <p style={{ color: "#f87171", fontSize: 13, fontFamily: "sans-serif", margin: 0 }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button
              onClick={handleCapture}
              disabled={submitting || !email}
              style={{
                background: submitting || !email ? "rgba(22,163,74,0.4)" : "linear-gradient(135deg, #16a34a, #059669)",
                color: "white", border: "none", padding: "18px 48px", borderRadius: 4,
                fontSize: 15, fontWeight: 600, cursor: submitting || !email ? "not-allowed" : "pointer",
                letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
                marginTop: 8, transition: "all 0.2s"
              }}
            >
              {submitting ? "Submitting…" : "Reveal My Plant Type →"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#4b5563", marginTop: 16, fontFamily: "sans-serif", lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime.
          </p>
          <button
            onClick={() => { setCurrent(questions.length - 1); setPhase("quiz"); }}
            style={{
              marginTop: 16, background: "transparent", border: "none",
              color: "#4b5563", fontSize: 12, fontFamily: "sans-serif",
              letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
              transition: "color 0.18s", fontWeight: 600
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#9ca3af"}
            onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // ─── PHASE: RESULTS ───────────────────────────────────────────────────────
  return (
    <div style={{ ...darkBg, padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Primary result */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 72, marginBottom: 16, filter: "drop-shadow(0 0 30px rgba(74,222,128,0.3))" }}>{top.emoji}</div>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#6b7280", marginBottom: 12, fontFamily: "sans-serif" }}>
            Your Plant Type
          </div>
          <h1 style={{ fontSize: "clamp(32px, 7vw, 52px)", fontWeight: 400, color: "#f0f9f0", marginBottom: 20, lineHeight: 1.2 }}>
            You're a{" "}
            <span style={{
              background: "linear-gradient(135deg, #86efac, #34d399)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>{top.name}</span>
          </h1>
          <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 28px", fontStyle: "italic" }}>
            {top.description}
          </p>
          <div style={{
            display: "inline-block",
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: 4, padding: "8px 20px",
            fontSize: 13, color: "#4ade80", fontFamily: "sans-serif", letterSpacing: 1
          }}>
            {top.score} / 15 matched
          </div>
        </div>

        {/* Full score breakdown */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "32px", marginBottom: 24
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6b7280", marginBottom: 28, fontFamily: "sans-serif" }}>
            Your Full Profile
          </div>
          {ranked.map((p, i) => (
            <div key={p.name} style={{ marginBottom: i < ranked.length - 1 ? 20 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 15, color: i === 0 ? "#e5e7eb" : "#6b7280", fontStyle: i === 0 ? "italic" : "normal" }}>
                  {p.emoji} {p.name}
                  {i === 0 && <span style={{ marginLeft: 8, fontSize: 11, color: "#4ade80", letterSpacing: 2, fontFamily: "sans-serif", fontStyle: "normal" }}>PRIMARY</span>}
                  {i === 1 && p.score >= 6 && <span style={{ marginLeft: 8, fontSize: 11, color: "#6b7280", letterSpacing: 2, fontFamily: "sans-serif" }}>SECONDARY</span>}
                </span>
                <span style={{ fontSize: 13, color: i === 0 ? "#4ade80" : "#4b5563", fontFamily: "sans-serif" }}>{p.score}/15</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 999 }}>
                <div style={{
                  height: "100%", width: `${(p.score / 15) * 100}%`,
                  background: i === 0 ? "linear-gradient(90deg, #16a34a, #4ade80)"
                    : i === 1 && p.score >= 4 ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)",
                  borderRadius: 999, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)"
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Secondary profile */}
        {second.score >= 6 && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "24px 28px", marginBottom: 32
          }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, fontFamily: "sans-serif", letterSpacing: 1 }}>
              {second.emoji} Strong Secondary: <span style={{ color: "#9ca3af" }}>{second.name}</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              {second.description}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <button onClick={restart} style={{
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "#9ca3af", padding: "12px 32px", borderRadius: 4,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif", transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "#e5e7eb"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#9ca3af"; }}
          >Retake Quiz</button>
        </div>
      </div>
    </div>
  );
}
