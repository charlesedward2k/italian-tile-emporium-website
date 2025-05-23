
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import ProductDetailPage from './ProductDetailPage';
import CartPage from './CartPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import CollectionsPage from './CollectionsPage';
import NotFoundPage from './NotFoundPage';
import AuthPage from './AuthPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsPage from './TermsPage';
import ShippingPage from './ShippingPage';
import WarrantyPage from './WarrantyPage';
import FAQPage from './FAQPage';
import AdminPanel from './AdminPanel';
import ProductManagementPage from './ProductManagementPage';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="warranty" element={<WarrantyPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="product-management" element={<ProductManagementPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Index;
