import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstagramIcon from './InstagramIcon';
import GoogleMapsIcon from './GoogleMapsIcon';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary-green text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand + Contact Column */}
          <div>
            <div className="mb-5">
              <img src={logo} alt="Modern Diagnostic Centre" loading="lazy" className="h-20 sm:h-24 w-auto" />
              <p className="mt-3 text-sm opacity-90 leading-relaxed">
                Trusted diagnostic care with accurate results, modern technology, and a patient-first approach.
              </p>
            </div>
            <h3 className="text-sm uppercase tracking-[0.2em] opacity-80 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <a href="tel:+917306440844" className="hover:text-gray-200 transition-colors">
                  +91 73064 40844
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <a href="mailto:moderndcpala@gmail.com" className="hover:text-gray-200 transition-colors">
                  moderndcpala@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1st+Floor,+Puthumana+Towers,+Near+Government+Hospital+Junction,+Pala+Town,+Kottayam-686575,+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors underline"
                >
                  1st Floor, Puthumana Towers,<br />
                  Near Government Hospital Junction,<br />
                  Pala Town, Kottayam-686575,<br />
                  Kerala
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] opacity-80 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-200 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gray-200 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-gray-200 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-200 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Additional Info Column */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] opacity-80 mb-4">Working Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Monday - Saturday: 8:00 AM - 8:00 PM</li>
              <li>Sunday: 9:00 AM - 2:00 PM</li>
              <li className="mt-4">
                <p className="opacity-90">
                  Emergency services available 24/7
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Row */}
        <div className="border-t border-white border-opacity-20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a
                href="https://www.instagram.com/moderndcpala/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-white p-2"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1st+Floor,+Puthumana+Towers,+Near+Government+Hospital+Junction,+Pala+Town,+Kottayam-686575,+Kerala"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-white p-2"
                aria-label="Google Maps"
                title="Find us on Google Maps"
              >
                <GoogleMapsIcon className="h-6 w-6" />
              </a>
            </div>
            <div className="text-sm opacity-90 text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Modern Diagnostic Centre - Pala. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


