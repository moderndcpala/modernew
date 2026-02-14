import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import GoogleReviews from '../components/GoogleReviews';
import OurTests from '../components/OurTests';
import Statistics from '../components/Statistics';
import Footer from '../components/Footer';
import { servicesData } from '../data/services';
import { Play } from 'lucide-react';
import homeVideo from '../assets/WhatsApp Video 2026-02-13 at 4.26.59 PM.mp4';

const Home = () => {
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const welcomeImages = ['/welcome.webp', '/welcome%202.webp', '/welcome%203.webp'];
  const healthPackages = servicesData.find((category) => category.id === 'health-packages');

  useEffect(() => {
    if (welcomeImages.length <= 1) return;
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [welcomeImages.length]);

  // Pause video when it scrolls out of view
  useEffect(() => {
    const ref = videoRef.current;
    if (!ref) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) ref.pause();
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  // On mobile: pause video when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const ref = videoRef.current;
      if (window.innerWidth < 768 && ref && !ref.paused) ref.pause();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-hero font-bold text-text-dark mb-3 tracking-tight">
              Welcome to Modern Diagnostic Centre Pala
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Experience world-class diagnostic services with state-of-the-art technology and expert medical professionals dedicated to your well-being.
            </p>
            <div className="mt-6 md:mt-8 rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-[220px] md:h-[320px]">
                {welcomeImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt="Modern Diagnostic Centre"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    {...(index === 0 && { fetchPriority: 'high' })}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === welcomeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-16 bg-beige-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Watch Our Centre
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Take a look at Modern Diagnostic Centre Pala
              </p>
            </div>
            <div
              className="relative rounded-xl overflow-hidden shadow-xl bg-black cursor-pointer group"
              onClick={() => {
                if (!isVideoPlaying && videoRef.current) {
                  videoRef.current.play();
                }
              }}
            >
              <video
                ref={videoRef}
                src={homeVideo}
                controls
                preload="none"
                className="w-full aspect-video object-contain"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support the video tag.
              </video>
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 md:h-12 md:w-12 text-primary-green ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center rounded-full border border-primary-green text-primary-green px-6 py-3 text-sm font-semibold hover:bg-primary-green hover:text-white transition-all duration-200"
              >
                View More in Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Services />
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Our Packages
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Curated health packages designed for preventive care, routine screening, and complete wellness.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(healthPackages?.tests || []).map((pkg) => (
                <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  {pkg.image && (
                    <div className="h-44 overflow-hidden bg-gray-100">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-text-dark mb-2">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{pkg.description}</p>
                    {pkg.testsList && (
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
                        {pkg.testsList.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto">
                      {pkg.originalPrice && pkg.discountedPrice ? (
                        <div className="mb-4 flex items-baseline gap-3">
                          <span className="text-sm text-gray-500 line-through">
                            {pkg.originalPrice}
                          </span>
                          <span className="text-lg font-bold text-primary-green">
                            {pkg.discountedPrice}
                          </span>
                        </div>
                      ) : (
                        pkg.price && (
                          <div className="text-primary-green font-bold text-lg mb-4">{pkg.price}</div>
                        )
                      )}
                      <Link
                        to="/test-details"
                        state={{
                          test: {
                            id: pkg.id,
                            name: pkg.title,
                            description: pkg.description,
                            details: pkg.details,
                            preparation: pkg.preparation,
                            price: pkg.price,
                            image: pkg.image,
                          },
                          service: healthPackages?.title || 'Health Packages',
                        }}
                        className="inline-flex items-center justify-center w-full rounded-lg border border-primary-green text-primary-green px-4 py-2.5 text-sm font-semibold hover:bg-primary-green hover:text-white transition-all duration-200"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full bg-primary-green px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <GoogleReviews />
      <OurTests />
      <Statistics />
      <Footer />
    </div>
  );
};

export default Home;









