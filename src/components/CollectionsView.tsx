import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductCard } from './ProductCard';
import { Product, HERO_IMAGE } from '../data/mockData';
import { Sparkles, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

interface CollectionsViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onExploreMode: () => void;
  onExploreBilletterie: () => void;
  currency: 'USD' | 'CDF';
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  onExploreMode,
  onExploreBilletterie,
  currency,
}) => {
  const [filter, setFilter] = React.useState<string>('TOUS');

  const filteredProducts = React.useMemo(() => {
    if (filter === 'TOUS') return products;
    if (filter === 'TAILLEURS') return products.filter((p) => p.category === 'tailleurs');
    if (filter === 'STREETWEAR') return products.filter((p) => p.category === 'streetwear');
    if (filter === 'ACCESSOIRES') return products.filter((p) => p.category === 'accessoires');
    return products;
  }, [products, filter]);

  const scrollToArrivals = () => {
    const el = document.getElementById('arrivals-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Visual */}
      <HeroSection onExplore={scrollToArrivals} />

      {/* Featured Collections / Derniers Arrivages Kivu 2026 */}
      <section
        id="arrivals-section"
        className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="font-mono-tag text-xs font-bold text-[#0D5BE1] uppercase tracking-widest flex items-center gap-1.5">
              <span>CAPSULE_EXCLUSIVE</span>
            </span>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 mt-1">
              DERNIERS ARRIVAGES KIVU 2026
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2 font-mono-tag text-xs select-none">
            {['TOUS', 'TAILLEURS', 'STREETWEAR', 'ACCESSOIRES'].map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'bg-[#0D5BE1] text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              currency={currency}
            />
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onExploreMode}
            className="inline-flex items-center gap-2 border-2 border-[#0D5BE1] text-[#0D5BE1] hover:bg-[#0D5BE1] hover:text-white font-mono-tag text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition duration-300 cursor-pointer"
          >
            <span>DÉCOUVRIR LE VESTIAIRE COMPLET (2026)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Editorial Lookbook Feature Section */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-12 my-8 overflow-hidden relative">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0D5BE1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono-tag text-xs font-bold text-sky-400 uppercase tracking-widest">
                [ MANIFESTE_COUTURE_BUKAVU ]
              </span>
              <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter uppercase leading-tight">
                L’ÉLÉGANCE CONGOLAISE PROPULSÉE AU SOMMET MONDIAL
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Née entre les collines majestueuses de Bukavu et les rives du lac Kivu, la collection
                2026 réinvente la silhouette africaine contemporaine. Un dialogue subtil entre la rigueur
                du tailoring européen et la flamboyance du modernisme congolais.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="font-mono-tag text-2xl font-bold text-white block">100%</span>
                  <span className="font-mono-tag text-[10px] text-slate-400 uppercase">
                    Coton Peigné Local
                  </span>
                </div>
                <div>
                  <span className="font-mono-tag text-2xl font-bold text-[#0D5BE1] block">24+</span>
                  <span className="font-mono-tag text-[10px] text-slate-400 uppercase">
                    Artisans du Kivu
                  </span>
                </div>
                <div>
                  <span className="font-mono-tag text-2xl font-bold text-sky-300 block">0%</span>
                  <span className="font-mono-tag text-[10px] text-slate-400 uppercase">
                    Gaspillage Textile
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onExploreBilletterie}
                  className="bg-[#0D5BE1] hover:bg-blue-600 text-white font-mono-tag text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition shadow-lg shadow-blue-500/25"
                >
                  RÉSERVER PLACE DÉFILÉ 2026
                </button>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-800 border border-slate-700/60 group relative">
                  <img
                    alt="Atelier Kivu"
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <span className="font-mono-tag text-xs font-bold uppercase text-white">
                      Coupe Architecturale & Volume
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-800 border border-slate-700/60 group relative">
                  <img
                    alt="Teinture Indigo"
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <span className="font-mono-tag text-xs font-bold uppercase text-white">
                      Teintures & Pigments Minéraux
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Pillars / Trust */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-blue-50 text-[#0D5BE1] rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 uppercase font-mono-tag text-sm">
                AUTHENTICITÉ GARANTIE
              </h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Toutes nos pièces sont certifiées et numérotées, conçues dans les ateliers partenaires du Sud-Kivu et de Kinshasa.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-blue-50 text-[#0D5BE1] rounded-xl">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 uppercase font-mono-tag text-sm">
                LIVRAISON LOCALE & MONDIALE
              </h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Expédition express en 24h à Bukavu et Goma, 48h à Kinshasa et 5 jours dans le monde entier via DHL Express.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-blue-50 text-[#0D5BE1] rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 uppercase font-mono-tag text-sm">
                SUR-MESURE & CRÉATEURS
              </h4>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Accédez directement aux modélistes pour confectionner vos tenues d'apparat et robes de gala sur mesure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
