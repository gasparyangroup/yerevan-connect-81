import { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { MapSection } from '@/components/MapSection';
import { Footer } from '@/components/Footer';
import { ProjectModal } from '@/components/ProjectModal';
import { AboutModal } from '@/components/AboutModal';
import { ContactModal } from '@/components/ContactModal';
import { SuggestionModal } from '@/components/SuggestionModal';
import { projects, type Project, type ProjectStage } from '@/data/projects';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStage>('fundraising');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactType, setContactType] = useState<'sponsor' | 'architect' | 'vote'>('sponsor');

  const projectsRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveFilter(section as ProjectStage);
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleAction = (project: Project, action: 'sponsor' | 'architect' | 'vote') => {
    setSelectedProject(project);
    setContactType(action);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenSuggest={() => setIsSuggestionModalOpen(true)}
        onNavigate={handleNavigate}
      />

      <Hero activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div ref={projectsRef}>
        <ProjectsGrid
          projects={projects}
          activeFilter={activeFilter}
          onViewDetails={handleViewDetails}
          onAction={handleAction}
        />
      </div>

      <MapSection projects={projects} onSelectProject={handleViewDetails} />

      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onAction={handleAction}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      <SuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        project={selectedProject}
        type={contactType}
      />
    </div>
  );
};

export default Index;
