import React, { useState, useEffect } from 'react';
import type { CatalogTestItem } from './AllTestsPage';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface MockTestSessionPageProps {
  test: CatalogTestItem | null;
  onExitSession: () => void;
}

export interface QuestionData {
  id: number;
  question: string;
  options: { key: string; label: string }[];
  correctKey: string;
  explanation: string;
}

const mockQuestionsSample: QuestionData[] = [
  {
    id: 1,
    question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    options: [
      { key: 'A', label: 'His own' },
      { key: 'B', label: "His son's" },
      { key: 'C', label: "His father's" },
      { key: 'D', label: "His nephew's" },
    ],
    correctKey: 'B',
    explanation: "Since the speaker has no brothers or sisters, 'my father's son' must be himself. Thus, 'that man's father is myself', meaning the photograph is of his son.",
  },
  {
    id: 2,
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: [
      { key: 'A', label: '120 metres' },
      { key: 'B', label: '180 metres' },
      { key: 'C', label: '150 metres' },
      { key: 'D', label: '320 metres' },
    ],
    correctKey: 'C',
    explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length of train = Speed * Time = (50/3) * 9 = 150 metres.",
  },
  {
    id: 3,
    question: "If A is B's sister, C is B's mother, D is C's father, and E is D's mother, how is A related to D?",
    options: [
      { key: 'A', label: 'Grandfather' },
      { key: 'B', label: 'Granddaughter' },
      { key: 'C', label: 'Daughter' },
      { key: 'D', label: 'Grandmother' },
    ],
    correctKey: 'B',
    explanation: "A is sister of B, B is child of C. So A is daughter of C. C is daughter of D. Therefore, A is the granddaughter of D.",
  },
  {
    id: 4,
    question: "Find the missing number in the sequence: 2, 6, 12, 20, 30, 42, ?",
    options: [
      { key: 'A', label: '52' },
      { key: 'B', label: '56' },
      { key: 'C', label: '60' },
      { key: 'D', label: '64' },
    ],
    correctKey: 'B',
    explanation: "Differences between consecutive numbers are +4, +6, +8, +10, +12. Next difference is +14. So, 42 + 14 = 56.",
  },
  {
    id: 5,
    question: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
    options: [
      { key: 'A', label: 'Rs. 650' },
      { key: 'B', label: 'Rs. 690' },
      { key: 'C', label: 'Rs. 698' },
      { key: 'D', label: 'Rs. 700' },
    ],
    correctKey: 'C',
    explanation: "S.I. for 1 year = 854 - 815 = Rs. 39. S.I. for 3 years = 39 * 3 = Rs. 117. Principal sum = 815 - 117 = Rs. 698.",
  },
  {
    id: 6,
    question: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:",
    options: [
      { key: 'A', label: '27' },
      { key: 'B', label: '33' },
      { key: 'C', label: '49' },
      { key: 'D', label: '55' },
    ],
    correctKey: 'B',
    explanation: "Let numbers be 3x and 5x. (3x-9)/(5x-9) = 12/23 => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33.",
  },
  {
    id: 7,
    question: "Which of the following is not a prime number?",
    options: [
      { key: 'A', label: '31' },
      { key: 'B', label: '61' },
      { key: 'C', label: '71' },
      { key: 'D', label: '91' },
    ],
    correctKey: 'D',
    explanation: "91 is divisible by 7 and 13 (91 = 7 * 13), so it is not a prime number.",
  },
  {
    id: 8,
    question: "Complete the series: SCD, TEF, UGH, ____, WKL",
    options: [
      { key: 'A', label: 'CMN' },
      { key: 'B', label: 'UJI' },
      { key: 'C', label: 'VIJ' },
      { key: 'D', label: 'IJT' },
    ],
    correctKey: 'C',
    explanation: "First letters: S, T, U, V, W. Second & third letters: CD, EF, GH, IJ, KL. Missing term is VIJ.",
  },
  {
    id: 9,
    question: "If CLOCK is coded as KCOLC, how is STEPS coded in that code?",
    options: [
      { key: 'A', label: 'SPETS' },
      { key: 'B', label: 'SPEST' },
      { key: 'C', label: 'STPES' },
      { key: 'D', label: 'SEPTS' },
    ],
    correctKey: 'A',
    explanation: "The word is simply written in reverse order. Reversing STEPS gives SPETS.",
  },
  {
    id: 10,
    question: "In how many different ways can the letters of the word 'LEADING' be arranged so that the vowels always come together?",
    options: [
      { key: 'A', label: '360' },
      { key: 'B', label: '480' },
      { key: 'C', label: '720' },
      { key: 'D', label: '5040' },
    ],
    correctKey: 'C',
    explanation: "Vowels: E, A, I (3 vowels). Consonants: L, D, N, G (4 consonants). Treating 3 vowels as 1 unit gives 5 items (5! = 120). 3 vowels can be arranged among themselves in 3! = 6 ways. Total = 120 * 6 = 720.",
  },
];

