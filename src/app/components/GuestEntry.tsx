import { BookOpen, Users, Clock, Award } from 'lucide-react';

interface GuestEntryProps {
  onStartLearning: () => void;
}

export function GuestEntry({ onStartLearning }: GuestEntryProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Library',
      description: 'Access study materials for all subjects from Class 6 to 12',
    },
    {
      icon: Users,
      title: 'Self-Paced Learning',
      description: 'Learn at your own speed without any time restrictions',
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Study anytime, anywhere with our always-available platform',
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Curated educational resources from trusted sources',
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Edvora</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your learning journey today. No signup required, just pure learning.
          </p>
          <button
            onClick={onStartLearning}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse Classes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Select my class and start exploring subjects, chapters, and resources
          </p>
          <button
            onClick={onStartLearning}
            className="bg-orange-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}
