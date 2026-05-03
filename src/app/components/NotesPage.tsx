import { BookOpen, Search, Filter } from 'lucide-react';

export function NotesPage() {
  const notesCategories = [
    {
      title: 'Quick Revision Notes',
      description: 'Concise notes for last-minute revision',
      count: 45,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Formula Sheets',
      description: 'All important formulas in one place',
      count: 28,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Mind Maps',
      description: 'Visual representation of concepts',
      count: 32,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Important Questions',
      description: 'Frequently asked exam questions',
      count: 56,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Study Notes</h1>
          <p className="text-xl text-gray-600 mb-8">
            Access curated notes, formulas, and revision materials
          </p>
          
          <div className="max-w-2xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notes by topic or chapter..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-white px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {notesCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.count} resources</span>
                <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform inline-block">
                  Browse →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Specific Notes?</h2>
          <p className="text-lg text-blue-100 mb-8">
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
