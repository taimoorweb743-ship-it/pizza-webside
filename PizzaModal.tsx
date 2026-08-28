import React, { useState, useMemo } from 'react';
import { X, Flame, Star, Clock, Plus, Minus, Check, Sparkles, AlertCircle } from 'lucide-react';
import { PizzaItem, SizeOption, CrustOption, ExtraTopping } from '../types';
import { AVAILABLE_TOPPINGS } from '../data/pizzaData';

interface PizzaModalProps {
  pizza: PizzaItem | null;
  onClose: () => void;
  onAddToCart: (
    pizza: PizzaItem,
    size: SizeOption,
    crust: CrustOption,
    toppings: ExtraTopping[],
    quantity: number,
    instructions: string,
    unitPrice: number
  ) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({
  pizza,
  onClose,
  onAddToCart,
}) => {
  if (!pizza) return null;

  const [selectedSize, setSelectedSize] = useState<SizeOption>('Medium (12")');
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>('Classic Hand Tossed');
  const [selectedToppings, setSelectedToppings] = useState<ExtraTopping[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Fiery' | 'Inferno'>('Medium');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Calculate base price depending on size
  const baseSizePrice = useMemo(() => {
    switch (selectedSize) {
      case 'Small (8")':
        return pizza.priceSmall;
      case 'Large (14")':
        return pizza.priceLarge;
      case 'Monster (18")':
        return pizza.priceMonster;
      case 'Medium (12")':
      default:
        return pizza.price;
    }
  }, [pizza, selectedSize]);

  // Additional crust price
  const crustAddonPrice = useMemo(() => {
    if (selectedCrust === 'Cheesy Stuffed Crust') return 3.50;
    if (selectedCrust === 'Garlic Herb Butter Crust') return 2.00;
    return 0;
  }, [selectedCrust]);

  // Extra toppings price
  const toppingsAddonPrice = useMemo(() => {
    return selectedToppings.reduce((acc, t) => acc + t.price, 0);
  }, [selectedToppings]);

  const unitPrice = baseSizePrice + crustAddonPrice + toppingsAddonPrice;
  const totalPrice = unitPrice * quantity;

  const handleToggleTopping = (topping: ExtraTopping) => {
    const exists = selectedToppings.some((t) => t.id === topping.id);
    if (exists) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleConfirmAddToCart = () => {
    onAddToCart(
      pizza,
      selectedSize,
      selectedCrust,
      selectedToppings,
      quantity,
      specialInstructions,
      unitPrice
    );
    onClose();
  };

  const sizes: { id: SizeOption; label: string; desc: string; price: number }[] = [
    { id: 'Small (8")', label: 'Small 8"', desc: '1 Person', price: pizza.priceSmall },
    { id: 'Medium (12")', label: 'Medium 12"', desc: '2 Persons', price: pizza.price },
    { id: 'Large (14")', label: 'Large 14"', desc: '3-4 Persons', price: pizza.priceLarge },
    { id: 'Monster (18")', label: 'Monster 18"', desc: 'Party 5-6 Persons', price: pizza.priceMonster },
  ];

  const crusts: { id: CrustOption; label: string; extra: number }[] = [
    { id: 'Classic Hand Tossed', label: 'Classic Hand Tossed', extra: 0 },
    { id: 'Crispy Thin Crust', label: 'Italian Crispy Thin Crust', extra: 0 },
    { id: 'Cheesy Stuffed Crust', label: '🧀 Mozzarella Stuffed Crust', extra: 3.50 },
    { id: 'Garlic Herb Butter Crust', label: '🧄 Roasted Garlic Herb Crust', extra: 2.00 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#111115] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header & Hero Image */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 bg-neutral-950">
          <img
            src={pizza.image}
            alt={pizza.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-black/60"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-white flex items-center justify-center border border-neutral-700 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {pizza.isBestseller && (
              <span className="bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-lg">
                ★ BESTSELLER
              </span>
            )}
            {pizza.isSpicy && (
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                🌶️ SPICY
              </span>
            )}
          </div>

          {/* Title on image bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">{pizza.name}</h2>
            <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {pizza.rating} ({pizza.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                {pizza.prepTimeMinutes} mins prep
              </span>
              <span>•</span>
              <span>{pizza.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Description & Ingredients */}
          <div className="space-y-2">
            <p className="text-sm text-neutral-300 leading-relaxed">
              {pizza.description}
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                Fresh Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pizza.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {pizza.allergens && pizza.allergens.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400/90 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Allergens: {pizza.allergens.join(', ')}</span>
              </div>
            )}
          </div>

          {/* 1. Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center font-black">1</span>
                Select Size
              </label>
              <span className="text-xs text-orange-400 font-semibold">{selectedSize}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sizes.map((s) => {
                const isSelected = selectedSize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSize(s.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-orange-600/20 border-orange-500 shadow-md shadow-orange-950'
                        : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{s.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{s.desc}</div>
                    <div className="text-sm font-black text-amber-400 mt-2">${s.price.toFixed(2)}</div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Crust Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center font-black">2</span>
                Choose Crust
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {crusts.map((c) => {
                const isSelected = selectedCrust === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCrust(c.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-orange-600/20 border-orange-500 text-white'
                        : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{c.label}</div>
                      {c.extra > 0 ? (
                        <span className="text-[11px] text-amber-400 font-semibold">+${c.extra.toFixed(2)}</span>
                      ) : (
                        <span className="text-[11px] text-emerald-400">Included</span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-orange-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Extra Artisan Toppings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center font-black">3</span>
                Extra Toppings (Optional)
              </label>
              <span className="text-xs text-neutral-400">{selectedToppings.length} selected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {AVAILABLE_TOPPINGS.map((top) => {
                const isChecked = selectedToppings.some((t) => t.id === top.id);
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => handleToggleTopping(top)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      isChecked
                        ? 'bg-amber-500/15 border-amber-500/80 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-black font-bold' : 'border-neutral-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{top.name}</span>
                    </div>
                    <span className="text-amber-400 font-semibold">+${top.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Spice Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              Custom Spice Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Mild', 'Medium', 'Fiery', 'Inferno'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${
                    spiceLevel === level
                      ? 'bg-red-600/30 border-red-500 text-white shadow-md'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {level === 'Mild' && '🌱 Mild'}
                  {level === 'Medium' && '🌶️ Medium'}
                  {level === 'Fiery' && '🔥 Fiery'}
                  {level === 'Inferno' && '💀 Inferno'}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              Chef Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Well-done blistered crust, cut in 8 slices, light sauce..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Modal Footer / Add to Cart Bar */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-1.5 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white flex items-center justify-center font-bold"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-black text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to order action */}
          <button
            onClick={handleConfirmAddToCart}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-sm shadow-xl shadow-orange-600/30 flex items-center justify-between gap-3 transition-transform active:scale-[0.98]"
          >
            <span>Add to Order</span>
            <span className="bg-neutral-950/40 px-3 py-1 rounded-lg text-amber-300 font-extrabold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
