import React, { useState, useEffect } from 'react'

export default function TestimonialTailwind() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      avatar: 'assets/img/testimonial/author.png',
      quote:
        '“Booking through Tour Guide was an incredible experience. From the curated itineraries to the seamless hotel bookings, every moment of our trip felt effortless and unforgettable.”',
      name: 'Mike Taylor',
      role: 'Lahore, Pakistan'
    },
    {
      avatar: 'assets/img/testimonial/author2.png',
      quote:
        '“Tour Guide is recognized as one of the finest travel agencies in the world. When it came to planning a trip, I found them to be dependable and exceptional.”',
      name: 'Thomas Wagon',
      role: 'CEO of Red Button'
    },
    {
      avatar: 'assets/img/testimonial/author3.png',
      quote:
        '“Our family vacation exceeded all expectations thanks to Tour Guide. Their 24/7 customer support and personalized local recommendations made our journey truly memorable.”',
      name: 'Kelly William',
      role: 'Khulna, Bangladesh'
    }
  ]

  // Auto switch testimonial every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[activeIndex]
  const nextItem = testimonials[(activeIndex + 1) % testimonials.length]

  return (
    <section className="relative pt-16 md:pt-24 pb-20" id="testimonial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-12">
          
          {/* Left Column: Heading & Dots */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <h5 className="text-secondary font-semibold text-sm sm:text-base uppercase tracking-widest mb-3">
              Testimonials
            </h5>
            <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize leading-tight mb-8">
              What people say about Us.
            </h3>

            {/* Carousel Dot Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all focus:outline-none ${
                    idx === activeIndex
                      ? 'bg-dark-navy scale-110'
                      : 'bg-[#E5E5E5] hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: 3D Stacked Carousel Cards + Navigation Arrows */}
          <div className="w-full lg:w-7/12 flex items-center justify-center lg:justify-end">
            <div className="flex items-center gap-4 sm:gap-8 max-w-lg w-full">
              
              {/* Stacked Cards Container */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[240px]">
                
                {/* Background Offset Card (Layered Depth) */}
                <div className="absolute top-12 left-8 sm:left-10 right-0 sm:-right-8 bg-white/70 rounded-[18px] border-2 border-gray-100 p-6 sm:p-8 z-0 pointer-events-none transform translate-y-3 sm:translate-y-4 transition-all duration-500">
                  <p className="text-gray-400 text-sm sm:text-base line-clamp-2 mb-4">
                    {nextItem.quote}
                  </p>
                  <h6 className="text-gray-400 font-bold text-sm sm:text-base">
                    {nextItem.name}
                  </h6>
                  <p className="text-gray-400 text-xs">
                    {nextItem.role}
                  </p>
                </div>

                {/* Active Foreground Card */}
                <div className="relative bg-white rounded-[18px] shadow-card-custom p-6 sm:p-8 z-10 border border-gray-100 transition-all duration-500">
                  {/* Author Avatar Floating at Top Left */}
                  <div className="absolute -top-7 -left-5 sm:-left-7 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-secondary font-medium text-sm sm:text-base leading-relaxed mb-6 mt-2">
                    {current.quote}
                  </p>
                  <h5 className="font-sans font-bold text-dark-navy text-base sm:text-lg mb-0.5">
                    {current.name}
                  </h5>
                  <p className="text-secondary text-xs sm:text-sm font-medium">
                    {current.role}
                  </p>
                </div>

              </div>

              {/* Up / Down Navigation Controls */}
              <div className="flex flex-col space-y-8 flex-shrink-0 z-20">
                <button
                  onClick={prevTestimonial}
                  className="p-2 text-gray-500 hover:text-dark-navy hover:scale-110 active:scale-95 transition-all focus:outline-none"
                  aria-label="Previous Testimonial"
                >
                  <img src="assets/img/icons/up.svg" alt="Up" className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 text-gray-500 hover:text-dark-navy hover:scale-110 active:scale-95 transition-all focus:outline-none"
                  aria-label="Next Testimonial"
                >
                  <img src="assets/img/icons/down.svg" alt="Down" className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
