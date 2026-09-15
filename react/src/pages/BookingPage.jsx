import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingTailwind from '../components/BookingTailwind'
import CtaTailwind from '../components/CtaTailwind'

export default function BookingPage() {
  const [activeFaq, setActiveFaq] = useState(null)

  // 4 Main Tour Guide Training Tracks
  const tourTiers = [
    {
      id: 'budget',
      name: 'Independent Starter Guide',
      amount: 299,
      period: '3-Week Blueprint',
      badge: 'Best Value',
      badgeColor: 'bg-blue-100 text-blue-700',
      description: 'Ideal for local residents wanting foundational procedures, monument narration frameworks, and walking route planning.',
      features: [
        'Complete Heritage Storytelling Frameworks',
        '2-to-3 Hour Walking Tour Route Blueprint',
        'Group Dynamics & Landmark Pacing System',
        'Standard Safety & Field Incident Checklist',
        '24/7 Global Guide Community Forum'
      ],
      ctaText: 'Select Starter Track',
      highlighted: false
    },
    {
      id: 'classic',
      name: 'Certified Professional Guide',
      amount: 680,
      period: '6-Week Masterclass',
      badge: 'Most Popular',
      badgeColor: 'bg-primary text-white',
      description: 'The complete professional standard with live route audits, direct client acquisition methods, and verified directory spotlight.',
      features: [
        'Full Landmark & Cultural Narrative Decks',
        'Client Acquisition & Rate Setting ($35-$55/hr)',
        'Live Field Practice & Master Assessment',
        'Payout Channel Setup & Multi-Currency Suite',
        'Priority Listing on Global Guide Showcase',
        'Dedicated Guide Success Concierge'
      ],
      ctaText: 'Start Professional Training',
      highlighted: true
    },
    {
      id: 'adventure',
      name: 'Safari & Eco-Adventure Specialist',
      amount: 1190,
      period: '8-Week Accelerator',
      badge: 'High-Ticket Niche',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Specialized training for national parks, wilderness expeditions, eco-tourism, and multi-day adventure trekking.',
      features: [
        'Wilderness Navigation & Terrain Safety',
        'Wildlife Spotting Protocols & Storytelling',
        'High-Ticket Expedition Group Pitching',
        'Operator Contract & Insurance Templates',
        'Priority Distribution to Safari Travel Agencies',
        '1-on-1 Mentor Strategy Sessions'
      ],
      ctaText: 'Enroll Expedition Track',
      highlighted: false
    },
    {
      id: 'luxury',
      name: 'VIP Private Tour Agency Mastermind',
      amount: 2450,
      period: '12-Week Done-With-You',
      badge: 'Agency & Scale',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Scale from solo guide to launching a high-earning boutique travel agency or private VIP guide network.',
      features: [
        'Complete Done-With-You Business Setup',
        'Multi-Guide Roster & Fleet Coordination',
        'Automated Luxury Inbound Client Funnels',
        'Private Weekly 1-on-1 Business Coaching',
        'Featured Top-Banner Spotlight for 1 Year',
        'Lifetime Mastermind Access & Legal Contracts'
      ],
      ctaText: 'Apply for VIP Mastermind',
      highlighted: false
    }
  ]

  const faqs = [
    {
      q: 'Do I need prior experience or a tourism degree to start?',
      a: 'No. The program is built for anyone with a passion for their city and local culture. We provide comprehensive storytelling procedures, route planning scripts, and client handling standards from scratch.'
    },
    {
      q: 'How does the free video and the $10 funding work?',
      a: 'The first introductory video tutorial is 100% free, walking you through basic guide procedures and how to make money. To continue advanced training and activate your profile on our global directory, you deposit a minimum of $10 into your guide wallet. This advertises you to travel companies, agencies, and international tourists.'
    },
    {
      q: 'Can I earn money while still in training?',
      a: 'Yes! Once you fund your account with a minimum of $10, your verified profile goes live on the global directory immediately. You can start receiving tour inquiries and private client bookings while completing your modules.'
    },
    {
      q: 'How do I receive payments from clients and travel companies?',
      a: 'Clients pay you directly through your chosen payout channel (PayPal, Wise, Direct Bank Wire, or Stripe). You retain 100% of your tour fees.'
    },
    {
      q: 'Can I set my own guiding rates and schedule?',
      a: 'Absolutely. You have 100% control over your hourly or day rates (typically $35–$75+/hr), your availability, and the specific tour itineraries you want to offer.'
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
            <span className="text-primary font-semibold">Guide Training & Monetization</span>
          </div>
          <h1 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            How to Guide & Earn at the Same Time
          </h1>
          <p className="text-secondary text-base sm:text-lg max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Turn your local passion into an international guiding business. Learn professional procedures, get advertised to global clients, and earn with a minimum $10 account deposit.
          </p>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🧭</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Field-Tested Training</h4>
                <p className="text-[11px] text-secondary">Storytelling & route pacing</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Instant Go-Live</h4>
                <p className="text-[11px] text-secondary">Global client visibility</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">💵</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Direct Payouts</h4>
                <p className="text-[11px] text-secondary">100% tour fees are yours</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🌍</span>
              <div className="text-left">
                <h4 className="text-xs font-bold text-dark-navy">Worldwide Network</h4>
                <p className="text-[11px] text-secondary">Travel agencies & tourists</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Pricing Packages Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h5 className="text-secondary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            METHODOLOGY CURRICULUM
          </h5>
          <h2 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl capitalize">
            Tour Guide Training Tracks & Tiers
          </h2>
          <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto mt-2">
            Clear procedures, complete itinerary templates, and direct client acquisition funnels tailored for your location.
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
                    <span className="text-xs text-secondary font-medium">/ complete training</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ✓ Includes full itinerary blueprints & certification
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
              Tour Guide Training & Monetization FAQs
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
