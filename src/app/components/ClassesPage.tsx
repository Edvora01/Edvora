import { ArrowRight, Atom, BookOpen, Calculator, FlaskConical, GraduationCap, Languages, Microscope } from "lucide-react";
import { subjectsData } from "../data/subjects";

interface ClassesPageProps { onClassSelect: (classNum: number) => void; }

const meta = {
  foundation: { label: "Foundation", copy: "Build strong concepts and confident learning habits.", tone: "bg-cyan-50 text-cyan-700", icon: BookOpen },
  secondary: { label: "Secondary", copy: "Deepen subject understanding and prepare for key exams.", tone: "bg-violet-50 text-violet-700", icon: Microscope },
  senior: { label: "Senior Secondary", copy: "Navigate advanced subjects and specialised academic pathways.", tone: "bg-slate-900 text-white", icon: Atom },
};

export function ClassesPage({ onClassSelect }: ClassesPageProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-[72px]">
      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.6fr] lg:items-end">
          <div><p className="text-xs font-extrabold tracking-[.2em] text-blue-600">ACADEMIC LEARNING</p><h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-950 md:text-6xl">Choose your class.<br /><span className="text-blue-600">Find your next chapter.</span></h1></div>
          <p className="max-w-xl text-lg leading-8 text-slate-600">Seven class pathways with subjects, books and verified chapter PDFs organised for quick access.</p>
        </div>
      </section>
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[6,7,8,9,10,11,12].map((num, index) => {
            const level = num <= 8 ? meta.foundation : num <= 10 ? meta.secondary : meta.senior;
            const Icon = [BookOpen, Calculator, Languages, Microscope, FlaskConical, Atom, GraduationCap][index];
            const senior = num >= 11;
            return (
              <button key={num} onClick={() => onClassSelect(num)} className={`group relative min-h-[290px] overflow-hidden rounded-3xl border p-7 text-left transition hover:-translate-y-1 hover:shadow-2xl ${senior ? "border-slate-800 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-950"} ${num === 12 ? "lg:col-span-2" : ""}`}>
                <div className="flex items-start justify-between">
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[.14em] ${level.tone}`}>{level.label.toUpperCase()}</span>
                  <Icon className={`h-9 w-9 ${senior ? "text-blue-300" : "text-blue-600"}`} />
                </div>
                <div className="mt-16 flex items-end justify-between gap-5">
                  <div><p className={`text-xs font-bold uppercase tracking-widest ${senior ? "text-slate-400" : "text-slate-400"}`}>Academic pathway</p><h2 className="mt-2 text-4xl font-extrabold">Class {num}</h2><p className={`mt-3 max-w-sm text-sm leading-6 ${senior ? "text-slate-300" : "text-slate-600"}`}>{level.copy}</p></div>
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition group-hover:translate-x-1 ${senior ? "bg-blue-600" : "bg-blue-50 text-blue-700"}`}><ArrowRight /></span>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 bg-blue-600 transition-all group-hover:w-full ${num <= 8 ? "w-1/3" : num <= 10 ? "w-2/3" : "w-full"}`} />
                <span className={`absolute right-7 top-20 font-['DM_Mono'] text-xs ${senior ? "text-slate-500" : "text-slate-400"}`}>{subjectsData[num].length} SUBJECTS</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
