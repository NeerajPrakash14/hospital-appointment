import { useState } from 'react';

import { Search, SlidersHorizontal } from 'lucide-react';
import { Doctor } from '../App';
import { DoctorCard } from './DoctorCard';

interface BrowseByDoctorProps {
  onDoctorSelect: (doctor: Doctor) => void;
  doctors: Doctor[];
}

export function BrowseByDoctor({ onDoctorSelect, doctors }: BrowseByDoctorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'experience'>('experience');

  let filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort doctors
  filteredDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-sm">Filters:</span>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="experience">Most Experienced</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Clear Filters */}
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                }}
                className="ml-auto text-sm text-blue-600 hover:text-blue-700"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>

        <div className="mb-4">
          <p className="text-gray-600">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500">No doctors found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={() => onDoctorSelect(doctor)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
