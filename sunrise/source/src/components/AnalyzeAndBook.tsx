import { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Doctor } from '../App';
import { DoctorCard } from './DoctorCard';
import { commonSymptoms, symptomToSpecialty } from '../data/mockData';

interface AnalyzeAndBookProps {
  onDoctorSelect: (doctor: Doctor) => void;
  doctors: Doctor[];
}

export function AnalyzeAndBook({ onDoctorSelect, doctors }: AnalyzeAndBookProps) {
  const [inputMethod, setInputMethod] = useState<'symptoms' | 'text'>('symptoms');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState<{
    specialty: string;
    subSpecialty?: string;
    confidence: number;
  } | null>(null);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setAnalyzedResult(null);
  };

  const analyzeSymptoms = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let specialty = 'General Medicine';
      let subSpecialty = undefined;
      let confidence = 0.85;

      if (inputMethod === 'symptoms' && selectedSymptoms.length > 0) {
        // Simple mapping based on selected symptoms
        const specialtyMatches: { [key: string]: number } = {};
        
        selectedSymptoms.forEach(symptom => {
          const match = symptomToSpecialty[symptom];
          if (match) {
            specialtyMatches[match.specialty] = (specialtyMatches[match.specialty] || 0) + 1;
            if (match.subSpecialty) {
              subSpecialty = match.subSpecialty;
            }
          }
        });

        // Get most common specialty
        const maxMatch = Object.entries(specialtyMatches).sort((a, b) => b[1] - a[1])[0];
        if (maxMatch) {
          specialty = maxMatch[0];
          confidence = Math.min(0.95, 0.7 + (maxMatch[1] * 0.1));
        }
      } else if (inputMethod === 'text' && textInput) {
        // Analyze text input
        const lowerText = textInput.toLowerCase();
        
        if (lowerText.includes('heart') || lowerText.includes('chest pain') || lowerText.includes('cardiac')) {
          specialty = 'Cardiology';
          confidence = 0.9;
        } else if (lowerText.includes('skin') || lowerText.includes('rash') || lowerText.includes('acne')) {
          specialty = 'Dermatology';
          confidence = 0.88;
        } else if (lowerText.includes('bone') || lowerText.includes('joint') || lowerText.includes('fracture')) {
          specialty = 'Orthopedics';
          confidence = 0.92;
        } else if (lowerText.includes('stomach') || lowerText.includes('digestive') || lowerText.includes('abdominal')) {
          specialty = 'Gastroenterology';
          confidence = 0.87;
        } else if (lowerText.includes('eye') || lowerText.includes('vision') || lowerText.includes('sight')) {
          specialty = 'Ophthalmology';
          confidence = 0.91;
        }
      }

      setAnalyzedResult({ specialty, subSpecialty, confidence });
      setIsAnalyzing(false);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }, 1500);
  };

  const filteredDoctors = analyzedResult
    ? doctors.filter(d => 
        d.specialty === analyzedResult.specialty ||
        d.subSpecialty === analyzedResult.subSpecialty
      )
    : [];

  const canAnalyze = 
    (inputMethod === 'symptoms' && selectedSymptoms.length > 0) ||
    (inputMethod === 'text' && textInput.trim().length > 10);

  return (
    <div className="space-y-6">
      {/* Input Method Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setInputMethod('symptoms')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              inputMethod === 'symptoms'
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={inputMethod === 'symptoms' ? {backgroundColor: '#006776'} : undefined}
          >
            Select Symptoms
          </button>
          <button
            onClick={() => setInputMethod('text')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              inputMethod === 'text'
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={inputMethod === 'text' ? {backgroundColor: '#006776'} : undefined}
          >
            Describe Issue
          </button>
        </div>

        {/* Symptoms Selection */}
        {inputMethod === 'symptoms' && (
          <div>
            <label className="block mb-3 text-gray-700">
              Select your symptoms:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonSymptoms.map(symptom => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`
                      px-4 py-3 rounded-xl text-left transition-all border-2
                      ${isSelected
                        ? 'border-[#F9AA1C]'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }
                    `}
                    style={{
                      backgroundColor: isSelected ? '#F9AA1C20' : 'white',
                      color: isSelected ? '#F9AA1C' : undefined
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4" style={{ color: '#F9AA1C' }} />
                      )}
                      <span className="text-sm">{symptom}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F9AA1C20' }}>
                <p className="text-sm" style={{ color: '#F9AA1C' }}>
                  {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>
        )}

        {/* Text Input */}
        {inputMethod === 'text' && (
          <div>
            <label className="block mb-3 text-gray-700">
              Describe your condition or symptoms:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
                setAnalyzedResult(null);
              }}
              placeholder="E.g., I've been experiencing chest pain and shortness of breath for the past two days..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
            {textInput.length > 0 && textInput.length < 10 && (
              <p className="mt-2 text-sm text-amber-600">
                Please provide more details (minimum 10 characters)
              </p>
            )}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={analyzeSymptoms}
          disabled={!canAnalyze || isAnalyzing}
          className={`
            mt-6 w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2
            ${canAnalyze && !isAnalyzing
              ? 'bg-gradient-to-r text-white hover:shadow-lg hover:scale-[1.02]'
              : 'text-gray-400 cursor-not-allowed'
            }
          `}
          style={{ backgroundColor: '#006776' }}
        >
          <Sparkles className={`w-5 h-5 ${isAnalyzing ? 'animate-pulse' : ''}`}  />
          {isAnalyzing ? 'Analyzing...' : 'Analyze & Find Doctors'}
        </button>
      </div>

      {/* Analysis Result */}
      {analyzedResult && (
        <div id="analysis-results" className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-green-900 mb-2">
                Analysis Complete
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="text-gray-600">Recommended Specialty:</span>{' '}
                  <span className="text-green-700">{analyzedResult.specialty}</span>
                </p>
                {analyzedResult.subSpecialty && (
                  <p className="text-gray-700">
                    <span className="text-gray-600">Sub-specialty:</span>{' '}
                    <span className="text-green-700">{analyzedResult.subSpecialty}</span>
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-500"
                      style={{ width: `${analyzedResult.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {Math.round(analyzedResult.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  This is an AI-powered suggestion. Please consult with the doctor for accurate diagnosis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Doctors */}
      {filteredDoctors.length > 0 && (
        <div>
          <h3 className="mb-4 text-gray-900">
            Available Doctors ({filteredDoctors.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={() => onDoctorSelect(doctor)}
                highlighted
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
