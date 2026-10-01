import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenPublish: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenPublish,
  onOpenAuth,
}) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSuccess, setNewsletterSuccess] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0D5BE1] text-white pt-20 pb-12 mt-16 select-none">
      <div className="max-w-[1720px] mx-auto px-6 lg:px-12">
        {/* Top Grid: Branding, 2 Nav Columns, Newsletter Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-20 border-b border-blue-400/25">
          {/* Column 1: Brand & Bio (Span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <button
              onClick={() => onNavigateTab('collections')}
              className="logo-font text-3xl font-black italic tracking-tighter text-white block text-left cursor-pointer hover:opacity-90"
            >
              GOOD_STORE
            </button>
            <p className="font-mono-tag text-xs text-white/90 leading-relaxed uppercase max-w-xs">
              L'EXCELLENCE DE LA MODE CONGOLAISE MODERNE. BASÉ À BUKAVU, SUD-KIVU.
            </p>
            {/* Social Icon Rounded Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#social-instagram"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-blue-600/60 hover:bg-white/20 transition flex items-center justify-center border border-white/20 text-white"
              >
                <span className="w-2 h-2 rounded-sm bg-white/70" />
              </a>
              <a
                href="#social-x"
                aria-label="X / Twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-blue-600/60 hover:bg-white/20 transition flex items-center justify-center border border-white/20 text-white"
              >
                <span className="w-2 h-2 rounded-sm bg-white/70" />
              </a>
              <a
                href="#social-linkedin"
                aria-label="LinkedIn"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-blue-600/60 hover:bg-white/20 transition flex items-center justify-center border border-white/20 text-white"
              >
                <span className="w-2 h-2 rounded-sm bg-white/70" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 3) */}
          <div className="lg:col-span-3 space-y-3 font-mono-tag text-[11px] font-normal leading-loose tracking-wider uppercase text-white/85">
            <h4 className="font-bold text-white text-xs mb-3">NAVIGATION</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  VOS RETOURS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('collections')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  CHEZ VOUS
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  VOS COMMANDES
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPublish}
                  className="hover:text-white transition cursor-pointer text-left font-bold text-sky-200"
                >
                  VENDRE SUR LA PLATEFORME
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('collections')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  REGISTRE ET CADEAUX
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('professionnels')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  MARKETPLACE BUSINESS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('annonces')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  INFORMATIONS SUR NOTRE MARKETPLACE
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  GÉRER VOS ABONNEMENTS
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  COORDONNÉES 1-CLICK
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  ACCESSIBILITÉ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Assistance Links (Span 3) */}
          <div className="lg:col-span-3 space-y-3 font-mono-tag text-[11px] font-normal leading-loose tracking-wider uppercase text-white/85">
            <h4 className="font-bold text-white text-xs mb-3">ASSISTANCE</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#assistance" className="hover:text-white transition">
                  RAPPELS ET ALERTES DE SÉCURITÉ
                </a>
              </li>
              <li>
                <a href="#assistance" className="hover:text-white transition">
                  SERVICE CLIENT
                </a>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition text-left cursor-pointer">
                  VOTRE COMPTE
                </button>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition text-left cursor-pointer">
                  VOS LISTES
                </button>
              </li>
              <li>
                <button onClick={onOpenPublish} className="hover:text-white transition text-left cursor-pointer">
                  CRÉER UN COMPTE PROFESSIONNEL GRATUIT
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('mode')} className="hover:text-white transition text-left cursor-pointer">
                  TROUVER UN CADEAU
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('collections')} className="hover:text-white transition text-left cursor-pointer">
                  ARTICLES CONSULTÉS RÉCEMMENT
                </button>
              </li>
              <li>
                <a href="#app" className="hover:text-white transition">
                  TÉLÉCHARGER L’APPLICATION
                </a>
              </li>
              <li>
                <a href="#eco" className="hover:text-white transition">
                  RECYCLAGE (ÉQUIPEMENTS ÉLECTRIQUES ET ÉLECTRONIQUES)
                </a>
              </li>
              <li>
                <a href="#report" className="hover:text-white transition">
                  SIGNALER UN CONTENU ILLÉGAL
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box (Span 3) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0b4ec4]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-7 shadow-inner">
              <h4 className="font-mono-tag text-xs font-bold uppercase tracking-widest text-white mb-2">
                NEWSLETTER
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-6 font-normal">
                Inscrivez-vous pour recevoir nos dernières collections et offres exclusives.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="VOTRE@EMAIL.COM"
                  className="w-full bg-[#185fd8] text-white placeholder-white/50 text-xs font-mono-tag tracking-wider py-3.5 pl-4 pr-12 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent uppercase"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire à la newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white text-[#0D5BE1] hover:bg-slate-100 flex items-center justify-center transition shadow-md cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
              {newsletterSuccess && (
                <p className="mt-2 text-[11px] font-mono-tag text-sky-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Merci ! Inscription validée.</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono-tag text-white/70 tracking-wider">
          <p>© 2026 GOOD_STORE_AFRICA. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-[10px]">
            <a href="#privacy" className="hover:text-white transition">
              Politique de confidentialité
            </a>
            <a href="#terms" className="hover:text-white transition">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
