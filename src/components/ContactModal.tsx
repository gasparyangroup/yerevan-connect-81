import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User as UserIcon, Send, CheckCircle, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  type: 'sponsor' | 'architect';
}

export function ContactModal({ isOpen, onClose, project, type }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, lang } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      onClose();
    }, 2000);
  };

  const getProjectTitle = () => {
    if (!project) return '';
    if (lang === 'en') return project.titleEn;
    if (lang === 'am') return project.titleAm;
    return project.title;
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
              className="w-full max-w-md bg-background rounded-3xl p-5 sm:p-6 pointer-events-auto max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{t('thankYou')}</h3>
                  <p className="text-muted-foreground">{t('weWillContact')}</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-1 pr-10">
                    {type === 'sponsor' ? t('becomeSponsor') : t('applyArchitect')}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {type === 'sponsor' ? t('sponsorDesc') : t('architectDesc')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    {project && (
                      <div>
                        <Label htmlFor="project" className="text-foreground text-sm">{t('project')}</Label>
                        <div className="relative mt-1">
                          <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="project"
                            value={getProjectTitle()}
                            className="pl-10 rounded-xl"
                            disabled
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="name" className="text-foreground text-sm">{t('nameCompany')}</Label>
                      <div className="relative mt-1">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t('namePlaceholder')}
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground text-sm">{t('phoneOrTelegram')}</Label>
                      <div className="relative mt-1">
                        <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t('phonePlaceholder')}
                          className="pl-10 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full btn-gradient rounded-2xl h-11 gap-2">
                      <Send className="w-4 h-4" />
                      {t('send')}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
