import React, { useState } from 'react'

export default function HeroTailwind() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 overflow-hidden" id="top">
      {/* Decorative Hero Background Decore */}
      <div
        className="absolute top-0 right-0 w-full md:w-[700px] lg:w-[780px] h-[600px] lg:h-[750px] bg-no-repeat bg-right-top -z-10 pointer-events-none opacity-90"
        style={{ backgroundImage: 'url(assets/img/hero/hero-bg.svg)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
            <h4 className="font-bold text-primary text-sm sm:text-base md:text-lg uppercase tracking-wider mb-4">
              Best Destinations around the world
            </h4>

            <h1 className="font-volkhov font-bold text-dark-navy text-4xl sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[82px] tracking-tight mb-6">
              Travel,{' '}
              <span className="relative inline-block whitespace-nowrap">
                enjoy
                <img
                  src="assets/img/hero/shape.svg"
                  alt=""
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full -z-10 pointer-events-none"
                />
              </span>{' '}
              and live a new and full life
            </h1>

            <p className="text-secondary text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
              Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-8">
              <a
                href="#booking"
                className="w-full sm:w-auto text-center inline-block bg-primary-yellow hover:bg-[#df9901] text-white font-medium text-base sm:text-lg px-7 py-4 rounded-[10px] shadow-primary-btn hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Find out more
              </a>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center group focus:outline-none"
                aria-label="Play Demo Video"
              >
                <span className="w-[52px] h-[52px] rounded-full bg-primary flex items-center justify-center shadow-danger-btn group-hover:scale-110 active:scale-95 transition-transform">
                  <img src="assets/img/hero/play.svg" width="15" alt="Play" className="ml-0.5" />
                </span>
                <span className="text-secondary font-medium text-base sm:text-lg ml-4 group-hover:text-primary transition-colors">
                  Play Demo
                </span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[650px]">
              <img
                src="assets/img/hero/hero-img.png"
                alt="Travel and Tour"
                className="w-full h-auto object-contain drop-shadow-md relative z-10"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Video Popup Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors focus:outline-none"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_lhdhL4UDIo?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
