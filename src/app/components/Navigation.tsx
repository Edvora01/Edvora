import { BookOpen, Infinity as InfinityIcon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";
import logo from "../../imports/Edvora_Logo.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onStartLearning: () => void;
}

const items: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Classes", page: "classes" },
  { label: "Notes", page: "notes" },
  { label: "PYQs", page: "pyqs" },
  { label: "Papers", page: "sample-papers" },
  { label: "JEE / NEET", page: "jee-neet" },
  { label: "Skills", page: "skills" },
  { label: "Books", page: "books" },
];

export function Navigation({ currentPage, onNavigate, onStartLearning }: NavigationProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [currentPage]);

  const go = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 lg:px-8">
        <button onClick={() => go("home")} className="flex shrink-0 items-center gap-2.5" aria-label="Edvora home">
          <ImageWithFallback src={logo} alt="Edvora crest" className="h-11 w-12 object-contain object-top" />
          <div className="text-left">
            <span className="block font-['Outfit'] text-xl font-extrabold tracking-tight text-slate-950">Edvora</span>
            <span className="block text-[8px] font-bold uppercase tracking-[0.22em] text-blue-600">Learn without limits</span>
          </div>
        </button>

        <nav className="ml-auto hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation">
          {items.map((item) => (
            <button
              key={item.page}
              onClick={() => go(item.page)}
              aria-current={currentPage === item.page ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                currentPage === item.page ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("infinity-slate")}
          className={`hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition lg:flex ${
            currentPage === "infinity-slate" ? "bg-blue-600 text-white" : "bg-slate-950 text-white hover:bg-blue-700"
          }`}
        >
          <InfinityIcon className="h-4 w-4" /> Infinity Slate
        </button>
        <button onClick={onStartLearning} className="hidden rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-orange-600 sm:block">
          Start learning
        </button>
        <button onClick={() => setOpen(!open)} className="ml-auto rounded-lg p-2 text-slate-700 xl:hidden" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white p-4 shadow-xl xl:hidden">
          <div className="grid gap-1 sm:grid-cols-2">
            {[...items, { label: "Guest entry", page: "guest" as Page }, { label: "Infinity Slate", page: "infinity-slate" as Page }].map((item) => (
              <button key={item.page} onClick={() => go(item.page)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${currentPage === item.page ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}>
                {item.page === "infinity-slate" ? <InfinityIcon className="h-4 w-4" /> : <BookOpen className="h-4 w-4 text-slate-400" />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
