import React, { useState } from 'react';
import { Flame, Send, Heart, Check, ShieldCheck, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/pizzaData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">SLICE & FIRE</span>
                <span className="text-[10px] block uppercase font-bold text-orange-400 -mt-1">
                  Wood-Fired Artisan Pizzeria
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Handcrafted with 72-hour cold-fermented sourdough, organic San Marzano tomatoes, and baked at 900°F in our authentic stone wood oven.
            </p>

            <div className="flex items-center gap-3 pt-2 text-neutral-300">
              <a href="#" className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 hover:text-orange-400 border border-neutral-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 hover:text-orange-400 border border-neutral-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 hover:text-orange-400 border border-neutral-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="hover:text-orange-400 transition-colors">Artisan Pizza Menu</a></li>
              <li><a href="#offers" className="hover:text-orange-400 transition-colors">Special Combos & Deals</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">Our Sourdough Story</a></li>
              <li><a href="#gallery" className="hover:text-orange-400 transition-colors">Kitchen & Food Gallery</a></li>
              <li><a href="#reviews" className="hover:text-orange-400 transition-colors">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Visit & Contact</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{RESTAURANT_INFO.phone}</span>
            </p>
            <div className="pt-2 text-neutral-300">
              <div className="font-semibold text-white">Daily Oven Hours:</div>
              <div className="text-[11px] text-neutral-400 mt-1">11:00 AM – 11:30 PM (Sun: 12PM-10PM)</div>
            </div>
          </div>

          {/* Newsletter Signup (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get $5 OFF Voucher</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe for secret weekly pizza drops, discount codes, and chef tasting events.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Coupon sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 pr-10 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name}. All Rights Reserved. Crafted with passion & firewood.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Allergen Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