export const MockTestSessionPage: React.FC<MockTestSessionPageProps> = ({
  test,
  onExitSession,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });

  const [timeLeftSeconds, setTimeLeftSeconds] = useState(880); // 14:40 default matching screenshot
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showScorecardModal, setShowScorecardModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (key: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQIndex]: key }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQIndex];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
  };

  const goToQuestion = (idx: number) => {
    if (idx >= 0 && idx < mockQuestionsSample.length) {
      setCurrentQIndex(idx);
      setVisited((prev) => ({ ...prev, [idx]: true }));
    }
  };

  const handleSaveAndNext = () => {
    if (currentQIndex < mockQuestionsSample.length - 1) {
      goToQuestion(currentQIndex + 1);
    }
  };

  // Stats calculation
  const totalQuestionsCount = mockQuestionsSample.length;
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const visitedCount = Object.keys(visited).length;
  const unvisitedCount = Math.max(0, totalQuestionsCount - visitedCount);

  // Score calculation
  const calculateScore = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;

    mockQuestionsSample.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans) {
        if (ans === q.correctKey) {
          score += 4;
          correct += 1;
        } else {
          score -= 1;
          incorrect += 1;
        }
      }
    });

    return { score, correct, incorrect, maxScore: totalQuestionsCount * 4 };
  };

  const currentQ = mockQuestionsSample[currentQIndex];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col font-sans overflow-hidden select-none animate-page-fade-in">
      {/* 0. Ambient Background Glows matching Django mock_test_session.html lines 641-659 */}
      <div className="fixed -top-[100px] -right-[100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(138,43,226,0.15)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />
      <div className="fixed -bottom-[100px] -left-[100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,0,128,0.15)_0%,transparent_70%)] blur-[80px] pointer-events-none z-0" />

      {/* 1. Header Bar (1:1 Django & Screenshot Match) */}
      <div className="h-[70px] bg-white/[0.02] border-b border-white/5 backdrop-blur-2xl flex items-center justify-between px-10 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <h2 className="text-[1.2rem] font-extrabold text-white tracking-tight font-display m-0">
            {test?.mode || 'Module Blitz'} ({test?.name || 'Number Systems — Blitz 02'})
          </h2>
          <span className="text-[0.7rem] font-bold uppercase tracking-wider bg-[#2af598]/10 text-[#2af598] border border-[#2af598]/20 px-2.5 py-1 rounded-full">
            {test?.subject || 'APTITUDE MASTERY'}
          </span>
        </div>

        {/* Live Timer Widget */}
        <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white font-mono font-bold text-[1.05rem]">
          <Clock className="w-4 h-4 text-[#2af598]" />
          <span>{formatTimer(timeLeftSeconds)}</span>
        </div>

        {/* Submit Test Pill Button */}
        <div className="header-actions">
          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2af598] to-[#009efd] hover:shadow-[0_5px_15px_rgba(42,245,152,0.4)] text-black font-extrabold text-[0.85rem] uppercase tracking-wider transition-all cursor-pointer hover:-translate-y-0.5 border-none"
          >
            SUBMIT TEST
          </button>
        </div>
      </div>

      {/* 2. Main Arena 2-Column Grid Layout (1:1 Django & Screenshot Match) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] overflow-hidden relative z-10">
        {/* Left Workspace Panel */}
        <div className="p-10 lg:p-14 overflow-y-auto flex flex-col justify-between border-r border-white/5 relative">
          <div className="max-w-[900px] w-full mx-auto space-y-8">
            {/* Question Meta Row */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[1.1rem] font-bold text-white/40">
                Question <strong className="text-white font-bold">{currentQIndex + 1}</strong> of {totalQuestionsCount}
              </span>
              <span className="text-[0.8rem] font-semibold px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-white/60">
                Single Choice (Marks: <b className="text-[#2af598]">+4</b>, Negative: <b className="text-rose-400">-1</b>)
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-[1.3rem] font-semibold text-white leading-[1.6] mb-8 font-sans">
              {currentQ.id}. {currentQ.question}
            </h3>

            {/* Options Radio List */}
            <div className="flex flex-col gap-3.5 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQIndex] === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`p-4 sm:px-6 sm:py-4.5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#2af598]/[0.03] border-[#2af598] text-white shadow-[0_0_20px_rgba(42,245,152,0.05)]'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15 text-gray-300'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-[0.85rem] shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#2af598] text-black border-[#2af598] shadow-[0_0_15px_rgba(42,245,152,0.3)]'
                          : 'bg-white/[0.03] border-white/10 text-white/60'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <span className={`text-[1rem] transition-colors ${isSelected ? 'text-white font-medium' : 'text-white/80'}`}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Bottom Action Row (1:1 Django & Screenshot Match) */}
          <div className="max-w-[900px] w-full mx-auto pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleClearResponse}
                className="px-6 py-3 rounded-xl bg-rose-500/[0.05] border border-rose-500/15 text-rose-400 hover:bg-rose-500 hover:text-white font-bold text-[0.85rem] uppercase transition-all duration-300 cursor-pointer shadow-none hover:shadow-[0_5px_15px_rgba(255,71,87,0.2)]"
              >
                CLEAR RESPONSE
              </button>
              <button
                onClick={handleToggleMarkReview}
                className={`px-6 py-3 rounded-xl font-bold text-[0.85rem] uppercase transition-all duration-300 cursor-pointer border ${
                  markedForReview[currentQIndex]
                    ? 'bg-[#fccb90] text-black border-[#fccb90] shadow-[0_5px_15px_rgba(252,203,144,0.2)]'
                    : 'bg-[#fccb90]/[0.05] border-[#fccb90]/15 text-[#fccb90] hover:bg-[#fccb90] hover:text-black'
                }`}
              >
                MARK FOR REVIEW
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goToQuestion(currentQIndex - 1)}
                disabled={currentQIndex === 0}
                className="px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white font-bold text-[0.85rem] uppercase transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              <button
                onClick={handleSaveAndNext}
                className="px-6 py-3 rounded-xl bg-[#2af598] hover:bg-[#22d380] text-black font-extrabold text-[0.85rem] uppercase transition-all cursor-pointer shadow-[0_5px_15px_rgba(42,245,152,0.2)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(42,245,152,0.3)] border-none"
              >
                SAVE & NEXT
              </button>
              <button
                onClick={() => goToQuestion(currentQIndex + 1)}
                disabled={currentQIndex === totalQuestionsCount - 1}
                className="px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white font-bold text-[0.85rem] uppercase transition-all flex items-center gap-1.5 cursor-pointer"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Question Palette (1:1 Django & Screenshot Match) */}
        <div className="p-8 bg-[#0a0f0c]/15 backdrop-blur-[80px] saturate-200 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-white tracking-tight">Question Palette</h3>

            {/* Question 1 to 10 Cell Grid */}
            <div className="grid grid-cols-5 gap-3 font-mono">
              {mockQuestionsSample.map((q, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAns = Boolean(userAnswers[idx]);
                const isMrk = Boolean(markedForReview[idx]);
                const isVis = Boolean(visited[idx]);

                let cellStyle = 'bg-white/[0.03] border-white/10 text-white/50 hover:border-white/30 hover:text-white';
                if (isAns) cellStyle = 'bg-[#2af598] text-black font-extrabold border-[#2af598] shadow-[0_0_10px_rgba(42,245,152,0.15)]';
                else if (isMrk) cellStyle = 'bg-[#fccb90] text-black font-extrabold border-[#fccb90] shadow-[0_0_10px_rgba(252,203,144,0.2)]';
                else if (isVis) cellStyle = 'bg-white/10 text-white border-white/15';

                if (isCurrent) cellStyle += ' border-white text-white font-bold ring-1 ring-white';

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`h-11 rounded-xl border text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${cellStyle}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/5">
            {/* Status Legends Grid */}
            <div className="grid grid-cols-2 gap-3.5 text-xs border-t border-b border-white/5 py-4">
              <div className="flex items-center gap-2.5 text-white/60">
                <span className="w-3 h-3 rounded bg-[#2af598]" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <span className="w-3 h-3 rounded bg-[#fccb90]" />
                <span>Marked ({markedCount})</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <span className="w-3 h-3 rounded bg-white/10" />
                <span>Visited ({visitedCount})</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60">
                <span className="w-3 h-3 rounded bg-white/[0.03] border border-white/10" />
                <span>Unvisited ({unvisitedCount})</span>
              </div>
            </div>

            {/* Sidebar Finish & Submit Button */}
            <button
              onClick={() => setShowSubmitConfirmModal(true)}
              className="w-full py-4 rounded-2xl bg-white/[0.02] hover:bg-[#2af598] hover:text-black border border-white/10 hover:border-[#2af598] text-white font-bold text-[0.85rem] uppercase tracking-wider transition-all duration-300 cursor-pointer hover:shadow-[0_10px_25px_rgba(42,245,152,0.2)]"
            >
              FINISH & SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-[15px] flex items-center justify-center p-6 transition-all duration-300">
          <div className="bg-[#0f0f0f]/70 backdrop-blur-[35px] border border-white/10 rounded-[30px] p-10 max-w-[600px] w-full space-y-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] text-center animate-page-fade-in">
            <h3 className="text-[1.8rem] font-extrabold text-white mb-1">Submit Test</h3>
            <p className="text-xs text-gray-400">Ready to lock responses? Review your stats below.</p>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <span className="text-white/50 block text-[0.75rem] uppercase mb-1">ANSWERED</span>
                <strong className="text-[#2af598] text-xl font-bold">{answeredCount}</strong>
              </div>
              <div>
                <span className="text-white/50 block text-[0.75rem] uppercase mb-1">MARKED</span>
                <strong className="text-[#fccb90] text-xl font-bold">{markedCount}</strong>
              </div>
              <div>
                <span className="text-white/50 block text-[0.75rem] uppercase mb-1">UNVISITED</span>
                <strong className="text-white text-xl font-bold">{unvisitedCount}</strong>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="flex-1 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-bold text-[0.9rem] uppercase tracking-wider transition-all cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  setShowScorecardModal(true);
                }}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#2af598] to-[#009efd] text-black font-extrabold text-[0.9rem] uppercase tracking-wider transition-all cursor-pointer shadow-[0_5px_15px_rgba(42,245,152,0.3)] hover:shadow-[0_8px_25px_rgba(42,245,152,0.5)] border-none"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Performance Scorecard Modal with Single Unified Modal Scroll */}
      {showScorecardModal && (
        <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-[15px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0f0f0f]/80 backdrop-blur-[35px] border border-white/10 rounded-[30px] p-6 sm:p-10 max-w-[850px] w-full space-y-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] my-auto max-h-[88vh] overflow-y-auto animate-page-fade-in">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-extrabold text-white">Test Performance Report</h3>
              <p className="text-xs text-gray-400">Mock test completed successfully. Check your detailed scorecard.</p>
            </div>

            {(() => {
              const res = calculateScore();
              return (
                <div className="space-y-6">
                  {/* Score Banner with Modern Animated Pie Chart */}
                  {(() => {
                    const totalQ = totalQuestionsCount;
                    const correctPct = (res.correct / totalQ) * 100;
                    const wrongPct = (res.incorrect / totalQ) * 100;
                    const unansPct = (unvisitedCount / totalQ) * 100;

                    // Circumference for r=36 is ~226.19
                    const C = 226.19;
                    const correctStroke = (correctPct / 100) * C;
                    const wrongStroke = (wrongPct / 100) * C;
                    const unansStroke = (unansPct / 100) * C;

                    const correctOffset = 0;
                    const wrongOffset = -correctStroke;
                    const unansOffset = -(correctStroke + wrongStroke);

                    return (
                      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2af598]/[0.08] via-white/[0.02] to-blue-500/[0.05] border border-[#2af598]/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                        {/* Left Score Text */}
                        <div className="space-y-1 text-center sm:text-left">
                          <h4 className="text-sm font-extrabold text-white/50 uppercase tracking-wider">Total Score Achieved</h4>
                          <h1 className="text-4xl sm:text-5xl font-black text-[#2af598] font-mono leading-tight">
                            {res.score} <span className="text-xl sm:text-2xl text-white/40">/ {res.maxScore}</span>
                          </h1>
                          <p className="text-xs text-gray-400 font-medium pt-1">
                            Breakdown: <span className="text-[#2af598] font-bold">{res.correct} Correct</span> · <span className="text-rose-400 font-bold">{res.incorrect} Incorrect</span>
                          </p>
                        </div>

                        {/* Right Modern Animated Donut Pie Chart */}
                        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                            {/* Background Track */}
                            <circle
                              cx="45"
                              cy="45"
                              r="36"
                              className="stroke-white/10"
                              strokeWidth="8"
                              fill="transparent"
                            />

                            {/* Unanswered Segment (Grey) */}
                            {unansPct > 0 && (
                              <circle
                                cx="45"
                                cy="45"
                                r="36"
                                className="stroke-white/30 transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                strokeDasharray={`${unansStroke} ${C}`}
                                strokeDashoffset={unansOffset}
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            )}

                            {/* Incorrect Segment (Rose Red) */}
                            {wrongPct > 0 && (
                              <circle
                                cx="45"
                                cy="45"
                                r="36"
                                className="stroke-rose-400 transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                strokeDasharray={`${wrongStroke} ${C}`}
                                strokeDashoffset={wrongOffset}
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            )}

                            {/* Correct Segment (Neon Green) */}
                            {correctPct > 0 && (
                              <circle
                                cx="45"
                                cy="45"
                                r="36"
                                className="stroke-[#2af598] transition-all duration-1000 ease-out"
                                strokeWidth="8"
                                strokeDasharray={`${correctStroke} ${C}`}
                                strokeDashoffset={correctOffset}
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            )}
                          </svg>

                          {/* Center Donut Text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-black font-mono text-white">
                              {answeredCount > 0 ? Math.round((res.correct / totalQuestionsCount) * 100) : 0}%
                            </span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">SOLVED</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Summary Stats Row */}
                  <div className="grid grid-cols-3 gap-4 text-center text-xs">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <span className="text-white/50 block text-[0.75rem] uppercase mb-1">Correct Answers</span>
                      <b className="text-[#2af598] text-xl font-bold">{res.correct}</b>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <span className="text-white/50 block text-[0.75rem] uppercase mb-1">Incorrect Answers</span>
                      <b className="text-rose-400 text-xl font-bold">{res.incorrect}</b>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <span className="text-white/50 block text-[0.75rem] uppercase mb-1">Accuracy Rate</span>
                      <b className="text-blue-400 text-xl font-bold">
                        {answeredCount > 0 ? Math.round((res.correct / answeredCount) * 100) : 0}%
                      </b>
                    </div>
                  </div>

                  {/* Detailed Solutions & Explanations Unified List (No Separate Inner Scrollbar) */}
                  <div className="space-y-4 pt-4 border-t border-white/10 text-left">
                    <h4 className="text-[1.1rem] font-extrabold text-white">Solutions & Explanations</h4>
                    <div className="space-y-4">
                      {mockQuestionsSample.map((q, idx) => {
                        const userAnsKey = userAnswers[idx];
                        const isUnanswered = !userAnsKey;
                        const isCorrect = userAnsKey === q.correctKey;

                        const userOpt = q.options.find((o) => o.key === userAnsKey);
                        const correctOpt = q.options.find((o) => o.key === q.correctKey);

                        const borderLeftColor = isUnanswered
                          ? 'border-l-white/20'
                          : isCorrect
                          ? 'border-l-[#2af598]'
                          : 'border-l-rose-500';

                        return (
                          <div
                            key={q.id}
                            className={`p-5 rounded-2xl bg-white/[0.01] border border-white/5 border-l-4 ${borderLeftColor} space-y-2 text-xs`}
                          >
                            <div className="flex items-center justify-between font-bold text-sm">
                              <span className="text-white">Question {idx + 1}</span>
                              <span
                                className={`text-xs ${
                                  isUnanswered
                                    ? 'text-white/40'
                                    : isCorrect
                                    ? 'text-[#2af598]'
                                    : 'text-rose-400'
                                }`}
                              >
                                {isUnanswered
                                  ? 'Unanswered (0 Marks)'
                                  : isCorrect
                                  ? 'Correct (+4 Marks)'
                                  : 'Incorrect (-1 Mark)'}
                              </span>
                            </div>

                            <p className="text-white/80 font-medium leading-relaxed">{q.question}</p>

                            <div className="p-3 rounded-xl bg-black/40 space-y-1 font-mono text-[11px] leading-relaxed">
                              <div>
                                <span className="text-gray-400">Your Answer: </span>
                                <strong className={isCorrect ? 'text-[#2af598]' : isUnanswered ? 'text-gray-400' : 'text-rose-400'}>
                                  {isUnanswered ? 'None' : `${userOpt?.key}) ${userOpt?.label}`}
                                </strong>
                              </div>
                              <div>
                                <span className="text-gray-400">Correct Answer: </span>
                                <strong className="text-[#2af598]">{correctOpt?.key}) {correctOpt?.label}</strong>
                              </div>
                              <div className="pt-2 text-gray-300 border-t border-white/5 font-sans font-normal text-xs text-emerald-400/90">
                                <strong className="text-white block mb-0.5">Explanation:</strong>
                                {q.explanation}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={onExitSession}
              className="w-full py-4 rounded-2xl bg-white text-black font-extrabold text-[0.9rem] uppercase tracking-wider transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2af598] hover:to-[#009efd] hover:shadow-[0_8px_25px_rgba(42,245,152,0.4)] cursor-pointer border-none"
            >
              RETURN TO DIRECTORY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
