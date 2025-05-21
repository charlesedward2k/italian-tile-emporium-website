
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { useCurrency } from "@/hooks/use-currency";

const CartPage = () => {
  const { items: cartItems, updateItemQuantity, removeItem, clearCart, getCartTotals } = useShoppingCart();
  const { formatPrice, currency } = useCurrency();
  const { toast } = useToast();

  const handleRemoveItem = (id: string, variant?: string) => {
    removeItem(id, variant);
    
    toast({
      description: "Item removed from cart"
    });
  };

  const handleClearCart = () => {
    clearCart();
    
    toast({
      description: "Cart has been cleared"
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity < 1) return;
    updateItemQuantity(id, quantity, variant);
  };
  
  const { subtotal } = getCartTotals();
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-medium">Shopping Cart</span>
          </div>
          <h1 className="text-3xl font-serif">Your Shopping Cart</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <Link to="/products" className="text-sm flex items-center text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-sm text-muted-foreground"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Clear Cart
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted px-4 py-3 hidden md:grid md:grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4">
                  <div></div>
                  <div className="text-sm font-medium">Product</div>
                  <div className="text-sm font-medium text-center">Price</div>
                  <div className="text-sm font-medium text-center">Quantity</div>
                  <div className="text-sm font-medium text-center">Subtotal</div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.variant || ''}`}
                      className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 p-4 items-center"
                    >
                      {/* Image */}
                      <div className="flex justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>

                      {/* Product Details */}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Variant: {item.variant || 'Default'}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.variant)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center mt-2 md:hidden"
                        >
                          <Trash2 className="h-3 w-3 mr-1" /> Remove
                        </button>
                      </div>

                      {/* Price */}
                      <div className="md:text-center">
                        <p className="md:hidden text-sm text-muted-foreground">
                          Price:
                        </p>
                        <p>{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center md:justify-center">
                        <p className="md:hidden text-sm text-muted-foreground mr-2">
                          Quantity:
                        </p>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.variant)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1,
                                item.variant
                              )
                            }
                            className="w-12 h-8 text-center mx-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.variant)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal + Actions */}
                      <div className="flex items-center justify-between md:justify-center">
                        <p className="md:hidden text-sm text-muted-foreground mr-2">
                          Subtotal:
                        </p>
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.variant)}
                          className="text-red-500 hover:text-red-700 ml-4 hidden md:block"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-muted p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <Button className="w-full">
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Taxes calculated at checkout
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Have a coupon?</h3>
                  <div className="flex">
                    <Input
                      placeholder="Enter coupon code"
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      Apply
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Shipping Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $100. Standard shipping takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-muted mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-muted-foreground"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Looks like you haven't added any items to your cart yet.
              Browse our collection to find the perfect products for your home.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
