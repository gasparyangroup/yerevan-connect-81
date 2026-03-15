import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestionModal({ isOpen, onClose }: SuggestionModalProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
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

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{t('suggestTitle')}</h2>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {t('suggestSubtitle')}
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
