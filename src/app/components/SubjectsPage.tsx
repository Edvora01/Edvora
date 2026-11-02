import { ArrowLeft, ArrowRight, BookOpen, FileText, Layers3 } from "lucide-react";
import { getChapters } from "../data/chapters";
import { getSubjectParts, subjectIcons, subjectsData } from "../data/subjects";

interface SubjectsPageProps { selectedClass: number; onSubjectSelect: (subject: string) => void; onBack: () => void; }

const descriptions: Record<string, string> = {
  Mathematics: "Reasoning, patterns and problem solving.", Science: "Explore the living and physical world.", Physics: "Understand matter, motion and energy.", Chemistry: "Study substances, reactions and structure.", Biology: "Explore life from cells to ecosystems.", English: "Build language, literature and expression.", "Social Science": "Understand people, places and societies.", "Computer Science": "Learn computational thinking and systems.",
};

export function SubjectsPage({ selectedClass, onSubjectSelect, onBack }: SubjectsPageProps) {
  const subjects = subjectsData[selectedClass] || [];
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-[72px]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-700"><ArrowLeft className="h-4 w-4" /> All classes</button>
        <div className="mt-9 grid gap-6 border-b border-slate-200 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white">CLASS {selectedClass}</span><h1 className="mt-5 text-5xl font-extrabold text-slate-950">Choose a subject</h1><p className="mt-3 text-lg text-slate-600">Open a subject to browse books, chapters and learning resources.</p></div>
          <div className="flex gap-3 text-sm text-slate-500"><span className="rounded-xl border border-slate-200 bg-white px-4 py-3"><b className="text-slate-950">{subjects.length}</b> subjects</span><span className="rounded-xl border border-slate-200 bg-white px-4 py-3">Class {selectedClass} pathway</span></div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => {
            const parts = getSubjectParts(subject, selectedClass);
            const chapters = parts ? parts.reduce((n, part) => n + getChapters(subject, selectedClass, part).length, 0) : getChapters(subject, selectedClass, null).length;
            return <button key={subject} onClick={() => onSubjectSelect(subject)} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
              <div className={`h-2 ${["bg-blue-600","bg-violet-600","bg-emerald-500","bg-orange-500","bg-cyan-500"][index % 5]}`} />
              <div className="p-7">
                <div className="flex items-start justify-between"><span className="text-4xl" aria-hidden>{subjectIcons[subject] || "📘"}</span><ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" /></div>
                <h2 className="mt-8 text-2xl font-extrabold text-slate-950">{subject}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{descriptions[subject] || "Explore the complete class curriculum and connected resources."}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5"><FileText className="h-4 w-4 text-blue-600" />{chapters || "Available"} chapters</span>
                  {parts && <span className="flex items-center gap-1.5"><Layers3 className="h-4 w-4 text-violet-600" />{parts.length} books / parts</span>}
                  <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-emerald-600" />PDF resources</span>
                </div>
              </div>
            </button>;
          })}
        </div>
      </div>
    </div>
  );
}
