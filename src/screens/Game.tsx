import { useCallback, useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGameStore } from "../store/useGameStore";
import { QuestionRenderer } from "../components/QuestionRenderer";
import { ScoreFeedback } from "../components/ScoreFeedback";
import { Timer, useElapsedTime } from "../components/Timer";
import { formatScore } from "../utils/scoring";

interface Props {
  onFinish: () => void;
  onQuit: () => void;
}

interface AnswerParams {
  selectedIndex?: number;
  selectedBool?: boolean;
  selectedText?: string;
  hintsUsed?: number;
  selectedOrder?: number[];
}

const ElapsedReporter = memo(function ElapsedReporter({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (n: number) => void;
}) {
  const elapsed = useElapsedTime(active);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    onChangeRef.current(elapsed);
  }, [elapsed]);
  return null;
});

export function Game({ onFinish, onQuit }: Props) {
  const game = useGameStore((s) => s.game);
  const lastAnswerCorrect = useGameStore((s) => s.lastAnswerCorrect);
  const lastAnswerPoints = useGameStore((s) => s.lastAnswerPoints);
  const answerQuestion = useGameStore((s) => s.answerQuestion);
  const nextQuestion = useGameStore((s) => s.nextQuestion);
  const finishGame = useGameStore((s) => s.finishGame);
  const clearFeedback = useGameStore((s) => s.clearFeedback);

  const currentQuestion = game
    ? (game.questions[game.currentIndex] ?? null)
    : null;
  const progressCurrent = game ? game.currentIndex + 1 : 0;
  const progressTotal = game ? game.questions.length : 0;
  const isLast = game ? game.currentIndex === game.questions.length - 1 : false;
  const currentScore = game?.score ?? 0;
  const currentStreak = game?.streak ?? 0;

  const isAnswering = lastAnswerCorrect === null && !!currentQuestion;

  const elapsedRef = useRef(0);
  const handleElapsed = useCallback((n: number) => {
    elapsedRef.current = n;
  }, []);

  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    setTimerKey((k) => k + 1);
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (!game) onFinish();
  }, [game, onFinish]);

  if (!game || !currentQuestion) return null;

  const timeLimit = currentQuestion.timeLimit ?? 30;

  const handleAnswer = (params: AnswerParams) => {
    answerQuestion({ ...params, timeSpent: elapsedRef.current });
  };

  const handleNext = async () => {
    clearFeedback();
    if (isLast) {
      await finishGame();
      onFinish();
    } else {
      nextQuestion();
    }
  };

  const handleTimeUp = useCallback(() => {
    if (lastAnswerCorrect === null) {
      answerQuestion({ timeSpent: timeLimit });
    }
  }, [lastAnswerCorrect, answerQuestion, timeLimit]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <ElapsedReporter active={isAnswering} onChange={handleElapsed} />

      {/* ============ HEADER ============ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 sm:p-5 max-w-3xl mx-auto w-full"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Flecha de retorno mejorada (H-VIS-05) */}
          <button
            onClick={onQuit}
            className="flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-noche-800/50 border border-noche-700/50 text-slate-300 hover:text-white hover:bg-noche-700/50 transition-colors group"
            aria-label="Salir de la partida"
          >
            <span className="text-xl leading-none group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span className="hidden sm:inline text-sm font-semibold">
              Salir
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <AnimatePresence>
              {currentStreak >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="flex items-center gap-1 bg-fuego-500/15 border border-fuego-500/40 rounded-full px-2.5 py-1"
                >
                  <span className="text-sm">🔥</span>
                  <span className="text-xs font-black text-fuego-400 tabular-nums">
                    {currentStreak}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-noche-800/70 backdrop-blur-sm border border-noche-700/60 rounded-full px-3 py-1">
              <span className="text-xs text-slate-500 font-bold mr-1.5">
                PTS
              </span>
              <span className="text-sm font-black text-alba-400 tabular-nums">
                {formatScore(currentScore)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: progressTotal }).map((_, i) => {
            const isDone = i < progressCurrent - 1;
            const isCurrent = i === progressCurrent - 1;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  flex: isCurrent ? 3 : 1,
                  opacity: isDone ? 0.4 : isCurrent ? 1 : 0.25,
                }}
                transition={{ duration: 0.3 }}
                className={[
                  "h-1.5 rounded-full",
                  isDone
                    ? "bg-alba-500"
                    : isCurrent
                      ? "bg-gradient-to-r from-alba-400 to-alba-500"
                      : "bg-noche-700",
                ].join(" ")}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-600 font-black">
          <span>
            Pregunta {progressCurrent} de {progressTotal}
          </span>
          {currentQuestion.difficulty && (
            <span
              className={[
                currentQuestion.difficulty === "facil"
                  ? "text-vida-400"
                  : currentQuestion.difficulty === "medio"
                    ? "text-alba-400"
                    : "text-alerta-400",
              ].join(" ")}
            >
              {currentQuestion.difficulty}
            </span>
          )}
        </div>
      </motion.div>

      {/* ============ PREGUNTA ============ */}
      <div className="flex-1 flex items-center justify-center px-4 pb-40 sm:pb-48">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={handleAnswer}
                disabled={lastAnswerCorrect !== null}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ============ TIMER FLOATING ============ */}
      {lastAnswerCorrect === null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex items-center gap-3 bg-noche-800/90 backdrop-blur-md border border-noche-700/60 rounded-full px-4 py-2 shadow-2xl shadow-black/50">
            <Timer
              key={timerKey}
              seconds={timeLimit}
              onTimeUp={handleTimeUp}
              size="sm"
            />
            <div className="pr-2">
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black">
                Tiempo
              </p>
              <p className="text-xs text-slate-400 font-medium">
                Responde pronto para bonus
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ FEEDBACK MODAL ============ */}
      {lastAnswerCorrect !== null && (
        <ScoreFeedback
          correct={lastAnswerCorrect}
          points={lastAnswerPoints}
          question={currentQuestion}
          isLastQuestion={isLast}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
