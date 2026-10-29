import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Palette,
  Video,
  MessageCircle,
  Clock3,
  BookOpen,
} from 'lucide-react';

interface SkillsPageProps {
  onSkillSelect: (skillId: string) => void;
}

const skills = [
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Learn to understand, analyse and visualise data.',
    icon: Database,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Build your programming foundation with Python.',
    icon: Code2,
    color: 'bg-yellow-50 text-yellow-700',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Learn how websites are built and developed.',
    icon: Globe,
    color: 'bg-teal-50 text-teal-600',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Explore design principles, layouts and visual communication.',
    icon: Palette,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Learn editing fundamentals, storytelling and workflows.',
    icon: Video,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    id: 'communication',
    title: 'Professional Communication Skills',
    description: 'Develop speaking, listening and presentation skills.',
    icon: MessageCircle,
    color: 'bg-pink-50 text-pink-600',
  },
];

export function SkillsPage({ onSkillSelect }: SkillsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-100 px-6 py-12 md:px-12 md:py-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-6">
              <BookOpen className="w-4 h-4" />
              Learn Beyond School
            </span>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
              Build Skills for Your Future
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Explore practical skills in programming, data, design,
              video production and communication—all in one place.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Explore Skills
              </h2>
              <p className="text-gray-600 mt-2">
                Choose a learning path to get started.
              </p>
            </div>

            <span className="text-sm text-gray-500">
              {skills.length} learning paths
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <button
                  key={skill.id}
                  onClick={() => onSkillSelect(skill.id)}
                  className="group text-left bg-white border border-gray-200 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${skill.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    {skill.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed min-h-10">
                    {skill.description}
                  </p>

                  <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      Learning path
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 className="w-4 h-4" />
                      Self-paced
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Learn at Your Own Pace
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Course lessons and videos will appear as they become available.
              Unpublished content will not be shown as completed or available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}