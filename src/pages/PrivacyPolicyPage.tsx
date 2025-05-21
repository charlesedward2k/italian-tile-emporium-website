
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="text-3xl md:text-4xl font-serif">Privacy Policy</h1>
          <p className="text-muted-foreground mt-4">
            Last updated: May 21, 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose max-w-none">
          <p>
            Bengy Home Decor ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Bengy Home Decor.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information about you:</p>

          <h3>Personal Information</h3>
          <p>
            When you make a purchase, create an account, sign up for our newsletter, or contact us, we may collect personal information such as your name, email address, postal address, phone number, and payment information.
          </p>

          <h3>Order Information</h3>
          <p>
            When you place an order, we collect information about the products you purchase, shipping details, and payment information.
          </p>

          <h3>Usage Information</h3>
          <p>
            We automatically collect certain information about how you access and use our website, including your IP address, device information, browser type, pages viewed, and clicking patterns.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We may use your personal information for various purposes, including:</p>
          <ul>
            <li>Processing and fulfilling your orders</li>
            <li>Managing your account</li>
            <li>Sending transactional emails</li>
            <li>Providing customer support</li>
            <li>Sending marketing communications (if you've opted in)</li>
            <li>Improving our website and services</li>
            <li>Detecting and preventing fraud</li>
          </ul>

          <h2>How We Share Your Information</h2>
          <p>
            We may share your personal information with third-party service providers who perform services on our behalf, such as payment processing, order fulfillment, and email delivery. We may also share information as required by law or to protect our rights.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can opt out of receiving marketing emails by following the unsubscribe instructions in any marketing email we send. You can also contact us to update or correct your personal information.
          </p>

          <h2>Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or destruction.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@bengyhome.com<br />
            Phone: +233 54 832 8195<br />
            Address: Patasi, Santasi Road (West End Hospital By-Pass No. 88), opposite KSTS, Kumasi, Ashanti Region, Ghana
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
