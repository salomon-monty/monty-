/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { CollectionsView } from './components/CollectionsView';
import { ModeCatalogView } from './components/ModeCatalogView';
import { BilletterieView } from './components/BilletterieView';
import { AnnoncesView } from './components/AnnoncesView';
import { ProfessionnelsView } from './components/ProfessionnelsView';
import { MusiqueView } from './components/MusiqueView';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { PublishModal } from './components/PublishModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { AssistantWidget } from './components/AssistantWidget';

import {
  INITIAL_PRODUCTS,
  INITIAL_EVENTS,
  INITIAL_CLASSIFIEDS,
  INITIAL_PROFESSIONALS,
  Product,
  EventTicket,
  ClassifiedAd,
  Professional,
} from './data/mockData';

export default function App() {
  // Screens / Tab Navigation state
  const [currentTab, setCurrentTab] = React.useState<string>('collections');

  // Currency
  const [currency, setCurrency] = React.useState<'USD' | 'CDF'>('USD');

  // Dynamic Entities Data
  const [products, setProducts] = React.useState<Product[]>(INITIAL_PRODUCTS);
  const [events, setEvents] = React.useState<EventTicket[]>(INITIAL_EVENTS);
  const [classifieds, setClassifieds] = React.useState<ClassifiedAd[]>(INITIAL_CLASSIFIEDS);
  const [professionals, setProfessionals] = React.useState<Professional[]>(INITIAL_PROFESSIONALS);

  // Cart State
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      size: 'M',
      color: 'Bleu Cobalt Kivu',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

  // Modals
  const [isPublishOpen, setIsPublishOpen] = React.useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = React.useState<boolean>(false);
  const [selectedProductDetail, setSelectedProductDetail] = React.useState<Product | null>(null);

  // Scroll to top on tab change
  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string = 'M',
    color: string = 'Bleu Cobalt Kivu',
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, size, color, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    size: string,
    color: string,
    newQty: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (
    productId: string,
    size: string,
    color: string
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Adding dynamically from Publish modal or ModeCatalog dynamic image linker
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleAddEvent = (newEvt: EventTicket) => {
    setEvents((prev) => [newEvt, ...prev]);
  };

  const handleAddAd = (newAd: ClassifiedAd) => {
    setClassifieds((prev) => [newAd, ...prev]);
  };

  const handleAddPro = (newPro: Professional) => {
    setProfessionals((prev) => [newPro, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPublish={() => setIsPublishOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((prev) => (prev === 'USD' ? 'CDF' : 'USD'))
        }
      />

      {/* Main Content Area based on currentTab */}
      <main className="flex-grow">
        {currentTab === 'collections' && (
          <CollectionsView
            products={products}
            onAddToCart={(p) => handleAddToCart(p, 'M', 'Bleu Cobalt Kivu', 1)}
            onViewDetails={(p) => setSelectedProductDetail(p)}
            onExploreMode={() => handleSelectTab('mode')}
            onExploreBilletterie={() => handleSelectTab('billetterie')}
            currency={currency}
          />
        )}

        {currentTab === 'mode' && (
          <ModeCatalogView
            products={products}
            onAddToCart={(p) => handleAddToCart(p, 'M', 'Bleu Cobalt Kivu', 1)}
            onViewDetails={(p) => setSelectedProductDetail(p)}
            onAddCustomProduct={handleAddProduct}
            currency={currency}
          />
        )}

        {currentTab === 'billetterie' && (
          <BilletterieView events={events} currency={currency} />
        )}

        {currentTab === 'annonces' && (
          <AnnoncesView
            ads={classifieds}
            onOpenPublish={() => {
              setIsPublishOpen(true);
            }}
            currency={currency}
          />
        )}

        {currentTab === 'professionnels' && (
          <ProfessionnelsView
            professionals={professionals}
            onOpenPublish={() => {
              setIsPublishOpen(true);
            }}
          />
        )}

        {currentTab === 'musique' && <MusiqueView />}
      </main>

      {/* Rich Footer matching design */}
      <Footer
        onNavigateTab={handleSelectTab}
        onOpenPublish={() => setIsPublishOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Publish Modal (+ PUBLIER) */}
      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        onAddProduct={handleAddProduct}
        onAddEvent={handleAddEvent}
        onAddAd={handleAddAd}
        onAddPro={handleAddPro}
      />

      {/* Auth / Account Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Floating Style Assistant Concierge (Sparkle icon + green dot) */}
      <AssistantWidget onNavigateTab={handleSelectTab} />
    </div>
  );
}
