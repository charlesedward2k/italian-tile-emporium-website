
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import OptimizedImage from "@/components/OptimizedImage";
import { Product } from "@/types/product";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { useShoppingCart } from "@/hooks/use-shopping-cart";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useShoppingCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("No product slug provided");
      setLoading(false);
      return;
    }

    console.log("Loading product with slug:", slug);
    setLoading(true);
    setError(null);

    try {
      const productData = getProductBySlug(slug);
      console.log("Found product:", productData);
      
      if (productData) {
        setProduct(productData);
        setSelectedImage(productData.images[0].url);
        
        if (productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0].id);
        }
        
        const related = getRelatedProducts(productData, 3);
        console.log("Related products:", related);
        setRelatedProducts(related);
      } else {
        console.log("Product not found for slug:", slug);
        setError("Product not found");
      }
    } catch (err) {
      console.error("Error loading product:", err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-destructive mb-4">{error || "Product not found"}</p>
        <Button onClick={() => navigate("/products")} variant="outline">
          Back to Products
        </Button>
      </div>
    );
  }

  const selectedVariantDetails = product.variants.find(
    (v) => v.id === selectedVariant
  );

  const handleAddToCart = () => {
    // Add the item to cart with selected variant and quantity
    addItem({
      id: product.id,
      name: product.name,
      price: selectedVariantDetails?.price || product.price,
      quantity: quantity,
      image: selectedImage || product.images[0].url,
      variant: selectedVariantDetails?.name
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedVariantDetails?.name || 'Default'}) has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${
        isWishlisted ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Link to="/products" className="flex items-center hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <OptimizedImage
                src={selectedImage}
                alt={product.name}
                className="w-full h-full"
                imageType="gallery"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  className={`relative aspect-square w-20 min-w-[5rem] rounded-md overflow-hidden ${
                    selectedImage === image.url ? "ring-2 ring-tile-blue" : ""
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <OptimizedImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full"
                    imageType="thumbnail"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.bestseller && (
              <Badge className="mb-3 bg-yellow-500 hover:bg-yellow-600">Bestseller</Badge>
            )}
            {product.featured && (
              <Badge className="mb-3 bg-tile-blue hover:bg-tile-navy">Featured</Badge>
            )}
            
            <h1 className="text-3xl font-serif font-medium mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.ratings) ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.ratings.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-semibold">
                ${selectedVariantDetails?.price.toFixed(2) || product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.shortDescription}</p>

            <div className="space-y-6">
              {/* Variant Selection */}
              {product.variants.length > 0 && (
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Variant
                  </label>
                  <Select
                    value={selectedVariant}
                    onValueChange={setSelectedVariant}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id} disabled={!variant.inStock}>
                          {variant.name} - {variant.size}
                          {!variant.inStock && " (Out of Stock)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <div className="w-12 text-center">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                  disabled={!selectedVariantDetails?.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {selectedVariantDetails?.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                  className={isWishlisted ? "bg-rose-50" : ""}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="mt-8 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">SKU</div>
                <div>{selectedVariantDetails?.sku || "N/A"}</div>
                
                <div className="text-muted-foreground">Category</div>
                <div>{product.category}</div>
                
                <div className="text-muted-foreground">Material</div>
                <div>{product.material}</div>
                
                <div className="text-muted-foreground">Style</div>
                <div>{product.style}</div>
                
                <div className="text-muted-foreground">Dimensions</div>
                <div>{selectedVariantDetails?.size || product.dimensions}</div>
                
                <div className="text-muted-foreground">Coverage</div>
                <div>{product.coverage}</div>
              </div>

              {/* Benefits */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-tile-blue mr-2" />
                  <span className="text-sm">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-tile-blue mr-2" />
                  <span className="text-sm">Expert installation guides included</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-tile-blue mr-2" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none px-0 mb-4">
              <TabsTrigger value="description" className="text-base">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="text-base">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">
                Reviews ({product.reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Specifications</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 py-1 border-b">
                      <span className="font-medium">Material</span>
                      <span>{product.material}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1 border-b">
                      <span className="font-medium">Dimensions</span>
                      <span>{product.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1 border-b">
                      <span className="font-medium">Coverage</span>
                      <span>{product.coverage}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1 border-b">
                      <span className="font-medium">Style</span>
                      <span>{product.style}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1 border-b">
                      <span className="font-medium">Colors</span>
                      <span>{product.colors.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Care Instructions</h3>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    <li>Clean with a pH-neutral cleaner specifically designed for natural stone or ceramic</li>
                    <li>Avoid acidic or abrasive cleaners that can damage the surface</li>
                    <li>Seal natural stone tiles regularly to maintain their appearance and durability</li>
                    <li>Wipe spills promptly to prevent staining</li>
                    <li>Use felt pads under furniture to prevent scratches</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-8">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-6">You might also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
