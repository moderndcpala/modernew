import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import video1 from '../assets/WhatsApp Video 2026-02-13 at 4.26.59 PM.mp4';
import video2 from '../assets/C3052_3_1.mp4';
import video3 from '../assets/C3052_3_2.mp4';
import video4 from '../assets/C3052_3_3.mp4';
import video5 from '../assets/C3052_3_4.mp4';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      title: 'Inauguration',
      description: 'Inauguration',
      image: '/welcome.webp',
    },
    {
      id: 2,
      title: 'Inauguration',
      description: 'Inauguration',
      image: '/welcome%202.webp',
    },
    {
      id: 3,
      title: 'Inauguration',
      description: 'Inauguration',
      image: '/welcome%203.webp',
    },
    {
      id: 4,
      title: 'Reception Area',
      description: 'Our modern reception area with comfortable seating',
      image: galleryImage1,
    },
    {
      id: 5,
      title: 'Main Reception',
      description: 'Spacious reception desk with professional service',
      image: galleryImage2,
    },
    {
      id: 6,
      title: 'Waiting Area',
      description: 'Comfortable waiting space with modern design',
      image: galleryImage3,
    },
    {
      id: 7,
      title: 'Sample Collection',
      description: 'Dedicated sample collection counter',
      image: galleryImage4,
    },
    {
      id: 8,
      title: 'Reception Desk',
      description: 'Our welcoming reception area',
      image: galleryImage5,
    },
    {
      id: 9,
      title: 'Waiting Lounge',
      description: 'Modern waiting area with comfortable seating',
      image: galleryImage6,
    },
    {
      id: 10,
      title: 'Facility Interior',
      description: 'Bright and welcoming interior spaces',
      image: galleryImage7,
    },
    {
      id: 11,
      title: 'Reception View',
      description: 'Professional reception area view',
      image: galleryImage8,
    },
  ];

  const galleryVideos = [
    { id: 1, title: 'Facility Tour', description: 'A walkthrough of our diagnostic centre', src: video1 },
    { id: 2, title: 'Our Team', src: video2 },
    { id: 3, title: 'Laboratory', src: video3 },
    { id: 4, title: 'Patient Care', src: video4 },
    { id: 5, title: 'Welcome to MDC Pala', src: video5 },
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
      <style>{`
        @keyframes galleryImageEnter {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .gallery-image-animate {
          opacity: 0;
          animation: galleryImageEnter 0.6s ease-out forwards;
        }
      `}</style>
      <Header />
      
      <main className="flex-grow bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our Modern Diagnostic Centre and see our state-of-the-art facilities
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
                  loading="lazy"
                  className="gallery-image-animate w-full h-full object-cover aspect-square"
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
                  loading="lazy"
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

          {/* Videos Section */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2 text-center">
              Videos
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Watch our facility tours and learn more about Modern Diagnostic Centre
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {galleryVideos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-lg shadow-md overflow-hidden bg-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-video bg-black">
                    <video
                      src={video.src}
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-text-dark">{video.title}</h3>
                    {video.description && <p className="text-sm text-gray-600 mt-2">{video.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              For more information about our facilities, please{' '}
              <Link to="/contact" className="text-primary-green hover:underline font-medium">
                contact us
              </Link>
              {' '}or{' '}
              <Link to="/book-appointment" className="text-primary-green hover:underline font-medium">
                book an appointment
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;



