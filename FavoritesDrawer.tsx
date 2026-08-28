import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PizzaItem } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  pizzas: PizzaItem[];
  onRemoveFavorite: (pizzaId: string) => void;
  onOpenPizzaModal: (pizza: PizzaItem) => void;
  onQuickAddToCart: (pizza: PizzaItem) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  pizzas,
  onRemoveFavorite,
  onOpenPizzaModal,
  onQuickAddToCart,
}) => {
  if (!isOpen) return null;

  const favoritePizzas = pizzas.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f13] border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Your Saved Favorites</h2>
                <p className="text-xs text-neutral-400">{favoritePizzas.length} pizzas saved</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Favorites */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoritePizzas.length > 0 ? (
              favoritePizzas.map((pizza) => (
                <div
                  key={pizza.id}
                  className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex gap-3.5 items-center"
                >
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-950 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {pizza.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFavorite(pizza.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs font-black text-amber-400 mt-0.5">
                      ${pizza.price.toFixed(2)}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenPizzaModal(pizza);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-semibold transition-colors"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => onQuickAddToCart(pizza)}
                        className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold shadow-md transition-colors"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No favorites saved yet</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Click the heart icon on any pizza to save your favorite wood-fired pies here for quick ordering!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs border border-neutral-800"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
