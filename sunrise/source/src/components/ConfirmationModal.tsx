import { CheckCircle2, Calendar, Clock, User, Phone, Mail, X } from 'lucide-react';
import { BookingData } from '../App';

interface ConfirmationModalProps {
  bookingData: BookingData;
  onClose: () => void;
}

export function ConfirmationModal({ bookingData, onClose }: ConfirmationModalProps) {
  const bookingId = `APPT-${Date.now().toString().slice(-8)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Success Header */}
        <div className="text-white p-4 sm:p-8 text-center rounded-t-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #006776 0%, #0d7a8a 100%)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
          
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: '#006776' }} />
            </div>
            <h3 className="mb-2 text-xl sm:text-2xl font-bold">Booking Confirmed!</h3>
            <p className="text-white/90 text-base sm:text-lg">
              Your appointment has been successfully scheduled
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-4 sm:p-8">
          {/* Booking ID */}
          <div className="rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center border-2" style={{ backgroundColor: '#d4e8e3', borderColor: '#006776' }}>
            <p className="text-xs sm:text-sm font-medium mb-1" style={{ color: '#006776' }}>Booking ID</p>
            <p className="font-bold text-base sm:text-lg" style={{ color: '#006776' }}>{bookingId}</p>
          </div>

          {/* Details Grid */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {bookingData.doctor && (
              <div className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d4e8e3' }}>
                  <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#006776' }} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Doctor</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">Dr. {bookingData.doctor.name}</p>
                  <p className="text-xs sm:text-sm" style={{ color: '#F9AA1C' }}>{bookingData.doctor.specialty}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d4e8e3' }}>
                <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#006776' }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Patient</p>
                <p className="text-sm sm:text-base text-gray-900 font-semibold">{bookingData.patientName}</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {bookingData.age} years, {bookingData.gender}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d4e8e3' }}>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#006776' }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Appointment Date & Time</p>
                <p className="text-sm sm:text-base text-gray-900 font-semibold">
                  {new Date(bookingData.preferredDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex items-center gap-1 mt-1" style={{ color: '#006776' }}>
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">{bookingData.preferredTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d4e8e3' }}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#006776' }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Contact</p>
                <p className="text-sm sm:text-base text-gray-900 font-medium break-words">{bookingData.phone}</p>
                <div className="flex items-center gap-1 mt-1 text-gray-600">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-all">{bookingData.email}</span>
                </div>
              </div>
            </div>

            {bookingData.notes && (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Notes</p>
                  <p className="text-sm sm:text-base text-gray-700">{bookingData.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border-2" style={{ backgroundColor: '#FFF8E7', borderColor: '#F9AA1C' }}>
            <p className="text-xs sm:text-sm font-medium" style={{ color: '#C87A00' }}>
              📧 A confirmation email has been sent to <span className="font-semibold break-all">{bookingData.email}</span> with all appointment details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 sm:py-4 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all text-base sm:text-lg font-semibold"
              style={{ backgroundColor: '#006776' }}
            >
              Book Another Appointment
            </button>
            <button
              onClick={() => window.print()}
              className="w-full py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-base sm:text-lg font-semibold"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
