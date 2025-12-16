import { useState, useRef } from 'react';

import { X, User, Phone, Mail, Calendar, Clock, FileText } from 'lucide-react';
import { Doctor, BookingData } from '../App';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

export function BookingModal({ doctor, onClose, onSubmit }: BookingModalProps) {
  const dateScrollRef = useRef<HTMLDivElement>(null);
  const timeScrollRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];
  

  const [formData, setFormData] = useState<BookingData>({
    patientName: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    preferredDate: todayISO,
    preferredTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Valid phone number is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof BookingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Generate available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  // Get min date (today) and generate next 30 days
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      fullDate: date.toISOString().split('T')[0]
    };
  };

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const delta = direction === 'left' ? -320 : 320;
    const nextPosition = ref.current.scrollLeft + delta;
    ref.current.scrollTo({ left: nextPosition, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 text-white p-4 sm:p-6 flex items-center justify-between" style={{ backgroundColor: '#006776' }}>
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="mb-1 text-base sm:text-lg">Book Appointment</h3>

            <p className="font-semibold truncate" style={{ opacity: 0.9, color: '#F9AA1C', fontSize: '14px' }}>
              with <span className="font-semibold" style={{ opacity: 0.9, color: '#F9AA1C', fontSize: '16px' }}>Dr. {doctor.name} </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              <User className="w-4 h-4 inline mr-2" />
              Patient Name *
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 ${
                errors.patientName ? 'border-red-500' : 'border-gray-200'
              }`}
              style={{ '--focus-ring-color': '#006776' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #006776'}
              onBlur={(e) => e.currentTarget.style.boxShadow = ''}
              placeholder="Enter full name"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
            )}
          </div>

          {/* Phone and Email in same row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-red-500' : 'border-gray-200'
                }`}
                style={{ '--focus-ring-color': '#006776' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #006776'}
                onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                style={{ '--focus-ring-color': '#006776' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #006776'}
                onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <label className="block text-gray-700 mb-3 font-medium text-sm sm:text-base">
                <Calendar className="w-4 h-4 inline mr-2" />
                Select Preferred Date *
              </label>

              <div className="relative">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollCarousel(dateScrollRef, 'left');
                    }}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <div 
                      ref={dateScrollRef}
                      className="overflow-x-auto pb-2 max-w-full w-full"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <div className="flex gap-3 sm:gap-4 px-1 w-max" style={{ width: 'max-content' }}>
                        {dateOptions.map((date) => {
                          const formatted = formatDate(date);
                          const isSelected = formData.preferredDate === formatted.fullDate;
                          return (
                            <button
                              key={formatted.fullDate}
                              type="button"
                              onClick={() => handleChange('preferredDate', formatted.fullDate)}
                              className={`flex-shrink-0 flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all min-w-[65px] sm:min-w-[80px] ${
                                isSelected
                                  ? 'border-[#006776] shadow-md'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              style={{
                                backgroundColor: isSelected ? '#006776' : 'white',
                                color: isSelected ? 'white' : undefined
                              }}
                            >
                              <span className={`text-[10px] sm:text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                                {formatted.day}
                              </span>
                              <span className={`text-lg sm:text-xl font-bold my-0.5 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                {formatted.date}
                              </span>
                              <span className={`text-[10px] sm:text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                                {formatted.month}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollCarousel(dateScrollRef, 'right');
                    }}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              {errors.preferredDate && (
                <p className="mt-2 text-sm text-red-600">{errors.preferredDate}</p>
              )}
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-gray-700 mb-3 font-medium text-sm sm:text-base">
                <Clock className="w-4 h-4 inline mr-2" />
                Select Preferred Time *
              </label>

              <div className="relative">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollCarousel(timeScrollRef, 'left');
                    }}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <div 
                      ref={timeScrollRef}
                      className="overflow-x-auto pb-2 max-w-full w-full"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <div className="flex gap-3 sm:gap-4 px-1 w-max" style={{ width: 'max-content' }}>
                        {timeSlots.map((time) => {
                          const isSelected = formData.preferredTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => handleChange('preferredTime', time)}
                              className={`flex-shrink-0 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl border-2 transition-all font-medium text-sm sm:text-base ${
                                isSelected
                                  ? 'border-[#006776] shadow-md'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              style={{
                                backgroundColor: isSelected ? '#006776' : 'white',
                                color: isSelected ? 'white' : '#374151'
                              }}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollCarousel(timeScrollRef, 'right');
                    }}
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              {errors.preferredTime && (
                <p className="mt-2 text-sm text-red-600">{errors.preferredTime}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              <FileText className="w-4 h-4 inline mr-2" />
              Additional Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 resize-none"
              style={{ '--focus-ring-color': '#006776' } as React.CSSProperties}
              onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px #006776'}
              onBlur={(e) => e.currentTarget.style.boxShadow = ''}
              rows={3}
              placeholder="Any specific concerns or information for the doctor..."
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
              style={{ backgroundColor: '#006776' }}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
