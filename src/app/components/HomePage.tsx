import {
  BookOpen,
  FileText,
  Video,
  Download,
  ArrowRight,
  Check,
  WifiOff,
  Wifi,
  PenLine,
  FolderOpen,
  Printer,
  ShieldCheck,
  Monitor,
  Sparkles,
  Usb,
} from 'lucide-react';
import { Footer } from './Footer';
import { useState } from 'react';

interface HomePageProps {
  onStartLearning: () => void;
}

export function HomePage({ onStartLearning }: HomePageProps) {
  const [isFounderMessageExpanded, setIsFounderMessageExpanded] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<'basic' | 'pro'>('basic');

  const edvoraLogo =
    'https://lh3.googleusercontent.com/d/1ykHrwJsU3nQeYlTv-9bar-SYX5-6wT_x';
  const founderPhoto =
    'https://lh3.googleusercontent.com/d/1-5zhWqlOQ_awlRrhR2O4x-ZPpFveFYv6';

  const features = [
    { icon: BookOpen, title: 'Select My Class', description: 'Choose from Class 6 to 12' },
    { icon: FileText, title: 'Choose Subject', description: 'Pick my subject of interest' },
    { icon: Video, title: 'Pick a Chapter', description: 'Navigate to specific topics' },
    { icon: Download, title: 'Access Resources', description: 'PDFs, videos, and notes' },
  ];

  const benefits = [
    {
      title: 'Clean & Distraction-Free:',
      description: 'Focus only on learning without ads or clutter',
    },
    {
      title: 'Mobile-First Design:',
      description: 'Access my study materials anytime, anywhere on any device',
    },
    {
      title: 'Easy Navigation:',
      description: 'Quick flow from Class → Subject → Chapter → Resources',
    },
    {
      title: 'Quality Content:',
      description: 'Curated PDFs and videos for Classes 6-12',
    },
    {
      title: '100% Free:',
      description: 'No subscriptions, no hidden fees, just learning',
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Chapter-wise PDFs',
      description: 'Access organized study materials for every chapter',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Video,
      title: 'Video Lectures',
      description: 'Watch embedded YouTube videos for better understanding',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: Download,
      title: 'Easy Downloads',
      description: 'Download PDFs directly from Google Drive for offline study',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  const slateFeatures =
    selectedEdition === 'basic'
      ? [
          'Monochrome display for focused reading and writing',
          'Completely offline — no internet or social media',
          'Digital notebook with five page templates',
          'Local storage and USB-C file transfer',
          'Export notes as PDFs and print when needed',
          'Transfer educational videos for offline viewing',
        ]
      : [
          'Full-colour display for diagrams and learning content',
          'Controlled internet access for educational resources',
          'Digital notes organised into subject folders',
          'Local storage and USB-C file transfer',
          'PDF export and printing',
          'Designed with parental safety controls',
        ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={edvoraLogo} alt="Edvora" className="h-40 md:h-56 w-auto" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6">
            Smarter Learning Starts Here
          </h2>

          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Access quality educational content for Classes 6–12. Navigate seamlessly
            from class to subject to chapter, with PDFs and videos at your fingertips.
          </p>

          <button
            onClick={onStartLearning}
            className="bg-orange-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Edvora Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Why Choose Edvora?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">{benefit.title}</span>
                    <span className="text-gray-600"> {benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="space-y-8">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <resource.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinity Slate — Featured Product */}
      <section
        id="infinity-slate"
        className="relative overflow-hidden bg-slate-950 text-white py-24 md:py-32 px-6"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Product Story */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-300/20 bg-blue-400/10 text-blue-200 text-xs md:text-sm font-semibold tracking-[0.18em] mb-8">
                <Sparkles className="w-4 h-4" />
                A PRODUCT BY EDVORA
              </div>

              <p className="text-blue-300 font-medium tracking-[0.25em] text-sm mb-4">
                INTRODUCING
              </p>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
                INFINITY
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 mt-3">
                  SLATE <span className="font-light">∞</span>
                </span>
              </h2>

              <h3 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
                More Focus.
                <br />
                Less Paper.
                <br />
                <span className="text-blue-300">Better Learning.</span>
              </h3>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                A student-first digital writing and study device that brings notes,
                study material and focused learning together — without turning
                education into another source of distraction.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#infinity-slate-editions"
                  className="inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all shadow-lg shadow-blue-950/40 hover:-translate-y-0.5"
                >
                  Explore the Editions
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={onStartLearning}
                  className="inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                >
                  Explore Edvora Learning
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-7">
                <div>
                  <PenLine className="w-5 h-5 text-blue-300 mb-3" />
                  <p className="text-sm font-semibold">Write</p>
                  <p className="text-xs text-slate-400 mt-1">Capture your ideas</p>
                </div>
                <div>
                  <FolderOpen className="w-5 h-5 text-blue-300 mb-3" />
                  <p className="text-sm font-semibold">Organize</p>
                  <p className="text-xs text-slate-400 mt-1">Keep notes together</p>
                </div>
                <div>
                  <Printer className="w-5 h-5 text-blue-300 mb-3" />
                  <p className="text-sm font-semibold">Take it further</p>
                  <p className="text-xs text-slate-400 mt-1">Export and print</p>
                </div>
              </div>
            </div>

            {/* Stylized Digital Notebook Showcase */}
            <div className="relative max-w-xl w-full mx-auto">
              <div className="absolute inset-6 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.03] p-4 md:p-6 shadow-2xl backdrop-blur-sm">
                <div className="rounded-[1.5rem] bg-slate-200 p-3 md:p-4 shadow-inner">
                  <div className="overflow-hidden rounded-xl border border-slate-400/50 bg-[#f8fafc] text-slate-800">
                    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-slate-300 bg-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-xs font-semibold tracking-wide">INFINITY SLATE</span>
                      </div>
                      <span className="text-[10px] text-slate-500">STUDY WORKSPACE</span>
                    </div>

                    <div className="grid grid-cols-[68px_1fr] min-h-[300px] md:min-h-[350px]">
                      <div className="bg-slate-100 border-r border-slate-300 p-3 flex flex-col items-center gap-5">
                        <PenLine className="w-5 h-5 text-slate-700" />
                        <BookOpen className="w-5 h-5 text-slate-400" />
                        <FolderOpen className="w-5 h-5 text-slate-400" />
                        <FileText className="w-5 h-5 text-slate-400" />
                      </div>

                      <div className="p-5 md:p-7">
                        <div className="flex items-center justify-between gap-3 mb-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                              My Notebook
                            </p>
                            <h3 className="text-lg md:text-xl font-bold mt-1">Mathematics</h3>
                          </div>
                          <span className="text-xs px-3 py-1.5 rounded-full bg-slate-200 text-slate-600">
                            Grid
                          </span>
                        </div>

                        <div className="rounded-lg border border-slate-300 bg-white p-4 md:p-5 min-h-[175px] relative overflow-hidden">
                          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(#cbd5e1_1px,transparent_1px),linear-gradient(90deg,#cbd5e1_1px,transparent_1px)] bg-[size:20px_20px]" />
                          <div className="relative">
                            <p className="font-serif italic text-lg md:text-xl font-semibold text-slate-700">
                              Algebra
                            </p>
                            <div className="w-4/5 h-px bg-slate-400 mt-3 mb-4" />
                            <p className="font-serif italic text-sm md:text-base text-slate-600">
                              (a + b)² = a² + 2ab + b²
                            </p>
                            <p className="font-serif italic text-sm md:text-base text-slate-600 mt-3">
                              (a − b)² = a² − 2ab + b²
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {['Blank', 'Ruled', 'Grid', 'Graph', 'Dot Grid'].map((page) => (
                            <span
                              key={page}
                              className={`text-[10px] md:text-xs px-2.5 py-1.5 rounded-md border ${
                                page === 'Grid'
                                  ? 'bg-slate-800 text-white border-slate-800'
                                  : 'bg-white text-slate-500 border-slate-300'
                              }`}
                            >
                              {page}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stylus */}
                <div className="absolute -right-2 md:-right-5 top-1/4 rotate-[35deg] h-52 md:h-64 w-3 rounded-full bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 shadow-xl border border-white/30" />
                <div className="absolute -left-3 bottom-10 rounded-xl border border-white/15 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-400/15 flex items-center justify-center">
                      <PenLine className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Your digital notebook</p>
                      <p className="text-[10px] text-slate-400">Made for focused study</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-slate-500 mt-6">
                Concept visualization · Prototype-stage product
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinity Slate Editions */}
      <section id="infinity-slate-editions" className="bg-slate-50 py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-blue-600">
              TWO EDITIONS. ONE MISSION.
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-5">
              Choose Your Learning Experience
            </h2>
            <p className="text-slate-600 md:text-lg leading-relaxed">
              The same study-first philosophy, designed for different learning needs.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <button
                onClick={() => setSelectedEdition('basic')}
                aria-pressed={selectedEdition === 'basic'}
                className={`rounded-xl px-6 md:px-9 py-3 font-semibold transition-all ${
                  selectedEdition === 'basic'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Slate Basic
              </button>
              <button
                onClick={() => setSelectedEdition('pro')}
                aria-pressed={selectedEdition === 'pro'}
                className={`rounded-xl px-6 md:px-9 py-3 font-semibold transition-all ${
                  selectedEdition === 'pro'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Slate Pro
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-7 md:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    INFINITY SLATE
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                    {selectedEdition === 'basic' ? 'Basic' : 'Pro'}
                  </h3>
                  <p className="text-slate-600 mt-2">
                    {selectedEdition === 'basic'
                      ? 'Your digital notebook. Nothing distracting.'
                      : 'Your connected study tablet. Learning first.'}
                  </p>
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    selectedEdition === 'basic'
                      ? 'bg-slate-100 text-slate-800'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {selectedEdition === 'basic' ? (
                    <WifiOff className="w-8 h-8" />
                  ) : (
                    <Monitor className="w-8 h-8" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {slateFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  {selectedEdition === 'basic' ? (
                    <>
                      <WifiOff className="w-5 h-5 flex-shrink-0" />
                      <span>Intentionally offline. Designed to reduce distractions.</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                      <span>Connectivity with a study-first approach.</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-3xl p-7 md:p-9 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-800 text-white shadow-xl shadow-blue-900/15 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-7">
                  {selectedEdition === 'basic' ? (
                    <PenLine className="w-7 h-7" />
                  ) : (
                    <Wifi className="w-7 h-7" />
                  )}
                </div>

                <p className="text-blue-100 text-sm font-semibold tracking-widest mb-3">
                  {selectedEdition === 'basic' ? 'FOCUS WITHOUT WI-FI' : 'CONNECTED LEARNING'}
                </p>

                <h3 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
                  {selectedEdition === 'basic'
                    ? 'Less distraction. More concentration.'
                    : 'More learning possibilities. Thoughtful controls.'}
                </h3>

                <p className="text-blue-50/90 leading-relaxed mb-8">
                  {selectedEdition === 'basic'
                    ? 'Write, save, organize and transfer your study material without internet access.'
                    : 'Access educational resources through controlled connectivity while keeping learning at the centre.'}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Usb className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-sm">USB-C and external storage workflow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-sm">Notes, documents and PDF workflow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-sm">Designed around students' needs</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-blue-100/70 mt-10 pt-5 border-t border-white/15">
                Infinity Slate is a prototype-stage concept. Specifications may evolve
                during testing and refinement.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              Infinity Slate is a product concept by Edvora. Hardware development,
              independent evaluation and classroom testing are part of its planned roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Smarter Learning Starts Here
          </h2>
          <button
            onClick={onStartLearning}
            className="bg-orange-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
          <p className="text-gray-600 mb-12">
            Hear from students who are learning smarter with Edvora
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <div className="text-5xl text-blue-600 mb-6">"</div>
            <p className="text-lg text-gray-700 mb-8">
              Edvora makes learning so simple and effective. Love the clean design!
            </p>
            <div>
              <p className="font-semibold text-gray-900">Amit K.</p>
              <p className="text-sm text-gray-600">Student, Class 10</p>
            </div>
          </div>
        </div>
      </section>

      {/* Message from Founder Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Message from the Founder
          </h2>
          <p className="text-gray-600 mb-12 text-center">
            A note from the student who built Edvora
          </p>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                    <img
                      src={founderPhoto}
                      alt="Madhav - Founder of Edvora"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">👋 Madhav</p>
                    <p className="text-blue-100 font-medium">Founder & Creator</p>
                    <p className="text-sm text-blue-200">
                      Student • Developer • Learner
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed mb-4">
                    <span className="text-2xl">👋</span> <strong>Hi, I'm Madhav</strong>
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Founder – Edvora</strong>
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    I'm a student, just like you.
                  </p>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Edvora wasn't started in a big office or with a big team — it
                      started with a simple problem I faced every day as a student.
                    </p>
                    <p>
                      While studying, I realized how difficult it is to find all study
                      resources in one clean place — NCERT PDFs, chapter-wise notes,
                      YouTube videos, revision material… everything was scattered.
                    </p>
                    <p className="font-medium">So I decided to build Edvora.</p>
                  </div>

                  {isFounderMessageExpanded && (
                    <div className="mt-6 space-y-6 text-gray-700 leading-relaxed animate-fadeIn">
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-3">
                          🎯 Why Edvora Exists
                        </p>
                        <p className="mb-2">
                          Edvora is made by a student, for students of Classes 6 to 12.
                        </p>
                        <p className="mb-3">The goal is simple:</p>
                        <ul className="space-y-2 ml-6 list-disc text-gray-700">
                          <li>Make learning easy and distraction-free</li>
                          <li>Give class → subject → chapter-wise content</li>
                          <li>Help students study smarter, not harder</li>
                          <li>Keep everything 100% free and simple</li>
                        </ul>
                        <p className="mt-4 font-medium">
                          No ads.
                          <br />
                          No confusion.
                          <br />
                          Just learning.
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-3">
                          📘 What You'll Find on Edvora
                        </p>
                        <ul className="space-y-2 ml-6 list-disc text-gray-700">
                          <li>Chapter-wise PDFs</li>
                          <li>Curated YouTube learning videos</li>
                          <li>Notes, formulas, mind maps & important questions</li>
                          <li>Easy navigation for Classes 6–12</li>
                        </ul>
                        <p className="mt-4">
                          Everything is organized the way students actually study.
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-3">
                          💙 A Message to Students
                        </p>
                        <p className="mb-3">
                          Edvora is still growing — just like us.
                          <br />
                          New content, better features, and smarter tools are being added
                          step by step.
                        </p>
                        <p className="mb-4">
                          If Edvora helps you understand even one concept better,
                          <br />
                          then this journey is worth it.
                        </p>
                        <p className="font-semibold text-gray-900">
                          Let's learn better.
                          <br />
                          Let's learn smarter.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-900 font-semibold">— Madhav</p>
                        <p className="text-sm text-gray-600">Founder, Edvora</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <button
                      onClick={() =>
                        setIsFounderMessageExpanded(!isFounderMessageExpanded)
                      }
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      {isFounderMessageExpanded ? (
                        <>
                          Show Less
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          Read More
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}