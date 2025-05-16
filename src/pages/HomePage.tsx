
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getBestsellerProducts } from "@/data/products";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts().slice(0, 3));
    setBestsellerProducts(getBestsellerProducts().slice(0, 4));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705"
            alt="Italian tiles in a modern home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4">
              Transform Your Space with Italian Elegance
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Experience the timeless beauty and unmatched quality of authentic Italian tiles, 
              handcrafted by artisans using centuries-old traditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-tile-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Floor Tiles",
                image: "https://images.unsplash.com/photo-1600607687126-8a3414349a51",
                link: "/products?category=Floor%20Tile"
              },
              {
                title: "Wall Tiles",
                image: "https://images.unsplash.com/photo-1620641622252-68be046b9c71",
                link: "/products?category=Wall%20Tile"
              },
              {
                title: "Mosaic Tiles",
                image: "https://images.unsplash.com/photo-1614617810804-52270c2e52db",
                link: "/products?category=Mosaic"
              },
              {
                title: "Marble Tiles",
                image: "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9",
                link: "/products?category=Marble%20Tile"
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-medium">{category.title}</h3>
                  <p className="flex items-center mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-tile-blue hover:text-tile-navy flex items-center transition-colors"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* USP Banner */}
      <section className="py-16 bg-tile-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 22a18.07 18.07 0 0 1-7-1.5c-2-.8-3-1.8-3-2.5V5a1 1 0 0 1 .4-.8A16.9 16.9 0 0 1 12 2c3.5 0 6 .7 8.6 2.2A1 1 0 0 1 22 5v13c0 .7-1 1.7-3 2.5a18.07 18.07 0 0 1-7 1.5Z"></path>
                  <path d="M10 22V5"></path>
                  <path d="M14 5h-4"></path>
                  <path d="M14 9h-4"></path>
                  <path d="M14 13h-4"></path>
                  <path d="M14 17h-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Authentic Italian Quality</h3>
              <p className="text-white/80">
                Every tile is sourced directly from Italy's finest manufacturers with centuries of tradition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M6.5 17h11"></path>
                  <path d="M6 11.5h12"></path>
                  <path d="M6.5 6h11"></path>
                  <circle cx="4" cy="17" r="1"></circle>
                  <circle cx="4" cy="6" r="1"></circle>
                  <circle cx="20" cy="12" r="1"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Expert Curation</h3>
              <p className="text-white/80">
                Our team of specialists selects only the finest tiles that meet our rigorous quality standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="m2 9 3-3h14l3 3"></path>
                  <path d="M2 12h20"></path>
                  <path d="m2 15 3 3h14l3-3"></path>
                  <path d="M6 12v3"></path>
                  <path d="M18 12v3"></path>
                  <path d="M12 12v9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Worldwide Shipping</h3>
              <p className="text-white/80">
                We carefully package and deliver our premium tiles to customers worldwide with expert handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif">Best Sellers</h2>
            <Link 
              to="/products?sort=bestselling" 
              className="text-tile-blue hover:text-tile-navy flex items-center transition-colors"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-tile-sand relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Ready to Transform Your Space?</h2>
            <p className="text-lg mb-8 text-gray-700">
              Our design consultants are ready to help you select the perfect tiles for your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Contact Our Design Team
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products">Browse Our Collection</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-tile-terracotta/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-tile-blue/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </section>
    </div>
  );
};

export default HomePage;
