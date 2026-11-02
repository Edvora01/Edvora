import { useState } from "react";
import { ArrowRight, Atom, BookMarked, BookOpen, Braces, Check, ChevronDown, FileText, Infinity as InfinityIcon, Layers3, Play } from "lucide-react";
import type { Page } from "../App";
import logo from "../../imports/Edvora_Logo.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onStartLearning: () => void;
  onNavigate: (page: Page) => void;
}

const destinations: { title: string; copy: string; page: Page; icon: typeof BookOpen; accent: string; eyebrow: string }[] = [
  { title: "Academic Learning", copy: "Classes 6–12, organised by subject, book and chapter.", page: "classes", icon: BookOpen, accent: "bg-blue-600", eyebrow: "NCERT & SCHOOL" },
  { title: "JEE / NEET Preparation", copy: "Focused notes, lectures and chapter-wise exam practice.", page: "jee-neet", icon: Atom, accent: "bg-violet-600", eyebrow: "COMPETITIVE EXAMS" },
  { title: "Skill Development", copy: "Learn code, data, design, media and communication by doing.", page: "skills", icon: Braces, accent: "bg-cyan-600", eyebrow: "BEYOND SCHOOL" },
  { title: "Digital Study Resources", copy: "Notes, previous papers and practice materials in one place.", page: "notes", icon: FileText, accent: "bg-emerald-600", eyebrow: "REVISION DESK" },
  { title: "Books by Edvora", copy: "Original student guides for study, time, skills and digital life.", page: "books", icon: BookMarked, accent: "bg-orange-500", eyebrow: "EDVORA LIBRARY" },
];

const benefits = ["Organised learning resources", "Chapter-wise navigation", "PDF and video resources", "Self-paced learning", "Competitive exam preparation", "Practical skill development"];

