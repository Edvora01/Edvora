import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'guest' | 'classes' | 'subjects' | 'chapters' | 'notes';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onStartLearning: () => void;
}

export function Navigation({ currentPage, onNavigate, onStartLearning }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const edvoraLogo = 'https://drive.google.com/uc?export=view&id=1ykHrwJsU3nQeYlTv-9bar-SYX5-6wT_x';

  const menuItems: { label: string; page: Page }[] = [
    { label: 'Guest Entry', page: 'guest' },
    { label: 'Classes', page: 'classes' },
    { label: 'Subjects', page: 'subjects' },
    { label: 'Chapters', page: 'chapters' },
    { label: 'Notes', page: 'notes' },
  ];

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={edvoraLogo} alt="Edvora" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-gray-900">Edvora</span>
          </button>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}