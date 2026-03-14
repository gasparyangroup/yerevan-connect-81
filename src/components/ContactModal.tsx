import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  type: 'sponsor' | 'architect';
}

export function ContactModal({ isOpen, onClose, type }: ContactModalProps) {
  const { t } = useLanguage();

  const handleTelegram = () => {
    window.open('https://t.me/meryerevan', '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-background rounded-3xl p-5 sm:p-6 pointer-events-auto relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-foreground mb-1 pr-10">
                {type === 'sponsor' ? t('becomeSponsor') : t('applyArchitect')}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {type === 'sponsor' ? t('sponsorDesc') : t('architectDesc')}
              </p>

              <Button onClick={handleTelegram} className="w-full btn-gradient rounded-2xl h-11 gap-2">
                <Send className="w-4 h-4" />
                {t('writeInTelegram')}
              </Button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
