import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HeroTailwind() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // Real, professional tour guide training lessons
  const trainingVideos = [
    {
      id: 'AUM-upgCd10',
      title: 'Lesson 1: Introduction to Professional Guiding & Leadership',
      duration: 'Core Fundamentals'
    },
    {
      id: 'v6H5zQ4q7-I',
      title: 'Lesson 2: Tour Guiding Best Practices & Delighting Guests',
      duration: 'Masterclass'
    },
    {
      id: 'gT8oB-L2Q4g',
      title: 'Lesson 3: Earning Secrets & Getting 5-Star Reviews',
      duration: 'Monetization'
    },
    {
      id: 'JD1CYQFiiVE',
      title: 'Lesson 4: Storytelling & The T.O.R.E. Interpretation Framework',
      duration: 'Field Technique'
    }
  ]
  const [selectedVideoId, setSelectedVideoId] = useState('AUM-upgCd10')

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Tour Guide Training & Global Client Network
            </div>

            <h1 className="font-volkhov font-bold text-dark-navy text-4xl sm:text-5xl md:text-6xl lg:text-[70px] lg:leading-[80px] tracking-tight mb-6">
              Love Your City?{' '}
              <span className="relative inline-block whitespace-nowrap">
                Guide Tourists
                <img
                  src="assets/img/hero/shape.svg"
                  alt=""
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full -z-10 pointer-events-none"
                />
              </span>{' '}
              Professionally — and Get Paid.
            </h1>

            <p className="text-secondary text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
              Turn your passion for travel, culture, and history into a thriving career. Learn how to be an expert tour guide with free training, or sign up as an existing guide, fund your account (min $10), and get advertised to companies and travelers globally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-8">
              <a
                href="#booking"
                className="w-full sm:w-auto text-center inline-block bg-primary-yellow hover:bg-[#df9901] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-[12px] shadow-primary-btn hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start Guide Training
              </a>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center group focus:outline-none"
                aria-label="Play Free Tour Guide Training Intro Video"
              >
                <span className="w-[52px] h-[52px] rounded-full bg-primary flex items-center justify-center shadow-danger-btn group-hover:scale-110 active:scale-95 transition-transform">
                  <img src="assets/img/hero/play.svg" width="15" alt="Play" className="ml-0.5" />
                </span>
                <span className="text-secondary font-medium text-base sm:text-lg ml-4 group-hover:text-primary transition-colors text-left">
                  Watch Free Intro Video
                  <span className="block text-xs text-gray-400 font-normal">How to guide & make money</span>
                </span>
              </button>
            </div>

            {/* Quick Micro-Highlights */}
            <div className="mt-10 pt-6 border-t border-gray-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-secondary font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Free Introductory Video</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Minimum $10 Account Activation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
                <span>Worldwide Company & Client Leads</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[650px]">
              <img
                src="assets/img/hero/hero-img.png"
                alt="Professional Tour Guide"
                className="w-full h-auto object-contain drop-shadow-md relative z-10"
              />

              {/* Floating Verified Guide Badge */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3 sm:p-4 z-20 border border-gray-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  🧭
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-primary">Global Directory</p>
                  <p className="text-xs sm:text-sm font-bold text-dark-navy">500+ Expert Tour Guides</p>
                  <p className="text-[11px] text-secondary">Earning $35 - $75/hr worldwide</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Free Tour Guide Video Tutorial Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-dark-navy text-white flex items-center justify-between border-b border-gray-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-yellow bg-primary-yellow/10 px-2.5 py-0.5 rounded-full">
                  Free Introductory Training Tutorial
                </span>
                <h3 className="font-volkhov font-bold text-lg sm:text-xl mt-1">
                  How to Be a Professional Tour Guide & Make Money
                </h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors focus:outline-none"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Lesson Selector Tabs */}
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-gray-200">
              {trainingVideos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => setSelectedVideoId(vid.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedVideoId === vid.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-secondary hover:text-dark-navy border border-gray-200'
                  }`}
                >
                  {vid.title}
                </button>
              ))}
            </div>

            {/* Video Player Container with Real Tour Guide Video */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                key={selectedVideoId}
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=1`}
                title="Tour Guide Training Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Post-Video Next Steps Prompt */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-dark-navy text-sm sm:text-base">
                  Ready to continue training and get global clients?
                </h4>
                <p className="text-secondary text-xs sm:text-sm mt-0.5">
                  Fund your account with a minimum of $10 to unlock the full certification curriculum and list your profile live on the global guide directory.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/signup"
                  onClick={() => setIsVideoOpen(false)}
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
                >
                  Sign Up & Fund ($10 Min)
                </Link>
                <a
                  href="#booking"
                  onClick={() => setIsVideoOpen(false)}
                  className="hidden sm:inline-block px-4 py-3 rounded-xl bg-white border border-gray-200 text-dark-navy font-semibold text-xs hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
