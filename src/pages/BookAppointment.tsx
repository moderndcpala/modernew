import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Phone, Mail, Activity, Calendar, Clock, CheckCircle2, Send, FileCheck } from 'lucide-react';

// Define service-to-tests mapping
const serviceTestsMap: { [key: string]: string[] } = {
  'Radiology': [
    'X-Ray',
    'CT Scan',
    'MRI',
    'Ultrasound',
    'Mammography',
    'Bone Densitometry',
  ],
  'Pathology': [
    'Complete Blood Count (CBC)',
    'Blood Chemistry Panel',
    'Lipid Profile',
    'Diabetes Profile',
    'Thyroid Function Tests',
    'Liver Function Tests',
    'Kidney Function Tests',
    'Hormone Tests',
  ],
  'Cardiology': [
    'ECG (Electrocardiogram)',
    'Echocardiogram',
    'Stress Test',
    'Holter Monitoring',
    'Cardiac Markers',
  ],
  'Health Packages': [
    'Basic Health Checkup',
    'Comprehensive Health Package',
    'Executive Health Package',
    'Women\'s Health Package',
    'Senior Citizen Package',
    'Pre-Marital Health Package',
  ],
};

const BookAppointment = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    specificTests: [] as string[],
    date: '',
    time: '',
  });

  const services = [
    'Radiology',
    'Pathology',
    'Cardiology',
    'Health Packages',
  ];

  // Get available tests based on selected service
  const availableTests = formData.service ? (serviceTestsMap[formData.service] || []) : [];

  // Auto-select service and test when coming from Services page
  useEffect(() => {
    if (location.state) {
      const { selectedService, selectedTest } = location.state as { selectedService?: string; selectedTest?: string };
      
      if (selectedService) {
        setFormData((prev) => ({
          ...prev,
          service: selectedService,
          specificTests: selectedTest ? [selectedTest] : [],
        }));
        
        // Scroll to form after a short delay to ensure DOM is updated
        setTimeout(() => {
          const formElement = document.querySelector('form');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // If service changes, clear selected tests
      if (name === 'service') {
        return {
          ...prev,
          [name]: value,
          specificTests: [], // Clear tests when service changes
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTestToggle = (test: string) => {
    setFormData((prev) => ({
      ...prev,
      specificTests: prev.specificTests.includes(test)
        ? prev.specificTests.filter((t) => t !== test)
        : [...prev.specificTests, test],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one test is selected when service is selected
    if (formData.service && formData.specificTests.length === 0) {
      alert('Please select at least one test for the selected service.');
      return;
    }
    
    // Format booking details
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const formatTime = (timeString: string) => {
      if (!timeString) return 'Not specified';
      const [hours, minutes] = timeString.split(':');
      const hour12 = parseInt(hours) % 12 || 12;
      const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    };

    const testsList = formData.specificTests.length > 0 
      ? formData.specificTests.join(', ') 
      : 'Not specified';

    // Format message for email and WhatsApp - Professional format
    const bookingMessage = `*NEW APPOINTMENT BOOKING REQUEST*
Modern Diagnostic Centre - Pala

═══════════════════════════════════

*PATIENT INFORMATION*
═══════════════════════════════════
Full Name: ${formData.fullName}
Contact Number: ${formData.phone}
Email Address: ${formData.email}

═══════════════════════════════════

*SERVICE REQUESTED*
═══════════════════════════════════
Service Category: ${formData.service}
Selected Tests: ${testsList}

═══════════════════════════════════

*PREFERRED APPOINTMENT*
═══════════════════════════════════
Date: ${formatDate(formData.date)}
Time: ${formatTime(formData.time)}

═══════════════════════════════════

Thank you for choosing Modern Diagnostic Centre.
We will contact you shortly to confirm your appointment.

_This is an automated booking request from our website._`;

    // Admin contact details
    const adminPhoneNumber = '917306440844'; // For WhatsApp URL
    const adminEmail = 'moderndcpala@gmail.com'; // Admin email
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(bookingMessage);
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
    
    // Immediately open WhatsApp with pre-filled message - PRIMARY ACTION
    // This directly connects the customer to admin via WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show instruction message
    alert(
      '📱 Connecting you to WhatsApp...\n\n' +
      'WhatsApp is opening with your booking details.\n\n' +
      '⚠️ IMPORTANT: Please click "SEND" in WhatsApp to complete your booking request.\n\n' +
      'The admin will receive your message and confirm your appointment.'
    );
    
    // Send email notification in background (backup notification)
    // Email will be sent TO admin and appear FROM the customer's email
    const emailSubject = `New Appointment Booking Request - ${formData.fullName}`;
    const emailBody = bookingMessage;
    const formSubmitUrl = 'https://formsubmit.co/ajax/' + adminEmail;
    
    const formDataToSend = {
      name: formData.fullName,
      email: formData.email, // Customer's email - will appear as sender
      phone: formData.phone,
      service: formData.service,
      tests: testsList,
      date: formatDate(formData.date),
      time: formatTime(formData.time),
      message: bookingMessage,
      _subject: emailSubject,
      _template: 'table',
      _replyto: formData.email, // Admin can reply directly to customer
      _captcha: false
    };
    
    // Send email notification in background (silent, no user interaction needed)
    fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formDataToSend)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Email notification sent to admin:', data);
    })
    .catch(error => {
      console.error('Email notification failed (WhatsApp is primary method):', error);
    });
    
    // Reset form immediately after opening WhatsApp
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      specificTests: [],
      date: '',
      time: '',
    });
    
    // Log booking for reference
    console.log('Booking submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-beige-bg">
        <section
          className="relative py-12 md:py-16 bg-primary-green text-white overflow-hidden"
          style={{
            backgroundImage: "url('/book appointment.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-primary-green/75" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Book an Appointment
            </h1>
            <p className="text-base md:text-lg text-center mt-3 opacity-90">
              Schedule your visit with our expert diagnostic team
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <User className="h-4 w-4 text-primary-green" />
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <Phone className="h-4 w-4 text-primary-green" />
                    Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <Mail className="h-4 w-4 text-primary-green" />
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Enter your email"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Services Dropdown */}
                <div>
                  <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <Activity className="h-4 w-4 text-primary-green" />
                    Services *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Specific Test Multiselect */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-green" />
                  Specific Test(s) *
                </label>
                {!formData.service ? (
                  <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                      Please select a service first to see available tests
                    </p>
                  </div>
                ) : availableTests.length === 0 ? (
                  <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
                    <p className="text-sm text-gray-600 text-center">
                      No tests available for the selected service
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-md max-h-64 overflow-y-auto">
                    {availableTests.map((test) => (
                      <label
                        key={test}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-3 rounded-md border border-transparent hover:border-primary-green transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.specificTests.includes(test)}
                          onChange={() => handleTestToggle(test)}
                          className="w-4 h-4 text-primary-green focus:ring-primary-green border-gray-300 rounded"
                        />
                        <FileCheck className="h-4 w-4 text-primary-green flex-shrink-0" />
                        <span className="text-sm text-text-dark">{test}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Date Picker */}
                <div>
                  <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <Calendar className="h-4 w-4 text-primary-green" />
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Working Hours Time Slot */}
                <div>
                  <label htmlFor="time" className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
                    <Clock className="h-4 w-4 text-primary-green" />
                    Preferred Time *
                  </label>
                  <div className="relative">
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select preferred time</option>
                      <optgroup label="Morning (8:00 AM - 12:00 PM)">
                        <option value="08:00">8:00 AM</option>
                        <option value="08:30">8:30 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="09:30">9:30 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                      </optgroup>
                      <optgroup label="Afternoon (12:00 PM - 4:00 PM)">
                        <option value="12:00">12:00 PM</option>
                        <option value="12:30">12:30 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="13:30">1:30 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="14:30">2:30 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="15:30">3:30 PM</option>
                      </optgroup>
                      <optgroup label="Evening (4:00 PM - 8:00 PM)">
                        <option value="16:00">4:00 PM</option>
                        <option value="16:30">4:30 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                      </optgroup>
                    </select>
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Working Hours: Mon-Sat 8:00 AM - 8:00 PM | Sun 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-green text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Send className="h-5 w-5" />
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookAppointment;






