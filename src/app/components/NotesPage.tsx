import { useState } from "react";
import { BookOpen, FileText, HelpCircle, Map, Search, Sparkles, Zap } from "lucide-react";
import { subjectsData } from "../data/subjects";

const categories = [
  { title: "Quick Revision Notes", copy: "Condense a chapter into key ideas and retrieval prompts.", icon: Zap, tone: "bg-blue-600" },
  { title: "Formula Sheets", copy: "Keep essential formulas and when to use them together.", icon: FileText, tone: "bg-violet-600" },
  { title: "Mind Maps", copy: "Connect ideas visually to see structure and relationships.", icon: Map, tone: "bg-emerald-600" },
  { title: "Important Questions", copy: "Focus revision around useful questions and common concepts.", icon: HelpCircle, tone: "bg-orange-500" },
];

export function NotesPage() {
  const [classNum, setClassNum] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  return <div className="min-h-screen bg-[#f8fafc] pt-[72px]">
    <section className="border-b border-slate-200 bg-white px-6 py-16"><div className="mx-auto max-w-7xl"><span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[.2em] text-blue-600"><Sparkles className="h-4 w-4" /> REVISION DESK</span><h1 className="mt-4 text-5xl font-extrabold text-slate-950 md:text-6xl">Study notes, organised<br />around your syllabus.</h1><p className="mt-5 text-lg text-slate-600">Filter by class and subject, then continue to chapter resources for connected material.</p></div></section>
    <section className="px-6 py-12"><div className="mx-auto max-w-7xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a note type or topic…" className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500" /></div>
        <div className="mt-5 flex flex-wrap gap-2">{[6,7,8,9,10,11,12].map(item => <button key={item} onClick={() => { setClassNum(item); setSubject(""); }} className={`rounded-xl px-4 py-2 text-sm font-bold ${classNum === item ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-800"}`}>Class {item}</button>)}</div>
        {classNum && <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">{subjectsData[classNum].map(item => <button key={item} onClick={() => setSubject(subject === item ? "" : item)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${subject === item ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200 text-slate-600"}`}>{item}</button>)}</div>}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">{categories.filter(item => !query || `${item.title} ${item.copy}`.toLowerCase().includes(query.toLowerCase())).map(item => { const Icon = item.icon; return <button key={item.title} onClick={() => setCategory(item.title)} className={`group rounded-3xl border bg-white p-7 text-left transition hover:-translate-y-1 hover:shadow-xl ${category === item.title ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}><div className={`grid h-13 w-13 place-items-center rounded-2xl text-white ${item.tone}`}><Icon /></div><h2 className="mt-8 text-2xl font-bold text-slate-950">{item.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{item.copy}</p><p className="mt-6 text-sm font-bold text-blue-600">{category === item.title ? "Selected" : "Choose note type"} →</p></button>})}</div>
      <div className="mt-10 rounded-3xl bg-slate-950 p-8 text-white"><BookOpen className="text-blue-300" /><h2 className="mt-6 text-2xl font-bold">{classNum && subject && category ? `${category} · ${subject} · Class ${classNum}` : "Connect your filters to chapter resources"}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{classNum && subject && category ? "The current project does not contain a separate verified note-file index for this selection. Open Classes → Subject → Chapter to use the connected chapter PDF and available notes." : "Select a class, subject and note type. Edvora will never display invented resource counts or pretend unconnected files are available."}</p></div>
    </div></section>
  </div>;
}
