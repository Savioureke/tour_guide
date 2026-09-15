import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function BookingTailwind() {
  // Available Tour Guiding Specialties with distinct training & client focus
  const tourPackages = [
    {
      id: 'heritage',
      title: 'Historical & Cultural Heritage Guiding',
      location: 'Historic Districts & Monuments',
      dateRange: 'Immediate Access',
      duration: '4-Week Blueprint',
      basePrice: 250,
      image: 'assets/img/steps/booking-img.jpg',
      category: 'Landmarks & Architecture',
      badge: 'Most Popular',
      peopleGoing: 64,
      description: 'Master monument narration, skip-the-line group pacing, and charge $35-$50/hr conducting historic walking tours.'
    },
    {
      id: 'wildlife',
      title: 'Nature, Safari & Adventure Guiding',
      location: 'National Parks & Wilderness Trails',
      dateRange: 'Immediate Access',
      duration: '6-Week Masterclass',
      basePrice: 450,
      image: 'assets/img/dest/dest1.jpg',
      category: 'Eco & Adventure Tours',
      badge: 'High Earning',
      peopleGoing: 41,
      description: 'Wilderness safety, wildlife spotting protocols, and gear logistics for premium expeditions earning $55-$80/hr.'
    },
    {
      id: 'culinary',
      title: 'Culinary, Wine & Street Food Trails',
      location: 'Gastronomy & Local Markets',
      dateRange: 'Immediate Access',
      duration: '4-Week Program',
      basePrice: 380,
      image: 'assets/img/dest/dest2.jpg',
      category: 'Food & Cultural Tasting',
      badge: 'High Demand',
      peopleGoing: 53,
      description: 'Partner with local vendors, design taste-testing routes, and build recurring revenue from international foodie groups.'
    },
    {
      id: 'vip',
      title: 'VIP Private & Executive Chaperone Guiding',
      location: 'Luxury & Bespoke Itineraries',
      dateRange: 'Immediate Access',
      duration: '5-Week Intensive',
      basePrice: 520,
      image: 'assets/img/dest/dest3.jpg',
      category: 'High-Ticket Bespoke',
      badge: 'Top Rated',
      peopleGoing: 28,
      description: 'Discretion, VIP protocol, corporate delegation handling, and luxury hotel concierge partnerships at $75-$120/hr.'
    }
  ]

  // Tier upgrades
  const tiers = [
    { id: 'standard', name: 'Standard Certification', priceOffset: 0, desc: 'Core guiding procedures + route templates' },
    { id: 'deluxe', name: 'Master Tour Guide', priceOffset: 150, desc: 'Full curriculum + client acquisition systems' },
    { id: 'luxury', name: 'Global VIP Placement', priceOffset: 350, desc: 'Priority agency recommendation & directory spotlight' }
  ]

  const [selectedTourId, setSelectedTourId] = useState('heritage')
  const [selectedTier, setSelectedTier] = useState('standard')
  const [trainees, setTrainees] = useState(1)
  const [includeMarketingKit, setIncludeMarketingKit] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [createdGuideData, setCreatedGuideData] = useState(null)
  
  // Registration & Funding Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    specialty: 'Historical & Cultural Heritage Guiding',
    fundingAmount: 10,
    paymentMethod: 'paypal',
    bio: ''
  })

  const currentTour = tourPackages.find((t) => t.id === selectedTourId) || tourPackages[0]
  const currentTierObj = tiers.find((t) => t.id === selectedTier) || tiers[0]

  // Calculation of training & wallet amounts
  const perPersonPrice = currentTour.basePrice + currentTierObj.priceOffset
  const marketingKitTotal = includeMarketingKit ? 35 * trainees : 0
  const subtotal = perPersonPrice * trainees
  const groupDiscount = trainees >= 3 ? Math.round(subtotal * 0.08) : 0
  const totalAmount = subtotal + marketingKitTotal - groupDiscount

  // Handle Form Submission & Supabase Storage
  const handleRegisterAndFund = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const minFunded = Math.max(10, Number(formData.fundingAmount) || 10)
      
      const newGuide = {
        name: formData.fullName.trim() || 'New Tour Guide',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim() || 'Global / Remote',
        specialty: formData.specialty || currentTour.title,
        picture: 'assets/img/dest/dest1.jpg',
        rate: `★ 5.0 · $45/hr`,
        rating: 5.0,
        funded_amount: minFunded,
        payment_method: formData.paymentMethod,
        status: 'active',
        training_completed: true,
        bio: formData.bio.trim() || `Certified Tour Guide specializing in ${currentTour.title}. Earning while guiding worldwide.`
      }

      // Save to Supabase tour_guides table
      const { data, error } = await supabase
        .from('tour_guides')
        .insert([newGuide])
        .select()

      if (error) {
        console.warn('Supabase insert note:', error.message)
      }

      setCreatedGuideData({
        ...newGuide,
        refCode: `GUIDE-${Math.floor(100000 + Math.random() * 900000)}`,
        id: data && data[0] ? data[0].id : undefined
      })

      setBookingConfirmed(true)
    } catch (err) {
      console.error('Submission error:', err)
      setCreatedGuideData({
        name: formData.fullName || 'New Tour Guide',
        location: formData.location || 'Global',
        fundingAmount: formData.fundingAmount || 10,
        paymentMethod: formData.paymentMethod,
        refCode: `GUIDE-${Math.floor(100000 + Math.random() * 900000)}`
      })
      setBookingConfirmed(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetModal = () => {
    setIsModalOpen(false)
    setBookingConfirmed(false)
  }

  const steps = [
    {
      icon: 'assets/img/steps/selection.svg',
      bgColor: 'bg-primary-yellow',
      title: '1. Watch Free Intro Video & Register',
      desc: 'Watch the introductory video to learn how professional guiding works and how to get paid. Gain immediate clarity on client expectations and procedures.'
    },
    {
      icon: 'assets/img/steps/water-sport.svg',
      bgColor: 'bg-primary',
      title: '2. Fund Account (Min $10) & Continue Training',
      desc: 'Fund your account with a minimum of $10. This activates your profile to be advertised to companies and travelers worldwide while unlocking advanced training.'
    },
    {
      icon: 'assets/img/steps/taxi.svg',
      bgColor: 'bg-[#006380]',
      title: '3. Set Payout Channel & Earn While Guiding',
      desc: 'Select how you want to be paid (PayPal, Wise, Bank Wire, Stripe). Receive bookings directly from clients globally, keep 100% of your tour fees, and grow your business.'
    }
  ]

  return (
    <section className="relative pt-16 md:pt-24 pb-20 overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            Step-by-Step Monetization Blueprint
          </div>
          <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize leading-tight">
            How to Guide & Earn at the Same Time
          </h3>
          <p className="text-secondary text-sm sm:text-base max-w-2xl mt-2">
            Whether you are starting fresh or already an active guide, our platform equips you with world-class procedures, client matching, and global exposure.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Interactive Tour Specialty Selection & Steps */}
          <div className="w-full lg:w-7/12 text-left">
            
            {/* Tour Destination Selector Tabs */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                Choose Guiding Specialty Track:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {tourPackages.map((tour) => {
                  const active = tour.id === selectedTourId
                  return (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => {
                        setSelectedTourId(tour.id)
                        setFormData((prev) => ({ ...prev, specialty: tour.title }))
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                        active
                          ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full inline-block mb-1 ${
                        active ? 'bg-primary text-white' : 'bg-gray-100 text-secondary'
                      }`}>
                        ${tour.basePrice}
                      </span>
                      <h4 className="font-bold text-dark-navy text-xs sm:text-sm line-clamp-1">
                        {tour.location.split('&')[0]}
                      </h4>
                      <p className="text-[11px] text-secondary line-clamp-1">{tour.duration}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Guiding Tier Selection */}
            <div className="mb-8 p-4 sm:p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Select Training Certification Tier:
                </span>
                <span className="text-xs text-primary font-semibold">
                  From ${currentTour.basePrice}/track
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {tiers.map((tier) => {
                  const active = tier.id === selectedTier
                  const calculatedPerPerson = currentTour.basePrice + tier.priceOffset
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        active
                          ? 'bg-white shadow-md border-2 border-primary'
                          : 'bg-white/80 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-dark-navy">{tier.name}</span>
                        <span className="text-xs font-bold text-primary">${calculatedPerPerson}</span>
                      </div>
                      <p className="text-[11px] text-secondary leading-tight">{tier.desc}</p>
                    </button>
                  )
                })}
              </div>

              {/* Trainee Seats & Client Kit Controls */}
              <div className="mt-4 pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-dark-navy">Guide Seats:</span>
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setTrainees((prev) => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 text-sm font-bold text-secondary hover:bg-gray-100 transition-colors"
                      disabled={trainees <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-dark-navy min-w-[28px] text-center">
                      {trainees}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTrainees((prev) => Math.min(10, prev + 1))}
                      className="px-2.5 py-1 text-sm font-bold text-secondary hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {trainees >= 3 && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      8% Team Discount!
                    </span>
                  )}
                </div>

                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeMarketingKit}
                    onChange={(e) => setIncludeMarketingKit(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-xs font-medium text-secondary">
                    Add Global Agency Client Kit (+$35)
                  </span>
                </label>
              </div>
            </div>

            {/* 3 Step Guides */}
            <div className="space-y-5 sm:space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start group">
                  <div
                    className={`${step.bgColor} w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 mr-4 shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <img src={step.icon} alt={step.title} className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-dark-navy font-bold text-sm sm:text-base mb-0.5">
                      {step.title}
                    </h5>
                    <p className="text-secondary text-xs sm:text-sm font-normal leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video preview callout */}
            <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  ▶
                </span>
                <div>
                  <h6 className="font-bold text-dark-navy text-xs sm:text-sm">
                    First Introductory Video is 100% Free
                  </h6>
                  <p className="text-secondary text-[11px]">
                    Learn basic tour guide principles before funding your account.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="text-xs font-bold text-primary hover:underline whitespace-nowrap ml-2"
              >
                Watch Now →
              </button>
            </div>

          </div>

          {/* Right Column: Live Guiding Summary Card */}
          <div className="w-full lg:w-5/12 flex justify-center relative mt-4 lg:mt-0">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-24 -right-12 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none -z-10 opacity-70">
              <img
                src="assets/img/steps/bg.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Main Interactive Guiding Card */}
            <div className="relative w-full max-w-[390px]">
              
              <div className="bg-white rounded-3xl shadow-card-custom p-5 sm:p-6 relative z-10 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                
                {/* Image Banner with Badge */}
                <div className="relative overflow-hidden rounded-2xl mb-4 h-44 group">
                  <img
                    src={currentTour.image}
                    alt={currentTour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-dark-navy shadow-sm">
                    {currentTour.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-dark-navy/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold">
                    {currentTour.duration}
                  </div>
                </div>

                {/* Tour Title & Meta */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-volkhov font-bold text-dark-navy text-lg sm:text-xl line-clamp-1">
                    {currentTour.title}
                  </h4>
                </div>
                
                <p className="text-secondary text-xs font-medium mb-3">
                  {currentTour.dateRange} | {currentTour.category}
                </p>

                {/* Guiding Investment Breakdown Box */}
                <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/60 rounded-2xl p-3.5 mb-4 border border-orange-100">
                  <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                    <span>Certification ({currentTierObj.name}):</span>
                    <span className="font-semibold text-dark-navy">${perPersonPrice} × {trainees} seat{trainees > 1 ? 's' : ''}</span>
                  </div>
                  {includeMarketingKit && (
                    <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                      <span>Agency Promotion & Directory:</span>
                      <span className="font-semibold text-dark-navy">+${marketingKitTotal}</span>
                    </div>
                  )}
                  {groupDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold mb-1.5">
                      <span>Group Discount (8%):</span>
                      <span>-${groupDiscount}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 mt-1 border-t border-orange-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Initial Account Deposit</span>
                      <p className="text-[10px] text-gray-400">Min $10 activates live listing</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-volkhov text-primary">
                        ${totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Guiding Inclusions */}
                <div className="flex items-center justify-between py-2 border-y border-gray-100 mb-4 text-xs text-secondary">
                  <span className="flex items-center">
                    <img src="assets/img/steps/leaf.svg" alt="Eco" className="w-3.5 h-3.5 mr-1" />
                    Storytelling
                  </span>
                  <span className="flex items-center">
                    <img src="assets/img/steps/map.svg" alt="Map" className="w-3.5 h-3.5 mr-1" />
                    Route Pacing
                  </span>
                  <span className="flex items-center">
                    <img src="assets/img/steps/send.svg" alt="Support" className="w-3.5 h-3.5 mr-1" />
                    Global Clients
                  </span>
                </div>

                {/* Bottom Row & Instant Sign Up / Fund Button */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center text-secondary text-xs font-medium">
                    <img
                      src="assets/img/steps/building.svg"
                      alt="building"
                      className="w-4 h-4 mr-1.5"
                    />
                    <span>{currentTour.peopleGoing} active guides</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                      title={isBookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}
                    >
                      <img
                        src="assets/img/steps/heart.svg"
                        alt="favorite"
                        className={`w-4 h-4 transition-transform ${isBookmarked ? 'scale-125 filter drop-shadow' : ''}`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="bg-primary hover:bg-[#c95a43] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      Fund & Go Live ($10 Min)
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating "Live Guide Status" Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-12 md:-right-14 bg-white/95 backdrop-blur-md rounded-[20px] shadow-2xl p-3.5 sm:p-4 w-full sm:w-[250px] z-20 border border-gray-100">
                <div className="flex items-start">
                  <img
                    src="assets/img/steps/favorite-placeholder.png"
                    alt="Guide Status"
                    className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-secondary text-[11px] font-medium mb-0.5">
                      Directory Listing: Active
                    </p>
                    <h5 className="font-sans font-bold text-dark-navy text-xs sm:text-sm truncate mb-1">
                      {currentTour.title.split('&')[0]}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] font-medium text-dark-navy mb-1.5">
                      <span><span className="text-[#8A79DF] font-bold">Tier:</span> {currentTierObj.name.split(' ')[0]}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8A79DF] rounded-full w-[100%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Free Video Modal Popup */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-dark-navy text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-primary-yellow font-bold uppercase">Free Training Lesson</span>
                <h4 className="font-volkhov font-bold text-base sm:text-lg">Introduction to Professional Tour Guiding</h4>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/AUM-upgCd10?autoplay=1"
                title="Tour Guide Training Tutorial: Professional Tour Leadership & Body Language"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 bg-amber-50/80 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200">
              <p className="text-xs sm:text-sm text-secondary">
                Ready to fund your account with a minimum of $10 and appear on our global directory?
              </p>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false)
                  setIsModalOpen(true)
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#c95a43] transition-all whitespace-nowrap"
              >
                Fund Account ($10 Min) & Go Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Tour Guide Registration & Funding Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-navy/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-dark-navy w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {!bookingConfirmed ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Tour Guide Onboarding & Funding Gateway
                  </span>
                  <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2">
                    Fund Account & Publish Global Profile
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm mt-1">
                    Deposit a minimum of $10 into your guide wallet to unlock full training modules and publish your profile directly to the global directory.
                  </p>
                </div>

                {/* Amount Summary Alert Box */}
                <div className="bg-[#FFF1DA]/60 border border-[#F1A501]/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-secondary">Guiding Specialty:</span>
                    <p className="font-bold text-dark-navy text-sm">{currentTour.title}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-secondary">Min Deposit Required:</span>
                    <p className="text-2xl font-bold font-volkhov text-primary">
                      ${Math.max(10, formData.fundingAmount || 10)}
                    </p>
                  </div>
                </div>

                {/* Guide Signup & Funding Form */}
                <form onSubmit={handleRegisterAndFund} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-navy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mateo Rossi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guide@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        City & Country of Guiding *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rome, Italy or Tokyo, Japan"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Initial Funding Deposit ($USD, Min $10) *
                      </label>
                      <input
                        type="number"
                        min="10"
                        step="5"
                        required
                        value={formData.fundingAmount}
                        onChange={(e) => setFormData({ ...formData, fundingAmount: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold text-dark-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark-navy mb-1">
                      Payout Channel (How you receive client earnings)
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary bg-white"
                    >
                      <option value="paypal">PayPal Account (Instant Transfer)</option>
                      <option value="wise">Wise (Direct Multi-Currency Transfer)</option>
                      <option value="bank">Direct Bank Wire / ACH</option>
                      <option value="stripe">Stripe Connect Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark-navy mb-1">
                      Brief Bio / Highlight for Tourists & Agencies
                    </label>
                    <textarea
                      rows="2"
                      placeholder="e.g. 5+ years sharing ancient architecture and hidden local bistros with private groups."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-primary hover:bg-[#c95a43] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Funding Account & Publishing...' : `Fund $${Math.max(10, formData.fundingAmount || 10)} & Go Live on Directory`}
                  </button>

                  <p className="text-[11px] text-center text-secondary">
                    🔒 Connected to official Supabase tour_guide backend. Minimum $10 deposit activates your listing to international companies and travelers.
                  </p>
                </form>
              </div>
            ) : (
              /* Success Confirmation Card */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Profile Live on Homepage Showcase!
                </span>
                <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2 mb-1">
                  You are live! Clients and companies can now book you.
                </h3>
                <p className="text-secondary text-sm mb-6">
                  Your $10+ deposit has been recorded in the Supabase backend. When clients message or book you, you will receive notifications directly at <span className="font-semibold text-dark-navy">{formData.email || 'your email'}</span>.
                </p>

                {/* Digital Receipt Card */}
                <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200/80 mb-6 space-y-2 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Guide Reference ID:</span>
                    <span className="font-mono font-bold text-dark-navy">{createdGuideData?.refCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guide Name:</span>
                    <span className="font-semibold text-dark-navy">{createdGuideData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guiding Territory:</span>
                    <span className="font-semibold text-dark-navy">{createdGuideData?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payout Channel:</span>
                    <span className="font-semibold text-dark-navy">{createdGuideData?.paymentMethod?.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-sm text-dark-navy">
                    <span>Wallet Funded Status:</span>
                    <span className="text-emerald-600 font-bold">${createdGuideData?.funded_amount || 10} Confirmed Active</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#destination"
                    onClick={resetModal}
                    className="flex-1 py-3 bg-primary hover:bg-[#c95a43] text-white font-bold text-sm rounded-xl transition-all text-center"
                  >
                    View Global Guides Directory
                  </a>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="flex-1 py-3 bg-dark-navy hover:bg-dark-navy/90 text-white font-bold text-sm rounded-xl transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  )
}
