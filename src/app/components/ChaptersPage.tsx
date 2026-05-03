import { useState } from 'react';
import { ArrowLeft, FileText, Download, BookOpen, Eye, Play, X, Video } from 'lucide-react';
import { getChapters, Chapter } from '../data/chapters';
import { VideoLibrary } from './VideoLibrary';

interface ChaptersPageProps {
  selectedClass: number;
  selectedSubject: string;
  selectedSubjectPart: string | null;
  onBack: () => void;
}

export function ChaptersPage({ selectedClass, selectedSubject, selectedSubjectPart, onBack }: ChaptersPageProps) {
  const chapters = getChapters(selectedSubject, selectedClass, selectedSubjectPart);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [viewMode, setViewMode] = useState<'none' | 'pdf' | 'videos' | 'notes'>('pdf');

  const handleDownload = (chapter: Chapter) => {
    // Extract file ID from Google Drive URL and create direct download link
    const fileIdMatch = chapter.pdfUrl.match(/\/d\/([^\/]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      window.location.href = downloadUrl;
    } else {
      window.open(chapter.pdfUrl, '_blank');
    }
  };

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
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base"
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
                      className="flex items-center gap-2 bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
                      Videos
                    </button>
                  )}
                  {selectedChapter.hasNotes && (
                    <button
                      onClick={() => setViewMode('notes')}
                      className="flex items-center gap-2 bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-medium text-sm md:text-base"
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
                      <button
                        onClick={() => setViewMode('none')}
                        className="text-gray-400 hover:text-gray-600"
                      >
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
                      <button
                        onClick={() => setViewMode('none')}
                        className="text-gray-400 hover:text-gray-600"
                      >
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
                        Chapter Notes
                      </h3>
                      <button
                        onClick={() => setViewMode('none')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Concepts:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Important concept 1 from {selectedChapter.title}</li>
                          <li>Key formula or theorem</li>
                          <li>Critical definitions to remember</li>
                          <li>Problem-solving techniques</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Quick Summary:</h4>
                        <p className="text-gray-700">
                          This chapter covers fundamental concepts of {selectedChapter.title}. 
                          Students should focus on understanding the core principles and practicing 
                          example problems. Download the PDF for detailed explanations and exercises.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Review examples carefully before attempting problems</li>
                          <li>Practice regularly to reinforce concepts</li>
                          <li>Watch the video lecture for visual understanding</li>
                        </ul>
                      </div>
                    </div>
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