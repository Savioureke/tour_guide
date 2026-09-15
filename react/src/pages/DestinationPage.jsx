import React from 'react'
import { Link } from 'react-router-dom'
import DestinationTailwind from '../components/DestinationTailwind'
import CtaTailwind from '../components/CtaTailwind'

export default function DestinationPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-[#FFF1DA]/40 to-white pt-32 sm:pt-36 pb-12 text-center border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm text-secondary mb-3 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Global Guides</span>
          </div>
          <h1 className="font-volkhov font-bold text-dark-navy text-3xl sm:text-4xl md:text-5xl capitalize">
            Verified Tour Guides Around the World
          </h1>
          <p className="text-secondary text-base sm:text-lg max-w-xl mx-auto mt-3 font-medium">
            Trained and certified on this platform. Rated by travelers and travel organizations. Available now for bookings.
          </p>
        </div>
      </div>

      {/* Main Section Content */}
      <DestinationTailwind />

      {/* Call to Action */}
      <CtaTailwind />
    </div>
  )
}
