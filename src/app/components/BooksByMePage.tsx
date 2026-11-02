import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, Moon, Minus, Plus, Sun, Target, X } from "lucide-react";

type Chapter = { title: string; focus: string; example: string; activity: string; insight: string; checklist: string[]; reflection: string[] };
type Book = { id: string; title: string; subtitle: string; intro: string; color: string; accent: string; chapters: Chapter[] };

const topics = {
  smart: [
    ["Understanding How You Learn","Learning improves when you notice which actions help you retrieve and apply ideas—not simply reread them.","After reading a science section, close the book and explain the process in your own words.","Make a two-column list: strategies that help you learn and strategies that only feel busy."],
    ["Creating a Realistic Study Routine","A useful routine is repeatable on ordinary days. Start with fixed commitments, then protect short focused blocks.","Instead of planning four hours every night, schedule two 35-minute blocks around dinner and schoolwork.","Build tomorrow’s routine using one priority task, one review task and one buffer."],
    ["Active Recall","Active recall means bringing information to mind without looking. The effort strengthens memory and reveals gaps.","Turn the heading “Photosynthesis” into the question “What inputs and outputs define photosynthesis?”","Write five questions from today’s lesson and answer them without notes."],
    ["Spaced Revision","Spacing revisits across several days beats one long review because some forgetting makes retrieval useful.","Review a chapter after one day, three days, one week and two weeks.","Choose one old topic and add four revision dates to your calendar."],
    ["Note-making","Good notes transform ideas. They use structure, questions, examples and links instead of copying every sentence.","Reduce a page of history into a timeline, three causes and one consequence.","Rewrite one page of notes as a one-page map with headings and arrows."],
    ["Managing Distractions","Focus is easier when the environment makes the right action obvious and the distracting action inconvenient.","Keep only the book, notebook and water on your desk; place the phone outside reach.","Run one 25-minute focus block and record every distraction without acting on it."],
    ["Preparing for Examinations","Preparation works best as a cycle: map the syllabus, retrieve, practise under conditions, then correct.","Use a past question to identify whether the gap is knowledge, interpretation or time management.","Create a seven-day plan that alternates recall, mixed practice and correction."],
    ["Learning from Mistakes","A mistake becomes useful when you name its cause and change the next attempt.","Label an error as concept, calculation, reading, memory or time pressure.","Start an error log with the question, cause, correction and prevention step."],
    ["Setting Academic Goals","A strong academic goal describes a result you can influence and the weekly behaviour that supports it. Separate outcome goals, such as improving a grade, from process goals, such as completing three retrieval sessions.","Instead of “get better at maths”, choose “solve and correct twelve algebra problems on Monday, Wednesday and Saturday”.","Write one outcome goal and two process goals for the next four weeks."],
    ["Understanding Difficult Subjects","Difficulty is information. Break a difficult subject into vocabulary, core ideas, worked examples and independent practice so you can locate the real barrier.","If electricity feels confusing, first check whether the problem is units, circuit symbols, the formula or applying it to a question.","Choose one difficult topic and build a four-step learning ladder from basics to exam questions."],
    ["Revision Techniques","Revision should change format: recall from memory, mix question types, explain aloud and practise under time limits. Variety prevents familiarity from being mistaken for mastery.","Turn a textbook page into a blank-page recall, then a diagram, then three exam-style questions.","Create a revision menu with one verbal, one written and one timed method."],
    ["Building Consistency","Consistency is not a perfect streak. It is a system for returning quickly after disruption, using a minimum version of the habit on difficult days.","Your normal session may be 35 minutes, but your minimum session can be five questions or ten minutes of recall.","Define the normal and minimum version of your main study habit."],
    ["Weekly Study Planning","A weekly plan should balance new learning, review, practice and recovery. Plan outcomes first, then assign realistic blocks around fixed commitments.","Place three priority outcomes across the week and leave Friday evening as a catch-up buffer.","Complete a weekly map with priorities, fixed events, study blocks and one buffer."],
    ["Practical Study Exercises","Small experiments help you discover what genuinely improves your learning. Test one method, collect evidence and keep only what helps.","Compare twenty minutes of rereading with twenty minutes of closed-book recall, then test yourself the next day.","Run a seven-day study experiment and record method, effort, score and lesson learned."],
  ],
  time: [
    ["Understanding Daily Time Usage","You cannot plan time you have not observed. A simple time log exposes hidden transitions and over-optimistic estimates.","A “quick break” may become 35 minutes; measuring it helps you plan honestly.","Track one weekday in 30-minute blocks without judging it."],
    ["Setting Priorities","Priority is about consequence and timing, not just urgency. Choose what moves important work forward.","A project due Friday may deserve attention before a small worksheet due tomorrow.","Sort today’s tasks into must, should and could."],
    ["Creating a Timetable","A timetable should include work, rest, travel and buffers. Empty space is part of a reliable plan.","Place demanding work during your strongest attention period and routine tasks later.","Draft a timetable with at least two 15-minute buffers."],
    ["Balancing School and Self-study","Self-study should process school learning through review and practice, not repeat the full school day.","Use a short same-day review, then schedule deeper practice on alternate days.","Choose one subject for same-day review and one for weekend consolidation."],
    ["Managing Deadlines","Break outcomes into visible next actions and set a personal deadline before the real one.","For a presentation: research, outline, draft slides, rehearse and refine.","Reverse-plan one deadline into four dated actions."],
    ["Avoiding Procrastination","Procrastination often protects us from uncertainty or discomfort. Shrink the start until it feels safe.","Open the document and write only the heading; momentum can follow action.","Use a five-minute start on the task you have delayed most."],
    ["Planning Weekly Goals","Weekly planning connects daily choices to bigger outcomes while allowing adjustment.","Choose three weekly outcomes, then place their next actions on specific days.","Write three outcomes and define what “done” looks like."],
    ["Building Consistent Habits","Consistency grows from cues, small actions and visible completion—not motivation alone.","After dinner, review flashcards for ten minutes and mark the habit tracker.","Attach one useful study habit to an existing routine."],
    ["Understanding Time Management","Time management is really attention and commitment management. A realistic plan accepts that energy changes and every task takes space from something else.","A student who schedules rest and travel will usually complete more than one who fills every minute with idealised study.","Write what you want your time to protect: learning, sleep, relationships, movement and rest."],
    ["Identifying Time-wasting Habits","Time leaks often hide in transitions, unclear tasks and automatic phone checks. Observe the trigger before trying to remove the habit.","If you lose twenty minutes after arriving home, prepare a clear first action before school ends.","Record three time leaks, their triggers and a replacement action."],
    ["Planning Your Day","A useful daily plan has one main outcome, a few supporting tasks and room for the unexpected. Long lists create guilt rather than clarity.","Choose one must-do task, two should-do tasks and a small could-do list.","Plan tomorrow on one page using must, should, could and buffer."],
    ["Managing Homework","Homework becomes manageable when you clarify instructions, estimate effort and start with the next visible action.","Replace “do science” with “read question set, answer 1–5, mark uncertain answers”.","Rewrite every homework item as a concrete next action and estimate its duration."],
    ["Handling Busy Schedules","Busy weeks require reduced scope, not abandoned systems. Protect deadlines and health, then use minimum versions of lower-priority habits.","During exam week, shorten exercise and revision blocks rather than deleting sleep.","Design a normal-week plan and a busy-week version with fewer priorities."],
    ["Practical Planning Worksheets","A planning worksheet turns intentions into decisions by showing priorities, time estimates, buffers and review notes together.","At week’s end, compare planned and actual duration so next week’s estimates improve.","Complete a weekly plan, daily focus sheet and deadline reverse-plan for one real task."],
  ],
  beyond: [
    ["Communication","Clear communication begins with purpose, audience and listening.","Explain the same project differently to a friend, teacher and younger student.","Record a one-minute explanation and remove one unclear sentence."],
    ["Critical Thinking","Ask what is claimed, what evidence supports it and what else could explain it.","Compare two articles and separate evidence from opinion.","Use the questions: source, evidence, assumptions, alternatives, conclusion."],
    ["Creativity","Creativity combines observation, constraints and many rough possibilities.","Design three ways to explain a difficult concept without using a paragraph.","Generate ten imperfect ideas before choosing one."],
    ["Digital Literacy","Digital literacy includes searching, checking sources, organising files and choosing tools deliberately.","Use quotation marks and source filters to improve a research search.","Verify one online claim using two independent reliable sources."],
    ["Problem-solving","Define the problem before selecting a solution; then test a small version.","Replace “I cannot study” with a specific barrier such as noise or unclear tasks.","Write the problem, constraints, three options and one test."],
    ["Teamwork","Strong teams make roles, decisions and progress visible.","Assign facilitator, researcher and reviewer roles for a group task.","Create a team agreement with response times and decision rules."],
    ["Personal Projects","Projects turn interests into evidence of initiative and learning.","Build a study tracker, local history interview or small science investigation.","Define a two-week project with one user and one final output."],
    ["Building a Portfolio","A portfolio shows process, decisions and improvement—not only polished outcomes.","For each project include the brief, your role, iterations and learning.","Write one case-study caption for a piece of work."],
    ["Public Speaking","Public speaking becomes easier when you organise one clear message, practise aloud and focus on helping the audience understand.","Use a simple opening, three supporting points and a closing action instead of memorising every sentence.","Deliver a two-minute talk to a camera, then review pace, clarity and eye contact."],
    ["Leadership","Leadership is creating clarity and helping a group make progress. It can come from asking good questions, sharing responsibility and following through.","A team leader can summarise the goal, invite quieter voices and confirm who owns each next step.","Lead a small task using a goal, roles, check-in and review."],
    ["Basic Financial Awareness","Financial awareness begins with understanding income, spending, saving, needs, wants and the cost of choices.","If you receive a monthly allowance, divide it into planned spending, saving and a small flexible amount.","Track one week of spending and label each item need, want or future goal."],
    ["Learning Through Projects","Projects combine research, planning, making and reflection. They reveal skills that isolated exercises cannot show.","A local water-use project can involve measurement, spreadsheets, interviews, visual design and presentation.","Choose a real problem and create a project brief with audience, output and deadline."],
    ["Preparing for Future Opportunities","Opportunities become easier to pursue when you can explain your interests, show evidence and ask thoughtful questions.","Prepare a short introduction that connects what you enjoy, what you have made and what you hope to learn next.","Draft a one-minute introduction and three questions for a mentor, club or internship."],
    ["Practical Skill-building Activities","Skills grow through deliberate practice: a clear target, immediate attempt, useful feedback and another version.","Improve presentation design by remaking one slide three times with different hierarchy choices.","Plan a two-week skill sprint with four practice sessions and one finished artefact."],
  ],
  digital: [
    ["Using Technology Productively","Start with the learning goal, then choose the lightest tool that supports it.","A timer and plain document may be better than a complex productivity app.","Remove one tool that duplicates another."],
    ["Digital Organisation","A small folder system and consistent filenames reduce time spent searching.","Use Subject / Unit folders and filenames like 2026-04-Notes-Forces.","Rename and file ten loose documents."],
    ["Responsible Internet Usage","Responsible use combines respectful participation, source awareness and healthy boundaries.","Pause before sharing content that is private, inflammatory or unverified.","Create three rules for posting and forwarding."],
    ["Online Research","Effective research uses focused questions, varied queries and source evaluation.","Search the key concept, then add site, file type or date filters.","Build a source table with author, date, evidence and usefulness."],
    ["Managing Notifications","Notifications let other people choose your attention. Keep only time-sensitive alerts.","Turn off promotional and social alerts during study hours.","Audit every app notification and justify the ones left on."],
    ["Digital Privacy Basics","Protect accounts with unique passwords, updates and careful permission choices.","A password manager is safer than reusing one memorable password.","Check permissions for three apps and enable two-step verification."],
    ["AI as a Learning Assistant","AI can question, explain and critique, but outputs require checking and your own reasoning.","Ask for hints before solutions, then verify the result with your notes.","Use AI to create five recall questions and correct any weak ones."],
    ["Online and Offline Balance","Healthy technology use protects sleep, movement, relationships and uninterrupted thought.","Create a device-free final 30 minutes before sleep.","Choose one daily offline block and decide what will replace screen time."],
    ["Digital Distractions","Digital distraction is often designed into feeds, badges and endless recommendations. Changing defaults is more reliable than depending on willpower.","Remove entertainment apps from the first home screen and use a separate browser profile for school.","Identify your strongest digital trigger and add one layer of friction."],
    ["Password and Account Safety","Strong account safety uses unique passwords, a password manager, two-step verification and recovery details you can access.","A long unique password stored in a trusted manager is safer than changing one reused password repeatedly.","Secure one important account and review its recovery email, devices and active sessions."],
    ["Responsible AI Usage","Responsible AI use means protecting private information, checking claims, acknowledging assistance and keeping your own judgement active.","Do not paste personal records into a tool; provide only the minimum context and verify important advice independently.","Write a personal AI checklist covering privacy, verification, attribution and learning value."],
    ["Managing Screen Time","Screen time is not one category. Separate creation, learning, connection and passive consumption before deciding what to reduce.","Two hours making a project differs from two hours of automatic scrolling, even though both appear in the same total.","Review yesterday’s screen use by purpose and choose one change that protects attention."],
    ["Healthy Digital Habits","Healthy habits connect device use to posture, breaks, sleep, relationships and emotional awareness.","Use a stopping cue after each study block: stand, look into the distance and decide intentionally what comes next.","Create three device boundaries for morning, study time and bedtime."],
    ["Practical Digital Safety Exercises","Safety improves through rehearsal. Learn to inspect links, recognise pressure tactics, review permissions and respond calmly to suspicious activity.","Before opening a message link, check the sender, domain, urgency and whether you can reach the service independently.","Run a safety audit covering updates, backups, permissions, passwords and recovery options."],
  ],
} as const;

