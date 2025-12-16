import { useState } from 'react';
import { Menu, X, ChevronDown, Ambulance } from 'lucide-react';

interface HeaderProps {
  onBookAppointment?: () => void;
  logoUrl?: string;
  badgeUrl?: string;
}

const navItems = [
  { label: 'ABOUT', hasDropdown: true },
  { label: 'OUR CENTRES', hasDropdown: true },
  { label: 'OUR DOCTORS', hasDropdown: false },
  { label: 'SPECIALITIES', hasDropdown: true },
  { label: 'GALLERY', hasDropdown: true },
  { label: 'MEDIA', hasDropdown: true },
  { label: 'CAREERS', hasDropdown: false },
];

export function Header({ onBookAppointment, logoUrl, badgeUrl }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePrimaryCta = () => {
    if (onBookAppointment) {
      onBookAppointment();
    }
  };

  // Mobile pills and nav structure as per screenshot
  const mobilePills = [
    { label: 'KATS', color: '#7B5BA6', textColor: '#fff' },
    { label: 'Kangaroocare Fertility', color: '#7B5BA6', textColor: '#fff' },
    { label: 'Premature Baby Foundation', color: '#00BCD4', textColor: '#fff' },
  ];

  // Mobile nav sections matching the design
  const mobileNav = [
    { 
      section: 'About', 
      items: ['About Us', 'Board Of Directors', 'CORPORATE TEAM', 'Our Journey'] 
    },
    { 
      section: 'Our Centres', 
      items: [
        'Bangalore', 
        'Mysore', 
        'Ramanagara', 
        'Tumakuru', 
        'Fertility Centers',
        { label: 'Bangalore', indent: true },
        { label: 'Mysore', indent: true },
        { label: 'Ramanagara', indent: true },
        'Kangaroo Care Dentistry', 
        'Kangaroo Care Clinics', 
        'Nagarabhavi'
      ] 
    },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-[rgba(239,78,120,0.15)] shadow-sm">
      {/* Desktop Header */}
      <div className="kc-desktop">
        {/* Title Bar - Logo and CTA Buttons */}
        <div className="border-b border-[rgba(239,78,120,0.1)]">
          <div className="w-full px-6 py-0 flex items-center justify-between">
            <div className="flex items-center gap-6 flex-shrink-0">
              <img 
                src={logoUrl || "https://kangaroocareindia.com/images/logo-kc-new.png"} 
                alt="Kangaroo Care" 
                style={{ height: '100px', width: 'auto', maxWidth: '350px', marginLeft: '30px'}}
              />
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                className="px-20 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] border-2 bg-white transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: '#7E52A0',
                  color: '#7E52A0',
                  margin: '0px 20px 0px 5px',
                  padding: '9px 14px 9px 13px',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onClick={handlePrimaryCta}
              >
                Kangaroo Care Fertility
              </button>
              <button
                type="button"
                className="px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] border-2 bg-white transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                style={{
                 borderColor: '#7E52A0',
                  color: '#7E52A0',
                  margin: '0px 20px 0px 5px',
                  padding: '9px 14px 9px 13px',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <Ambulance className="w-5 h-5" fill="currentColor" />
                KATS
              </button>
              <button
                type="button"
                className="px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] border-2 bg-white transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: '#EF586F',
                  color: '#EF586F',
                  margin: '0px 20px 0px 5px',
                  padding: '9px 14px 9px 13px',
                  fontSize: '17px',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Kangaroo Care Foundation
              </button>
              <img 
                src={badgeUrl || "https://kangaroocareindia.com/static/media/nabh2.0af9f1c243d95fb8e59a.png"} 
                alt="NABH" 
                style={{ height: '60px', width: 'auto', maxWidth: '300px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* Toolbar - Navigation Menu */}
        <div className="bg-white">
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-4">
            <nav className="py-2">
              <ul className="flex items-center justify-center gap-6 xl:gap-8 text-[0.82rem] tracking-[0.22em] uppercase text-[#1f1d21]">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="flex items-center gap-1 font-semibold transition-colors hover:text-[#ef4e78]"
                      style={{
                        fontSize: '12.5px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold'
                      }}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header Bar */}
      <div 
        className="kc-mobile flex items-center justify-between" 
        style={{ 
          background: '#fff',
          padding: '12px 20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <img 
          src={logoUrl || 'https://kangaroocareindia.com/images/logo-kc-new.png'} 
          alt="Kangaroo Care" 
          style={{ height: 65, width: 'auto', maxWidth: '250px' }} 
        />
        <button
          type="button"
          aria-label="Open menu"
          className="flex items-center justify-center rounded-full shadow-md transition-all hover:opacity-90"
          style={{
            background: '#EF586F',
            width: '48px',
            height: '48px',
            border: '2px solid #EF586F'
          }}
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="text-white" style={{ width: 28, height: 28, strokeWidth: 2.5 }} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50" style={{ height: '100vh', width: '100vw' }}>
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          {/* Drawer */}
          <div 
            className="absolute right-0 top-0 h-full flex flex-col animate-slideInRight"
            style={{ 
              background: 'linear-gradient(180deg, #EF586F 0%, #E84F67 100%)',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              width: '55vw',
              padding: '0 20px 20px 20px'
            }}
          >
            {/* White Bar at Top */}
            <div 
              style={{ 
                background: '#fff',
                height: '60px',
                width: '100%',
                flexShrink: 0
              }}
            />

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-800 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Close menu"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Pills Section */}
            <div className="flex flex-col gap-3 pt-4 px-5 pb-5" style={{ flexShrink: 0, paddingBottom: 20 }}>
              {mobilePills.map((pill) => (
                <button
                  key={pill.label}
                  className="w-full rounded-lg py-3 text-sm font-bold shadow-md transition-all hover:opacity-90"
                  style={{ 
                    background: pill.color, 
                    color: pill.textColor,
                    fontFamily: 'Poppins, sans-serif',
                    letterSpacing: '0.3px'
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Navigation Sections */}
            <nav 
              className="flex-1 overflow-y-auto px-5 pb-8" 
              style={{ 
                scrollbarWidth: 'thin',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {mobileNav.map((section, sectionIdx) => (
                <div key={section.section} style={{ marginBottom: sectionIdx === mobileNav.length - 1 ? 0 : '24px' }}>
                  {/* Section Title */}
                  <div 
                    className="text-white font-bold mb-3"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      letterSpacing: '0.3px',
                      fontSize: '16px'
                    }}
                  >
                    {section.section}
                  </div>
                  
                  {/* Section Items */}
                  <div className="flex flex-col" style={{ gap: '0' }}>
                    {section.items.map((item, idx) => {
                      const isIndented = typeof item === 'object' && item.indent;
                      const label = typeof item === 'string' ? item : item.label;
                      
                      return (
                        <button
                          key={`${label}-${idx}`}
                          className="text-white text-left transition-all hover:bg-white/10"
                          style={{ 
                            background: 'none',
                            borderBottom: '1px solid rgba(255,255,255,0.2)',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '100',
                            fontSize: '12px',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            paddingLeft: isIndented ? '28px' : '12px',
                            paddingRight: '12px'
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
