import { BookOpen } from 'lucide-react';

interface ClassesPageProps {
  onClassSelect: (classNum: number) => void;
}

export function ClassesPage({ onClassSelect }: ClassesPageProps) {
  const classes = [6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Select My Class</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Choose my class to explore subjects and learning materials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {classes.map((classNum) => (
            <button
              key={classNum}
              onClick={() => onClassSelect(classNum)}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-gray-100 group hover:scale-105 transform"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Class {classNum}</h3>
              <p className="text-xs md:text-sm text-gray-600">
                {classNum <= 8 ? 'Foundation Level' : classNum <= 10 ? 'Secondary Level' : 'Senior Secondary'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}