import React from 'react'

export default function BookingTailwind() {
  const steps = [
    {
      icon: 'assets/img/steps/selection.svg',
      bgColor: 'bg-primary-yellow',
      title: 'Choose Destination',
      desc: 'Choose your favourite place. No matter where you travel inside the World.'
    },
    {
      icon: 'assets/img/steps/water-sport.svg',
      bgColor: 'bg-primary',
      title: 'Make Payment',
      desc: 'After find your perfect spot, make your payment and get ready to travel.'
    },
    {
      icon: 'assets/img/steps/taxi.svg',
      bgColor: 'bg-[#006380]',
      title: 'Reach Airport on Selected Date',
      desc: 'Lastly, you have to arrive at the airport on time and enjoy the vacation.'
    }
  ]

  return (
    <section className="relative pt-16 md:pt-24 pb-20 overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column: 3 Steps */}
          <div className="w-full lg:w-1/2 text-left">
            <h5 className="text-secondary font-semibold text-sm sm:text-base uppercase tracking-widest mb-3">
              Easy and Fast
            </h5>
            <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize leading-tight mb-8 sm:mb-10">
              Book your next trip in 3 easy steps
            </h3>

            <div className="space-y-7 sm:space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div
                    className={`${step.bgColor} w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 mr-4 sm:mr-6 shadow-sm`}
                  >
                    <img src={step.icon} alt={step.title} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="text-secondary font-bold text-base sm:text-lg mb-1">
                      {step.title}
                    </h5>
                    <p className="text-secondary text-sm sm:text-base font-normal leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Booking Card with Floating Ongoing Card */}
          <div className="w-full lg:w-1/2 flex justify-center relative mt-6 lg:mt-0">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-28 -right-12 sm:-right-24 w-80 sm:w-96 md:w-[500px] h-80 sm:h-96 md:h-[500px] pointer-events-none -z-10 opacity-70">
              <img
                src="assets/img/steps/bg.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Container for Cards */}
            <div className="relative w-full max-w-[370px]">
              
              {/* Main "Trip to Greece" Card */}
              <div className="bg-white rounded-3xl shadow-card-custom p-5 sm:p-6 relative z-10 border border-gray-100">
                <div className="overflow-hidden rounded-2xl mb-5">
                  <img
                    src="assets/img/steps/booking-img.jpg"
                    alt="Trip To Greece"
                    className="w-full h-44 object-cover"
                  />
                </div>

                <h5 className="font-sans font-bold text-dark-navy text-lg sm:text-xl mb-1.5">
                  Trip To Greece
                </h5>
                <p className="text-secondary text-sm font-medium mb-4">
                  14-29 June | by Robbin joseph
                </p>

                {/* 3 Icon Buttons */}
                <div className="flex items-center space-x-3.5 mb-6">
                  <button className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none">
                    <img src="assets/img/steps/leaf.svg" alt="leaf" className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none">
                    <img src="assets/img/steps/map.svg" alt="map" className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none">
                    <img src="assets/img/steps/send.svg" alt="send" className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center text-secondary text-sm font-medium">
                    <img
                      src="assets/img/steps/building.svg"
                      alt="building"
                      className="w-4 h-4 mr-3"
                    />
                    <span>24 people going</span>
                  </div>
                  <button className="p-1 hover:scale-110 active:scale-95 transition-transform focus:outline-none">
                    <img src="assets/img/steps/heart.svg" alt="favorite" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Floating "Ongoing: Trip to Rome" Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-16 md:-right-20 bg-white rounded-[20px] shadow-2xl p-4 sm:p-5 w-full sm:w-[260px] z-20 border border-gray-100/80">
                <div className="flex items-start">
                  <img
                    src="assets/img/steps/favorite-placeholder.png"
                    alt="Rome"
                    className="w-12 h-12 rounded-full object-cover mr-3.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-secondary text-xs font-medium mb-1">
                      Ongoing
                    </p>
                    <h5 className="font-sans font-bold text-dark-navy text-sm sm:text-base truncate mb-2">
                      Trip to rome
                    </h5>
                    <div className="flex items-center justify-between text-xs font-medium text-dark-navy mb-2">
                      <span><span className="text-[#8A79DF] font-bold">40%</span> completed</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8A79DF] rounded-full w-[40%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
