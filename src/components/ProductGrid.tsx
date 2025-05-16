
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
      </div>
    );
  }
  
  return (
    <div className="tile-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
