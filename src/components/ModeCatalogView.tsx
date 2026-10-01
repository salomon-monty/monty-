import React from 'react';
import { Product } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';

interface ModeCatalogViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddCustomProduct: (product: Product) => void;
  currency: 'USD' | 'CDF';
}

export const ModeCatalogView: React.FC<ModeCatalogViewProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  onAddCustomProduct,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [sortBy, setSortBy] = React.useState<'recent' | 'price-asc' | 'price-desc'>('recent');
  const [showImageLinker, setShowImageLinker] = React.useState<boolean>(false);
  const [rawHtmlInput, setRawHtmlInput] = React.useState<string>('');
  const [customName, setCustomName] = React.useState<string>('Pièce Sur-Mesure Kivu');
  const [customPrice, setCustomPrice] = React.useState<number>(175);
  const [parseError, setParseError] = React.useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.atelier.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Extract URL from direct link or HTML snippet (<img src="...">)
  const handleExtractAndAddImage = () => {
    setParseError(null);
    if (!rawHtmlInput.trim()) {
      setParseError("Veuillez saisir une URL d'image ou un code HTML <img>");
      return;
    }

    let extractedUrl = rawHtmlInput.trim();

    // Check if user pasted an HTML tag like <img src="https://..." ... />
    const match = extractedUrl.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      extractedUrl = match[1];
    } else if (
      !extractedUrl.startsWith('http://') &&
      !extractedUrl.startsWith('https://') &&
      !extractedUrl.startsWith('data:image')
    ) {
      setParseError("Veuillez fournir une URL valide commençant par http:// ou https://");
      return;
    }

    const newProd: Product = {
      id: `custom-prod-${Date.now()}`,
      name: customName || 'Nouvelle Création Kivu',
      category: 'haute-couture',
      tag: 'NOUVEAU',
      tagColor: 'bg-[#0D5BE1]',
      subtitle: 'Lien Dynamique HTML',
      price: Number(customPrice) || 150,
      image: extractedUrl,
      description: `Pièce ajoutée dynamiquement via lien externe HTML. Silhouettage moderne inspiré de l'art textile congolais.`,
      atelier: 'Atelier Privé GoodStore',
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Bleu Cobalt', hex: '#0D5BE1' }],
      inStock: true,
    };

    onAddCustomProduct(newProd);
    setRawHtmlInput('');
    setShowImageLinker(false);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Header Banner */}
      <div className="bg-[#0D5BE1] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono-tag text-xs font-semibold text-sky-200 uppercase tracking-widest block mb-2">
            [ CATALOGUE_OFFICIEL_MODE_2026 ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            VESTIAIRE KIVU & HAUTE COUTURE
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-3 font-mono-tag leading-relaxed">
            DÉCOUVREZ L'INTEGRALITÉ DES CRÉATIONS TAILLEURS, STREETWEAR MINIMALISTE ET ACCESSOIRES CONFECTIONNÉS PAR LES MEILLEURS ATELIERS DE LA RÉGION.
          </p>
        </div>

        {/* Dynamic Image Link Action button */}
        <div className="mt-6 sm:mt-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-10 z-10">
          <button
            onClick={() => setShowImageLinker(!showImageLinker)}
            className="bg-white hover:bg-slate-100 text-[#0D5BE1] font-mono-tag text-xs font-bold px-5 py-3 rounded-full flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <LinkIcon className="w-4 h-4" />
            <span>AJOUTER LIEN IMAGE DYNAMIQUE (HTML)</span>
          </button>
        </div>

        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Dynamic Image Link Panel (HTML parser) */}
      {showImageLinker && (
        <div className="mb-10 p-6 bg-blue-50/80 border border-blue-200 rounded-2xl animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#0D5BE1]">
              <ImageIcon className="w-5 h-5" />
              <h3 className="font-mono-tag font-bold text-sm uppercase">
                GÉNÉRATEUR DE LIEN D'IMAGE DYNAMIQUE (HTML & URL)
              </h3>
            </div>
            <button
              onClick={() => setShowImageLinker(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-mono-tag"
            >
              [FERMER]
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-4">
            Vous pouvez coller une URL directe (https://...) ou un fragment de code HTML complet
            comme <code className="bg-white px-2 py-0.5 rounded border border-slate-200">&lt;img src="https://..." alt="Mode" /&gt;</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Lien ou balise HTML &lt;img src="..."&gt;
              </label>
              <textarea
                value={rawHtmlInput}
                onChange={(e) => setRawHtmlInput(e.target.value)}
                placeholder='Ex: <img src="https://images.unsplash.com/photo-..." alt="Tailleur" />'
                rows={2}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-mono focus:ring-2 focus:ring-[#0D5BE1] focus:border-transparent"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Nom du modèle
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#0D5BE1]"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Prix ($ USD)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#0D5BE1]"
                />
                <button
                  onClick={handleExtractAndAddImage}
                  className="bg-[#0D5BE1] hover:bg-blue-700 text-white font-mono-tag text-xs font-bold px-5 py-2.5 rounded-xl transition shadow shrink-0"
                >
                  AJOUTER
                </button>
              </div>
            </div>
          </div>

          {parseError && (
            <p className="mt-2 text-xs text-rose-600 font-mono-tag font-semibold">
              {parseError}
            </p>
          )}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tag text-xs w-full lg:w-auto">
          {[
            { id: 'all', label: 'TOUS LES ARTICLES' },
            { id: 'tailleurs', label: 'TAILLEURS & VESTES' },
            { id: 'haute-couture', label: 'HAUTE COUTURE' },
            { id: 'streetwear', label: 'STREETWEAR' },
            { id: 'accessoires', label: 'ACCESSOIRES & CUIR' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0D5BE1] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une pièce..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#0D5BE1]"
            />
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer font-mono-tag"
            >
              <option value="recent">Nouveautés 2026</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Count Info */}
      <div className="mb-6 flex items-center justify-between text-xs font-mono-tag text-slate-500 uppercase">
        <span>{filteredProducts.length} ARTICLES DISPONIBLES</span>
        <span>ATELIERS BUKAVU & GOMA RÉUNIS</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              currency={currency}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8">
          <p className="font-mono-tag text-slate-400 text-sm uppercase mb-2">
            AUCUN ARTICLE CORRESPONDANT À VOTRE RECHERCHE
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-mono-tag font-bold text-[#0D5BE1] hover:underline uppercase"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
