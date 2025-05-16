
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-tile-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl mb-4">ToscanaTiles</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Bringing the beauty and craftsmanship of Italian tiles directly to your home. 
              Premium quality tiles sourced from the finest Italian manufacturers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-tile-terracotta transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-tile-terracotta transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-tile-terracotta transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="font-medium text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/warranty" className="hover:text-white transition-colors">Warranty</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 min-w-[18px] text-tile-terracotta" />
                <span>123 Tile Street, Florence, Italy 50123</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-tile-terracotta min-w-[18px]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-tile-terracotta min-w-[18px]" />
                <span>info@toscanatiles.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} ToscanaTiles. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed with <span className="text-tile-terracotta">♥</span> for quality Italian tiles
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
