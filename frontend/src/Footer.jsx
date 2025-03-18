import React from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
  const navItems = ['Home', 'Practice', 'Challenges', 'Friends'];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-[#58deff]" />
              <h3 className="text-2xl font-bold text-[#58deff]">TypeVerse</h3>
            </a>
            <p className="text-sm">
              Embark on a cosmic typing adventure. Improve your skills, compete with friends, and conquer the galaxy one keystroke at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#58deff] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#58deff] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-[#58deff] mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@typeverse.com" className="text-gray-300 hover:text-[#58deff] transition-colors duration-200">
                  support@typeverse.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#58deff] transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#58deff] transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#58deff] transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} TypeVerse. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-[#58deff] transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#58deff] transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11.3 11.3 0 015.9 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.6 5.4-5.1 5.7.4.3.8 1 .8 2v2.6c0 .3.2.7.8.6A12 12 0 0012 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
