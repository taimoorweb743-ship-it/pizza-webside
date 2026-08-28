import React from 'react';
import { Flame, Clock, Sparkles, Star, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { PizzaItem } from '../types';

interface HeroProps {
  featuredPizza: PizzaItem;
  onOrderFeatured: (pizza: PizzaItem) => void;
  onExploreMenu: () => void;
  onViewOffers: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredPizza,
  onOrderFeatured,
  onExploreMenu,
  onViewOffers,
}) => {
  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Fiery Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>Authentic 900°F Stone Wood-Fired Pizzeria</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Artisan Crust, <br />
              <span className="text-gradient-fire">Blistered By Fire.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Slow-fermented for 72 hours with stoneground Italian flour, crushed San Marzano DOP tomatoes, and hand-torn fior di latte mozzarella. Baked in under 90 seconds.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-base shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-view-deals-btn"
                onClick={onViewOffers}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-semibold text-base flex items-center justify-center gap-2 transition-all hover:border-orange-500/50"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Special Offers & Deals</span>
              </button>
            </div>

            {/* Trust Metric Badges */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-lg sm:text-xl">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400">2,400+ Foodie Reviews</span>
              </div>

              <div className="flex flex-col items-center lg:items-start border-x border-neutral-800/80 px-2">
                <div className="flex items-center gap-1 text-orange-400 font-bold text-lg sm:text-xl">
                  <Clock className="w-4 h-4" />
                  <span>20 Mins</span>
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400">Express Oven Baking</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% DOP</span>
                </div>
                <span className="text-[11px] sm:text-xs text-neutral-400">Imported Italian Quality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Pizza Visual & Featured Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Spinning/Glow Outer Ring */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Radial glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-600/30 to-red-600/30 blur-2xl animate-pulse"></div>

              {/* Pizza Image container with round border */}
              <div className="relative w-full h-full rounded-full p-2.5 bg-gradient-to-tr from-amber-500/40 via-orange-500/20 to-red-600/40 border border-orange-500/40 shadow-2xl shadow-orange-950/80 overflow-hidden group">
                <img
                  src={featuredPizza.image}
                  alt={featuredPizza.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating Badge 1: Chef Pick */}
              <div className="absolute -top-3 -right-2 sm:right-2 bg-neutral-900/95 border border-orange-500/50 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 animate-bounce [animation-duration:3s]">
                <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-xs">
                  🔥
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Chef's Special</div>
                  <div className="text-xs font-bold text-white">Diavola Hot Honey</div>
                </div>
              </div>

              {/* Floating Badge 2: Quick Order Tag */}
              <div className="absolute -bottom-4 -left-2 sm:left-0 bg-neutral-900/95 border border-neutral-700/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-xs">
                  ${featuredPizza.price.toFixed(2)}
                </div>
                <div className="pr-2">
                  <div className="text-xs font-bold text-white">72h Sourdough Crust</div>
                  <button
                    onClick={() => onOrderFeatured(featuredPizza)}
                    className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1 mt-0.5"
                  >
                    Quick Customize & Order &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Promo Marquee Ticker */}
        <div className="mt-12 sm:mt-16 py-3 px-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-neutral-300 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            <span>⚡ <strong>Code: PIZZA20</strong> for 20% OFF your first delivery</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>🍕 <strong>Free Delivery</strong> on all orders above $35</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Freshly baked from stone oven to your doorstep</span>
          </div>
        </div>
      </div>
    </section>
  );
};
