import { useState } from 'react';
import { Heart, Brain, Bone, Eye, Stethoscope, Activity, Baby, Ear, ChevronRight, Wind, Droplet, Zap, Pill, Scan, Syringe, Ambulance, Users } from 'lucide-react';
import { Doctor } from '../App';
import { DoctorCard } from './DoctorCard';
import { departments } from '../data/mockData';

interface BrowseByDepartmentProps {
  onDoctorSelect: (doctor: Doctor) => void;
  doctors: Doctor[];
}

const departmentIcons: { [key: string]: any } = {
  'Cardiology': Heart,
  'Neurology': Brain,
  'Orthopedics': Bone,
  'Ophthalmology': Eye,
  'General Medicine': Stethoscope,
  'Pediatrics': Baby,
  'ENT': Ear,
  'Dermatology': Activity,
  'Gastroenterology': Activity,
  'Pulmonology': Wind,
  'Nephrology': Droplet,
  'Urology': Droplet,
  'Endocrinology': Zap,
  'Rheumatology': Bone,
  'Psychiatry': Brain,
  'Oncology': Activity,
  'Radiology': Scan,
  'Anesthesiology': Syringe,
  'Emergency Medicine': Ambulance,
  'Obstetrics & Gynecology': Users,
};

const departmentColors: { [key: string]: { bg: string, icon: string, hoverBg: string } } = {
  'Cardiology': { bg: 'bg-red-100', icon: 'text-red-600', hoverBg: 'group-hover:bg-red-200' },
  'Neurology': { bg: 'bg-purple-100', icon: 'text-purple-600', hoverBg: 'group-hover:bg-purple-200' },
  'Orthopedics': { bg: 'bg-amber-100', icon: 'text-amber-600', hoverBg: 'group-hover:bg-amber-200' },
  'Ophthalmology': { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-blue-200' },
  'General Medicine': { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-blue-200' },
  'Pediatrics': { bg: 'bg-blue-100', icon: 'text-green-600', hoverBg: 'group-hover:bg-pink-200' },
  'ENT': { bg: 'bg-blue-100', icon: 'text-purple-600', hoverBg: 'group-hover:bg-indigo-200' },
  'Dermatology': { bg: 'bg-blue-100', icon: 'text-red-600', hoverBg: 'group-hover:bg-emerald-200' },
  'Gastroenterology': { bg: 'bg-orange-100', icon: 'text-orange-600', hoverBg: 'group-hover:bg-orange-200' },
  'Pulmonology': { bg: 'bg-blue-100', icon: 'text-cyan-600', hoverBg: 'group-hover:bg-cyan-200' },
  'Nephrology': { bg: 'bg-blue-100', icon: 'text-amber-600', hoverBg: 'group-hover:bg-sky-200' },
  'Urology': { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-violet-200' },
  'Endocrinology': { bg: 'bg-blue-100', icon: 'text-yellow-600', hoverBg: 'group-hover:bg-yellow-200' },
  'Rheumatology': { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-rose-200' },
  'Psychiatry': { bg: 'bg-blue-100', icon: 'text-purple-600', hoverBg: 'group-hover:bg-fuchsia-200' },
  'Oncology': { bg: 'bg-blue-100', icon: 'text-blue-600', hoverBg: 'group-hover:bg-slate-200' },
  'Radiology': { bg: 'bg-lime-100', icon: 'text-lime-600', hoverBg: 'group-hover:bg-lime-200' },
  'Anesthesiology': { bg: 'bg-green-100', icon: 'text-green-600', hoverBg: 'group-hover:bg-green-200' },
  'Emergency Medicine': { bg: 'bg-blue-100', icon: 'text-blue-700', hoverBg: 'group-hover:bg-red-200' },
  'Obstetrics & Gynecology': { bg: 'bg-blue-100', icon: 'text-pink-700', hoverBg: 'group-hover:bg-pink-200' },
};

export function BrowseByDepartment({ onDoctorSelect, doctors }: BrowseByDepartmentProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const filteredDoctors = selectedDepartment
    ? doctors.filter(d => d.specialty === selectedDepartment)
    : [];

  const handleDepartmentClick = (deptName: string) => {
    setSelectedDepartment(deptName);
    // Smooth scroll to doctors section
    setTimeout(() => {
      document.getElementById('department-doctors')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Departments Grid */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="mb-4 text-gray-900">
          Select a Department
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {departments.map(dept => {
            const Icon = departmentIcons[dept.name] || Stethoscope;
            const isSelected = selectedDepartment === dept.name;
            const colors = departmentColors[dept.name] || { bg: 'bg-gray-100', icon: 'text-gray-600', hoverBg: 'group-hover:bg-gray-200' };
            
            return (
              <button
                key={dept.id}
                onClick={() => handleDepartmentClick(dept.name)}
                className={`
                  group relative p-6 rounded-xl transition-all duration-300 text-left
                  ${isSelected
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                  }
                `}
                style={isSelected ? { backgroundColor: '#EF586F' } : undefined}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                    ${isSelected
                      ? 'bg-white/20'
                      : `${colors.bg} ${colors.hoverBg}`
                    }
                  `}>
                    <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : colors.icon}`} />
                  </div>
                  <div>
                    <div className={`mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {dept.name}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                      {dept.doctorCount} doctor{dept.doctorCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                  {isSelected && (
                    <ChevronRight className="w-5 h-5 text-white animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctors in Selected Department */}
      {selectedDepartment && (
        <div id="department-doctors" className="scroll-mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">
              {selectedDepartment} Doctors ({filteredDoctors.length})
            </h3>
            <button
              onClick={() => setSelectedDepartment(null)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear Selection
            </button>
          </div>
          
          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500">No doctors available in this department.</p>
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
      )}
    </div>
  );
}
