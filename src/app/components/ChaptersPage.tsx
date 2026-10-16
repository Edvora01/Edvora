import { useState } from 'react';
import { ArrowLeft, FileText, Download, BookOpen, Eye, Play, X, Atom, FlaskConical, GraduationCap, ChevronRight } from 'lucide-react';
import { getChapters, Chapter } from '../data/chapters';
import { VideoLibrary } from './VideoLibrary';

interface ChaptersPageProps {
  selectedClass: number;
  selectedSubject: string;
  selectedSubjectPart: string | null;
  onBack: () => void;
}

type ViewMode = 'none' | 'pdf' | 'videos' | 'notes';
type NotesTab = 'chapter' | 'jee' | 'neet';

const JEE_CLASSES = [11, 12];
const NEET_CLASSES = [11, 12];

const jeeTopics: Record<string, string[]> = {
  Physics: ['Kinematics', 'Laws of Motion', 'Work, Energy & Power', 'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Modern Physics'],
  Chemistry: ['Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Electrochemistry', 'Organic Chemistry', 'Carbonyl Compounds', 'Biomolecules', 'Polymers'],
  Mathematics: ['Sets & Functions', 'Algebra', 'Coordinate Geometry', 'Calculus', 'Vectors & 3D Geometry', 'Statistics & Probability', 'Trigonometry', 'Matrices & Determinants'],
};

