
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  main: boolean;
  width?: number;  // Optional width for aspect ratio calculation
  height?: number; // Optional height for aspect ratio calculation
  blurDataUrl?: string; // Optional base64 encoded LQIP
  formats?: {     // Optional different image formats
    webp?: string;
    avif?: string;
    jpg?: string;
    original?: string;
  };
  sizes?: {       // Optional different sizes for responsive images
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    original?: string;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  size: string;
  inStock: boolean;
  sku: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  tags: string[];
  colors: string[];
  style: string;
  material: string;
  dimensions: string;
  coverage: string;
  images: ProductImage[];
  variants: ProductVariant[];
  featured: boolean;
  bestseller: boolean;
  ratings: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  styles?: string[];
  materials?: string[];
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest" | "bestselling" | "featured";
}
