import { Beaker, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-bold">RHINO VISION</span>
            </div>
            <p className="max-w-md mt-4 text-gray-400">
              An intelligent evaluation platform that bridges the gap between surgical expertise and objective outcome assessment in rhinoplasty
            </p>
            <div className="flex mt-6 space-x-4">
              <Twitter className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
              <Linkedin className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
              <Github className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2">

              <li><Link to="/features" className="text-gray-300 hover:text-white">Features</Link></li>
              <li><Link to="/usecases" className="text-gray-300 hover:text-white">Documentation</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link to="/demo" className="text-gray-300 hover:text-white">Demo</Link></li>

            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">

              <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/career" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link></li>

            </ul>
          </div>

        </div>

        <div className="pt-8 mt-12 text-center text-gray-400 border-t border-gray-800">
          <p>&copy; 2024 Rhino AI Nose. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
