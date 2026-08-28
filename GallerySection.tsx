import React, { useState } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/pizzaData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'pizzas', label: '🍕 Pizzas' },
    { id: 'oven', label: '🔥 900°F Oven' },
    { id: 'ingredients', label: '🍅 Fresh Ingredients' },
    { id: 'ambience', label: '✨ Ambience' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-orange-500" />
            <span>Behind The Wood Oven</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Artisan Food <span className="text-gradient-fire">Gallery</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            A glimpse into our kitchen craft, bubbly blistered crusts, and warm pizzeria atmosphere.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer"
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h4 className="text-sm font-bold">{photo.title}</h4>
                    <p className="text-xs text-neutral-300 mt-1">{photo.caption}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 ml-2">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-full object-contain"
              />
            </div>
            <div className="p-6 bg-neutral-950 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{activePhoto.title}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
