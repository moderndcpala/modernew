import { useState, useEffect, useRef } from 'react';
import { Cpu, Stethoscope, Zap, HandHeart, Layers, BadgeCheck } from 'lucide-react';
import galleryImage5 from '../assets/Gallery Image 5.webp';

const WhyChooseUs = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      icon: Cpu,
      title: 'Advanced Technology',
      description: 'We use the latest diagnostic equipment and technology to ensure accurate and reliable test results for all our patients.',
    },
    {
      icon: Stethoscope,
      title: 'Experienced Team',
      description: 'Our team consists of highly qualified doctors, radiologists, pathologists, and certified technicians with years of experience.',
    },
    {
      icon: Zap,
      title: 'Quick Turnaround',
      description: 'We understand the importance of timely results. Most reports are available within 24-48 hours, with urgent tests processed even faster.',
    },
    {
      icon: HandHeart,
      title: 'Patient-Centered Care',
      description: 'We prioritize patient comfort, confidentiality, and precision in all our services, ensuring a positive experience for everyone.',
    },
    {
      icon: Layers,
      title: 'Comprehensive Services',
      description: 'From routine checkups to specialized diagnostic tests, we offer a wide range of services under one roof for your convenience.',
    },
    {
      icon: BadgeCheck,
      title: 'Trusted & Reliable',
      description: 'With 25 years of trusted service, thousands of satisfied patients, and a commitment to excellence, you can rely on us for accurate diagnostics.',
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

    // Observers for each feature card
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
      `}</style>
      <section id="why-choose-us" ref={sectionRef} className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="section-header text-center mb-12 opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Why Choose Us?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the difference that quality healthcare and dedicated service make
              </p>
            </div>

            {/* Feature Image */}
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={galleryImage5} 
                alt="Modern Diagnostic Centre Facilities" 
                loading="lazy"
                className="w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                const isVisible = visibleItems.has(index);
                const delay = index * 100; // Stagger delay in milliseconds

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className={`fade-in-up-delay flex flex-col items-start p-6 rounded-lg hover:shadow-lg transition-all duration-300 bg-beige-bg hover:bg-opacity-80 ${
                      isVisible ? 'visible' : ''
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${delay}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-dark mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