const makeChapters = (items: readonly (readonly string[])[]): Chapter[] => items.map(([title, focus, example, activity]) => ({
  title, focus, example, activity,
  insight: `Do not try to perfect ${title.toLowerCase()} in one day. Choose one visible behaviour, test it in real student life and review the evidence before making the system more complicated.`,
  checklist: ["Name the main idea in your own words", "Try the practical activity", "Review what worked after one week"],
  reflection: [`Where does ${title.toLowerCase()} currently show up in your student life?`, "What is one small change you can test today?"],
}));

const books: Book[] = [
  { id: "smart", title: "The Smart Student", subtitle: "Build Better Study Habits", intro: "This is not a book about studying for longer. It is a practical guide to making learning visible, repeatable and honest. Each chapter gives you one idea to understand and one action to test.", color: "from-blue-700 to-cyan-500", accent: "text-blue-600", chapters: makeChapters(topics.smart) },
  { id: "time", title: "Master Your Time", subtitle: "Time Management for Student Life", intro: "Time management is the skill of making realistic promises to yourself. This guide helps you notice your time, choose priorities and build plans that survive real school days.", color: "from-violet-800 to-fuchsia-500", accent: "text-violet-600", chapters: makeChapters(topics.time) },
  { id: "beyond", title: "Beyond the Classroom", subtitle: "Skills for the Real World", intro: "School knowledge becomes more powerful when you can communicate, question, create and collaborate. Use these chapters as small laboratories for real-world skills.", color: "from-emerald-700 to-lime-400", accent: "text-emerald-600", chapters: makeChapters(topics.beyond) },
  { id: "digital", title: "The Student's Digital Life", subtitle: "Technology, Focus and Productivity", intro: "Technology should serve your learning rather than quietly control your attention. This guide offers practical systems for research, organisation, safety and balance.", color: "from-slate-950 to-blue-600", accent: "text-cyan-600", chapters: makeChapters(topics.digital) },
];

