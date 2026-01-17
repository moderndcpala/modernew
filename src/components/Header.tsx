import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateDesktopModeClass = () => {
      const ua = navigator.userAgent || '';
      const isMobileUA = /Android|iPhone|iPad|iPod/i.test(ua);
      const isDesktopMode = isMobileUA && window.innerWidth >= 768;
      document.body.classList.toggle('desktop-mode', isDesktopMode);
    };

    updateDesktopModeClass();
    window.addEventListener('resize', updateDesktopModeClass);

    return () => {
      window.removeEventListener('resize', updateDesktopModeClass);
      document.body.classList.remove('desktop-mode');
    };
  }, []);

  interface NavItem {
    label: string;
    link: string;
  }

  const navLinks: NavItem[] = [
    { link: '/', label: 'Home' },
    { link: '/about', label: 'About Us' },
    { link: '/services', label: 'Services' },
    { link: '/gallery', label: 'Gallery' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary-green shadow-lg backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-24 md:h-28 gap-6 md:gap-8">
            {/* Logo */}
            <div className="flex items-center h-full md:flex-1 md:justify-start flex-shrink-0 min-w-[180px]">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center h-full transition-opacity hover:opacity-90 py-2 flex-shrink-0"
              >
                <img 
                  src={logo} 
                  alt="Modern Diagnostic Centre" 
                  loading="lazy"
                  className="h-24 md:h-28 w-auto object-contain max-h-full" 
                  style={{ maxHeight: '112px' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav hidden md:flex items-center justify-center flex-1 space-x-4">
              {navLinks.map((link) =>
                link.link.startsWith('#') ? (
                  <a
                    key={link.link}
                    href={link.link}
                    className="desktop-nav-link px-4 py-2 rounded-full font-medium transition-all duration-200 relative text-white/90 hover:text-white hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.link}
                    to={link.link}
                    className={`desktop-nav-link px-4 py-2 rounded-full font-medium transition-all duration-200 relative ${
                      isActive(link.link)
                        ? 'text-white bg-white/20 font-semibold is-active'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {isActive(link.link) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Right Section - Action Buttons */}
            <div className="desktop-actions hidden md:flex items-center justify-end md:flex-1 space-x-4">
              {/* Desktop Action Buttons */}
              <div className="flex items-center space-x-3">
                <Link
                  to="/book-appointment"
                  className="desktop-cta-button inline-flex items-center gap-2 bg-white text-primary-green px-5 py-2.5 rounded-full font-semibold shadow-lg ring-1 ring-white/70 hover:bg-gray-50 hover:ring-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
                <a
                  href="#contact"
                  className="desktop-cta-button bg-transparent border border-white/70 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-white/15 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button md:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-7 w-7" strokeWidth={2.5} />
              ) : (
                <Menu className="h-7 w-7" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - No background, just clickable area */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-primary-green shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-end p-6 border-b border-white border-opacity-20">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-8 px-5">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) =>
                link.link.startsWith('#') ? (
                  <a
                    key={link.link}
                    href={link.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-lg font-semibold text-lg transition-all duration-200 relative text-white hover:bg-white hover:bg-opacity-10"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.link}
                    to={link.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-4 rounded-lg font-semibold text-lg transition-all duration-200 relative ${
                      isActive(link.link)
                        ? 'text-primary-green bg-white'
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {link.label}
                    {isActive(link.link) && (
                      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary-green rounded-r-full" />
                    )}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-10 space-y-4">
              <Link
                to="/book-appointment"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-primary-green px-5 py-4 rounded-full font-semibold text-lg text-center shadow-lg ring-2 ring-white/60 hover:bg-gray-50 hover:ring-white transition-all duration-200"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Link>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-transparent border-2 border-white text-white px-5 py-4 rounded-lg font-semibold text-lg text-center hover:bg-white hover:text-primary-green transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;

