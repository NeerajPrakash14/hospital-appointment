import { useState } from 'react';
import { Plus, Trash2, ExternalLink, Loader2, Shield, AlertCircle } from 'lucide-react';
import { Doctor } from '../App';
import { scrapeDoctorFromLinqMD, validateLinqMDUrl } from '../services/linqmdScraper';

interface AdminPanelProps {
  doctors: Doctor[];
  onAddDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  onRemoveDoctor: (doctorId: string) => void;
}

export function AdminPanel({ doctors, onAddDoctor, onRemoveDoctor }: AdminPanelProps) {
  const [linqmdUrl, setLinqmdUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate URL
    if (!validateLinqMDUrl(linqmdUrl)) {
      setError('Invalid LinqMD URL format. Expected: https://www.linqmd.com/doctor/{slug}');
      return;
    }

    setIsLoading(true);

    try {
      // Scrape doctor data from LinqMD
      const scrapedData = await scrapeDoctorFromLinqMD(linqmdUrl);
      
      // Convert to Doctor format
      const newDoctor: Omit<Doctor, 'id'> = {
        name: scrapedData.name,
        specialty: scrapedData.specialty,
        subSpecialty: scrapedData.subSpecialty,
        experience: scrapedData.experience,
        rating: 0, // Not used but required for data structure
        availability: scrapedData.availability,
        image: scrapedData.image,
        summary: scrapedData.summary,
        overview: scrapedData.overview,
        expertise: scrapedData.expertise,
        qualification: scrapedData.qualification
      };

      // Add doctor to system
      onAddDoctor(newDoctor);
      
      setSuccess(`Successfully added ${scrapedData.name} to the system!${scrapedData.summary ? ' Summary: ' + scrapedData.summary : ''}`);
      setLinqmdUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add doctor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-2xl shadow-xl p-8 mb-8 text-white" style={{ backgroundColor: '#EF586F' }}>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="opacity-90">Manage doctors and appointments</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Doctor Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-6 h-6" style={{ color: '#EF586F' }} />
              <h2 className="text-xl font-semibold text-gray-900">Add New Doctor</h2>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinqMD Profile URL
                </label>
                <input
                  type="url"
                  value={linqmdUrl}
                  onChange={(e) => setLinqmdUrl(e.target.value)}
                  placeholder="https://www.linqmd.com/doctor/doctor-name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter the LinqMD profile link of the doctor you want to add
                </p>
              </div>

              {/* Example URLs */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Example URLs:</p>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setLinqmdUrl('https://www.linqmd.com/doctor/murali-mohan-s')}
                    className="text-xs hover:opacity-80 block"
                    style={{ color: '#EF586F' }}
                  >
                    https://www.linqmd.com/doctor/murali-mohan-s
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinqmdUrl('https://www.linqmd.com/doctor/lavanya')}
                    className="text-xs hover:opacity-80 block"
                    style={{ color: '#EF586F' }}
                  >
                    https://www.linqmd.com/doctor/lavanya
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !linqmdUrl}
                className="w-full text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#EF586F' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Fetching Doctor Data...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Doctor to System
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Doctors List Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Current Doctors ({doctors.length})
              </h2>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {doctors.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No doctors in the system yet.</p>
                  <p className="text-sm mt-2">Add your first doctor using the form.</p>
                </div>
              ) : (
                doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          width={400}
                          height={400}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {doctor.name}
                        </h3>
                        <p className="text-sm" style={{ color: '#EF586F' }}>{doctor.specialty}</p>
                        {doctor.subSpecialty && (
                          <p className="text-xs text-gray-500">{doctor.subSpecialty}</p>
                        )}
                        {doctor.qualification && (
                          <p className="text-xs text-green-600 mt-1">
                            {doctor.qualification}
                          </p>
                        )}
                        {doctor.summary && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {doctor.summary}
                          </p>
                        )}
                        {doctor.expertise && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            <span className="font-medium">Expertise:</span> {doctor.expertise}
                          </p>
                        )}
                        <p className="text-xs text-gray-600 mt-1">
                          {doctor.experience} years experience
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveDoctor(doctor.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove doctor"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#EF586F' }} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How it works</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enter the LinqMD profile URL of any doctor</li>
                <li>• Our system automatically extracts their name, summary, overview, and profile details</li>
                <li>• The doctor is added to your booking system instantly</li>
                <li>• All data is stored locally in your browser</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
