import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Clock, ShoppingCart } from 'lucide-react';
import { SpecialOffer } from '../types';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onApplyCoupon: (code: string) => void;
  onAddComboToCart: (offer: SpecialOffer) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  offers,
  onApplyCoupon,
  onAddComboToCart,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section id="offers" className="py-16 md:py-24 bg-gradient-to-b from-[#0c0c0e] via-[#111115] to-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Limited Time Combos & Deals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Special Oven Deals & <span className="text-gradient-fire">Coupons</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Enjoy premium wood-fired pizzas at unbeatable prices. Copy the code or add pre-built chef combos straight to your cart.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group bg-neutral-900/90 border border-neutral-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-950/40 flex flex-col justify-between"
            >
              {/* Image & Discount Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-950">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40"></div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-lg shadow-red-600/40 tracking-wider">
                  {offer.discountBadge}
                </div>

                {/* Expiry Badge */}
                <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md text-amber-300 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 border border-neutral-700">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{offer.expiryText}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-orange-400/90 font-medium">
                    {offer.tagline}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="pt-2 space-y-1.5 border-t border-neutral-800">
                    <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">What’s inside:</span>
                    {offer.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Coupon Action Area */}
                <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                  {offer.comboPrice && (
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">${offer.comboPrice.toFixed(2)}</span>
                        {offer.originalPrice && (
                          <span className="text-sm text-neutral-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md">
                        Save ${(offer.originalPrice! - offer.comboPrice).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Copy Code Bar */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center gap-1.5 pl-1.5">
                      <Tag className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">{offer.code}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white flex items-center gap-1 transition-colors"
                      title="Copy promo code"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Applied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-neutral-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Add combo button */}
                  <button
                    onClick={() => onAddComboToCart(offer)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add Combo to Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
