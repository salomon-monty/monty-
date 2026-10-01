import React from 'react';
import { Professional } from '../data/mockData';
import { Star, ShieldCheck, MapPin, Scissors, Mail, Check, Phone } from 'lucide-react';

interface ProfessionnelsViewProps {
  professionals: Professional[];
  onOpenPublish: () => void;
}

export const ProfessionnelsView: React.FC<ProfessionnelsViewProps> = ({
  professionals,
  onOpenPublish,
}) => {
  const [selectedPro, setSelectedPro] = React.useState<Professional | null>(null);
  const [quoteSent, setQuoteSent] = React.useState(false);

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Banner */}
      <div className="bg-[#0D5BE1] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono-tag text-xs font-semibold text-sky-200 uppercase tracking-widest block mb-2">
            [ RÉSEAU_OFFICIEL_CRÉATEURS_KIVU ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            STYLISTES, MODÉLISTES & ATELIERS DE CONFECTION
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-3 font-mono-tag leading-relaxed">
            ACCÉDEZ AUX MAÎTRES TAILLEURS ET ARTISANS D'ÉLITE DU SUD-KIVU. COMMANDES SUR-MESURE, PROTOCOLLES DE DÉFILÉ ET CONFECTION B2B.
          </p>
        </div>

        <div className="mt-6 sm:mt-0 sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:right-10 z-10">
          <button
            onClick={onOpenPublish}
            className="bg-white hover:bg-slate-100 text-[#0D5BE1] font-mono-tag text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
          >
            <span>REJOINDRE L'ANNUAIRE PRO</span>
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Header card with avatar */}
              <div className="p-6 pb-4 flex items-center space-x-4 border-b border-slate-100">
                <div className="relative">
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0D5BE1]"
                  />
                  {pro.verified && (
                    <span
                      title="Atelier Certifié GoodStore"
                      className="absolute -bottom-1 -right-1 bg-[#0D5BE1] text-white p-1 rounded-full shadow"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight">
                    {pro.name}
                  </h3>
                  <div className="text-xs text-[#0D5BE1] font-mono-tag font-semibold">
                    {pro.role}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono-tag mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{pro.city}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Specialty */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono-tag text-slate-400 uppercase tracking-wider block">
                    SPÉCIALITÉ & SAVOIR-FAIRE
                  </span>
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Scissors className="w-3.5 h-3.5 text-[#0D5BE1]" />
                    <span>{pro.specialty}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pro.bio}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-between text-xs font-mono-tag bg-slate-50 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{pro.rating.toFixed(1)} / 5.0</span>
                  </div>
                  <span className="text-slate-400">({pro.reviewsCount} avis certifiés)</span>
                </div>

                {/* Portfolio previews */}
                <div>
                  <span className="text-[10px] font-mono-tag text-slate-400 uppercase tracking-wider block mb-2">
                    RÉALISATIONS RÉCENTES
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {pro.featuredWork.map((img, idx) => (
                      <div
                        key={idx}
                        className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100"
                      >
                        <img
                          src={img}
                          alt="Réalisation"
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => {
                  setSelectedPro(pro);
                  setQuoteSent(false);
                }}
                className="w-full py-3 bg-[#0D5BE1] hover:bg-[#0943a8] text-white rounded-xl font-mono-tag text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>DEMANDER UN DEVIS SUR-MESURE</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Modal */}
      {selectedPro && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scale">
            <button
              onClick={() => setSelectedPro(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-mono-tag text-xs"
            >
              [FERMER]
            </button>

            <span className="font-mono-tag text-xs font-bold text-[#0D5BE1] uppercase">
              DEVIS & COMMANDE SUR-MESURE
            </span>
            <h3 className="text-2xl font-bold uppercase text-slate-900 mt-1">
              {selectedPro.name}
            </h3>
            <p className="text-xs text-slate-500 font-mono-tag">
              {selectedPro.specialty} — {selectedPro.city}
            </p>

            {quoteSent ? (
              <div className="my-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-slate-900 uppercase">
                  Demande transmise avec succès !
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  L'atelier {selectedPro.name} va étudier votre demande et vous recontacter par téléphone / WhatsApp sous 24 heures.
                </p>
                <button
                  onClick={() => setSelectedPro(null)}
                  className="bg-[#0D5BE1] text-white font-mono-tag text-xs font-bold px-6 py-2.5 rounded-full"
                >
                  OK, COMPRIS
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuoteSent(true);
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                    Votre Nom & Prénom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Claudine Nabintu"
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                    Téléphone (WhatsApp de préférence)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+243 ..."
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                    Description de la tenue souhaitée
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ex: Tailleur 3 pièces bleu cobalt avec revers en bazin brodé pour un mariage le 15 décembre..."
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold uppercase rounded-xl shadow-md transition"
                  >
                    ENVOYER LA DEMANDE DE DEVIS
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
