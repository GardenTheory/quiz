import { useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzbob2MaiB0WkiwYYFZpXWQTB1WJRfwN72M1lHDF_PkSiIlAKBNiQMR6BTUZp3icMw4/exec"; 

const plantData = [
  {
    name: "Sunflower", emoji: "🌻", color: "#D97706", bg: "#FFFBEB",
    description: "You radiate energy and do your best work when seen, heard, and included. You bring warmth, momentum, and enthusiasm — and you need environments that match your output with recognition.",
    questions: [
      "I feel more energized after a lively team discussion than after a solo deep-work session.",
      "I lose motivation when I can't see how my work connects to a larger purpose.",
      "I tend to be the one who re-energizes a group when morale starts to dip.",
      "Positive or constructive feedback genuinely helps me perform better.",
      "I do my sharpest thinking when I can talk through ideas with others in real time."
    ]
  },
  {
    name: "Jade", emoji: "🪴", color: "#059669", bg: "#ECFDF5",
    description: "You are steady, self-sufficient, and quietly powerful. You don't need applause — you need trust, autonomy, and space to do work you're proud of.",
    questions: [
      "I work best when I'm trusted to figure things out on my own timeline.",
      "Frequent check-ins or status updates interrupt my focus more than they help.",
      "I find purpose in the quality of my work itself, not in external recognition.",
      "When situations get chaotic, my instinct is to go quiet and focus — not escalate.",
      "I'm often more engaged than I appear — people sometimes mistake my calm for disinterest."
    ]
  },
  {
    name: "Wildflower", emoji: "🌸", color: "#DB2777", bg: "#FDF2F8",
    description: "You are creative, non-linear, and energized by possibility. You thrive where originality is welcomed and you're free to experiment without being boxed in.",
    questions: [
      "I come alive at the start of something new — before the structure gets locked in.",
      "My best ideas don't arrive on a schedule; they come in bursts when I least expect them.",
      "Rigid processes and repetitive tasks drain me faster than almost anything else.",
      "I'd rather produce something original and imperfect than something polished and predictable.",
      "I often feel misread in environments that reward consistency over creativity."
    ]
  },
  {
    name: "Bonsai", emoji: "🎋", color: "#065F46", bg: "#F0FDF4",
    description: "You are a craftsperson at heart. Depth, precision, and mastery matter more to you than speed or variety — and your best work emerges when you're given time and clarity to do it right.",
    questions: [
      "I'd rather go deep on one thing than spread myself across many.",
      "Vague instructions or shifting expectations genuinely undermine my ability to do good work.",
      "I take more pride in getting something right than in getting it done fast.",
      "Interruptions and context-switching cost me more than most people realize.",
      "Detailed, specific feedback lands better for me than general encouragement."
    ]
  },
  {
    name: "Aloe", emoji: "🌿", color: "#0891B2", bg: "#F0F9FF",
    description: "You are the stabilizer — emotionally intelligent, calm under pressure, and often the invisible glue. You need environments that protect your energy as fiercely as you protect everyone else's.",
    questions: [
      "People come to me to de-escalate tension, even when I wasn't involved in creating it.",
      "I often absorb stress from a room without anyone noticing — including me, sometimes.",
      "I feel responsible for keeping things steady, even when it's not technically my job.",
      "I'm frequently asked to interpret or translate decisions so others can actually act on them.",
      "I've noticed I'm most exhausted after a crisis ends — not while it's happening."
    ]
  },
  {
    name: "Ivy", emoji: "🍃", color: "#4F46E5", bg: "#EEF2FF",
    description: "You are a natural connector and grower. You build bridges, spot opportunities, and thrive in roles where curiosity, relationships, and momentum are the real currency.",
    questions: [
      "I get restless quickly when my role stops giving me somewhere new to grow.",
      "I instinctively see connections between people or ideas that others haven't linked yet.",
      "Strict job descriptions and rigid hierarchies make me feel like I'm working in slow motion.",
      "I've said yes to an opportunity before fully knowing what it was — because the potential was enough.",
      "I outgrow roles faster than most people expect, including my managers."
    ]
  },
  {
    name: "Fern", emoji: "🌾", color: "#15803D", bg: "#F7FEE7",
    description: "You are deeply reliable, emotionally attuned, and built for sustained contribution. You thrive in steady, supportive environments — and you give back far more than most people see.",
    questions: [
      "Conflict or volatility at work affects me more than I typically let on.",
      "I pick up on stress and burnout in others long before it gets acknowledged out loud.",
      "I feel most confident when I know exactly what's expected and the environment is calm.",
      "I've stayed somewhere longer than I should have because leaving felt like abandoning people.",
      "I take quiet pride in being someone others can count on, even if no one makes a fuss about it."
    ]
  },
  {
    name: "Cactus", emoji: "🌵", color: "#B45309", bg: "#FEF3C7",
    description: "You are built for adversity. Direct, resilient, and results-driven — you don't need a perfect environment to perform. You need clarity, real authority, and room to execute without friction.",
    questions: [
      "High-pressure situations often make me sharper, not more scattered.",
      "I show care through results and action more than through words or emotional check-ins.",
      "I've been described as intense or intimidating when I felt like I was just being efficient.",
      "I've been told to 'soften' or 'slow down' without ever being given more clarity or authority.",
      "When I inherit a broken system or struggling project, I see it as an opportunity, not a burden."
    ]
  },
  {
    name: "Seedling", emoji: "🌱", color: "#7C3AED", bg: "#F5F3FF",
    description: "You are in a growth phase — and that's a position of potential, not weakness. With clear expectations, patient mentorship, and safety to learn, you grow fast and flourish.",
    questions: [
      "I ask a lot of questions — not because I lack ability, but because I want to understand fully.",
      "I perform better when I can practice and absorb before being put on the spot.",
      "High-urgency environments make it harder for me to think clearly or do my best work.",
      "I've been read as uncertain or hesitant when I was actually still learning.",
      "When I feel genuinely supported, I grow and gain confidence faster than people expect."
    ]
  }
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestions() {
  const all = [];
  plantData.forEach((plant, pi) => {
    plant.questions.forEach((q, qi) => {
      all.push({ text: q, plantIndex: pi, id: `${pi}-${qi}` });
    });
  });
  return shuffle(all);
}

const TOTAL = 45;

export default function PlantQuiz() {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState(Array(9).fill(0));
  const [animating, setAnimating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function startQuiz() {
    setQuestions(buildQuestions());
    setScores(Array(9).fill(0));
    setCurrent(0);
    setPhase("quiz");
  }

  function handleAnswer(yes) {
    if (animating) return;
    setAnimating(true);
    if (yes) {
      const newScores = [...scores];
      newScores[questions[current].plantIndex]++;
      setScores(newScores);
    }
    setTimeout(() => {
      if (current + 1 >= TOTAL) {
        setPhase("capture");
      } else {
        setCurrent(current + 1);
      }
      setAnimating(false);
    }, 260);
  }

  const ranked = plantData
    .map((p, i) => ({ ...p, score: scores[i] }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];

  async function handleCapture(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitError(false);

    const payload = {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      status: "complete",
      questionReached: TOTAL,
      sunflower: scores[0],
      jade: scores[1],
      wildflower: scores[2],
      bonsai: scores[3],
      aloe: scores[4],
      ivy: scores[5],
      fern: scores[6],
      cactus: scores[7],
      seedling: scores[8],
      result: top.name.toLowerCase()
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

  function restart() {
    setPhase("intro");
    setName("");
    setEmail("");
  }

  const progress = (current / TOTAL) * 100;

  if (phase === "intro") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f1a12 0%, #1a2e1e 40%, #0d1a1f 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative", overflow: "hidden"
      }}>
        {["🌻","🪴","🌸","🎋","🌿","🍃","🌾","🌵","🌱"].map((e, i) => (
          <div key={i} style={{
            position: "absolute",
            fontSize: `${18 + (i % 3) * 10}px`,
            opacity: 0.07,
            top: `${10 + (i * 83) % 80}%`,
            left: `${5 + (i * 97) % 90}%`,
            transform: `rotate(${i * 37}deg)`,
            pointerEvents: "none", userSelect: "none"
          }}>{e}</div>
        ))}
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4ade80, #34d399)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontSize: 13, letterSpacing: 4, textTransform: "uppercase",
            marginBottom: 20, fontStyle: "italic"
          }}>Workplace Personality Quiz</div>
          <h1 style={{
            fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 400,
            color: "#f0f9f0", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.5px"
          }}>
            What Kind of<br />
            <span style={{
              background: "linear-gradient(135deg, #86efac, #6ee7b7, #34d399)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>Plant Are You?</span>
          </h1>
          <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.8, marginBottom: 10, fontStyle: "italic" }}>
            45 questions. No plant names attached.<br />Just honest answers about how you work best.
          </p>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 40, fontFamily: "sans-serif" }}>
            ~4 minutes · Trust your first instinct
          </p>
          <button onClick={startQuiz} style={{
            background: "linear-gradient(135deg, #16a34a, #059669)",
            color: "white", border: "none",
            padding: "18px 48px", borderRadius: 4,
            fontSize: 15, fontWeight: 600, cursor: "pointer",
            letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
            boxShadow: "0 0 40px rgba(74,222,128,0.2)", transition: "all 0.2s"
          }}
            onMouseEnter={e => e.target.style.boxShadow = "0 0 60px rgba(74,222,128,0.4)"}
            onMouseLeave={e => e.target.style.boxShadow = "0 0 40px rgba(74,222,128,0.2)"}
          >
            Begin →
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    const q = questions[current];
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f1a12 0%, #1a2e1e 40%, #0d1a1f 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 24px", fontFamily: "'Georgia', serif",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ width: "100%", maxWidth: 580, marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif" }}>
              Question {current + 1}
            </span>
            <span style={{ fontSize: 12, color: "#6b7280", letterSpacing: 1, fontFamily: "sans-serif" }}>
              {current + 1} <span style={{ color: "#374151" }}>/ {TOTAL}</span>
            </span>
          </div>
          <div style={{ height: 3, background: "#1f2d22", borderRadius: 999 }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #16a34a, #4ade80)",
              borderRadius: 999, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)"
            }} />
          </div>
        </div>

        <div style={{
          maxWidth: 580, width: "100%",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "52px 44px", textAlign: "center",
          backdropFilter: "blur(10px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)"
        }}>
          <p style={{
            fontSize: "clamp(16px, 3vw, 22px)", color: "#e5e7eb", lineHeight: 1.7,
            fontWeight: 400, fontStyle: "italic",
            minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 44
          }}>
            "{q?.text}"
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={() => handleAnswer(true)} style={{
              padding: "14px 40px", borderRadius: 4,
              border: "1.5px solid #16a34a", background: "transparent",
              color: "#4ade80", fontSize: 14, fontWeight: 700, cursor: "pointer",
              letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
              transition: "all 0.2s", minWidth: 130
            }}
              onMouseEnter={e => { e.target.style.background = "#16a34a"; e.target.style.color = "white"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#4ade80"; }}
            >Yes</button>
            <button onClick={() => handleAnswer(false)} style={{
              padding: "14px 40px", borderRadius: 4,
              border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent",
              color: "#9ca3af", fontSize: 14, fontWeight: 700, cursor: "pointer",
              letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
              transition: "all 0.2s", minWidth: 130
            }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.color = "#e5e7eb"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#9ca3af"; }}
            >No</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 32, flexWrap: "wrap", justifyContent: "center", maxWidth: 400 }}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i < current ? "#16a34a" : i === current ? "#4ade80" : "rgba(255,255,255,0.1)",
              transition: "background 0.3s"
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (phase === "capture") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f1a12 0%, #1a2e1e 40%, #0d1a1f 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", fontFamily: "'Georgia', serif"
      }}>
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
          <form onSubmit={handleCapture} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding: "16px 20px", borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif",
                outline: "none"
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: "16px 20px", borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                color: "#e5e7eb", fontSize: 15, fontFamily: "sans-serif",
                outline: "none"
              }}
            />
            {submitError && (
              <p style={{ color: "#f87171", fontSize: 13, fontFamily: "sans-serif", margin: 0 }}>
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "rgba(22,163,74,0.5)" : "linear-gradient(135deg, #16a34a, #059669)",
                color: "white", border: "none",
                padding: "18px 48px", borderRadius: 4,
                fontSize: 15, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer",
                letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif",
                marginTop: 8, transition: "all 0.2s"
              }}
            >
              {submitting ? "Submitting…" : "Reveal My Plant Type →"}
            </button>
          </form>
          <p style={{ fontSize: 12, color: "#4b5563", marginTop: 16, fontFamily: "sans-serif", lineHeight: 1.6 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0f1a12 0%, #1a2e1e 40%, #0d1a1f 100%)",
      padding: "60px 24px 80px", fontFamily: "'Georgia', serif",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
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
            {top.score} / 5 matched
          </div>
        </div>

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
                  {i === 1 && p.score >= 3 && <span style={{ marginLeft: 8, fontSize: 11, color: "#6b7280", letterSpacing: 2, fontFamily: "sans-serif" }}>SECONDARY</span>}
                </span>
                <span style={{ fontSize: 13, color: i === 0 ? "#4ade80" : "#4b5563", fontFamily: "sans-serif" }}>{p.score}/5</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 999 }}>
                <div style={{
                  height: "100%", width: `${(p.score / 5) * 100}%`,
                  background: i === 0 ? "linear-gradient(90deg, #16a34a, #4ade80)"
                    : i === 1 && p.score >= 3 ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.1)",
                  borderRadius: 999, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)"
                }} />
              </div>
            </div>
          ))}
        </div>

        {ranked[1].score >= 3 && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "24px 28px", marginBottom: 32
          }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, fontFamily: "sans-serif", letterSpacing: 1 }}>
              {ranked[1].emoji} Strong Secondary: <span style={{ color: "#9ca3af" }}>{ranked[1].name}</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              {ranked[1].description}
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
