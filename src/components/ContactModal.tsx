import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User as UserIcon, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Project } from '@/data/projects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  type: 'sponsor' | 'architect' | 'vote';
}

export function ContactModal({ isOpen, onClose, project, type }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
      onClose();
    }, 2000);
  };

  const getTitle = () => {
    switch (type) {
      case 'sponsor':
        return 'Стать спонсором';
      case 'architect':
        return 'Подать заявку как архитектор';
      case 'vote':
        return 'Подтвердить голос';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'sponsor':
        return 'Оставьте ваши контактные данные, и наша команда свяжется с вами для обсуждения возможностей спонсорства.';
      case 'architect':
        return 'Хотите поделиться своим архитектурным видением? Оставьте свои данные, и мы свяжем вас с командой проекта.';
      case 'vote':
        return 'Подтвердите свою личность для голосования. Ваша информация помогает обеспечить один голос на гражданина.';
    }
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-background rounded-3xl p-6 sm:p-8 z-[60] max-h-[90vh] overflow-y-auto"
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
                <h3 className="text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground">
                  Мы получили вашу информацию и скоро свяжемся с вами.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-2">{getTitle()}</h2>
                <p className="text-muted-foreground mb-6">{getDescription()}</p>

                {project && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Полное имя</Label>
                    <div className="relative mt-1.5">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Иванов"
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">Номер телефона</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+374 XX XXX XXX"
                        className="pl-10 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-gradient rounded-2xl h-12 gap-2">
                    <Send className="w-4 h-4" />
                    {type === 'vote' ? 'Отправить голос' : 'Отправить'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
