import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Practice', path: '/practice' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Friends', path: '/friends' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-[#58deff] text-3xl font-bold tracking-tighter hover:scale-105 transition-transform flex items-center gap-2">
              <Rocket className="w-8 h-8" />
              TypeVerse
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="group relative px-3 py-2 text-gray-300 hover:text-[#58deff] transition-colors duration-300 text-lg font-medium"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#58deff] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="flex items-center gap-2 bg-transparent border-2 border-[#58deff] text-[#58deff] font-semibold px-6 py-2 rounded-full hover:bg-[#58deff] hover:text-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#58deff]/50">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-[#58deff] transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-lg shadow-lg shadow-black/20 mb-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block px-3 py-2 text-gray-300 hover:text-[#58deff] hover:bg-gray-800/50 rounded-md transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            {/* Auth Buttons - Mobile */}
            <SignedOut>
              <SignInButton>
                <button className="w-full mt-2 flex items-center justify-center gap-2 bg-transparent border-2 border-[#58deff] text-[#58deff] font-semibold px-6 py-2 rounded-full hover:bg-[#58deff] hover:text-black transform hover:scale-105 transition-all duration-300">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center mt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
