import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import SignIn from "./SignIn";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-neutral-900/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight text-white">FermetrixLab</span>
            </Link>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.href} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
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
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} className="text-white">
              {!mobileDrawerOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index} className="text-center">
                  <Link
                    to={item.href}
                    className="text-2xl text-white hover:text-blue-500 transition-colors block py-2"
                    onClick={toggleNavbar}
                  >
                    {item.label}
                  </Link>
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
