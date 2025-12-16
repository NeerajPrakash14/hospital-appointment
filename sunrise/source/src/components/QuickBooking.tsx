import { useState } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../App';
import { DoctorCard } from './DoctorCard';

interface QuickBookingProps {
  onDoctorSelect: (doctor: Doctor) => void;
  doctors: Doctor[];
}

export function QuickBooking({ onDoctorSelect, doctors }: QuickBookingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  
  const specialties = ['all', ...Array.from(new Set(doctors.map(d => d.specialty)))];
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <section id="quick-booking" className="px-4 py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          {/* <h2 className="mb-2 text-gray-900">Quick Booking</h2> */}
          {/* <p className="text-gray-600">
            Search for your doctor by name or specialty
          </p> */}
        </div>

        {/* Search & Filter */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--focus-ring-color': '#006776' } as React.CSSProperties}
                  onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #006776'}
                  onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                />
              </div>

              {/* Specialty Filter Buttons */}
              <div className="w-full overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm text-gray-600 font-medium">Specialty:</span>
                  {selectedSpecialty !== 'all' && (
                    <button
                      onClick={() => setSelectedSpecialty('all')}
                      className="text-xs hover:opacity-80 font-medium"
                      style={{ color: '#006776' }}
                    >
                      Clear filter
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', width: '100%' }}>

                  {specialties.map(specialty => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      style={{
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        backgroundColor: selectedSpecialty === specialty ? '#006776' : '#f3f4f6',
                        color: selectedSpecialty === specialty ? '#ffffff' : '#374151'
                      }}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${selectedSpecialty === specialty
                          ? 'shadow-md'
                          : 'hover:bg-gray-200 hover:shadow-sm'
                        }
                      `}
                    >
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-500">No doctors found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBook={() => onDoctorSelect(doctor)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
