import { ArrowLeft, BookOpen } from 'lucide-react';

interface SubjectPartsPageProps {
  selectedClass: number;
  selectedSubject: string;
  parts: string[];
  onPartSelect: (part: string) => void;
  onBack: () => void;
}

export function SubjectPartsPage({ selectedClass, selectedSubject, parts, onPartSelect, onBack }: SubjectPartsPageProps) {
  const getPartColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Subjects
        </button>

        <div className="text-center mb-16">
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold">
              Class {selectedClass}
            </span>
            <span className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold">
              {selectedSubject}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Select Book/Part</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Choose the book or part you want to study
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {parts.map((part, index) => (
            <button
              key={part}
              onClick={() => onPartSelect(part)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100 group hover:scale-105 transform text-left"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${getPartColor(index)} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{part}</h3>
              <p className="text-xs md:text-sm text-gray-600">
                View chapters and materials
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
