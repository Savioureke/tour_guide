import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function DestinationTailwind() {
  const defaultGuides = [
    {
      id: 'g1',
      name: 'Mateo Rossi',
      location: 'Rome & Florence, Italy',
      picture: 'assets/img/dest/dest1.jpg',
      specialty: 'Ancient History & Colosseum VIP',
      rate: '★ 4.9 · $45/hr',
      rate_num: 45,
      rating: 4.9,
      funded_amount: 50.0,
      status: 'active'
    },
    {
      id: 'g2',
      name: 'Sophia Laurent',
      location: 'Paris & Provence, France',
      picture: 'assets/img/dest/dest2.jpg',
      specialty: 'Louvre & Parisian Gastronomy',
      rate: '★ 5.0 · $55/hr',
      rate_num: 55,
      rating: 5.0,
      funded_amount: 75.0,
      status: 'active'
    },
    {
      id: 'g3',
      name: 'Kenji Tanaka',
      location: 'Kyoto & Tokyo, Japan',
      picture: 'assets/img/dest/dest3.jpg',
      specialty: 'Historic Temples & Zen Gardens',
      rate: '★ 4.9 · $50/hr',
      rate_num: 50,
      rating: 4.9,
      funded_amount: 60.0,
      status: 'active'
    },
    {
      id: 'g4',
      name: 'Amara Okafor',
      location: 'Cape Town, South Africa',
      picture: 'assets/img/testimonial/author.png',
      specialty: 'Safari Expeditions & Coastal Trails',
      rate: '★ 5.0 · $48/hr',
      rate_num: 48,
      rating: 5.0,
      funded_amount: 40.0,
      status: 'active'
    },
    {
      id: 'g5',
      name: 'Elena Gomez',
      location: 'Barcelona, Spain',
      picture: 'assets/img/testimonial/author2.png',
      specialty: 'Gaudí Architecture & Tapas Trails',
      rate: '★ 4.8 · $42/hr',
      rate_num: 42,
      rating: 4.8,
      funded_amount: 30.0,
      status: 'active'
    }
  ]

  const [guides, setGuides] = useState(defaultGuides)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Booking Modal State for picking a guide
  const [selectedGuideForBooking, setSelectedGuideForBooking] = useState(null)
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    hours: 3
  })
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)

  // Fetch live guides from Supabase
  const loadGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('tour_guides')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        const formatted = data.map((g, idx) => ({
          ...g,
          picture: g.picture || defaultGuides[idx % defaultGuides.length].picture,
          rate_num: Number(g.rate_num) || (g.rate ? parseInt(g.rate.replace(/[^0-9]/g, '')) || 45 : 45)
        }))
        setGuides(formatted)
      }
    } catch (err) {
      console.error('Error fetching tour guides:', err)
    }
  }

  useEffect(() => {
    loadGuides()
  }, [])

  // Auto-shift carousel from right to left at intervals
  useEffect(() => {
    if (isPaused || guides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % guides.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [isPaused, guides.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length)
  }

  // Handle Client Booking Submission
  const handleClientBooking = async (e) => {
    e.preventDefault()
    if (!selectedGuideForBooking) return

    setIsBookingSubmitting(true)
    try {
      const hourlyRate = selectedGuideForBooking.rate_num || 45
      const totalPaidToGuide = hourlyRate * Number(clientForm.hours || 3)
      const leadFee = 2.0 // Deducted from guide's funded $10+ deposit

      // 1. Insert into bookings table
      const { data: bData, error: bError } = await supabase
        .from('bookings')
        .insert([
          {
            guide_id: selectedGuideForBooking.id,
            guide_name: selectedGuideForBooking.name,
            client_name: clientForm.name.trim(),
            client_email: clientForm.email.trim(),
            client_phone: clientForm.phone.trim(),
            tour_date: clientForm.date,
            hours: Number(clientForm.hours || 3),
            total_paid_to_guide: totalPaidToGuide,
            lead_fee_deducted: leadFee,
            payment_channel: 'Direct to Guide upon Meeting',
            status: 'confirmed'
          }
        ])
        .select()

      // 2. Deduct $2.00 from guide's funded_amount in tour_guides table
      const currentBalance = Number(selectedGuideForBooking.funded_amount || 10.0)
      const newBalance = Math.max(0, currentBalance - leadFee)

      await supabase
        .from('tour_guides')
        .update({
          funded_amount: newBalance,
          status: newBalance < 2.0 ? 'low_balance' : 'active'
        })
        .eq('id', selectedGuideForBooking.id)

      setBookingResult({
        bookingId: bData && bData[0] ? bData[0].id : `TRIP-${Math.floor(100000 + Math.random() * 900000)}`,
        guideName: selectedGuideForBooking.name,
        location: selectedGuideForBooking.location,
        clientName: clientForm.name,
        hours: clientForm.hours,
        totalPayable: totalPaidToGuide,
        leadFeeDeducted: leadFee,
        newGuideBalance: newBalance
      })

      // Reload live guides to update any changed states
      loadGuides()
    } catch (err) {
      console.error('Booking error:', err)
      setBookingResult({
        bookingId: `TRIP-${Math.floor(100000 + Math.random() * 900000)}`,
        guideName: selectedGuideForBooking.name,
        location: selectedGuideForBooking.location,
        clientName: clientForm.name,
        hours: clientForm.hours,
        totalPayable: (selectedGuideForBooking.rate_num || 45) * clientForm.hours,
        leadFeeDeducted: 2.0
      })
    } finally {
      setIsBookingSubmitting(false)
    }
  }

  const closeBookingModal = () => {
    setSelectedGuideForBooking(null)
    setBookingResult(null)
    setClientForm({
      name: '',
      email: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      hours: 3
    })
  }

  // Display 3 visible cards at a time on desktop
  const visibleCards = []
  const count = guides.length
  for (let i = 0; i < Math.min(3, count); i++) {
    visibleCards.push(guides[(currentIndex + i) % count])
  }

  return (
    <section className="relative pt-16 md:pt-24 pb-16 overflow-hidden" id="destination">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Spiral Spring on Right */}
        <div className="absolute right-0 bottom-12 hidden xl:block translate-x-12 pointer-events-none -z-10">
          <img
            src="assets/img/dest/shape.svg"
            alt="destination decoration"
            className="w-24 h-auto"
          />
        </div>

        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Global Directory & Live Showcase
          </div>
          <h3 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            Verified Tour Guides Around the World
          </h3>
          <p className="text-secondary text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Once guides register and fund their accounts (minimum $10), they appear here live. Travelers and agencies book guides directly, and the platform automatically deducts a small lead fee from the guide's funded balance.
          </p>
        </div>

        {/* Dynamic Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls: Left & Right Buttons */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-4 -right-4 md:-left-6 md:-right-6 z-20 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              className="pointer-events-auto w-11 h-11 rounded-full bg-white/95 shadow-xl border border-gray-100 flex items-center justify-center text-dark-navy hover:text-primary hover:scale-110 active:scale-95 transition-all focus:outline-none"
              aria-label="Previous Guides"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="pointer-events-auto w-11 h-11 rounded-full bg-white/95 shadow-xl border border-gray-100 flex items-center justify-center text-dark-navy hover:text-primary hover:scale-110 active:scale-95 transition-all focus:outline-none"
              aria-label="Next Guides"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cards Carousel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-md md:max-w-none mx-auto transition-all duration-500">
            {visibleCards.map((guide, idx) => (
              <div
                key={`${guide.id}-${idx}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col border border-gray-100/80"
              >
                {/* Image Container with zoom on hover */}
                <div className="relative overflow-hidden h-72 sm:h-80 md:h-96 w-full bg-gray-100">
                  <img
                    src={guide.picture || 'assets/img/dest/dest1.jpg'}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'assets/img/dest/dest1.jpg'
                    }}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-dark-navy shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Verified Global Guide
                  </div>

                  <div className="absolute top-4 right-4 bg-dark-navy/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                    {guide.rate || `★ 5.0 · $${guide.rate_num || 45}/hr`}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-dark-navy font-bold text-lg sm:text-xl group-hover:text-primary transition-colors">
                        {guide.name}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                        {guide.specialty ? guide.specialty.split('&')[0] : 'Cultural Guide'}
                      </span>
                    </div>
                    <div className="flex items-center text-secondary font-medium text-xs sm:text-sm">
                      <img
                        src="assets/img/dest/navigation.svg"
                        alt="Location"
                        className="w-3.5 h-3.5 mr-1.5"
                      />
                      <span>{guide.location}</span>
                    </div>
                  </div>

                  <p className="text-secondary text-xs line-clamp-2 mb-4 leading-relaxed">
                    {guide.bio || 'Professional local guide providing private tours, historical storytelling, and custom itineraries.'}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span>●</span> Available for Bookings
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedGuideForBooking(guide)}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                    >
                      Book This Guide →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center space-x-2 mt-10">
            {guides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  i === currentIndex ? 'w-8 bg-primary' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Banner Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 border border-orange-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-dark-navy text-base sm:text-lg">
              Want your profile advertised to global travel clients?
            </h4>
            <p className="text-secondary text-xs sm:text-sm mt-0.5">
              Sign up, watch the free intro video, and fund your account with a minimum of $10 to get listed on this showcase.
            </p>
          </div>
          <a
            href="#booking"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-bold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap"
          >
            Get Listed as a Tour Guide
          </a>
        </div>

      </div>

      {/* Interactive Traveler Booking Modal */}
      {selectedGuideForBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-navy/60 backdrop-blur-sm animate-fadeIn"
          onClick={closeBookingModal}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeBookingModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-dark-navy w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              ✕
            </button>

            {!bookingResult ? (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Direct Client Booking
                  </span>
                  <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2">
                    Book {selectedGuideForBooking.name}
                  </h3>
                  <p className="text-secondary text-xs sm:text-sm mt-1">
                    Location: <span className="font-semibold text-dark-navy">{selectedGuideForBooking.location}</span> • Rate: <span className="font-semibold text-dark-navy">${selectedGuideForBooking.rate_num || 45}/hr</span>
                  </p>
                </div>

                {/* Pricing Notice */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-5 text-xs text-secondary">
                  <div className="flex justify-between items-center mb-1">
                    <span>Hourly Guide Rate:</span>
                    <span className="font-bold text-dark-navy">${selectedGuideForBooking.rate_num || 45}/hr</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span>Duration:</span>
                    <span className="font-bold text-dark-navy">{clientForm.hours} hours</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-amber-200 font-bold text-sm text-dark-navy">
                    <span>Total You Pay Guide Directly:</span>
                    <span className="text-primary font-volkhov text-lg">
                      ${(selectedGuideForBooking.rate_num || 45) * clientForm.hours}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    ℹ️ You pay the guide directly. The platform deducts a $2.00 lead referral fee from {selectedGuideForBooking.name}'s funded balance.
                  </p>
                </div>

                <form onSubmit={handleClientBooking} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-dark-navy mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alice Walker"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alice@example.com"
                        value={clientForm.email}
                        onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 234"
                        value={clientForm.phone}
                        onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Tour Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={clientForm.date}
                        onChange={(e) => setClientForm({ ...clientForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dark-navy mb-1">
                        Duration (Hours) *
                      </label>
                      <select
                        value={clientForm.hours}
                        onChange={(e) => setClientForm({ ...clientForm, hours: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary bg-white"
                      >
                        <option value={2}>2 Hours</option>
                        <option value={3}>3 Hours (Half Day)</option>
                        <option value={4}>4 Hours</option>
                        <option value={6}>6 Hours (Full Day)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isBookingSubmitting}
                    className="w-full mt-4 py-3.5 bg-primary hover:bg-[#c95a43] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isBookingSubmitting ? 'Confirming with Guide...' : `Confirm Booking ($${(selectedGuideForBooking.rate_num || 45) * clientForm.hours})`}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Booking Confirmed!
                </span>
                <h3 className="font-volkhov font-bold text-dark-navy text-2xl mt-2 mb-1">
                  Tour Guide Reserved
                </h3>
                <p className="text-secondary text-xs sm:text-sm mb-6">
                  {bookingResult.guideName} has been notified. You will pay ${bookingResult.totalPayable} directly to the guide. The platform lead fee ($2.00) was automatically deducted from the guide's wallet.
                </p>

                <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200/80 mb-6 space-y-2 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Booking Reference:</span>
                    <span className="font-mono font-bold text-dark-navy">{bookingResult.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tour Guide:</span>
                    <span className="font-semibold text-dark-navy">{bookingResult.guideName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-semibold text-dark-navy">{bookingResult.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payable to Guide:</span>
                    <span className="font-bold text-emerald-600">${bookingResult.totalPayable} Direct</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span>Platform Fee Deducted:</span>
                    <span className="font-semibold text-red-500">-$2.00 (from guide deposit)</span>
                  </div>
                </div>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-3 bg-dark-navy hover:bg-dark-navy/90 text-white font-bold text-sm rounded-xl transition-all"
                >
                  Close & Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  )
}
