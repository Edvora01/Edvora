import { useState } from 'react';
import { Download, Eye, FileText, Star, BookOpen, X, Search, Clock, CheckCircle } from 'lucide-react';
import { subjectsData } from '../data/subjects';

const CLASS_LIST = [6, 7, 8, 9, 10, 11, 12];
const PAPER_TYPES = ['Full Syllabus', 'Half Yearly', 'Unit Test', 'Pre-Board', 'Practice Set'];
const BOARDS = ['CBSE', 'ICSE', 'State Board'];

interface SamplePaper {
  id: string;
  subject: string;
  classNum: number;
  type: string;
  board: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pages: number;
  marks: number;
  solutions: boolean;
}

const difficultyConfig = {
  Easy: { color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  Medium: { color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  Hard: { color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

const difficulties: Array<'Easy' | 'Medium' | 'Hard'> = ['Easy', 'Medium', 'Hard'];

function generateSamplePapers(classNum: number, subject: string): SamplePaper[] {
  const papers: SamplePaper[] = [];
  PAPER_TYPES.forEach((type, ti) => {
    BOARDS.slice(0, 2).forEach((board, bi) => {
      papers.push({
        id: `sp-${classNum}-${subject}-${type}-${board}`,
        subject,
        classNum,
        type,
        board,
        difficulty: difficulties[(ti + bi) % 3],
        pages: Math.floor(Math.random() * 6) + 4,
        marks: classNum >= 9 ? 80 : 60,
        solutions: (ti + bi) % 2 === 0,
      });
    });
  });
  return papers;
}

export function SamplePapersPage() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = selectedClass ? subjectsData[selectedClass] || [] : [];

  const allPapers = selectedClass && selectedSubject
    ? generateSamplePapers(selectedClass, selectedSubject)
    : [];

  const filteredPapers = allPapers.filter((p) => {
    if (selectedType && p.type !== selectedType) return false;
    if (selectedBoard && p.board !== selectedBoard) return false;
    return true;
  });

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
    setSelectedType(null);
    setSelectedBoard(null);
    setSearchQuery('');
  };

  const hasFilters = selectedClass !== null || selectedSubject !== null || selectedType !== null || selectedBoard !== null || searchQuery !== '';

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <Star className="w-4 h-4" />
            Sample Papers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sample Papers</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Expertly crafted sample papers with solutions to help you practice and prepare thoroughly
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Sample Papers', value: '300+', icon: FileText },
            { label: 'With Solutions', value: '150+', icon: CheckCircle },
            { label: 'Classes', value: '6 – 12', icon: BookOpen },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <Icon className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
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
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
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
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
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
                Select Subject <span className="text-emerald-600">(Class {selectedClass})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(selectedSubject === sub ? null : sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSubject === sub
                        ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type and Board filters */}
          {selectedSubject && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Paper Type</p>
                <div className="flex flex-wrap gap-2">
                  {PAPER_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedType === type
                          ? 'bg-gray-800 text-white border-gray-800'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Board</p>
                <div className="flex flex-wrap gap-2">
                  {BOARDS.map((board) => (
                    <button
                      key={board}
                      onClick={() => setSelectedBoard(selectedBoard === board ? null : board)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedBoard === board
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {board}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {!selectedClass && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FileText className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Select a Class to Get Started</h3>
            <p className="text-gray-500">Choose your class above to browse sample papers</p>
          </div>
        )}

        {selectedClass && !selectedSubject && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Now Select a Subject</h3>
            <p className="text-gray-500">Pick a subject for Class {selectedClass} to view sample papers</p>
          </div>
        )}

        {selectedClass && selectedSubject && filteredPapers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedSubject} · Class {selectedClass}
                {selectedType && ` · ${selectedType}`}
              </h2>
              <span className="text-sm text-gray-500">{filteredPapers.length} papers found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPapers.map((paper) => {
                const diff = difficultyConfig[paper.difficulty];
                return (
                  <div
                    key={paper.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${diff.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                            {paper.difficulty}
                          </span>
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                            {paper.type}
                          </span>
                          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                            {paper.board}
                          </span>
                          {paper.solutions && (
                            <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Solutions
                            </span>
                          )}
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
                      <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Looking for Previous Year Papers?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Practice with real exam questions from previous years to understand question patterns
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg">
            Browse PYQs
          </button>
        </div>
      </div>
    </div>
  );
}
