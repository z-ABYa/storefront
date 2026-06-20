import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollYRef = useRef(0);
  const searchRef = useRef(null);

  const isHomePage = location.pathname === '/';
  const isDarkText = !isHomePage || isScrolled || searchOpen;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const threshold = 100;
      
      if (currentScrollY < threshold) {
        setIsNavVisible(true);
      } else {
        if (currentScrollY > lastScrollYRef.current) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }
      
      setIsScrolled(currentScrollY > heroHeight-100);
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAdmin = user?.is_staff;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isHomePage?
        (isScrolled || searchOpen ? 'bg-[#FDFCF7]' : 'bg-transparent')
        : 'bg-[#FDFCF7]'
    } ${
      isNavVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container relative">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${
            isDarkText ? 'text-black' : 'text-white'
          }`}>
            Storefront
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`transition-colors duration-300 hover:text-black/90 focus:outline-none cursor-pointer ${
                isDarkText ? 'text-gray-600 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
              title="Search Products"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile Icon */}
            <Link to="/profile" className={`transition-colors duration-300 ${
              isDarkText ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`} title="Profile">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>


            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Link to="/admin" className={`font-semibold transition-colors duration-300 ${
                    isDarkText ? 'text-blue-600 hover:text-blue-800' : 'text-yellow-300 hover:text-yellow-100'
                  }`}>
                    Admin
                  </Link>
                )}
              </>
            )}

            {/* {!isAuthenticated && (
              <>
                <Link to="/login" className={`text-sm px-4 py-2 border rounded transition-all duration-300 ${
                  isDarkText 
                    ? 'border-gray-600 text-gray-600 hover:bg-gray-100' 
                    : 'border-white text-white hover:bg-white/10'
                }`}>
                  Login
                </Link>
                <Link to="/signup" className={`text-sm px-4 py-2 rounded transition-all duration-300 ${
                  isDarkText 
                    ? 'bg-black text-white hover:bg-gray-900' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}>
                  Sign Up
                </Link>
              </>
            )} */}

            <Link to="/cart" className={`relative transition-colors duration-300 ${
              isDarkText ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile action buttons & menu button */}
          <div className="flex md:hidden items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`transition-colors duration-300 hover:text-black/90 focus:outline-none cursor-pointer ${
                isDarkText ? 'text-gray-600 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>


             {/* Profile Icon */}
              <Link to="/profile" className={`transition-colors duration-300 ${
                isDarkText ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
              }`} title="Profile">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>


            {/* Cart Icon */}
            <Link to="/cart" className={`relative transition-colors duration-300 ${
              isDarkText ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

          </div>
        </div>

        {/* Slide-down Search Bar Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 top-16 bg-black/40 backdrop-blur-[2px] z-40">
            <div ref={searchRef} className="absolute top-0 left-0 w-full bg-[#FDFCF7] border-b border-gray-200 py-5 px-4 sm:px-8 lg:px-12 shadow-lg transition-all duration-300">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-[#FDFCF7] text-black border border-black/20 focus:border-black rounded px-4 py-2 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded text-xs tracking-wider uppercase font-semibold hover:bg-black/90 cursor-pointer"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-black/60 hover:text-black px-2 cursor-pointer text-sm"
              >
                Cancel
              </button>
            </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
