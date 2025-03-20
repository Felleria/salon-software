// Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-purple-600 text-2xl font-bold">Salon</span>
              <span className="text-gray-700 text-2xl font-light">Manager</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname === '/' ? 'border-purple-500' : 'border-transparent'} ${isActive('/')}`}>
                Dashboard
              </Link>
              <Link to="/clients" className={`inline-flex items-center px-1 pt-1 border-b-2 ${location.pathname.includes('/clients') ? 'border-purple-500' : 'border-transparent'} ${isActive('/clients')}`}>
                Clients
              </Link>
            </div>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <Link to="/clients/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
              Add New Client
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${location.pathname === '/' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/clients" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${location.pathname.includes('/clients') ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clients
            </Link>
            <Link 
              to="/clients/new" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add New Client
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;