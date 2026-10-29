import {
  ArrowLeft,
  BookOpen,
  Clock3,
  FileText,
  PlayCircle,
  Presentation,
} from 'lucide-react';

import type { Course, Lesson, Module } from '../data/courseContent';

interface LessonPageProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  onBack: () => void;
}

export function LessonPage({
  course,
  module,
  lesson,
  onBack,
}: LessonPageProps) {
  const videoUrl = lesson.videoUrl.trim();
  const presentationUrl = lesson.presentationUrl.trim();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </button>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
            <BookOpen className="h-4 w-4" />
            EDVORA ACADEMY
          </span>

          <p className="mt-6 text-sm font-medium text-gray-500">
            {course.title}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {lesson.title}
          </h1>

          <p className="mt-3 text-sm text-gray-600">{module.title}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {lesson.duration}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Learning Material
            </span>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <PlayCircle className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">Video Lesson</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Guided chapter video
                </p>
              </div>
            </div>

            <div className="p-5">
              {videoUrl ? (
                <video
                  controls
                  preload="metadata"
                  className="aspect-video w-full rounded-xl bg-black"
                  src={videoUrl}
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
                  <PlayCircle className="h-10 w-10 text-gray-400" />

                  <h3 className="mt-3 font-semibold text-gray-800">
                    Video Coming Soon
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                    The lesson video has not been added yet. It will appear
                    here after the video is uploaded and connected.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Presentation className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Chapter Presentation
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Presentation and study material
                </p>
              </div>
            </div>

            <div className="p-5">
              {presentationUrl ? (
                <div className="rounded-xl border border-green-100 bg-green-50 p-5">
                  <FileText className="h-9 w-9 text-green-700" />

                  <h3 className="mt-3 font-semibold text-gray-900">
                    Presentation Available
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Open the connected presentation in a new tab.
                  </p>

                  <a
                    href={presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Presentation className="h-4 w-4" />
                    Open Presentation
                  </a>
                </div>
              ) : (
                <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
                  <FileText className="h-10 w-10 text-gray-400" />

                  <h3 className="mt-3 font-semibold text-gray-800">
                    Presentation Not Connected
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                    The PPT file needs to be uploaded and its URL added to
                    this lesson before it can be opened here.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 md:p-6">
          <h2 className="font-bold text-gray-900">Recommended Study Order</h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Study the presentation when it is connected, revise the important
            concepts, and watch the video after it becomes available.
          </p>
        </section>
      </div>
    </div>
  );
}