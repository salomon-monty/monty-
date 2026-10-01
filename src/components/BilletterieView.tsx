import React from 'react';
import { EventTicket, INITIAL_EVENTS } from '../data/mockData';
import { Calendar, MapPin, Ticket, QrCode, CheckCircle, Sparkles, X } from 'lucide-react';

interface BilletterieViewProps {
  events: EventTicket[];
  currency: 'USD' | 'CDF';
}

export const BilletterieView: React.FC<BilletterieViewProps> = ({ events, currency }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedEvent, setSelectedEvent] = React.useState<EventTicket | null>(null);
  const [ticketTier, setTicketTier] = React.useState<'standard' | 'vip'>('standard');
  const [ticketCount, setTicketCount] = React.useState<number>(1);
  const [attendeeName, setAttendeeName] = React.useState<string>('');
  const [attendeeEmail, setAttendeeEmail] = React.useState<string>('');
  const [reservedPass, setReservedPass] = React.useState<{
    id: string;
    event: EventTicket;
    tier: 'standard' | 'vip';
    count: number;
    name: string;
    total: number;
  } | null>(null);

  const filteredEvents = React.useMemo(() => {
    if (selectedCategory === 'all') return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const handleOpenBooking = (event: EventTicket) => {
    setSelectedEvent(event);
    setTicketTier('standard');
    setTicketCount(1);
    setReservedPass(null);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const unitPrice =
      ticketTier === 'vip' ? selectedEvent.vipPrice : selectedEvent.price;
    const total = unitPrice * ticketCount;

    setReservedPass({
      id: `GOOD-PASS-${Math.floor(100000 + Math.random() * 900000)}`,
      event: selectedEvent,
      tier: ticketTier,
      count: ticketCount,
      name: attendeeName || 'Invité d’Honneur Kivu',
      total,
    });
  };

  const formatPrice = (val: number) => {
    return currency === 'USD'
      ? `$${val.toFixed(2)}`
      : `${Math.round(val * 2800).toLocaleString('fr-FR')} Fc`;
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {/* Hero Banner Billetterie */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-[#0D5BE1] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono-tag text-xs font-semibold text-sky-300 uppercase tracking-widest block mb-2">
            [ BILLETTERIE_OFFICIELLE_RUNWAY_2026 ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            DÉFILÉS, GALAS & FASHION WEEKS DU KIVU
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 font-mono-tag leading-relaxed">
            PRENEZ PLACE AU PREMIER RANG DES ÉVÉNEMENTS MAJEURS DE LA SCÈNE MODE AFRICAINE. PASS FRONT ROW, ENTRÉES STANDARDS ET ACCÈS BACKSTAGE EXCLUSIFS.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 font-mono-tag text-xs">
        {[
          { id: 'all', label: 'TOUS LES ÉVÉNEMENTS' },
          { id: 'fashion-week', label: 'FASHION WEEKS' },
          { id: 'gala', label: 'GALAS & SOIRÉES' },
          { id: 'masterclass', label: 'MASTERCLASSES & ATELIERS' },
          { id: 'defile', label: 'DÉFILÉS URBAINS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-full font-semibold transition cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#0D5BE1] text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-[#0D5BE1] text-white font-mono-tag text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {evt.category.replace('-', ' ')}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono-tag text-[11px] text-sky-300 block mb-1">
                  {evt.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
                  {evt.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono-tag text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0D5BE1] shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0D5BE1] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-tag text-slate-400 block uppercase">
                    TARIF STANDARD DÈS
                  </span>
                  <span className="text-lg font-bold font-mono-tag text-slate-900">
                    {formatPrice(evt.price)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono-tag block">
                    (VIP Front Row : {formatPrice(evt.vipPrice)})
                  </span>
                </div>

                <button
                  onClick={() => handleOpenBooking(evt)}
                  className="bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <Ticket className="w-4 h-4" />
                  <span>RÉSERVER_LE_PASS</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal / Pass Generator */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-scale">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {!reservedPass ? (
              <form onSubmit={handleConfirmReservation} className="space-y-5">
                <div>
                  <span className="font-mono-tag text-xs text-[#0D5BE1] font-bold uppercase">
                    RÉSERVATION BILLETTERIE 2026
                  </span>
                  <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight mt-1">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono-tag mt-0.5">
                    {selectedEvent.date} — {selectedEvent.venue}
                  </p>
                </div>

                {/* Tier Selection */}
                <div>
                  <label className="block text-xs font-mono-tag uppercase text-slate-700 font-bold mb-2">
                    CHOISIR LA CATÉGORIE DE PLACE :
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketTier('standard')}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        ticketTier === 'standard'
                          ? 'border-[#0D5BE1] bg-blue-50/50 ring-2 ring-[#0D5BE1]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900 font-mono-tag text-xs uppercase">
                        STANDARD RUNWAY
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Accès défilé & cocktail
                      </div>
                      <div className="mt-2 text-base font-bold font-mono-tag text-[#0D5BE1]">
                        {formatPrice(selectedEvent.price)}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTicketTier('vip')}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        ticketTier === 'vip'
                          ? 'border-[#0D5BE1] bg-blue-50/50 ring-2 ring-[#0D5BE1]'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-slate-900 font-mono-tag text-xs uppercase flex items-center gap-1">
                        <span>VIP FRONT ROW</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        1er Rang + Backstage + Gift bag
                      </div>
                      <div className="mt-2 text-base font-bold font-mono-tag text-[#0D5BE1]">
                        {formatPrice(selectedEvent.vipPrice)}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Number of passes */}
                <div>
                  <label className="block text-xs font-mono-tag uppercase text-slate-700 font-bold mb-1">
                    NOMBRE DE BILLETS
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold font-mono-tag text-slate-800"
                    >
                      -
                    </button>
                    <span className="font-mono-tag text-base font-bold px-4">
                      {ticketCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTicketCount(ticketCount + 1)}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold font-mono-tag text-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Attendee Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                      Nom complet du titulaire
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Luc Bahati"
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                      Adresse Email pour le e-billet
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: bahati@gmail.com"
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0D5BE1]"
                    />
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-tag text-slate-400 uppercase block">
                      TOTAL À RÉGLER
                    </span>
                    <span className="text-xl font-mono-tag font-black text-slate-900">
                      {formatPrice(
                        (ticketTier === 'vip'
                          ? selectedEvent.vipPrice
                          : selectedEvent.price) * ticketCount
                      )}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold px-7 py-3 rounded-full shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    CONFIRMER & RECEVOIR LE PASS
                  </button>
                </div>
              </form>
            ) : (
              /* Generated Digital Ticket Card */
              <div className="text-center space-y-6 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="font-mono-tag text-xs text-emerald-600 font-bold uppercase tracking-wider">
                    RÉSERVATION VALIDÉE AVEC SUCCÈS
                  </span>
                  <h3 className="text-xl font-bold uppercase text-slate-900 mt-1">
                    VOTRE PASS RUNWAY EST PRÊT
                  </h3>
                </div>

                {/* Digital Ticket Visual */}
                <div className="p-6 bg-slate-900 text-white rounded-3xl text-left border border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                    <div>
                      <div className="logo-font text-lg text-[#0D5BE1] italic">
                        GOOD_STORE_PASS
                      </div>
                      <div className="font-mono-tag text-[10px] text-slate-400 uppercase mt-0.5">
                        {reservedPass.id}
                      </div>
                    </div>
                    <span
                      className={`font-mono-tag text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        reservedPass.tier === 'vip'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-[#0D5BE1] text-white'
                      }`}
                    >
                      {reservedPass.tier === 'vip' ? 'VIP FRONT ROW' : 'STANDARD'}
                    </span>
                  </div>

                  <div className="py-4 space-y-1">
                    <div className="font-mono-tag text-xs text-sky-300">
                      {reservedPass.event.title}
                    </div>
                    <div className="text-sm font-semibold">{reservedPass.name}</div>
                    <div className="text-xs text-slate-400 font-mono-tag">
                      {reservedPass.event.date} • {reservedPass.event.venue}
                    </div>
                    <div className="text-xs text-slate-400 font-mono-tag pt-1">
                      {reservedPass.count} Place(s) réservée(s) — Total : {formatPrice(reservedPass.total)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono-tag text-slate-400">
                      <QrCode className="w-8 h-8 text-white" />
                      <span>PRÉSENTEZ CE QR CODE À L'ENTRÉE</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-[#0D5BE1] text-white font-mono-tag text-xs font-bold px-6 py-2.5 rounded-full hover:bg-blue-700 transition"
                >
                  TERMINER & RETOURNER AUX ÉVÉNEMENTS
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
