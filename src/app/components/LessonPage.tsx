import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Trash2,
  Video,
  Wrench,
} from "lucide-react";
import type { Course, Lesson, Module } from "../data/courseContent";

interface LessonPageProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  onBack: () => void;
}

type Language = "python" | "javascript" | "html" | "css";
type RunState = "idle" | "loading" | "success" | "error" | "timeout";

const starters: Record<Language, string> = {
  python: `print("Welcome to Edvora!")\nprint(10 + 20)`,
  javascript: `console.log("Welcome to Edvora!");\nconsole.log(10 + 20);`,
  html: `<main class="lesson-card">\n  <h1>Welcome to Edvora!</h1>\n  <p>Edit this page and run your code.</p>\n  <button>Start learning</button>\n</main>`,
  css: `.lesson-card {\n  max-width: 420px;\n  margin: 32px auto;\n  padding: 28px;\n  border: 2px solid #2563eb;\n  border-radius: 18px;\n  font-family: system-ui, sans-serif;\n}\n\nh1 { color: #2563eb; }\nbutton {\n  background: #f97316;\n  color: white;\n  border: 0;\n  padding: 10px 16px;\n  border-radius: 9px;\n}`,
};

const cssPreviewMarkup = `<main class="lesson-card"><h1>Welcome to Edvora!</h1><p>Your CSS changes appear here.</p><button>Start learning</button></main>`;

