import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, FileText, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';
import { formatCurrency } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (project: Project, action: 'sponsor' | 'architect') => void;
}

export function ProjectModal({ project, isOpen, onClose, onAction }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { t, lang } = useLanguage();

  if (!project) return null;

  const title = lang === 'en' ? project.titleEn : lang === 'am' ? project.titleAm : project.title;
  const location = lang === 'en' ? project.locationEn : lang === 'am' ? project.locationAm : project.location;
  const description = lang === 'en' ? project.descriptionEn : lang === 'am' ? project.descriptionAm : project.description;
  const problem = lang === 'en' ? project.problemEn : lang === 'am' ? project.problemAm : project.problem;
  const goal = lang === 'en' ? project.goalEn : lang === 'am' ? project.goalAm : project.goal;

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % project.gallery.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-background rounded-3xl overflow-hidden z-50 flex flex-col lg:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={project.gallery[selectedImage]}
                    alt={title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {project.gallery.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {project.gallery.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {project.gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{title}</h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

              {problem && (
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-2">{t('problem')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem}</p>
                </div>
              )}

              {goal && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">{t('goal')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{goal}</p>
                </div>
              )}

              {project.documents && project.documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">{t('documents')}</h3>
                  <div className="space-y-2">
                    {project.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="flex-1 text-foreground">{doc.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-secondary/30 flex flex-col p-6">
              <h3 className="font-semibold text-foreground mb-4">{t('info')}</h3>

              {project.stage === 'sponsorship' && project.budget && (
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-background">
                    <p className="text-xs text-muted-foreground mb-1">{t('totalBudget')}</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(project.budget)}</p>
                  </div>
                  {project.presentationUrl && (
                    <a
                      href={project.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-foreground font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('openPresentation')}
                    </a>
                  )}
                </div>
              )}

              <Button
                className="w-full btn-gradient rounded-2xl h-12 text-base"
                onClick={() => {
                  if (project.stage === 'sponsorship') onAction(project, 'sponsor');
                  else if (project.stage === 'concept') onAction(project, 'architect');
                }}
              >
                {project.stage === 'sponsorship' && t('becomeSponsor')}
                {project.stage === 'concept' && t('applyArchitect')}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
