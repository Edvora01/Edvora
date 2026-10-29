import { useState, useEffect } from 'react';

import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { GuestEntry } from './components/GuestEntry';
import { ClassesPage } from './components/ClassesPage';
import { SubjectsPage } from './components/SubjectsPage';
import { SubjectPartsPage } from './components/SubjectPartsPage';
import { ChaptersPage } from './components/ChaptersPage';
import { NotesPage } from './components/NotesPage';
import { PYQsPage } from './components/PYQsPage';
import { SamplePapersPage } from './components/SamplePapersPage';
import { JeeNeetPage } from './components/JeeNeetPage';
import { SkillsPage } from './components/SkillsPage';
import { BooksByMePage } from './components/BooksByMePage';
import { CoursePage } from './components/CoursePage';
import { LessonPage } from './components/LessonPage';

import { getSubjectParts } from './data/subjects';
import { courses } from './data/courseContent';

import type {
  Course,
  Lesson,
  Module,
} from './data/courseContent';

export type Page =
  | 'home'
  | 'guest'
  | 'classes'
  | 'subjects'
  | 'subject-parts'
  | 'chapters'
  | 'notes'
  | 'pyqs'
  | 'sample-papers'
  | 'jee-neet'
  | 'skills'
  | 'books'
  | 'course'
  | 'lesson';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSubjectPart, setSelectedSubjectPart] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleClassSelect = (classNum: number) => {
    setSelectedClass(classNum);
    setSelectedSubject(null);
    setSelectedSubjectPart(null);
    setSelectedChapter(null);
    setCurrentPage('subjects');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedSubjectPart(null);
    setSelectedChapter(null);

    const parts = selectedClass
      ? getSubjectParts(subject, selectedClass)
      : null;

    if (parts) {
      setCurrentPage('subject-parts');
    } else {
      setCurrentPage('chapters');
    }
  };

  const handleSubjectPartSelect = (part: string) => {
    setSelectedSubjectPart(part);
    setCurrentPage('chapters');
  };

  const handleStartLearning = () => {
    setCurrentPage('classes');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleSkillSelect = (skillId: string) => {
    const course = courses.find((item) => item.id === skillId);

    if (!course) {
      window.alert(
        'This learning path is coming soon. Please explore Data Science or Professional Communication Skills for now.',
      );
      return;
    }

    setSelectedCourse(course);
    setSelectedLesson(null);
    setSelectedModule(null);
    setCurrentPage('course');
  };

  const handleLessonSelect = (lesson: Lesson, module: Module) => {
    setSelectedLesson(lesson);
    setSelectedModule(module);
    setCurrentPage('lesson');
  };

  const handleBackToSkills = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
    setSelectedModule(null);
    setCurrentPage('skills');
  };

  const subjectParts =
    selectedClass && selectedSubject
      ? getSubjectParts(selectedSubject, selectedClass)
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onStartLearning={handleStartLearning}
      />

      <main>
        {currentPage === 'home' && (
          <HomePage onStartLearning={handleStartLearning} />
        )}

        {currentPage === 'guest' && (
          <GuestEntry onStartLearning={handleStartLearning} />
        )}

        {currentPage === 'classes' && (
          <ClassesPage onClassSelect={handleClassSelect} />
        )}

        {currentPage === 'subjects' && selectedClass !== null && (
          <SubjectsPage
            selectedClass={selectedClass}
            onSubjectSelect={handleSubjectSelect}
            onBack={() => setCurrentPage('classes')}
          />
        )}

        {currentPage === 'subject-parts' &&
          selectedClass !== null &&
          selectedSubject &&
          subjectParts && (
            <SubjectPartsPage
              selectedClass={selectedClass}
              selectedSubject={selectedSubject}
              parts={subjectParts}
              onPartSelect={handleSubjectPartSelect}
              onBack={() => setCurrentPage('subjects')}
            />
          )}

        {currentPage === 'chapters' &&
          selectedClass !== null &&
          selectedSubject && (
            <ChaptersPage
              selectedClass={selectedClass}
              selectedSubject={selectedSubject}
              selectedSubjectPart={selectedSubjectPart}
              onBack={() => {
                if (subjectParts) {
                  setCurrentPage('subject-parts');
                } else {
                  setCurrentPage('subjects');
                }
              }}
            />
          )}

        {currentPage === 'notes' && <NotesPage />}

        {currentPage === 'pyqs' && <PYQsPage />}

        {currentPage === 'sample-papers' && <SamplePapersPage />}

        {currentPage === 'jee-neet' && <JeeNeetPage />}

        {currentPage === 'skills' && (
          <SkillsPage onSkillSelect={handleSkillSelect} />
        )}

        {currentPage === 'books' && <BooksByMePage />}

        {currentPage === 'course' && selectedCourse && (
          <CoursePage
            course={selectedCourse}
            onLessonSelect={handleLessonSelect}
            onBack={handleBackToSkills}
          />
        )}

        {currentPage === 'lesson' &&
          selectedCourse &&
          selectedLesson &&
          selectedModule && (
            <LessonPage
              course={selectedCourse}
              module={selectedModule}
              lesson={selectedLesson}
              onBack={() => setCurrentPage('course')}
            />
          )}
      </main>
    </div>
  );
}