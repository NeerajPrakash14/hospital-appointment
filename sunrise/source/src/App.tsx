import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickBooking } from './components/QuickBooking';
import { StandardBooking } from './components/StandardBooking';
import { BookingModal } from './components/BookingModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { AdminPanel } from './components/AdminPanel';
import { mockDoctors } from './data/mockData';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subSpecialty?: string;
  experience: number;
  rating: number;
  availability: string[];
  image: string;
  summary?: string;
  overview?: string;
  expertise?: string;
  qualification?: string;
  profileUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  doctorCount: number;
}

export interface BookingData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  doctor?: Doctor;
}

export default function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const [activeSection, setActiveSection] = useState<'hero' | 'quick' | 'standard' | 'admin'>('hero');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Load doctors from localStorage or use mock data
  useEffect(() => {
    const storedDoctors = localStorage.getItem('hospitalDoctors');
    if (storedDoctors) {
      try {
        const parsed = JSON.parse(storedDoctors);
        // If stored doctors count is less than mockDoctors, update with mockDoctors
        if (parsed.length < mockDoctors.length) {
          setDoctors(mockDoctors);
          localStorage.setItem('hospitalDoctors', JSON.stringify(mockDoctors));
        } else {
          setDoctors(parsed);
        }
      } catch (error) {
        console.error('Error loading doctors from localStorage:', error);
        setDoctors(mockDoctors);
      }
    } else {
      setDoctors(mockDoctors);
    }
  }, []);

  // Save doctors to localStorage whenever they change
  useEffect(() => {
    if (doctors.length > 0) {
      localStorage.setItem('hospitalDoctors', JSON.stringify(doctors));
    }
  }, [doctors]);

  const handleAddDoctor = (newDoctor: Omit<Doctor, 'id'>) => {
    const doctorWithId: Doctor = {
      ...newDoctor,
      id: `doctor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setDoctors(prev => [...prev, doctorWithId]);
  };

  const handleRemoveDoctor = (doctorId: string) => {
    setDoctors(prev => prev.filter(d => d.id !== doctorId));
  };

  const handleQuickBookClick = () => {
    setActiveSection('quick');
    setTimeout(() => {
      const element = document.getElementById('quick-booking');
      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleStandardBookClick = () => {
    setActiveSection('standard');
    setTimeout(() => {
      const element = document.getElementById('standard-booking');
      if (element) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (data: BookingData) => {
    setBookingData({ ...data, doctor: selectedDoctor || undefined });
    setShowBookingModal(false);
    setShowConfirmation(true);
  };

  const handleNewBooking = () => {
    setShowConfirmation(false);
    setSelectedDoctor(null);
    setBookingData(null);
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookAppointmentClick = () => {
    setActiveSection('quick');
    setTimeout(() => {
      document.getElementById('quick-booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Gradient Background - 65% of page height, full width */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '65vh',
          background: 'linear-gradient(to right, #d4e8e3 0%, #FAFAFA 50%, #FFFFFF 100%)',
          zIndex: 0
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* New Header Component */}
        {!isAdminRoute && (
          <Header onBookAppointment={handleBookAppointmentClick} />
        )}

      <Routes>
        <Route path="/admin" element={
          <>
            {/* Back Button */}
            <button
              onClick={() => {
                navigate('/');
                setActiveSection('hero');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="fixed top-4 left-4 bg-white text-gray-700 px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all z-50 flex items-center gap-2 text-sm font-medium border border-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            <AdminPanel
              doctors={doctors}
              onAddDoctor={handleAddDoctor}
              onRemoveDoctor={handleRemoveDoctor}
            />
          </>
        } />
        <Route path="/" element={
          <>
            <Hero
              onQuickBook={handleQuickBookClick}
              onStandardBook={handleStandardBookClick}
            />

            {activeSection === 'standard' && (
              <StandardBooking onDoctorSelect={handleDoctorSelect} doctors={doctors} />
            )}

            {/* Always show Quick Booking by default */}
            <QuickBooking onDoctorSelect={handleDoctorSelect} doctors={doctors} />

          </>
        } />
      </Routes>

      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {showConfirmation && bookingData && (
        <ConfirmationModal
          bookingData={bookingData}
          onClose={handleNewBooking}
        />
      )}
      </div>
    </div>
  );
}