function highlight(code: string, language: Language) {
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let value = escape(code);
  if (language === "html") {
    return value
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="text-rose-300">$2</span>')
      .replace(/([\w-]+)=(&quot;|")([^"]*)(&quot;|")/g, '<span class="text-cyan-300">$1</span>=<span class="text-amber-300">"$3"</span>');
  }
  value = value
    .replace(/("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/g, '<span class="text-amber-300">$1</span>')
    .replace(/\b(const|let|var|function|return|if|else|for|while|class|new|print|def|import|from|as|True|False|None)\b/g, '<span class="text-violet-300">$1</span>')
    .replace(/(#[^\n]*|\/\/[^\n]*)/g, '<span class="text-slate-500">$1</span>');
  if (language === "css") {
    value = value.replace(/([\w-]+)(\s*:)/g, '<span class="text-cyan-300">$1</span>$2');
  }
  return value;
}

function makeJavaScriptWorker() {
  const source = `
    const SafeFunction = Function;
    self.fetch = undefined;
    self.XMLHttpRequest = undefined;
    self.WebSocket = undefined;
    self.EventSource = undefined;
    self.importScripts = undefined;
    self.Worker = undefined;
    const format = (value) => {
      try { return typeof value === "string" ? value : JSON.stringify(value); }
      catch { return String(value); }
    };
    self.onmessage = ({ data }) => {
      const lines = [];
      const console = {
        log: (...args) => lines.push(args.map(format).join(" ")),
        error: (...args) => lines.push(args.map(format).join(" ")),
        warn: (...args) => lines.push(args.map(format).join(" ")),
      };
      try {
        if (/\\b(importScripts|fetch|XMLHttpRequest|WebSocket|EventSource)\\b|import\\s*\\(/.test(data.code)) {
          throw new Error("Network and module loading APIs are disabled in this learning sandbox.");
        }
        SafeFunction("console", '"use strict";\\n' + data.code)(console);
        self.postMessage({ ok: true, output: lines.join("\\n") });
      } catch (error) {
        self.postMessage({ ok: false, output: error.name + ": " + error.message });
      }
    };
  `;
  return new Worker(URL.createObjectURL(new Blob([source], { type: "text/javascript" })));
}

function makePythonWorker() {
  const source = `
    let runtimePromise;
    async function loadRuntime() {
      if (!runtimePromise) {
        runtimePromise = (async () => {
          importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js");
          const runtime = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"
          });
          self.fetch = undefined;
          self.XMLHttpRequest = undefined;
          self.WebSocket = undefined;
          self.EventSource = undefined;
          self.Worker = undefined;
          self.eval = undefined;
          return runtime;
        })();
      }
      return runtimePromise;
    }
    self.onmessage = async ({ data }) => {
      try {
        self.postMessage({ type: "loading" });
        const runtime = await loadRuntime();
        self.postMessage({ type: "ready" });
        const lines = [];
        runtime.setStdout({ batched: (value) => lines.push(value) });
        runtime.setStderr({ batched: (value) => lines.push(value) });
        const result = await runtime.runPythonAsync(data.code);
        if (result !== undefined && result !== null) lines.push(String(result));
        self.postMessage({ ok: true, output: lines.join("\\n") });
      } catch (error) {
        self.postMessage({ ok: false, output: error.name + ": " + error.message });
      }
    };
  `;
  return new Worker(URL.createObjectURL(new Blob([source], { type: "text/javascript" })));
}

export function LessonPage({ course, module, lesson, onBack }: LessonPageProps) {
  const coding = ["python", "data-science", "web-development"].includes(course.id);
  const initialLanguage: Language =
    course.id === "python" ? "python" : course.id === "web-development" ? "html" : "javascript";
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [codes, setCodes] = useState<Record<Language, string>>(starters);
  const [output, setOutput] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [mobileTab, setMobileTab] = useState<"lesson" | "practice">("lesson");
  const [expanded, setExpanded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const code = codes[language];

  useEffect(() => () => {
    workerRef.current?.terminate();
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const preview = useMemo(() => {
    if (language === "html") return code;
    if (language === "css") return `<!doctype html><style>${code}</style>${cssPreviewMarkup}`;
    return "";
  }, [code, language]);

  const finishRun = (state: RunState, text: string) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    workerRef.current?.terminate();
    workerRef.current = null;
    setRunState(state);
    setOutput(text);
  };

  const runCode = () => {
    if (language === "html" || language === "css") {
      setRunState("success");
      setOutput("Preview rendered successfully.\n\nExecution completed successfully.");
      return;
    }
    setRunState("loading");
    setOutput(language === "python" ? "Loading the Python runtime…" : "Executing in an isolated worker…");
    const worker = language === "python" ? makePythonWorker() : makeJavaScriptWorker();
    workerRef.current = worker;
    worker.onmessage = ({ data }: MessageEvent<{ type?: string; ok: boolean; output: string }>) => {
      if (data.type === "loading") {
        setOutput("Loading Pyodide in an isolated browser worker…");
        return;
      }
      if (data.type === "ready") {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setOutput("Python runtime ready. Executing your program…");
        timeoutRef.current = window.setTimeout(
          () => finishRun("timeout", "Execution stopped after 10 seconds.\n\nPossible infinite loop or long-running program."),
          10_000,
        );
        return;
      }
      finishRun(
        data.ok ? "success" : "error",
        `${data.output || "(No program output)"}\n\n${data.ok ? "Execution completed successfully." : "Execution failed."}`,
      );
    };
    worker.onerror = (event) => finishRun("error", `${event.message}\n\nExecution failed.`);
    worker.postMessage({ code });
    timeoutRef.current = window.setTimeout(
      () => finishRun("timeout", language === "python" ? "Python runtime loading timed out after 60 seconds. Check the network connection and try again." : "Execution stopped after 10 seconds.\n\nPossible infinite loop or long-running program."),
      language === "python" ? 60_000 : 10_000,
    );
  };

  const setCode = (value: string) => setCodes((current) => ({ ...current, [language]: value }));
  const presentationUrl = lesson.presentationUrl.trim();

  return (
    <div className="min-h-screen bg-slate-950 pt-[72px] text-white">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4">
          <button onClick={onBack} className="rounded-lg p-2 hover:bg-white/10" aria-label="Back to course"><ArrowLeft /></button>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-blue-300">{course.title} · {module.title}</p>
            <h1 className="truncate font-bold">{lesson.title}</h1>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{lesson.duration}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] border-b border-white/10 p-3 lg:hidden">
        <button onClick={() => setMobileTab("lesson")} className={`flex-1 rounded-lg py-2 font-bold ${mobileTab === "lesson" ? "bg-blue-600" : ""}`}>Lecture</button>
        <button onClick={() => setMobileTab("practice")} className={`flex-1 rounded-lg py-2 font-bold ${mobileTab === "practice" ? "bg-blue-600" : ""}`}>Practice</button>
      </div>

      <div className={`mx-auto grid max-w-[1500px] ${coding ? "lg:grid-cols-2" : "lg:grid-cols-[1.15fr_.85fr]"}`}>
        <section className={`${mobileTab !== "lesson" ? "hidden lg:block" : ""} border-r border-white/10 p-5 md:p-8`}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
            <div className="aspect-video">
              {lesson.videoUrl ? (
                <video
                  src={lesson.videoUrl}
                  controls
                  className="h-full w-full"
                  onTimeUpdate={(event) => {
                    const player = event.currentTarget;
                    setVideoProgress(player.duration ? (player.currentTime / player.duration) * 100 : 0);
                  }}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-600"><Video /></span>
                  <h2 className="mt-5 text-xl font-bold">Lecture video coming soon</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">A connected lesson video will play here with native playback controls.</p>
                </div>
              )}
            </div>
            <div className="h-1 bg-white/10"><div className="h-full bg-blue-500 transition-all" style={{ width: `${videoProgress}%` }} /></div>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-blue-300">CURRENT CHAPTER</p>
              <h2 className="mt-2 text-2xl font-extrabold">{lesson.title.replace("1.1 — ", "")}</h2>
              <p className="mt-2 text-sm text-slate-400">{module.title}</p>
            </div>
            <div className="flex gap-2">
              <button disabled className="rounded-lg border border-white/10 p-2 opacity-40" aria-label="Previous chapter"><ChevronLeft /></button>
              <button disabled className="rounded-lg border border-white/10 p-2 opacity-40" aria-label="Next chapter"><ChevronRight /></button>
            </div>
          </div>
          <p className="mt-5 leading-7 text-slate-300">{course.description}</p>
          {presentationUrl && (
            <a href={presentationUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950">
              <FileText className="h-4 w-4" /> Open connected material
            </a>
          )}
        </section>

        <section className={`${mobileTab !== "practice" ? "hidden lg:block" : ""} ${expanded ? "fixed inset-0 z-[100] overflow-y-auto" : "min-h-[760px]"} bg-[#0c1325] p-4 md:p-6`}>
          {coding ? (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2"><Code2 className="text-cyan-300" /><h2 className="font-bold">Practice workspace</h2></div>
                <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="ml-auto rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" aria-label="Programming language">
                  <option className="text-slate-900" value="python">Python</option>
                  <option className="text-slate-900" value="javascript">JavaScript</option>
                  <option className="text-slate-900" value="html">HTML</option>
                  <option className="text-slate-900" value="css">CSS</option>
                </select>
                <button onClick={() => setCode(starters[language])} className="rounded-lg p-2 hover:bg-white/10" aria-label="Reset code"><RotateCcw className="h-4 w-4" /></button>
                <button onClick={() => setExpanded(!expanded)} className="rounded-lg p-2 hover:bg-white/10" aria-label={expanded ? "Collapse editor" : "Expand editor"}>
                  {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>

              <div className="relative mt-4 min-h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-[#080d19]">
                <div className="absolute inset-y-0 left-0 w-12 select-none border-r border-white/5 py-4 pr-3 text-right font-['DM_Mono'] text-sm leading-6 text-slate-600">
                  {code.split("\n").map((_, index) => <div key={index}>{index + 1}</div>)}
                </div>
                <pre
                  aria-hidden
                  className="pointer-events-none absolute inset-0 ml-12 overflow-hidden whitespace-pre-wrap break-words p-4 font-['DM_Mono'] text-sm leading-6 text-slate-200"
                  dangerouslySetInnerHTML={{ __html: highlight(code, language) + "\n" }}
                />
                <textarea
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Tab") {
                      event.preventDefault();
                      const target = event.currentTarget;
                      const next = `${code.slice(0, target.selectionStart)}  ${code.slice(target.selectionEnd)}`;
                      const cursor = target.selectionStart + 2;
                      setCode(next);
                      requestAnimationFrame(() => target.setSelectionRange(cursor, cursor));
                    }
                  }}
                  spellCheck={false}
                  className="absolute inset-0 ml-12 h-full w-[calc(100%-3rem)] resize-none bg-transparent p-4 font-['DM_Mono'] text-sm leading-6 text-transparent caret-white outline-none selection:bg-blue-500/50"
                  aria-label="Code editor"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={runCode} disabled={runState === "loading"} className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-300 disabled:cursor-wait disabled:opacity-70">
                  {runState === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  {runState === "loading" ? "Running…" : "Run Code"}
                </button>
                <button onClick={() => setCode(starters[language])} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/5"><RotateCcw className="h-4 w-4" /> Reset Code</button>
                <button onClick={() => { setOutput(""); setRunState("idle"); }} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/5"><Trash2 className="h-4 w-4" /> Clear Output</button>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <p className="text-xs font-bold tracking-wider text-slate-400">LIVE OUTPUT</p>
                  <span className={`flex items-center gap-2 text-xs font-bold ${
                    runState === "success" ? "text-emerald-300" :
                    runState === "error" || runState === "timeout" ? "text-rose-300" :
                    runState === "loading" ? "text-amber-300" : "text-slate-500"
                  }`}>
                    {runState === "loading" && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
                    {runState === "idle" ? "Ready" : runState === "loading" ? "Executing" : runState === "success" ? "Completed" : runState === "timeout" ? "Timed out" : "Error"}
                  </span>
                </div>
                <pre className={`min-h-32 whitespace-pre-wrap p-4 font-['DM_Mono'] text-sm leading-6 ${
                  runState === "error" || runState === "timeout" ? "text-rose-300" : "text-emerald-300"
                }`}>{output || "Program output will appear here."}</pre>
                {(language === "html" || language === "css") && (
                  <iframe
                    sandbox=""
                    srcDoc={preview}
                    title={`${language.toUpperCase()} live preview`}
                    className="h-64 w-full border-t border-white/10 bg-white"
                  />
                )}
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Python runs with Pyodide inside a disposable Web Worker. JavaScript runs in a network-disabled Worker. HTML and CSS render in a sandboxed, opaque-origin iframe. Executions stop automatically after 10 seconds.
              </p>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-3"><Wrench className="text-orange-300" /><h2 className="text-xl font-bold">Practical assignment</h2></div>
              <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="text-xs font-bold tracking-wider text-orange-300">TODAY&apos;S PRACTICE</p>
                <h3 className="mt-3 text-2xl font-bold">{course.id === "graphic-design" ? "Create a clear visual hierarchy" : course.id === "video-editing" ? "Plan a 30-second story sequence" : "Rewrite a message for clarity"}</h3>
                <p className="mt-4 leading-7 text-slate-300">Define the audience and intended result. Create a first version, review it against clarity and purpose, then make one deliberate improvement.</p>
                <textarea className="mt-6 min-h-56 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Draft your response, project plan or reflection here…" />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
