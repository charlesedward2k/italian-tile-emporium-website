
import { useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Add intersection observer for analytics and performance monitoring
  useEffect(() => {
    if (!gridRef.current) return;

    // Create observer to track when products come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Could log analytics events or performance metrics here
            // console.log(`Product grid visible at ${performance.now()}ms`);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(gridRef.current);

    return () => {
      if (gridRef.current) observer.unobserve(gridRef.current);
    };
  }, [products]);
  
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
      </div>
    );
  }
  
  return (
    <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
