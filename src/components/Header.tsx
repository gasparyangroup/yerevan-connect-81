import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenSuggest: () => void;
  onNavigate: (section: string) => void;
}

const navLinks = [
  { id: 'fundraising', label: 'Fundraising' },
  { id: 'concept', label: 'Concept Search' },
  { id: 'voting', label: 'Voting' },
];

const languages = ['AM', 'RU', 'EN'];

export function Header({ onOpenAbout, onOpenSuggest, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-soft border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">Մ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">Մdelays Երdelays</h1>
              <button
                onClick={onOpenAbout}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Urban Projects Platform
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 text-xs">
              {languages.map((lang, i) => (
                <span key={lang} className="flex items-center">
                  <button
                    onClick={() => setActiveLang(lang)}
                    className={`transition-colors ${
                      activeLang === lang
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang}
                  </button>
                  {i < languages.length - 1 && (
                    <span className="text-border mx-1">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Suggest Button */}
            <Button
              onClick={onOpenSuggest}
              className="hidden sm:flex btn-gradient rounded-2xl gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Suggest Idea
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-foreground font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-2 py-2">
                {languages.map((lang, i) => (
                  <span key={lang} className="flex items-center">
                    <button
                      onClick={() => setActiveLang(lang)}
                      className={`text-sm ${
                        activeLang === lang
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {lang}
                    </button>
                    {i < languages.length - 1 && (
                      <span className="text-border mx-2">|</span>
                    )}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => {
                  onOpenSuggest();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full btn-gradient rounded-2xl gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Suggest Idea
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
