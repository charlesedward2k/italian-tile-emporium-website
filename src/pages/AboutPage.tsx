
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <h1 className="text-4xl font-serif mb-4">About Bengy Home Decor</h1>
          <p className="text-muted-foreground max-w-2xl">
            A family business dedicated to bringing quality home décor and tile products to homes across Ghana.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Placeholder */}
          <div className="w-full md:w-1/2 h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-medium mb-2">Our Showroom in Kumasi</h3>
              <p className="text-muted-foreground text-sm">Image placeholder</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-serif">Our Story</h2>
            <p className="text-muted-foreground">
              Bengy Home Decor began as a vision to provide Ghanaian homeowners with quality tiles and home décor products. Founded on principles of excellent craftsmanship and customer service, we have grown into a trusted name in the Kumasi area, offering a carefully curated selection of beautiful and durable products to transform any space.
            </p>
            <p className="text-muted-foreground">
              Our journey reflects our commitment to bringing the best home décor solutions to our customers, while maintaining the attention to detail and quality service that have defined us from the beginning. We take pride in helping our customers create spaces that reflect their personal style and meet their practical needs.
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
              To provide high-quality home décor products and exceptional customer service, 
              helping our clients create beautiful, functional, and lasting spaces.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We carefully select products that meet our high standards for durability, design, and value.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Service</h3>
                <p className="text-muted-foreground">
                  We offer personalized guidance to help customers find the perfect products for their projects.
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2">Reliability</h3>
                <p className="text-muted-foreground">
                  We stand behind our products and are committed to customer satisfaction at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Bengy Difference */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-serif">The Bengy Difference</h2>
            <p className="text-muted-foreground">
              What makes Bengy Home Decor unique is our personalized approach to home improvement. We take the time to understand your vision and requirements, offering expert advice to help you make the right choices for your space and budget.
            </p>
            <p className="text-muted-foreground">
              Our showroom in Kumasi features a wide selection of quality products that we've carefully sourced. We prioritize both aesthetics and functionality, ensuring that your home not only looks beautiful but works well for your lifestyle.
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
              <h3 className="text-xl font-medium mb-2">Our Products</h3>
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
              { name: "Benjamin Oduro", role: "Founder & CEO" },
              { name: "Grace Oduro", role: "Operations Manager" },
              { name: "Kwame Mensah", role: "Sales Manager" },
              { name: "Abena Osei", role: "Design Consultant" }
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
        <h2 className="text-3xl font-serif mb-6">Transform Your Space with Bengy Home Decor</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Visit our showroom in Kumasi or browse our collections online to discover how our products can enhance your home.
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
