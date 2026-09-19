import React, { useState } from 'react'
import { Sparkles, CheckCircle2, DollarSign, ArrowRight, X } from 'lucide-react'

export default function UpgradeModal({
  isOpen,
  onClose,
  onConfirmUpgrade,
  moduleNumber = 1
}) {
  if (!isOpen) return null

  const [fundingAmount, setFundingAmount] = useState(10)
  const [processing, setProcessing] = useState(false)

  const handleUpgrade = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      if (onConfirmUpgrade) {
        onConfirmUpgrade(fundingAmount)
      }
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-secondary hover:text-dark-navy flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-br from-[#181E4B] via-[#212832] to-[#2E3650] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full inline-block mb-2">
            Module {moduleNumber} Milestone Reached
          </span>

          <h2 className="font-volkhov text-2xl sm:text-3xl font-bold text-white">
            Upgrade to Active Tour Guide
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-sm mx-auto font-normal leading-relaxed">
            Publish your guide profile immediately to the public Booking Marketplace where international tourists discover and book verified guides!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark-navy">
              What You Unlock as an Active Guide:
            </h4>
            
            <ul className="space-y-2.5 text-xs text-secondary font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-dark-navy">Public Marketplace Profile:</strong> Published to international travelers searching for guides.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-dark-navy">Set Your Fixed Rates:</strong> Set hourly or per-excursion fees with zero price haggling.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-dark-navy">Direct Booking Inquiries:</strong> Receive client bookings with Online or In-Person payment.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-dark-navy">Continue Free Training:</strong> Retain full access to all remaining Modules 2 through 10.</span>
              </li>
            </ul>
          </div>

          {/* Wallet Funding Section */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-dark-navy flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span>Minimum Wallet Funding Fee</span>
                </div>
                <div className="text-[11px] text-secondary font-medium mt-0.5">
                  Deposited into your guide payout wallet to activate marketplace listing.
                </div>
              </div>
              <div className="text-2xl font-bold font-volkhov text-amber-600">
                ${fundingAmount}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              disabled={processing}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {processing ? (
                <span>Activating Listing...</span>
              ) : (
                <>
                  <span>Fund Wallet (${fundingAmount}) &amp; Become Active Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-secondary hover:text-dark-navy hover:bg-gray-50 transition-all text-center"
            >
              Not now, continue free training to next module
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
