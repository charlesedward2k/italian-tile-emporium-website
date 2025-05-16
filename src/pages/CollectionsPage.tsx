
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "rustic",
    title: "Rustic Terracotta",
    description: "Authentic hand-crafted terracotta tiles from Tuscany, perfect for creating warm, inviting spaces with a touch of Italian countryside charm.",
    image: "/images/collections/rustic.jpg",
    featuredProducts: ["handmade-terracotta", "antique-terracotta", "classic-rustic"],
  },
  {
    id: "modern",
    title: "Modern Minimalist",
    description: "Clean lines and contemporary designs for the modern home. These tiles blend Italian craftsmanship with sleek, minimalist aesthetics.",
    image: "/images/collections/modern.jpg",
    featuredProducts: ["matte-white", "geometric-gray", "polished-slate"],
  },
  {
    id: "classic",
    title: "Classic Marble",
    description: "Timeless Italian marble tiles that bring elegance and luxury to any space. Sourced from historic quarries across Italy.",
    image: "/images/collections/marble.jpg",
    featuredProducts: ["carrara-white", "calacatta-gold", "nero-marquina"],
  },
  {
    id: "artistic",
    title: "Artistic Majolica",
    description: "Hand-painted majolica tiles featuring traditional Italian patterns and vibrant colors that tell a story in every piece.",
    image: "/images/collections/artistic.jpg",
    featuredProducts: ["blue-floral", "geometric-mediterranean", "sicilian-patterns"],
  },
  {
    id: "outdoor",
    title: "Outdoor Porcelain",
    description: "Durable, weather-resistant porcelain tiles designed for outdoor spaces, from patios to pool surrounds.",
    image: "/images/collections/outdoor.jpg",
    featuredProducts: ["frost-resistant", "non-slip-textured", "pool-surround"],
  },
];

const CollectionsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif mb-4">Our Tile Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of premium Italian tiles,
            each with its own story and character to transform your space.
          </p>
        </div>
      </div>

      {/* Collections */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-24">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Image Placeholder */}
              <div className="w-full md:w-1/2 h-80 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium mb-2">{collection.title}</h3>
                  <p className="text-muted-foreground text-sm">Image placeholder</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-serif">{collection.title}</h2>
                <p className="text-muted-foreground">{collection.description}</p>
                <div className="pt-4">
                  <Button asChild>
                    <Link to={`/products?category=${collection.id}`}>
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Tiles Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Artisan Craftsmanship</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="h-40 bg-tile-blue/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-tile-blue font-serif text-2xl">Hand-made</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Traditional Methods</h3>
              <p className="text-muted-foreground">
                Our tiles are created using time-honored Italian techniques passed down through generations of artisans.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="h-40 bg-tile-terracotta/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-tile-terracotta font-serif text-2xl">Premium Materials</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Finest Sourcing</h3>
              <p className="text-muted-foreground">
                We source only the highest quality materials from select quarries and clay deposits throughout Italy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="h-40 bg-tile-navy/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-tile-navy font-serif text-2xl">Sustainable</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Eco-conscious</h3>
              <p className="text-muted-foreground">
                Our production processes prioritize environmental responsibility and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
