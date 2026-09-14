import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingTailwind from '../components/BookingTailwind'
import CtaTailwind from '../components/CtaTailwind'

export default function BookingPage() {
  const [activeFaq, setActiveFaq] = useState(null)

  // 4 Main Tour Packages with Distinct Booking Amounts
  const tourTiers = [
    {
      id: 'budget',
      name: 'Budget Backpacker',
      amount: 299,
      period: '3 Days / 2 Nights',
      badge: 'Best Value',
      badgeColor: 'bg-blue-100 text-blue-700',
      description: 'Ideal for independent adventurers seeking essentials & freedom.',
      features: [
        'Boutique Hostel or 3-Star Stay',
        'Self-Guided Map & Audio App',
        'Public Transit & Ferry Passes',
        'Daily Continental Breakfast',
        'Standard 24/7 Online Support'
      ],
      ctaText: 'Select Budget Tour',
      highlighted: false
    },
    {
      id: 'classic',
      name: 'Classic Explorer',
      amount: 680,
      period: '7 Days / 6 Nights',
      badge: 'Most Popular',
      badgeColor: 'bg-primary text-white',
      description: 'The definitive guided journey with top-rated hotels & local masters.',
      features: [
        '4-Star Handpicked Hotels',
        'Certified Local English Guide',
        'Skip-the-Line Museum Tickets',
        'Daily Breakfast & 3 Group Dinners',
        'Air-Conditioned Coach Travel',
        'Airport Meet & Greet Transfer'
      ],
      ctaText: 'Book Classic Tour',
      highlighted: true
    },
    {
      id: 'adventure',
      name: 'Family & Safari Expedition',
      amount: 1190,
      period: '10 Days / 9 Nights',
      badge: 'Adventure Special',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Action-packed nature, wildlife, and group activities for all ages.',
      features: [
        '4-Star Family Resort & Lodges',
        'Private 4x4 Safari Excursions',
        'All Meals Included Daily',
        'Exclusive Wildlife Ranger Guide',
        'National Park Entry Permits Included',
        'Luggage & Porter Service'
      ],
      ctaText: 'Book Family Safari',
      highlighted: false
    },
    {
      id: 'luxury',
      name: 'VIP Luxury Grand Tour',
      amount: 2450,
      period: '14 Days / 13 Nights',
      badge: 'Ultimate Luxury',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Uncompromising 5-star indulgence with private helicopters & villas.',
      features: [
        '5-Star Luxury Suites & Ocean Villas',
        'Private Chauffeur & Limousine',
        'Helicopter Scenic Flight Included',
        'Michelin-Star Tasting Dinners',
        'Personal 24/7 Dedicated Concierge',
        'Custom Private Itinerary'
      ],
      ctaText: 'Reserve VIP Tour',
      highlighted: false
    }
  ]

  const faqs = [
    {
      q: 'What is included in the tour booking amount?',
      a: 'Each tour package clearly outlines its accommodations, licensed guides, entrance tickets, and meals. There are zero hidden booking fees or card processing surcharges.'
    },
    {
      q: 'Can I change my tour date after booking?',
      a: 'Yes! We offer flexible date rescheduling up to 7 days before your departure date at no extra penalty.'
    },
    {
      q: 'Do you offer group booking discounts for larger parties?',
      a: 'Absolutely. Parties of 3 or more automatically receive an 8% discount, while groups of 8+ can request tailored corporate or family discount rates.'
    },
    {
      q: 'How does the payment and confirmation work?',
      a: 'You can reserve instantly using Credit/Debit card, PayPal, or Apple Pay. You will immediately receive a digital booking pass, invoice, and day-by-day itinerary.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-[#FFF1DA]/50 via-[#FFF1DA]/20 to-white pt-32 sm:pt-36 pb-16 text-center border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-secondary mb-3 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Tour Bookings</span>
          </div>
          <h1 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            Curated Tour Packages & Booking Plans
          </h1>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Choose from flexible booking amounts tailored for solo explorers, families, and luxury connoisseurs. Transparent prices with instant confirmation.
          </p>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🛡️</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Best Price Guarantee</h4>
                <p className="text-[11px] text-secondary">Price match promise</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Instant Booking</h4>
                <p className="text-[11px] text-secondary">Real-time confirmation</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🔄</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Free 48h Cancellation</h4>
                <p className="text-[11px] text-secondary">Risk-free flexibility</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🎧</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">24/7 Concierge</h4>
                <p className="text-[11px] text-secondary">Local expert assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Pricing Packages Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h5 className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Transparent Amounts
          </h5>
          <h2 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl capitalize">
            Explore All Tour Booking Tiers
          </h2>
          <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto mt-2">
            No surprise taxes or charges at checkout. Select the tier that matches your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {tourTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlighted
                  ? 'bg-white shadow-2xl border-2 border-primary ring-4 ring-primary/10 -translate-y-2'
                  : 'bg-white shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1'
              }`}
            >
              {/* Top Tag */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                  <span className="text-xs text-secondary font-medium">{tier.period}</span>
                </div>

                <h3 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl mb-2">
                  {tier.name}
                </h3>
                <p className="text-secondary text-xs leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Amount */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl sm:text-4xl font-bold font-volkhov text-dark-navy">
                      ${tier.amount}
                    </span>
                    <span className="text-xs text-secondary font-medium">/ per traveler</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ✓ All taxes & entry tickets included
                  </p>
                </div>

                {/* Inclusions list */}
                <ul className="space-y-3 mb-8 text-xs text-secondary">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary font-bold mr-2.5 text-sm">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href="#booking"
                className={`w-full text-center py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 block ${
                  tier.highlighted
                    ? 'bg-primary hover:bg-[#c95a43] text-white shadow-lg hover:shadow-xl active:scale-95'
                    : 'bg-gray-100 hover:bg-gray-200 text-dark-navy active:scale-95'
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interactive Booking Section */}
      <BookingTailwind />

      {/* Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-[#FBFBFE] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h5 className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Got Questions?
            </h5>
            <h2 className="font-volkhov font-bold text-dark-navy text-2xl sm:text-3xl capitalize">
              Tour Booking & Pricing FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-dark-navy hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary text-lg ml-4 font-normal">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-secondary text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CtaTailwind />
    </div>
  )
}
