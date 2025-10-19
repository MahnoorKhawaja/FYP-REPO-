import { useState } from 'react';
import { Menu, X, Beaker } from 'lucide-react';
import Logo from '../assets/Logo.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm z-1000">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <span className="ml-2 ">
              <img src={Logo} alt="" className='w-20 object-contain' />
              </span>
            </div>
          </div>

          {/* Centered Navigation Links */}
          <div className="absolute hidden transform -translate-x-1/2 md:flex left-1/2">
            <div className="flex">
              <a
                href="#features"
                className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 group"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#solutions"
                className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 group"
              >
                Solutions
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#research"
                className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 group"
              >
                Research
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* CTA Buttons - Right Side */}
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
                className="inline-flex items-center justify-center p-2 text-gray-600 transition-colors duration-200 rounded-md hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 sm:px-3">
              <a
                href="#features"
                className="block px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#solutions"
                className="block px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#research"
                className="block px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Research
              </a>
              <div className="pt-4 pb-3 space-y-2 border-t border-gray-100">
                <a
                  href="#login"
                  className="block px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-200 border-l-4 border-transparent rounded-lg hover:text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="#demo"
                  className="block px-3 py-3 mt-2 text-base font-medium text-center text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Get Demo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
};

export default Navbar;
