import { motion } from 'framer-motion';
import { Briefcase, HardHat, TreePine, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

interface Vacancy {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  tags: string[];
}

const vacancies: Vacancy[] = [
  {
    id: 'architect',
    titleKey: 'vacArchitectTitle',
    descriptionKey: 'vacArchitectDesc',
    icon: Briefcase,
    tags: ['Кентрон', 'Архитектура', 'Part-time'],
  },
  {
    id: 'supervisor',
    titleKey: 'vacSupervisorTitle',
    descriptionKey: 'vacSupervisorDesc',
    icon: HardHat,
    tags: ['Стройка', 'Технадзор', 'Full-time'],
  },
  {
    id: 'janitor',
    titleKey: 'vacJanitorTitle',
    descriptionKey: 'vacJanitorDesc',
    icon: TreePine,
    tags: ['Благоустройство', 'Part-time'],
  },
];

export function VacanciesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('vacSectionTitle')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('vacSectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {vacancies.map((vac, index) => {
            const Icon = vac.icon;
            return (
              <motion.div
                key={vac.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t(vac.titleKey)}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {t(vac.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {vac.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-secondary text-muted-foreground rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  className="btn-gradient rounded-xl w-full gap-2"
                  onClick={() => window.open('https://t.me/meryerevan', '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('vacApply')}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
