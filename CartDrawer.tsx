import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Bike, Store, Check, AlertCircle } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { RESTAURANT_INFO, AVAILABLE_COUPONS } from '../data/pizzaData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  setOrderType,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Discount calculation
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;

  // Delivery fee logic
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold || orderType === 'pickup';
  const deliveryFee = isFreeDelivery ? 0 : 3.99;

  // Tax (approx 8%)
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const freeDeliveryRemaining = Math.max(0, RESTAURANT_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / RESTAURANT_INFO.freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (code: string) => {
    setCouponError(null);
    setCouponSuccess(null);
    const valid = onApplyCoupon(code);
    if (valid) {
      setCouponSuccess(`Coupon ${code} applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code or minimum order not met.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f13] border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Your Pizza Cart</h2>
                <p className="text-xs text-neutral-400">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)} items in your order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors p-1"
                  title="Clear entire cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery / Pickup Tabs */}
          <div className="p-4 bg-neutral-950/60 border-b border-neutral-800">
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery (25-35m)</span>
              </button>

              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Pickup (15-20m)</span>
              </button>
            </div>

            {/* Free Delivery Bar (if Delivery selected) */}
            {orderType === 'delivery' && (
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  {freeDeliveryRemaining > 0 ? (
                    <span className="text-neutral-300">
                      Add <strong className="text-amber-400">${freeDeliveryRemaining.toFixed(2)}</strong> for <strong>FREE Delivery</strong>
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Free Express Delivery Unlocked!
                    </span>
                  )}
                  <span className="text-neutral-400">{Math.round(freeDeliveryProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.pizza.image}
                    alt={item.pizza.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-950"
                  />

                  {/* Item Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {item.pizza.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-orange-400 font-medium">
                      {item.size} • {item.crust}
                    </div>

                    {item.selectedToppings.length > 0 && (
                      <div className="text-[10px] text-neutral-400">
                        + {item.selectedToppings.map((t) => t.name).join(', ')}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <div className="text-[10px] text-amber-300/80 italic">
                        "{item.specialInstructions}"
                      </div>
                    )}

                    {/* Price and Quantity Adjuster */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-sm font-black text-white">
                        ${item.totalPrice.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-neutral-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:bg-neutral-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-3xl">
                  🍕
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Satisfy your pizza cravings! Choose from our wood-fired signature pizzas and combos.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Explore Delicious Pizzas
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Controls (Only if items exist) */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 space-y-4">
              {/* Coupon Code Section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. PIZZA20)"
                      className="w-full px-3 py-2 pl-8 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 font-mono uppercase focus:outline-none focus:border-orange-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Active Coupon Chip */}
                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      {appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)
                    </span>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-emerald-400 hover:text-red-400 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {couponError}
                  </div>
                )}

                {/* Available Quick Coupon Chips */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 overflow-x-auto text-[10px]">
                    <span className="text-neutral-400 shrink-0">Try:</span>
                    {AVAILABLE_COUPONS.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400 hover:border-amber-500 shrink-0 font-mono"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs border-t border-neutral-800 pt-3">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon.discountPercentage}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-neutral-200">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-neutral-800">
                  <span>Grand Total</span>
                  <span className="text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
