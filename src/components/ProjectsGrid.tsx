import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { Project, ProjectStage } from '@/data/projects';

interface ProjectsGridProps {
  projects: Project[];
  activeFilter: ProjectStage;
  onViewDetails: (project: Project) => void;
  onAction: (project: Project, action: 'sponsor' | 'architect' | 'vote') => void;
}

export function ProjectsGrid({ projects, activeFilter, onViewDetails, onAction }: ProjectsGridProps) {
  const filteredProjects = projects.filter((p) => p.stage === activeFilter);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {activeFilter === 'fundraising' && 'Projects Seeking Sponsors'}
              {activeFilter === 'concept' && 'Projects Seeking Architects'}
              {activeFilter === 'voting' && 'Projects Open for Voting'}
            </h2>
            <span className="text-muted-foreground">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
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
                <p className="text-muted-foreground text-lg">
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
