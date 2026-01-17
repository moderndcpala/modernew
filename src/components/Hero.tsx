import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import heroBg1 from '../assets/hero-bg.webp';
import heroBg2 from '../assets/hero-bg-2.webp';
import heroBg3 from '../assets/hero-bg-3.webp';

// Hero carousel images
const heroImages = [
  heroBg1,
  heroBg2,
  heroBg3,
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Buttons stay visible to prevent flicker

  return (
    <section className="hero-section relative h-[500px] sm:h-[600px] md:h-[680px] lg:h-[720px] xl:h-[760px] overflow-hidden">
      {/* Background Images with Fade Animation */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`hero-bg absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center lg:items-center lg:pt-0" style={{ zIndex: 20 }}>
        <div className="w-full max-w-3xl lg:max-w-2xl xl:max-w-3xl font-hero">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 md:mb-6 leading-[1.1] md:leading-tight tracking-tight drop-shadow-2xl" style={{ 
            textShadow: '4px 4px 20px rgba(0, 0, 0, 1), 2px 2px 10px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(0, 0, 0, 0.7)',
            WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.5)'
          }}>
            Advanced Diagnostics for Your Health
          </h1>

          {/* Action Buttons */}
          <div 
            ref={buttonsRef}
            className="hero-buttons-appear flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8"
          >
            <a
              href="tel:+917306440844"
              className="inline-flex items-center justify-center bg-primary-green text-white px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 text-sm sm:text-base"
            >
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Call Now
            </a>
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center bg-white text-primary-green px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 text-sm sm:text-base"
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Book Appointment
            </Link>
          </div>

          {/* Trust Badge/Subtitle */}
          <div className="flex items-center gap-3 w-fit">
            <div className="w-1 h-8 bg-white rounded-full opacity-90 shadow-lg" />
            <p className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-wide drop-shadow-2xl" style={{ 
              textShadow: '3px 3px 15px rgba(0, 0, 0, 1), 2px 2px 8px rgba(0, 0, 0, 1), 0 0 30px rgba(0, 0, 0, 0.9)',
              WebkitTextStroke: '0.3px rgba(0, 0, 0, 0.4)'
            }}>
            Results you can trust
          </p>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 30 }}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
