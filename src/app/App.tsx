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
import { getSubjectParts } from './data/subjects';

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
  | 'books';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSubjectPart, setSelectedSubjectPart] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

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

        {currentPage === 'subjects' && selectedClass && (
          <SubjectsPage
            selectedClass={selectedClass}
            onSubjectSelect={handleSubjectSelect}
            onBack={() => setCurrentPage('classes')}
          />
        )}

        {currentPage === 'subject-parts' &&
          selectedClass &&
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
          selectedClass &&
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
          <SkillsPage
            onSkillSelect={(skillId) => {
              console.log('Selected skill:', skillId);
            }}
          />
        )}

        {currentPage === 'books' && <BooksByMePage />}
      </main>
    </div>
  );
}