import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Activity, FileText, Heart, Package, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { servicesData } from '../data/services';

const iconMap: { [key: string]: any } = {
  Activity,
  FileText,
  Heart,
  Package,
};

const OurTests = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define priority order for important tests (these will appear first)
  const importantTestIds = [
    'blood-test', // Complete Blood Count (CBC)
    'x-ray', // X-Ray
    'ecg', // ECG
    'ultrasound', // Ultrasound
    'lipid-profile', // Lipid Profile
    'diabetes-profile', // Diabetes Profile
    'liver-function', // Liver Function Test
    'kidney-function', // Kidney Function Test
    'ct-scan', // CT Scan
    'mri', // MRI Scan
    'echo', // Echocardiogram
  ];

  // Flatten all tests from all categories and sort by importance
  const allTests = servicesData
    .flatMap((category) =>
      category.tests.map((test) => ({
        ...test,
        categoryTitle: category.title,
        categoryIcon: iconMap[category.icon] || Activity,
        priority: importantTestIds.indexOf(test.id),
      }))
    )
    .sort((a, b) => {
      // Important tests first (priority >= 0), then others
      if (a.priority >= 0 && b.priority >= 0) {
        return a.priority - b.priority; // Sort by priority order
      }
      if (a.priority >= 0) return -1; // a is important, b is not
      if (b.priority >= 0) return 1; // b is important, a is not
      return 0; // Both are not important, keep original order
    });

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4; // lg and above - show 4 cards
    if (window.innerWidth >= 768) return 2; // md
    return 1; // mobile
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const maxIndex = Math.max(0, allTests.length - itemsPerView);

  useEffect(() => {
    // Reset to first slide when items per view changes
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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
      }

      return () => headerObserver.disconnect();
    }
  }, []);

  const scrollToIndex = (index: number) => {
    if (isAnimating) return;
    
    // Handle looping
    let targetIndex = index;
    if (targetIndex < 0) {
      targetIndex = maxIndex;
    } else if (targetIndex > maxIndex) {
      targetIndex = 0;
    }
    
    setIsAnimating(true);
    setCurrentIndex(targetIndex);

    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = window.innerWidth >= 768 ? 24 : 16; // gap-4 on mobile, gap-6 on desktop
        const scrollPosition = targetIndex * (cardWidth + gap);

        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (currentIndex >= maxIndex) {
      scrollToIndex(0); // Loop back to start
    } else {
      scrollToIndex(Math.min(currentIndex + 1, maxIndex));
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      scrollToIndex(maxIndex); // Loop to end
    } else {
      scrollToIndex(Math.max(currentIndex - 1, 0));
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (maxIndex === 0) return; // Don't auto-rotate if there's only one slide

    const autoRotateInterval = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        scrollToIndex(nextIndex);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(autoRotateInterval);
  }, [currentIndex, maxIndex, isAnimating]);

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.children[0] as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.offsetWidth;
      const gap = window.innerWidth >= 768 ? 24 : 16; // gap-4 on mobile, gap-6 on desktop
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, maxIndex, itemsPerView]);

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

        .carousel-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section id="our-tests" ref={sectionRef} className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl lg:max-w-3xl mx-auto">
            <div className="section-header text-center mb-12 opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                Our Tests
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive diagnostic tests across all specialties with accurate results and quick turnaround times
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Scrollable Cards Container */}
              <div
                ref={scrollContainerRef}
                className="carousel-container flex gap-4 md:gap-6 lg:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 md:px-12 lg:px-8"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {allTests.map((test, _index) => {
                  const CategoryIcon = test.categoryIcon;

                  return (
                    <div
                      key={`${test.categoryTitle}-${test.id}`}
                      className="flex-shrink-0 snap-start w-[calc(100vw-64px)] md:w-[calc(50%-12px)] lg:w-[240px]"
                      style={{
                        minWidth: 'calc(100vw - 64px)',
                      }}
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full w-full flex flex-col">
                        {/* Test Image */}
                        {test.image && (
                          <div className="w-full h-48 lg:h-56 overflow-hidden bg-gray-100">
                            <img 
                              src={test.image} 
                              alt={test.title}
                              loading="lazy"
                              className="w-full h-full object-cover lg:object-cover lg:object-center hover:scale-105 transition-transform duration-300"
                              style={{
                                objectPosition: 'center center'
                              }}
                              onError={(e) => {
                                // Fallback if image fails to load
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                         <div className="p-4 md:p-5 lg:p-5 flex flex-col flex-grow">
                          {/* Category Badge */}
                          <div className="flex items-center gap-2 mb-3 lg:mb-3">
                            <div className="w-8 h-8 lg:w-8 lg:h-8 bg-primary-green rounded-lg flex items-center justify-center flex-shrink-0">
                              <CategoryIcon className="h-4 w-4 lg:h-4 lg:w-4 text-white" />
                            </div>
                            <span className="text-xs lg:text-sm font-semibold text-primary-green uppercase tracking-wide">
                              {test.categoryTitle}
                            </span>
                          </div>

                          {/* Test Title */}
                          <h3 className="text-xl lg:text-lg font-bold text-text-dark mb-2 lg:mb-3 leading-tight">
                            {test.title}
                          </h3>

                          {/* Test Description */}
                          <p className="text-gray-600 text-sm lg:text-sm leading-relaxed mb-3 lg:mb-4 line-clamp-3">
                            {test.description}
                          </p>

                          {/* Price */}
                          <div className="mb-4 lg:mb-4">
                            <span className="text-lg lg:text-lg font-bold text-primary-green">
                              {test.price}
                            </span>
                          </div>

                          {/* Buttons Container */}
                          <div className="flex flex-col lg:flex-row gap-2.5 lg:gap-2.5 mt-auto">
                            {/* View More Details Button */}
                            <Link
                              to="/test-details"
                              state={{ 
                                test: {
                                  id: test.id,
                                  name: test.title,
                                  description: test.description,
                                  details: test.details,
                                  preparation: test.preparation,
                                  duration: test.duration,
                                  price: test.price,
                                  image: test.image,
                                },
                                service: test.categoryTitle
                              }}
                              className="lg:w-auto w-full bg-primary-green text-white px-4 lg:px-4 py-2.5 lg:py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2 lg:gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm lg:text-sm"
                            >
                              <Info className="h-4 w-4 lg:h-4 lg:w-4 flex-shrink-0" />
                              <span className="whitespace-nowrap">View More</span>
                            </Link>

                            {/* Book Now Button */}
                            <Link
                              to="/book-appointment"
                              state={{ selectedService: test.categoryTitle, selectedTest: test.title }}
                              className="lg:w-auto w-full bg-beige-bg text-primary-green border-2 border-primary-green px-4 lg:px-4 py-2.5 lg:py-2.5 rounded-lg font-semibold hover:bg-primary-green hover:text-white transition-all duration-200 flex items-center justify-center gap-2 lg:gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm lg:text-sm"
                            >
                              <Calendar className="h-4 w-4 lg:h-4 lg:w-4 flex-shrink-0" />
                              <span className="whitespace-nowrap">Book Now</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows - Positioned outside to not block content */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || isAnimating}
                className={`absolute -left-2 md:-left-10 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-transparent md:bg-white md:bg-opacity-70 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-none md:shadow-lg hover:shadow-none md:hover:shadow-xl transition-all duration-200 ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-70 md:opacity-100 transform hover:scale-110'
                }`}
                aria-label="Previous tests"
              >
                <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-primary-green drop-shadow-lg" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex || isAnimating}
                className={`absolute -right-2 md:-right-10 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-transparent md:bg-white md:bg-opacity-70 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-none md:shadow-lg hover:shadow-none md:hover:shadow-xl transition-all duration-200 ${
                  currentIndex >= maxIndex
                    ? 'opacity-30 cursor-not-allowed'
                    : 'opacity-70 md:opacity-100 transform hover:scale-110'
                }`}
                aria-label="Next tests"
              >
                <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-primary-green drop-shadow-lg" />
              </button>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'w-8 bg-primary-green'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurTests;
