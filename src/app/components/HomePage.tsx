import { BookOpen, FileText, Video, Download } from 'lucide-react';
import { Footer } from './Footer';
import { useState } from 'react';

interface HomePageProps {
  onStartLearning: () => void;
}

export function HomePage({ onStartLearning }: HomePageProps) {
  const [isFounderMessageExpanded, setIsFounderMessageExpanded] = useState(false);
  const edvoraLogo = 'https://drive.google.com/uc?export=view&id=1ykHrwJsU3nQeYlTv-9bar-SYX5-6wT_x';
  const founderPhoto = 'https://drive.google.com/uc?export=view&id=1-5zhWqlOQ_awlRrhR2O4x-ZPpFveFYv6';
  
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
            {/* Left: Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">{benefit.title}</span>
                    <span className="text-gray-600"> {benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Resource Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="space-y-8">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
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
          <p className="text-gray-600 mb-12">Hear from students who are learning smarter with Edvora</p>
          
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Message from the Founder</h2>
          <p className="text-gray-600 mb-12 text-center">A note from the student who built Edvora</p>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left Side - Photo */}
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
                    <p className="text-sm text-blue-200">Student • Developer • Learner</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Message */}
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

                  {/* Preview Text - Always Visible */}
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Edvora wasn't started in a big office or with a big team —
                      it started with a simple problem I faced every day as a student.
                    </p>
                    <p>
                      While studying, I realized how difficult it is to find all study resources in one clean place —
                      NCERT PDFs, chapter-wise notes, YouTube videos, revision material…
                      everything was scattered.
                    </p>
                    <p className="font-medium">
                      So I decided to build Edvora.
                    </p>
                  </div>

                  {/* Expanded Content */}
                  {isFounderMessageExpanded && (
                    <div className="mt-6 space-y-6 text-gray-700 leading-relaxed animate-fadeIn">
                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-3">🎯 Why Edvora Exists</p>
                        <p className="mb-2">Edvora is made by a student, for students of Classes 6 to 12.</p>
                        <p className="mb-3">The goal is simple:</p>
                        <ul className="space-y-2 ml-6 list-disc text-gray-700">
                          <li>Make learning easy and distraction-free</li>
                          <li>Give class → subject → chapter-wise content</li>
                          <li>Help students study smarter, not harder</li>
                          <li>Keep everything 100% free and simple</li>
                        </ul>
                        <p className="mt-4 font-medium">
                          No ads.<br/>
                          No confusion.<br/>
                          Just learning.
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-gray-900 mb-3">📘 What You'll Find on Edvora</p>
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
                        <p className="text-xl font-bold text-gray-900 mb-3">💙 A Message to Students</p>
                        <p className="mb-3">
                          Edvora is still growing — just like us.<br/>
                          New content, better features, and smarter tools are being added step by step.
                        </p>
                        <p className="mb-4">
                          If Edvora helps you understand even one concept better,<br/>
                          then this journey is worth it.
                        </p>
                        <p className="font-semibold text-gray-900">
                          Let's learn better.<br/>
                          Let's learn smarter.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-900 font-semibold">— Madhav</p>
                        <p className="text-sm text-gray-600">Founder, Edvora</p>
                      </div>
                    </div>
                  )}

                  {/* Read More / Show Less Button */}
                  <div className="mt-8">
                    <button
                      onClick={() => setIsFounderMessageExpanded(!isFounderMessageExpanded)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      {isFounderMessageExpanded ? (
                        <>
                          Show Less
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          Read More
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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