
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchBar from "./SearchBar";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Listen for cart updates
  useEffect(() => {
    const updateCartBadge = () => {
      // Get cart data from localStorage or state management
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        try {
          const cart = JSON.parse(cartData);
          const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
          setCartItemCount(itemCount);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setCartItemCount(0);
        }
      } else {
        setCartItemCount(0);
      }
    };

    // Initial update
    updateCartBadge();

    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartBadge);

    return () => {
      window.removeEventListener('cartUpdated', updateCartBadge);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-medium text-tile-navy">
              Bengy<span className="text-tile-terracotta">Home Decor</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-tile-blue",
                  isActive(item.path)
                    ? "text-tile-blue"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="relative"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-tile-terracotta text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <AccountMenu />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar (Conditional) */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <SearchBar onClose={toggleSearch} />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && isMobile && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "block py-3 text-base font-medium transition-colors hover:text-tile-blue",
                    isActive(item.path)
                      ? "text-tile-blue"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
