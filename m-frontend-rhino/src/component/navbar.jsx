import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 border-b border-slate-700 shadow-sm z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="Rhino Vision" className="w-20 object-contain" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute hidden transform -translate-x-1/2 md:flex left-1/2">
            <div className="flex space-x-4 bg-white/0 rounded">

              <Link to="/" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/features" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/pricing" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/demo" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/about" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/career" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Careers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/contact" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link to="/privacy" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              {/* ⭐️ NEW MENU ITEM — Documentation */}
              <Link to="/usecases" className="relative px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-blue-400 group whitespace-nowrap">
                Documentation
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </Link>

            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 text-slate-200 transition-colors duration-200 rounded-md hover:text-blue-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 border-t border-slate-700 sm:px-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Home</Link>
              <Link to="/features" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Features</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Pricing</Link>
              <Link to="/demo" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Demo</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">About</Link>
              <Link to="/career" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Careers</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Contact</Link>
              <Link to="/privacy" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Privacy</Link>

              {/* ⭐️ NEW MOBILE ITEM — Documentation */}
              <Link to="/usecases" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">
                Documentation
              </Link>

              <div className="pt-4 pb-3 space-y-2 border-t border-gray-100">
                <a href="#login" className="block px-3 py-3 text-base font-medium text-gray-700 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600">Sign In</a>
                <a href="#demo" className="block px-3 py-3 mt-2 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">Get Demo</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
