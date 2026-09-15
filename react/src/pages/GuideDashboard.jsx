import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function GuideDashboard() {
  const [guide, setGuide] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [topUpAmount, setTopUpAmount] = useState(10)
  const [isToppingUp, setIsToppingUp] = useState(false)
  const [topUpMsg, setTopUpMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('tour_guide_user')
    if (!storedUser) {
      navigate('/login')
      return
    }

    try {
      const parsed = JSON.parse(storedUser)
      setGuide(parsed)
      fetchLatestData(parsed.id, parsed.email)
    } catch (e) {
      navigate('/login')
    }
  }, [navigate])

  const fetchLatestData = async (guideId, guideEmail) => {
    setLoading(true)
    try {
      // 1. Fetch updated guide profile & balance from Supabase table
      let query = supabase.from('tour_guides').select('*')
      if (guideId) {
        query = query.eq('id', guideId)
      } else if (guideEmail) {
        query = query.eq('email', guideEmail)
      }

      const { data: guideData, error: guideError } = await query.single()
      if (!guideError && guideData) {
        setGuide(guideData)
        localStorage.setItem('tour_guide_user', JSON.stringify(guideData))
      }

      // 2. Fetch bookings for this guide
      if (guideId) {
        const { data: bData, error: bError } = await supabase
          .from('bookings')
          .select('*')
          .eq('guide_id', guideId)
          .order('created_at', { ascending: false })

        if (!bError && bData) {
          setBookings(bData)
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTopUp = async () => {
    if (!guide) return
    setIsToppingUp(true)
    setTopUpMsg('')

    try {
      const newAmount = Number(guide.funded_amount || 0) + Number(topUpAmount)
      const { data, error } = await supabase
        .from('tour_guides')
        .update({ funded_amount: newAmount, status: 'active' })
        .eq('id', guide.id)
        .select()
        .single()

      if (error) throw error

      setGuide(data)
      localStorage.setItem('tour_guide_user', JSON.stringify(data))
      setTopUpMsg(`Successfully deposited $${topUpAmount}! New balance: $${newAmount.toFixed(2)}`)
    } catch (err) {
      console.error('Top up error:', err)
      setTopUpMsg('Error processing deposit. Please try again.')
    } finally {
      setIsToppingUp(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('tour_guide_user')
    navigate('/')
  }

  if (loading && !guide) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-16">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const isLowBalance = Number(guide?.funded_amount || 0) < 2.0

  return (
    <div className="min-h-screen bg-gray-50/60 pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={guide?.picture || 'assets/img/dest/dest1.jpg'}
                alt={guide?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-volkhov font-bold text-dark-navy text-2xl sm:text-3xl">
                  {guide?.name || 'Tour Guide'}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                  {guide?.status || 'Active'}
                </span>
              </div>
              <p className="text-secondary text-xs sm:text-sm mt-1 flex items-center gap-2">
                <span>📍 {guide?.location || 'Global'}</span>
                <span>•</span>
                <span>⭐ {guide?.rate || '★ 5.0 · $45/hr'}</span>
              </p>
              <p className="text-xs text-primary font-semibold mt-1">
                {guide?.specialty || 'Cultural & Historical Guiding'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/destination"
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-dark-navy hover:bg-gray-50 transition-colors"
            >
              View on Global Directory
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm font-semibold text-secondary transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Balance & Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Wallet Funded Balance Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Funded Wallet Balance
                </span>
                <span className="text-lg">💳</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-volkhov text-primary">
                ${Number(guide?.funded_amount || 0).toFixed(2)}
              </div>
              <p className="text-xs text-secondary mt-1">
                {isLowBalance ? (
                  <span className="text-red-500 font-bold">
                    ⚠️ Balance is low (&lt;$2.00). Top up $10 to keep receiving leads.
                  </span>
                ) : (
                  <span className="text-emerald-600 font-medium">
                    ✓ Listing active: $2.00 deducted per confirmed client booking.
                  </span>
                )}
              </p>
            </div>

            {/* Quick Top-Up Drawer */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(Math.max(10, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-dark-navy focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  onClick={handleTopUp}
                  disabled={isToppingUp}
                  className="px-4 py-2 bg-primary hover:bg-[#c95a43] text-white font-bold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isToppingUp ? 'Depositing...' : 'Top Up $10'}
                </button>
              </div>
              {topUpMsg && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-2">{topUpMsg}</p>
              )}
            </div>
          </div>

          {/* Bookings Received Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Total Client Inquiries
                </span>
                <span className="text-lg">📅</span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold font-volkhov text-dark-navy">
                {bookings.length}
              </div>
              <p className="text-xs text-secondary mt-1">
                Direct client bookings received through the homepage showcase.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-secondary">
              <span>Gross Tour Value:</span>
              <span className="font-bold text-dark-navy">
                ${bookings.reduce((sum, b) => sum + Number(b.total_paid_to_guide || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Training Certification Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 rounded-3xl p-6 shadow-sm border border-orange-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Certification Status
                </span>
                <span className="text-lg">🎓</span>
              </div>
              <div className="text-2xl font-bold font-volkhov text-dark-navy">
                Professional Tour Guide
              </div>
              <p className="text-xs text-secondary mt-1">
                Completed Free Video 1 & Monetization Certification modules.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-orange-200/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700">✓ Verified Guide Badge</span>
              <span className="text-secondary font-mono">{guide?.id?.substring(0, 8)}</span>
            </div>
          </div>

        </div>

        {/* Incoming Client Bookings Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl">
                Client Bookings & Lead History
              </h2>
              <p className="text-secondary text-xs sm:text-sm mt-0.5">
                Clients pay you directly. Platform fee of $2.00 is automatically deducted from your funded wallet upon client match.
              </p>
            </div>
            <button
              onClick={() => fetchLatestData(guide?.id, guide?.email)}
              className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-secondary hover:bg-gray-50 flex items-center gap-1.5"
            >
              <span>↻</span> Refresh
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
              <div className="text-3xl mb-2">🧭</div>
              <h4 className="font-bold text-dark-navy text-base">No Client Bookings Yet</h4>
              <p className="text-secondary text-xs sm:text-sm max-w-md mx-auto mt-1">
                Your profile is active on the global directory. When tourists or agencies book you, their requests and contact details will show here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-secondary font-semibold uppercase text-[11px] tracking-wider">
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Tour Date</th>
                    <th className="pb-3">Hours</th>
                    <th className="pb-3">Client Paid to You</th>
                    <th className="pb-3">Lead Fee</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 font-bold text-dark-navy">{b.client_name}</td>
                      <td className="py-3.5 text-secondary">
                        <div>{b.client_email}</div>
                        {b.client_phone && <div className="text-[11px] text-gray-400">{b.client_phone}</div>}
                      </td>
                      <td className="py-3.5 text-secondary">{b.tour_date || 'Upcoming'}</td>
                      <td className="py-3.5 text-secondary">{b.hours} hrs</td>
                      <td className="py-3.5 font-bold text-emerald-600">${Number(b.total_paid_to_guide).toFixed(2)}</td>
                      <td className="py-3.5 text-red-500 font-semibold">-${Number(b.lead_fee_deducted).toFixed(2)}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
