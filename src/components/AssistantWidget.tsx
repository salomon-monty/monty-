import React from 'react';
import { Sparkles, X, Send, Bot, Check } from 'lucide-react';

interface AssistantWidgetProps {
  onNavigateTab: (tab: string) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export const AssistantWidget: React.FC<AssistantWidgetProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      sender: 'bot',
      text: 'Bonjour ! Je suis votre Concierge de Style GoodStore Bukavu. Comment puis-je vous guider aujourd’hui dans nos collections 2026 ?',
    },
  ]);
  const [input, setInput] = React.useState<string>('');

  const quickPrompts = [
    'Quelle taille pour le Tailleur Cobalt ?',
    'Délais de livraison à Bukavu et Goma ?',
    'Comment réserver pour la Fashion Week ?',
    'Contacter un maître tailleur sur-mesure',
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let reply = "Merci pour votre question ! Nos artisans et conseillers à Bukavu restent à votre disposition.";
      const low = q.toLowerCase();

      if (low.includes('tailleur') || low.includes('taille')) {
        reply = "Pour l'Ensemble Tailleur Cobalt, nous vous conseillons votre taille habituelle. La coupe est semi-ajustée avec pinces dorsales. Si vous hésitez entre deux tailles, optez pour la taille supérieure pour un tombé fluide et contemporain.";
      } else if (low.includes('livraison') || low.includes('délai') || low.includes('goma') || low.includes('bukavu')) {
        reply = "La livraison est effectuée en 24h à Bukavu (Ibanda, Kadutu, Bagira), en 48h à Goma par vedette rapide sur le Lac Kivu, et en 3 à 5 jours à Kinshasa et à l'international via nos transporteurs partenaires.";
      } else if (low.includes('billet') || low.includes('pass') || low.includes('fashion week')) {
        reply = "Les pass pour la Kivu Fashion Week 2026 sont disponibles dans l'onglet 'BILLETTERIE'. Vous pouvez choisir entre l'accès Standard et le pass VIP Front Row avec cocktail dînatoire face au lac.";
      } else if (low.includes('sur-mesure') || low.includes('tailleur') || low.includes('pro')) {
        reply = "Rendez-vous dans la section 'PROFESSIONNELS' ! Vous pouvez envoyer une demande de devis personnalisée en direct à nos maîtres tailleurs et modélistes certifiés.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Support Widget Bubble */}
      <aside className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Assistant GoodStore"
          className="relative group w-14 h-14 rounded-full bg-[#0D5BE1] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform border-2 border-white/90 cursor-pointer"
        >
          {/* Sparkle / Star Icon Matching Google AI Studio / GoodStore Assistant badge */}
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Small green status dot */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
        </button>
      </aside>

      {/* Assistant Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[520px] animate-scale">
          {/* Header */}
          <div className="bg-[#0D5BE1] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h4 className="font-mono-tag font-bold text-xs uppercase tracking-wider">
                  CONCIERGE DE STYLE KIVU
                </h4>
                <div className="text-[10px] text-sky-100 flex items-center gap-1 font-mono-tag">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>En ligne • Bukavu Studio</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0D5BE1] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick suggested chips */}
            <div className="pt-2 space-y-1.5">
              <div className="text-[10px] font-mono-tag text-slate-400 uppercase">
                Suggestions rapides :
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="text-[11px] bg-white border border-slate-200 text-slate-700 hover:border-[#0D5BE1] hover:text-[#0D5BE1] px-2.5 py-1 rounded-full transition text-left"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question sur nos pièces..."
                className="flex-1 px-4 py-2 text-xs bg-slate-100 border border-transparent rounded-full focus:bg-white focus:border-[#0D5BE1] focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[#0D5BE1] text-white hover:bg-blue-700 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
