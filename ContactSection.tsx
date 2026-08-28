import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/pizzaData';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('catering');
  const [formMsg, setFormMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMsg) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span>We’re Here For You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Find Us & <span className="text-gradient-fire">Get In Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Have questions about party catering, bulk orders, dietary allergens, or special reservations? Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Quick Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Our Pizzeria</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{RESTAURANT_INFO.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 inline-block mt-2"
                >
                  Get Driving Directions &rarr;
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-orange-500/50 flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 font-medium">Direct Call</div>
                  <div className="text-xs font-bold text-white">{RESTAURANT_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20order%20pizza%21`}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-500 flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-300 font-medium">WhatsApp Order</div>
                  <div className="text-xs font-bold text-white">Instant Chat</div>
                </div>
              </a>
            </div>

            {/* Hours Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Wood-Fired Oven Hours</span>
              </div>
              <div className="space-y-2 text-xs">
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-neutral-800/60 last:border-0">
                    <span className="text-neutral-400">{h.days}</span>
                    <span className="text-neutral-200 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message / Catering Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800/90 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">Send Us a Quick Message</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Reach our kitchen directly for party catering packages, feedback, or special requests.
            </p>

            {sentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Received!</h4>
                <p className="text-xs text-neutral-300">
                  Grazie! Our head chef & manager will respond to you within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Maria Rossi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="maria@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Inquiry Type</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="catering">Party & Catering Pizza Package</option>
                    <option value="dietary">Allergens & Dietary Customization</option>
                    <option value="reservation">Table Reservation Inquiry</option>
                    <option value="feedback">General Feedback & Compliments</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Tell us what you have in mind..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Chef</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
