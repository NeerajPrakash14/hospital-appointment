import { Calendar, Award, ExternalLink } from 'lucide-react';
import { Doctor } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: () => void;
  highlighted?: boolean;
}

export function DoctorCard({ doctor, onBook, highlighted = false }: DoctorCardProps) {

  return (
    <div 
      onClick={onBook}
      className={`
        group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden
        w-full h-[340px] flex flex-col border border-gray-100 cursor-pointer
        ${highlighted ? 'ring-2 shadow-lg' : ''}
      `}
      style={{ 
        borderColor: highlighted ? '#006776' : undefined,
        '--hover-border': '#00677630'
      } as React.CSSProperties}
    >
      {/* Doctor Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00677615 0%, #00677625 100%)', height: '450px' }}>
        <ImageWithFallback
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />

        {highlighted && (
          <div className="absolute top-3 right-3 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-lg font-semibold" style={{ backgroundColor: '#006776' }}>
            <Award className="w-3 h-3" />
            Recommended
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="p-4 flex flex-col h-[204px]">

        <div className="flex items-start justify-between mb-2 gap-2 flex-shrink-0">
          <a
            href={doctor.profileUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!doctor.profileUrl) {
                e.preventDefault();
              }
              e.stopPropagation();
            }}
            className="text-gray-900 text-base font-bold line-clamp-1 flex-1 hover:underline"
            style={{ color: '#006776' }}
          >
            {doctor.name}
          </a>
          {doctor.profileUrl && (
            <a
              href={doctor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-80 text-xs font-medium whitespace-nowrap flex-shrink-0 -mt-0.5"
              style={{ color: '#006776' }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Profile</span>
            </a>
          )}
        </div>
        <p className="mb-3 text-sm line-clamp-1 font-semibold flex-shrink-0" style={{ color: '#F9AA1C' }}>
          {doctor.specialty}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 flex-shrink-0">
          <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#006776' }} />
          <span className="line-clamp-1">{doctor.experience} years experience</span>
        </div>
        {doctor.expertise && (
          <div className="mb-8 flex-shrink-0" style={{ height: '3rem' }}>
            <p className="text-xs text-gray-600 line-clamp-3">
              <span className="font-semibold text-gray-700">Expertise:</span> {doctor.expertise}
            </p>
          </div>
        )}

        {/* Book Button */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="w-full text-white py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 mt-auto text-base font-semibold"
          style={{ backgroundColor: '#006776' }}
        >
          <Calendar className="w-5 h-10" />
          Book Appointment
        </button>
      </div>
    </div>
  );
}
