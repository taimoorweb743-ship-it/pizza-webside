import React, { useState, useMemo } from 'react';
import { Search, Flame, Star, Clock, SlidersHorizontal, Heart, Plus, Sparkles, X, ChevronDown, Check } from 'lucide-react';
import { PizzaItem } from '../types';

interface MenuSectionProps {
  pizzas: PizzaItem[];
  onOpenPizzaModal: (pizza: PizzaItem) => void;
  onQuickAddToCart: (pizza: PizzaItem) => void;
  favorites: string[];
  onToggleFavorite: (pizzaId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  pizzas,
  onOpenPizzaModal,
  onQuickAddToCart,
  favorites,
  onToggleFavorite,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');
  const [filterSpicy, setFilterSpicy] = useState<boolean>(false);
  const [filterVeg, setFilterVeg] = useState<boolean>(false);
  const [filterChefSpecial, setFilterChefSpecial] = useState<boolean>(false);
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'signature', label: '🔥 Signature Pies' },
    { id: 'classic', label: '🍕 Classic Neapolitan' },
    { id: 'spicy', label: '🌶️ Spicy Pizzas' },
    { id: 'cheesy', label: '🧀 Extra Cheesy' },
    { id: 'vegetarian', label: '🥗 Vegetarian' },
    { id: 'sides', label: '🍗 Sides & Wings' },
    { id: 'desserts', label: '🍰 Desserts' },
    { id: 'beverages', label: '🥤 Italian Sodas' },
  ];

  // Filtering & Sorting
  const filteredPizzas = useMemo(() => {
    return pizzas.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) return false;
      }
      // Dietary filters
      if (filterSpicy && !item.isSpicy) return false;
      if (filterVeg && !item.isVegetarian) return false;
      if (filterChefSpecial && !item.isChefSpecial) return false;
      if (filterFavoritesOnly && !favorites.includes(item.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: popular (bestseller first, then reviewsCount)
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [pizzas, selectedCategory, searchQuery, filterSpicy, filterVeg, filterChefSpecial, filterFavoritesOnly, favorites, sortBy]);

  const activeFiltersCount = (filterSpicy ? 1 : 0) + (filterVeg ? 1 : 0) + (filterChefSpecial ? 1 : 0) + (filterFavoritesOnly ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilterSpicy(false);
    setFilterVeg(false);
    setFilterChefSpecial(false);
    setFilterFavoritesOnly(false);
    setSortBy('popular');
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#0c0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Crafted Fresh Daily</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Our Artisan <span className="text-gradient-fire">Pizza Menu</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              Handcrafted with slow-fermented 72-hour sourdough, fresh Campania mozzarella, and baked on volcanic stone at 900°F.
            </p>
          </div>

          {/* Search bar in header */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizzas, ingredients..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-neutral-400 hover:text-white absolute right-3 top-3"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/30 scale-[1.02]'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Sorting Toolbar */}
        <div className="mt-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Quick Dietary Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-400 text-xs font-semibold mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters:
            </span>

            <button
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                filterSpicy
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>🌶️ Spicy</span>
              {filterSpicy && <Check className="w-3 h-3 text-red-400" />}
            </button>

            <button
              onClick={() => setFilterVeg(!filterVeg)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                filterVeg
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>🥗 Vegetarian</span>
              {filterVeg && <Check className="w-3 h-3 text-emerald-400" />}
            </button>

            <button
              onClick={() => setFilterChefSpecial(!filterChefSpecial)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                filterChefSpecial
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>👨🍳 Chef's Pick</span>
              {filterChefSpecial && <Check className="w-3 h-3 text-amber-400" />}
            </button>

            <button
              onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                filterFavoritesOnly
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>❤️ Saved ({favorites.length})</span>
              {filterFavoritesOnly && <Check className="w-3 h-3 text-rose-400" />}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-orange-400 hover:underline px-2 py-1"
              >
                Clear all ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-neutral-400 text-xs font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-orange-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated (★ 5.0)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 mb-4 flex items-center justify-between text-xs text-neutral-400">
          <span>Showing <strong>{filteredPizzas.length}</strong> delicious items</span>
          {searchQuery && (
            <span>Matching "<strong>{searchQuery}</strong>"</span>
          )}
        </div>

        {/* Pizza Items Grid */}
        {filteredPizzas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPizzas.map((pizza) => {
              const isFav = favorites.includes(pizza.id);
              return (
                <div
                  key={pizza.id}
                  className="group bg-neutral-900/80 border border-neutral-800/90 hover:border-orange-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-950/30"
                >
                  {/* Item Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-950">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30"></div>

                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {pizza.isBestseller && (
                        <span className="bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-md tracking-wider">
                          ★ Bestseller
                        </span>
                      )}
                      {pizza.isChefSpecial && (
                        <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-md tracking-wider">
                          Chef's Pick
                        </span>
                      )}
                      {pizza.isSpicy && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
                          🌶️ Spicy
                        </span>
                      )}
                      {pizza.isVegetarian && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
                          🥗 Veg
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => onToggleFavorite(pizza.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-950/70 hover:bg-neutral-950 backdrop-blur-md flex items-center justify-center text-neutral-300 hover:text-red-400 transition-all border border-neutral-700/60"
                      title={isFav ? "Remove from favorites" : "Save to favorites"}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Prep Time & Calories Pill */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-neutral-800">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {pizza.prepTimeMinutes} mins
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span>{pizza.calories} kcal</span>
                      <span className="text-neutral-400">•</span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {pizza.rating} ({pizza.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                        {pizza.name}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {pizza.description}
                      </p>

                      {/* Ingredients preview */}
                      <div className="pt-2 flex flex-wrap gap-1">
                        {pizza.ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/50"
                          >
                            {ing}
                          </span>
                        ))}
                        {pizza.ingredients.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-800/50 text-neutral-400">
                            +{pizza.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase font-semibold">Medium 12"</div>
                        <div className="text-lg font-black text-white">
                          ${pizza.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Customize button */}
                        <button
                          onClick={() => onOpenPizzaModal(pizza)}
                          className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs transition-colors border border-neutral-700"
                          title="Choose size, crust & toppings"
                        >
                          Customize
                        </button>

                        {/* Quick Add button */}
                        <button
                          onClick={() => onQuickAddToCart(pizza)}
                          className="p-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 transition-transform active:scale-90"
                          title="Quick add Medium size to cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800 p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-2xl">
              🍕
            </div>
            <h3 className="text-xl font-bold text-white">No pizzas match your criteria</h3>
            <p className="text-sm text-neutral-400">
              Try searching with different keywords or clearing your active dietary filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
