import React from 'react';
import { ShoppingBag, User, Plus, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenPublish: () => void;
  onOpenAuth: () => void;
  currency: 'USD' | 'CDF';
  onToggleCurrency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenPublish,
  onOpenAuth,
  currency,
  onToggleCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'mode', label: 'MODE' },
    { id: 'billetterie', label: 'BILLETTERIE' },
    { id: 'annonces', label: 'ANNONCES' },
    { id: 'professionnels', label: 'PROFESSIONNELS' },
    { id: 'musique', label: 'MUSIQUE_LOCALE' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Logo & Navigation Links */}
        <div className="flex items-center space-x-8 xl:space-x-12">
          <button
            onClick={() => onSelectTab('collections')}
            className="logo-font text-2xl lg:text-3xl tracking-tighter text-[#0D5BE1] flex items-center gap-0.5 hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            GOOD_STORE
          </button>

          {/* Desktop Navigation Bar */}
          <nav className="hidden xl:flex items-center space-x-7 font-mono-tag text-xs font-semibold text-slate-600 uppercase">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-1 transition-colors hover:text-[#0D5BE1] cursor-pointer ${
                    isActive ? 'text-[#0D5BE1] font-bold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D5BE1] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="hidden sm:inline-flex items-center font-mono-tag text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Changer la devise (USD / Franc Congolais)"
          >
            {currency === 'USD' ? '$ USD' : 'Fc CDF'}
          </button>

          {/* Publish CTA Button */}
          <button
            onClick={onOpenPublish}
            className="bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold px-4 sm:px-6 py-2.5 rounded-full flex items-center gap-1.5 transition shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>PUBLIER</span>
          </button>

          {/* Login / User portal icon */}
          <button
            onClick={onOpenAuth}
            className="p-2.5 text-slate-700 hover:text-[#0D5BE1] hover:bg-blue-50 rounded-full transition cursor-pointer"
            title="Mon Compte / Connexion"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Shopping Bag / Cart */}
          <button
            onClick={onOpenCart}
            className="p-2.5 text-slate-700 hover:text-[#0D5BE1] hover:bg-blue-50 rounded-full transition relative cursor-pointer"
            title="Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-[#0D5BE1] text-white text-[10px] font-mono-tag font-bold rounded-full flex items-center justify-center border-2 border-white animate-scale">
                {cartCount}
              </span>
            ) : (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0D5BE1] rounded-full" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 xl:hidden text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-3 font-mono-tag text-xs font-semibold uppercase text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-lg transition ${
                  currentTab === item.id
                    ? 'bg-blue-50 text-[#0D5BE1] font-bold'
                    : 'hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500">Devise :</span>
              <button
                onClick={onToggleCurrency}
                className="font-mono-tag text-xs font-bold px-3 py-1 bg-slate-100 rounded-md"
              >
                {currency === 'USD' ? 'USD ($)' : 'CDF (Franc Congolais)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
