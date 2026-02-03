import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-yerevan-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">Մ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-foreground">Մdelays Երdelays</h3>
                <p className="text-xs text-muted-foreground">Urban Projects Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              A civic platform connecting citizens, sponsors, and architects 
              to build a better Yerevan together.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> in Yerevan
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">For Sponsors</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">For Architects</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@meryerevan.am" className="hover:text-primary-foreground transition-colors">
                  info@meryerevan.am
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+374 10 123 456</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Northern Avenue 1,<br />Yerevan, Armenia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Մdelays Delays. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
