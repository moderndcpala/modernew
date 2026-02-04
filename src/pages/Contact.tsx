import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import galleryImage1 from '../assets/Gallery Image 1.png';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <section
          className="relative text-white"
          style={{
            backgroundImage: `url(${galleryImage1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] opacity-90 mb-3">
                Get in touch
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-hero font-bold tracking-tight">
                Contact Modern Diagnostic Centre
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90">
                We are here to help with appointments, reports, and general inquiries.
                Reach out anytime and our team will respond promptly.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-text-dark mb-5">
                  Contact Details
                </h2>
                <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary-green mt-1" />
                    <div className="flex flex-col">
                      <a href="tel:+914822201874" className="hover:text-primary-green">
                        04822-201874
                      </a>
                      <a href="tel:+919495508847" className="hover:text-primary-green">
                        9495-508-847
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary-green mt-1" />
                    <a
                      href="mailto:moderndcpala@gmail.com"
                      className="hover:text-primary-green"
                    >
                      moderndcpala@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary-green mt-1" />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=1st+Floor,+Puthumana+Towers,+Near+Government+Hospital+Junction,+Pala+Town,+Kottayam-686575,+Kerala"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-green"
                    >
                      1st Floor, Puthumana Towers,
                      <br />
                      Near Government Hospital Junction,
                      <br />
                      Pala Town, Kottayam-686575, Kerala
                      <br />
                      PIN: 686575
                    </a>
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1st+Floor,+Puthumana+Towers,+Near+Government+Hospital+Junction,+Pala+Town,+Kottayam-686575,+Kerala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-primary-green px-5 py-3 text-sm font-semibold text-primary-green hover:bg-primary-green hover:text-white transition-all duration-200"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-text-dark mb-5">
                  Working Hours
                </h2>
                <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary-green mt-1" />
                    <span>
                      Daily: 6:30 AM - 6:00 PM
                    </span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-green px-5 py-3 text-sm font-semibold text-white hover:bg-opacity-90 transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Link>
                  <a
                    href="tel:+917306440844"
                    className="inline-flex items-center justify-center rounded-full border border-primary-green px-5 py-3 text-sm font-semibold text-primary-green hover:bg-primary-green hover:text-white transition-all duration-200"
                  >
                    Call Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;


