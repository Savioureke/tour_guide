import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import NavbarTailwind from './components/NavbarTailwind'
import HeroTailwind from './components/HeroTailwind'
import ServiceTailwind from './components/ServiceTailwind'
import DestinationTailwind from './components/DestinationTailwind'
import BookingTailwind from './components/BookingTailwind'
import TestimonialTailwind from './components/TestimonialTailwind'
import PartnerTailwind from './components/PartnerTailwind'
import CtaTailwind from './components/CtaTailwind'
import FooterTailwind from './components/FooterTailwind'

import ServicePage from './pages/ServicePage'
import DestinationPage from './pages/DestinationPage'
import BookingPage from './pages/BookingPage'
import TestimonialPage from './pages/TestimonialPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GuideDashboard from './pages/GuideDashboard'
import AdminPage from './pages/AdminPage'

// Automatically scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between" id="top">
        <NavbarTailwind />
        <main className="flex-grow">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroTailwind />
                  <ServiceTailwind />
                  <DestinationTailwind />
                  <BookingTailwind />
                  <TestimonialTailwind />
                  <PartnerTailwind />
                  <CtaTailwind />
                </>
              }
            />

            {/* Dedicated Pages for Each Section */}
            <Route path="/service" element={<ServicePage />} />
            <Route path="/destination" element={<DestinationPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/testimonial" element={<TestimonialPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<GuideDashboard />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Fallback Route */}
            <Route path="*" element={<HeroTailwind />} />
          </Routes>
        </main>
        <FooterTailwind />
      </div>
    </BrowserRouter>
  )
}
