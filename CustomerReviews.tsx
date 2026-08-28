import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ThumbsUp, X } from 'lucide-react';
import { ReviewItem } from '../types';
import { CUSTOMER_REVIEWS } from '../data/pizzaData';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(CUSTOMER_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [dishName, setDishName] = useState('Diavola Hot Honey Fire');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      author,
      rating,
      date: 'Just now',
      comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verifiedOrder: true,
      dishName,
    };

    setReviews([newRev, ...reviews]);
    setModalOpen(false);
    setAuthor('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-[#0c0c0e] via-[#111116] to-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Loved by <span className="text-gradient-fire">Pizza Devotees</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Read authentic feedback from over 2,400+ verified artisan pizza lovers.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs flex items-center gap-2 transition-all self-start md:self-auto hover:border-orange-500"
          >
            <MessageSquarePlus className="w-4 h-4 text-orange-400" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating stars & verified */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verifiedOrder && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-3 h-3" /> Verified Order
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Dish */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.author}</h4>
                    <span className="text-[10px] text-neutral-500">{rev.date}</span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded-md">
                  {rev.dishName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121217] border border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Share Your Experience</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Leo Bianchi"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Pizza Ordered</label>
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`p-2 rounded-lg border flex items-center gap-1 text-xs ${
                        rating >= num
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span>{num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was the dough, charring, flavor, and delivery?"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs shadow-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
