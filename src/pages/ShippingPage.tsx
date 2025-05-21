
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

const ShippingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Shipping & Returns" }]} />
          <h1 className="text-3xl md:text-4xl font-serif">Shipping & Returns</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose max-w-none">
          <h2>Shipping Policy</h2>
          <p>
            At Bengy Home Decor, we understand the importance of receiving your premium products in perfect condition. We take great care in packaging and shipping your orders to ensure they arrive safely and on time.
          </p>

          <h3>Domestic Shipping</h3>
          <ul>
            <li>Orders are processed within 1-2 business days.</li>
            <li>Standard shipping (3-5 business days within Kumasi): Free for orders over GHS 1000</li>
            <li>Express shipping (1-2 business days within Kumasi): Available at checkout</li>
            <li>Regional shipping (5-10 business days to other regions in Ghana): Rates calculated at checkout</li>
          </ul>

          <h3>International Shipping</h3>
          <p>
            We offer shipping to select West African countries. International shipping rates vary depending on destination, weight, and dimensions. Customs duties and taxes may apply and are the responsibility of the recipient.
          </p>

          <h2>Returns and Exchanges</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, we're here to help.
          </p>

          <h3>Return Policy</h3>
          <ul>
            <li>Returns accepted within 30 days of delivery for unused, unopened products.</li>
            <li>Custom orders cannot be returned.</li>
            <li>A 15% restocking fee may apply to large orders.</li>
            <li>Return shipping costs are the responsibility of the customer unless the return is due to our error.</li>
          </ul>

          <h3>Damaged Items</h3>
          <p>
            In the rare event that items arrive damaged, please contact us within 48 hours of delivery with photos of the damaged items and packaging. We'll arrange a replacement shipment as quickly as possible.
          </p>

          <h2>Contact Our Shipping Department</h2>
          <p>
            For any questions or concerns about shipping or returns, please contact our customer service team at <a href="mailto:shipping@bengyhome.com">shipping@bengyhome.com</a> or call us at +233 54 832 8195.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t">
          <a href="/contact" className="text-tile-blue hover:underline">
            Contact us with any questions
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
