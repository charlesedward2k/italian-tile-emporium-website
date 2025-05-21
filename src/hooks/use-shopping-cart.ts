
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export function useShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart on initial mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(items));
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }, [items, isLoading]);

  // Add item to cart
  const addItem = (item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => 
        i.id === item.id && (i.variant === item.variant)
      );
      
      if (existingItem) {
        return currentItems.map(i => 
          i.id === item.id && (i.variant === item.variant) 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...currentItems, item];
      }
    });
  };

  // Update item quantity
  const updateItemQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(id, variant);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => {
        if (item.id === id && item.variant === variant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id: string, variant?: string) => {
    setItems(currentItems => 
      currentItems.filter(item => 
        !(item.id === id && item.variant === variant)
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
  };

  // Get cart totals
  const getCartTotals = () => {
    return {
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    };
  };

  return {
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    getCartTotals,
    isLoading
  };
}

export default useShoppingCart;
