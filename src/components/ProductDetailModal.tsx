import React from 'react';
import { Product } from '../data/mockData';
import { X, Check, ShieldCheck, Truck, Sparkles, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  currency: 'USD' | 'CDF';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<string>('M');
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(1);
  const [addedSuccess, setAddedSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || 'Bleu Cobalt Kivu');
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const formattedPrice =
    currency === 'USD'
      ? `$${product.price.toFixed(2)}`
      : `${Math.round(product.price * 2800).toLocaleString('fr-FR')} Fc`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-8 animate-scale">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-slate-700 hover:text-slate-900 rounded-full hover:bg-white transition cursor-pointer shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-[3/4] md:aspect-auto bg-slate-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.tag && (
              <span
                className={`absolute top-4 left-4 text-white font-mono-tag text-xs font-bold px-3 py-1 rounded-full uppercase shadow ${
                  product.tagColor || 'bg-[#0D5BE1]'
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Right: Info & Purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tag text-[#0D5BE1] font-semibold uppercase tracking-wider mb-1">
                <span>{product.subtitle}</span>
                <span>{product.atelier}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono-tag text-slate-900">
                  {formattedPrice}
                </span>
                <span className="text-xs text-slate-400 font-mono-tag uppercase">
                  TVA & Taxes incluses
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-6">
                <label className="block text-[11px] font-mono-tag uppercase text-slate-600 mb-2">
                  COULEUR : <strong className="text-slate-900">{selectedColor}</strong>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition cursor-pointer flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#0D5BE1] scale-110'
                          : 'border-white shadow-sm'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            c.hex === '#F8FAFC' ? 'bg-slate-900' : 'bg-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] font-mono-tag uppercase text-slate-600 mb-2">
                  <span>TAILLE :</span>
                  <span className="text-[#0D5BE1] cursor-pointer hover:underline">
                    Guide des tailles Kivu
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono-tag font-bold transition cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#0D5BE1] text-white shadow-md shadow-blue-500/25'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-[11px] font-mono-tag uppercase text-slate-600">
                  QUANTITÉ :
                </span>
                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-white rounded-lg transition"
                  >
                    <Minus className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                  <span className="font-mono-tag text-xs font-bold px-3">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-white rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & Guarantees */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <button
                onClick={handleAdd}
                className={`w-full py-4 rounded-full font-mono-tag text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-xl ${
                  addedSuccess
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#0D5BE1] hover:bg-[#0943a8] text-white shadow-blue-500/30'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>AJOUTÉ AU PANIER !</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2]" />
                    <span>AJOUTER AU PANIER • {formattedPrice}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tag text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0D5BE1]" />
                  <span>Livraison express Sud-Kivu & RDC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D5BE1]" />
                  <span>Pièce authentique numérotée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
