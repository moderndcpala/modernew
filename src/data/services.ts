export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details?: string;
  preparation?: string;
  duration?: string;
  price: string;
  category: string;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  tests: ServiceItem[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'pathology',
    title: 'Pathology',
    description: 'Comprehensive laboratory testing with accurate results and quick turnaround times for all diagnostic needs.',
    icon: 'FileText',
    tests: [
      {
        id: 'stool-ph-test',
        title: 'Stool pH Test',
        description: 'Stool pH Test is an important assessment for evaluating digestive health and identifying imbalances in gut flora. This test measures the acidity or alkalinity of the stool to help diagnose various digestive conditions.',
        details: 'Stool pH Test helps assess digestive health by measuring stool acidity or alkalinity. It can indicate malabsorption, bacterial overgrowth, or dietary imbalances that affect gut function.',
        preparation: 'No special preparation required. Follow collection instructions provided by the lab.',
        duration: 'Results in 4-6 hours',
        price: '₹200 onwards',
        category: 'Pathology',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      },
      {
        id: 'blood-test',
        title: 'Complete Blood Count (CBC)',
        description: 'A comprehensive blood test that evaluates your overall health and detects various disorders including anemia, infection, and leukemia.',
        details: 'CBC is one of the most common blood tests that evaluates your overall health. It measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. Essential for detecting anemia, infections, bleeding disorders, and various other conditions.',
        preparation: 'Fasting not required. Can be done at any time.',
        duration: 'Results in 2-4 hours',
        price: '₹300 onwards',
        category: 'Pathology',
        image: '/complete-blood-count.jpg',
      },
      {
        id: 'lipid-profile',
        title: 'Lipid Profile',
        description: 'Measures cholesterol and triglyceride levels to assess your risk of cardiovascular disease.',
        details: 'Measures total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. Essential for assessing cardiovascular risk and monitoring heart health. Recommended annually for adults over 20.',
        preparation: 'Fasting for 12 hours required. Avoid fatty foods the day before.',
        duration: 'Results in 4-6 hours',
        price: '₹500 onwards',
        category: 'Pathology',
        image: '/lipid profile.jpg',
      },
      {
        id: 'liver-function',
        title: 'Liver Function Test (LFT)',
        description: 'Evaluates the health and functioning of your liver by measuring various enzymes and proteins.',
        details: 'Comprehensive panel including ALT, AST, ALP, bilirubin, and protein levels. Evaluates liver health, detects liver damage, inflammation, and monitors treatment of liver diseases.',
        preparation: 'Fasting for 8-12 hours recommended. Avoid alcohol 24 hours before.',
        duration: 'Results in 4-6 hours',
        price: '₹600 onwards',
        category: 'Pathology',
        image: '/Liver-function-test.png',
      },
      {
        id: 'kidney-function',
        title: 'Kidney Function Test (KFT)',
        description: 'Assesses kidney health by measuring creatinine, urea, and other markers in the blood.',
        details: 'Measures creatinine, Blood Urea Nitrogen (BUN), and electrolyte levels to assess kidney function. Essential for detecting kidney disease, monitoring kidney health, and evaluating treatment effectiveness.',
        preparation: 'Fasting not required. Stay well hydrated.',
        duration: 'Results in 4-6 hours',
        price: '₹550 onwards',
        category: 'Pathology',
        image: '/kidney function.webp',
      },
      {
        id: 'diabetes-profile',
        title: 'Diabetes Profile',
        description: 'Comprehensive test for diabetes including blood glucose, HbA1c, and related parameters.',
        details: 'Comprehensive diabetes screening including fasting blood sugar, postprandial blood sugar, HbA1c (3-month average), and insulin levels. Essential for diabetes diagnosis, monitoring, and management.',
        preparation: 'Fasting for 8-12 hours required. Follow specific instructions for postprandial test.',
        duration: 'Results in 4-6 hours',
        price: '₹800 onwards',
        category: 'Pathology',
        image: '/daibetic.webp',
      },
    ],
  },
  {
    id: 'radiology',
    title: 'Radiology',
    description: 'Advanced imaging services including X-ray, CT scan, MRI, and ultrasound with cutting-edge technology.',
    icon: 'Activity',
    tests: [
      {
        id: 'x-ray',
        title: 'X-Ray',
        description: 'Diagnostic imaging technique used to visualize the internal structures of the body, particularly bones.',
        details: 'Our state-of-the-art digital X-ray technology provides high-resolution images with minimal radiation exposure. Ideal for diagnosing fractures, infections, arthritis, and lung conditions. Results are available immediately after the scan.',
        preparation: 'No special preparation required. Remove jewelry and metal objects before the scan.',
        duration: '5-10 minutes',
        price: '₹400 onwards',
        category: 'Radiology',
        image: '/xray.jpg',
      },
      {
        id: 'ct-scan',
        title: 'CT Scan',
        description: 'Computed Tomography scan providing detailed cross-sectional images of the body using X-rays.',
        details: 'Advanced CT scanning technology offers detailed 3D images of internal organs, bones, soft tissues, and blood vessels. Essential for detecting tumors, internal injuries, and monitoring treatment progress. Our low-dose CT technology minimizes radiation exposure.',
        preparation: 'Fasting may be required for certain scans. Avoid food 4-6 hours before if contrast is used.',
        duration: '15-30 minutes',
        price: '₹3000 onwards',
        category: 'Radiology',
        image: '/ct scan.png',
      },
      {
        id: 'mri',
        title: 'MRI Scan',
        description: 'Magnetic Resonance Imaging for detailed visualization of soft tissues, organs, and internal structures.',
        details: 'MRI uses powerful magnets and radio waves to create detailed images without radiation. Excellent for brain, spinal cord, joints, and soft tissue imaging. Our high-field MRI provides superior image quality for accurate diagnosis.',
        preparation: 'Remove all metal objects. Inform us if you have any implants or metal in your body.',
        duration: '30-60 minutes',
        price: '₹5000 onwards',
        category: 'Radiology',
        image: '/mri.webp',
      },
      {
        id: 'ultrasound',
        title: 'Ultrasound',
        description: 'Non-invasive imaging technique using sound waves to visualize organs and tissues.',
        details: 'Ultrasound imaging is completely safe with no radiation. Perfect for pregnancy monitoring, abdominal organ evaluation, and vascular studies. Real-time imaging allows immediate assessment and guidance.',
        preparation: 'Fasting may be required for abdominal scans. Drink water for pelvic/obstetric scans.',
        duration: '15-30 minutes',
        price: '₹800 onwards',
        category: 'Radiology',
        image: '/ultrasound.png',
      },
    ],
  },
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Complete cardiac care with ECG, Echo, and stress tests performed by experienced cardiologists.',
    icon: 'Heart',
    tests: [
      {
        id: 'ecg',
        title: 'ECG (Electrocardiogram)',
        description: 'Records the electrical activity of the heart to detect heart rhythm and electrical abnormalities.',
        details: 'ECG records the electrical signals of your heart to detect irregular heartbeats, heart attacks, and other cardiac conditions. Quick, painless, and non-invasive test that takes just a few minutes.',
        preparation: 'No special preparation. Avoid caffeine and smoking before the test.',
        duration: '5-10 minutes',
        price: '₹300 onwards',
        category: 'Cardiology',
        image: '/ecg.webp',
      },
      {
        id: 'echo',
        title: 'Echocardiogram',
        description: 'Ultrasound of the heart to assess heart structure, function, and blood flow.',
        details: 'Echocardiogram uses ultrasound waves to create detailed images of your heart\'s structure, valves, and pumping function. Essential for diagnosing heart valve problems, heart failure, and congenital heart defects.',
        preparation: 'No special preparation required.',
        duration: '30-45 minutes',
        price: '₹2000 onwards',
        category: 'Cardiology',
        image: '/echocardiogram.png',
      },
      {
        id: 'stress-test',
        title: 'Stress Test',
        description: 'Exercise or pharmacological stress test to evaluate heart function under physical stress.',
        details: 'Stress test monitors your heart\'s response to physical exercise. Helps diagnose coronary artery disease, evaluate exercise capacity, and assess the effectiveness of heart treatments. Performed on a treadmill or stationary bike.',
        preparation: 'Fasting for 2-3 hours. Wear comfortable clothing and shoes. Avoid caffeine.',
        duration: '30-60 minutes',
        price: '₹2500 onwards',
        category: 'Cardiology',
        image: '/stress test.jpg',
      },
    ],
  },
  {
    id: 'health-packages',
    title: 'Health Packages',
    description: 'Customized health checkup packages designed for individuals and families at competitive prices.',
    icon: 'Package',
    tests: [
      {
        id: 'basic-package',
        title: 'Basic Health Package',
        description: 'Essential health screening including CBC, blood sugar, lipid profile, and basic tests.',
        details: 'Includes Complete Blood Count (CBC), Blood Sugar (Fasting & PP), Lipid Profile, Liver Function Test, Kidney Function Test, and Urine Analysis. Perfect for annual health screening and basic health assessment.',
        preparation: 'Fasting for 8-12 hours required.',
        duration: '2-3 hours',
        price: '₹1500 onwards',
        category: 'Health Packages',
        image: '/basic health checkup.jpg',
      },
      {
        id: 'complete-package',
        title: 'Complete Health Package',
        description: 'Comprehensive health checkup covering all major systems with detailed analysis.',
        details: 'Comprehensive package includes all basic tests plus Thyroid Function, Diabetes Profile, Vitamin D, B12, Complete Lipid Profile, ECG, Chest X-ray, and detailed consultation. Complete health assessment covering all major systems.',
        preparation: 'Fasting for 8-12 hours required. Follow specific test instructions.',
        duration: '3-4 hours',
        price: '₹3500 onwards',
        category: 'Health Packages',
        image: '/comprehensive health check up.jpg',
      },
      {
        id: 'executive-package',
        title: 'Executive Health Package',
        description: 'Premium health screening package with advanced diagnostics and personalized consultation.',
        details: 'Premium package with priority service, includes comprehensive tests, advanced cardiac screening, stress management evaluation, nutritional counseling, and detailed health report with recommendations. Designed for busy professionals.',
        preparation: 'Fasting for 8-12 hours required.',
        duration: '4-5 hours with consultation',
        price: '₹5000 onwards',
        category: 'Health Packages',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      },
    ],
  },
];

