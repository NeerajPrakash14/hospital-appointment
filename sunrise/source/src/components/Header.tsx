import { Search, Mail, Phone, Plus, ChevronDown, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onBookAppointment?: () => void;
}

export function Header({ onBookAppointment }: HeaderProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Desktop View */}
      <div style={{ display: 'block' }} className="desktop-view">
        <style>{`
          @media (max-width: 1023px) {
            .desktop-view {
              display: none !important;
            }
            .mobile-view {
              display: block !important;
            }
          }
          @media (min-width: 1024px) {
            .desktop-view {
              display: block !important;
            }
            .mobile-view {
              display: none !important;
            }
          }
        `}</style>
        {/* Top Row - Logo, Search, Contact Info, Book Button */}
        <div className="border-b border-gray-200">
          <div className="w-full py-3" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src="https://www.sunrisehospitalcochin.com/images/web/logo.svg"
                  alt="Sunrise Hospitals"
                  style={{ height: '42px', width: 'auto' }}
                />
              </div>

              {/* Search Bar */}
              <div style={{ width: '580px', marginLeft: '50px' }}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ 
                      width: '100%',
                      height: '40px',
                      paddingLeft: '16px',
                      paddingRight: '50px',
                      fontSize: '14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      outline: 'none'
                    }}
                  />
                  <button 
                    className="absolute right-0 top-0 h-full text-white transition-colors flex items-center justify-center" 
                    style={{ 
                      backgroundColor: '#0d7a8a',
                      width: '48px',
                      border: 'none',
                      borderTopRightRadius: '5px',
                      borderBottomRightRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Spacer to push contact info to the right */}
              <div className="flex-1"></div>

              {/* Contact Info */}
              <div className="flex items-center gap-6">
                {/* Mail */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f9b233' }}>
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600">Mail</div>
                    <div className="font-medium text-gray-900">appointments@sunrisehospital.in</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f9b233' }}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600">Accident & Emergency</div>
                    <div className="font-medium text-gray-900">9946000911</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="text-white relative" style={{ background: 'linear-gradient(to right, #0d7a8a 0%, #0d7a8a 70%, #579aa1 70%, #579aa1 100%)', paddingLeft: '30px', paddingRight: '40px' }}>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between">
              {/* Left Side Navigation */}
              <div className="flex items-center gap-1">
                <a
                  href="#patient-care"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Patient Care
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#excellence"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Centre's of Excellence & Multispecialities
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#international"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  International Patients
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#hospitals"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Hospitals
                </a>
                <a
                  href="#insurance"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Insurance
                </a>
                <a
                  href="#emergency"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Emergency Services
                </a>
              </div>

              {/* Right Side Navigation */}
              <div className="flex items-center gap-1">
                <a
                  href="#corporate"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Corporate
                </a>
                <a
                  href="#homecare"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Homecare
                </a>
                <a
                  href="#others"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Others
                  <ChevronDown className="w-4 h-4" />
                </a>
                <a
                  href="#careers"
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Careers
                </a>
                <button
                  onClick={() => navigate('/admin')}
                  className="px-4 py-4 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Contact Us
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div style={{ display: 'none' }} className="mobile-view">
        {/* Top Row - Logo and Hamburger */}
        <div className="border-b border-gray-200">
          <div className="w-full py-3 px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src="https://www.sunrisehospitalcochin.com/images/web/logo.svg"
                  alt="Sunrise Hospitals"
                  style={{ height: '36px', width: 'auto' }}
                />
              </div>

              {/* Hamburger Menu */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="w-full" style={{ backgroundColor: '#0d7a8a', padding: '12px 16px' }}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              style={{ 
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                paddingRight: '50px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '10px',
                outline: 'none'
              }}
            />
            <button 
              className="absolute right-0 top-0 h-full text-white transition-colors flex items-center justify-center" 
              style={{ 
                backgroundColor: '#0d7a8a',
                width: '48px',
                border: 'none',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                cursor: 'pointer'
              }}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col">
              <a href="#patient-care" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Patient Care
              </a>
              <a href="#excellence" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Centre's of Excellence & Multispecialities
              </a>
              <a href="#international" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                International Patients
              </a>
              <a href="#hospitals" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Hospitals
              </a>
              <a href="#insurance" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Insurance
              </a>
              <a href="#emergency" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Emergency Services
              </a>
              <a href="#corporate" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Corporate
              </a>
              <a href="#homecare" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Homecare
              </a>
              <a href="#others" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Others
              </a>
              <a href="#careers" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Careers
              </a>
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
              >
                Contact Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
