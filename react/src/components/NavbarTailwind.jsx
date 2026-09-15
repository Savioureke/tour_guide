import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavbarTailwind() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const [loggedInUser, setLoggedInUser] = useState(null)
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

  // Check login state from localStorage
  useEffect(() => {
    const checkUser = () => {
      try {
        const u = localStorage.getItem('tour_guide_user')
        if (u) {
          setLoggedInUser(JSON.parse(u))
        } else {
          setLoggedInUser(null)
        }
      } catch (e) {
        setLoggedInUser(null)
      }
    }
    checkUser()
  }, [location.pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Guide Skills', path: '/service' },
    { label: 'Global Guides', path: '/destination' },
    { label: 'Earn & Monetize', path: '/booking' },
    { label: 'Success Stories', path: '/testimonial' },
  ]

  const isCurrentPage = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('tour_guide_user')
    setLoggedInUser(null)
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
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => {
            const active = isCurrentPage(link.path)
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm xl:text-base font-medium transition-colors py-1 relative ${
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

          {/* Admin Link */}
          <Link
            to="/admin"
            className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md transition-colors ${
              location.pathname === '/admin'
                ? 'bg-dark-navy text-white'
                : 'text-secondary bg-gray-100 hover:text-dark-navy hover:bg-gray-200'
            }`}
          >
            Admin
          </Link>

          {/* Conditional Auth State */}
          {loggedInUser ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className={`text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'border-primary/30 text-primary hover:bg-primary/5'
                }`}
              >
                <span>👤</span>
                <span>{loggedInUser.name ? loggedInUser.name.split(' ')[0] : 'Dashboard'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-secondary hover:text-red-500 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`text-sm xl:text-base font-medium transition-colors ${
                  location.pathname === '/login'
                    ? 'text-primary font-semibold'
                    : 'text-dark-text hover:text-primary'
                }`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className={`border px-4 py-2 rounded-md text-sm xl:text-base font-medium transition-all ${
                  location.pathname === '/signup'
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'border-dark-text text-dark-text hover:bg-dark-text hover:text-white'
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-sm font-medium text-dark-text hover:text-primary flex items-center space-x-1 focus:outline-none"
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
                    setCurrentLang('FR')
                    setLangOpen(false)
                  }}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                    currentLang === 'FR' ? 'font-semibold text-primary bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  FR
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
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isCurrentPage(link.path)
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-1 border-b border-gray-50 flex items-center justify-between ${
                    active ? 'text-primary font-semibold' : 'text-dark-text hover:text-primary'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-primary" />}
                </Link>
              )
            })}

            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-semibold text-primary-yellow py-1 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Admin Portal</span>
              <span>⚙️</span>
            </Link>

            {loggedInUser ? (
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm"
                >
                  Guide Dashboard ({loggedInUser.name?.split(' ')[0]})
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="text-xs text-red-500 font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-dark-text hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="border border-dark-text px-5 py-2 rounded-lg text-center font-medium text-sm text-dark-text hover:bg-dark-text hover:text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
