import React from 'react'

export default function FooterTailwind() {
  return (
    <footer className="pt-12 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#top" className="inline-block mb-4">
              <img src="assets/img/logo2.svg" width="150" alt="Tour Guide" className="h-9 w-auto" />
            </a>
            <p className="text-secondary text-sm font-medium leading-relaxed max-w-xs">
              Book your trip in minute, get full Control for much longer.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-sans font-bold text-dark-text text-lg sm:text-xl mb-4 sm:mb-5">
              Company
            </h4>
            <ul className="space-y-2.5 text-base font-medium">
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Mobile
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans font-bold text-dark-text text-lg sm:text-xl mb-4 sm:mb-5">
              Contact
            </h4>
            <ul className="space-y-2.5 text-base font-medium">
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Help/FAQ
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* More Column */}
          <div>
            <h4 className="font-sans font-bold text-dark-text text-lg sm:text-xl mb-4 sm:mb-5">
              More
            </h4>
            <ul className="space-y-2.5 text-base font-medium">
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Airlinefees
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Airline
                </a>
              </li>
              <li>
                <a href="#!" className="text-secondary hover:text-primary transition-colors">
                  Low fare tips
                </a>
              </li>
            </ul>
          </div>

          {/* Discover our app & Socials Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            {/* Social Icons */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Facebook */}
              <a
                href="#!"
                className="w-10 h-10 rounded-full bg-white shadow-social flex items-center justify-center text-dark-navy hover:text-white hover:bg-[#3B5998] transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#!"
                className="w-10 h-10 rounded-full bg-white shadow-social flex items-center justify-center text-dark-navy hover:text-white hover:bg-gradient-to-tr hover:from-[#fdf497] hover:via-[#d6249f] hover:to-[#285AEB] transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#!"
                className="w-10 h-10 rounded-full bg-white shadow-social flex items-center justify-center text-dark-navy hover:text-white hover:bg-[#1DA1F2] transition-all hover:scale-105"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                </svg>
              </a>
            </div>

            <h4 className="font-sans font-medium text-secondary text-base mb-3">
              Discover our app
            </h4>

            {/* App Store Badges */}
            <div className="flex items-center space-x-3">
              <a href="#!" className="hover:opacity-85 transition-opacity">
                <img src="assets/img/play-store.png" alt="Google Play Store" className="h-9 w-auto" />
              </a>
              <a href="#!" className="hover:opacity-85 transition-opacity">
                <img src="assets/img/apple-store.png" alt="Apple App Store" className="h-9 w-auto" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-secondary text-sm font-medium">
            All rights reserved@tourguide.co
          </p>
        </div>

      </div>
    </footer>
  )
}
