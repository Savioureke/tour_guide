import React, { useState } from 'react'

export default function BookingTailwind() {
  // Available Tour Packages with distinct amounts and characteristics
  const tourPackages = [
    {
      id: 'greece',
      title: 'Trip to Greece & Santorini',
      location: 'Santorini & Athens, Greece',
      dateRange: '14 - 22 July',
      duration: '8 Days / 7 Nights',
      basePrice: 680,
      image: 'assets/img/steps/booking-img.jpg',
      category: 'Coastal & Cultural',
      badge: 'Popular Choice',
      peopleGoing: 28,
      description: 'Explore ancient Greek ruins, whitewashed Aegean villages, and sunset sailing cruises.'
    },
    {
      id: 'rome',
      title: 'Historic Rome & Tuscan Wine Tour',
      location: 'Rome & Florence, Italy',
      dateRange: '05 - 12 August',
      duration: '7 Days / 6 Nights',
      basePrice: 540,
      image: 'assets/img/dest/dest1.jpg',
      category: 'History & Gastronomy',
      badge: 'Top Rated',
      peopleGoing: 34,
      description: 'Walk through the Colosseum, Vatican museums, and picturesque vineyards of Tuscany.'
    },
    {
      id: 'london',
      title: 'London & Highlands Adventure',
      location: 'London & Edinburgh, UK',
      dateRange: '10 - 19 September',
      duration: '9 Days / 8 Nights',
      basePrice: 890,
      image: 'assets/img/dest/dest2.jpg',
      category: 'City & Nature',
      badge: 'Bestseller',
      peopleGoing: 19,
      description: 'Discover historic castles, royal landmarks, and scenic Scottish mountain landscapes.'
    },
    {
      id: 'europe',
      title: 'Grand Alpine Europe Discovery',
      location: 'Switzerland, France & Austria',
      dateRange: '01 - 15 October',
      duration: '14 Days / 13 Nights',
      basePrice: 1450,
      image: 'assets/img/dest/dest3.jpg',
      category: 'Luxury Expedition',
      badge: 'VIP Tour',
      peopleGoing: 12,
      description: 'Panoramic mountain trains, luxury lake retreats, and iconic European capitals.'
    }
  ]

  // Tier upgrades
  const tiers = [
    { id: 'standard', name: 'Standard Explorer', priceOffset: 0, desc: '3-star hotel & group excursions' },
    { id: 'deluxe', name: 'Deluxe Guided', priceOffset: 150, desc: '4-star hotel + dedicated tour guide' },
    { id: 'luxury', name: 'VIP Luxury', priceOffset: 380, desc: '5-star suites + private chauffeur' }
  ]

  const [selectedTourId, setSelectedTourId] = useState('greece')
  const [selectedTier, setSelectedTier] = useState('standard')
  const [travelers, setTravelers] = useState(2)
  const [includeInsurance, setIncludeInsurance] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  
  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '2026-07-14',
    paymentMethod: 'card',
    specialNotes: ''
  })

  const currentTour = tourPackages.find((t) => t.id === selectedTourId) || tourPackages[0]
  const currentTierObj = tiers.find((t) => t.id === selectedTier) || tiers[0]

  // Calculation of booking amounts
  const perPersonPrice = currentTour.basePrice + currentTierObj.priceOffset
  const insuranceTotal = includeInsurance ? 35 * travelers : 0
  const subtotal = perPersonPrice * travelers
  const groupDiscount = travelers >= 3 ? Math.round(subtotal * 0.08) : 0
  const totalAmount = subtotal + insuranceTotal - groupDiscount

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setBookingConfirmed(true)
  }

  const resetModal = () => {
    setIsModalOpen(false)
    setBookingConfirmed(false)
  }

  const steps = [
    {
      icon: 'assets/img/steps/selection.svg',
      bgColor: 'bg-primary-yellow',
      title: '1. Select Tour & Budget Tier',
      desc: 'Pick your dream destination and customize your comfort level with transparent per-person pricing.'
    },
    {
      icon: 'assets/img/steps/water-sport.svg',
      bgColor: 'bg-primary',
      title: '2. Customize Group & Add-ons',
      desc: 'Choose the number of travelers, optional travel insurance, and see your exact calculated rate.'
    },
    {
      icon: 'assets/img/steps/taxi.svg',
      bgColor: 'bg-[#006380]',
      title: '3. Instant Confirmation & Travel',
      desc: 'Lock in your booking amount securely and receive your official digital travel pass immediately.'
    }
  ]

  return (
    <section className="relative pt-16 md:pt-24 pb-20 overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-8">
          <h5 className="text-secondary font-semibold text-sm sm:text-base uppercase tracking-widest mb-2">
            Tailored Tour Packages
          </h5>
          <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize leading-tight">
            Book Your Next Tour in 3 Easy Steps
          </h3>
          <p className="text-secondary text-sm sm:text-base max-w-2xl mt-2">
            Explore curated itineraries with flexible booking amounts, group savings, and instant price breakdowns.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Interactive Tour Selection & Steps */}
          <div className="w-full lg:w-7/12 text-left">
            
            {/* Tour Destination Selector Tabs */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                Choose Tour Destination:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {tourPackages.map((tour) => {
                  const active = tour.id === selectedTourId
                  return (
                    <button
                      key={tour.id}
                      type="button"
                      onClick={() => setSelectedTourId(tour.id)}
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
                        {tour.location.split(',')[0]}
                      </h4>
                      <p className="text-[11px] text-secondary line-clamp-1">{tour.duration.split('/')[0]}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tour Tier Selection */}
            <div className="mb-8 p-4 sm:p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Select Tour Tier & Inclusions:
                </span>
                <span className="text-xs text-primary font-semibold">
                  From ${currentTour.basePrice}/person
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

              {/* Group Travelers & Insurance Controls */}
              <div className="mt-4 pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-dark-navy">Travelers:</span>
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                      className="px-2.5 py-1 text-sm font-bold text-secondary hover:bg-gray-100 transition-colors"
                      disabled={travelers <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-dark-navy min-w-[28px] text-center">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers((prev) => Math.min(10, prev + 1))}
                      className="px-2.5 py-1 text-sm font-bold text-secondary hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {travelers >= 3 && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      8% Group Discount!
                    </span>
                  )}
                </div>

                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-xs font-medium text-secondary">
                    Add Travel Insurance (+$35/person)
                  </span>
                </label>
              </div>
            </div>

            {/* 3 Step Guides */}
            <div className="space-y-5 sm:space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <div
                    className={`${step.bgColor} w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 mr-4 shadow-sm`}
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
          </div>

          {/* Right Column: Live Booking Summary Card */}
          <div className="w-full lg:w-5/12 flex justify-center relative mt-4 lg:mt-0">
            {/* Soft Ambient Glow */}
            <div className="absolute -top-24 -right-12 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none -z-10 opacity-70">
              <img
                src="assets/img/steps/bg.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            {/* Main Interactive Booking Card */}
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

                {/* Booking Price Breakdown Box */}
                <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/60 rounded-2xl p-3.5 mb-4 border border-orange-100">
                  <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                    <span>Package ({currentTierObj.name}):</span>
                    <span className="font-semibold text-dark-navy">${perPersonPrice} × {travelers} traveler{travelers > 1 ? 's' : ''}</span>
                  </div>
                  {includeInsurance && (
                    <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                      <span>Travel Protection:</span>
                      <span className="font-semibold text-dark-navy">+${insuranceTotal}</span>
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
                      <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">Total Amount</span>
                      <p className="text-[10px] text-gray-400">Taxes & fees included</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-volkhov text-primary">
                        ${totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Amenities Icons */}
                <div className="flex items-center justify-between py-2 border-y border-gray-100 mb-4 text-xs text-secondary">
                  <span className="flex items-center">
                    <img src="assets/img/steps/leaf.svg" alt="Eco" className="w-3.5 h-3.5 mr-1" />
                    Eco Friendly
                  </span>
                  <span className="flex items-center">
                    <img src="assets/img/steps/map.svg" alt="Map" className="w-3.5 h-3.5 mr-1" />
                    Guided Itinerary
                  </span>
                  <span className="flex items-center">
                    <img src="assets/img/steps/send.svg" alt="Support" className="w-3.5 h-3.5 mr-1" />
                    24/7 Support
                  </span>
                </div>

                {/* Bottom Row & Instant Booking Button */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center text-secondary text-xs font-medium">
                    <img
                      src="assets/img/steps/building.svg"
                      alt="building"
                      className="w-4 h-4 mr-1.5"
                    />
                    <span>{currentTour.peopleGoing} joined</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                      title={isBookmarked ? 'Saved to wishlist' : 'Save to wishlist'}
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
                      Book Tour Now
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating "Ongoing Tour Status" Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-12 md:-right-14 bg-white/95 backdrop-blur-md rounded-[20px] shadow-2xl p-3.5 sm:p-4 w-full sm:w-[250px] z-20 border border-gray-100">
                <div className="flex items-start">
                  <img
                    src="assets/img/steps/favorite-placeholder.png"
                    alt="Ongoing Tour"
                    className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-secondary text-[11px] font-medium mb-0.5">
                      Ongoing Expedition
                    </p>
                    <h5 className="font-sans font-bold text-dark-navy text-xs sm:text-sm truncate mb-1">
                      {currentTour.title.split('&')[0]}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] font-medium text-dark-navy mb-1.5">
                      <span><span className="text-[#8A79DF] font-bold">Booking Tier:</span> {currentTierObj.name.split(' ')[0]}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8A79DF] rounded-full w-[75%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Interactive Tour Booking Modal */}
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
                    Confirm Tour Reservation
                  </span>
                  <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2">
                    {currentTour.title}
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm">
                    {currentTour.location} • {currentTour.duration}
                  </p>
                </div>

                {/* Amount Summary Alert Box */}
                <div className="bg-[#FFF1DA]/60 border border-[#F1A501]/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-secondary">Selected Package:</span>
                    <p className="font-bold text-dark-navy text-sm">{currentTierObj.name} ({travelers} Traveler{travelers > 1 ? 's' : ''})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-secondary">Total Due:</span>
                    <p className="text-2xl font-bold font-volkhov text-primary">${totalAmount}</p>
                  </div>
                </div>

                {/* Traveler Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-navy mb-1">
                      Lead Traveler Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robin Joseph"
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
                        placeholder="robin@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Phone Number *
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
                        Preferred Departure Date
                      </label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Payment Option
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary bg-white"
                      >
                        <option value="card">Credit / Debit Card (Instant)</option>
                        <option value="paypal">PayPal Express</option>
                        <option value="apple">Apple Pay / Google Pay</option>
                        <option value="crypto">Cryptocurrency (BTC/USDT)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-primary hover:bg-[#c95a43] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-[0.98]"
                  >
                    Confirm & Reserve Tour (${totalAmount})
                  </button>

                  <p className="text-[11px] text-center text-secondary">
                    🔒 Free 48-hour cancellation policy. No hidden booking charges.
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
                  Booking Confirmed!
                </span>
                <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2 mb-1">
                  You're going to {currentTour.location.split(',')[0]}!
                </h3>
                <p className="text-secondary text-sm mb-6">
                  Confirmation and full itinerary sent to <span className="font-semibold text-dark-navy">{formData.email || 'your email'}</span>.
                </p>

                {/* Digital Receipt Card */}
                <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200/80 mb-6 space-y-2 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Booking Reference:</span>
                    <span className="font-mono font-bold text-dark-navy">TRIP-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lead Traveler:</span>
                    <span className="font-semibold text-dark-navy">{formData.fullName || 'Guest'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tour & Tier:</span>
                    <span className="font-semibold text-dark-navy">{currentTour.title} ({currentTierObj.name})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travelers:</span>
                    <span className="font-semibold text-dark-navy">{travelers} Person{travelers > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-sm text-dark-navy">
                    <span>Total Amount Paid:</span>
                    <span className="text-primary">${totalAmount}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetModal}
                  className="w-full py-3 bg-dark-navy hover:bg-dark-navy/90 text-white font-bold text-sm rounded-xl transition-all"
                >
                  Close & View Itinerary
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  )
}
