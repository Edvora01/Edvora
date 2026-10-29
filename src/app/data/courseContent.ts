export type Lesson = {
  id: string;
  title: string;
  duration: string;
  status: "ready" | "coming-soon";
  videoUrl: string;
  presentationUrl: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  chapters: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: string;
  totalModules: number;
  totalChapters: number;
  modules: Module[];
};

export const courses: Course[] = [
  {
    id: "communication",
    title: "Professional Communication Skills",
    tagline:
      "Communicate Clearly. Listen Actively. Present Confidently.",
    description:
      "Develop practical communication skills for conversations, presentations, teamwork and professional environments.",
    level: "Beginner to Advanced",
    totalModules: 12,
    totalChapters: 60,
    modules: [
      {
        id: "communication-module-1",
        title: "Module 1 — Foundations of Communication",
        description:
          "Understand communication, how messages travel between people, and why communication sometimes fails.",
        chapters: [
          {
            id: "communication-1-1",
            title: "1.1 — What Is Communication?",
            duration: "15 min",
            status: "ready",
            videoUrl: "",
            presentationUrl:
              "https://drive.google.com/file/d/1e2h82uVOUzG5zzWtWsXGp_MegI0tvoTf/view?usp=sharing",
          },
          {
            id: "communication-1-2",
            title: "1.2 — Why Communication Matters",
            duration: "20 min",
            status: "coming-soon",
            videoUrl: "",
            presentationUrl: "",
          },
        ],
      },
    ],
  },

  {
    id: "data-science",
    title: "Data Science",
   tagline: 'Understand Data. Discover Patterns. Build Solutions.',
description:
  'Learn how to understand, organise, analyse and interpret data through practical examples and projects.',
    level: "Complete Beginner",
    totalModules: 14,
    totalChapters: 66,
    modules: [
      {
        id: "data-science-module-1",
        title: "Module 1 — Introduction to Data Science",
        description:
          "Understand the basics of data and how data-driven work creates useful information.",
        chapters: [
          {
            id: "data-science-1-1",
            title: "1.1 — What Is Data?",
            duration: "15 min",
            status: "ready",
            videoUrl: "",
            presentationUrl:
              "https://drive.google.com/file/d/1Jj_E_bQxbV_YiI0k_ZMygvca-9eUb35G/view?usp=sharing",
          },
          {
            id: "data-science-1-2",
            title: "1.2 — From Data to Information",
            duration: "20 min",
            status: "coming-soon",
            videoUrl: "",
            presentationUrl: "",
          },
        ],
      },
    ],
  },
];