
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "FAQ" }]} />
          <h1 className="text-3xl md:text-4xl font-serif">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Find answers to the most common questions about our products, ordering process, and services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes our products different from others?</AccordionTrigger>
            <AccordionContent>
              Our products are carefully selected for quality, design, and value. We source directly from trusted manufacturers and artisans, ensuring that every item meets our strict quality standards. Many of our products are exclusive designs that you won't find elsewhere.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How do I calculate how many tiles I need?</AccordionTrigger>
            <AccordionContent>
              To calculate the number of tiles needed, measure the area to be tiled in square feet or square meters. Add 10-15% extra to account for cuts, breakage, and future repairs. Our team is happy to help you calculate the exact amount needed for your project - just contact us with your room dimensions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Do you provide installation services?</AccordionTrigger>
            <AccordionContent>
              While we don't offer direct installation services, we work with a network of skilled installers and can provide recommendations for professionals in the Kumasi area who specialize in installing our products. We also provide detailed installation guidelines with every purchase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What's your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns of unused, unopened products within 30 days of delivery. Custom orders and cut materials cannot be returned. A 15% restocking fee may apply to large orders. Please see our detailed Shipping & Returns page for complete information.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How should I care for my products?</AccordionTrigger>
            <AccordionContent>
              Each type of product requires specific care. Generally, clean with pH-neutral cleaners and avoid abrasive tools or acidic cleaning products. Seal natural stone tiles periodically as recommended. We provide detailed care instructions with every purchase, tailored to your specific selection.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Do you ship to other regions in Ghana?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship to all regions throughout Ghana. Shipping costs and delivery times vary by location. For large orders, we can arrange special delivery services. Contact us for a shipping quote to your specific location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Can I order samples before purchasing?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer sample tiles for most of our products. Samples allow you to see the true color, texture, and quality of our tiles before making a larger purchase. Visit our store in Kumasi or contact our customer service team to request samples.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>What if my order arrives damaged?</AccordionTrigger>
            <AccordionContent>
              In the rare event that products arrive damaged, please contact us within 48 hours of delivery with photos of the damaged items and packaging. We'll arrange a replacement shipment as quickly as possible at no additional cost to you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>Do you offer design consultation?</AccordionTrigger>
            <AccordionContent>
              Yes, our experienced design consultants are available to help you select the perfect products for your project. We offer both in-showroom and virtual consultations. Please contact us to schedule an appointment.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major payment methods including cash, mobile money transfers (MTN MoMo, Vodafone Cash, AirtelTigo Money), bank transfers, and credit cards. For commercial orders, we also offer payment terms to qualified businesses. Contact our sales team for more information about payment options.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