export function HomePage({ onStartLearning, onNavigate }: HomePageProps) {
  const [founderExpanded, setFounderExpanded] = useState(false);
  const founderPhoto = "https://lh3.googleusercontent.com/d/1-5zhWqlOQ_awlRrhR2O4x-ZPpFveFYv6";

  return (
    <div className="overflow-hidden pt-[72px]">
      <section className="relative flex min-h-[680px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50 px-6 py-20 text-center">
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-56 w-56 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <ImageWithFallback src={logo} alt="Edvora — Smart Learning Start Here" className="mx-auto h-44 w-auto object-contain sm:h-56" />
          <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-blue-600 sm:text-5xl">Smarter Learning Starts Here</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Access quality educational content for Classes 6–12. Navigate seamlessly from class to subject to chapter, with PDFs and videos at your fingertips.
          </p>
          <button onClick={onStartLearning} className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600">
            Start Learning <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-x-7 gap-y-3 border-t border-blue-100 pt-6 text-sm font-semibold text-slate-600">
            {["No sign-up", "Classes 6–12", "Free access"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-blue-600">THE LEARNING JOURNEY</p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">From a big syllabus to the next clear step.</h2>
              <p className="mt-5 leading-7 text-slate-600">Edvora turns scattered learning material into a predictable route. Choose where you are, then move directly to what you need.</p>
            </div>
            <div className="relative grid gap-3 sm:grid-cols-4">
              {["Class", "Subject", "Chapter", "Resources"].map((item, i) => (
                <button key={item} onClick={onStartLearning} className={`group relative min-h-52 overflow-hidden rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-xl ${i === 3 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-950"}`}>
                  <span className={`font-['DM_Mono'] text-xs ${i === 3 ? "text-blue-200" : "text-slate-400"}`}>0{i + 1}</span>
                  <p className="mt-20 text-xl font-extrabold">{item}</p>
                  <ArrowRight className="mt-3 h-5 w-5 transition group-hover:translate-x-1" />
                </button>
              ))}
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-blue-300 sm:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-extrabold tracking-[.2em] text-blue-600">ONE ECOSYSTEM</p><h2 className="mt-4 text-4xl font-extrabold text-slate-950 md:text-5xl">Learn for school. Prepare for life.</h2></div>
            <p className="max-w-md text-slate-600">Each space has its own purpose, while sharing one consistent, distraction-aware learning experience.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {destinations.map((item, i) => {
              const Icon = item.icon;
              return <button key={item.title} onClick={() => onNavigate(item.page)} className={`group rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:bg-white hover:shadow-xl ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <div className="flex items-start justify-between"><div className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${item.accent}`}><Icon /></div><ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" /></div>
                <p className="mt-8 text-[10px] font-extrabold tracking-[.18em] text-slate-400">{item.eyebrow}</p><h3 className="mt-2 text-2xl font-bold text-slate-950">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div><p className="text-xs font-extrabold tracking-[.2em] text-blue-200">WHY EDVORA</p><h2 className="mt-4 text-4xl font-extrabold">Built around how students actually look for help.</h2></div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/20 sm:grid-cols-2">
            {benefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 bg-blue-600 p-5"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><Check className="h-4 w-4" /></span><span className="font-semibold">{benefit}</span></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1224] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div><p className="flex items-center gap-2 text-xs font-bold tracking-[.2em] text-cyan-300"><InfinityIcon /> EDVORA PRODUCT CONCEPT</p><h2 className="mt-5 text-5xl font-extrabold md:text-6xl">More Focus.<br />Less Paper.<br /><span className="text-cyan-300">Better Learning.</span></h2><p className="mt-6 max-w-xl leading-7 text-slate-300">Meet Infinity Slate, a prototype-stage student-first digital writing and study device.</p><button onClick={() => onNavigate("infinity-slate")} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-slate-950">Explore Infinity Slate <ArrowRight className="h-5 w-5" /></button></div>
          <div className="rounded-[36px] border border-white/15 bg-white/5 p-5"><div className="aspect-[4/3] rounded-[26px] bg-slate-100 p-8 text-slate-900 shadow-2xl"><div className="flex items-center justify-between border-b border-slate-300 pb-4"><b>INFINITY SLATE ∞</b><span className="font-['DM_Mono'] text-xs">STUDY MODE</span></div><div className="mt-7 grid grid-cols-2 gap-4">{[["Notes", BookOpen], ["PDF Reader", FileText], ["Library", Layers3], ["Lessons", Play]].map(([label, Icon]) => <div key={label as string} className="rounded-2xl border border-slate-300 bg-white p-5"><Icon className="h-6 w-6 text-blue-600" /><p className="mt-8 font-bold">{label as string}</p></div>)}</div></div><p className="mt-4 text-center text-xs text-slate-500">Concept interface · not final hardware</p></div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="relative min-h-[440px] overflow-hidden bg-blue-700 p-8 md:p-12">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative mx-auto max-w-sm">
                <div className="aspect-[4/5] overflow-hidden rounded-[28px] border-4 border-white/20 bg-blue-900 shadow-2xl">
                  <ImageWithFallback src={founderPhoto} alt="Madhav, Founder and Creator of Edvora" className="h-full w-full object-cover" />
                </div>
                <div className="relative -mt-16 mx-5 rounded-2xl border border-white/20 bg-slate-950/90 p-5 text-white backdrop-blur">
                  <h3 className="text-2xl font-extrabold">Madhav</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-200">Founder &amp; Creator — Edvora</p>
                  <p className="mt-3 text-xs tracking-wide text-slate-300">Student · Developer · Learner</p>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-xs font-extrabold tracking-[.2em] text-blue-600">FROM THE FOUNDER</p>
              <h2 className="mt-4 text-4xl font-extrabold text-slate-950 md:text-5xl">Message from the Founder</h2>
              <p className="mt-3 text-lg text-slate-500">A note from the student who built Edvora.</p>
              <div className="mt-8 space-y-4 text-base leading-8 text-slate-700">
                <p><strong className="text-slate-950">Hi, I&apos;m Madhav.</strong></p>
                <p>I&apos;m a student, just like you.</p>
                <p>Edvora wasn&apos;t started in a big office or with a big team — it started with a simple problem I faced every day as a student.</p>
                <p>While studying, I realised how difficult it was to find all study resources in one clean place — NCERT PDFs, chapter-wise notes, YouTube videos and revision material. Everything was scattered.</p>
                {founderExpanded && (
                  <>
                    <p className="font-bold text-blue-700">So I decided to build Edvora.</p>
                    <p>My vision is to create an ecosystem where students can access academic resources, develop practical skills and explore better ways of learning.</p>
                    <p>Edvora is a journey of learning, creating and building — and this is just the beginning.</p>
                  </>
                )}
              </div>
              <button onClick={() => setFounderExpanded(!founderExpanded)} aria-expanded={founderExpanded} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
                {founderExpanded ? "Read Less" : "Read More"}
                <ChevronDown className={`h-4 w-4 transition ${founderExpanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
