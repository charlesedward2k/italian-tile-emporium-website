
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif mb-4">About ToscanaTiles</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A family business dedicated to bringing the finest Italian craftsmanship to homes around the world.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-medium mb-2">Our Workshop in Florence</h3>
              <p className="text-muted-foreground text-sm">Image placeholder</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-serif">Our Story</h2>
            <p className="text-muted-foreground">
              ToscanaTiles began in 1978 in a small workshop outside Florence, where the Bianchi family started creating handcrafted ceramic tiles using traditional methods passed down through generations. What began as a small family operation has grown into a respected name in Italian tile craftsmanship, while maintaining the attention to detail and quality that defined our earliest creations.
            </p>
            <p className="text-muted-foreground">
              For over four decades, we've combined time-honored techniques with innovative designs, creating tiles that bring the beauty and timeless elegance of Italian craftsmanship to homes worldwide. Each tile tells a story of dedication, passion, and the rich artistic heritage of Tuscany.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-tile-navy/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg">
              To preserve and share the rich tradition of Italian tile craftsmanship while 
              bringing sustainable, beautiful, and durable surfaces to homes around the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on materials or craftsmanship, ensuring each tile meets our exacting standards.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Tradition</h3>
                <p className="text-muted-foreground">
                  We honor time-tested Italian techniques while embracing modern innovation.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to responsible sourcing and eco-friendly production methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-serif">The Toscana Difference</h2>
            <p className="text-muted-foreground">
              What makes ToscanaTiles unique is our unwavering commitment to authenticity. We source our raw materials directly from the same quarries that have supplied Italian artisans for centuries. Our master craftspeople train for years to perfect their skills, ensuring each tile reflects the distinctive character of true Italian craftsmanship.
            </p>
            <p className="text-muted-foreground">
              Unlike mass-produced alternatives, our tiles feature subtle variations that tell the story of their handcrafted origins. These unique characteristics bring warmth and personality to any space, creating surfaces that are not just beautiful but truly one-of-a-kind.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/products">
                  Explore Our Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-medium mb-2">Our Artisans at Work</h3>
              <p className="text-muted-foreground text-sm">Image placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Marco Bianchi", role: "Founder & Master Artisan" },
              { name: "Lucia Bianchi", role: "Creative Director" },
              { name: "Antonio Romano", role: "Production Manager" },
              { name: "Sofia Esposito", role: "Design Consultant" }
            ].map((person, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Photo</span>
                </div>
                <h3 className="font-medium text-lg">{person.name}</h3>
                <p className="text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif mb-6">Experience the Beauty of Italian Craftsmanship</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Visit our showroom or browse our collections online to discover how our tiles can transform your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/products">
              Explore Products
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
