export type Lesson = {
  id: string;
  title: string;
  duration: string;
  status: "ready" | "coming-soon";
  videoUrl: string;
  presentationUrl: string;
};

export type Module = { id: string; title: string; description: string; chapters: Lesson[] };
export type Course = { id: string; title: string; tagline: string; description: string; level: string; totalModules: number; totalChapters: number; modules: Module[] };

const courseSeeds = [
  ["data-science","Data Science","Understand Data. Discover Patterns. Build Solutions.","Learn to organise, analyse and communicate data through practical investigations.","What Is Data?"],
  ["python","Python Programming","Think Clearly. Code Confidently.","Build programming foundations with variables, decisions, loops and small useful programs.","Your First Python Program"],
  ["web-development","Web Development","Design It. Build It. Share It.","Learn the structure, style and behaviour behind accessible modern websites.","How a Web Page Works"],
  ["graphic-design","Graphic Design","See Better. Communicate Visually.","Practise hierarchy, typography, colour and layout through focused design briefs.","Visual Hierarchy"],
  ["video-editing","Video Editing","Shape Footage into a Story.","Learn sequencing, pacing, sound and responsible visual storytelling.","The Building Blocks of an Edit"],
  ["communication","Professional Communication Skills","Communicate Clearly. Listen Actively. Present Confidently.","Develop useful speaking, listening, writing and presentation habits.","What Is Communication?"],
] as const;

const existingPresentations: Record<string, string> = {
  "data-science": "https://drive.google.com/file/d/1Jj_E_bQxbV_YiI0k_ZMygvca-9eUb35G/view?usp=sharing",
  communication: "https://drive.google.com/file/d/1e2h82uVOUzG5zzWtWsXGp_MegI0tvoTf/view?usp=sharing",
};

export const courses: Course[] = courseSeeds.map(([id,title,tagline,description,lesson]) => ({
  id, title, tagline, description, level: "Beginner", totalModules: 1, totalChapters: 2,
  modules: [{
    id: `${id}-module-1`,
    title: "Module 1 — Foundations",
    description: `Build a clear foundation in ${title.toLowerCase()} through explanation and practical work.`,
    chapters: [
      { id: `${id}-1-1`, title: `1.1 — ${lesson}`, duration: "20 min", status: "ready", videoUrl: "", presentationUrl: existingPresentations[id] || "" },
      { id: `${id}-1-2`, title: "1.2 — Guided Practice", duration: "25 min", status: "coming-soon", videoUrl: "", presentationUrl: "" },
    ],
  }],
}));
