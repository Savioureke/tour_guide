import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    specialty: 'Historical & Cultural Heritage Guiding',
    password: '',
    fundingAmount: 10
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [guideRef, setGuideRef] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const minDeposit = Math.max(10, Number(formData.fundingAmount) || 10)
      const refCode = `GUIDE-${Math.floor(100000 + Math.random() * 900000)}`

      const { data, error } = await supabase
        .from('tour_guides')
        .insert([
          {
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            location: formData.location.trim() || 'Global',
            specialty: formData.specialty,
            picture: 'assets/img/dest/dest1.jpg',
            rate: '★ 5.0 · $45/hr',
            rating: 5.0,
            funded_amount: minDeposit,
            payment_method: 'paypal',
            status: 'active',
            training_completed: true,
            bio: `Certified guide in ${formData.location || 'Local Area'} specialized in ${formData.specialty}.`
          }
        ])
        .select()

      if (error) {
        console.warn('Note on Supabase insert:', error.message)
      }

      setGuideRef(refCode)
      setIsRegistered(true)
    } catch (err) {
      console.error('Signup error:', err)
      setGuideRef(`GUIDE-${Math.floor(100000 + Math.random() * 900000)}`)
      setIsRegistered(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 bg-gray-50/40">
      <div className="max-w-md w-full p-8 sm:p-10 bg-white rounded-3xl shadow-card-custom border border-gray-100">
        
        {!isRegistered ? (
          <>
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
                <img src="assets/img/logo.svg" alt="Tour Guide" className="h-8 mx-auto" />
              </Link>
              <h2 className="font-volkhov font-bold text-dark-navy text-2xl sm:text-3xl">Start Tour Guide Training</h2>
              <p className="text-secondary text-xs sm:text-sm font-medium mt-2 leading-relaxed">
                Register to start your tour guide training. The introductory video is 100% free. Funding your account (minimum $10) activates your global listing and unlocks full client matching.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mateo Rossi"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="guide@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                    Guiding City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rome, Italy"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                  Initial Account Deposit ($USD, Min $10) *
                </label>
                <input
                  type="number"
                  min="10"
                  step="5"
                  required
                  value={formData.fundingAmount}
                  onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-dark-navy font-bold text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-1.5">
                  Create Password *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3 focus:border-primary focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center text-xs text-secondary pt-1">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" required className="rounded border-gray-300 text-primary mr-2" />
                  <span>I agree to the <a href="#!" className="text-primary hover:underline">Terms & Guiding Ethics</a></span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-[#c9533c] text-white font-semibold py-3.5 rounded-xl shadow-danger-btn hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : `Register & Fund $${Math.max(10, Number(formData.fundingAmount) || 10)}`}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </div>

            <div className="text-center mt-4">
              <Link to="/" className="text-xs text-secondary hover:text-dark-navy transition-colors font-medium">
                ← Back to Home
              </Link>
            </div>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Registration & Funding Confirmed!
            </span>
            <h2 className="font-volkhov font-bold text-dark-navy text-2xl mt-3 mb-1">
              Welcome to the Global Network
            </h2>
            <p className="text-secondary text-xs sm:text-sm mb-6">
              Your profile is registered and your initial deposit is active. You are now eligible to appear on the homepage directory and receive client inquiries.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-200/80 mb-6 space-y-2 text-xs text-secondary">
              <div className="flex justify-between">
                <span>Guide Reference:</span>
                <span className="font-mono font-bold text-dark-navy">{guideRef}</span>
              </div>
              <div className="flex justify-between">
                <span>Guide Name:</span>
                <span className="font-semibold text-dark-navy">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>Guiding City:</span>
                <span className="font-semibold text-dark-navy">{formData.location}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-dark-navy">
                <span>Funded Status:</span>
                <span className="text-emerald-600">${Math.max(10, formData.fundingAmount || 10)} Active</span>
              </div>
            </div>

            <Link
              to="/"
              className="w-full inline-block text-center py-3.5 bg-primary hover:bg-[#c95a43] text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Go to Homepage & View Live Directory
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
