
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  main: boolean;
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

export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  styles?: string[];
  materials?: string[];
  sort?: "price-asc" | "price-desc" | "newest" | "bestselling" | "featured";
};
