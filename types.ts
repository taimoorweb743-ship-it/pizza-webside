export type SizeOption = 'Small (8")' | 'Medium (12")' | 'Large (14")' | 'Monster (18")';

export type CrustOption = 'Classic Hand Tossed' | 'Crispy Thin Crust' | 'Cheesy Stuffed Crust' | 'Garlic Herb Butter Crust';

export interface ExtraTopping {
  id: string;
  name: string;
  price: number;
  category: 'cheese' | 'meat' | 'veggie' | 'sauce';
}

export interface PizzaItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // Base price for Medium
  priceSmall: number;
  priceLarge: number;
  priceMonster: number;
  category: 'signature' | 'classic' | 'spicy' | 'vegetarian' | 'cheesy' | 'sides' | 'beverages' | 'desserts';
  image: string;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  calories: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  ingredients: string[];
  allergens?: string[];
}

export interface CartItem {
  cartItemId: string;
  pizza: PizzaItem;
  size: SizeOption;
  crust: CrustOption;
  selectedToppings: ExtraTopping[];
  quantity: number;
  itemPrice: number; // Unit price including size & toppings
  totalPrice: number; // itemPrice * quantity
  specialInstructions?: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrder: number;
  description: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  code: string;
  discountBadge: string;
  image: string;
  expiryText: string;
  itemsIncluded: string[];
  comboPrice?: number;
  originalPrice?: number;
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'cod' | 'card' | 'online';
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    deliveryNotes?: string;
  };
  status: 'received' | 'baking' | 'boxed' | 'on_the_way' | 'delivered';
  estimatedDeliveryTime: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verifiedOrder: boolean;
  dishName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'pizzas' | 'oven' | 'kitchen' | 'ingredients' | 'ambience';
  image: string;
  caption: string;
}
