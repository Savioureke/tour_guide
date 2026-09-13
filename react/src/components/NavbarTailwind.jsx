import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavbarTailwind() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Service', path: '/service' },
    { label: 'Destination', path: '/destination' },
    { label: 'Booking', path: '/booking' },
    { label: 'Testimonial', path: '/testimonial' },
  ]

  const isCurrentPage = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || location.pathname !== '/'
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5'
          : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Link to Home */}
        <Link to="/" className="flex items-center group">
          <img
            src="assets/img/logo.svg"
            alt="Tour Guide"
            className="h-8 md:h-9 w-auto group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7 xl:space-x-10">
          {navLinks.map((link) => {
            const active = isCurrentPage(link.path)
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`text-base font-medium transition-colors py-1 relative ${
                  active
                    ? 'text-primary font-semibold'
                    : 'text-dark-text hover:text-primary'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            )
          })}

          {/* Login Link */}
          <Link
            to="/login"
            className={`text-base font-medium transition-colors ${
              location.pathname === '/login'
                ? 'text-primary font-semibold'
                : 'text-dark-text hover:text-primary'
            }`}
          >
            Login
          </Link>

          {/* Sign Up Button */}
          <Link
            to="/signup"
            className={`border px-5 py-2 rounded-md text-base font-medium transition-all ${
              location.pathname === '/signup'
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'border-dark-text text-dark-text hover:bg-dark-text hover:text-white'
            }`}
          >
            Sign Up
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-base font-medium text-dark-text hover:text-primary flex items-center space-x-1 focus:outline-none"
            >
              <span>{currentLang}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white shadow-xl rounded-lg py-1.5 border border-gray-100 z-50">
                <button
                  onClick={() => {
                    setCurrentLang('EN')
                    setLangOpen(false)
                  }}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                    currentLang === 'EN' ? 'font-semibold text-primary bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setCurrentLang('BN')
                    setLangOpen(false)
                  }}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                    currentLang === 'BN' ? 'font-semibold text-primary bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  BN
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-dark-navy focus:outline-none rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-white/98 backdrop-blur-lg border-b border-gray-100 shadow-xl transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const active = isCurrentPage(link.path)
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium py-1 border-b border-gray-50 flex items-center justify-between ${
                    active ? 'text-primary font-semibold' : 'text-dark-text hover:text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                </Link>
              )
            })}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-medium py-1 border-b border-gray-50 ${
                location.pathname === '/login' ? 'text-primary font-semibold' : 'text-dark-text hover:text-primary'
              }`}
            >
              Login
            </Link>
            <div className="pt-2 flex items-center justify-between">
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className={`inline-block border px-6 py-2.5 rounded-lg text-center font-medium text-base transition-all ${
                  location.pathname === '/signup'
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'border-dark-text text-dark-text hover:bg-dark-text hover:text-white'
                }`}
              >
                Sign Up
              </Link>
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                <button
                  onClick={() => setCurrentLang('EN')}
                  className={`text-sm px-2 py-0.5 rounded font-medium ${
                    currentLang === 'EN' ? 'bg-white text-primary shadow-xs' : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setCurrentLang('BN')}
                  className={`text-sm px-2 py-0.5 rounded font-medium ${
                    currentLang === 'BN' ? 'bg-white text-primary shadow-xs' : 'text-gray-600'
                  }`}
                >
                  BN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
