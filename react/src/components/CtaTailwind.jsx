import React, { useState } from 'react'

export default function CtaTailwind() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <section className="pt-12 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative bg-[#DFD7F9]/20 rounded-[40px] sm:rounded-[60px] lg:rounded-tl-[129px] lg:rounded-tr-[20px] lg:rounded-br-[20px] lg:rounded-bl-[20px] py-14 sm:py-16 md:py-20 px-6 sm:px-10 md:px-16 text-center overflow-visible">
          
          {/* Top-Right Floating Send Paper Plane */}
          <div className="absolute -top-5 -right-3 sm:-top-7 sm:-right-4 w-12 sm:w-16 md:w-[70px] pointer-events-none drop-shadow-lg z-20">
            <img
              src="assets/img/cta/send.png"
              alt="Send"
              className="w-full h-auto"
            />
          </div>

          {/* Background Concentric Rings (Top Right) */}
          <div className="absolute right-0 top-0 pointer-events-none -z-0 opacity-80 overflow-hidden rounded-tr-[20px] max-w-[180px] sm:max-w-[264px]">
            <img
              src="assets/img/cta/shape-bg2.png"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Background Concentric Rings (Bottom Left) */}
          <div className="absolute left-0 bottom-0 pointer-events-none -z-0 opacity-60 hidden sm:block max-w-[240px] md:max-w-[340px]">
            <img
              src="assets/img/cta/shape-bg1.png"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-sans font-bold text-secondary text-2xl sm:text-3xl md:text-[33px] md:leading-[54px] mb-8 sm:mb-12">
              Ready to Become a Certified Tour Guide and Get Booked by Global Travelers?
            </h2>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
            >
              {/* Email Input with Mail Icon */}
              <div className="relative w-full sm:flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to start"
                  required
                  className="w-full bg-white text-dark-navy placeholder-gray-400 pl-14 pr-4 py-4 sm:py-4.5 rounded-[10px] border border-gray-100 focus:border-primary focus:outline-none shadow-sm text-base transition-colors"
                />
                <img
                  src="assets/img/cta/mail.svg"
                  alt="mail icon"
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50 pointer-events-none"
                />
              </div>

              {/* Gradient Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-b from-[#FF946D] to-[#FF7D68] hover:from-[#FF7D68] hover:to-[#FF946D] text-white font-medium text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-4.5 rounded-[10px] shadow-danger-btn hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 focus:outline-none"
              >
                {subscribed ? 'Registered!' : 'Start Guide Training'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
