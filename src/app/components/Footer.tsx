import { ArrowUpRight, Infinity as InfinityIcon, Mail } from "lucide-react";
import type { Page } from "../App";

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

const groups: { title: string; links: { label: string; page: Page }[] }[] = [
  { title: "Academic learning", links: [{ label: "Classes 6–12", page: "classes" }, { label: "Study notes", page: "notes" }, { label: "Sample papers", page: "sample-papers" }] },
  { title: "Exam preparation", links: [{ label: "JEE / NEET", page: "jee-neet" }, { label: "Previous papers", page: "pyqs" }] },
  { title: "Explore", links: [{ label: "Practical skills", page: "skills" }, { label: "Books by Edvora", page: "books" }, { label: "Infinity Slate", page: "infinity-slate" }] },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0b1224] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3 text-2xl font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600">E</span> Edvora 2.0</div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Quality academic resources, competitive exam preparation and practical skills—organised as one open learning ecosystem.</p>
            <a href="mailto:support@edvora.com" className="mt-5 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white"><Mail className="h-4 w-4" /> support@edvora.com</a>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold text-white">{group.title}</h3>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => <button key={link.label} onClick={() => onNavigate?.(link.page)} className="flex items-center gap-1 text-left text-sm text-slate-400 hover:text-white">{link.label}<ArrowUpRight className="h-3 w-3" /></button>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Edvora. Built for focused, self-paced learning.</p>
          <p className="flex items-center gap-2"><InfinityIcon className="h-4 w-4" /> Infinity Slate is a prototype-stage concept.</p>
        </div>
      </div>
    </footer>
  );
}
