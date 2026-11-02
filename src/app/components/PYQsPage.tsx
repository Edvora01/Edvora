import { useState } from "react";
import { CalendarDays, FileQuestion, Search, SlidersHorizontal } from "lucide-react";
import { subjectsData } from "../data/subjects";

const classes = [6,7,8,9,10,11,12];
export function PYQsPage() {
  const [classNum, setClassNum] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [query, setQuery] = useState("");
  const subjects = classNum ? subjectsData[classNum] : [];
  return <div className="min-h-screen bg-[#fffaf0] pt-[72px]">
    <section className="border-b border-amber-200 bg-[#17120b] px-6 py-20 text-white"><div className="mx-auto max-w-7xl"><span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-2 text-xs font-bold tracking-[.18em] text-amber-300"><FileQuestion className="h-4 w-4" /> EXAM ARCHIVE</span><h1 className="mt-5 text-5xl font-extrabold md:text-7xl">Previous Year<br /><span className="text-amber-400">Questions</span></h1><p className="mt-6 max-w-2xl text-lg text-stone-300">Understand exam patterns. Practise smarter. Prepare with confidence.</p></div></section>
    <section className="px-6 py-12"><div className="mx-auto max-w-7xl">
      <div className="grid gap-5 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_.8fr_.6fr]">
        <label className="relative"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Search archive</span><Search className="absolute bottom-3.5 left-3 h-4 w-4 text-stone-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Subject or topic…" className="w-full rounded-xl border border-stone-200 py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-amber-400" /></label>
        <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Subject</span><select value={subject} disabled={!classNum} onChange={e => setSubject(e.target.value)} className="w-full rounded-xl border border-stone-200 bg-white p-3 disabled:opacity-50"><option value="">All connected subjects</option>{subjects.map(item => <option key={item}>{item}</option>)}</select></label>
        <label><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500">Year</span><input value={year} onChange={e => setYear(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="e.g. 2024" className="w-full rounded-xl border border-stone-200 p-3" /></label>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">{classes.map(item => <button key={item} onClick={() => { setClassNum(item); setSubject(""); }} className={`rounded-xl border px-4 py-2 text-sm font-bold ${classNum === item ? "border-amber-500 bg-amber-500 text-stone-950" : "border-stone-200 bg-white text-stone-600"}`}>Class {item}</button>)}</div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-3xl bg-amber-400 p-7 text-stone-950"><CalendarDays className="h-8 w-8" /><h2 className="mt-16 text-3xl font-extrabold">A real archive, not generated placeholders.</h2><p className="mt-4 text-sm leading-6">Papers will appear only when an actual question-paper file and its metadata are connected.</p></div>
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center"><SlidersHorizontal className="h-10 w-10 text-stone-300" /><h2 className="mt-5 text-xl font-bold text-stone-800">{classNum ? "No verified papers connected for this filter" : "Choose a class to search the archive"}</h2><p className="mt-2 max-w-md text-sm leading-6 text-stone-500">{classNum ? `The current project contains no verified PYQ file records for Class ${classNum}${subject ? ` · ${subject}` : ""}${year ? ` · ${year}` : ""}. Connect real file URLs to enable preview and download.` : "Class, subject, year and exam filters are ready. Results remain empty until real paper data is added."}</p>{query && <span className="mt-4 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">Search: “{query}”</span>}</div>
      </div>
    </div></section>
  </div>;
}
