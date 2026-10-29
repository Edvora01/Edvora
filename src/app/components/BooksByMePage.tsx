import { BookOpen, LibraryBig } from 'lucide-react';

export function BooksByMePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-orange-50 border border-gray-100 px-6 py-12 md:px-12 md:py-16">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
              <LibraryBig className="w-7 h-7" />
            </div>

            <p className="text-sm font-semibold text-blue-700 mb-3">
              EDVORA LIBRARY
            </p>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
              Books by Me
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Discover books and learning resources authored and published
              through EDVORA.
            </p>
          </div>

          <div className="mt-10 bg-white border border-gray-200 rounded-3xl px-6 py-16 md:py-20 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your Library Is Growing
            </h2>

            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
              New books will appear here when they are ready to publish.
              Check back soon for upcoming EDVORA publications.
            </p>

            <span className="inline-flex mt-6 rounded-full bg-orange-50 text-orange-700 px-4 py-2 text-sm font-semibold">
              More books coming soon
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}