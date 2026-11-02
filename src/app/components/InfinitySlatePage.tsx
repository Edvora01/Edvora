import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BatteryMedium,
  BookOpen,
  Bookmark,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Download,
  Eraser,
  File,
  FileText,
  Folder,
  FolderOpen,
  Grid3X3,
  Highlighter,
  Home,
  Image,
  Infinity as InfinityIcon,
  Library,
  ListChecks,
  Maximize2,
  Menu,
  Minus,
  MoreHorizontal,
  MousePointer2,
  Music2,
  NotebookPen,
  PanelLeft,
  PenLine,
  Plus,
  Redo2,
  Ruler,
  Save,
  Search,
  Settings,
  Shapes,
  ShieldCheck,
  TextCursorInput,
  Trash2,
  Undo2,
  Usb,
  Wifi,
  WifiOff,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { getChapters } from "../data/chapters";
import { getSubjectParts, subjectsData } from "../data/subjects";

type ScreenName = "startup" | "home" | "notes" | "notebook" | "templates" | "pdf" | "library";
type TemplateName = "Ruled" | "Blank" | "Grid" | "Dotted" | "Two Column" | "Cornell" | "Checklist" | "Music";

const screenList: { id: ScreenName; label: string }[] = [
  { id: "startup", label: "Startup Screen" },
  { id: "home", label: "Home Dashboard" },
  { id: "notes", label: "My Notes" },
  { id: "notebook", label: "Digital Notebook" },
  { id: "templates", label: "Notebook Templates" },
  { id: "pdf", label: "PDF Reader" },
  { id: "library", label: "Study Library" },
];

const templates: TemplateName[] = ["Ruled", "Blank", "Grid", "Dotted", "Two Column", "Cornell", "Checklist", "Music"];
const classes = [6, 7, 8, 9, 10, 11, 12];

function SlateLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <InfinityIcon className={compact ? "h-5 w-5" : "h-8 w-8"} strokeWidth={1.6} />
      <div className="leading-none"><b className={compact ? "text-[10px]" : "text-sm"}>INFINITY SLATE</b>{!compact && <span className="block text-[7px] tracking-[.24em] text-neutral-500">PRODUCT BY EDVORA</span>}</div>
    </div>
  );
}

function StatusBar() {
  return <div className="flex items-center justify-between border-b border-neutral-300 bg-white px-4 py-2 text-[9px]"><SlateLogo compact /><div className="flex items-center gap-3 font-semibold"><span>10:24</span><BatteryMedium className="h-4 w-4" /></div></div>;
}

