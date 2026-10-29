import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LockKeyhole,
} from 'lucide-react';

import type { Course, Lesson, Module } from '../data/courseContent';

interface CoursePageProps {
  course: Course;
  onLessonSelect: (lesson: Lesson, module: Module) => void;
  onBack: () => void;
}

export function CoursePage({
  course,
  onLessonSelect,
  onBack,
}: CoursePageProps) {
  const availableChapters = course.modules.reduce(
    (total, module) =>
      total + module.chapters.filter(
        (chapter) => chapter.status === 'ready',
      ).length,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition mb-7"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Skills
        </button>

        <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">
            <GraduationCap className="w-4 h-4" />
            EDVORA Academy
          </span>

          <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            {course.title}
          </h1>

          <p className="mt-3 text-lg font-medium text-blue-700">
            {course.tagline}
          </p>

          <p className="mt-5 max-w-3xl text-gray-600 leading-relaxed">
            {course.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {course.totalModules} modules planned
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              {course.totalChapters} chapters planned
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              {availableChapters} chapters marked ready
            </span>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Module and chapter counts show the planned course structure.
            Only the content listed below is currently configured.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Course Curriculum
          </h2>

          <p className="mt-2 text-gray-600">
            Select an available chapter to open its learning page.
          </p>

          <div className="mt-6 space-y-6">
            {course.modules.map((module, moduleIndex) => (
              <article
                key={module.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="border-b border-gray-100 bg-gray-50 p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Module {moduleIndex + 1}
                  </p>

                  <h3 className="mt-2 text-lg md:text-xl font-bold text-gray-900">
                    {module.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {module.description}
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  {module.chapters.map((chapter) => {
                    const isReady = chapter.status === 'ready';

                    return (
                      <div
                        key={chapter.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              isReady
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {isReady ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <LockKeyhole className="h-5 w-5" />
                            )}
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {chapter.title}
                            </h4>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <span className="inline-flex items-center gap-1">
                                <Clock3 className="h-3.5 w-3.5" />
                                {chapter.duration}
                              </span>

                              <span
                                className={`rounded-full px-2.5 py-1 font-medium ${
                                  isReady
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {isReady ? 'Content configured' : 'Coming soon'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          disabled={!isReady}
                          onClick={() => onLessonSelect(chapter, module)}
                          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                        >
                          {isReady ? 'Open Lesson' : 'Coming Soon'}
                          {isReady && <ArrowRight className="h-4 w-4" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}