import { useState } from 'react';
import {
  Atom, FlaskConical, BookOpen, Play, FileText, ArrowLeft,
  ChevronRight, Star, Zap, CheckCircle, Download, X, Clock,
  GraduationCap, Trophy, BarChart3, Target,
} from 'lucide-react';
import { jeeData, neetData, JNChapter } from '../data/jeeNeetData';

type Exam = 'jee' | 'neet';
type ResourceTab = 'notes' | 'lectures' | 'sample-papers';

const JEE_SUBJECTS = ['Physics', 'Chemistry', 'Mathematics'];
const NEET_SUBJECTS = ['Physics', 'Chemistry', 'Biology'];

const subjectConfig: Record<string, { icon: string; gradient: string; light: string; text: string }> = {
  Physics: { icon: '⚡', gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'text-blue-700' },
  Chemistry: { icon: '🧪', gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', text: 'text-purple-700' },
  Mathematics: { icon: '📐', gradient: 'from-indigo-500 to-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-700' },
  Biology: { icon: '🧬', gradient: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700' },
};

const samplePaperTypes = ['Full Syllabus', 'Chapter-wise', 'Unit Test', 'Mock Test'];

export function JeeNeetPage() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedClass, setSelectedClass] = useState<11 | 12 | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<JNChapter | null>(null);
  const [activeTab, setActiveTab] = useState<ResourceTab>('notes');

  const subjects = selectedExam === 'jee' ? JEE_SUBJECTS : NEET_SUBJECTS;

  const chapters: JNChapter[] =
    selectedExam && selectedClass && selectedSubject
      ? (selectedExam === 'jee' ? jeeData : neetData)[selectedClass]?.[selectedSubject] ?? []
      : [];

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedChapter(null);
  };

  const handleClassSelect = (cls: 11 | 12) => {
    setSelectedClass(cls);
    setSelectedSubject(null);
    setSelectedChapter(null);
  };

  const handleSubjectSelect = (sub: string) => {
    setSelectedSubject(sub);
    setSelectedChapter(null);
  };

  const handleChapterSelect = (ch: JNChapter) => {
    setSelectedChapter(ch);
    setActiveTab('notes');
  };

  const goBack = () => {
    if (selectedChapter) { setSelectedChapter(null); return; }
    if (selectedSubject) { setSelectedSubject(null); return; }
    if (selectedClass) { setSelectedClass(null); return; }
    setSelectedExam(null);
  };

  const examConfig = {
    jee: {
      label: 'JEE',
      full: 'JEE Main & Advanced',
      tagline: 'Engineering Entrance Preparation',
      gradient: 'from-indigo-600 to-blue-600',
      gradientLight: 'from-indigo-50 to-blue-50',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-700',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      ring: 'ring-indigo-400',
      subjects: 'Physics · Chemistry · Mathematics',
      icon: Atom,
    },
    neet: {
      label: 'NEET',
      full: 'NEET UG',
      tagline: 'Medical Entrance Preparation',
      gradient: 'from-emerald-600 to-teal-600',
      gradientLight: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      ring: 'ring-emerald-400',
      subjects: 'Physics · Chemistry · Biology',
      icon: FlaskConical,
    },
  };

  const ec = selectedExam ? examConfig[selectedExam] : null;
  const subCfg = selectedSubject ? subjectConfig[selectedSubject] : null;

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* ── BREADCRUMB ── */}
        {selectedExam && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <button onClick={() => { setSelectedExam(null); setSelectedClass(null); setSelectedSubject(null); setSelectedChapter(null); }} className="hover:text-blue-600 transition-colors font-medium">JEE/NEET</button>
            {selectedExam && <><span className="text-gray-300">›</span><button onClick={() => { setSelectedClass(null); setSelectedSubject(null); setSelectedChapter(null); }} className="hover:text-blue-600 transition-colors font-medium">{selectedExam.toUpperCase()}</button></>}
            {selectedClass && <><span className="text-gray-300">›</span><button onClick={() => { setSelectedSubject(null); setSelectedChapter(null); }} className="hover:text-blue-600 transition-colors font-medium">Class {selectedClass}</button></>}
            {selectedSubject && <><span className="text-gray-300">›</span><button onClick={() => setSelectedChapter(null)} className="hover:text-blue-600 transition-colors font-medium">{selectedSubject}</button></>}
            {selectedChapter && <><span className="text-gray-300">›</span><span className="text-blue-600 font-medium truncate max-w-[200px]">{selectedChapter.title}</span></>}
          </div>
        )}

        {/* ── LANDING: Choose JEE or NEET ── */}
        {!selectedExam && (
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
                <GraduationCap className="w-4 h-4" />
                Competitive Exam Preparation
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                JEE / NEET
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                Chapter-wise notes, video lectures, and practice papers designed specifically for engineering and medical entrance exams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
              {/* JEE Card */}
              <button
                onClick={() => handleExamSelect('jee')}
                className="group relative bg-white rounded-3xl border-2 border-indigo-100 shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 p-8 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                    <Atom className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">ENGINEERING</div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">JEE</h2>
                  <p className="text-sm font-medium text-indigo-600 mb-4">Main & Advanced</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {['Physics', 'Chemistry', 'Mathematics'].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {[{ v: '200+', l: 'Chapters' }, { v: '500+', l: 'Problems' }].map(({ v, l }) => (
                      <div key={l} className="bg-indigo-50 rounded-xl px-3 py-2 text-center">
                        <p className="text-base font-bold text-indigo-700">{v}</p>
                        <p className="text-xs text-gray-500">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Start Preparation <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* NEET Card */}
              <button
                onClick={() => handleExamSelect('neet')}
                className="group relative bg-white rounded-3xl border-2 border-emerald-100 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 p-8 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                    <FlaskConical className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">MEDICAL</div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-1">NEET</h2>
                  <p className="text-sm font-medium text-emerald-600 mb-4">UG Entrance</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {['Physics', 'Chemistry', 'Biology'].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {[{ v: '250+', l: 'Chapters' }, { v: '600+', l: 'MCQs' }].map(({ v, l }) => (
                      <div key={l} className="bg-emerald-50 rounded-xl px-3 py-2 text-center">
                        <p className="text-base font-bold text-emerald-700">{v}</p>
                        <p className="text-xs text-gray-500">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Start Preparation <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>

            {/* Features strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: BookOpen, label: 'Chapter Notes', desc: 'Concise, exam-focused' },
                { icon: Play, label: 'Video Lectures', desc: 'Topic-wise explanations' },
                { icon: FileText, label: 'Sample Papers', desc: 'Practice & mock tests' },
                { icon: Target, label: 'High Weightage', desc: 'Most-tested topics first' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CLASS + SUBJECT SELECTION ── */}
        {selectedExam && !selectedSubject && ec && (
          <div>
            <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {/* Exam Header */}
            <div className={`bg-gradient-to-r ${ec.gradient} rounded-3xl p-6 md:p-10 mb-8 text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <ec.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold">{ec.full}</h1>
                  <p className="text-white/80 text-sm mt-1">{ec.tagline}</p>
                </div>
              </div>
            </div>

            {/* Class Selector */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Select Class</h2>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                {([11, 12] as const).map((cls) => (
                  <button
                    key={cls}
                    onClick={() => handleClassSelect(cls)}
                    className={`py-5 rounded-2xl font-bold text-xl border-2 transition-all shadow-sm hover:shadow-md ${
                      selectedClass === cls
                        ? `bg-gradient-to-br ${ec.gradient} text-white border-transparent shadow-lg`
                        : `bg-white text-gray-700 ${ec.border} hover:border-opacity-100`
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector */}
            {selectedClass && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Select Subject <span className="text-sm font-normal text-gray-400">— Class {selectedClass}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {subjects.map((sub) => {
                    const cfg = subjectConfig[sub];
                    return (
                      <button
                        key={sub}
                        onClick={() => handleSubjectSelect(sub)}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-6 text-left group transition-all hover:scale-[1.02]"
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${cfg.gradient} rounded-2xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform shadow-md`}>
                          {cfg.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{sub}</h3>
                        <p className="text-xs text-gray-400 mb-3">
                          {((selectedExam === 'jee' ? jeeData : neetData)[selectedClass]?.[sub] ?? []).length} chapters
                        </p>
                        <div className={`flex items-center gap-1 ${cfg.text} text-sm font-semibold group-hover:translate-x-1 transition-transform`}>
                          Explore <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CHAPTER LIST + RESOURCE VIEW ── */}
        {selectedExam && selectedSubject && ec && subCfg && (
          <div>
            <button onClick={goBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Subjects
            </button>

            {/* Subject header strip */}
            <div className={`bg-gradient-to-r ${subCfg.gradient} rounded-2xl p-4 md:p-6 mb-6 text-white flex items-center gap-4`}>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">{subCfg.icon}</div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white/80 text-sm">{ec.full}</span>
                  <span className="text-white/50">·</span>
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Class {selectedClass}</span>
                </div>
                <h2 className="text-2xl font-extrabold">{selectedSubject}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Chapter List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden sticky top-20">
                  <div className={`bg-gradient-to-r ${subCfg.gradient} text-white p-4`}>
                    <h3 className="font-bold flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4" /> {chapters.length} Chapters
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[70vh] overflow-y-auto">
                    {chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => handleChapterSelect(ch)}
                        className={`w-full text-left p-3.5 hover:bg-gray-50 transition-colors ${
                          selectedChapter?.id === ch.id ? `${subCfg.light} border-l-4 border-current ${subCfg.text}` : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            selectedChapter?.id === ch.id
                              ? `bg-gradient-to-br ${subCfg.gradient} text-white`
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {idx + 1}
                          </span>
                          <p className="text-sm font-medium text-gray-800 leading-snug">{ch.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Resource Viewer */}
              <div className="lg:col-span-2">
                {!selectedChapter ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md flex flex-col items-center justify-center py-24 text-center">
                    <div className={`w-20 h-20 ${subCfg.light} rounded-full flex items-center justify-center text-4xl mb-4`}>
                      {subCfg.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Select a Chapter</h3>
                    <p className="text-sm text-gray-400">Pick a chapter from the list to view notes, lectures, and practice papers</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                    {/* Chapter Title Header */}
                    <div className={`bg-gradient-to-r ${subCfg.gradient} p-4 md:p-6 text-white`}>
                      <h2 className="text-xl md:text-2xl font-extrabold mb-1">{selectedChapter.title}</h2>
                      <p className="text-white/70 text-sm">{selectedExam?.toUpperCase()} · {selectedSubject} · Class {selectedClass}</p>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex border-b border-gray-100">
                      {([
                        { key: 'notes', label: 'Notes', icon: BookOpen },
                        { key: 'lectures', label: 'Lectures', icon: Play },
                        { key: 'sample-papers', label: 'Sample Papers', icon: FileText },
                      ] as { key: ResourceTab; label: string; icon: typeof BookOpen }[]).map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                            activeTab === key
                              ? `border-current ${subCfg.text} ${subCfg.light}`
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 md:p-6">
                      {/* ─── NOTES TAB ─── */}
                      {activeTab === 'notes' && (
                        <div className="space-y-5">
                          {/* Topics covered */}
                          <div className={`${subCfg.light} rounded-2xl p-5`}>
                            <h4 className={`font-bold ${subCfg.text} flex items-center gap-2 mb-3`}>
                              <Target className="w-4 h-4" /> Topics Covered
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedChapter.topics.map((t) => (
                                <span key={t} className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Formulas */}
                          {selectedChapter.formulas.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                              <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4" /> Key Formulas
                              </h4>
                              <div className="space-y-2">
                                {selectedChapter.formulas.map((f, i) => (
                                  <div key={i} className="flex items-start gap-2 bg-white border border-amber-100 rounded-xl px-4 py-2.5">
                                    <span className="text-amber-400 font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                                    <code className="text-gray-800 text-sm font-mono leading-relaxed">{f}</code>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Exam Tips */}
                          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                            <h4 className="font-bold text-green-800 flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4" /> Exam Tips
                            </h4>
                            <div className="space-y-2">
                              {selectedChapter.tips.map((tip, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-gray-700">{tip}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: selectedExam === 'jee' ? 'JEE Problems' : 'NEET MCQs', value: `${selectedChapter.samplePaperCount * 18}+`, color: subCfg.light, textColor: subCfg.text },
                              { label: 'Video Lectures', value: `${selectedChapter.lectureCount}`, color: 'bg-rose-50', textColor: 'text-rose-700' },
                              { label: 'Sample Papers', value: `${selectedChapter.samplePaperCount}`, color: 'bg-blue-50', textColor: 'text-blue-700' },
                            ].map(({ label, value, color, textColor }) => (
                              <div key={label} className={`${color} rounded-2xl p-3 text-center`}>
                                <p className={`text-2xl font-extrabold ${textColor}`}>{value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ─── LECTURES TAB ─── */}
                      {activeTab === 'lectures' && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-500 mb-4">
                            {selectedChapter.lectureCount} video lectures for <span className="font-semibold text-gray-700">{selectedChapter.title}</span>
                          </p>
                          {Array.from({ length: selectedChapter.lectureCount }, (_, i) => {
                            const durationMins = 20 + Math.floor(Math.random() * 30);
                            const lectureLabels = [
                              'Introduction & Overview', 'Core Concepts Explained', 'Worked Examples',
                              'Advanced Problems', 'Previous Year Questions', 'Tricks & Shortcuts',
                              'Common Mistakes to Avoid', 'Revision & Summary',
                            ];
                            return (
                              <div
                                key={i}
                                className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 cursor-pointer group transition-colors border border-gray-100"
                              >
                                <div className={`w-12 h-12 bg-gradient-to-br ${subCfg.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md`}>
                                  <Play className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm truncate">
                                    Lecture {i + 1}: {lectureLabels[i % lectureLabels.length]}
                                  </p>
                                  <p className="text-xs text-gray-400">{selectedChapter.title}</p>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                                  <Clock className="w-3.5 h-3.5" />
                                  {durationMins} min
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ─── SAMPLE PAPERS TAB ─── */}
                      {activeTab === 'sample-papers' && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-500 mb-4">
                            {selectedChapter.samplePaperCount} practice papers for <span className="font-semibold text-gray-700">{selectedChapter.title}</span>
                          </p>
                          {Array.from({ length: selectedChapter.samplePaperCount }, (_, i) => {
                            const type = samplePaperTypes[i % samplePaperTypes.length];
                            const difficulty = (['Easy', 'Medium', 'Hard'] as const)[i % 3];
                            const diffColor = { Easy: 'bg-green-100 text-green-700', Medium: 'bg-amber-100 text-amber-700', Hard: 'bg-red-100 text-red-700' }[difficulty];
                            const questions = selectedExam === 'neet' ? 30 + i * 5 : 25 + i * 4;
                            return (
                              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${diffColor}`}>{difficulty}</span>
                                      <span className="bg-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">{type}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-sm">{selectedChapter.title} — Set {i + 1}</h4>
                                    <p className="text-xs text-gray-400">{questions} Questions · {selectedExam === 'neet' ? '120' : '100'} Marks</p>
                                  </div>
                                  <BarChart3 className="w-5 h-5 text-gray-300" />
                                </div>
                                <div className="flex gap-2">
                                  <button className={`flex-1 flex items-center justify-center gap-2 ${subCfg.light} ${subCfg.text} py-2 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity`}>
                                    <Play className="w-3.5 h-3.5" /> Attempt
                                  </button>
                                  <button className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${subCfg.gradient} text-white py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm`}>
                                    <Download className="w-3.5 h-3.5" /> Download
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
