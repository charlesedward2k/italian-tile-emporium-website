
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "@/components/ProductFilters";
import { Product, ProductFilters as FiltersType } from "@/types/product";
import {
  filterProducts,
  sortProducts,
  getAllCategories,
  getAllMaterials,
  getAllStyles,
  getAllColors,
} from "@/data/products";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    category: queryParams.get("category") || undefined,
    search: queryParams.get("search") || undefined,
  });
  const [sort, setSort] = useState<string>(
    queryParams.get("sort") || "featured"
  );

  // Initialize data
  useEffect(() => {
    const allProducts = filterProducts({});
    setProducts(allProducts);
    setCategories(getAllCategories());
    setMaterials(getAllMaterials());
    setStyles(getAllStyles());
    setColors(getAllColors());
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    const filtered = filterProducts(filters);
    const sorted = sortProducts(filtered, sort);
    setFilteredProducts(sorted);
  }, [filters, sort, products]);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif">Our Italian Tile Collection</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Browse our extensive range of premium Italian tiles, sourced from the finest 
            manufacturers and traditional artisans across Italy.
          </p>
        </div>
      </div>

      {/* Product Filters and Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              materials={materials}
              styles={styles}
              colors={colors}
              currentFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Products Area */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="bestselling">Best Selling</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />

            {/* Pagination placeholder - for future implementation */}
            <div className="mt-12 flex justify-center">
              <Button variant="outline" disabled>
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
