import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import galleryImage1 from '../assets/Gallery Image 1.png';
import galleryImage2 from '../assets/Gallery Image 2.webp';
import galleryImage3 from '../assets/Gallery Image 3.webp';
import galleryImage4 from '../assets/Gallery Image 4.png';
import galleryImage5 from '../assets/Gallery Image 5.webp';
import galleryImage6 from '../assets/Gallery Image 6.webp';
import galleryImage7 from '../assets/Gallery Image 7.webp';
import galleryImage8 from '../assets/Gallery Image 8.webp';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      title: 'Reception Area',
      description: 'Our modern reception area with comfortable seating',
      image: galleryImage1,
    },
    {
      id: 2,
      title: 'Main Reception',
      description: 'Spacious reception desk with professional service',
      image: galleryImage2,
    },
    {
      id: 3,
      title: 'Waiting Area',
      description: 'Comfortable waiting space with modern design',
      image: galleryImage3,
    },
    {
      id: 4,
      title: 'Sample Collection',
      description: 'Dedicated sample collection counter',
      image: galleryImage4,
    },
    {
      id: 5,
      title: 'Reception Desk',
      description: 'Our welcoming reception area',
      image: galleryImage5,
    },
    {
      id: 6,
      title: 'Waiting Lounge',
      description: 'Modern waiting area with comfortable seating',
      image: galleryImage6,
    },
    {
      id: 7,
      title: 'Facility Interior',
      description: 'Bright and welcoming interior spaces',
      image: galleryImage7,
    },
    {
      id: 8,
      title: 'Reception View',
      description: 'Professional reception area view',
      image: galleryImage8,
    },
  ];

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft' && selectedImage > 1) {
        setSelectedImage(selectedImage - 1);
      } else if (e.key === 'ArrowRight' && selectedImage < galleryImages.length) {
        setSelectedImage(selectedImage + 1);
      }
    };

    // Prevent body scroll when modal is open
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, galleryImages.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our modern diagnostic centre and see our state-of-the-art facilities
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* Actual Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover aspect-square"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary-green bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center px-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Modal/Lightbox */}
          {selectedImage !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Previous Button */}
              {selectedImage > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
              )}

              {/* Next Button */}
              {selectedImage < galleryImages.length && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage + 1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              )}

              {/* Zoomed Image */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              >
                <img
                  src={galleryImages[selectedImage - 1].image}
                  alt={galleryImages[selectedImage - 1].title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-1">
                    {galleryImages[selectedImage - 1].title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {galleryImages[selectedImage - 1].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              For more information about our facilities, please{' '}
              <a href="#contact" className="text-primary-green hover:underline font-medium">
                contact us
              </a>
              {' '}or{' '}
              <a href="/book-appointment" className="text-primary-green hover:underline font-medium">
                book an appointment
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;

