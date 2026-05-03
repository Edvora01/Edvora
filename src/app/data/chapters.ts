export interface Chapter {
  id: string;
  title: string;
  pdfUrl: string;
  videoUrl?: string;
  videos?: { id: string; title: string; url: string; description?: string }[];
  hasNotes: boolean;
}

export const chaptersData: Record<string, Record<string, Chapter[]>> = {
  'Mathematics': {
    '10': [
      {
        id: 'math-10-1',
        title: 'Real Numbers',
        pdfUrl: 'https://drive.google.com/file/d/1example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videos: [
          {
            id: 'vid-math-10-1-1',
            title: 'Introduction to Real Numbers',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: 'Learn the basics of real numbers including rational and irrational numbers'
          },
          {
            id: 'vid-math-10-1-2',
            title: 'Properties of Real Numbers',
            url: 'https://youtu.be/dQw4w9WgXcQ',
            description: 'Understand the fundamental properties like closure, commutative, and associative'
          }
        ],
        hasNotes: true,
      },
      {
        id: 'math-10-2',
        title: 'Polynomials',
        pdfUrl: 'https://drive.google.com/file/d/2example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videos: [
          {
            id: 'vid-math-10-2-1',
            title: 'What are Polynomials?',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: 'Introduction to polynomials and their degree'
          },
          {
            id: 'vid-math-10-2-2',
            title: 'Factoring Polynomials',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            description: 'Learn different methods to factor polynomials'
          }
        ],
        hasNotes: true,
      },
      {
        id: 'math-10-3',
        title: 'Pair of Linear Equations in Two Variables',
        pdfUrl: 'https://drive.google.com/file/d/3example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-4',
        title: 'Quadratic Equations',
        pdfUrl: 'https://drive.google.com/file/d/4example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-5',
        title: 'Arithmetic Progressions',
        pdfUrl: 'https://drive.google.com/file/d/5example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-6',
        title: 'Triangles',
        pdfUrl: 'https://drive.google.com/file/d/6example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-7',
        title: 'Coordinate Geometry',
        pdfUrl: 'https://drive.google.com/file/d/7example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-8',
        title: 'Introduction to Trigonometry',
        pdfUrl: 'https://drive.google.com/file/d/8example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videos: [
          {
            id: 'vid-math-10-8-1',
            title: 'Introduction to Trigonometry - Complete Chapter',
            url: 'https://www.youtube.com/live/2wYLgSGVNqY?si=KlxOZHTcT4sGy3zg',
            description: 'Complete video lecture covering Introduction to Trigonometry for Class 10'
          }
        ],
        hasNotes: true,
      },
      {
        id: 'math-10-9',
        title: 'Applications of Trigonometry',
        pdfUrl: 'https://drive.google.com/file/d/9example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'math-10-10',
        title: 'Circles',
        pdfUrl: 'https://drive.google.com/file/d/10example/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
    ],
  },
  'Science': {
    '10': [
      {
        id: 'sci-10-1',
        title: 'Chemical Reactions and Equations',
        pdfUrl: 'https://drive.google.com/file/d/1science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-2',
        title: 'Acids, Bases and Salts',
        pdfUrl: 'https://drive.google.com/file/d/2science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-3',
        title: 'Metals and Non-metals',
        pdfUrl: 'https://drive.google.com/file/d/3science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-4',
        title: 'Life Processes',
        pdfUrl: 'https://drive.google.com/file/d/4science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-5',
        title: 'Control and Coordination',
        pdfUrl: 'https://drive.google.com/file/d/5science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-6',
        title: 'Light - Reflection and Refraction',
        pdfUrl: 'https://drive.google.com/file/d/6science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-7',
        title: 'The Human Eye and the Colourful World',
        pdfUrl: 'https://drive.google.com/file/d/7science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sci-10-8',
        title: 'Electricity',
        pdfUrl: 'https://drive.google.com/file/d/8science/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
    ],
  },
  'English': {
    '6': [
      {
        id: 'eng-6-1',
        title: '01 Fables And Folk Tales',
        pdfUrl: 'https://drive.google.com/file/d/1PRX6Htp9nsZ6yj7BmhGZ-ttAann-oDQo/preview',
        hasNotes: true,
      },
      {
        id: 'eng-6-2',
        title: '02 Friendship',
        pdfUrl: 'https://drive.google.com/file/d/1RqsBGUUfWYf8z0djjtkzPkKd4GmzaUzF/preview',
        hasNotes: true,
      },
      {
        id: 'eng-6-3',
        title: '03 Nurturing Nature',
        pdfUrl: 'https://drive.google.com/file/d/1Y_089EiKIDzoDKF5lgRcZIpOb4gT4-15/preview',
        hasNotes: true,
      },
      {
        id: 'eng-6-4',
        title: '04 Sports and Wellness',
        pdfUrl: 'https://drive.google.com/file/d/1n8EsF_aoOCgj4on6Mqlpwmh150ZB83ox/preview',
        hasNotes: true,
      },
      {
        id: 'eng-6-5',
        title: '05 Culture and Tradition',
        pdfUrl: 'https://drive.google.com/file/d/1G7putM4GvGCvmrgZb7BbvLP8TYothe7B/preview',
        hasNotes: true,
      },
    ],
    '10': [
      {
        id: 'eng-10-1',
        title: 'A Letter to God',
        pdfUrl: 'https://drive.google.com/file/d/1english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'eng-10-2',
        title: 'Nelson Mandela: Long Walk to Freedom',
        pdfUrl: 'https://drive.google.com/file/d/2english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'eng-10-3',
        title: 'Two Stories about Flying',
        pdfUrl: 'https://drive.google.com/file/d/3english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'eng-10-4',
        title: 'From the Diary of Anne Frank',
        pdfUrl: 'https://drive.google.com/file/d/4english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'eng-10-5',
        title: 'The Hundred Dresses',
        pdfUrl: 'https://drive.google.com/file/d/5english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'eng-10-6',
        title: 'Glimpses of India',
        pdfUrl: 'https://drive.google.com/file/d/6english/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
    ],
  },
  'Social Science': {
    '10': [
      {
        id: 'sst-10-1',
        title: 'The Rise of Nationalism in Europe',
        pdfUrl: 'https://drive.google.com/file/d/1sst/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sst-10-2',
        title: 'Nationalism in India',
        pdfUrl: 'https://drive.google.com/file/d/2sst/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sst-10-3',
        title: 'Resources and Development',
        pdfUrl: 'https://drive.google.com/file/d/3sst/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sst-10-4',
        title: 'Forest and Wildlife Resources',
        pdfUrl: 'https://drive.google.com/file/d/4sst/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
      {
        id: 'sst-10-5',
        title: 'Democracy and Diversity',
        pdfUrl: 'https://drive.google.com/file/d/5sst/preview',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        hasNotes: true,
      },
    ],
  },
};

// Generate sample chapters for other subjects and classes
export function getChapters(subject: string, classNum: number, subjectPart: string | null = null): Chapter[] {
  // Create a composite key if subject has parts
  const key = subjectPart ? `${subject} - ${subjectPart}` : subject;
  const classKey = `${classNum}`;

  if (chaptersData[key] && chaptersData[key][classKey]) {
    return chaptersData[key][classKey];
  }

  // Generate default chapters if not found
  const chapterCount = Math.floor(Math.random() * 5) + 5; // 5-10 chapters
  return Array.from({ length: chapterCount }, (_, i) => ({
    id: `${subject.toLowerCase().replace(/\s+/g, '-')}-${classNum}-${i + 1}`,
    title: `Chapter ${i + 1}: ${subject} Topic ${i + 1}`,
    pdfUrl: `https://drive.google.com/file/d/example${i + 1}/preview`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    hasNotes: true,
  }));
}