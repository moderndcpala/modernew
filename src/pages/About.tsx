import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Award, Users, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import yearsImage from '../assets/25years.png';
import galleryImage1 from '../assets/Gallery Image 1.png';
import galleryImage2 from '../assets/Gallery Image 2.webp';
import galleryImage3 from '../assets/Gallery Image 3.webp';
import { videoUrls } from '../config/videos';

function AboutVideo({ src }: { src: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="rounded-xl overflow-hidden shadow-lg bg-black hover:shadow-xl transition-shadow flex items-center justify-center aspect-video text-white text-sm p-4 text-center">
        Video unavailable
      </div>
    );
  }
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-black hover:shadow-xl transition-shadow">
      <video
        controls
        preload="metadata"
        playsInline
        className="w-full aspect-video object-contain"
        onError={() => setError(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

const About = () => {
  const [visibleValues, setVisibleValues] = useState<Set<number>>(new Set());
  const valuesRef = useRef<HTMLElement>(null);
  const valueCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const values = [
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'We prioritize patient comfort, safety, and well-being in everything we do.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering accurate, reliable, and timely diagnostic services.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly qualified medical professionals with years of experience.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'State-of-the-art equipment and cutting-edge diagnostic technology.',
    },
  ];

  // Animation observer for core values
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (valuesRef.current) {
      valueCardRefs.current.forEach((ref, index) => {
        if (ref) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setVisibleValues((prev) => new Set([...prev, index]));
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.2,
              rootMargin: '0px 0px -50px 0px',
            }
          );

          observer.observe(ref);
          observers.push(observer);
        }
      });
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes aboutImageIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .fade-in-up-delay {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-up-delay.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scale-in-delay {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .scale-in-delay.visible {
          opacity: 1;
          transform: scale(1);
        }

        .about-image-enter {
          animation: aboutImageIn 0.8s ease-out both;
        }
      `}</style>
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-green to-primary-green text-white py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)' }}>
              About Modern Diagnostic Centre
            </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)' }}>
              Serving the community with excellence and dedication for over 25 years
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-white">
        {/* Story Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
                {/* Text Content - First on mobile, left on desktop */}
                <div className="order-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 md:mb-6 leading-tight tracking-tight">
                    Our Story
                  </h2>
                  <div className="space-y-4 md:space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
                    <p>
                      Established in 2001, Modern Diagnostic Centre Pala was founded with the vision of delivering reliable, accurate, and timely diagnostic services to the community. The centre was started through the dedicated efforts of Dr. Babu Chacko , Saji John & Rini Saji John, whose shared commitment to quality healthcare laid the foundation for its growth.
                    </p>
                    <p>
                      From its inception, the centre aimed to combine advanced diagnostic technology with professional expertise, ensuring patients received dependable results and compassionate service. Over the years, Modern Diagnostic Centre has continued to expand its capabilities, maintaining high standards in laboratory and patient care while earning the trust of the Pala community.
                    </p>
                    <p>
                      Over the years, we have built a reputation for excellence, integrity, and 
                      compassionate patient care. Our team of highly qualified medical professionals 
                      and certified technicians work together to ensure that every test is performed 
                      with precision and care.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center lg:justify-center">
                    <img
                      src={yearsImage}
                      alt="25 Years of Trust & Care"
                      loading="lazy"
                      className="w-auto max-w-[180px] sm:max-w-[200px] md:max-w-[220px] h-auto transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* About Page Image & Videos - Second on mobile (after About text), right on desktop */}
                <div className="order-2 flex flex-col gap-6 lg:gap-8">
                  <div className="flex justify-center lg:justify-end">
                    <img 
                      src="/about us page.jpg"
                      alt="Modern Diagnostic Centre Facility"
                      loading="lazy"
                      decoding="async"
                      className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[420px] h-auto rounded-xl shadow-xl object-cover transition-transform duration-300 hover:scale-[1.02] about-image-enter"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
                    <h3 className="text-lg font-semibold text-text-dark mb-4">Our Centre in Action</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[videoUrls.video2, videoUrls.video3, videoUrls.video4, videoUrls.video5].map((src, i) => (
                        <AboutVideo key={i} src={src} />
                      ))}
                    </div>
                    <Link
                      to="/gallery"
                      className="inline-block text-sm font-medium text-primary-green hover:underline mt-4"
                    >
                      View all in Gallery →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-16 bg-beige-bg overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 tracking-tight">
                  Our Core Values
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  const isVisible = visibleValues.has(index);
                  const delay = index * 100;

                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        valueCardRefs.current[index] = el;
                      }}
                      className={`bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center fade-in-up-delay ${
                        isVisible ? 'visible' : ''
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${delay}ms` : '0ms',
                      }}
                    >
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transform transition-all duration-300 scale-in-delay ${
                          isVisible ? 'visible' : ''
                        }`}
                        style={{
                          transitionDelay: isVisible ? `${delay + 150}ms` : '0ms',
                        }}
                      >
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-3 md:mb-4">
                        {value.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Mission */}
                <div className="relative bg-gradient-to-br from-primary-green to-primary-green rounded-xl p-6 md:p-8 lg:p-10 text-white shadow-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <img 
                      src={galleryImage1} 
                      alt="Mission" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">Our Mission</h3>
                    <p className="text-base md:text-lg leading-relaxed opacity-95">
                    To provide accurate, reliable, and timely diagnostic services using state-of-the-art 
                    equipment and highly qualified medical professionals. We are committed to maintaining 
                    the highest standards of quality, integrity, and patient care.
                  </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="relative bg-beige-bg rounded-xl p-6 md:p-8 lg:p-10 shadow-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src={galleryImage2} 
                      alt="Vision" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-4 md:mb-6 leading-tight">Our Vision</h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    To be the leading Diagnostic Centre in the region, recognized for excellence in 
                    healthcare services, innovation, and compassionate patient care. We strive to 
                    make quality diagnostics accessible to everyone in our community.
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 tracking-tight">
                  Why Choose Us?
                </h2>
              </div>

              {/* Image Section */}
              <div className="mb-8 md:mb-12 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={galleryImage3} 
                  alt="Modern Diagnostic Centre Facilities" 
                  loading="lazy"
                  className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-5 md:space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Advanced Technology
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        We use the latest diagnostic equipment and technology to ensure accurate and 
                        reliable test results for all our patients.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Experienced Team
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        Our team consists of highly qualified doctors, radiologists, pathologists, 
                        and certified technicians with years of experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Quick Turnaround
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        We understand the importance of timely results. Most reports are available 
                        within 24-48 hours, with urgent tests processed even faster.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Patient-Centered Care
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        We prioritize patient comfort, confidentiality, and precision in all our 
                        services, ensuring a positive experience for everyone.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Comprehensive Services
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        From routine checkups to specialized diagnostic tests, we offer a wide 
                        range of services under one roof for your convenience.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-primary-green mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2">
                        Trusted & Reliable
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        With 25 years of trusted service, thousands of satisfied patients, and 
                        a commitment to excellence, you can rely on us for accurate diagnostics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary-green to-primary-green">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
                Experience Quality Healthcare
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/book-appointment"
                  className="inline-flex items-center justify-center bg-white text-primary-green px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                >
                  Book Appointment
                </a>
                <a
                  href="tel:+919846052152"
                  className="inline-flex items-center justify-center bg-primary-green border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default About;



