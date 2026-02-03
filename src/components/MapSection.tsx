import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

interface MapSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const mapPins = [
  { x: '35%', y: '40%', projectId: '1' },
  { x: '55%', y: '30%', projectId: '2' },
  { x: '70%', y: '55%', projectId: '3' },
  { x: '25%', y: '60%', projectId: '4' },
  { x: '60%', y: '70%', projectId: '5' },
  { x: '45%', y: '45%', projectId: '6' },
];

export function MapSection({ projects, onSelectProject }: MapSectionProps) {
  const handlePinClick = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      onSelectProject(project);
    }
  };

  return (
    <section className="py-24 bg-yerevan-slate relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Explore Projects{' '}
              <span className="gradient-text">Across the City</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Click on any pin to discover urban improvement projects happening 
              in different neighborhoods of Yerevan. Every corner of our city 
              has a story waiting to be told.
            </p>
            <Button
              variant="outline"
              className="rounded-2xl border-white/20 text-white hover:bg-white/10 gap-2"
            >
              View All Projects
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            {/* Map background */}
            <div className="absolute inset-0 rounded-3xl bg-slate-800/50 border border-white/10 overflow-hidden">
              {/* Simplified city grid */}
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <path d="M10,50 L90,50" stroke="white" strokeWidth="0.5" />
                <path d="M50,10 L50,90" stroke="white" strokeWidth="0.5" />
                <path d="M20,20 L80,80" stroke="white" strokeWidth="0.3" />
                <path d="M80,20 L20,80" stroke="white" strokeWidth="0.3" />
                <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="0.3" fill="none" />
              </svg>
            </div>

            {/* Animated Pins */}
            {mapPins.map((pin, index) => {
              const project = projects.find((p) => p.id === pin.projectId);
              return (
                <motion.button
                  key={pin.projectId}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handlePinClick(pin.projectId)}
                  className="absolute group"
                  style={{ left: pin.x, top: pin.y }}
                >
                  {/* Pulse animation */}
                  <span className="absolute inset-0 -m-2 rounded-full bg-primary/30 animate-pulse" />
                  <span className="absolute inset-0 -m-4 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Pin icon */}
                  <div className="relative w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>

                  {/* Tooltip */}
                  {project && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-white rounded-xl px-3 py-2 shadow-lg whitespace-nowrap">
                        <p className="text-sm font-medium text-foreground">{project.title}</p>
                        <p className="text-xs text-muted-foreground">{project.location}</p>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-white" />
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
