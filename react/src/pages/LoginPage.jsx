import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 bg-gray-50/40">
      <div className="max-w-md w-full p-8 sm:p-10 bg-white rounded-3xl shadow-card-custom border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
            <img src="assets/img/logo.svg" alt="Tour Guide" className="h-8 mx-auto" />
          </Link>
          <h2 className="font-volkhov font-bold text-dark-navy text-2xl sm:text-3xl">Welcome Back</h2>
          <p className="text-secondary text-sm font-medium mt-1.5">Please enter your credentials to login</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dark-text uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              required
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
              className="w-full bg-gray-50 border border-gray-200 text-dark-navy text-sm rounded-xl p-3.5 focus:border-primary focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-secondary pt-1">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary mr-2" />
              <span>Remember me</span>
            </label>
            <a href="#!" className="hover:text-primary transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-yellow hover:bg-[#df9901] text-white font-semibold py-3.5 rounded-xl shadow-primary-btn hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
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
