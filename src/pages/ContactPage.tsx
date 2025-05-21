
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Map, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="font-medium">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif">Contact Us</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            We'd love to hear from you. Visit our showroom or reach out with any questions about our products and services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Map className="h-5 w-5 mt-1 text-tile-blue mr-4" />
                <div>
                  <h3 className="font-medium">Visit Our Showroom</h3>
                  <p className="text-muted-foreground mt-1">
                    Patasi, Santasi Road (West End Hospital By-Pass No. 88),<br />
                    opposite KSTS, Kumasi, Ashanti Region, Ghana
                  </p>
                  <p className="text-muted-foreground mt-1">
                    <strong>Hours:</strong> Monday-Friday: 9am-6pm, Saturday: 10am-4pm
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mt-1 text-tile-blue mr-4" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground mt-1">
                    <a href="tel:+233548328195" className="hover:text-tile-blue">
                      +233 54 832 8195
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mt-1 text-tile-blue mr-4" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground mt-1">
                    <a href="mailto:info@bengyhome.com" className="hover:text-tile-blue">
                      info@bengyhome.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Google Maps */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Find Us</h3>
              <div className="aspect-video w-full h-[300px] bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.6553404829527!2d-1.6463388242022046!3d6.6869313221242905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb906b32b29f11%3A0x5c315d039d989fb0!2sKumasi%20Senior%20Technical%20School!5e0!3m2!1sen!2sus!4v1716156897760!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bengy Home Decor Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone (optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