function SideNav({ active, go }: { active: ScreenName; go: (screen: ScreenName) => void }) {
  const items = [
    ["home", "Home", Home],
    ["notes", "My Notes", NotebookPen],
    ["library", "Study Library", Library],
    ["pdf", "PDF Reader", FileText],
  ] as const;
  return (
    <aside className="w-36 shrink-0 border-r border-neutral-300 bg-neutral-100 p-3">
      <SlateLogo />
      <div className="mt-7 space-y-1">
        {items.map(([id, label, Icon]) => (
          <button key={id} onClick={() => go(id)} className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[10px] font-bold ${active === id ? "bg-black text-white" : "hover:bg-neutral-200"}`}><Icon className="h-3.5 w-3.5" />{label}</button>
        ))}
        <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[10px] font-bold hover:bg-neutral-200"><Settings className="h-3.5 w-3.5" />Settings</button>
      </div>
    </aside>
  );
}

function StartupScreen() {
  return <div className="flex h-full flex-col items-center justify-center bg-white text-black"><InfinityIcon className="h-24 w-24" strokeWidth={1.1} /><h3 className="mt-5 text-3xl font-black tracking-[.14em]">INFINITY SLATE</h3><div className="mt-7 h-px w-52 bg-neutral-300" /><p className="mt-5 text-xs font-semibold tracking-[.18em] text-neutral-500">PRODUCT BY EDVORA</p></div>;
}

function HomeScreen({ go }: { go: (screen: ScreenName) => void }) {
  const cards = [
    ["My Notes", NotebookPen, "notes" as ScreenName],
    ["Study Library", Library, "library" as ScreenName],
    ["My Files", FolderOpen, "pdf" as ScreenName],
    ["Settings", Settings, "home" as ScreenName],
  ] as const;
  return <div className="flex h-full flex-col bg-neutral-100"><StatusBar /><div className="flex-1 overflow-auto p-5">
    <div className="flex items-end justify-between"><div><p className="text-[9px] font-bold text-neutral-500">GOOD MORNING</p><h3 className="mt-1 text-xl font-black">Your study dashboard</h3></div><span className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-[8px]">FOCUS MODE</span></div>
    <div className="mt-4 grid grid-cols-4 gap-2">{cards.map(([label, Icon, target]) => <button key={label} onClick={() => go(target)} className="rounded-lg border border-neutral-300 bg-white p-3 text-left hover:bg-neutral-50"><Icon className="h-5 w-5" /><p className="mt-5 text-[10px] font-black">{label}</p></button>)}</div>
    <h4 className="mt-5 text-[10px] font-black uppercase tracking-wider">Quick Access</h4>
    <div className="mt-2 flex gap-1.5">{classes.map(item => <button key={item} onClick={() => go("library")} className="flex-1 rounded-md border border-neutral-300 bg-white py-2 text-[8px] font-bold hover:bg-black hover:text-white">Class {item}</button>)}</div>
    <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-lg border border-neutral-300 bg-white p-3"><p className="text-[9px] font-black">Recent Notes</p><div className="mt-3 space-y-2">{["Algebra formulas","Science — Light"].map(item => <button key={item} onClick={() => go("notes")} className="flex w-full items-center gap-2 text-left text-[8px]"><FileText className="h-3 w-3" />{item}<ChevronRight className="ml-auto h-3 w-3" /></button>)}</div></div><div className="rounded-lg border border-neutral-300 bg-white p-3"><p className="text-[9px] font-black">Recently Opened</p><button onClick={() => go("pdf")} className="mt-3 flex w-full items-center gap-2 text-left text-[8px]"><BookOpen className="h-3 w-3" />Mathematics chapter PDF<ChevronRight className="ml-auto h-3 w-3" /></button></div></div>
  </div></div>;
}

function NotesScreen({ go }: { go: (screen: ScreenName) => void }) {
  const [folder, setFolder] = useState("Class 10");
  const [notes, setNotes] = useState(["Quadratic Equations", "Light — Reflection", "English Essay Plan"]);
  const folders = ["Class 10", "Class 11", "Class 12", "Personal", "Maths", "Science", "English", "History"];
  return <div className="flex h-full bg-white"><SideNav active="notes" go={go} /><main className="min-w-0 flex-1 overflow-auto">
    <div className="flex items-center gap-3 border-b border-neutral-300 p-3"><div className="relative flex-1"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" /><input placeholder="Search notes" className="w-full rounded-md border border-neutral-300 py-2 pl-8 pr-3 text-[9px]" /></div><button onClick={() => { const title = `Untitled Note ${notes.length + 1}`; setNotes([title, ...notes]); }} className="flex items-center gap-1.5 rounded-md bg-black px-3 py-2 text-[9px] font-bold text-white"><Plus className="h-3 w-3" />New Note</button></div>
    <div className="p-4"><div className="flex items-end justify-between"><div><p className="text-[8px] text-neutral-500">MY NOTES / {folder.toUpperCase()}</p><h3 className="mt-1 text-lg font-black">Folders &amp; notes</h3></div><button onClick={() => go("templates")} className="text-[9px] font-bold underline">Choose template</button></div>
      <div className="mt-4 grid grid-cols-4 gap-2">{folders.map(item => <button key={item} onClick={() => setFolder(item)} className={`rounded-lg border p-3 text-left ${folder === item ? "border-black bg-neutral-100" : "border-neutral-300"}`}><Folder className="h-5 w-5" fill={folder === item ? "black" : "none"} /><p className="mt-3 truncate text-[9px] font-black">{item}</p></button>)}</div>
      <h4 className="mt-5 text-[9px] font-black uppercase">Recent Notes</h4><div className="mt-2 divide-y divide-neutral-200 rounded-lg border border-neutral-300">{notes.map((item, index) => <button key={`${item}-${index}`} onClick={() => go("notebook")} className="flex w-full items-center gap-3 p-3 text-left text-[9px] hover:bg-neutral-50"><FileText className="h-4 w-4" /><span className="font-bold">{item}</span><span className="ml-auto text-neutral-400">Edited today</span><ChevronRight className="h-3 w-3" /></button>)}</div>
    </div>
  </main></div>;
}

function TemplatePreview({ name }: { name: TemplateName }) {
  const pattern =
    name === "Ruled" ? "bg-[repeating-linear-gradient(transparent_0_10px,#d4d4d4_11px)]" :
    name === "Grid" ? "bg-[linear-gradient(#ddd_1px,transparent_1px),linear-gradient(90deg,#ddd_1px,transparent_1px)] bg-[size:10px_10px]" :
    name === "Dotted" ? "bg-[radial-gradient(#aaa_1px,transparent_1px)] bg-[size:10px_10px]" :
    name === "Music" ? "bg-[repeating-linear-gradient(transparent_0_7px,#bbb_8px,transparent_9px_13px)]" : "";
  return <div className={`relative h-20 overflow-hidden rounded border border-neutral-300 bg-white ${pattern}`}>
    {name === "Two Column" && <div className="absolute inset-y-0 left-1/2 border-l border-neutral-400" />}
    {name === "Cornell" && <><div className="absolute inset-y-0 left-1/3 border-l border-neutral-400" /><div className="absolute inset-x-0 bottom-4 border-t border-neutral-400" /></>}
    {name === "Checklist" && <div className="space-y-2 p-2">{[1,2,3,4].map(item => <div key={item} className="flex gap-2"><span className="h-2 w-2 border border-neutral-500" /><span className="h-px flex-1 bg-neutral-300 mt-1" /></div>)}</div>}
  </div>;
}

function TemplatesScreen({ choose, go }: { choose: (template: TemplateName) => void; go: (screen: ScreenName) => void }) {
  return <div className="flex h-full bg-neutral-100"><SideNav active="notes" go={go} /><main className="flex-1 overflow-auto p-5"><p className="text-[8px] font-bold tracking-wider text-neutral-500">NEW NOTEBOOK</p><h3 className="mt-1 text-xl font-black">Choose a template</h3><p className="mt-1 text-[9px] text-neutral-500">Select a page layout to create a working notebook.</p><div className="mt-5 grid grid-cols-4 gap-3">{templates.map(item => <button key={item} onClick={() => choose(item)} className="rounded-lg border border-neutral-300 bg-white p-2 text-left hover:border-black"><TemplatePreview name={item} /><p className="mt-2 text-[9px] font-black">{item}</p><p className="text-[7px] text-neutral-400">Create notebook</p></button>)}</div></main></div>;
}

function NotebookScreen({ template, go }: { template: TemplateName; go: (screen: ScreenName) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [thickness, setThickness] = useState(2);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [zoom, setZoom] = useState(100);
  const storageKey = `infinity-slate-note-${template}-${page}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const saved = localStorage.getItem(storageKey);
    context?.clearRect(0, 0, canvas.width, canvas.height);
    if (saved) {
      const image = new window.Image();
      image.onload = () => context?.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = saved;
    }
  }, [storageKey]);

  const position = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: ((event.clientX - bounds.left) / bounds.width) * event.currentTarget.width, y: ((event.clientY - bounds.top) / bounds.height) * event.currentTarget.height };
  };
  const save = () => {
    if (canvasRef.current) localStorage.setItem(storageKey, canvasRef.current.toDataURL());
  };
  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem(storageKey);
  };
  const pagePattern = template === "Ruled" ? "bg-[repeating-linear-gradient(white_0_28px,#d4d4d4_29px)]" : template === "Grid" ? "bg-[linear-gradient(#ddd_1px,transparent_1px),linear-gradient(90deg,#ddd_1px,transparent_1px)] bg-[size:28px_28px]" : template === "Dotted" ? "bg-[radial-gradient(#bbb_1px,transparent_1px)] bg-[size:18px_18px]" : "bg-white";

  return <div className="flex h-full flex-col bg-neutral-200">
    <div className="flex items-center gap-2 border-b border-neutral-400 bg-white px-3 py-2"><SlateLogo compact /><span className="mx-2 h-5 w-px bg-neutral-300" /><b className="text-[10px]">Mathematics Notebook</b><span className="rounded bg-neutral-100 px-2 py-1 text-[7px]">{template}</span><button onClick={save} className="ml-auto flex items-center gap-1 rounded bg-black px-2.5 py-1.5 text-[8px] font-bold text-white"><Save className="h-3 w-3" />Save</button><button className="p-1"><Undo2 className="h-3.5 w-3.5" /></button><button className="p-1"><Redo2 className="h-3.5 w-3.5" /></button><MoreHorizontal className="h-4 w-4" /><BatteryMedium className="h-4 w-4" /><span className="text-[8px]">10:24</span></div>
    <div className="flex items-center gap-1 border-b border-neutral-300 bg-neutral-100 px-3 py-1.5">
      {[
        ["Pen", PenLine, () => setTool("pen")], ["Highlighter", Highlighter, () => setTool("pen")], ["Eraser", Eraser, () => setTool("eraser")], ["Select", MousePointer2, () => {}], ["Text", TextCursorInput, () => {}], ["Ruler", Ruler, () => {}], ["Shapes", Shapes, () => {}], ["Image", Image, () => {}],
      ].map(([label, Icon, action]) => <button key={label as string} onClick={action as () => void} className={`flex items-center gap-1 rounded px-2 py-1 text-[7px] font-bold ${(label === "Pen" && tool === "pen") || (label === "Eraser" && tool === "eraser") ? "bg-black text-white" : "hover:bg-neutral-200"}`}><Icon className="h-3 w-3" />{label as string}</button>)}
      <span className="ml-2 text-[7px] font-bold">Thickness</span>{[1,2,4,7].map(size => <button key={size} onClick={() => setThickness(size)} className={`grid h-5 w-5 place-items-center rounded ${thickness === size ? "bg-neutral-300" : ""}`}><Circle className="fill-black" style={{ width: size + 3, height: size + 3 }} /></button>)}
      <button onClick={clear} className="ml-auto p-1" title="Clear page"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
    <div className="flex min-h-0 flex-1">
      <aside className="w-20 shrink-0 border-r border-neutral-400 bg-neutral-100 p-2"><p className="text-[7px] font-black">PAGES</p><div className="mt-2 space-y-2">{Array.from({ length: pages }, (_, index) => <button key={index} onClick={() => setPage(index + 1)} className={`aspect-[3/4] w-full rounded border bg-white text-[8px] font-bold ${page === index + 1 ? "border-black ring-1 ring-black" : "border-neutral-300"}`}>{index + 1}</button>)}</div><button onClick={() => { setPages(pages + 1); setPage(pages + 1); }} className="mt-2 flex w-full items-center justify-center gap-1 rounded border border-dashed border-neutral-400 py-2 text-[7px] font-bold"><Plus className="h-3 w-3" />Page</button></aside>
      <main className="flex flex-1 items-center justify-center overflow-auto p-4"><div className={`relative aspect-[4/3] h-[95%] max-w-[88%] overflow-hidden border border-neutral-400 shadow-lg ${pagePattern}`} style={{ transform: `scale(${zoom / 100})` }}>
        {template === "Two Column" && <div className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-neutral-300" />}
        {template === "Cornell" && <><div className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-neutral-300" /><div className="pointer-events-none absolute inset-x-0 bottom-20 border-t border-neutral-300" /></>}
        <canvas ref={canvasRef} width={900} height={675} className="absolute inset-0 h-full w-full touch-none cursor-crosshair" onPointerDown={event => { drawing.current = true; last.current = position(event); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (!drawing.current) return; const canvas = event.currentTarget; const context = canvas.getContext("2d"); const next = position(event); if (context) { context.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over"; context.strokeStyle = "#111"; context.lineWidth = tool === "eraser" ? thickness * 5 : thickness; context.lineCap = "round"; context.beginPath(); context.moveTo(last.current.x, last.current.y); context.lineTo(next.x, next.y); context.stroke(); } last.current = next; }} onPointerUp={() => { drawing.current = false; save(); }} />
      </div></main>
    </div>
    <div className="flex items-center justify-between border-t border-neutral-400 bg-white px-3 py-1.5 text-[8px]"><span>Page {page} of {pages}</span><div className="flex items-center gap-2"><button onClick={() => setZoom(Math.max(70, zoom - 10))}><ZoomOut className="h-3.5 w-3.5" /></button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(130, zoom + 10))}><ZoomIn className="h-3.5 w-3.5" /></button><Maximize2 className="h-3.5 w-3.5" /><button onClick={() => go("notes")} className="ml-2 font-bold underline">Done</button></div></div>
  </div>;
}

function PdfScreen({ go }: { go: (screen: ScreenName) => void }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [twoPages, setTwoPages] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const academicPage = (number: number) => <div className="aspect-[3/4] h-full bg-white p-6 shadow"><p className="text-[7px] text-neutral-500">MATHEMATICS · CLASS 10</p><h3 className="mt-3 border-b border-black pb-2 text-sm font-black">{number}. Quadratic Equations</h3><p className="mt-3 text-[8px] leading-4">A quadratic equation in the variable x is an equation of the form ax² + bx + c = 0, where a, b and c are real numbers and a ≠ 0.</p><div className="mt-4 rounded border border-neutral-400 bg-neutral-100 p-3"><b className="text-[8px]">Example {number}</b><p className="mt-1 font-mono text-[8px]">x² − 5x + 6 = 0<br />(x − 2)(x − 3) = 0</p></div><p className="mt-4 text-[8px] leading-4">Therefore, the roots of the equation are 2 and 3. Verify by substituting each value in the original equation.</p><div className="mt-5 h-px bg-neutral-300" /><p className="mt-3 text-[8px] font-bold">Exercise</p><p className="mt-2 text-[8px]">Solve by factorisation: 2x² − 7x + 3 = 0</p></div>;
  return <div className="flex h-full flex-col bg-neutral-200"><div className="flex items-center gap-2 border-b border-neutral-400 bg-white px-3 py-2"><button onClick={() => go("home")}><ArrowLeft className="h-4 w-4" /></button><FileText className="h-4 w-4" /><b className="text-[9px]">Quadratic Equations — Chapter PDF</b><span className="ml-auto text-[8px]">Page {page} of 12</span><BatteryMedium className="h-4 w-4" /></div>
    <div className="flex items-center gap-1 border-b border-neutral-300 bg-neutral-100 px-3 py-1.5 text-[7px] font-bold"><button onClick={() => setTwoPages(false)} className={`rounded px-2 py-1 ${!twoPages ? "bg-black text-white" : ""}`}>Single Page</button><button onClick={() => setTwoPages(true)} className={`rounded px-2 py-1 ${twoPages ? "bg-black text-white" : ""}`}>Two Pages</button><span className="mx-2 h-4 w-px bg-neutral-300" /><button onClick={() => setZoom(Math.max(70, zoom - 10))}><ZoomOut className="h-3.5 w-3.5" /></button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(140, zoom + 10))}><ZoomIn className="h-3.5 w-3.5" /></button><button onClick={() => setBookmarked(!bookmarked)} className={`ml-2 flex items-center gap-1 rounded px-2 py-1 ${bookmarked ? "bg-black text-white" : ""}`}><Bookmark className="h-3 w-3" />Bookmark</button><button className="flex items-center gap-1 px-2"><NotebookPen className="h-3 w-3" />Add Note</button><button className="flex items-center gap-1 px-2"><Highlighter className="h-3 w-3" />Highlight</button><button className="flex items-center gap-1 px-2"><TextCursorInput className="h-3 w-3" />Text Selection</button><MoreHorizontal className="ml-auto h-4 w-4" /></div>
    <div className="flex min-h-0 flex-1"><aside className="w-20 overflow-y-auto border-r border-neutral-400 bg-neutral-100 p-2">{Array.from({ length: 6 }, (_, index) => <button key={index} onClick={() => setPage(index + 1)} className={`mb-2 aspect-[3/4] w-full border bg-white text-[7px] ${page === index + 1 ? "border-black ring-1 ring-black" : "border-neutral-300"}`}>Page {index + 1}</button>)}</aside><main className="flex flex-1 items-center justify-center gap-3 overflow-auto p-4"><div className="h-[95%]" style={{ transform: `scale(${zoom / 100})` }}>{academicPage(page)}</div>{twoPages && <div className="h-[95%]" style={{ transform: `scale(${zoom / 100})` }}>{academicPage(page + 1)}</div>}</main></div>
    <div className="flex items-center justify-center gap-4 border-t border-neutral-400 bg-white py-2 text-[8px]"><button disabled={page === 1} onClick={() => setPage(page - 1)} className="flex items-center gap-1 disabled:opacity-30"><ChevronLeft className="h-3 w-3" />Previous</button><label className="flex items-center gap-2">Go to page <input value={page} onChange={event => setPage(Math.min(12, Math.max(1, Number(event.target.value))))} className="w-10 rounded border border-neutral-300 px-2 py-1" /></label><button disabled={page === 12} onClick={() => setPage(page + 1)} className="flex items-center gap-1 disabled:opacity-30">Next<ChevronRight className="h-3 w-3" /></button></div>
  </div>;
}

