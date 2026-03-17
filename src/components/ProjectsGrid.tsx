import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Filter } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project, ProjectStage } from '@/data/projects';

type SortOption = 'default' | 'cheapFirst' | 'expensiveFirst';
type SponsorFilter = 'all' | 'found' | 'needed';

interface ProjectsGridProps {
  projects: Project[];
  activeFilter: ProjectStage;
  onViewDetails: (project: Project) => void;
  onAction: (project: Project, action: 'sponsor' | 'architect') => void;
}

function isSponsorFound(project: Project): boolean {
  return project.buttonLabel === 'Спонсор найден';
}

function getBudgetValue(project: Project): number | null {
  if (project.displayBudget === 'N/A' || (!project.budget && !project.displayBudget)) return null;
  return project.budget || 0;
}

export function ProjectsGrid({ projects, activeFilter, onViewDetails, onAction }: ProjectsGridProps) {
  const { t } = useLanguage();
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [sponsorFilter, setSponsorFilter] = useState<SponsorFilter>('all');

  const filteredAndSorted = useMemo(() => {
    let result = projects.filter((p) => p.stage === activeFilter);

    // Sponsor filter (only for sponsorship stage)
    if (activeFilter === 'sponsorship' && sponsorFilter !== 'all') {
      result = result.filter((p) =>
        sponsorFilter === 'found' ? isSponsorFound(p) : !isSponsorFound(p)
      );
    }

    // Sort by budget (only for sponsorship stage)
    if (activeFilter === 'sponsorship' && sortOption !== 'default') {
      result = [...result].sort((a, b) => {
        const aVal = getBudgetValue(a);
        const bVal = getBudgetValue(b);
        // N/A budgets go to end
        if (aVal === null && bVal === null) return 0;
        if (aVal === null) return 1;
        if (bVal === null) return -1;
        return sortOption === 'cheapFirst' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [projects, activeFilter, sortOption, sponsorFilter]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: t('sortDefault') },
    { value: 'cheapFirst', label: t('sortCheapFirst') },
    { value: 'expensiveFirst', label: t('sortExpensiveFirst') },
  ];

  const sponsorOptions: { value: SponsorFilter; label: string }[] = [
    { value: 'all', label: t('filterAll') },
    { value: 'found', label: t('filterSponsorFound') },
    { value: 'needed', label: t('filterSponsorNeeded') },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {activeFilter === 'sponsorship' && t('projectsSponsorshipHeading')}
              {activeFilter === 'concept' && t('projectsConceptHeading')}
            </h2>
            <span className="text-muted-foreground">
              {filteredAndSorted.length} {t('projectCount')}
            </span>
          </div>

          {activeFilter === 'sponsorship' && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Sort by price */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <div className="inline-flex p-1 bg-secondary rounded-full">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortOption(opt.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        sortOption === opt.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by sponsor status */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="inline-flex p-1 bg-secondary rounded-full">
                  {sponsorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSponsorFilter(opt.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        sponsorFilter === opt.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {filteredAndSorted.length > 0 ? (
              <motion.div
                key={`${activeFilter}-${sortOption}-${sponsorFilter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAndSorted.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onViewDetails={onViewDetails}
                    onAction={onAction}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">{t('noProjects')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
