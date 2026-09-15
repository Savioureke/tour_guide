import React from 'react'

export default function ServiceTailwind() {
  const services = [
    {
      icon: 'assets/img/category/icon1.png',
      title: 'Heritage Storytelling',
      desc: 'Transform raw historical dates and monuments into captivating, memorable stories that keep travelers engaged.',
      active: false
    },
    {
      icon: 'assets/img/category/icon2.png',
      title: 'Route Logistics & Timing',
      desc: 'Master crowd navigation, landmarks pacing, and seamless time management for flawless itinerary execution.',
      active: true // Featured in original template
    },
    {
      icon: 'assets/img/category/icon3.png',
      title: 'Safety & Field Protocols',
      desc: 'Essential first-response awareness, emergency guest communication, and responsible field management.',
      active: false
    },
    {
      icon: 'assets/img/category/icon4.png',
      title: 'VIP Hospitality & Earning',
      desc: 'Deliver bespoke private walking experiences, corporate delegation guiding, and command premium $40–$75/hr rates.',
      active: false
    }
  ]

  return (
    <section className="relative pt-16 md:pt-28 pb-16" id="service">
      {/* Decorative Top-Right Stars Shape */}
      <div className="absolute right-4 top-8 hidden lg:block pointer-events-none -z-10">
        <img
          src="assets/img/category/shape.svg"
          alt="service decoration"
          className="w-32 xl:w-44 h-auto opacity-70"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h5 className="text-secondary font-semibold text-sm sm:text-base uppercase tracking-widest mb-3">
            GUIDING METHODOLOGY & SKILLS
          </h5>
          <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            Core Skills of a Professional Tour Guide
          </h3>
          <p className="text-secondary text-sm sm:text-base max-w-2xl mx-auto mt-3">
            We teach you how to turn local culture into an unforgettable experience. Learn professional guide procedures while earning from real client bookings.
          </p>
        </div>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              {/* Jadoo Coral Rounded Backdrop Accent (Visible on hover or default featured) */}
              <div
                className={`absolute -bottom-6 -left-6 w-24 h-24 bg-primary rounded-tl-[30px] rounded-br-[10px] -z-10 transition-all duration-300 pointer-events-none ${
                  service.active
                    ? 'opacity-100 -translate-x-1 translate-y-1'
                    : 'opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1'
                }`}
              />

              {/* Service Card */}
              <div
                className={`h-full bg-white rounded-[36px] p-8 sm:p-9 text-center flex flex-col items-center transition-all duration-300 ${
                  service.active
                    ? 'shadow-service-hover -translate-y-2'
                    : 'hover:shadow-service-hover hover:-translate-y-2'
                }`}
              >
                <div className="h-24 flex items-center justify-center mb-4">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="max-h-20 w-auto object-contain"
                  />
                </div>
                <h4 className="font-sans font-semibold text-dark-navy text-lg sm:text-xl mb-3">
                  {service.title}
                </h4>
                <p className="text-secondary text-sm sm:text-base font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