function LibraryScreen({ go }: { go: (screen: ScreenName) => void }) {
  const [selectedClass, setSelectedClass] = useState(10);
  const [subject, setSubject] = useState("");
  const subjects = subjectsData[selectedClass];
  const chapterCount = (name: string) => {
    const parts = getSubjectParts(name, selectedClass);
    return parts ? parts.reduce((total, part) => total + getChapters(name, selectedClass, part).length, 0) : getChapters(name, selectedClass).length;
  };
  return <div className="flex h-full bg-neutral-100"><SideNav active="library" go={go} /><main className="min-w-0 flex-1 overflow-auto p-4"><div className="flex items-end justify-between"><div><p className="text-[8px] font-bold tracking-wider text-neutral-500">STUDY LIBRARY</p><h3 className="mt-1 text-xl font-black">Class resources</h3></div><div className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white p-1">{classes.map(item => <button key={item} onClick={() => { setSelectedClass(item); setSubject(""); }} className={`rounded px-2 py-1 text-[7px] font-bold ${selectedClass === item ? "bg-black text-white" : ""}`}>{item}</button>)}</div></div>
    <h4 className="mt-5 text-[9px] font-black">Class {selectedClass} Subjects</h4><div className="mt-2 grid grid-cols-5 gap-2">{subjects.slice(0, selectedClass >= 11 ? 10 : 5).map((item, index) => <button key={item} onClick={() => setSubject(item)} className={`rounded-lg border p-3 text-left ${subject === item ? "border-black bg-neutral-200" : "border-neutral-300 bg-white"}`}><span className="grid h-7 w-7 place-items-center rounded-full border border-neutral-400 text-[10px] font-black">{String.fromCharCode(65 + index)}</span><p className="mt-4 truncate text-[9px] font-black">{item}</p><p className="mt-1 text-[7px] text-neutral-500">{chapterCount(item)} connected chapters</p></button>)}</div>
    <div className="mt-5 grid grid-cols-[1.3fr_.7fr] gap-3"><section className="rounded-lg border border-neutral-300 bg-white p-4"><div className="flex items-center justify-between"><h4 className="text-[9px] font-black">{subject || "Select a subject"}</h4>{subject && <button onClick={() => go("pdf")} className="text-[8px] font-bold underline">Open reader</button>}</div>{subject ? <div className="mt-3 grid grid-cols-4 gap-2">{Array.from({ length: Math.min(4, chapterCount(subject)) }, (_, index) => <button key={index} onClick={() => go("pdf")} className="aspect-[3/4] rounded border border-neutral-300 bg-neutral-100 p-2 text-left"><BookOpen className="h-4 w-4" /><p className="mt-7 text-[7px] font-bold">Chapter {index + 1}</p><p className="mt-1 text-[6px] text-neutral-500">Connected project resource</p></button>)}</div> : <p className="mt-4 text-[8px] text-neutral-500">Choose a subject to view resources already connected in Edvora.</p>}</section><section className="rounded-lg border border-neutral-300 bg-white p-4"><h4 className="text-[9px] font-black">Quick Resources</h4><div className="mt-3 space-y-2">{[["Recent PDF", FileText],["My Downloads", Download],["Local Files", FolderOpen]].map(([label, Icon]) => <button key={label as string} onClick={() => go("pdf")} className="flex w-full items-center gap-2 rounded border border-neutral-200 p-2 text-left text-[8px] font-bold"><Icon className="h-3.5 w-3.5" />{label as string}<ChevronRight className="ml-auto h-3 w-3" /></button>)}</div></section></div>
  </main></div>;
}

