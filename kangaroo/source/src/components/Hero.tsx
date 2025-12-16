import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onQuickBook: () => void;
  onStandardBook: () => void;
}

export function Hero({ onQuickBook, onStandardBook }: HeroProps) {

  return (
    <section className="relative px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 mt-5">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-full mb-6 mt-5" style={{ backgroundColor: '#EF586F' }}>
            <Calendar className="w-4 h-4" />
            <span>Smart Appointment Booking</span>
          </div> */}

          {/* Features */}
        {/* <div className="mt-0 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Expert Doctors', value: '200+' },
            { label: 'Specialties', value: '25+' },
            { label: 'Avg. Rating', value: '4.8' },
            { label: 'Response Time', value: '< 24h' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="text-blue-600 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}


          {/* <h1 className="mb-4 text-blue-900" style={{ color: '#7E52A0' }}>
            Book Your Appointment
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get the right care at the right time. Choose your preferred booking method and connect with the best doctors.
          </p> */}
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Booking Option */}
          <button
            onClick={onQuickBook}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent overflow-hidden"
            style={{ borderColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#EF586F'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: '#EF586F' }} />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: '#EF586F10' }}>
                  <Calendar className="w-7 h-7 transition-colors" style={{ color: '#EF586F' }} />
                </div>
                <h3 className="text-gray-900">
                  Quick Booking 
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Know your doctor? Book directly in seconds. Perfect for follow-ups and regular check-ups.
              </p>
              
              <div className="flex items-center transition-colors" style={{ color: '#7E52A0', fontWeight: 'bold' }}>
                <span className="mr-2">Book Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#7E52A0' }}  />
              </div>
            </div>
          </button>

          {/* Standard Booking Option */}
          <button
            onClick={onStandardBook}
            className="group relative bg-gradient-to-br  rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            style={{ backgroundColor: '#EF586F' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white">
                  Smart Booking
                </h3>
              </div>
              <p className="text-white mb-4" style={{ opacity: 0.9 }}>
                Not sure which doctor to see? Get AI-powered recommendations or browse by department or specialty.
              </p>
              
              <div className="flex items-center text-white">
                <span className="mr-2" style={{ color: '#7E52A0', fontWeight: 'bold' }}>Book Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#7E52A0' }} />
              </div>
            </div>
          </button>
        </div>

        
      </div>
    </section>
  );
}
