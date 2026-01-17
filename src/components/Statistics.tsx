import { useState, useEffect, useRef } from 'react';
import { Award, Users, Activity, Clock } from 'lucide-react';

const Statistics = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const statistics = [
    {
      icon: Clock,
      number: '25+',
      label: 'Years of Experience',
      description: 'Serving the community with excellence',
    },
    {
      icon: Activity,
      number: '100K+',
      label: 'Tests Performed',
      description: 'Accurate and reliable results',
    },
    {
      icon: Users,
      number: '50K+',
      label: 'Happy Patients',
      description: 'Trusted by families',
    },
    {
      icon: Award,
      number: '100%',
      label: 'Accuracy Rate',
      description: 'Quality assured diagnostics',
    },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observer for header
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

    // Observers for each card
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => new Set([...prev, index]));
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
            transform: translateY(40px);
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

        @keyframes numberCount {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in-up-delay {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-up-delay.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scale-in-delay {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .scale-in-delay.visible {
          opacity: 1;
          transform: scale(1);
        }

        .number-animate {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .number-animate.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
      <section ref={sectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="section-header text-center mb-12 opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Our Achievements
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trusted by thousands of patients for accurate diagnostics and exceptional care
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {statistics.map((stat, index) => {
                const IconComponent = stat.icon;
                const isVisible = visibleCards.has(index);
                return (
                  <div
                    key={index}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`text-center p-6 bg-beige-bg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 fade-in-up-delay ${
                      isVisible ? 'visible' : ''
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
                    }}
                  >
                    <div
                      className={`w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 scale-in-delay ${
                        isVisible ? 'visible' : ''
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 150 + 200}ms` : '0ms',
                      }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div
                      className={`text-3xl md:text-4xl font-bold text-primary-green mb-2 number-animate ${
                        isVisible ? 'visible' : ''
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 150 + 300}ms` : '0ms',
                      }}
                    >
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-text-dark mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
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

export default Statistics;
