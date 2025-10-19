import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { NAVIGATION } from '../../utils/constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto pl-4 pr-0 sm:pl-6 sm:pr-0 lg:pl-8 lg:pr-0">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="/readyai-logo.jpg"
              alt="ReadyAI" 
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div key={item.name} className="relative group">
                <Link 
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                      ? 'text-accent'
                      : 'text-primary hover:text-accent'
                  }`}
                >
                  <div className="flex items-center">
                    <span>{item.name}</span>
                    {item.submenu && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left shadow-lg rounded-md bg-white z-10">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-primary hover:bg-accent/10 hover:text-accent"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 -mr-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Search"
              />
            </form>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Contact
            </Link>
            <a
              href="https://devs.ai/signup?ref=sales%40readyai.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Explore Platform
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-primary hover:text-accent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            {NAVIGATION.map((item) => (
              <div key={item.name}>
                <div 
                  className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-primary hover:text-accent hover:bg-gray-50"
                  onClick={() => item.submenu && toggleSubmenu(item.name)}
                >
                  <Link to={item.path}>{item.name}</Link>
                  {item.submenu && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeSubmenu === item.name ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-accent hover:bg-gray-50"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-3 py-2">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="px-3 py-2 space-y-2">
              <Link
                to="/contact"
                className="block text-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
              >
                Contact
              </Link>
              <a
                href="https://devs.ai/signup?ref=sales%40readyai.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark"
              >
                Explore Platform
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;