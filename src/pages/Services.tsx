import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Activity, Heart, FileText, Package, ChevronDown, ChevronUp, CheckCircle, Calendar, Cpu, Stethoscope, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';
import galleryImage1 from '../assets/Gallery Image 1.png';
import galleryImage2 from '../assets/Gallery Image 2.webp';
import galleryImage3 from '../assets/Gallery Image 3.webp';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  tests: {
    id: string;
    name: string;
    description: string;
    details?: string;
    preparation?: string;
    duration?: string;
    price?: string;
    image?: string;
  }[];
}

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [lastToggledService, setLastToggledService] = useState<string | null>(null);
  const navigate = useNavigate();
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [whyChooseVisible, setWhyChooseVisible] = useState<Set<number>>(new Set());
  const [ctaVisible, setCtaVisible] = useState(false);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const whyChooseItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 'radiology',
      title: 'Radiology',
      description: 'Advanced imaging services with cutting-edge technology for accurate diagnoses',
      icon: Activity,
      image: galleryImage1,
      tests: [
        { 
          id: '1', 
          name: 'X-Ray', 
          description: 'Digital X-ray imaging for bones, chest, and various body parts with instant results',
          details: 'Our state-of-the-art digital X-ray technology provides high-resolution images with minimal radiation exposure. Ideal for diagnosing fractures, infections, arthritis, and lung conditions. Results are available immediately after the scan.',
          preparation: 'No special preparation required. Remove jewelry and metal objects before the scan.',
          duration: '5-10 minutes',
          price: '₹400 onwards',
          image: '/xray.jpg'
        },
        { 
          id: '2', 
          name: 'CT Scan', 
          description: 'Computed Tomography scan providing detailed cross-sectional images of internal organs',
          details: 'Advanced CT scanning technology offers detailed 3D images of internal organs, bones, soft tissues, and blood vessels. Essential for detecting tumors, internal injuries, and monitoring treatment progress. Our low-dose CT technology minimizes radiation exposure.',
          preparation: 'Fasting may be required for certain scans. Avoid food 4-6 hours before if contrast is used.',
          duration: '15-30 minutes',
          price: '₹3000 onwards',
          image: '/ct scan.png'
        },
        { 
          id: '3', 
          name: 'MRI', 
          description: 'Magnetic Resonance Imaging for detailed images of soft tissues, brain, and joints',
          details: 'MRI uses powerful magnets and radio waves to create detailed images without radiation. Excellent for brain, spinal cord, joints, and soft tissue imaging. Our high-field MRI provides superior image quality for accurate diagnosis.',
          preparation: 'Remove all metal objects. Inform us if you have any implants or metal in your body.',
          duration: '30-60 minutes',
          price: '₹5000 onwards',
          image: '/mri.webp'
        },
        { 
          id: '4', 
          name: 'Ultrasound', 
          description: 'Safe, non-invasive imaging using sound waves for pregnancy, abdomen, and more',
          details: 'Ultrasound imaging is completely safe with no radiation. Perfect for pregnancy monitoring, abdominal organ evaluation, and vascular studies. Real-time imaging allows immediate assessment and guidance.',
          preparation: 'Fasting may be required for abdominal scans. Drink water for pelvic/obstetric scans.',
          duration: '15-30 minutes',
          price: '₹800 onwards',
          image: '/ultrasound.png'
        },
        { 
          id: '5', 
          name: 'Mammography', 
          description: 'Breast imaging for early detection of breast cancer and abnormalities',
          details: 'Digital mammography with advanced imaging technology for early breast cancer detection. Our low-dose digital mammography provides clear images with minimal discomfort. Essential for women over 40 and those with family history.',
          preparation: 'Avoid deodorant, lotions, or powders on the day of examination.',
          duration: '15-20 minutes',
          price: '₹1500 onwards',
          image: 'https://images.unsplash.com/photo-1551601651-0a4cf9e6c8f5?w=800&h=600&fit=crop'
        },
        { 
          id: '6', 
          name: 'Bone Densitometry', 
          description: 'Bone density testing to diagnose osteoporosis and assess fracture risk',
          details: 'DEXA scan measures bone mineral density to diagnose osteoporosis and assess fracture risk. Quick, painless, and uses minimal radiation. Recommended for postmenopausal women and those at risk of bone loss.',
          preparation: 'No special preparation. Avoid calcium supplements 24 hours before the test.',
          duration: '10-15 minutes',
          price: '₹1200 onwards',
          image: '/bone densiometery.jpg'
        },
      ],
    },
    {
      id: 'pathology',
      title: 'Pathology',
      description: 'Comprehensive laboratory testing with accurate results and quick turnaround times',
      icon: FileText,
      image: galleryImage2,
      tests: [
        { 
          id: '1', 
          name: 'Complete Blood Count (CBC)', 
          description: 'Complete blood analysis including red cells, white cells, and platelets',
          details: 'CBC is one of the most common blood tests that evaluates your overall health. It measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for detecting anemia, infections, bleeding disorders, and various other conditions.',
          preparation: 'Fasting not required. Can be done at any time.',
          duration: 'Results in 2-4 hours',
          price: '₹300 onwards',
          image: '/complete-blood-count.jpg'
        },
        { 
          id: '2', 
          name: 'Blood Chemistry Panel', 
          description: 'Comprehensive metabolic panel to assess organ function and overall health',
          details: 'Comprehensive metabolic panel evaluates kidney function, liver function, electrolyte balance, blood sugar, and protein levels. Provides a complete picture of your metabolic health and organ function.',
          preparation: 'Fasting for 8-12 hours required. Only water allowed.',
          duration: 'Results in 4-6 hours',
          price: '₹800 onwards',
          image: '/blood chemistry panel.webp'
        },
        { 
          id: '3', 
          name: 'Lipid Profile', 
          description: 'Cholesterol and triglyceride levels to assess cardiovascular health',
          details: 'Measures total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. Essential for assessing cardiovascular risk and monitoring heart health. Recommended annually for adults over 20.',
          preparation: 'Fasting for 12 hours required. Avoid fatty foods the day before.',
          duration: 'Results in 4-6 hours',
          price: '₹500 onwards',
          image: '/lipid profile.jpg'
        },
        { 
          id: '4', 
          name: 'Diabetes Profile', 
          description: 'Blood glucose, HbA1c, and related tests for diabetes diagnosis and management',
          details: 'Comprehensive diabetes screening including fasting blood sugar, postprandial blood sugar, HbA1c (3-month average), and insulin levels. Essential for diabetes diagnosis, monitoring, and management.',
          preparation: 'Fasting for 8-12 hours required. Follow specific instructions for postprandial test.',
          duration: 'Results in 4-6 hours',
          price: '₹800 onwards',
          image: '/daibetic.webp'
        },
        { 
          id: '5', 
          name: 'Thyroid Function Tests', 
          description: 'TSH, T3, T4 levels to evaluate thyroid gland function',
          details: 'Measures Thyroid Stimulating Hormone (TSH), T3, and T4 levels to evaluate thyroid function. Essential for diagnosing hypothyroidism, hyperthyroidism, and monitoring thyroid treatment.',
          preparation: 'Fasting not required. Can be done at any time.',
          duration: 'Results in 4-6 hours',
          price: '₹600 onwards',
          image: '/thyroid function.jpg'
        },
        { 
          id: '6', 
          name: 'Liver Function Tests', 
          description: 'Comprehensive panel to assess liver health and detect liver diseases',
          details: 'Comprehensive panel including ALT, AST, ALP, bilirubin, and protein levels. Evaluates liver health, detects liver damage, inflammation, and monitors treatment of liver diseases.',
          preparation: 'Fasting for 8-12 hours recommended. Avoid alcohol 24 hours before.',
          duration: 'Results in 4-6 hours',
          price: '₹600 onwards',
          image: '/Liver-function-test.png'
        },
        { 
          id: '7', 
          name: 'Kidney Function Tests', 
          description: 'Renal function panel including creatinine, BUN, and electrolytes',
          details: 'Measures creatinine, Blood Urea Nitrogen (BUN), and electrolyte levels to assess kidney function. Essential for detecting kidney disease, monitoring kidney health, and evaluating treatment effectiveness.',
          preparation: 'Fasting not required. Stay well hydrated.',
          duration: 'Results in 4-6 hours',
          price: '₹550 onwards',
          image: '/kidney function.webp'
        },
        { 
          id: '8', 
          name: 'Hormone Tests', 
          description: 'Comprehensive hormone testing for various endocrine disorders',
          details: 'Comprehensive hormone panel including cortisol, growth hormone, sex hormones, and other endocrine markers. Essential for diagnosing hormonal imbalances, fertility issues, and endocrine disorders.',
          preparation: 'Specific preparation depends on the hormone being tested. Follow doctor\'s instructions.',
          duration: 'Results in 24-48 hours',
          price: '₹1000 onwards',
          image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop'
        },
      ],
    },
    {
      id: 'cardiology',
      title: 'Cardiology',
      description: 'Complete cardiac care with ECG, Echo, and stress tests performed by experienced cardiologists',
      icon: Heart,
      image: galleryImage3,
      tests: [
        { 
          id: '1', 
          name: 'ECG (Electrocardiogram)', 
          description: 'Recording of electrical activity of the heart to detect heart rhythm abnormalities',
          details: 'ECG records the electrical signals of your heart to detect irregular heartbeats, heart attacks, and other cardiac conditions. Quick, painless, and non-invasive test that takes just a few minutes.',
          preparation: 'No special preparation. Avoid caffeine and smoking before the test.',
          duration: '5-10 minutes',
          price: '₹300 onwards',
          image: '/ecg.webp'
        },
        { 
          id: '2', 
          name: 'Echocardiogram', 
          description: 'Ultrasound of the heart to visualize structure and function',
          details: 'Echocardiogram uses ultrasound waves to create detailed images of your heart\'s structure, valves, and pumping function. Essential for diagnosing heart valve problems, heart failure, and congenital heart defects.',
          preparation: 'No special preparation required.',
          duration: '30-45 minutes',
          price: '₹2000 onwards',
          image: '/echocardiogram.png'
        },
        { 
          id: '3', 
          name: 'Stress Test', 
          description: 'Exercise stress test to evaluate heart function under physical stress',
          details: 'Stress test monitors your heart\'s response to physical exercise. Helps diagnose coronary artery disease, evaluate exercise capacity, and assess the effectiveness of heart treatments. Performed on a treadmill or stationary bike.',
          preparation: 'Fasting for 2-3 hours. Wear comfortable clothing and shoes. Avoid caffeine.',
          duration: '30-60 minutes',
          price: '₹2500 onwards',
          image: '/stress test.jpg'
        },
        { 
          id: '4', 
          name: 'Holter Monitoring', 
          description: '24-48 hour continuous ECG monitoring for intermittent heart rhythm issues',
          details: 'Holter monitor is a portable device that continuously records your heart\'s electrical activity for 24-48 hours. Essential for detecting irregular heartbeats that occur intermittently and may not show up during a regular ECG.',
          preparation: 'No special preparation. Device will be attached and you can go about normal activities.',
          duration: '24-48 hours monitoring',
          price: '₹1500 onwards',
          image: '/holter monitoring.webp'
        },
        { 
          id: '5', 
          name: 'Cardiac Markers', 
          description: 'Blood tests including Troponin, CK-MB for heart attack diagnosis',
          details: 'Cardiac marker tests measure specific proteins in the blood that indicate heart muscle damage. Essential for diagnosing heart attacks, evaluating chest pain, and monitoring heart conditions. Includes Troponin, CK-MB, and other markers.',
          preparation: 'No special preparation. Can be done urgently if heart attack is suspected.',
          duration: 'Results in 1-2 hours',
          price: '₹800 onwards',
          image: '/cardiac markers.png'
        },
      ],
    },
    {
      id: 'health-packages',
      title: 'Health Packages',
      description: 'Customized health checkup packages designed for individuals and families',
      icon: Package,
      image: galleryImage1,
      tests: [
        { 
          id: '1', 
          name: 'Basic Health Checkup', 
          description: 'Essential tests for overall health screening including CBC, blood sugar, and basic tests',
          details: 'Includes Complete Blood Count (CBC), Blood Sugar (Fasting & PP), Lipid Profile, Liver Function Test, Kidney Function Test, and Urine Analysis. Perfect for annual health screening and basic health assessment.',
          preparation: 'Fasting for 8-12 hours required.',
          duration: '2-3 hours',
          price: '₹1500 onwards',
          image: '/basic health checkup.jpg'
        },
        { 
          id: '2', 
          name: 'Comprehensive Health Package', 
          description: 'Full body health checkup with extensive tests covering all major systems',
          details: 'Comprehensive package includes all basic tests plus Thyroid Function, Diabetes Profile, Vitamin D, B12, Complete Lipid Profile, ECG, Chest X-ray, and detailed consultation. Complete health assessment covering all major systems.',
          preparation: 'Fasting for 8-12 hours required. Follow specific test instructions.',
          duration: '3-4 hours',
          price: '₹3500 onwards',
          image: '/comprehensive health check up.jpg'
        },
        { 
          id: '3', 
          name: 'Executive Health Package', 
          description: 'Premium health checkup designed for busy professionals with priority service',
          details: 'Premium package with priority service, includes comprehensive tests, advanced cardiac screening, stress management evaluation, nutritional counseling, and detailed health report with recommendations. Designed for busy professionals.',
          preparation: 'Fasting for 8-12 hours required.',
          duration: '4-5 hours with consultation',
          price: '₹5000 onwards',
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'
        },
        { 
          id: '4', 
          name: 'Women\'s Health Package', 
          description: 'Comprehensive package tailored for women including gynecological and hormonal tests',
          details: 'Specialized package for women including hormonal profile, gynecological tests, breast health screening, bone density test, and comprehensive health assessment. Tailored to address women\'s specific health needs.',
          preparation: 'Fasting for 8-12 hours. Specific instructions for gynecological tests.',
          duration: '3-4 hours',
          price: '₹4000 onwards',
          image: '/womens health.jpg'
        },
        { 
          id: '5', 
          name: 'Senior Citizen Package', 
          description: 'Specialized health package for elderly with age-appropriate screening tests',
          details: 'Comprehensive health package designed for seniors including cardiac screening, bone health, vision and hearing tests, cognitive assessment, and age-appropriate cancer screening. Focuses on common age-related health concerns.',
          preparation: 'Fasting for 8-12 hours. May require multiple visits.',
          duration: '4-5 hours',
          price: '₹4500 onwards',
          image: '/senior citizen.jpg'
        },
        { 
          id: '6', 
          name: 'Pre-Marital Health Package', 
          description: 'Essential health screening for couples before marriage',
          details: 'Essential health screening for couples including blood group, Rh factor, complete blood count, infectious disease screening, genetic counseling, and fertility assessment. Ensures healthy start to married life.',
          preparation: 'Fasting for 8-12 hours required.',
          duration: '2-3 hours per person',
          price: '₹2500 onwards per person',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop'
        },
      ],
    },
  ];

  const toggleService = (serviceId: string) => {
    const wasExpanded = expandedService === serviceId;
    setExpandedService(wasExpanded ? null : serviceId);
    
    // Track which service was just toggled
    if (!wasExpanded) {
      setLastToggledService(serviceId);
    }
  };

  // Animation observers for Why Choose section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observer for Why Choose header
    if (whyChooseRef.current) {
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

      const headerElement = whyChooseRef.current.querySelector('.why-choose-header');
      if (headerElement) {
        headerObserver.observe(headerElement);
        observers.push(headerObserver);
      }
    }

    // Observers for Why Choose items
    whyChooseItemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setWhyChooseVisible((prev) => new Set([...prev, index]));
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

    // Observer for CTA section
    if (ctaRef.current) {
      const ctaObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCtaVisible(true);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      ctaObserver.observe(ctaRef.current);
      observers.push(ctaObserver);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Scroll to expanded service smoothly after content loads
  useEffect(() => {
    if (expandedService && lastToggledService === expandedService) {
      const serviceElement = serviceRefs.current[expandedService];
      if (serviceElement) {
        // Small delay to ensure DOM has updated with expanded content
        setTimeout(() => {
          // Get the button element (the clickable header)
          const buttonElement = serviceElement.querySelector('button');
          if (buttonElement) {
            const isMobile = window.innerWidth < 768;
            // Calculate offset to account for sticky header
            const headerOffset = isMobile ? 80 : 80; // Header height
            const elementPosition = buttonElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Only scroll if the element is not already fully visible
            const rect = buttonElement.getBoundingClientRect();
            const isVisible = rect.top >= headerOffset && rect.bottom <= window.innerHeight;
            
            if (!isVisible) {
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        }, 150);
        setLastToggledService(null); // Reset after scrolling
      }
    }
  }, [expandedService, lastToggledService]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section for Services Page */}
      <section 
        className="relative text-white py-16 md:py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-primary-green bg-opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
              Our Diagnostic Services
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed font-light" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
              Comprehensive medical diagnostic services with state-of-the-art technology and expert medical professionals
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Services Page Image */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg max-w-6xl mx-auto">
            <img
              src="/services page image 1.png"
              alt="Modern Medical Laboratory"
              className="w-full h-[220px] md:h-[320px] lg:h-[380px] object-cover transition-transform duration-300 hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          {/* Services Categories */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isExpanded = expandedService === service.id;

              return (
                <div
                  key={service.id}
                  ref={(el) => (serviceRefs.current[service.id] = el)}
                  className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* Service Header */}
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 bg-gradient-to-r from-beige-bg to-white hover:from-primary-green hover:to-primary-green group transition-all duration-300 text-left relative overflow-hidden"
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        backgroundImage: `url(${service.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                    <div className="flex items-center gap-6 flex-1 relative z-10">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-green group-hover:bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:text-primary-green transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-text-dark group-hover:text-white mb-2 transition-colors duration-300">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 group-hover:text-white text-base md:text-lg transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-6 w-6 md:h-8 md:w-8 text-primary-green group-hover:text-white transition-colors duration-300" />
                      ) : (
                        <ChevronDown className="h-6 w-6 md:h-8 md:w-8 text-primary-green group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                  </button>

                  {/* Tests List - Expandable */}
                  {isExpanded && (
                    <div className="p-6 md:p-8 bg-white">
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {service.tests.map((test) => {
                          return (
                          <div
                            key={test.id}
                              className="border-2 border-gray-100 rounded-lg overflow-hidden hover:border-primary-green hover:shadow-lg transition-all duration-300 bg-white group"
                            >
                              {/* Test Image */}
                              {test.image && (
                                <div className="w-full h-48 overflow-hidden bg-gray-100">
                                  <img 
                                    src={test.image} 
                                    alt={test.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      // Fallback if image fails to load
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              
                              <div className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                              <CheckCircle className="h-5 w-5 text-primary-green flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors">
                                  {test.name}
                                </h3>
                              </div>
                            </div>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                              {test.description}
                            </p>
                              
                              {/* Read More Button */}
                              {test.details && (
                                <div className="mb-4">
                                  <Link
                                    to="/test-details"
                                    state={{ test, service: service.title }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-primary-green hover:text-primary-green/80 font-semibold text-sm flex items-center gap-1 transition-colors mb-3 inline-flex"
                                  >
                                    Read More <ChevronDown className="h-4 w-4" />
                                  </Link>
                                </div>
                              )}
                              
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/book-appointment', {
                                  state: {
                                    selectedService: service.title,
                                    selectedTest: test.name
                                  }
                                });
                              }}
                              className="w-full mt-2 bg-primary-green text-white px-4 py-2.5 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                              <Calendar className="h-4 w-4" />
                              Book Test
                            </button>
                          </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Features Section */}
          <div ref={whyChooseRef} className="mt-16 max-w-6xl mx-auto">
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
                  transform: scale(0.7);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
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
                transform: scale(0.7);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
              }

              .scale-in-delay.visible {
                opacity: 1;
                transform: scale(1);
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              .animate-fade-in {
                animation: fadeIn 0.4s ease-out forwards;
              }
            `}</style>
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="why-choose-header text-3xl md:text-4xl font-bold text-center text-text-dark mb-12 opacity-0">
                Why Choose Our Diagnostic Services?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div 
                  ref={(el) => { whyChooseItemRefs.current[0] = el; }}
                  className={`text-center fade-in-up-delay ${whyChooseVisible.has(0) ? 'visible' : ''}`}
                  style={{ transitionDelay: whyChooseVisible.has(0) ? '0ms' : '0ms' }}
                >
                  <div
                    className={`w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 scale-in-delay transform transition-transform duration-300 hover:scale-110 ${whyChooseVisible.has(0) ? 'visible' : ''}`}
                    style={{ transitionDelay: whyChooseVisible.has(0) ? '150ms' : '0ms' }}
                  >
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">Advanced Technology</h3>
                  <p className="text-gray-600">State-of-the-art equipment for accurate and reliable test results</p>
                </div>
                <div 
                  ref={(el) => { whyChooseItemRefs.current[1] = el; }}
                  className={`text-center fade-in-up-delay ${whyChooseVisible.has(1) ? 'visible' : ''}`}
                  style={{ transitionDelay: whyChooseVisible.has(1) ? '150ms' : '0ms' }}
                >
                  <div
                    className={`w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 scale-in-delay transform transition-transform duration-300 hover:scale-110 ${whyChooseVisible.has(1) ? 'visible' : ''}`}
                    style={{ transitionDelay: whyChooseVisible.has(1) ? '300ms' : '0ms' }}
                  >
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">Expert Team</h3>
                  <p className="text-gray-600">Experienced medical professionals and certified technicians</p>
                </div>
                <div 
                  ref={(el) => { whyChooseItemRefs.current[2] = el; }}
                  className={`text-center fade-in-up-delay ${whyChooseVisible.has(2) ? 'visible' : ''}`}
                  style={{ transitionDelay: whyChooseVisible.has(2) ? '300ms' : '0ms' }}
                >
                  <div
                    className={`w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 scale-in-delay transform transition-transform duration-300 hover:scale-110 ${whyChooseVisible.has(2) ? 'visible' : ''}`}
                    style={{ transitionDelay: whyChooseVisible.has(2) ? '450ms' : '0ms' }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">Quick Results</h3>
                  <p className="text-gray-600">Fast turnaround times with online report access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div 
            ref={ctaRef}
            className={`mt-12 max-w-4xl mx-auto bg-gradient-to-r from-primary-green to-primary-green rounded-xl shadow-xl p-8 md:p-12 text-white text-center transition-all duration-700 ${
              ctaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Need Help Choosing the Right Test?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Our medical professionals are here to guide you. Contact us for personalized recommendations and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917306440844"
                className="inline-flex items-center justify-center bg-white text-primary-green px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                Call Now
              </a>
              <a
                href="/book-appointment"
                className="inline-flex items-center justify-center bg-primary-green border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
