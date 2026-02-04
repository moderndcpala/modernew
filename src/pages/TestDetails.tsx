import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, DollarSign, Info, CheckCircle } from 'lucide-react';

const TestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testData = location.state as {
    test: {
      id: string;
      name: string;
      description: string;
      details?: string;
      preparation?: string;
      price?: string;
      image?: string;
    };
    service: string;
  };

  if (!testData || !testData.test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-dark mb-4">Test Not Found</h1>
            <Link to="/services" className="text-primary-green hover:underline">
              Go back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { test, service } = testData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-green hover:text-primary-green/80 font-semibold transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Services
            </button>
          </div>
        </div>

        {/* Test Image Hero */}
        {test.image && (
          <div className="w-full h-64 md:h-96 overflow-hidden bg-gray-200">
            <img 
              src={test.image} 
              alt={test.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Default Hero Section if no image */}
        {!test.image && (
          <div className="w-full h-48 md:h-64 bg-gradient-to-r from-primary-green to-primary-green flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{test.name}</h2>
              <p className="text-lg opacity-90">{service}</p>
            </div>
          </div>
        )}

        {/* Test Details Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-primary-green uppercase tracking-wide mb-2 block">
                    {service}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 leading-tight">
                    {test.name}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {test.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            {test.details && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="h-6 w-6 text-primary-green flex-shrink-0 mt-1" />
                  <h2 className="text-2xl md:text-3xl font-bold text-text-dark">Test Details</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {test.details}
                </p>
              </div>
            )}

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {test.preparation && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="h-6 w-6 text-primary-green" />
                    <h3 className="text-xl font-bold text-text-dark">Preparation</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{test.preparation}</p>
                </div>
              )}

              {test.price && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-6 w-6 text-primary-green" />
                    <h3 className="text-xl font-bold text-text-dark">Pricing</h3>
                  </div>
                  <p className="text-primary-green font-bold text-2xl">{test.price}</p>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary-green to-primary-green rounded-xl shadow-lg p-6 md:p-8 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Book This Test?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Schedule your appointment today and get accurate results quickly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/book-appointment"
                  state={{ selectedService: service, selectedTest: test.name }}
                  className="inline-flex items-center justify-center bg-white text-primary-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
                <a
                  href="tel:+917306440844"
                  className="inline-flex items-center justify-center bg-primary-green border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestDetails;
