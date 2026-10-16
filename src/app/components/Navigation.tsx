import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onStartLearning: () => void;
}

export function Navigation({ currentPage, onNavigate, onStartLearning }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const edvoraLogo = 'https://lh3.googleusercontent.com/d/1ykHrwJsU3nQeYlTv-9bar-SYX5-6wT_x';

  const mainItems: { label: string; page: Page }[] = [
    { label: 'Guest Entry', page: 'guest' },
    { label: 'Classes', page: 'classes' },
    { label: 'Notes', page: 'notes' },
    { label: 'PYQs', page: 'pyqs' },
    { label: 'Sample Papers', page: 'sample-papers' },
    { label: 'JEE/NEET', page: 'jee-neet' },
  ];

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={edvoraLogo} alt="Edvora" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-gray-900">Edvora</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainItems.map((item) => {
              const isJeeNeet = item.page === 'jee-neet';
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? isJeeNeet
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-blue-50 text-blue-600'
                      : isJeeNeet
                        ? 'text-indigo-600 font-semibold hover:bg-indigo-50'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              {mainItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`text-left px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-600'
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
