import { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Zap, Map, HelpCircle, ChevronRight, X } from 'lucide-react';
import { subjectsData } from '../data/subjects';

const CLASS_LIST = [6, 7, 8, 9, 10, 11, 12];

const notesCategories = [
  {
    title: 'Quick Revision Notes',
    description: 'Concise notes for last-minute revision',
    count: 45,
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    icon: Zap,
  },
  {
    title: 'Formula Sheets',
    description: 'All important formulas in one place',
    count: 28,
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    icon: FileText,
  },
  {
    title: 'Mind Maps',
    description: 'Visual representation of concepts',
    count: 32,
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    icon: Map,
  },
  {
    title: 'Important Questions',
    description: 'Frequently asked exam questions',
    count: 56,
    color: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-600',
    icon: HelpCircle,
  },
];

export function NotesPage() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = selectedClass ? subjectsData[selectedClass] || [] : [];

  const handleClassChange = (cls: number) => {
    if (selectedClass === cls) {
      setSelectedClass(null);
      setSelectedSubject(null);
    } else {
      setSelectedClass(cls);
      setSelectedSubject(null);
    }
  };

  const handleSubjectChange = (sub: string) => {
    setSelectedSubject(selectedSubject === sub ? null : sub);
  };

  const clearFilters = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setSearchQuery('');
  };

  const hasFilters = selectedClass !== null || selectedSubject !== null || searchQuery !== '';

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Study Notes</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Access curated notes, formulas, and revision materials
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 md:p-6 mb-8">
          {/* Search */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by topic or chapter..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* Class Filter */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Filter by Class</p>
            <div className="flex flex-wrap gap-2">
              {CLASS_LIST.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleClassChange(cls)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    selectedClass === cls
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter — visible only when a class is selected */}
          {selectedClass && subjects.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Filter by Subject <span className="text-blue-600">(Class {selectedClass})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubjectChange(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSubject === sub
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active filter badge */}
        {(selectedClass || selectedSubject) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-gray-500">Showing notes for:</span>
            {selectedClass && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Class {selectedClass}
              </span>
            )}
            {selectedSubject && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {selectedSubject}
              </span>
            )}
          </div>
        )}

        {/* Notes Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {notesCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                {selectedSubject && (
                  <p className={`text-xs font-semibold ${category.textColor} ${category.bgLight} px-3 py-1 rounded-full inline-block mb-3`}>
                    {selectedSubject} · Class {selectedClass}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-400">{category.count} resources</span>
                  <span className={`${category.textColor} font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                    Browse <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need Chapter-Specific Notes?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Navigate to Classes → Subjects → Chapters to access chapter-specific notes and resources
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
            Browse by Chapter
          </button>
        </div>
      </div>
    </div>
  );
}