function TabletDemo() {
  const [screen, setScreen] = useState<ScreenName>("home");
  const [template, setTemplate] = useState<TemplateName>("Ruled");
  const index = screenList.findIndex(item => item.id === screen);
  const render = () => {
    if (screen === "startup") return <StartupScreen />;
    if (screen === "home") return <HomeScreen go={setScreen} />;
    if (screen === "notes") return <NotesScreen go={setScreen} />;
    if (screen === "templates") return <TemplatesScreen go={setScreen} choose={value => { setTemplate(value); setScreen("notebook"); }} />;
    if (screen === "notebook") return <NotebookScreen template={template} go={setScreen} />;
    if (screen === "pdf") return <PdfScreen go={setScreen} />;
    return <LibraryScreen go={setScreen} />;
  };
  return <div className="grid gap-7 lg:grid-cols-[250px_1fr]">
    <div className="space-y-2">{screenList.map((item, number) => <button key={item.id} onClick={() => setScreen(item.id)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${screen === item.id ? "border-white bg-white text-black" : "border-white/15 text-neutral-400 hover:border-white/40 hover:text-white"}`}><span className="font-mono text-xs opacity-50">0{number + 1}</span>{item.label}</button>)}</div>
    <div>
      <div className="relative rounded-[38px] border border-neutral-700 bg-[#090909] p-3 shadow-[0_40px_90px_rgba(0,0,0,.55)] md:p-5">
        <div className="absolute left-1/2 top-2 z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-700 bg-neutral-950" />
        <div className="aspect-[16/10] overflow-hidden rounded-[24px] border border-neutral-700 bg-white text-black">{render()}</div>
        <div className="absolute -right-1 top-24 h-12 w-1 rounded-r bg-neutral-600" />
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-neutral-500"><button onClick={() => setScreen(screenList[(index + screenList.length - 1) % screenList.length].id)} className="flex items-center gap-1 hover:text-white"><ChevronLeft className="h-4 w-4" />Previous</button><span>Interactive website demonstration · not physical hardware</span><button onClick={() => setScreen(screenList[(index + 1) % screenList.length].id)} className="flex items-center gap-1 hover:text-white">Next<ChevronRight className="h-4 w-4" /></button></div>
    </div>
  </div>;
}

const faqs = [
  ["Is Infinity Slate available to purchase?", "No. Infinity Slate is currently an Edvora concept and interactive website demonstration, not a commercially verified device."],
  ["Is the 35-hour battery life tested?", "No. Thirty-five hours is a design target only. Battery performance has not been tested or independently verified."],
  ["Would the Basic edition connect to the internet?", "The Basic concept is offline-first and distraction-minimised. USB-C or external storage transfer remains a proposed capability."],
  ["Are resources preloaded?", "Preloaded educational resources are proposed only where permissions allow. The website demo uses existing Edvora resource metadata without claiming bundled content."],
  ["How would parental controls work?", "The Pro concept proposes a transparent two-step parent authentication and approval flow. It has not been implemented in physical hardware."],
];

export function InfinitySlatePage() {
  const [edition, setEdition] = useState<"basic" | "pro">("basic");
  const [openFaq, setOpenFaq] = useState(0);
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <div className="bg-black pt-[72px] text-white">
    <div className="sticky top-[72px] z-30 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6 py-3"><SlateLogo />{[["Overview","overview"],["Features","features"],["Basic vs Pro","editions"],["Interface Showcase","interface"],["Specifications","specifications"],["FAQs","faqs"]].map(([label,id]) => <button key={id} onClick={() => scroll(id)} className="shrink-0 text-xs font-bold text-neutral-400 hover:text-white">{label}</button>)}</div>
    </div>

    <section id="overview" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl text-center"><p className="text-xs font-bold tracking-[.3em] text-neutral-500">A PRODUCT CONCEPT BY EDVORA</p><InfinityIcon className="mx-auto mt-8 h-20 w-20" strokeWidth={1} /><h1 className="mt-6 text-6xl font-black tracking-[-.06em] md:text-8xl">INFINITY SLATE</h1><h2 className="mt-6 text-2xl font-semibold text-neutral-300 md:text-4xl">Your Learning. Your Space. Your Infinity.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-400">A focused digital study companion designed to bring notes, books, PDFs and learning resources together.</p><button onClick={() => scroll("interface")} className="mt-9 rounded-full bg-white px-7 py-4 font-bold text-black hover:bg-neutral-200">Explore the interface</button>
        <div className="mx-auto mt-20 max-w-5xl rotate-[1deg]"><div className="rounded-[44px] border border-neutral-700 bg-[#080808] p-5 shadow-[0_50px_100px_rgba(255,255,255,.07)]"><div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-neutral-100 text-black"><div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-black" /><HomeScreen go={() => {}} /></div></div></div>
        <p className="mt-6 text-xs text-neutral-600">Concept render · interface and physical design are not final hardware specifications</p>
      </div>
    </section>

    <section id="features" className="bg-neutral-100 px-6 py-24 text-black"><div className="mx-auto max-w-7xl"><p className="text-xs font-black tracking-[.22em] text-neutral-500">STUDY-FIRST BY DESIGN</p><h2 className="mt-4 max-w-3xl text-5xl font-black tracking-tight">A quiet place for notes, reading and organised learning.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-300 md:grid-cols-2 lg:grid-cols-3">{[
      ["Local resource organisation", FolderOpen, "Keep notes, files and permitted learning material organised on the device."],
      ["Preloaded resources", BookOpen, "Proposed educational resources, subject to content permissions and licensing."],
      ["Distraction-minimised", WifiOff, "A monochrome, offline-first Basic concept built around focused study."],
      ["Two-step parent approval", ShieldCheck, "A proposed transparent authentication and approval flow for connected features."],
      ["35-hour target", Clock3, "A design target only—not tested, measured or independently verified performance."],
      ["File transfer concept", Usb, "Proposed USB-C or external-storage workflows for supported local files."],
    ].map(([title, Icon, copy]) => <div key={title as string} className="bg-white p-7"><Icon className="h-7 w-7" /><h3 className="mt-12 text-xl font-black">{title as string}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{copy as string}</p></div>)}</div></div></section>

    <section id="editions" className="px-6 py-24"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-xs font-bold tracking-[.22em] text-neutral-500">BASIC VS PRO</p><h2 className="mt-4 text-5xl font-black">Two proposed directions.</h2><div className="mx-auto mt-8 flex w-fit rounded-full border border-white/15 p-1"><button onClick={() => setEdition("basic")} className={`rounded-full px-6 py-2 text-sm font-bold ${edition === "basic" ? "bg-white text-black" : "text-neutral-400"}`}>Basic</button><button onClick={() => setEdition("pro")} className={`rounded-full px-6 py-2 text-sm font-bold ${edition === "pro" ? "bg-white text-black" : "text-neutral-400"}`}>Pro</button></div></div>
      <div className="mt-10 grid gap-10 rounded-[36px] border border-white/15 bg-neutral-950 p-8 md:p-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="text-xs font-bold tracking-[.2em] text-neutral-500">INFINITY SLATE</span><h3 className="mt-3 text-6xl font-black">{edition.toUpperCase()}</h3><p className="mt-5 text-lg leading-8 text-neutral-400">{edition === "basic" ? "Monochrome, offline-first and deliberately focused." : "A colour, internet-enabled concept with extended Edvora integration."}</p>{edition === "basic" ? <WifiOff className="mt-12 h-12 w-12" /> : <Wifi className="mt-12 h-12 w-12" />}</div><div className="grid gap-3 sm:grid-cols-2">{(edition === "basic" ? ["Monochrome interface concept","Offline-first experience","Digital notebook","Notes and folders","PDF reader","Local study library","Proposed USB-C transfer","Distraction-minimised design"] : ["Colour display concept","Internet-enabled resources","Extended Edvora integration","Additional learning tools","Enhanced study experience","Controlled connected features"]).map(item => <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold"><Check className="mt-0.5 h-4 w-4 shrink-0" />{item}</div>)}</div></div>
    </div></section>

    <section id="interface" className="border-y border-white/10 bg-[#080808] px-6 py-24"><div className="mx-auto max-w-[1450px]"><p className="text-xs font-bold tracking-[.22em] text-neutral-500">INTERACTIVE INTERFACE SHOWCASE</p><h2 className="mt-4 max-w-4xl text-5xl font-black tracking-tight">Seven monochrome study interfaces, recreated as a working demo.</h2><p className="mt-5 max-w-2xl leading-7 text-neutral-400">Switch screens, create notes, choose templates, draw on the notebook, change PDF pages and browse existing Edvora class metadata.</p><div className="mt-12"><TabletDemo /></div></div></section>

    <section id="specifications" className="bg-white px-6 py-24 text-black"><div className="mx-auto max-w-6xl"><p className="text-xs font-black tracking-[.22em] text-neutral-500">CONCEPT STATUS</p><h2 className="mt-4 text-5xl font-black">Clear about what is—and is not—verified.</h2><div className="mt-10 overflow-x-auto rounded-3xl border border-neutral-300"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-black text-white"><th className="p-5">Area</th><th className="p-5">Basic direction</th><th className="p-5">Pro direction</th><th className="p-5">Current status</th></tr></thead><tbody>{[
      ["Display","Monochrome concept","Colour concept","Not final or verified"],
      ["Connectivity","Offline-first","Internet-enabled resources","Prototype-stage direction"],
      ["Notebook & PDF","Interactive website demonstration","Extended tools proposed","Physical implementation unverified"],
      ["File transfer","USB-C/external storage proposed","Connected transfer proposed","Not hardware tested"],
      ["Battery","35-hour design target","To be determined","Target only; not tested"],
      ["Parental controls","Not required for offline use","Two-step approval concept","Concept only"],
    ].map(row => <tr key={row[0]} className="border-t border-neutral-300">{row.map((cell,index) => <td key={cell} className={`p-5 ${index === 0 ? "font-black" : "text-neutral-600"}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>

    <section id="faqs" className="bg-neutral-100 px-6 py-24 text-black"><div className="mx-auto max-w-4xl"><p className="text-xs font-black tracking-[.22em] text-neutral-500">QUESTIONS &amp; ANSWERS</p><h2 className="mt-4 text-5xl font-black">Infinity Slate FAQs</h2><div className="mt-10 divide-y divide-neutral-300 border-y border-neutral-300">{faqs.map(([question,answer],index) => <div key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-black">{question}<ChevronDown className={`h-5 w-5 transition ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="max-w-2xl pb-6 text-sm leading-7 text-neutral-600">{answer}</p>}</div>)}</div></div></section>

    <section className="px-6 py-28 text-center"><InfinityIcon className="mx-auto h-14 w-14" strokeWidth={1} /><h2 className="mt-7 text-5xl font-black">Your Learning. Your Space. Your Infinity.</h2><p className="mx-auto mt-5 max-w-2xl text-neutral-500">Infinity Slate remains a concept/demo prototype. It is not commercially verified hardware.</p><button onClick={() => scroll("overview")} className="mt-8 rounded-full bg-white px-7 py-4 font-bold text-black">Back to overview</button></section>
  </div>;
}
