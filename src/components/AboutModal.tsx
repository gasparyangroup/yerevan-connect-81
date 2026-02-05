import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background rounded-3xl p-8 z-50"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">Մ</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">О платформе Մer Yerevan</h2>
                <p className="text-muted-foreground">Платформа городских проектов</p>
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Մer Երewan</strong> (Наш Ереван) — это гражданская технологическая платформа, 
                которая объединяет жителей, спонсоров и архитекторов для преобразования городских пространств столицы Армении.
              </p>
              <p>
                Наша миссия — демократизировать городское развитие, давая каждому гражданину голос в формировании 
                своего города. От финансирования публичных арт-инсталляций до голосования за дизайн парков — мы верим, 
                что лучшие идеи для Еревана исходят от людей, которые здесь живут.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 rounded-2xl bg-secondary">
                  <p className="text-2xl font-bold gradient-text">50+</p>
                  <p className="text-xs text-muted-foreground">Проектов</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-secondary">
                  <p className="text-2xl font-bold gradient-text">10K+</p>
                  <p className="text-xs text-muted-foreground">Граждан</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-secondary">
                  <p className="text-2xl font-bold gradient-text">₽2B</p>
                  <p className="text-xs text-muted-foreground">Собрано</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
