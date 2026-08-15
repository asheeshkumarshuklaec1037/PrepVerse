import React from 'react';
import type { SubjectData, MockPaper } from '../../data/mockTestData';
import { Play, Calendar, Zap } from 'lucide-react';

interface MockWorkspaceProps {
  currentModeTitle: string;
  subjects: SubjectData[];
  selectedSubject: string;
  selectedTopic: string;
  selectedModule: string;
  onSubjectChange: (val: string) => void;
  onTopicChange: (val: string) => void;
  onModuleChange: (val: string) => void;
  papers: MockPaper[];
  onSelectPaper: (paper: MockPaper) => void;
  onSchedulePaper: (paper: MockPaper) => void;
  modeNum: number;
}

export const MockWorkspace: React.FC<MockWorkspaceProps> = ({
  currentModeTitle,
  subjects,
  selectedSubject,
  selectedTopic,
  selectedModule,
  onSubjectChange,
  onTopicChange,
  onModuleChange,
  papers,
  onSelectPaper,
  onSchedulePaper,
  modeNum,
}) => {
  const selectedSubObj = subjects.find((s) => s.name === selectedSubject);
  const availableTopics = selectedSubObj ? selectedSubObj.topics : [];
  const selectedTopObj = availableTopics.find((t) => t.name === selectedTopic);
  const availableModules = selectedTopObj ? selectedTopObj.modules : [];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0f111a]/95 backdrop-blur-2xl border border-[#8b7cf0]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(108,92,231,0.2)] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">{currentModeTitle}</h2>
          <p className="text-xs text-gray-400 mt-0.5">Select parameters below to dynamically render matching test papers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Setup Parameters Panel */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#141624] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#8b7cf0]" />
            <span>Setup Parameters</span>
          </h3>

          {/* Subject Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-400 font-semibold uppercase">Select Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="w-full bg-[#1c1e2d] border border-white/15 text-white text-xs p-3 rounded-xl font-semibold cursor-pointer outline-none focus:border-[#8b7cf0]"
            >
              <option value="">-- Choose Subject --</option>
              {subjects.map((s, idx) => (
                <option key={idx} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector (if mode != 3) */}
          {modeNum !== 3 && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 font-semibold uppercase">Select Topic</label>
              <select
                value={selectedTopic}
                disabled={!selectedSubject}
                onChange={(e) => onTopicChange(e.target.value)}
                className="w-full bg-[#1c1e2d] border border-white/15 text-white text-xs p-3 rounded-xl font-semibold cursor-pointer outline-none focus:border-[#8b7cf0] disabled:opacity-40"
              >
                <option value="">-- Choose Topic --</option>
                {availableTopics.map((t, idx) => (
                  <option key={idx} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Module Selector (if mode == 1) */}
          {modeNum === 1 && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 font-semibold uppercase">Select Module</label>
              <select
                value={selectedModule}
                disabled={!selectedTopic}
                onChange={(e) => onModuleChange(e.target.value)}
                className="w-full bg-[#1c1e2d] border border-white/15 text-white text-xs p-3 rounded-xl font-semibold cursor-pointer outline-none focus:border-[#8b7cf0] disabled:opacity-40"
              >
                <option value="">-- Choose Module --</option>
                {availableModules.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Papers Grid Panel */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Available Mock Tests</h3>
            <span className="text-xs font-mono text-[#2af598] font-bold">3 Mock Papers Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="p-5 rounded-2xl bg-[#141624] border border-white/10 flex flex-col justify-between hover:border-[#8b7cf0] transition-all prepverse-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white">{paper.name}</h4>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        paper.difficulty === 'Easy'
                          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                          : paper.difficulty === 'Medium'
                          ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                          : 'border-rose-500/30 text-rose-400 bg-rose-500/10'
                      }`}
                    >
                      {paper.difficulty}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-gray-400 space-y-1 mb-4">
                    <div>Duration: <strong className="text-white">{paper.duration}</strong></div>
                    <div>Questions: <strong className="text-white">{paper.questions}</strong></div>
                    <div>Reward: <strong className="text-purple-400">{paper.xp}</strong></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => onSelectPaper(paper)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#6c5ce7] hover:bg-[#8b7cf0] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{paper.isAttempted ? 'Re-take Test' : 'Select Test'}</span>
                  </button>

                  <button
                    onClick={() => onSchedulePaper(paper)}
                    title="Schedule Test"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
