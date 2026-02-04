import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import GoogleReviews from '../components/GoogleReviews';
import OurTests from '../components/OurTests';
import Statistics from '../components/Statistics';
import Footer from '../components/Footer';

const Home = () => {
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const welcomeImages = ['/welcome.webp', '/welcome%202.webp', '/welcome%203.webp'];

  useEffect(() => {
    if (welcomeImages.length <= 1) return;
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [welcomeImages.length]);

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
                    loading="lazy"
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
      <About />
      <Services />
      <WhyChooseUs />
      <GoogleReviews />
      <OurTests />
      <Statistics />
      <Footer />
    </div>
  );
};

export default Home;









