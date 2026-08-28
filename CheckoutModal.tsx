import React, { useState } from 'react';
import { X, CreditCard, Banknote, ShieldCheck, MapPin, Phone, Mail, User, Clock, CheckCircle2, Lock, ArrowLeft, Store } from 'lucide-react';
import { CartItem, Coupon, CustomerOrder } from '../types';
import { RESTAURANT_INFO } from '../data/pizzaData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: 'delivery' | 'pickup';
  appliedCoupon: Coupon | null;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  appliedCoupon,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'online'>('card');

  // Simulated card inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold || orderType === 'pickup';
  const deliveryFee = isFreeDelivery ? 0 : 3.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic validation
    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setValidationError('Please enter a valid phone number for delivery updates.');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setValidationError('Please enter your delivery street address.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvc)) {
      setValidationError('Please complete the card payment details.');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment authorization & order generation
    setTimeout(() => {
      const newOrder: CustomerOrder = {
        id: `SF-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        deliveryFee,
        tax,
        total: grandTotal,
        orderType,
        paymentMethod,
        customer: {
          fullName,
          phone,
          email: email || 'customer@sliceandfire.com',
          address: orderType === 'delivery' ? address : 'In-Store Pickup (428 S Artisan Blvd)',
          deliveryNotes,
        },
        status: 'received',
        estimatedDeliveryTime: '25–35 mins',
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#111116] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xl font-black text-white">Complete Your Pizza Order</h2>
              <p className="text-xs text-neutral-400">
                {orderType === 'delivery' ? '🚀 Fast Wood-Fired Hot Delivery' : '🏪 In-Store Pizzeria Pickup'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            {validationError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-semibold">
                ⚠️ {validationError}
              </div>
            )}

            {/* 1. Contact Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 font-medium">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 font-medium">Phone Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs text-neutral-400 font-medium">Email (for digital receipt)</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Delivery Address / Location */}
            {orderType === 'delivery' ? (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Delivery Destination
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400 font-medium">Street Address, Apt / Floor *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                        className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                      />
                      <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-400 font-medium">Delivery Notes / Gate Code</label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Leave with doorman, ring #42, please knock gently"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Store className="w-4 h-4" />
                  Pickup Pizzeria Location:
                </div>
                <div className="text-xs text-white font-medium">
                  {RESTAURANT_INFO.name} — {RESTAURANT_INFO.address}
                </div>
                <div className="text-[11px] text-neutral-400">
                  Ready in approximately 15–20 mins after placement.
                </div>
              </div>
            )}

            {/* 3. Payment Method */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-orange-600/20 border-orange-500 text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-orange-600/20 border-orange-500 text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Pay on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('online')}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'online'
                      ? 'bg-orange-600/20 border-orange-500 text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Apple / G-Pay</span>
                </button>
              </div>

              {/* Card input simulation if 'card' selected */}
              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-400 font-medium">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8892"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 font-medium">Expiry MM/YY</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="08/28"
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 font-medium">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>256-bit SSL encrypted & tokenized security</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Items Summary & Total */}
          <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{item.pizza.name}</div>
                        <div className="text-[10px] text-orange-400">
                          {item.quantity}x • {item.size}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-200">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery ETA pill */}
              <div className="mt-4 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between text-xs text-orange-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated Delivery
                </span>
                <span className="font-bold">25–35 Mins</span>
              </div>

              {/* Price Calculations */}
              <div className="mt-4 space-y-2 text-xs border-t border-neutral-800 pt-3">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-neutral-400">
                  <span>Tax (8%)</span>
                  <span className="text-neutral-200">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                  <span>Total Due</span>
                  <span className="text-amber-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:opacity-50 text-white font-black text-sm shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirming Order...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Place Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
