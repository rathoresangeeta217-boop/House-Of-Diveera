export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  onSale?: boolean;
  isBigDeal?: boolean;
  inDiveeraCollection?: boolean;
  tag?: string;
  rating: number;
  reviews: number;
  images?: string[];
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Bracelet', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '2', name: 'Chains', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '3', name: 'Earrings', image: 'https://images.unsplash.com/photo-1535633302704-b02923659b38?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '4', name: 'Hair accessories', image: 'https://images.unsplash.com/photo-1630154060269-e380f33190fc?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '5', name: 'Hath phul', image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce3d8e?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '6', name: 'Necklace', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '7', name: 'Nosepin', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '8', name: 'Pendant', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '9', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '10', name: "Men's Collection", image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '11', name: 'Bangles', image: 'https://images.unsplash.com/photo-1611591439812-499981831841?q=80&w=300&h=300&auto=format&fit=crop' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Antique Gold Bangle Set',
    price: 1299,
    originalPrice: 2499,
    category: 'Bangles',
    image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce3d8e?q=80&w=600&h=600&auto=format&fit=crop',
    isBestSeller: true,
    onSale: true,
    tag: 'Trending',
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'p2',
    name: 'Emerald Floral Necklace',
    price: 2499,
    originalPrice: 3999,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&h=600&auto=format&fit=crop',
    onSale: true,
    tag: 'New Launch',
    rating: 4.9,
    reviews: 84
  },
  {
    id: 'p3',
    name: 'Pearl Hair Clip Duo',
    price: 499,
    originalPrice: 899,
    category: 'Hair Accessories',
    image: 'https://images.unsplash.com/photo-1630138224097-f5bc81440798?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Must Have',
    rating: 4.7,
    reviews: 320
  },
  {
    id: 'p4',
    name: 'Rose Gold Stackable Ring',
    price: 899,
    originalPrice: 1499,
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1603912627214-94a159937923?q=80&w=600&h=600&auto=format&fit=crop',
    isBestSeller: true,
    onSale: true,
    rating: 4.8,
    reviews: 210
  },
  {
    id: 'p5',
    name: 'Kundan Meena Choker',
    price: 3499,
    originalPrice: 5999,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'EXTRA ₹500 OFF',
    rating: 4.9,
    reviews: 45
  },
  {
    id: 'p6',
    name: 'Silk Thread Bangles',
    price: 699,
    originalPrice: 1299,
    category: 'Bangles',
    image: 'https://images.unsplash.com/photo-1611591439812-499981831841?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Bestseller',
    rating: 4.6,
    reviews: 128
  },
  {
    id: 'p7',
    name: 'Velvet Hair Bow',
    price: 299,
    originalPrice: 599,
    category: 'Hair Accessories',
    image: 'https://images.unsplash.com/photo-1620641711200-26466f39e3ec?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'New Launch',
    rating: 4.8,
    reviews: 56
  },
  {
    id: 'p8',
    name: 'Classic Plated Anklet',
    price: 749,
    originalPrice: 1199,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1610492317734-ef8ca8c4f94e?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Trending',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'p9',
    name: 'Floral Crystal Bracelet',
    price: 1199,
    originalPrice: 1999,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'New Collection',
    rating: 4.9,
    reviews: 42
  },
  {
    id: 'p10',
    name: 'Elegant Pearl Bracelet',
    price: 899,
    originalPrice: 1599,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1573408302382-90ab654394e7?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Bestseller',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'p11',
    name: 'Golden Charm Bracelet',
    price: 1499,
    originalPrice: 2499,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce3d8e?q=80&w=600&h=600&auto=format&fit=crop',
    isBestSeller: true,
    rating: 4.9,
    reviews: 86
  },
  {
    id: 'p12',
    name: 'Bohemian Beaded Bracelet',
    price: 499,
    originalPrice: 999,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Trending',
    rating: 4.7,
    reviews: 215
  },
  {
    id: 'p13',
    name: 'Rose Gold Tennis Bracelet',
    price: 2999,
    originalPrice: 4999,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Premium',
    rating: 5.0,
    reviews: 28
  },
  {
    id: 'p14',
    name: 'Infinite Shine Bracelet',
    price: 1299,
    originalPrice: 1999,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 56
  },
  {
    id: 'p15',
    name: 'Kundan Work Bracelet',
    price: 1899,
    originalPrice: 3299,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Artisan',
    rating: 4.9,
    reviews: 74
  },
  {
    id: 'p16',
    name: 'Minimalist Chain Bracelet',
    price: 599,
    originalPrice: 999,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'p17',
    name: 'Geometric Cuff Bracelet',
    price: 1099,
    originalPrice: 1799,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Modern',
    rating: 4.7,
    reviews: 43
  },
  {
    id: 'p18',
    name: 'Vintage Stone Bracelet',
    price: 2499,
    originalPrice: 3899,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1535633302704-b02923659b38?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 95
  },
  {
    id: 'p19',
    name: 'Handcrafted Silk Bracelet',
    price: 799,
    originalPrice: 1399,
    category: 'Bracelet',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Unique',
    rating: 4.8,
    reviews: 67
  },
  {
    id: 'm1',
    name: "Men's Classic Premium Ring",
    price: 1499,
    originalPrice: 2999,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1603912627214-94a159937923?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Bestseller',
    rating: 4.9,
    reviews: 120,
    features: ['925 Hallmarked', 'Handcrafted', 'Premium Finish']
  },
  {
    id: 'm2',
    name: "Men's Curb Chain Necklace",
    price: 2199,
    originalPrice: 3499,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Trending',
    rating: 4.8,
    reviews: 85,
    features: ['Stainless Steel', 'Tarnish Free', 'Daily Wear']
  },
  {
    id: 'm3',
    name: "Men's Braided Leather Bracelet",
    price: 999,
    originalPrice: 1799,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Gift Idea',
    rating: 4.7,
    reviews: 210,
    features: ['Genuine Leather', 'Magnetic Clasp', 'Adjustable']
  },
  {
    id: 'm4',
    name: "Men's Onyx Signet Ring",
    price: 1899,
    originalPrice: 2899,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&h=600&auto=format&fit=crop',
    tag: 'Premium',
    rating: 5.0,
    reviews: 45,
    features: ['Natural Onyx', 'Premium Plated', 'Elegent Design']
  },
  {
    id: 'm5',
    name: "Men's Minimalist Chain",
    price: 1299,
    originalPrice: 1999,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&h=600&auto=format&fit=crop',
    rating: 4.6,
    reviews: 67
  },
  {
    id: 'm6',
    name: "Men's Black Stud Earring",
    price: 399,
    originalPrice: 799,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&h=300&auto=format&fit=crop',
    tag: 'Budget Pick',
    rating: 4.5,
    reviews: 89,
    features: ['Surgical Steel', 'Hypoallergenic', 'Daily Wear']
  },
  {
    id: 'm7',
    name: "Men's Classic Cross Pendant",
    price: 499,
    originalPrice: 999,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=300&h=300&auto=format&fit=crop',
    tag: 'Trending',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'm8',
    name: "Men's Rope Chain Bracelet",
    price: 899,
    originalPrice: 1599,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=300&h=300&auto=format&fit=crop',
    tag: 'Top Rated',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 'm9',
    name: "Men's Minimal Band Ring",
    price: 799,
    originalPrice: 1299,
    category: "Men",
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&h=300&auto=format&fit=crop',
    rating: 4.7,
    reviews: 64
  },
  {
    id: 'h1',
    name: "Luxury Radiance Hamper",
    price: 3499,
    originalPrice: 4999,
    category: "Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c4701?q=80&w=600&h=600&auto=format&fit=crop",
    tag: "Most Loved",
    rating: 4.9,
    reviews: 230,
    features: ["Precious Pendant", "Scented Candle", "Greeting Card"]
  },
  {
    id: 'h2',
    name: "Golden Daze Gift Set",
    price: 2899,
    originalPrice: 3899,
    category: "Hampers",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887183?q=80&w=600&h=600&auto=format&fit=crop",
    tag: "Perfect Gift",
    rating: 4.8,
    reviews: 145,
    features: ["Stackable Rings", "Premium Box", "Chocolate Box"]
  },
  {
    id: 'h3',
    name: "Men's Executive Hamper",
    price: 4299,
    originalPrice: 5999,
    category: "Hampers",
    image: "https://images.unsplash.com/photo-1510255191414-7f9746f9914b?q=80&w=600&h=600&auto=format&fit=crop",
    tag: "For Him",
    rating: 5.0,
    reviews: 89,
    features: ["Premium Chain", "Leather Wallet", "Cufflinks"]
  },
  {
    id: 'h4',
    name: "Everlasting Love Combo",
    price: 5499,
    originalPrice: 7499,
    category: "Hampers",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&h=600&auto=format&fit=crop",
    tag: "Anniversary Special",
    rating: 4.9,
    reviews: 112,
    features: ["Couple Rings", "Rose Box", "Photo Frame"]
  }
];
