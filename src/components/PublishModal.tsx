import React from 'react';
import { X, Shirt, Ticket, Megaphone, UserCheck, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { Product, EventTicket, ClassifiedAd, Professional } from '../data/mockData';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (p: Product) => void;
  onAddEvent: (e: EventTicket) => void;
  onAddAd: (a: ClassifiedAd) => void;
  onAddPro: (pro: Professional) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  onAddEvent,
  onAddAd,
  onAddPro,
}) => {
  const [activeTab, setActiveTab] = React.useState<'mode' | 'billet' | 'annonce' | 'pro'>('mode');
  const [publishedSuccess, setPublishedSuccess] = React.useState(false);

  // Mode fields
  const [productName, setProductName] = React.useState('');
  const [productCategory, setProductCategory] = React.useState<'tailleurs' | 'streetwear' | 'accessoires' | 'haute-couture'>('tailleurs');
  const [productPrice, setProductPrice] = React.useState('180');
  const [productImage, setProductImage] = React.useState('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80');
  const [productAtelier, setProductAtelier] = React.useState('Atelier Bukavu Nouveau');
  const [productDesc, setProductDesc] = React.useState('Création exclusive de la collection Kivu 2026.');

  // Event fields
  const [eventTitle, setEventTitle] = React.useState('');
  const [eventVenue, setEventVenue] = React.useState('Bukavu — Lac Kivu');
  const [eventDate, setEventDate] = React.useState('12 Décembre 2026');
  const [eventPrice, setEventPrice] = React.useState('40');
  const [eventVipPrice, setEventVipPrice] = React.useState('100');

  // Ad fields
  const [adTitle, setAdTitle] = React.useState('');
  const [adCategory, setAdCategory] = React.useState<'tissus' | 'materiel' | 'casting' | 'ateliers'>('tissus');
  const [adPrice, setAdPrice] = React.useState('250');
  const [adCity, setAdCity] = React.useState('Bukavu (Ibanda)');
  const [adPhone, setAdPhone] = React.useState('+243 970 000 111');

  // Pro fields
  const [proName, setProName] = React.useState('');
  const [proRole, setProRole] = React.useState('Styliste / Modéliste');
  const [proSpecialty, setProSpecialty] = React.useState('Couture sur-mesure & Broderie');
  const [proCity, setProCity] = React.useState('Bukavu');

  if (!isOpen) return null;

  // Extract clean URL from HTML input if user inputs <img src="..." />
  const cleanImageUrl = (input: string) => {
    const match = input.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) return match[1];
    return input.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = cleanImageUrl(productImage);

    if (activeTab === 'mode') {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: productName || 'Nouvelle Pièce Kivu',
        category: productCategory,
        tag: 'NOUVEAU',
        tagColor: 'bg-[#0D5BE1]',
        subtitle: productAtelier || 'Atelier Kivu',
        price: parseFloat(productPrice) || 150,
        image: finalImageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        description: productDesc,
        atelier: productAtelier,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [{ name: 'Bleu Cobalt', hex: '#0D5BE1' }],
        inStock: true,
      };
      onAddProduct(newProduct);
    } else if (activeTab === 'billet') {
      const newEvent: EventTicket = {
        id: `evt-${Date.now()}`,
        title: eventTitle || 'Événement Runway Kivu',
        subtitle: 'Défilé Officiel',
        date: eventDate,
        location: 'Bukavu, Sud-Kivu',
        venue: eventVenue,
        price: parseFloat(eventPrice) || 35,
        vipPrice: parseFloat(eventVipPrice) || 90,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        category: 'fashion-week',
        availableSeats: 200,
        description: 'Événement exclusif inscrit au calendrier officiel de la mode.',
      };
      onAddEvent(newEvent);
    } else if (activeTab === 'annonce') {
      const newAd: ClassifiedAd = {
        id: `ad-${Date.now()}`,
        title: adTitle || 'Annonce Textile Kivu',
        category: adCategory,
        price: parseFloat(adPrice) || 'Sur devis',
        city: adCity,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        date: 'À l’instant',
        author: 'Créateur Vérifié',
        phone: adPhone,
        description: 'Article disponible pour enlèvement immédiat à Bukavu ou expédition.',
      };
      onAddAd(newAd);
    } else if (activeTab === 'pro') {
      const newPro: Professional = {
        id: `pro-${Date.now()}`,
        name: proName || 'Nouveau Créateur',
        role: proRole,
        city: proCity,
        specialty: proSpecialty,
        rating: 5.0,
        reviewsCount: 1,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        featuredWork: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'],
        bio: 'Atelier spécialisé dans le sur-mesure et les finitions haut de gamme.',
        verified: true,
        phone: '+243 999 000 222',
      };
      onAddPro(newPro);
    }

    setPublishedSuccess(true);
    setTimeout(() => {
      setPublishedSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-scale">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {publishedSuccess ? (
          <div className="py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-slate-900">
              Publication En Ligne !
            </h3>
            <p className="text-xs text-slate-500 font-mono-tag">
              Votre publication a été validée et ajoutée instantanément sur GoodStore.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-mono-tag text-xs font-bold text-[#0D5BE1] uppercase">
                ESPACE CRÉATEURS & MARCHANDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight mt-1">
                PUBLIER SUR GOOD_STORE
              </h2>
              <p className="text-xs text-slate-500 font-mono-tag mt-1">
                Choisissez le type d'élément à ajouter à la plateforme.
              </p>
            </div>

            {/* Type Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { id: 'mode', label: 'ARTICLE MODE', icon: Shirt },
                { id: 'billet', label: 'BILLET DÉFILÉ', icon: Ticket },
                { id: 'annonce', label: 'ANNONCE TEXTILE', icon: Megaphone },
                { id: 'pro', label: 'PROFIL STYLISTE', icon: UserCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'border-[#0D5BE1] bg-blue-50 text-[#0D5BE1] font-bold ring-2 ring-[#0D5BE1]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-mono-tag text-[10px] uppercase">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'mode' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Nom de la pièce
                      </label>
                      <input
                        type="text"
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Ex: Veste Croisée Cobalt Kivu"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value as any)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1] font-mono-tag"
                      >
                        <option value="tailleurs">Tailleurs & Vestes</option>
                        <option value="haute-couture">Haute Couture</option>
                        <option value="streetwear">Streetwear</option>
                        <option value="accessoires">Accessoires & Maroquinerie</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Prix ($ USD)
                      </label>
                      <input
                        type="number"
                        required
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Nom de l'atelier
                      </label>
                      <input
                        type="text"
                        value={productAtelier}
                        onChange={(e) => setProductAtelier(e.target.value)}
                        placeholder="Ex: Atelier Kivu Moderne"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1 flex items-center justify-between">
                      <span>Lien d'image dynamique (URL ou balise &lt;img src="..." /&gt;)</span>
                      <ImageIcon className="w-3.5 h-3.5 text-[#0D5BE1]" />
                    </label>
                    <input
                      type="text"
                      required
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      placeholder='https://... ou <img src="https://..." />'
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                      Description & composition
                    </label>
                    <textarea
                      rows={2}
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'billet' && (
                <>
                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                      Titre de l'événement / Défilé
                    </label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Ex: Soirée Blanche Kivu Fashion 2026"
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Lieu / Salle
                      </label>
                      <input
                        type="text"
                        value={eventVenue}
                        onChange={(e) => setEventVenue(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Tarif Standard ($)
                      </label>
                      <input
                        type="number"
                        value={eventPrice}
                        onChange={(e) => setEventPrice(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Tarif VIP Front Row ($)
                      </label>
                      <input
                        type="number"
                        value={eventVipPrice}
                        onChange={(e) => setEventVipPrice(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'annonce' && (
                <>
                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                      Titre de l'annonce
                    </label>
                    <input
                      type="text"
                      required
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="Ex: Vente lot de 20 pagnes Wax Kivu damassé"
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={adCategory}
                        onChange={(e) => setAdCategory(e.target.value as any)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl font-mono-tag"
                      >
                        <option value="tissus">Tissus & Bazin</option>
                        <option value="materiel">Machines & Matériel</option>
                        <option value="casting">Castings & Mannequins</option>
                        <option value="ateliers">Ateliers Partagés</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Prix ($ USD)
                      </label>
                      <input
                        type="text"
                        value={adPrice}
                        onChange={(e) => setAdPrice(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Ville & Commune
                      </label>
                      <input
                        type="text"
                        value={adCity}
                        onChange={(e) => setAdCity(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Téléphone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={adPhone}
                        onChange={(e) => setAdPhone(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'pro' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Nom ou Atelier
                      </label>
                      <input
                        type="text"
                        required
                        value={proName}
                        onChange={(e) => setProName(e.target.value)}
                        placeholder="Ex: Maison Merveille Kivu"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Métier
                      </label>
                      <input
                        type="text"
                        value={proRole}
                        onChange={(e) => setProRole(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Spécialité
                      </label>
                      <input
                        type="text"
                        value={proSpecialty}
                        onChange={(e) => setProSpecialty(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={proCity}
                        onChange={(e) => setProCity(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-mono-tag text-slate-500 hover:text-slate-800 transition"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold px-7 py-3 rounded-full shadow-lg transition active:scale-95 cursor-pointer"
                >
                  METTRE EN LIGNE
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
