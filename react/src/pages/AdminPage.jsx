import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function AdminPage() {
  const [guides, setGuides] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionMsg, setActionMsg] = useState('')
  const [deductionAmount, setDeductionAmount] = useState(2.0)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      // 1. Fetch all guides from tour_guides table
      const { data: guidesData, error: gError } = await supabase
        .from('tour_guides')
        .select('*')
        .order('created_at', { ascending: false })

      if (!gError && guidesData) {
        setGuides(guidesData)
      }

      // 2. Fetch all bookings
      const { data: bookingsData, error: bError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (!bError && bookingsData) {
        setBookings(bookingsData)
      }
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Admin action: Manually deduct lead fee from guide's funded balance
  const handleDeductLeadFee = async (guideId, currentBalance, guideName) => {
    const deduct = Number(deductionAmount) || 2.0
    const newBalance = Math.max(0, Number(currentBalance || 0) - deduct)

    try {
      const { error } = await supabase
        .from('tour_guides')
        .update({
          funded_amount: newBalance,
          status: newBalance < 2.0 ? 'low_balance' : 'active'
        })
        .eq('id', guideId)

      if (error) throw error

      // Log into bookings table as an administrative lead fee deduction
      await supabase.from('bookings').insert([
        {
          guide_id: guideId,
          guide_name: guideName,
          client_name: 'Admin Lead Referral',
          client_email: 'client-referral@tourplatform.com',
          tour_date: new Date().toISOString().split('T')[0],
          hours: 3,
          total_paid_to_guide: 135.0,
          lead_fee_deducted: deduct,
          payment_channel: 'Direct to Guide',
          status: 'confirmed'
        }
      ])

      setActionMsg(`Deducted $${deduct.toFixed(2)} lead fee from ${guideName}. New balance: $${newBalance.toFixed(2)}`)
      fetchAdminData()
    } catch (err) {
      console.error('Deduction error:', err)
      setActionMsg(`Failed to deduct fee: ${err.message}`)
    }
  }

  // Admin action: Top up guide's wallet
  const handleAddDeposit = async (guideId, currentBalance, guideName) => {
    const addAmt = 10.0
    const newBalance = Number(currentBalance || 0) + addAmt

    try {
      const { error } = await supabase
        .from('tour_guides')
        .update({
          funded_amount: newBalance,
          status: 'active'
        })
        .eq('id', guideId)

      if (error) throw error

      setActionMsg(`Added $${addAmt.toFixed(2)} deposit to ${guideName}. New balance: $${newBalance.toFixed(2)}`)
      fetchAdminData()
    } catch (err) {
      console.error('Add deposit error:', err)
      setActionMsg(`Failed to add deposit: ${err.message}`)
    }
  }

  // Aggregate stats
  const totalGuides = guides.length
  const totalFunded = guides.reduce((acc, g) => acc + Number(g.funded_amount || 0), 0)
  const totalBookings = bookings.length
  const totalFeesCollected = bookings.reduce((acc, b) => acc + Number(b.lead_fee_deducted || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50/60 pt-28 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="bg-dark-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-yellow/20 text-primary-yellow text-xs font-bold uppercase tracking-wider mb-2">
              Platform Administration
            </div>
            <h1 className="font-volkhov font-bold text-2xl sm:text-3xl">
              Tour Guide Network & Monetization Control Center
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Monitor registered guides, table-based balances, client bookings, and platform lead fee deductions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>↻</span> Refresh Live Data
            </button>
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#c95a43] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              View Public Site →
            </Link>
          </div>
        </div>

        {actionMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-between">
            <span>✓ {actionMsg}</span>
            <button onClick={() => setActionMsg('')} className="text-emerald-600 font-bold ml-4">✕</button>
          </div>
        )}

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Active Guides</span>
            <div className="text-2xl sm:text-3xl font-bold font-volkhov text-dark-navy mt-1">
              {totalGuides}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Registered in database table</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Total Guide Balances</span>
            <div className="text-2xl sm:text-3xl font-bold font-volkhov text-primary mt-1">
              ${totalFunded.toFixed(2)}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Funded across all wallets</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Client Bookings</span>
            <div className="text-2xl sm:text-3xl font-bold font-volkhov text-emerald-600 mt-1">
              {totalBookings}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Direct matches created</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Lead Fees Collected</span>
            <div className="text-2xl sm:text-3xl font-bold font-volkhov text-primary-yellow mt-1">
              ${totalFeesCollected.toFixed(2)}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Deducted from $10 deposits</p>
          </div>
        </div>

        {/* Guides Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl">
                Registered Tour Guides Roster
              </h2>
              <p className="text-secondary text-xs sm:text-sm mt-0.5">
                Every guide must fund a minimum of $10. Each client match deducts a platform lead fee (default $2.00).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-secondary">Deduct Fee:</span>
              <select
                value={deductionAmount}
                onChange={(e) => setDeductionAmount(Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-bold text-dark-navy bg-white"
              >
                <option value={1.5}>$1.50</option>
                <option value={2.0}>$2.00 (Standard)</option>
                <option value={3.0}>$3.00</option>
                <option value={5.0}>$5.00</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-secondary font-semibold uppercase text-[11px] tracking-wider">
                    <th className="pb-3">Guide</th>
                    <th className="pb-3">City / Location</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Rate</th>
                    <th className="pb-3">Funded Balance</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {guides.map((g) => {
                    const balance = Number(g.funded_amount || 0)
                    const isLow = balance < 2.0
                    return (
                      <tr key={g.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={g.picture || 'assets/img/dest/dest1.jpg'}
                              alt=""
                              className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                            />
                            <div>
                              <span className="font-bold text-dark-navy block">{g.name}</span>
                              <span className="text-[11px] text-gray-400">{g.specialty || 'General'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-secondary">{g.location}</td>
                        <td className="py-3.5 text-secondary">
                          <div>{g.email || 'No email'}</div>
                          {g.phone && <div className="text-[11px] text-gray-400">{g.phone}</div>}
                        </td>
                        <td className="py-3.5 font-semibold text-dark-navy">{g.rate || '$45/hr'}</td>
                        <td className="py-3.5">
                          <span className={`font-bold font-volkhov text-sm ${isLow ? 'text-red-500' : 'text-primary'}`}>
                            ${balance.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              isLow
                                ? 'bg-red-50 text-red-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {isLow ? 'Deposit Needed' : g.status || 'Active'}
                          </span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleDeductLeadFee(g.id, balance, g.name)}
                            disabled={balance <= 0}
                            className="px-3 py-1.5 rounded-lg bg-primary hover:bg-[#c95a43] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-30 whitespace-nowrap"
                            title="Deduct lead fee when guide receives client booking"
                          >
                            Deduct ${deductionAmount.toFixed(2)}
                          </button>
                          <button
                            onClick={() => handleAddDeposit(g.id, balance, g.name)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-dark-navy text-xs font-semibold transition-all whitespace-nowrap"
                            title="Top up guide wallet with $10"
                          >
                            + $10
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bookings & Lead History Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <h2 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl mb-1">
            Recent Client Bookings & Lead Fee Deductions
          </h2>
          <p className="text-secondary text-xs sm:text-sm mb-6">
            Log of client bookings: Clients pay the tour guide directly; the platform deducts a lead fee from the guide's funded balance.
          </p>

          {bookings.length === 0 ? (
            <div className="text-center py-10 text-secondary text-xs">
              No booking records found. Test a booking on the homepage or click "Deduct Lead Fee" above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-secondary font-semibold uppercase text-[11px] tracking-wider">
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Tour Guide</th>
                    <th className="pb-3">Hours</th>
                    <th className="pb-3">Paid Direct to Guide</th>
                    <th className="pb-3">Platform Fee Deducted</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3.5 font-bold text-dark-navy">{b.client_name}</td>
                      <td className="py-3.5 text-secondary">{b.client_email}</td>
                      <td className="py-3.5 font-semibold text-primary">{b.guide_name}</td>
                      <td className="py-3.5 text-secondary">{b.hours} hrs</td>
                      <td className="py-3.5 font-bold text-emerald-600">${Number(b.total_paid_to_guide || 0).toFixed(2)}</td>
                      <td className="py-3.5 font-bold text-red-500">-${Number(b.lead_fee_deducted || 2).toFixed(2)}</td>
                      <td className="py-3.5 text-gray-400 text-xs">
                        {b.created_at ? new Date(b.created_at).toLocaleDateString() : 'Today'}
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
