import React from 'react';
import { Flame, Clock, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      title: '72-Hour Cold Fermentation',
      desc: 'Our dough matures slowly over 3 days, yielding a feather-light crust that is easy to digest with maximum flavor depth and airy bubbles.',
    },
    {
      icon: Flame,
      title: '900°F Artisan Wood Oven',
      desc: 'Fired exclusively with dried hickory and olive wood, baking each pie in 90 seconds to achieve the coveted leopard-spotted char.',
    },
    {
      icon: ShieldCheck,
      title: '100% Certified D.O.P',
      desc: 'Hand-crushed San Marzano tomatoes from Naples, fresh Campania fior di latte mozzarella, and 24-month aged Prosciutto di Parma.',
    },
    {
      icon: HeartHandshake,
      title: 'Handcrafted With Passion',
      desc: 'Never machine-pressed. Every crust is hand-stretched and fired to order by certified master pizzaiolos.',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-[#0c0c0e] via-[#121217] to-[#0c0c0e] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                alt="Master Pizzaiolo stretching dough"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-neutral-950/80 backdrop-blur-md p-4 rounded-2xl border border-neutral-800 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-600/30 text-orange-400 flex items-center justify-center font-black shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Voted Best Neapolitan Crust 2025</h4>
                  <p className="text-xs text-neutral-400">Awarded by Artisan Culinary Guild</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Our Artisan Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              We Don't Just Make Pizza, <br />
              <span className="text-gradient-fire">We Honor The Fire.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Founded on the timeless Neapolitan philosophy that four simple ingredients—flour, water, yeast, and sea salt—can produce culinary perfection when treated with respect, patience, and 900°F blazing heat.
            </p>

            {/* 4 Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 space-y-2 hover:border-orange-500/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
