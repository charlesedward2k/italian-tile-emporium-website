
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    subject: z.string().min(1, { message: "Please select a subject." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
    agreement: z.boolean().refine(val => val === true, {
      message: "You must agree to our privacy policy.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agreement: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    
    toast({
      title: "Message sent successfully",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our Italian tiles or need design advice? 
            Our team of experts is here to help you select the perfect tiles for your project.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-4 p-3 rounded-full bg-tile-blue/10 w-fit">
              <MapPin className="h-6 w-6 text-tile-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Visit Our Showroom</h3>
            <address className="text-muted-foreground not-italic">
              123 Tile Street<br/>
              Florence, Italy 50123
            </address>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-4 p-3 rounded-full bg-tile-blue/10 w-fit">
              <Phone className="h-6 w-6 text-tile-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-muted-foreground">
              <a href="tel:+1-555-123-4567" className="hover:text-tile-blue">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Customer support available 24/7
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-4 p-3 rounded-full bg-tile-blue/10 w-fit">
              <Mail className="h-6 w-6 text-tile-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <p className="text-muted-foreground">
              <a href="mailto:info@toscanatiles.com" className="hover:text-tile-blue">
                info@toscanatiles.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We'll respond within 24 hours
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-4 p-3 rounded-full bg-tile-blue/10 w-fit">
              <Clock className="h-6 w-6 text-tile-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9am - 6pm<br/>
              Saturday: 10am - 4pm<br/>
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="sales">Sales & Pricing</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="design">Design Consultation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I agree to the{" "}
                          <a href="/privacy-policy" className="text-tile-blue hover:underline">
                            privacy policy
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Map placeholder - would be replaced with actual map implementation */}
          <div className="rounded-lg overflow-hidden h-[400px] lg:h-auto">
            <div className="bg-muted w-full h-full flex items-center justify-center">
              <div className="text-center px-6">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Visit Our Showroom</h3>
                <p className="text-muted-foreground">
                  123 Tile Street, Florence, Italy 50123
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  [Interactive map would be displayed here]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Do you offer installation services?</h3>
              <p className="text-muted-foreground">
                While we don't provide direct installation, we work with a network of trusted installers and can provide recommendations in your area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day return policy for unopened boxes. Custom orders and cut materials cannot be returned.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">How do I care for my tiles?</h3>
              <p className="text-muted-foreground">
                Each tile type has specific care instructions. We provide detailed maintenance guides with every purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Yes, we ship worldwide. International shipping costs and delivery times vary by location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
