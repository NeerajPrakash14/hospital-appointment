import { useState } from 'react';
import { Brain, Building2, UserCircle } from 'lucide-react';
import { Doctor } from '../App';
import { AnalyzeAndBook } from './AnalyzeAndBook';
import { BrowseByDepartment } from './BrowseByDepartment';
import { BrowseByDoctor } from './BrowseByDoctor';

interface StandardBookingProps {
  onDoctorSelect: (doctor: Doctor) => void;
  doctors: Doctor[];
}

type Tab = 'analyze' | 'department' | 'doctor';

export function StandardBooking({ onDoctorSelect, doctors }: StandardBookingProps) {
  const [activeTab, setActiveTab] = useState<Tab>('analyze');

  const tabs = [
    { id: 'analyze' as Tab, label: 'Analyze & Book', icon: Brain, description: 'AI-powered recommendation' },
    { id: 'department' as Tab, label: 'By Department', icon: Building2, description: 'Browse specialties' },
    { id: 'doctor' as Tab, label: 'By Doctor', icon: UserCircle, description: 'View all doctors' }
  ];

  return (
    <section id="standard-booking" className="px-4 py-6 md:py-8 mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-4 md:mb-6 mt-8">
          {/* <h2 className="mb-2 text-gray-900">Smart Booking</h2> */}
          <p> ---
          <p className="text-gray-600">
            Choose your preferred method to find the right doctor
          </p>
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative px-4 py-4 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    style={{ backgroundColor: isActive ? '#7E52A0' : undefined }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? '#ffffff' : '#EF586F' }} />
                      <div className="text-center">
                        <div className={`text-sm md:text-base ${isActive ? '' : ''}`}>
                          {tab.label}
                        </div>
                        <div className={`text-xs mt-1 hidden md:block ${isActive ? 'opacity-90' : 'text-gray-500'}`}>
                          {tab.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'analyze' && <AnalyzeAndBook onDoctorSelect={onDoctorSelect} doctors={doctors} />}
          {activeTab === 'department' && <BrowseByDepartment onDoctorSelect={onDoctorSelect} doctors={doctors} />}
          {activeTab === 'doctor' && <BrowseByDoctor onDoctorSelect={onDoctorSelect} doctors={doctors} />}
        </div>
      </div>
    </section>
  );
}
