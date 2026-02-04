import yearsImage from '../assets/25years.png';
import galleryImage4 from '../assets/Gallery Image 4.png';

const About = () => {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark mb-4 md:mb-6">
              About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="order-1">
              <div className="space-y-5 md:space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  <span className="font-semibold text-text-dark">Modern Diagnostic Centre - Pala</span> has been serving the community with excellence
                  and dedication for over <span className="font-semibold text-text-dark">25 years</span>. We are committed to providing accurate,
              reliable, and timely diagnostic services using state-of-the-art equipment
              and highly qualified medical professionals.
            </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Our center is equipped with advanced medical imaging and laboratory
              facilities, ensuring that every patient receives the highest standard of care.
              We prioritize patient comfort, confidentiality, and precision in all our services.
            </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Trust us for all your diagnostic needs, and experience the difference that
              quality healthcare makes.
            </p>
              </div>
          </div>

            {/* Right Column - Images */}
            <div className="order-2 lg:order-2">
              <div className="flex flex-col gap-6 md:gap-8 items-center lg:items-end">
                {/* 25 Years Image */}
                <div className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[220px] transform hover:scale-105 transition-transform duration-300">
            <img 
              src={yearsImage} 
              alt="25 Years of Trust & Care" 
              loading="lazy"
                    className="w-full h-auto rounded-xl shadow-xl object-contain"
                  />
                </div>
                {/* Facility Image */}
                <div className="w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src={galleryImage4} 
                    alt="Modern Diagnostic Centre" 
                    loading="lazy"
                    className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;




