import { Phone, Calendar, UserSearch } from 'lucide-react';

interface FooterProps {
  onBookAppointment?: () => void;
}

export function Footer({ onBookAppointment }: FooterProps) {
  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 z-40 shadow-lg"
      style={{ 
        background: 'linear-gradient(90deg, #EF586F 0%, #E84F67 100%)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}
    >

      <div className="flex items-center h-[60px] w-full">
        {/* Call Button */}
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 text-white font-bold transition-all hover:opacity-90"
          style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '15px',
            letterSpacing: '0.3px',
            fontWeight: 'bold',
            padding: '10px 20px',
          }}
        >
          <Phone className="w-[18px] h-[18px]" strokeWidth={2.5} />
          <span style={{ fontWeight: 'bold' }}>1800-425-4500</span>
        </button>

        {/* Divider */}
        <div 
          style={{ 
            width: '1px', 
            height: '32px', 
            backgroundColor: 'rgba(255,255,255,0.3)',
          }} 
        />

        {/* Find Doctor Button */}
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 text-white font-bold transition-all hover:opacity-90"
          style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '15px',
            letterSpacing: '0.3px',
            fontWeight: 'bold',
            padding: '16px 20px',
          }}
        >
          <UserSearch className="w-[18px] h-[18px]" strokeWidth={2.5} />
          <span style={{ fontWeight: 'bold' }}>Find Doctor</span>
        </button>
      </div>
    </footer>
  );
}
