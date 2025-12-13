import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import SignIn from "./SignIn";

const Dropdown = ({ label, items, isMobile, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e) => {
    if (onItemClick) onItemClick();
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <button 
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center text-2xl text-white py-2 px-4 hover:text-blue-500 transition-colors"
        >
          {label}
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {isOpen && (
          <div className="ml-4 mt-2 space-y-2">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                onClick={handleItemClick}
                className="block text-xl text-gray-300 hover:text-white py-1 px-4"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group" ref={dropdownRef}>
      <button 
        className="flex items-center text-gray-300 hover:text-white transition-colors py-2"
        onClick={toggleDropdown}
      >
        {label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-800 ring-1 ring-white ring-opacity-10">
          <div className="py-1">
            {items.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                onClick={handleItemClick}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    if (!mobileDrawerOpen) {
      setActiveDropdown(null);
    }
  };

  const closeMobileMenu = () => {
    setMobileDrawerOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-2.5 backdrop-blur-lg border-b border-neutral-700/80 bg-neutral-900/95">
      <div className="max-w-7xl px-6 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight text-white">FermetrixLab</span>
            </Link>
          </div>
          <ul className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                {item.subItems ? (
                  <Dropdown 
                    label={item.label} 
                    items={item.subItems}
                    isMobile={false}
                  />
                ) : (
                  <Link 
                    to={item.href} 
                    className={`flex items-center text-gray-300 hover:text-white transition-all duration-200 py-2.5 px-4 rounded-lg mx-1 hover:bg-gray-800/80 ${
                      location.pathname === item.href ? 'text-white font-semibold bg-gradient-to-r from-blue-600/80 to-purple-600/80 shadow-lg' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            <button 
              onClick={handleSignInClick}
              className="py-2 px-4 border border-gray-300 rounded-md text-white hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 rounded-md text-white hover:opacity-90 transition-opacity"
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar} className="text-white">
              {!mobileDrawerOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="w-full space-y-2">
              {navItems.map((item, index) => (
                <li key={index} className="text-center w-full">
                  {item.subItems ? (
                    <Dropdown 
                      label={item.label}
                      items={item.subItems}
                      isMobile={true}
                      onItemClick={closeMobileMenu}
                    />
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-2xl text-white hover:text-blue-500 transition-colors block py-2 ${
                        location.pathname === item.href ? 'text-blue-500' : ''
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mt-8">
                <Link
                  to="/signup"
                  className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-6 rounded-md text-white hover:opacity-90 transition-opacity"
                  onClick={toggleNavbar}
                >
                  Create an account
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      </nav>
      {isSignInModalOpen && <SignIn onClose={() => setIsSignInModalOpen(false)} />}
    </>
  );
};

export default Navbar;
