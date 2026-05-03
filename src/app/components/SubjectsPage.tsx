import { ArrowLeft } from 'lucide-react';
import { subjectsData, subjectIcons, subjectColors } from '../data/subjects';

interface SubjectsPageProps {
  selectedClass: number;
  onSubjectSelect: (subject: string) => void;
  onBack: () => void;
}

export function SubjectsPage({ selectedClass, onSubjectSelect, onBack }: SubjectsPageProps) {
  const subjects = subjectsData[selectedClass] || [];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Classes
        </button>

        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold mb-4">
            Class {selectedClass}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Choose My Subject</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Select a subject to explore chapters and learning materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => onSubjectSelect(subject)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100 group hover:scale-105 transform text-left"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${subjectColors[subject]} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <span className="text-3xl md:text-4xl">{subjectIcons[subject]}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{subject}</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Explore chapters and resources
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}