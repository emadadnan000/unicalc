import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = React.useRef<HTMLElement>(null);
  const isHomePage = location.pathname === '/';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleTouchOutside = (event: TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHomePage || isScrolled || mobileMenuOpen ? 'bg-midnight-blue bg-opacity-80 backdrop-blur shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Calculator className="w-8 h-8 text-electric-blue" />
            </motion.div>
            <span className="text-xl font-bold text-white">UniCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <a 
              // href="https://chat.whatsapp.com/your-group-link" 
              // target="_blank" 
              // rel="noopener noreferrer" 
              // className="px-4 py-2 bg-electric-blue text-deep-space rounded-full hover:bg-soft-cyan transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              {/* <MessageCircle className="w-4 h-4 mr-2" /> */}
              {/* Join Group */}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-50">
            <button 
              className="text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} className="relative z-50" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <motion.nav 
            className="md:hidden py-4 fixed top-16 left-0 right-0 bg-midnight-blue shadow-lg z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="nav-link py-3 px-4 hover:bg-blue-900/30 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="nav-link py-3 px-4 hover:bg-blue-900/30 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <a 
                href="https://chat.whatsapp.com/FAr6YQiz3TqAcWgtdqtd7j" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link py-3 px-4 hover:bg-blue-900/30 rounded-lg transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaWhatsapp className="w-5 h-5 mr-3" />
                Join WhatsApp Group
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </header>
  );
};

export default Header;