export function BooksByMePage() {
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState(-1);
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const isFinal = Boolean(book && chapter === book.chapters.length);
  const current = chapter >= 0 && !isFinal ? book?.chapters[chapter] : null;
  const progress = useMemo(() => book ? Math.round(((chapter + 1) / (book.chapters.length + 1)) * 100) : 0, [book, chapter]);

  if (book) {
    const key = `${book.id}-${chapter}`;
    return <div className={`min-h-screen pt-[72px] ${dark ? "bg-[#101522] text-slate-100" : "bg-[#f6f1e8] text-slate-900"}`}>
      <div className={`sticky top-[72px] z-20 border-b px-4 py-3 backdrop-blur ${dark ? "border-white/10 bg-[#101522]/90" : "border-stone-300 bg-[#f6f1e8]/90"}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button onClick={() => { setBook(null); setChapter(-1); }} className="rounded-lg p-2 hover:bg-black/5" aria-label="Close book"><X /></button>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{book.title}</p><div className="mt-1 h-1 rounded bg-black/10"><div className="h-full rounded bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div></div>
          <span className="hidden text-xs font-bold sm:block">{progress}% read</span>
          <button onClick={() => setFontSize(Math.max(15, fontSize - 1))} className="rounded-lg p-2 hover:bg-black/5" aria-label="Decrease text size"><Minus /></button>
          <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="rounded-lg p-2 hover:bg-black/5" aria-label="Increase text size"><Plus /></button>
          <button onClick={() => setDark(!dark)} className="rounded-lg p-2 hover:bg-black/5" aria-label="Toggle reading mode">{dark ? <Sun /> : <Moon />}</button>
          <button onClick={() => setBookmarks(v => v.includes(key) ? v.filter(x => x !== key) : [...v, key])} className="rounded-lg p-2 hover:bg-black/5" aria-label="Bookmark page">{bookmarks.includes(key) ? <BookmarkCheck className="text-blue-500" /> : <Bookmark />}</button>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[300px_1fr]">
        <aside className={`border-r p-6 lg:sticky lg:top-[133px] lg:h-[calc(100vh-133px)] lg:overflow-y-auto ${dark ? "border-white/10" : "border-stone-300"}`}>
          <p className="text-xs font-bold uppercase tracking-[.2em] opacity-50">Contents</p>
          <button onClick={() => setChapter(-1)} className={`mt-4 w-full rounded-lg p-3 text-left text-sm font-bold ${chapter === -1 ? "bg-blue-600 text-white" : "hover:bg-black/5"}`}>Introduction</button>
          {book.chapters.map((item, i) => <button key={item.title} onClick={() => setChapter(i)} className={`mt-1 flex w-full gap-3 rounded-lg p-3 text-left text-sm ${chapter === i ? "bg-blue-600 font-bold text-white" : "hover:bg-black/5"}`}><span className="font-['DM_Mono'] text-xs opacity-50">0{i + 1}</span>{item.title}</button>)}
          <button onClick={() => setChapter(book.chapters.length)} className={`mt-1 flex w-full gap-3 rounded-lg p-3 text-left text-sm font-bold ${isFinal ? "bg-blue-600 text-white" : "hover:bg-black/5"}`}><Target className="h-4 w-4 shrink-0" />Final Action Plan</button>
        </aside>
        <main className="px-6 py-14 md:px-14 lg:px-20">
          <article className="mx-auto max-w-3xl" style={{ fontSize }}>
            <p className={`text-xs font-extrabold uppercase tracking-[.2em] ${book.accent}`}>{isFinal ? "Put the book into practice" : current ? `Chapter ${chapter + 1}` : "Introduction"}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">{isFinal ? "Your 30-Day Action Plan" : current?.title || book.title}</h1>
            {!current && !isFinal && <p className="mt-3 text-xl opacity-60">{book.subtitle}</p>}
            <div className="mt-10 space-y-7 font-serif leading-[1.9] opacity-90">
              <p>{isFinal ? `You now have a complete set of ideas from ${book.title}. The goal is not to use everything at once. Select a small number of actions, make them visible in your week and collect evidence about what helps.` : current?.focus || book.intro}</p>
              {isFinal ? (
                <>
                  <section className={`rounded-2xl border-l-4 border-blue-600 p-6 ${dark ? "bg-white/5" : "bg-white/70"}`}>
                    <h2 className="font-['Outfit'] text-2xl font-bold">Week 1 · Observe</h2>
                    <p className="mt-2">Choose one current habit to observe without judgement. Record when it happens, what triggers it and what result follows.</p>
                  </section>
                  <section><h2 className="font-['Outfit'] text-2xl font-bold">Week 2 · Test</h2><p className="mt-3">Select one chapter activity and practise it at least three times. Keep the action small enough to complete on a busy day.</p></section>
                  <section><h2 className="font-['Outfit'] text-2xl font-bold">Week 3 · Improve</h2><p className="mt-3">Review your evidence. Keep what worked, remove unnecessary steps and ask for feedback if another person can see the result.</p></section>
                  <section><h2 className="font-['Outfit'] text-2xl font-bold">Week 4 · Make it yours</h2><p className="mt-3">Write a personal rule for the habit, choose a reliable cue and decide how you will return after an interrupted day.</p></section>
                  <section className={`rounded-2xl p-6 ${dark ? "bg-blue-500/10" : "bg-blue-50"}`}><h2 className="font-['Outfit'] text-xl font-bold">Final checklist</h2><ul className="mt-3 space-y-2">{["I chose one clear behaviour","I scheduled when and where it will happen","I defined a minimum version for busy days","I will review evidence after one week","I know what I will change next"].map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />{item}</li>)}</ul></section>
                </>
              ) : current ? <>
                <section><h2 className="font-['Outfit'] text-2xl font-bold">Why this matters</h2><p className="mt-3">{current.focus} The aim is to replace vague intention with a behaviour you can see, repeat and improve.</p></section>
                <section><h2 className="font-['Outfit'] text-2xl font-bold">A practical example</h2><p className="mt-3">{current.example}</p></section>
                <section className={`rounded-2xl border-l-4 border-blue-600 p-6 ${dark ? "bg-white/5" : "bg-white/70"}`}><h2 className="font-['Outfit'] text-xl font-bold">Try this</h2><p className="mt-2">{current.activity}</p></section>
                <section className={`rounded-2xl p-6 ${dark ? "bg-amber-300/10" : "bg-amber-50"}`}><h2 className="flex items-center gap-2 font-['Outfit'] text-xl font-bold"><Lightbulb className="h-5 w-5 text-amber-500" />Edvora insight</h2><p className="mt-2">{current.insight}</p></section>
                <section><h2 className="font-['Outfit'] text-2xl font-bold">Chapter summary</h2><p className="mt-3">{current.focus} Start small, observe the result and adjust your system rather than judging yourself.</p></section>
                <section><h2 className="font-['Outfit'] text-2xl font-bold">Checklist</h2><ul className="mt-3 space-y-2">{current.checklist.map(item => <li key={item}>□ {item}</li>)}</ul></section>
                <section><h2 className="font-['Outfit'] text-2xl font-bold">Reflection questions</h2><ol className="mt-3 list-decimal space-y-2 pl-6">{current.reflection.map(item => <li key={item}>{item}</li>)}</ol></section>
              </> : <section><h2 className="font-['Outfit'] text-2xl font-bold">How to use this book</h2><p className="mt-3">Read one chapter at a time. Complete the activity before moving on, then return after a week to review what changed. A useful guide is one you test, not merely finish.</p></section>}
            </div>
            <div className="mt-14 flex justify-between border-t border-current/10 pt-6">
              <button disabled={chapter < 0} onClick={() => setChapter(chapter - 1)} className="flex items-center gap-2 font-bold disabled:opacity-30"><ChevronLeft /> Previous</button>
              <button disabled={isFinal} onClick={() => setChapter(chapter + 1)} className="flex items-center gap-2 font-bold disabled:opacity-30">Next <ChevronRight /></button>
            </div>
          </article>
        </main>
      </div>
    </div>;
  }

  return <div className="min-h-screen bg-[#f8fafc] pt-[72px]">
    <section className="bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold tracking-[.2em] text-blue-300">EDVORA ORIGINALS</p><h1 className="mt-4 text-5xl font-extrabold md:text-7xl">A digital library<br />for student life.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Four original, practical guidebooks—written to be used, reflected on and returned to.</p></div></section>
    <section className="px-6 py-16"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">{books.map((item, i) => <button key={item.id} onClick={() => { setBook(item); setChapter(-1); }} className="group text-left">
      <div className={`relative aspect-[3/4.2] overflow-hidden rounded-r-3xl rounded-l-md bg-gradient-to-br ${item.color} p-7 text-white shadow-xl transition group-hover:-translate-y-2 group-hover:shadow-2xl`}>
        <div className="absolute inset-y-0 left-3 w-px bg-white/20" />
        <span className="relative text-[10px] font-bold tracking-[.25em] text-white/70">EDVORA GUIDE {String(i + 1).padStart(2,"0")}</span>
        <div className="relative mt-10 h-28">
          {i === 0 && <div className="absolute inset-0 grid place-items-center"><div className="h-24 w-24 rounded-full border border-white/30" /><div className="absolute h-16 w-16 rounded-full border border-white/50" /><BookOpen className="absolute h-8 w-8" /></div>}
          {i === 1 && <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50"><span className="absolute left-1/2 top-1/2 h-8 w-px origin-top -translate-x-1/2 -translate-y-full rotate-12 bg-white" /><span className="absolute left-1/2 top-1/2 h-px w-7 origin-left rotate-45 bg-white" /></div>}
          {i === 2 && <div className="grid h-full grid-cols-3 place-items-center">{[0,1,2,3,4,5].map(node => <span key={node} className={`h-3 w-3 rounded-full bg-white ${node === 1 || node === 4 ? "scale-150" : "opacity-60"}`} />)}<div className="absolute inset-x-8 top-1/2 h-px bg-white/40" /></div>}
          {i === 3 && <div className="grid h-full grid-cols-4 gap-2 opacity-80">{Array.from({ length: 12 }, (_, cell) => <span key={cell} className={`rounded-sm border border-white/40 ${cell === 5 || cell === 10 ? "bg-white" : ""}`} />)}</div>}
        </div>
        <h2 className="relative mt-6 text-3xl font-extrabold leading-tight">{item.title}</h2><p className="relative mt-3 text-sm text-white/80">{item.subtitle}</p><span className="absolute bottom-6 right-6 text-5xl font-extrabold text-white/15">E</span>
      </div>
      <div className="px-2 pt-5"><p className="font-bold text-slate-950">16 reading pages · {item.chapters.length} chapters</p><p className="mt-1 text-sm text-slate-500">Open book →</p></div>
    </button>)}</div></section>
  </div>;
}
