import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { FaInstagram, FaTwitch, FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-midnight-blue/80 backdrop-blur-md border-t border-gray-700/50 py-4 mt-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Made with love */}
          <div className="text-center mb-4">
            <p className="text-gray-300 text-base">
              Made by <span className="text-electric-blue font-medium">Azan</span>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {/* Helping students with university admissions */}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-5 mb-4">
            <a 
              href="https://github.com/azannw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.instagram.com/csconnectpk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/azanw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            {/* <a 
              href="mailto:csconnectpakistan@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="Email"
              title="Email"
            >
              <Mail size={18} />
            </a> */}
            <a 
              href="https://chat.whatsapp.com/Lu0oFatcabjEJWBSVRbEIN?mode=r_t" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 pt-4 w-full max-w-md mx-auto">
          <p className="text-gray-500 text-[0.9375rem] text-center">
            © {currentYear} UniCalc. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center mt-1">
            {/* Designed and developed by Azan */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
