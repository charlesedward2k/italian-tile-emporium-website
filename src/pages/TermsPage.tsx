
import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
          <h1 className="text-3xl md:text-4xl font-serif">Terms & Conditions</h1>
          <p className="text-muted-foreground mt-4">
            Last updated: May 21, 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Bengy Home Decor website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the website or purchase products from us.
          </p>

          <h2>Products and Pricing</h2>
          <p>
            All products displayed on our website are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
          </p>
          
          <p>
            All prices are displayed in USD unless otherwise noted. While we strive to ensure all pricing information is correct, we reserve the right to correct any errors.
          </p>

          <h2>Order Acceptance and Confirmation</h2>
          <p>
            Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to limit quantities, reject or cancel orders at any time before shipment.
          </p>

          <h2>Payment Terms</h2>
          <p>
            We accept various payment methods as indicated during the checkout process. By placing an order, you represent that you are authorized to use the designated payment method.
          </p>
          
          <p>
            For commercial orders, we may offer terms to qualified businesses. A 50% deposit may be required for large or custom orders.
          </p>

          <h2>Shipping and Delivery</h2>
          <p>
            Shipping and delivery dates are estimates only. We are not liable for any delays in shipments. Risk of loss and title transfer to you upon delivery of the products to the carrier.
          </p>

          <h2>Returns and Exchanges</h2>
          <p>
            Please refer to our Shipping & Returns Policy for detailed information about our return process. All returns must be approved by our customer service department and are subject to a restocking fee.
          </p>

          <h2>Product Descriptions and Images</h2>
          <p>
            We attempt to describe products as accurately as possible. However, we do not warrant that product descriptions or other content on the website are accurate, complete, reliable, current, or error-free.
          </p>
          
          <p>
            Due to the natural variation in materials and the limitations of digital displays, actual colors may vary from those shown on your screen. Samples are recommended before making large purchases.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on the Bengy Home Decor website, including text, graphics, logos, images, and software, is the property of Bengy Home Decor or its content suppliers and is protected by international copyright laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Bengy Home Decor will not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the website or products.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Ghana, without giving effect to any principles of conflicts of law.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website following the posting of revised Terms means that you accept the changes.
          </p>

          <h2>Contact Information</h2>
          <p>
            Questions about the Terms should be sent to us at legal@bengyhome.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
