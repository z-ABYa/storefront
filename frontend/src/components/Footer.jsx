import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Storefront</h3>
              <p className="text-sm mb-6">
                Your premium destination for quality products and exceptional shopping experience.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-sm font-semibold">
                  f
                </a>
                <a href="#" className="text-sm font-semibold">
                  𝕏
                </a>
                <a href="#" className="text-sm font-semibold">
                  IG
                </a>
                <a href="#" className="text-sm font-semibold">
                  in
                </a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover-underline-animation">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover-underline-animation">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover-underline-animation">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover-underline-animation">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-underline-animation">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-underline-animation">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-underline-animation">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:support@storefront.com" className="hover:text-blue-400 transition-colors">
                    support@storefront.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1" />
                  <span>123 Shopping Street<br />Commerce City, CC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Storefront. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
