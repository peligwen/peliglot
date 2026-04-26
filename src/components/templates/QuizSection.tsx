import { useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { DarkBox } from '../DarkBox';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface QuizSectionProps<T> {
  items: T[];
  answerKey?: keyof T;
  renderQuestion: (item: T) => ReactNode;
  optionCount?: number;
  color: string;
  title?: string;
  resultMessages?: { high: string; mid: string; low: string };
}

type QuizQuestion<T> = T & { options: string[] };

export function QuizSection<T>({
  items,
  answerKey = 'answer' as keyof T,
  renderQuestion,
  optionCount = 4,
  color,
  resultMessages,
  title,
}: QuizSectionProps<T>): ReactElement {
  // Cast answer to string once at the boundary — answer fields are conventionally strings
  const getAnswer = (item: T): string => String(item[answerKey]);

  const makeQuestions = (): QuizQuestion<T>[] =>
    shuffle(items).map((item, _, arr) => {
      const correct = getAnswer(item);
      const wrong = shuffle(arr.filter(x => getAnswer(x) !== correct))
        .slice(0, optionCount - 1);
      return {
        ...item,
        options: shuffle([correct, ...wrong.map(x => getAnswer(x))]),
      };
    });

  const [questions, setQuestions] = useState<QuizQuestion<T>[]>(() => makeQuestions());
  const [qIdx, setQIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => { setQuestions(makeQuestions()); setQIdx(0); setChosen(null); setScore(0); setDone(false); };
  const handleAnswer = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    if (opt === getAnswer(questions[qIdx])) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (qIdx + 1 >= questions.length) { setDone(true); }
    else { setQIdx(i => i + 1); setChosen(null); }
  };

  const q = !done ? questions[qIdx] : null;
  const msgs = resultMessages || { high: "Excellent!", mid: "Good job! Keep practicing.", low: "Keep studying and try again." };

  return (
    <div>
      {title && <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", marginBottom: 12, textAlign: "center" }}>{title}</div>}

      {!done ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "8px 14px", background: "#fff", borderRadius: 10, border: "1px solid #eee", fontSize: 12 }}>
            <span style={{ color: "#555", fontWeight: 600 }}>Question {qIdx + 1} / {questions.length}</span>
            <span style={{ color: "#2E7D32", fontWeight: 800 }}>✓ {score} correct</span>
          </div>

          {q !== null && (
            <>
              <div style={{ background: "#fff", borderRadius: 14, padding: "28px 16px", marginBottom: 14, border: "1px solid #eee", textAlign: "center" }}>
                {renderQuestion(q)}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {q.options.map(opt => {
                  const isCorrect = opt === getAnswer(q);
                  const isChosen = opt === chosen;
                  let bg = "#fff", border = "1.5px solid #eee", col = "#333";
                  if (chosen) {
                    if (isCorrect) { bg = "#E8F5E9"; border = "2px solid #2E7D32"; col = "#1B5E20"; }
                    else if (isChosen) { bg = "#FFEBEE"; border = "2px solid #C62828"; col = "#B71C1C"; }
                    else { col = "#ccc"; }
                  }
                  return (
                    <button key={opt} onClick={() => handleAnswer(opt)} style={{ padding: "14px 8px", borderRadius: 10, border, background: bg, color: col, fontSize: 12, fontWeight: 700, cursor: chosen ? "default" : "pointer", transition: "all 0.15s", textAlign: "center", lineHeight: 1.3 }}>
                      {chosen && isCorrect ? "✓ " : chosen && isChosen && !isCorrect ? "✗ " : ""}{opt}
                    </button>
                  );
                })}
              </div>

              {chosen && (
                <button onClick={handleNext} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: color, color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                  {qIdx + 1 >= questions.length ? "See Results →" : "Next →"}
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <DarkBox>
            <div style={{ fontSize: 44, marginBottom: 10 }}>{score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "👍" : "📖"}</div>
            <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>{score}/{questions.length}</div>
            <div style={{ fontSize: 13, color: "#aaa" }}>
              {score >= questions.length * 0.8 ? msgs.high : score >= questions.length * 0.5 ? msgs.mid : msgs.low}
            </div>
          </DarkBox>
          <button onClick={reset} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: color, color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>🔄 Try Again</button>
        </div>
      )}
    </div>
  );
}
