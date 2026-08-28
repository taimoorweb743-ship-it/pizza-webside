import React, { useState, useEffect } from 'react';
import { Pizza, ShoppingBag, Flame, Menu, X, Phone, Heart, Search } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  onSearchClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Special Offers', href: '#offers' },
    { label: 'About Us', href: '#about' },
    { label: 'Food Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0c0e]/95 backdrop-blur-md border-b border-orange-950/40 shadow-xl shadow-black/40 py-3'
          : 'bg-gradient-to-b from-[#0c0c0e]/90 via-[#0c0c0e]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                SLICE & FIRE
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-orange-400/90 -mt-1">
                Wood-Fired Pizzeria
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Search Quick Button */}
            <button
              id="nav-search-button"
              onClick={onSearchClick}
              title="Search Pizzas"
              className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-orange-400 border border-neutral-800 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist / Favorites */}
            <button
              id="nav-favorites-button"
              onClick={onOpenFavorites}
              title="Saved Favorites"
              className="relative p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-red-400 border border-neutral-800 transition-all"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Phone order badge (Desktop) */}
            <a
              id="nav-phone-call"
              href="tel:+15557499234"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-orange-500/50 text-xs font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>(555) 749-9234</span>
            </a>

            {/* Cart Button */}
            <button
              id="nav-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-600/25 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 ? (
                <span className="bg-neutral-950/80 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
                  {totalItemsCount} • ${cartSubtotal.toFixed(2)}
                </span>
              ) : (
                <span className="bg-neutral-950/40 text-neutral-200 text-xs px-1.5 py-0.5 rounded-full font-medium">
                  0
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden mt-3 p-4 bg-neutral-900/95 border border-neutral-800/80 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-800/50 hover:bg-orange-600/20 text-neutral-200 hover:text-orange-400 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <a
                href="tel:+15557499234"
                className="flex items-center gap-2 text-orange-400 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" /> Call: (555) 749-9234
              </a>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open Now
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
