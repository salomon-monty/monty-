import React from 'react';
import { X, User, MapPin, Package, Shield, Heart, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'profile' | 'orders' | 'settings'>('profile');
  const [saved, setSaved] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-scale">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0D5BE1] flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 uppercase">
              ESPACE MEMBRE KIVU
            </h3>
            <span className="font-mono-tag text-xs text-[#0D5BE1] font-semibold">
              Compte VIP Membre Fondateur 2026
            </span>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-6 font-mono-tag text-xs">
          {[
            { id: 'profile', label: 'MON PROFIL' },
            { id: 'orders', label: 'MES COMMANDES' },
            { id: 'settings', label: 'ADRESSES' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 py-2 rounded-lg font-bold transition cursor-pointer ${
                activeTab === t.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                defaultValue="Salomon Cimalamungo"
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="salomoncimalamungo@gmail.com"
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                defaultValue="+243 971 888 999"
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>MODIFICATIONS ENREGISTRÉES</span>
                  </>
                ) : (
                  <span>METTRE À JOUR MES INFORMATIONS</span>
                )}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3 font-mono-tag text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">CMD #GS-884920</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  LIVRÉ À BUKAVU
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">
                1x Ensemble Tailleur Cobalt (Taille M) — $240.00
              </div>
              <div className="text-[10px] text-slate-400">Date: 28 Septembre 2026</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">CMD #GS-771239</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                  EN CONFECTION
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">
                1x Blazer Épaules Pointues (Taille L) — $185.00
              </div>
              <div className="text-[10px] text-slate-400">Date: 01 Octobre 2026</div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-3 font-mono-tag text-xs">
            <div className="p-4 border border-[#0D5BE1] bg-blue-50/50 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">Adresse Principale (Bukavu)</span>
                <span className="text-[#0D5BE1] text-[10px] uppercase font-bold">Par Défaut</span>
              </div>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                Avenue Maniema, Commune d'Ibanda<br />
                Bukavu, Sud-Kivu, RDC
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900">Résidence Secondaire (Goma)</span>
              </div>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                Quartier Les Volcans, Boulevard Kanyamuhanga<br />
                Goma, Nord-Kivu, RDC
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
