import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-yerevan-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">Մ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-foreground">{t('brandName')}</h3>
                <p className="text-xs text-muted-foreground">{t('platformSubtitle')}</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">{t('footerDesc')}</p>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">{t('copyright')}</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary-foreground transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
