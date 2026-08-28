import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { PizzaModal } from './components/PizzaModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';

import { PIZZA_MENU, SPECIAL_OFFERS, AVAILABLE_COUPONS } from './data/pizzaData';
import { PizzaItem, CartItem, SizeOption, CrustOption, ExtraTopping, Coupon, SpecialOffer, CustomerOrder } from './types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // 1. Cart state with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sliceandfire_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Favorites state with LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sliceandfire_favorites');
      return saved ? JSON.parse(saved) : ['pizza-diavola-supreme', 'pizza-truffle-wild-mushroom'];
    } catch {
      return ['pizza-diavola-supreme', 'pizza-truffle-wild-mushroom'];
    }
  });

  // 3. Modals and drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [customizingPizza, setCustomizingPizza] = useState<PizzaItem | null>(null);
  const [activeOrder, setActiveOrder] = useState<CustomerOrder | null>(null);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // 4. Search & UI filtering state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 5. Toast notification system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sliceandfire_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to local storage', e);
    }
  }, [cartItems]);

  // Sync favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sliceandfire_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites to local storage', e);
    }
  }, [favorites]);

  // Toggle favorite
  const handleToggleFavorite = (pizzaId: string) => {
    if (favorites.includes(pizzaId)) {
      setFavorites(favorites.filter((id) => id !== pizzaId));
      addToast('Removed from Favorites', undefined, 'info');
    } else {
      setFavorites([...favorites, pizzaId]);
      addToast('Added to Favorites ❤️', 'Saved to your quick favorites list');
    }
  };

  // Add customized pizza to cart
  const handleAddToCart = (
    pizza: PizzaItem,
    size: SizeOption,
    crust: CrustOption,
    selectedToppings: ExtraTopping[],
    quantity: number,
    specialInstructions: string,
    unitPrice: number
  ) => {
    const cartItemId = `${pizza.id}-${size}-${crust}-${selectedToppings.map((t) => t.id).sort().join(',')}-${specialInstructions}`;

    const existingIndex = cartItems.findIndex((item) => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const existing = updated[existingIndex];
      const newQty = existing.quantity + quantity;
      updated[existingIndex] = {
        ...existing,
        quantity: newQty,
        totalPrice: existing.itemPrice * newQty,
      };
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartItemId,
        pizza,
        size,
        crust,
        selectedToppings,
        quantity,
        itemPrice: unitPrice,
        totalPrice: unitPrice * quantity,
        specialInstructions,
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    addToast(`Added to Order!`, `${quantity}x ${pizza.name} (${size})`);
  };

  // Quick add default medium pizza
  const handleQuickAddToCart = (pizza: PizzaItem) => {
    handleAddToCart(
      pizza,
      'Medium (12")',
      'Classic Hand Tossed',
      [],
      1,
      '',
      pizza.price
    );
  };

  // Add Special Combo deal to cart
  const handleAddComboToCart = (offer: SpecialOffer) => {
    // Pick Diavola or first signature as representation
    const pizzaItem = PIZZA_MENU[0];
    const comboPrice = offer.comboPrice || 39.99;

    const newItem: CartItem = {
      cartItemId: `combo-${offer.id}-${Date.now()}`,
      pizza: {
        ...pizzaItem,
        name: offer.title,
        description: offer.itemsIncluded.join(' + '),
        price: comboPrice,
        image: offer.image,
      },
      size: 'Large (14")',
      crust: 'Classic Hand Tossed',
      selectedToppings: [],
      quantity: 1,
      itemPrice: comboPrice,
      totalPrice: comboPrice,
      specialInstructions: `Combo Deal (${offer.code}): ${offer.itemsIncluded.join(', ')}`,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    addToast(`Combo Added! 🔥`, offer.title);
  };

  // Quantity updates
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.itemPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  // Remove single item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Apply coupon code
  const handleApplyCoupon = (code: string): boolean => {
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );

    const subtotal = cartItems.reduce((a, b) => a + b.totalPrice, 0);

    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        setAppliedCoupon(coupon);
        addToast(`Promo Applied! 🎉`, `${coupon.discountPercentage}% discount added to your cart`);
        return true;
      } else {
        addToast(`Minimum Order Not Met`, `Order at least $${coupon.minOrder} to use ${coupon.code}`, 'error');
        return false;
      }
    }
    return false;
  };

  // Order Placement Success
  const handleOrderSuccess = (order: CustomerOrder) => {
    setActiveOrder(order);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCartItems([]); // Empty cart after successful placement
    setAppliedCoupon(null);
    addToast(`Order Confirmed! 🍕`, `Order #${order.id} sent to our wood oven`);
  };

  const featuredPizza = PIZZA_MENU[0]; // Diavola Hot Honey

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOffers = () => {
    const el = document.getElementById('offers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchFocus = () => {
    scrollToMenu();
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) searchInput.focus();
  };

  const totalCartCount = cartItems.reduce((a, b) => a + b.quantity, 0);
  const cartSubtotal = cartItems.reduce((a, b) => a + b.totalPrice, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 selection:bg-orange-500 selection:text-black">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top Fixed Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onSearchClick={handleSearchFocus}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          featuredPizza={featuredPizza}
          onOrderFeatured={(pizza) => setCustomizingPizza(pizza)}
          onExploreMenu={scrollToMenu}
          onViewOffers={scrollToOffers}
        />

        {/* 2. Special Offers & Deals */}
        <SpecialOffers
          offers={SPECIAL_OFFERS}
          onApplyCoupon={(code) => {
            handleApplyCoupon(code);
            setIsCartOpen(true);
          }}
          onAddComboToCart={handleAddComboToCart}
        />

        {/* 3. Pizza Menu with Category & Search Filters */}
        <MenuSection
          pizzas={PIZZA_MENU}
          onOpenPizzaModal={(pizza) => setCustomizingPizza(pizza)}
          onQuickAddToCart={handleQuickAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 4. About Us & Wood-Fired Heritage */}
        <AboutSection />

        {/* 5. Food & Kitchen Gallery */}
        <GallerySection />

        {/* 6. Customer Reviews */}
        <CustomerReviews />

        {/* 7. Contact & Pizzeria Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Cart Bar (Mobile Floating Bar) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 text-white font-black text-sm shadow-2xl shadow-orange-950 flex items-center justify-between border border-orange-400/40 animate-in slide-in-from-bottom-4 duration-300"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center font-black text-xs">
                {totalCartCount}
              </div>
              <span>View Cart & Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-300">${cartSubtotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Modals and Drawers */}

      {/* Pizza Customization Modal */}
      <PizzaModal
        pizza={customizingPizza}
        onClose={() => setCustomizingPizza(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        setOrderType={setOrderType}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal Form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onNewOrder={() => {
          setActiveOrder(null);
          scrollToMenu();
        }}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        pizzas={PIZZA_MENU}
        onRemoveFavorite={handleToggleFavorite}
        onOpenPizzaModal={(pizza) => setCustomizingPizza(pizza)}
        onQuickAddToCart={handleQuickAddToCart}
      />
    </div>
  );
}
