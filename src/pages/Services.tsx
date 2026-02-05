import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Activity, Heart, FileText, Package, ChevronDown, ChevronUp, CheckCircle, Calendar, Cpu, Stethoscope, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    price?: string;
    testsList?: string[];
    originalPrice?: string;
    discountedPrice?: string;
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
          image: '/xray.jpg'
        },
        { 
          id: '2', 
          name: 'Ultrasound', 
          description: 'Safe, non-invasive imaging using sound waves for pregnancy, abdomen, and more',
          details: 'Ultrasound imaging is completely safe with no radiation. Perfect for pregnancy monitoring, abdominal organ evaluation, and vascular studies. Real-time imaging allows immediate assessment and guidance.',
          preparation: 'Fasting may be required for abdominal scans. Drink water for pelvic/obstetric scans.',
          image: '/ultrasound.png'
        },
        { 
          id: '3', 
          name: 'Mammography', 
          description: 'Breast imaging for early detection of breast cancer and abnormalities',
          details: 'Digital mammography with advanced imaging technology for early breast cancer detection. Our low-dose digital mammography provides clear images with minimal discomfort. Essential for women over 40 and those with family history.',
          preparation: 'Avoid deodorant, lotions, or powders on the day of examination.',
          image: '/mammography.jpg'
        },
        { 
          id: '4', 
          name: 'Bone Densitometry', 
          description: 'Bone density testing to diagnose osteoporosis and assess fracture risk',
          details: 'DEXA scan measures bone mineral density to diagnose osteoporosis and assess fracture risk. Quick, painless, and uses minimal radiation. Recommended for postmenopausal women and those at risk of bone loss.',
          preparation: 'No special preparation. Avoid calcium supplements 24 hours before the test.',
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
          id: 'stool-ph-test', 
          name: 'Stool pH Test', 
          description: 'Digestive health assessment measuring stool acidity or alkalinity.',
          details: 'Stool pH Test helps assess digestive health by measuring stool acidity or alkalinity. It can indicate malabsorption, bacterial overgrowth, or dietary imbalances that affect gut function.',
          preparation: 'No special preparation required. Follow collection instructions provided by the lab.',
          image: '/stool ph test.png'
        },
        { 
          id: '1', 
          name: 'Complete Blood Count (CBC)', 
          description: 'Complete blood analysis including red cells, white cells, and platelets',
          details: 'CBC is one of the most common blood tests that evaluates your overall health. It measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for detecting anemia, infections, bleeding disorders, and various other conditions.',
          preparation: 'Fasting not required. Can be done at any time.',
          image: '/complete-blood-count.jpg'
        },
        { 
          id: '2', 
          name: 'Blood Chemistry Panel', 
          description: 'Comprehensive metabolic panel to assess organ function and overall health',
          details: 'Comprehensive metabolic panel evaluates kidney function, liver function, electrolyte balance, blood sugar, and protein levels. Provides a complete picture of your metabolic health and organ function.',
          preparation: 'Fasting for 8-12 hours required. Only water allowed.',
          image: '/blood chemistry panel.webp'
        },
        { 
          id: '3', 
          name: 'Lipid Profile', 
          description: 'Cholesterol and triglyceride levels to assess cardiovascular health',
          details: 'Measures total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. Essential for assessing cardiovascular risk and monitoring heart health. Recommended annually for adults over 20.',
          preparation: 'Fasting for 12 hours required. Avoid fatty foods the day before.',
          image: '/lipid profile.jpg'
        },
        { 
          id: '5', 
          name: 'Thyroid Function Tests', 
          description: 'TSH, T3, T4 levels to evaluate thyroid gland function',
          details: 'Measures Thyroid Stimulating Hormone (TSH), T3, and T4 levels to evaluate thyroid function. Essential for diagnosing hypothyroidism, hyperthyroidism, and monitoring thyroid treatment.',
          preparation: 'Fasting not required. Can be done at any time.',
          image: '/thyroid function.jpg'
        },
        { 
          id: '6', 
          name: 'Liver Function Tests', 
          description: 'Comprehensive panel to assess liver health and detect liver diseases',
          details: 'Comprehensive panel including ALT, AST, ALP, bilirubin, and protein levels. Evaluates liver health, detects liver damage, inflammation, and monitors treatment of liver diseases.',
          preparation: 'Fasting for 8-12 hours recommended. Avoid alcohol 24 hours before.',
          image: '/Liver-function-test.png'
        },
        { 
          id: '7', 
          name: 'Kidney Function Tests', 
          description: 'Renal function panel including creatinine, BUN, and electrolytes',
          details: 'Measures creatinine, Blood Urea Nitrogen (BUN), and electrolyte levels to assess kidney function. Essential for detecting kidney disease, monitoring kidney health, and evaluating treatment effectiveness.',
          preparation: 'Fasting not required. Stay well hydrated.',
          image: '/kidney function.webp'
        },
        { 
          id: '8', 
          name: 'Hormone Tests', 
          description: 'Comprehensive hormone testing for various endocrine disorders',
          details: 'Comprehensive hormone panel including cortisol, growth hormone, sex hormones, and other endocrine markers. Essential for diagnosing hormonal imbalances, fertility issues, and endocrine disorders.',
          preparation: 'Specific preparation depends on the hormone being tested. Follow doctor\'s instructions.',
          image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop'
        },
      ],
    },
    {
      id: 'cardiology',
      title: 'Cardiology',
      description: 'Complete cardiac care with ECG and advanced heart monitoring by experienced cardiologists',
      icon: Heart,
      image: galleryImage3,
      tests: [
        { 
          id: '1', 
          name: 'ECG (Electrocardiogram)', 
          description: 'Recording of electrical activity of the heart to detect heart rhythm abnormalities',
          details: 'ECG records the electrical signals of your heart to detect irregular heartbeats, heart attacks, and other cardiac conditions. Quick, painless, and non-invasive test that takes just a few minutes.',
          preparation: 'No special preparation. Avoid caffeine and smoking before the test.',
          image: '/ecg.webp'
        },
        { 
          id: '2', 
          name: 'Holter Monitoring', 
          description: '24-48 hour continuous ECG monitoring for intermittent heart rhythm issues',
          details: 'Holter monitor is a portable device that continuously records your heart\'s electrical activity for 24-48 hours. Essential for detecting irregular heartbeats that occur intermittently and may not show up during a regular ECG.',
          preparation: 'No special preparation. Device will be attached and you can go about normal activities.',
          image: '/holter monitoring.webp'
        },
        { 
          id: '3', 
          name: 'Cardiac Markers', 
          description: 'Blood tests including Troponin, CK-MB for heart attack diagnosis',
          details: 'Cardiac marker tests measure specific proteins in the blood that indicate heart muscle damage. Essential for diagnosing heart attacks, evaluating chest pain, and monitoring heart conditions. Includes Troponin, CK-MB, and other markers.',
          preparation: 'No special preparation. Can be done urgently if heart attack is suspected.',
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
          name: 'Modern Health',
          description: 'Essential screening package for routine health monitoring.',
          details:
            'Package includes FBS, Lipid Profile, Creatinine, SGOT, SGPT, BP, and Hemoglobin.',
          image: '/modern health.jpg',
          testsList: [
            'FBS',
            'Lipid Profile',
            'Creatinine',
            'SGOT',
            'SGPT',
            'BP',
            'Hemoglobin',
          ],
          originalPrice: '₹740',
          discountedPrice: '₹600',
        },
        {
          id: '2',
          name: 'Modern Health 1',
          description: 'Expanded screening package with cardiac assessment.',
          details:
            'Package includes FBS/RBS, Lipid Profile, Urea/Creatinine, Uric Acid, Liver Function Test, Haemogram, ECG, and BP.',
          image: '/modern health 1.jpeg',
          testsList: [
            'FBS/RBS',
            'Lipid Profile',
            'Urea/Creatinine',
            'Uric Acid',
            'Liver Function Test',
            'Haemogram',
            'ECG',
            'BP',
          ],
          originalPrice: '₹1500',
          discountedPrice: '₹1300',
        },
        {
          id: '3',
          name: 'Master Health Checkup',
          description: 'Comprehensive health package covering key systems.',
          details:
            'Package includes FBS, PPBS, HbA1c, Urea, Creatinine, Uric Acid, Lipid Profile, Liver Function Test, Calcium, Electrolytes, TSH, Vitamin D3, Haemogram, Urine Routine, ECG, and BP.',
          image: '/Master Health Checkup.jpg',
          testsList: [
            'FBS',
            'PPBS',
            'HbA1c',
            'Urea',
            'Creatinine',
            'Uric Acid',
            'Lipid Profile',
            'Liver Function Test',
            'Calcium',
            'Electrolytes',
            'TSH',
            'Vitamin D3',
            'Haemogram',
            'Urine Routine',
            'ECG',
            'BP',
          ],
          originalPrice: '₹3560',
          discountedPrice: '₹3100',
        },
        {
          id: '4',
          name: 'Diabetic Profile',
          description: 'Focused package for diabetic monitoring and risk assessment.',
          details:
            'Package includes FBS, PPBS, HbA1c, Microalbumin, Lipid Profile, Renal Function Test, Urine Routine, ECG, and BP.',
          image: '/daibetic.webp',
          testsList: [
            'FBS',
            'PPBS',
            'HbA1c',
            'Microalbumin',
            'Lipid Profile',
            'Renal Function Test',
            'Urine Routine',
            'ECG',
            'BP',
          ],
          originalPrice: '₹1550',
          discountedPrice: '₹1300',
        },
        {
          id: '5',
          name: 'Women Health Care',
          description: 'Women-specific package with hormonal and nutritional screening.',
          details:
            'Package includes FBS/RBS, Thyroid Function Test, Vitamin D3, Calcium, Sodium/Potassium, Liver Function Test, Lipid Profile, Renal Function Test, Iron Profile, Haemogram, and BP.',
          image: '/womens health.jpg',
          testsList: [
            'FBS/RBS',
            'Thyroid Function Test',
            'Vitamin D3',
            'Calcium',
            'Sodium/Potassium',
            'Liver Function Test',
            'Lipid Profile',
            'Renal Function Test',
            'Iron Profile',
            'Haemogram',
            'BP',
          ],
          originalPrice: '₹3710',
          discountedPrice: '₹3300',
        },
        {
          id: '6',
          name: 'Cardiac Panel',
          description: 'Cardiac screening package for heart health assessment.',
          details:
            'Package includes Haemogram, Lipid Profile, Troponin-I, ECG, and CPK-MB.',
          image: '/cardiac panel.jpg',
          testsList: [
            'Haemogram',
            'Lipid Profile',
            'Troponin-I',
            'ECG',
            'CPK-MB',
          ],
          originalPrice: '₹2010',
          discountedPrice: '₹1800',
        },
        {
          id: '7',
          name: 'Executive Health Checkup',
          description: 'Extensive screening package with imaging and cardiac review.',
          details:
            'Package includes FBS, PPBS, HbA1c, Lipid Profile, Liver Function Test, Renal Function Test, Electrolytes, Uric Acid, Calcium, RA, Thyroid Function Test, Vitamin D3, Haemogram, Urine Routine, ECG, and Chest X-Ray.',
          image: '/executive health check up.jpg',
          testsList: [
            'FBS',
            'PPBS',
            'HbA1c',
            'Lipid Profile',
            'Liver Function Test',
            'Renal Function Test',
            'Electrolytes',
            'Uric Acid',
            'Calcium',
            'RA',
            'Thyroid Function Test',
            'Vitamin D3',
            'Haemogram',
            'Urine Routine',
            'ECG',
            'Chest X-Ray',
          ],
          originalPrice: '₹4200',
          discountedPrice: '₹3800',
        },
        {
          id: '8',
          name: 'Full Body Checkup',
          description: 'Complete body evaluation for comprehensive wellness screening.',
          details:
            'Package includes FBS, PPBS, HbA1c, Lipid Profile, Liver Function Test, Renal Function Test, Uric Acid, Calcium, Magnesium, Electrolytes, Urine Microalbumin, TFT/PSA, Vitamin D3, RA Titre, Haemogram, Peripheral Smear, BMI, ECG, and X-Ray.',
          image: '/full body checkup.jpg',
          testsList: [
            'FBS',
            'PPBS',
            'HbA1c',
            'Lipid Profile',
            'Liver Function Test',
            'Renal Function Test',
            'Uric Acid',
            'Calcium',
            'Magnesium',
            'Electrolytes',
            'Urine Microalbumin',
            'TFT/PSA',
            'Vitamin D3',
            'RA Titre',
            'Haemogram',
            'Peripheral Smear',
            'BMI',
            'ECG',
            'X-Ray',
          ],
          originalPrice: '₹5140',
          discountedPrice: '₹4600',
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
      <style>{`
        @keyframes serviceImageEnter {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .service-image-animate {
          opacity: 0;
        }

        .service-image-animate.is-loaded {
          animation: serviceImageEnter 0.6s ease-out forwards;
        }
      `}</style>
      <Header />
      
      {/* Hero Section for Services Page */}
      <section 
        className="relative text-white py-16 md:py-20 overflow-hidden"
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
              loading="lazy"
              className="service-image-animate w-full h-[220px] md:h-[320px] lg:h-[380px] object-cover transition-transform duration-300 hover:scale-[1.02]"
              onLoad={(e) => {
                e.currentTarget.classList.add('is-loaded');
              }}
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
                  ref={(el) => {
                    serviceRefs.current[service.id] = el;
                  }}
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {service.tests.map((test) => {
                          const isHealthPackages = service.id === 'health-packages';

                          return (
                          <div
                            key={test.id}
                              className={`border-2 border-gray-100 rounded-lg overflow-hidden hover:border-primary-green hover:shadow-lg transition-all duration-300 bg-white group h-full ${
                                isHealthPackages ? 'flex flex-col' : ''
                              }`}
                            >
                              {/* Test Image */}
                              {test.image && (
                                <div className={`w-full h-48 overflow-hidden bg-gray-100 ${isHealthPackages ? 'flex-shrink-0' : ''}`}>
                                  <img 
                                    src={test.image} 
                                    alt={test.name}
                                    loading="lazy"
                                    className="service-image-animate w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onLoad={(e) => {
                                      e.currentTarget.classList.add('is-loaded');
                                    }}
                                    onError={(e) => {
                                      // Fallback if image fails to load
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              
                              <div className={`p-5 ${isHealthPackages ? 'flex flex-col flex-1' : ''}`}>
                            <div className="flex items-start gap-3 mb-3">
                              <CheckCircle className="h-5 w-5 text-primary-green flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors">
                                  {test.name}
                                </h3>
                              </div>
                            </div>
                                <div className={isHealthPackages ? 'flex-1' : ''}>
                                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                              {test.description}
                            </p>

                              {test.testsList && (
                                <div className="mb-4">
                                  <p className="text-sm md:text-base font-semibold text-text-dark mb-2">
                                    Tests Included
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-700">
                                    {test.testsList.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                                </div>
                              
                              <div className={isHealthPackages ? 'mt-auto' : ''}>
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
                                
                              {test.originalPrice && test.discountedPrice && (
                                <div className="mt-2 mb-4 flex items-baseline gap-3">
                                  <span className="text-sm md:text-base text-gray-500 line-through">
                                    {test.originalPrice}
                                  </span>
                                  <span className="text-lg md:text-xl font-bold text-primary-green">
                                    {test.discountedPrice}
                                  </span>
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
                href="tel:+919846052152"
                className="inline-flex items-center justify-center bg-white text-primary-green px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                Call Now
              </a>
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center bg-primary-green border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;

