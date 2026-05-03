export const subjectsData: Record<number, string[]> = {
  6: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  7: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  8: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  9: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  10: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  11: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Geography', 'Political Science', 'Sociology', 'Psychology', 'English Core', 'Hindi Core', 'Sanskrit'],
  12: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Accountancy', 'Business Studies', 'Economics', 'History', 'Geography', 'Political Science', 'Sociology', 'Psychology', 'English Core', 'Hindi Core', 'Sanskrit'],
};

export const subjectParts: Record<string, Record<number, string[]>> = {
  'Social Science': {
    7: ['Part 1', 'Part 2'],
    10: ['History', 'Geography', 'Civics', 'Economics'],
  },
  'Mathematics': {
    8: ['Part 1', 'Part 2'],
    12: ['Part 1', 'Part 2'],
  },
  'English': {
    10: ['First Flight', 'Footprints Without Feet'],
  },
  'Hindi': {
    10: ['Kshitij', 'Kritika'],
  },
  'Accountancy': {
    11: ['Part 1', 'Part 2'],
    12: ['Part 1', 'Part 2'],
  },
  'Business Studies': {
    12: ['Part 1', 'Part 2'],
  },
  'Chemistry': {
    11: ['Part 1', 'Part 2'],
    12: ['Part 1', 'Part 2'],
  },
  'Physics': {
    11: ['Part 1', 'Part 2'],
    12: ['Part 1', 'Part 2'],
  },
  'Economics': {
    11: ['Indian Economic Development', 'Statistics for Economics'],
    12: ['Introductory Macroeconomics', 'Introductory Microeconomics'],
  },
  'English Core': {
    11: ['Hornbill', 'Snapshots'],
    12: ['Flamingo', 'Vistas'],
  },
  'Geography': {
    11: ['Fundamentals of Physical Geography', 'India Physical Environment', 'Practical Work in Geography'],
    12: ['Fundamentals of Human Geography', 'India People and Economy', 'Practical Work in Geography'],
  },
  'Hindi Core': {
    11: ['Antra', 'Aroh', 'Vitan'],
    12: ['Antra', 'Aroh', 'Vitan'],
  },
  'History': {
    12: ['Themes in Indian History Part-1', 'Themes in Indian History Part-2', 'Themes in Indian History Part-3'],
  },
  'Political Science': {
    11: ['Indian Constitution at Work', 'Political Theory'],
    12: ['Contemporary World Politics', 'Politics in India Since Independence'],
  },
  'Sociology': {
    11: ['Introducing Sociology', 'Understanding Society'],
    12: ['Indian Society', 'Social Change and Development in India'],
  },
};

export function getSubjectParts(subject: string, classNum: number): string[] | null {
  return subjectParts[subject]?.[classNum] || null;
}

export const subjectIcons: Record<string, string> = {
  'Mathematics': '📐',
  'Science': '🔬',
  'Physics': '⚛️',
  'Chemistry': '🧪',
  'Biology': '🧬',
  'Social Science': '🌍',
  'English': '📖',
  'Hindi': '🇮🇳',
  'Computer Science': '💻',
  'Accountancy': '📊',
  'Business Studies': '💼',
  'Economics': '📈',
  'History': '📜',
  'Geography': '🗺️',
  'Political Science': '⚖️',
  'Sociology': '👥',
  'Psychology': '🧠',
  'English Core': '📚',
  'Hindi Core': '📕',
  'Sanskrit': '🕉️',
};

export const subjectColors: Record<string, string> = {
  'Mathematics': 'from-blue-500 to-blue-600',
  'Science': 'from-green-500 to-green-600',
  'Physics': 'from-purple-500 to-purple-600',
  'Chemistry': 'from-pink-500 to-pink-600',
  'Biology': 'from-teal-500 to-teal-600',
  'Social Science': 'from-orange-500 to-orange-600',
  'English': 'from-red-500 to-red-600',
  'Hindi': 'from-yellow-500 to-yellow-600',
  'Computer Science': 'from-indigo-500 to-indigo-600',
  'Accountancy': 'from-cyan-500 to-cyan-600',
  'Business Studies': 'from-violet-500 to-violet-600',
  'Economics': 'from-emerald-500 to-emerald-600',
  'History': 'from-amber-500 to-amber-600',
  'Geography': 'from-lime-500 to-lime-600',
  'Political Science': 'from-rose-500 to-rose-600',
  'Sociology': 'from-sky-500 to-sky-600',
  'Psychology': 'from-fuchsia-500 to-fuchsia-600',
  'English Core': 'from-red-600 to-red-700',
  'Hindi Core': 'from-orange-600 to-orange-700',
  'Sanskrit': 'from-yellow-600 to-yellow-700',
};
