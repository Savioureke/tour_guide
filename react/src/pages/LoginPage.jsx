import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const cleanEmail = email.trim().toLowerCase()

      // Table-based authentication directly from tour_guides table as requested
      const { data, error } = await supabase
        .from('tour_guides')
        .select('*')
        .eq('email', cleanEmail)
        .eq('password', password.trim())

      if (error) {
        throw error
      }

      if (!data || data.length === 0) {
        setErrorMsg('Invalid email or password. Please check your credentials or register.')
        setLoading(false)
        return
      }

      const user = data[0]

      // Store authenticated guide in localStorage
      localStorage.setItem('tour_guide_user', JSON.stringify(user))

      // Redirect to Guide Dashboard
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setErrorMsg(err.message || 'An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Quick fill demo credentials for testing
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail)
    setPassword(demoPass)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 bg-gray-50/40">
      <div className="max-w-md w-full p-8 sm:p-10 bg-white rounded-3xl shadow-card-custom border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
            <img src="assets/img/logo.svg" alt="Tour Guide" className="h-8 mx-auto" />
          </Link>
          <h2 className="font-volkhov font-bold text-dark-navy text-2xl sm:text-3xl">Tour Guide Portal Login</h2>
          <p className="text-secondary text-sm font-medium mt-1.5">
            Sign in using your table-registered credentials to view your wallet and client bookings.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="guide@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3.5 focus:border-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3.5 focus:border-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-secondary pt-1">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary mr-2" />
              <span>Remember me</span>
            </label>
            <Link to="/admin" className="text-primary hover:underline font-medium">
              Admin Portal →
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-yellow hover:bg-[#df9901] text-white font-semibold py-3.5 rounded-xl shadow-primary-btn hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying Table Login...' : 'Sign In to Portal'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Register & Fund ($10 Min)
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-secondary hover:text-dark-navy transition-colors font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