const neetTopics: Record<string, string[]> = {
  Biology: ['Cell Biology', 'Plant Physiology', 'Human Physiology', 'Genetics', 'Evolution', 'Ecology', 'Biotechnology', 'Biomolecules', 'Reproduction', 'Human Health & Disease'],
  Physics: ['Physical World', 'Units & Measurements', 'Motion', 'Gravitation', 'Thermal Properties', 'Oscillations', 'Waves', 'Electric Charges', 'Current Electricity', 'Ray Optics', 'Dual Nature', 'Nuclei'],
  Chemistry: ['Basic Concepts', 'Structure of Atom', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium', 'Hydrogen', 'p-Block Elements', 'd & f Block Elements', 'Coordination Compounds', 'Biomolecules'],
};

export function ChaptersPage({ selectedClass, selectedSubject, selectedSubjectPart, onBack }: ChaptersPageProps) {
  const chapters = getChapters(selectedSubject, selectedClass, selectedSubjectPart);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('pdf');
  const [notesTab, setNotesTab] = useState<NotesTab>('chapter');
  const [jeeClass, setJeeClass] = useState<number>(11);
  const [neetClass, setNeetClass] = useState<number>(11);

  const handleDownload = (chapter: Chapter) => {
    const fileIdMatch = chapter.pdfUrl.match(/\/d\/([^\/]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.location.href = downloadUrl;
    } else {
      window.open(chapter.pdfUrl, '_blank');
    }
  };

  const jeeSubjectTopics = jeeTopics[selectedSubject] || jeeTopics['Physics'];
  const neetSubjectTopics = neetTopics[selectedSubject] || neetTopics['Biology'];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Subjects
        </button>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <span className="text-gray-500">Home</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-500">Classes</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-500">Class {selectedClass}</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-500">{selectedSubject}</span>
            {selectedSubjectPart && (
              <>
                <span className="text-gray-400">→</span>
                <span className="text-blue-600 font-medium">{selectedSubjectPart}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              Class {selectedClass}
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">
              {selectedSubject}
            </span>
            {selectedSubjectPart && (
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                {selectedSubjectPart}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Chapters & Resources</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chapter List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Chapters
                </h2>
              </div>
              <div className="divide-y divide-gray-100 max-h-[500px] md:max-h-none overflow-y-auto">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapter(chapter);
                      setViewMode('none');
                    }}
                    className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${
                      selectedChapter.id === chapter.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm leading-snug">
                          {chapter.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chapter Details & Resources */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedChapter.title}</h2>
                <p className="text-purple-100 text-sm">
                  Access study materials, videos, and notes for this chapter
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base ${
                      viewMode === 'pdf' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    View PDF
                  </button>
                  <button
                    onClick={() => handleDownload(selectedChapter)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    Download
                  </button>
                  {(selectedChapter.videoUrl || (selectedChapter.videos && selectedChapter.videos.length > 0)) && (
                    <button
                      onClick={() => setViewMode('videos')}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base ${
                        viewMode === 'videos' ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
                      Videos
                    </button>
                  )}
                  {selectedChapter.hasNotes && (
                    <button
                      onClick={() => setViewMode('notes')}
                      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base ${
                        viewMode === 'notes' ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      <FileText className="w-4 h-4 md:w-5 md:h-5" />
                      Notes
                    </button>
                  )}
                </div>
              </div>

              {/* Content Display Area */}
              <div className="p-4 md:p-6">
                {viewMode === 'none' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-600">
                      Select an option above to view resources
                    </p>
                  </div>
                )}

                {viewMode === 'pdf' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        PDF Viewer
                      </h3>
                      <button onClick={() => setViewMode('none')} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-gray-100 rounded-xl overflow-hidden" style={{ height: '600px' }}>
                      <iframe
                        src={selectedChapter.pdfUrl}
                        className="w-full h-full"
                        title="PDF Viewer"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                )}

                {viewMode === 'videos' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Play className="w-5 h-5 text-red-600" />
                        Video Lectures
                      </h3>
                      <button onClick={() => setViewMode('none')} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {selectedChapter.videos && selectedChapter.videos.length > 0 ? (
                      <VideoLibrary videos={selectedChapter.videos} />
                    ) : selectedChapter.videoUrl ? (
                      <div className="bg-gray-900 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <iframe
                          src={selectedChapter.videoUrl}
                          className="w-full h-full"
                          title="Video Lecture"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-600">No videos available</p>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-orange-600" />
                        Study Notes
                      </h3>
                      <button onClick={() => setViewMode('none')} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Notes Tabs: Chapter / JEE / NEET */}
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setNotesTab('chapter')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                          notesTab === 'chapter'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        Chapter Notes
                      </button>
                      <button
                        onClick={() => setNotesTab('jee')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold border-l border-gray-200 transition-colors ${
                          notesTab === 'jee'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Atom className="w-4 h-4" />
                        JEE Prep
                      </button>
                      <button
                        onClick={() => setNotesTab('neet')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold border-l border-gray-200 transition-colors ${
                          notesTab === 'neet'
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <FlaskConical className="w-4 h-4" />
                        NEET Prep
                      </button>
                    </div>

                    {/* Chapter Notes Tab */}
                    {notesTab === 'chapter' && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Concepts:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Important concept 1 from {selectedChapter.title}</li>
                            <li>Key formula or theorem</li>
                            <li>Critical definitions to remember</li>
                            <li>Problem-solving techniques</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Quick Summary:</h4>
                          <p className="text-gray-700 text-sm">
                            This chapter covers fundamental concepts of {selectedChapter.title}.
                            Students should focus on understanding the core principles and practicing
                            example problems. Download the PDF for detailed explanations and exercises.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            <li>Review examples carefully before attempting problems</li>
                            <li>Practice regularly to reinforce concepts</li>
                            <li>Watch the video lecture for visual understanding</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* JEE Prep Tab */}
                    {notesTab === 'jee' && (
                      <div className="space-y-4">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                              <Atom className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-indigo-900">JEE Main & Advanced</h4>
                              <p className="text-xs text-indigo-600">Engineering Entrance Preparation</p>
                            </div>
                          </div>

                          {/* Class selector for JEE */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">Select Class</p>
                            <div className="flex gap-2">
                              {JEE_CLASSES.map((cls) => (
                                <button
                                  key={cls}
                                  onClick={() => setJeeClass(cls)}
                                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                                    jeeClass === cls
                                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                      : 'bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400'
                                  }`}
                                >
                                  Class {cls}
                                </button>
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-indigo-700 font-semibold uppercase tracking-wider mb-2">
                            High-weightage Topics — Class {jeeClass}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {jeeSubjectTopics.slice(0, 8).map((topic) => (
                              <button
                                key={topic}
                                className="flex items-center justify-between bg-white border border-indigo-100 rounded-xl px-3 py-2.5 text-left hover:border-indigo-300 hover:shadow-sm transition-all group"
                              >
                                <span className="text-sm font-medium text-gray-800 truncate pr-1">{topic}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'Practice Problems', count: '120+', color: 'bg-indigo-100 text-indigo-700' },
                            { label: 'Solved Examples', count: '45', color: 'bg-blue-100 text-blue-700' },
                            { label: 'Mock Tests', count: '12', color: 'bg-purple-100 text-purple-700' },
                          ].map((item) => (
                            <div key={item.label} className={`${item.color} rounded-xl p-3 text-center`}>
                              <p className="text-lg font-bold">{item.count}</p>
                              <p className="text-xs font-medium">{item.label}</p>
                            </div>
                          ))}
                        </div>

                        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Start JEE Practice — Class {jeeClass}
                        </button>
                      </div>
                    )}

                    {/* NEET Prep Tab */}
                    {notesTab === 'neet' && (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                              <FlaskConical className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-green-900">NEET UG</h4>
                              <p className="text-xs text-green-600">Medical Entrance Preparation</p>
                            </div>
                          </div>

                          {/* Class selector for NEET */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Select Class</p>
                            <div className="flex gap-2">
                              {NEET_CLASSES.map((cls) => (
                                <button
                                  key={cls}
                                  onClick={() => setNeetClass(cls)}
                                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                                    neetClass === cls
                                      ? 'bg-green-600 text-white border-green-600 shadow-md'
                                      : 'bg-white text-green-700 border-green-200 hover:border-green-400'
                                  }`}
                                >
                                  Class {cls}
                                </button>
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-green-700 font-semibold uppercase tracking-wider mb-2">
                            High-weightage Topics — Class {neetClass}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {neetSubjectTopics.slice(0, 8).map((topic) => (
                              <button
                                key={topic}
                                className="flex items-center justify-between bg-white border border-green-100 rounded-xl px-3 py-2.5 text-left hover:border-green-300 hover:shadow-sm transition-all group"
                              >
                                <span className="text-sm font-medium text-gray-800 truncate pr-1">{topic}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-green-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'Practice MCQs', count: '200+', color: 'bg-green-100 text-green-700' },
                            { label: 'NCERT Based', count: '80+', color: 'bg-teal-100 text-teal-700' },
                            { label: 'Mock Tests', count: '10', color: 'bg-emerald-100 text-emerald-700' },
                          ].map((item) => (
                            <div key={item.label} className={`${item.color} rounded-xl p-3 text-center`}>
                              <p className="text-lg font-bold">{item.count}</p>
                              <p className="text-xs font-medium">{item.label}</p>
                            </div>
                          ))}
                        </div>

                        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Start NEET Practice — Class {neetClass}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
