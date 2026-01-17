import { useState, useEffect, useRef } from 'react';
import { Activity, Heart, FileText, Package } from 'lucide-react';

const Services = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Activity,
      title: 'Radiology',
      description: 'Advanced imaging services including X-ray, CT scan, MRI, and ultrasound with cutting-edge technology.',
    },
    {
      icon: FileText,
      title: 'Pathology',
      description: 'Comprehensive laboratory testing with accurate results and quick turnaround times for all diagnostic needs.',
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Complete cardiac care with ECG, Echo, and stress tests performed by experienced cardiologists.',
    },
    {
      icon: Package,
      title: 'Health Packages',
      description: 'Customized health checkup packages designed for individuals and families at competitive prices.',
    },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observer for the header section
    if (sectionRef.current) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      const headerElement = sectionRef.current.querySelector('.section-header');
      if (headerElement) {
        headerObserver.observe(headerElement);
        observers.push(headerObserver);
      }
    }

    // Observers for each service card
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) => new Set([...prev, index]));
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

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

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
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
      `}</style>
      <section id="services" ref={sectionRef} className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
          <h2 className="section-header text-3xl md:text-4xl font-bold text-center text-text-dark mb-8 opacity-0">
          Our Services
        </h2>

          {/* Services Image */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=600&fit=crop" 
              alt="Modern Medical Laboratory" 
              loading="lazy"
              className="w-full h-[200px] md:h-[300px] lg:h-[350px] object-cover"
              onError={(e) => {
                // Fallback image if the first one fails
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop';
              }}
            />
          </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
              const isVisible = visibleItems.has(index);
              const delay = index * 100; // Stagger delay in milliseconds

            return (
              <div
                key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`fade-in-up-delay flex flex-col items-center text-center p-6 hover:shadow-lg transition-all duration-300 ${
                    isVisible ? 'visible' : ''
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${delay}ms` : '0ms',
                  }}
              >
                {/* Circular Icon Container */}
                  <div
                    className={`scale-in-delay w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110 ${
                      isVisible ? 'visible' : ''
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${delay + 150}ms` : '0ms',
                    }}
                  >
                  <IconComponent className="h-10 w-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
};

export default Services;




