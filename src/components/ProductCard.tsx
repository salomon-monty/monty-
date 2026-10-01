import React from 'react';
import { Product } from '../data/mockData';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  currency: 'USD' | 'CDF';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  currency,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const formattedPrice =
    currency === 'USD'
      ? `$${product.price.toFixed(2)}`
      : `${Math.round(product.price * 2800).toLocaleString('fr-FR')} Fc`;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          src={product.image}
          loading="lazy"
          onError={(e) => {
            // Fallback in case of broken dynamic URL
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Dynamic Tag / Badge */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-white font-mono-tag text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow-sm ${
              product.tagColor || 'bg-[#0D5BE1]'
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Hover Quick Action */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white/90 backdrop-blur-sm text-slate-900 font-mono-tag text-[11px] font-bold px-4 py-2 rounded-full shadow hover:bg-white transition flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#0D5BE1]" />
            <span>APERÇU_RAPIDE</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-[11px] font-mono-tag text-slate-400 uppercase tracking-wider">
            {product.subtitle}
          </div>
          <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight group-hover:text-[#0D5BE1] transition mt-0.5 line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Card Footer with Price and Add Button */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-mono-tag block tracking-wider uppercase">
              PRIX
            </span>
            <span className="text-base font-bold text-slate-900 font-mono-tag">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Ajouter ${product.name} au panier`}
            className={`p-2.5 rounded-xl transition duration-200 cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-blue-50 text-[#0D5BE1] hover:bg-[#0D5BE1] hover:text-white'
            }`}
            title="Ajouter au panier"
          >
            {justAdded ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
