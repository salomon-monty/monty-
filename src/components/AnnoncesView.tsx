import React from 'react';
import { ClassifiedAd } from '../data/mockData';
import { MapPin, Phone, Clock, Plus, Tag, Search, Check } from 'lucide-react';

interface AnnoncesViewProps {
  ads: ClassifiedAd[];
  onOpenPublish: () => void;
  currency: 'USD' | 'CDF';
}

export const AnnoncesView: React.FC<AnnoncesViewProps> = ({ ads, onOpenPublish, currency }) => {
  const [category, setCategory] = React.useState<string>('all');
  const [search, setSearch] = React.useState<string>('');
  const [selectedAd, setSelectedAd] = React.useState<ClassifiedAd | null>(null);
  const [contactSuccess, setContactSuccess] = React.useState<boolean>(false);

  const filteredAds = React.useMemo(() => {
    return ads.filter((ad) => {
      const matchCat = category === 'all' || ad.category === category;
      const matchSearch =
        ad.title.toLowerCase().includes(search.toLowerCase()) ||
        ad.description.toLowerCase().includes(search.toLowerCase()) ||
        ad.city.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [ads, category, search]);

  const formatPrice = (p: number | 'Sur devis') => {
    if (typeof p === 'string') return p;
    return currency === 'USD'
      ? `$${p.toFixed(2)}`
      : `${Math.round(p * 2800).toLocaleString('fr-FR')} Fc`;
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono-tag text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-2">
            [ MARKETPLACE_LOCALE_TEXTILE_KIVU ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            ANNONCES & MATÉRIEL PROFESSIONNEL
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 font-mono-tag leading-relaxed">
            TROUVEZ DES ROULEAUX DE TISSUS RARES, ACHETEZ DU MATÉRIEL DE COUTURE INDUSTRIEL, RECRUTEZ DES MANNEQUINS OU TROUVEZ UN ATELIER PARTAGÉ À BUKAVU ET GOMA.
          </p>
        </div>

        <div className="mt-6 sm:mt-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-10 z-10">
          <button
            onClick={onOpenPublish}
            className="bg-[#0D5BE1] hover:bg-blue-600 text-white font-mono-tag text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>DÉPOSER UNE ANNONCE</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2 font-mono-tag text-xs w-full sm:w-auto">
          {[
            { id: 'all', label: 'TOUTES LES ANNONCES' },
            { id: 'tissus', label: 'TISSUS & BAZIN' },
            { id: 'materiel', label: 'MACHINES & MATÉRIEL' },
            { id: 'casting', label: 'CASTINGS & MANNEQUINS' },
            { id: 'ateliers', label: 'ATELIERS PARTAGÉS' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
                category === c.id
                  ? 'bg-[#0D5BE1] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une annonce..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs focus:ring-2 focus:ring-[#0D5BE1]"
          />
        </div>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white font-mono-tag text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {ad.category}
              </span>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono-tag text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ad.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-snug">
                  {ad.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {ad.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-1 text-slate-500 font-mono-tag">
                    <MapPin className="w-3.5 h-3.5 text-[#0D5BE1]" />
                    <span>{ad.city}</span>
                  </div>
                  <span className="font-bold font-mono-tag text-slate-900 text-sm">
                    {formatPrice(ad.price)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedAd(ad);
                    setContactSuccess(false);
                  }}
                  className="w-full py-2 bg-blue-50 text-[#0D5BE1] hover:bg-[#0D5BE1] hover:text-white rounded-xl font-mono-tag text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CONTACTER L'ANNONCEUR</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {selectedAd && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-scale">
            <button
              onClick={() => setSelectedAd(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xs font-mono-tag"
            >
              [FERMER]
            </button>

            <span className="font-mono-tag text-xs font-bold text-[#0D5BE1] uppercase">
              CONTACT ANNONCEUR
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 leading-tight">
              {selectedAd.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Publiée par <strong className="text-slate-800">{selectedAd.author}</strong> ({selectedAd.city})
            </p>

            <div className="my-6 p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-2 font-mono-tag text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">TÉLÉPHONE / WHATSAPP :</span>
                <span className="font-bold text-[#0D5BE1] text-sm">{selectedAd.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">PRIX :</span>
                <span className="font-bold text-slate-900">{formatPrice(selectedAd.price)}</span>
              </div>
            </div>

            {contactSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-mono-tag flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Message envoyé avec succès ! L'annonceur vous contactera sous peu.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  placeholder="Écrivez votre message à l'annonceur..."
                  defaultValue={`Bonjour ${selectedAd.author}, je vous contacte au sujet de votre annonce "${selectedAd.title}" sur GoodStore.`}
                  rows={3}
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                />
                <button
                  onClick={() => setContactSuccess(true)}
                  className="w-full py-2.5 bg-[#0D5BE1] hover:bg-blue-700 text-white font-mono-tag text-xs font-bold rounded-xl transition"
                >
                  ENVOYER LE MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
