import { motion } from 'framer-motion';
import { MapPin, Users, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';
import { formatCurrency } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  onAction: (project: Project, action: 'sponsor' | 'architect') => void;
}

export function ProjectCard({ project, index, onViewDetails, onAction }: ProjectCardProps) {
  const { t, lang } = useLanguage();

  const stageBadgeConfig = {
    sponsorship: { label: t('navSponsorship'), icon: Users, color: 'bg-primary' },
    concept: { label: t('navConcept'), icon: Palette, color: 'bg-accent' },
  };

  const badge = stageBadgeConfig[project.stage];
  const BadgeIcon = badge.icon;

  const title = lang === 'en' ? project.titleEn : lang === 'am' ? project.titleAm : project.title;
  const location = lang === 'en' ? project.locationEn : lang === 'am' ? project.locationAm : project.location;
  const description = lang === 'en' ? project.descriptionEn : lang === 'am' ? project.descriptionAm : project.description;
  const buttonLabel = lang === 'en' ? project.buttonLabelEn : lang === 'am' ? project.buttonLabelAm : project.buttonLabel;
  const budgetLabel = lang === 'en' ? project.budgetLabelEn : lang === 'am' ? project.budgetLabelAm : project.budgetLabel;
  const isSponsorFound = project.buttonLabel === '\u0421\u043F\u043E\u043D\u0441\u043E\u0440 \u043D\u0430\u0439\u0434\u0435\u043D';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-3xl overflow-hidden shadow-card card-hover cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute top-4 left-4 ${badge.color} text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          {badge.label}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-start gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{location}</span>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>

        <div className="pt-4 border-t border-border">
          {project.stage === 'sponsorship' && (project.budget || project.displayBudget !== undefined) && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">
                  {budgetLabel || t('budget')}{" "}
                </span>
                <span className="font-semibold text-foreground">
                  {project.displayBudget !== undefined
                    ? project.displayBudget
                    : formatCurrency(project.budget)}
                </span>
              </div>
              <Button
                size="sm"
                className={`rounded-xl ${isSponsorFound ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'btn-gradient'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(project, 'sponsor');
                }}
              >
                {buttonLabel || t('sponsor')}
              </Button>
            </div>
          )}

          {project.stage === 'concept' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  {t('openForBids')}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl border-accent text-accent hover:bg-accent hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(project, 'architect');
                }}
              >
                {buttonLabel || t('iAmArchitect')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
