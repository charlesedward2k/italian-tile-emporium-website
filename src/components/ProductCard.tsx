
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useToast } from "@/components/ui/use-toast";
import OptimizedImage from "@/components/OptimizedImage";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { useCurrency } from "@/hooks/use-currency";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { addItem } = useShoppingCart();
  const { convertPrice, formatPrice } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add the item to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0].url,
      variant: product.variants[0]?.name || "Default"
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  // Convert product prices to the selected currency
  const displayPrice = convertPrice(product.price);
  const displayCompareAtPrice = product.compareAtPrice ? convertPrice(product.compareAtPrice) : null;

  return (
    <Link to={`/products/${product.slug}`}>
      <Card 
        className="overflow-hidden h-full transition-all hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square bg-muted">
          <OptimizedImage
            src={product.images[0].url}
            alt={product.images[0].alt}
            className="w-full h-full"
            imageType="thumbnail"
            objectFit="cover"
            priority={false}
          />
          
          {/* Sale or featured badge */}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <Badge className="absolute top-3 left-3 bg-tile-terracotta hover:bg-tile-terracotta">
              SALE
            </Badge>
          )}
          
          {product.featured && !product.compareAtPrice && (
            <Badge className="absolute top-3 left-3 bg-tile-blue hover:bg-tile-blue">
              FEATURED
            </Badge>
          )}
          
          {/* Quick action buttons - visible on hover */}
          <div 
            className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-3 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button 
              size="sm" 
              variant="secondary" 
              className="rounded-full" 
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            
            <Button 
              size="icon" 
              variant="outline" 
              className={`rounded-full ${
                isWishlisted ? "bg-tile-terracotta text-white border-tile-terracotta" : "bg-white/80"
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold">{formatPrice(displayPrice)}</span>
              {displayCompareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(displayCompareAtPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center pt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.ratings) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews.length})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
