import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.jpg';
import logoDesktop from '../assets/logo 1.png';
import { servicesData } from '../data/services';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsDesktopServicesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsServicesOpen(false);
      setIsDesktopServicesOpen(false);
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
    { link: '/services', label: 'Our Services' },
    { link: '/gallery', label: 'Gallery' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary-green shadow-lg backdrop-blur-sm bg-opacity-95">
        <div className="navbar-container container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-24 md:h-24 lg:h-24 gap-5 md:gap-6 flex-nowrap">
          {/* Logo */}
            <div className="navbar-logo flex items-center h-full md:flex-none md:justify-start flex-shrink-0 min-w-[150px] md:min-w-[160px] lg:min-w-[190px] xl:min-w-[210px] mr-auto">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center h-full transition-opacity hover:opacity-90 py-2 flex-shrink-0"
              >
                <img 
                  src={logo} 
                  alt="Modern Diagnostic Centre" 
                  loading="lazy"
                  className="logo-enter logo-responsive h-24 w-auto object-contain max-h-full md:hidden" 
                  style={{ maxHeight: '112px' }}
                />
                <img 
                  src={logoDesktop} 
                  alt="Modern Diagnostic Centre" 
                  loading="lazy"
                  className="logo-enter logo-responsive hidden md:block h-24 lg:h-28 w-auto object-contain max-h-full" 
                  style={{ maxHeight: '112px' }}
                />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
            <nav className="desktop-nav hidden md:flex items-center justify-center flex-1 md:space-x-2 lg:space-x-3 xl:space-x-4">
              {navLinks.map((link) =>
                link.link === '/services' ? (
                  <div
                    key={link.link}
                    className="relative"
                  >
                    <div
                      className={`desktop-nav-link rounded-full font-medium transition-all duration-200 relative inline-flex items-center ${
                        isActive(link.link)
                          ? 'text-white font-semibold is-active'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Link
                        to={link.link}
                        className="relative z-10 whitespace-nowrap"
                      >
                        {link.label}
            </Link>
                      <button
                        type="button"
                        aria-label="Toggle services menu"
                        aria-expanded={isDesktopServicesOpen}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setIsDesktopServicesOpen((prev) => !prev);
                        }}
                        className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-inherit transition-all duration-200 relative z-20 pointer-events-auto"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDesktopServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <div
                      className={`absolute left-1/2 top-full z-50 w-[360px] -translate-x-1/2 pt-2 transition-all duration-200 ease-out ${
                        isDesktopServicesOpen
                          ? 'opacity-100 pointer-events-auto translate-y-0'
                          : 'opacity-0 pointer-events-none translate-y-2'
                      }`}
                    >
                      <div className="rounded-2xl border border-white/20 bg-primary-green/95 p-4 shadow-2xl backdrop-blur-md">
                        <div className="max-h-[320px] overflow-y-auto pr-1">
                          {[...servicesData]
                            .sort((a, b) =>
                              a.id === 'health-packages'
                                ? -1
                                : b.id === 'health-packages'
                                  ? 1
                                  : 0
                            )
                            .map((category) => (
                            <div key={category.id} className="mb-4 last:mb-0">
                              <div className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                                {category.title}
                              </div>
                              <div className="mt-2 space-y-1.5">
                              {[...category.tests]
                                .sort((a, b) =>
                                  a.id === 'stool-ph-test' ? 1 : b.id === 'stool-ph-test' ? -1 : 0
                                )
                                .map((test) => (
                                <Link
                                  key={test.id}
                                  to="/test-details"
                                  state={{
                                    test: {
                                      id: test.id,
                                      name: test.title,
                                      description: test.description,
                                      details: test.details,
                                      preparation: test.preparation,
                                      price: test.price,
                                      image: test.image,
                                    },
                                    service: category.title,
                                  }}
                                  className="block text-sm text-white/90 hover:text-white"
                                >
                                  {test.title}
            </Link>
                              ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-white/20 pt-3">
                          <Link
                            to="/services"
                            className="text-sm font-semibold text-white hover:text-white/90"
                          >
                            View all services
            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : link.link.startsWith('#') ? (
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
                        ? 'text-white font-semibold is-active'
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
            <div className="desktop-actions nav-actions hidden md:flex items-center justify-end md:flex-1 md:space-x-2 lg:space-x-3 flex-shrink-0">
          {/* Desktop Action Buttons */}
              <div className="flex items-center space-x-3">
            <Link
              to="/book-appointment"
                  className="desktop-cta-button inline-flex items-center gap-2 bg-white text-primary-green px-5 py-2.5 rounded-full font-semibold shadow-lg hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5"
            >
                  <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>
                <Link
                  to="/contact"
                  className="desktop-cta-button bg-transparent border border-white/70 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Contact Us
                </Link>
              </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button md:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-7 w-7" strokeWidth={2.5} />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-primary-green md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-primary-green shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
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
                link.link === '/services' ? (
                  <div key={link.link}>
                    <div className="w-full flex items-center justify-between px-4 py-4 rounded-lg font-semibold text-lg transition-all duration-200 relative text-white hover:bg-white/10">
              <Link
                        to={link.link}
                onClick={() => setIsMenuOpen(false)}
                        className="flex-1"
              >
                        {link.label}
              </Link>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setIsServicesOpen((prev) => !prev);
                        }}
                        className="ml-3 flex-shrink-0"
                        aria-label="Toggle services list"
                        aria-expanded={isServicesOpen}
                        aria-controls="mobile-services-list"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isServicesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <div
                      id="mobile-services-list"
                      className={`mt-2 ml-4 border-l border-white/20 pl-4 overflow-hidden transition-all duration-300 ${
                        isServicesOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-4 py-2">
                        {[...servicesData]
                          .sort((a, b) =>
                            a.id === 'health-packages'
                              ? -1
                              : b.id === 'health-packages'
                                ? 1
                                : 0
                          )
                          .map((category) => (
                          <div key={category.id}>
                            <div className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                              {category.title}
                            </div>
                            <div className="mt-2 space-y-2">
                              {[...category.tests]
                                .sort((a, b) =>
                                  a.id === 'stool-ph-test' ? 1 : b.id === 'stool-ph-test' ? -1 : 0
                                )
                                .map((test) => (
              <Link
                                  key={test.id}
                                  to="/test-details"
                                  state={{
                                    test: {
                                      id: test.id,
                                      name: test.title,
                                      description: test.description,
                                      details: test.details,
                                      preparation: test.preparation,
                                      price: test.price,
                                      image: test.image,
                                    },
                                    service: category.title,
                                  }}
                onClick={() => setIsMenuOpen(false)}
                                  className="block text-sm text-white/90 hover:text-white"
              >
                                  {test.title}
              </Link>
                              ))}
                            </div>
                          </div>
                        ))}
              <Link
                to="/services"
                onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center text-sm font-semibold text-white hover:text-white/90"
              >
                          View all services
              </Link>
                      </div>
                    </div>
                  </div>
                ) : link.link.startsWith('#') ? (
                  <a
                    key={link.link}
                    href={link.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-4 rounded-lg font-semibold text-lg transition-all duration-200 relative text-white hover:bg-white/10"
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
                        ? 'text-white font-semibold'
                        : 'text-white hover:bg-white/10'
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
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-primary-green px-5 py-4 rounded-full font-semibold text-lg text-center shadow-lg hover:bg-white/90 transition-all duration-200"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-transparent border-2 border-white text-white px-5 py-4 rounded-lg font-semibold text-lg text-center hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
            </nav>
          </div>
      </div>
    </>
  );
};

export default Header;



