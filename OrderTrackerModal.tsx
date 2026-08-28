import React, { useState, useEffect } from 'react';
import { CheckCircle2, Flame, Package, Bike, Sparkles, X, Clock, MapPin, Phone, RefreshCw, Printer, ShieldCheck } from 'lucide-react';
import { CustomerOrder } from '../types';

interface OrderTrackerModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  if (!order) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState<number>(24);

  // Auto-progress simulation for fun demonstration
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setEstimatedMinutesLeft(18);
    }, 4000);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setEstimatedMinutesLeft(12);
    }, 10000);

    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setEstimatedMinutesLeft(5);
    }, 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    {
      step: 1,
      title: 'Order Confirmed',
      desc: 'Ticket printed & ingredients prepped',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500',
    },
    {
      step: 2,
      title: 'In 900°F Stone Oven',
      desc: 'Blistering in handcrafted wood oven',
      icon: Flame,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500',
    },
    {
      step: 3,
      title: 'Boxed & Inspected',
      desc: 'Topped with fresh basil & sliced',
      icon: Package,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500',
    },
    {
      step: 4,
      title: order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup',
      desc: order.orderType === 'delivery' ? 'On route with thermal pizza bag' : 'Waiting on front counter',
      icon: Bike,
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0f0f13] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-6 flex flex-col">
        {/* Header with Celebration Banner */}
        <div className="p-6 bg-gradient-to-r from-orange-950/80 via-neutral-900 to-red-950/80 border-b border-neutral-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Placed Successfully!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Live Pizza Tracker
          </h2>

          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-2 font-mono">
            <span>Order ID: <strong className="text-amber-400 font-bold">{order.id}</strong></span>
            <span>•</span>
            <span>Placed at {order.createdAt}</span>
          </div>
        </div>

        {/* Tracker Progress Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[75vh]">
          {/* Estimated Time Card */}
          <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-black">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-xs text-neutral-400 uppercase font-semibold">Estimated Arrival</div>
                <div className="text-xl font-black text-white">
                  ~{estimatedMinutesLeft} Minutes
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                On Schedule
              </span>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="space-y-6">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-neutral-800 -z-0"></div>

              <div className="space-y-6">
                {steps.map((s) => {
                  const isDone = currentStep >= s.step;
                  const isCurrent = currentStep === s.step;
                  const Icon = s.icon;

                  return (
                    <div key={s.step} className="flex items-start gap-4 relative z-10">
                      {/* Step Circle */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isDone
                            ? `${s.bg} ${s.color} border-2 ${s.border} shadow-lg shadow-orange-950`
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-600'
                        } ${isCurrent ? 'scale-110 ring-4 ring-orange-500/20' : ''}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isDone ? 'text-white' : 'text-neutral-500'}`}>
                            {s.title}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-950/60 border border-orange-800/40 px-2 py-0.5 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Courier / Pizzeria info card */}
          {order.orderType === 'delivery' ? (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                  🛵
                </div>
                <div>
                  <div className="font-bold text-white">Courier: Marco Valente</div>
                  <div className="text-neutral-400">Red Vespa • Heated Pizza Bag</div>
                </div>
              </div>
              <a
                href="tel:+15554389921"
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-orange-400 font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-1 text-xs">
              <div className="font-bold text-orange-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Pickup Counter:
              </div>
              <div className="text-white">428 S Artisan Boulevard, Little Italy District</div>
            </div>
          )}

          {/* Order Summary Details */}
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Ordered Items Summary
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-xs text-neutral-300">
                  <span>
                    <strong>{item.quantity}x</strong> {item.pizza.name} ({item.size})
                  </span>
                  <span className="font-semibold text-white">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 flex justify-between text-xs font-bold text-white">
              <span>Total Paid:</span>
              <span className="text-amber-400 font-black text-sm">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-2 border border-neutral-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onNewOrder}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Order Another Pizza</span>
          </button>
        </div>
      </div>
    </div>
  );
};
