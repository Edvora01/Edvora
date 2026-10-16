import { useState } from 'react';
import { Download, Eye, Trophy, Calendar, BookOpen, X, Search, ChevronRight, Clock } from 'lucide-react';
import { subjectsData } from '../data/subjects';

const CLASS_LIST = [6, 7, 8, 9, 10, 11, 12];
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

interface PYQPaper {
  id: string;
  subject: string;
  classNum: number;
  year: number;
  term: string;
  board: string;
  pages: number;
  marks: number;
}

function generatePYQs(classNum: number, subject: string): PYQPaper[] {
  const terms = classNum >= 10 ? ['Annual', 'Pre-Board', 'Mid-Term'] : ['Annual', 'Mid-Term', 'Unit Test'];
  const papers: PYQPaper[] = [];
  YEARS.slice(0, 5).forEach((year) => {
    terms.slice(0, 2).forEach((term) => {
      papers.push({
        id: `${classNum}-${subject}-${year}-${term}`,
        subject,
        classNum,
        year,
        term,
        board: 'CBSE',
        pages: Math.floor(Math.random() * 8) + 4,
        marks: classNum >= 9 ? 80 : 60,
      });
    });
  });
  return papers;
}

const yearColors: Record<number, string> = {
  2025: 'bg-violet-100 text-violet-700',
  2024: 'bg-blue-100 text-blue-700',
  2023: 'bg-emerald-100 text-emerald-700',
  2022: 'bg-amber-100 text-amber-700',
  2021: 'bg-rose-100 text-rose-700',
  2020: 'bg-cyan-100 text-cyan-700',
  2019: 'bg-indigo-100 text-indigo-700',
  2018: 'bg-orange-100 text-orange-700',
};

export function PYQsPage() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = selectedClass ? subjectsData[selectedClass] || [] : [];

  const papers = selectedClass && selectedSubject
    ? generatePYQs(selectedClass, selectedSubject).filter(
        (p) => !selectedYear || p.year === selectedYear
      )
    : [];

  const handleClassChange = (cls: number) => {
    if (selectedClass === cls) {
      setSelectedClass(null);
      setSelectedSubject(null);
    } else {
      setSelectedClass(cls);
      setSelectedSubject(null);
    }
  };

  const clearFilters = () => {
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedYear(null);
    setSearchQuery('');
  };

  const hasFilters = selectedClass !== null || selectedSubject !== null || selectedYear !== null || searchQuery !== '';

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <Trophy className="w-4 h-4" />
            Previous Year Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">PYQ Papers</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Practice with authentic previous year question papers to understand exam patterns and boost your score
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Years Covered', value: '2018–2025', icon: Calendar },
            { label: 'Total Papers', value: '500+', icon: BookOpen },
            { label: 'Classes', value: '6 – 12', icon: Trophy },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <Icon className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
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
                placeholder="Search by subject or topic..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
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
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Select Class</p>
            <div className="flex flex-wrap gap-2">
              {CLASS_LIST.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleClassChange(cls)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    selectedClass === cls
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-600'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          {selectedClass && subjects.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Select Subject <span className="text-amber-600">(Class {selectedClass})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSubject === sub
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Year Filter */}
          {selectedSubject && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Filter by Year</p>
              <div className="flex flex-wrap gap-2">
                {YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(selectedYear === yr ? null : yr)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      selectedYear === yr
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {!selectedClass && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trophy className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Select a Class to Get Started</h3>
            <p className="text-gray-500">Choose your class above to browse previous year papers</p>
          </div>
        )}

        {selectedClass && !selectedSubject && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Now Select a Subject</h3>
            <p className="text-gray-500">Pick a subject for Class {selectedClass} to view available papers</p>
          </div>
        )}

        {selectedClass && selectedSubject && papers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedSubject} · Class {selectedClass}
                {selectedYear && ` · ${selectedYear}`}
              </h2>
              <span className="text-sm text-gray-500">{papers.length} papers found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${yearColors[paper.year] || 'bg-gray-100 text-gray-600'}`}>
                          {paper.year}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          {paper.term}
                        </span>
                        <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          {paper.board}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{paper.subject}</h3>
                      <p className="text-sm text-gray-500">Class {paper.classNum}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" /> {paper.pages} pages
                      </p>
                      <p className="text-xs text-gray-400">{paper.marks} marks</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-amber-50 text-amber-700 py-2 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors shadow-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Want Chapter-wise Practice?</h2>
          <p className="text-amber-100 mb-6 max-w-xl mx-auto">
            Go to Chapters section to access chapter-specific practice questions and notes
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all shadow-lg">
            Explore Chapters
          </button>
        </div>
      </div>
    </div>
  );
}
