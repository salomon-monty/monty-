import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import { Product } from '../data/mockData';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onClearCart: () => void;
  currency: 'USD' | 'CDF';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const [promoCode, setPromoCode] = React.useState<string>('');
  const [discountPercent, setDiscountPercent] = React.useState<number>(0);
  const [promoMessage, setPromoMessage] = React.useState<string | null>(null);
  const [destination, setDestination] = React.useState<'bukavu' | 'goma' | 'kinshasa' | 'international'>('bukavu');
  const [isOrdered, setIsOrdered] = React.useState<boolean>(false);
  const [orderRef, setOrderRef] = React.useState<string>('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const shippingCost = {
    bukavu: 5,
    goma: 10,
    kinshasa: 18,
    international: 35,
  }[destination];

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const total = Math.max(0, rawSubtotal - discountAmount + (rawSubtotal > 0 ? shippingCost : 0));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KIVU2026') {
      setDiscountPercent(15);
      setPromoMessage('Code KIVU2026 appliqué : -15% sur votre commande !');
    } else if (promoCode.trim().toUpperCase() === 'MODERN') {
      setDiscountPercent(10);
      setPromoMessage('Code MODERN appliqué : -10%');
    } else {
      setPromoMessage('Code promo invalide. Essayez "KIVU2026"');
    }
  };

  const handleCheckout = () => {
    const randomRef = `GS-KIVU-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(randomRef);
    setIsOrdered(true);
    onClearCart();
  };

  const formatPrice = (val: number) => {
    return currency === 'USD'
      ? `$${val.toFixed(2)}`
      : `${Math.round(val * 2800).toLocaleString('fr-FR')} Fc`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slideLeft">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#0D5BE1]" />
            <h2 className="font-mono-tag font-bold text-base uppercase text-slate-900">
              VOTRE PANIER ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isOrdered ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl uppercase text-slate-900">
                COMMANDE CONFIRMÉE !
              </h3>
              <p className="text-xs text-slate-600">
                Merci pour votre confiance. Votre commande <strong className="text-slate-900 font-mono-tag">{orderRef}</strong> est transmise à l'atelier de confection.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs font-mono-tag text-slate-500 text-left space-y-1">
                <div>Statut : En préparation Bukavu</div>
                <div>Suivi : Actif sous 2h par SMS/WhatsApp</div>
              </div>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="w-full py-3 bg-[#0D5BE1] text-white font-mono-tag text-xs font-bold rounded-xl"
              >
                CONTINUER LE SHOPPING
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-mono-tag text-xs text-slate-400 uppercase">
                VOTRE PANIER EST VIDE POUR L'INSTANT
              </p>
              <button
                onClick={onClose}
                className="inline-block px-6 py-2.5 bg-[#0D5BE1] text-white font-mono-tag text-xs font-bold rounded-full"
              >
                EXPLORER LES ARRIVAGES 2026
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                  className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-white shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs uppercase text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            onRemoveItem(item.product.id, item.size, item.color)
                          }
                          className="text-slate-400 hover:text-rose-500 transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono-tag text-slate-500 mt-0.5">
                        Taille: {item.size} • {item.color}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono-tag text-xs font-bold text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-tag text-xs font-bold px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Destination selector */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-1">
                  DESTINATION DE LIVRAISON :
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono-tag"
                >
                  <option value="bukavu">Bukavu Express (24h) — $5.00</option>
                  <option value="goma">Goma Express (48h) — $10.00</option>
                  <option value="kinshasa">Kinshasa Prioritaire — $18.00</option>
                  <option value="international">International DHL Express — $35.00</option>
                </select>
              </div>

              {/* Promo code */}
              <form onSubmit={applyPromo} className="space-y-1">
                <label className="block text-[11px] font-mono-tag uppercase text-slate-600">
                  CODE PROMO (Ex: KIVU2026) :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="KIVU2026"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white font-mono-tag text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    APPLIQUER
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[10px] font-mono-tag ${
                      discountPercent > 0 ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && !isOrdered && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
            <div className="space-y-1.5 text-xs font-mono-tag">
              <div className="flex justify-between text-slate-500">
                <span>SOUS-TOTAL :</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>REMISE ({discountPercent}%) :</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>EXPÉDITION ({destination.toUpperCase()}) :</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>TOTAL :</span>
                <span className="text-[#0D5BE1]">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#0D5BE1] hover:bg-[#0943a8] text-white font-mono-tag text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <span>PASSER LA COMMANDE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
