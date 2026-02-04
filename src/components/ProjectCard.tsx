import { motion } from 'framer-motion';
import { MapPin, Users, Palette, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Project } from '@/data/projects';
import { formatCurrency, formatNumber } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  onAction: (project: Project, action: 'sponsor' | 'architect' | 'vote') => void;
}

const stageBadgeConfig = {
  sponsorship: { label: 'Sponsorship', icon: Users, color: 'bg-primary' },
  concept: { label: 'Concept Search', icon: Palette, color: 'bg-accent' },
  voting: { label: 'Voting', icon: Vote, color: 'bg-green-500' },
};

export function ProjectCard({ project, index, onViewDetails, onAction }: ProjectCardProps) {
  const badge = stageBadgeConfig[project.stage];
  const BadgeIcon = badge.icon;

  const getProgress = () => {
    if (project.stage === 'sponsorship' && project.budget && project.raised) {
      return (project.raised / project.budget) * 100;
    }
    return 0;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-card rounded-3xl overflow-hidden shadow-card card-hover cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Stage Badge */}
        <div className={`absolute top-4 left-4 ${badge.color} text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg`}>
          <BadgeIcon className="w-3.5 h-3.5" />
          {badge.label}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{project.location}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Dynamic Footer */}
        <div className="pt-4 border-t border-border">
          {project.stage === 'sponsorship' && project.budget && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Budget: </span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(project.budget)}
                </span>
              </div>
              <Button
                size="sm"
                className="btn-gradient rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(project, 'sponsor');
                }}
              >
                Sponsor
              </Button>
            </div>
          )}

          {project.stage === 'concept' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                  Open for Bids
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
                I am an Architect
              </Button>
            </div>
          )}

          {project.stage === 'voting' && project.votes && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-foreground">
                  {formatNumber(project.votes)}
                </span>
                <span className="text-muted-foreground text-sm">votes</span>
              </div>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(project, 'vote');
                }}
              >
                Vote
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
