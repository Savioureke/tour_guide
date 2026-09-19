import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { TOUR_GUIDE_TUTORIALS } from '../data/tutorials'
import UpgradeModal from '../components/UpgradeModal'
import CertificateModal from '../components/CertificateModal'
import {
  Award,
  CheckCircle,
  CheckCircle2,
  Play,
  Sparkles,
  HelpCircle,
  DollarSign,
  ShieldCheck,
  User,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertCircle,
  RefreshCw,
  LogOut,
  ExternalLink
} from 'lucide-react'

export default function GuideDashboard() {
  const [guide, setGuide] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [topUpAmount, setTopUpAmount] = useState(10)
  const [isToppingUp, setIsToppingUp] = useState(false)
  const [topUpMsg, setTopUpMsg] = useState('')
  const [activeTab, setActiveTab] = useState('academy') // 'academy' | 'bookings'
  const navigate = useNavigate()

  // Academy Training State (10 Modules)
  const [activeModule, setActiveModule] = useState(TOUR_GUIDE_TUTORIALS[0])
  const [completedModules, setCompletedModules] = useState(['tutorial-1'])
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [upgradePromptModule, setUpgradePromptModule] = useState(1)

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)

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
      setTopUpMsg(`Successfully deposited $${topUpAmount}! Balance: $${newAmount.toFixed(2)}`)
    } catch (err) {
      console.error('Top up error:', err)
      setTopUpMsg('Error processing deposit. Please try again.')
    } finally {
      setIsToppingUp(false)
    }
  }

  const handleConfirmUpgrade = async (amt = 10) => {
    if (!guide) return
    try {
      const newAmount = Number(guide.funded_amount || 0) + Number(amt)
      const { data, error } = await supabase
        .from('tour_guides')
        .update({ funded_amount: newAmount, status: 'active' })
        .eq('id', guide.id)
        .select()
        .single()

      if (!error && data) {
        setGuide(data)
        localStorage.setItem('tour_guide_user', JSON.stringify(data))
      }
    } catch (err) {
      console.error('Failed to update guide status to active:', err)
    }
  }

  const handleSelectModule = (mod) => {
    setActiveModule(mod)
    setSelectedAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }

  const handleAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleQuizSubmit = () => {
    if (!activeModule?.quiz) return
    let correct = 0
    activeModule.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++
      }
    })
    setQuizScore(correct)
    setQuizSubmitted(true)

    // Mark completed if passed
    if (correct >= Math.ceil(activeModule.quiz.length * 0.7)) {
      if (!completedModules.includes(activeModule.id)) {
        setCompletedModules(prev => [...prev, activeModule.id])
      }

      // Check for Module 1 Upgrade Prompt
      const modNum = TOUR_GUIDE_TUTORIALS.findIndex(m => m.id === activeModule.id) + 1
      if (modNum === 1 && guide?.status !== 'active') {
        setUpgradePromptModule(1)
        setTimeout(() => setUpgradeModalOpen(true), 700)
      } else if (modNum > 1 && guide?.status !== 'active') {
        setUpgradePromptModule(modNum)
        setTimeout(() => setUpgradeModalOpen(true), 700)
      }

      // Check for Module 10 Capstone Certificate
      if (modNum === 10) {
        setTimeout(() => setCertificateModalOpen(true), 900)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('tour_guide_user')
    navigate('/')
  }

  if (loading && !guide) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-secondary text-sm font-medium">Loading Guide Portal...</p>
        </div>
      </div>
    )
  }

  const isLowBalance = Number(guide?.funded_amount || 0) < 2.0
  const isGuideActive = guide?.status === 'active'
  const currentModuleIndex = TOUR_GUIDE_TUTORIALS.findIndex(m => m.id === activeModule.id)
  const isLastModule = currentModuleIndex === TOUR_GUIDE_TUTORIALS.length - 1

  return (
    <div className="min-h-screen bg-[#FDFCF9] pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Guide Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={guide?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={guide?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm border-2 border-white"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                  isGuideActive ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
                title={isGuideActive ? 'Listing Active on Marketplace' : 'Pending Wallet Funding'}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-volkhov text-2xl sm:text-3xl font-bold text-dark-navy">
                  {guide?.name || 'Guide Instructor'}
                </h1>
                {isGuideActive ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Listed on Booking Marketplace
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setUpgradePromptModule(1)
                      setUpgradeModalOpen(true)
                    }}
                    className="px-2.5 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Fund $10 to Publish Listing
                  </button>
                )}
              </div>

              <p className="text-secondary text-xs sm:text-sm mt-1 flex items-center gap-2">
                <span>{guide?.location || 'Global Location'}</span>
                <span>•</span>
                <span className="text-primary font-semibold">{guide?.specialty || 'General Guiding'}</span>
                <span>•</span>
                <span>Rate: <strong>${guide?.rate || 45}/hr</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Logout */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-left md:text-right">
              <span className="text-xs text-secondary font-medium block">Wallet Balance</span>
              <div className="font-volkhov text-2xl font-bold text-dark-navy">
                ${Number(guide?.funded_amount || 0).toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('academy')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'academy'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-dark-navy'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>10-Module Training Academy</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
              {completedModules.length}/10 Completed
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'text-primary border-b-2 border-primary'
                : 'text-secondary hover:text-dark-navy'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Client Bookings &amp; Inquiries ({bookings.length})</span>
          </button>
        </div>

        {/* TAB 1: 10-MODULE TRAINING ACADEMY */}
        {activeTab === 'academy' && (
          <div className="space-y-8">
            
            {/* Guide Milestone Banner */}
            {!isGuideActive && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-volkhov font-bold text-dark-navy text-lg">
                      Ready to start receiving client bookings?
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary mt-0.5 max-w-xl">
                      Complete Module 1 and fund your payout wallet ($10) to activate your public profile on the Booking Marketplace. You can continue taking Modules 2 through 10 at any time.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setUpgradePromptModule(currentModuleIndex + 1)
                    setUpgradeModalOpen(true)
                  }}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-[#c95a43] text-white text-xs font-bold shadow-sm whitespace-nowrap transition-all flex items-center gap-2"
                >
                  <span>Activate Profile ($10)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Active Video & Lesson & Quiz */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Video Player */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                      Module {currentModuleIndex + 1} of 10
                    </span>
                    <span className="text-xs text-secondary font-medium">
                      Duration: {activeModule.duration}
                    </span>
                  </div>

                  <h2 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl mb-4">
                    {activeModule.title}
                  </h2>

                  {/* YouTube Embed */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-black mb-6">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${activeModule.youtubeId}?rel=0`}
                      title={activeModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Module Breakdown */}
                  <div className="space-y-4 text-xs sm:text-sm text-secondary">
                    <p className="leading-relaxed font-medium">
                      {activeModule.description}
                    </p>

                    {activeModule.topics && (
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mt-4">
                        <h4 className="font-bold text-dark-navy text-xs uppercase tracking-wider mb-3">
                          Key Learning Objectives &amp; Field Tactics:
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {activeModule.topics.map((t, i) => (
                            <li key={i} className="flex items-start gap-2 text-dark-navy font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comprehension Quiz Section */}
                {activeModule.quiz && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-primary" />
                          <h3 className="font-volkhov font-bold text-dark-navy text-xl">
                            Module {currentModuleIndex + 1} Comprehension Quiz
                          </h3>
                        </div>
                        <p className="text-xs text-secondary mt-1">
                          Test your mastery of this module. Scoring &gt;=70% awards completion status.
                        </p>
                      </div>

                      {quizSubmitted && (
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                          quizScore >= Math.ceil(activeModule.quiz.length * 0.7)
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}>
                          <span>Score: {quizScore} / {activeModule.quiz.length}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      {activeModule.quiz.map((q, qIdx) => {
                        const isAnswered = selectedAnswers[qIdx] !== undefined
                        const isCorrect = selectedAnswers[qIdx] === q.correctAnswer

                        return (
                          <div key={q.id || qIdx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                            <h4 className="font-bold text-dark-navy text-sm">
                              {qIdx + 1}. {q.question}
                            </h4>

                            <div className="space-y-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selectedAnswers[qIdx] === optIdx
                                let optClass = "border-gray-200 bg-white text-dark-navy hover:bg-gray-100"

                                if (quizSubmitted) {
                                  if (optIdx === q.correctAnswer) {
                                    optClass = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold"
                                  } else if (isSelected && !isCorrect) {
                                    optClass = "border-red-500 bg-red-50 text-red-800"
                                  }
                                } else if (isSelected) {
                                  optClass = "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleAnswerSelect(qIdx, optIdx)}
                                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && optIdx === q.correctAnswer && (
                                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>

                            {quizSubmitted && q.explanation && (
                              <p className="text-[11px] text-secondary bg-white p-3 rounded-xl border border-gray-100 font-medium">
                                <strong>Explanation:</strong> {q.explanation}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Quiz Submit CTA */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {quizSubmitted ? (
                        <div className="flex items-center gap-3 w-full justify-between">
                          <button
                            onClick={() => {
                              setSelectedAnswers({})
                              setQuizSubmitted(false)
                              setQuizScore(null)
                            }}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-secondary hover:text-dark-navy"
                          >
                            Retake Quiz
                          </button>

                          {!isLastModule ? (
                            <button
                              onClick={() => handleSelectModule(TOUR_GUIDE_TUTORIALS[currentModuleIndex + 1])}
                              className="px-6 py-3 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                            >
                              <span>Next Module: Module {currentModuleIndex + 2}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setCertificateModalOpen(true)}
                              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
                            >
                              <Award className="w-4 h-4" />
                              <span>Claim $20 Certificate of Completion</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < activeModule.quiz.length}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-[#c95a43] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                        >
                          Submit Answers &amp; Complete Module {currentModuleIndex + 1}
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: All 10 Modules List & Capstone Card */}
              <div className="space-y-6">
                
                {/* 10 Modules Curriculum List */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-volkhov font-bold text-dark-navy text-lg">
                      10 Training Modules
                    </h3>
                    <span className="text-xs text-secondary font-medium">
                      {completedModules.length} of 10 done
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {TOUR_GUIDE_TUTORIALS.map((mod, idx) => {
                      const isSelected = activeModule.id === mod.id
                      const isCompleted = completedModules.includes(mod.id)

                      return (
                        <button
                          key={mod.id}
                          onClick={() => handleSelectModule(mod)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-primary bg-primary/10 shadow-xs'
                              : 'border-gray-100 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-700'
                              : isSelected
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-secondary'
                          }`}>
                            {isCompleted ? '✓' : idx + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-dark-navy truncate">
                              Module {idx + 1}: {mod.title}
                            </h4>
                            <p className="text-[11px] text-secondary mt-0.5">
                              {mod.duration} • {mod.quiz?.length || 3} Quiz Qs
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Module 10 Official Certificate Card */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-6 border border-amber-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-volkhov font-bold text-dark-navy text-base">
                        Certificate of Completion
                      </h4>
                      <p className="text-[11px] text-secondary">
                        Official Capstone Credential ($20 fee)
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed">
                    Finish all 10 modules and pass every comprehension quiz to earn and claim your official Tour Guiding Mastery Certificate with unique serial ID.
                  </p>

                  <button
                    onClick={() => setCertificateModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-dark-navy hover:bg-primary text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>View / Claim Certificate ($20)</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CLIENT BOOKINGS & INQUIRIES */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            
            {/* Wallet & Top Up Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Wallet Balance
                  </span>
                  <div className="text-3xl font-bold font-volkhov text-dark-navy mt-2">
                    ${Number(guide?.funded_amount || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-secondary mt-1">
                    {isLowBalance ? (
                      <span className="text-red-500 font-bold">
                        ⚠️ Low balance (&lt;$2.00). Top up $10 to keep receiving bookings.
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-medium">
                        ✓ Listing active: $2.00 deducted per confirmed client match.
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="10"
                      step="5"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(Math.max(10, Number(e.target.value)))}
                      className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-dark-navy focus:outline-none"
                    />
                    <button
                      onClick={handleTopUp}
                      disabled={isToppingUp}
                      className="px-4 py-2 bg-primary hover:bg-[#c95a43] text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap"
                    >
                      {isToppingUp ? 'Depositing...' : 'Top Up $10'}
                    </button>
                  </div>
                  {topUpMsg && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">{topUpMsg}</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Total Inquiries Received
                </span>
                <div className="text-3xl font-bold font-volkhov text-dark-navy mt-2">
                  {bookings.length}
                </div>
                <p className="text-xs text-secondary mt-1">
                  Direct client inquiries from tourists on the Booking Marketplace.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Marketplace Status
                </span>
                <div className="text-xl font-bold font-volkhov text-dark-navy mt-2">
                  {isGuideActive ? (
                    <span className="text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5" /> Active &amp; Discoverable
                    </span>
                  ) : (
                    <span className="text-amber-500 flex items-center gap-1.5">
                      <AlertCircle className="w-5 h-5" /> Pending $10 Activation
                    </span>
                  )}
                </div>
                <p className="text-xs text-secondary mt-1">
                  {isGuideActive
                    ? 'Tourists can book you directly with fixed rates.'
                    : 'Fund wallet to appear in client search results.'}
                </p>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-volkhov font-bold text-dark-navy text-xl sm:text-2xl">
                    Client Bookings &amp; Excursion History
                  </h2>
                  <p className="text-secondary text-xs sm:text-sm mt-0.5">
                    Clients pay you directly online or in person upon meeting.
                  </p>
                </div>
                <button
                  onClick={() => fetchLatestData(guide?.id, guide?.email)}
                  className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-secondary hover:bg-gray-50 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                  <div className="text-3xl mb-2">📋</div>
                  <h4 className="font-bold text-dark-navy text-base">No Client Bookings Yet</h4>
                  <p className="text-secondary text-xs sm:text-sm max-w-md mx-auto mt-1">
                    When tourists book your guided excursions on the Booking Marketplace, their reservations will display here.
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
                        <th className="pb-3">Client Paid</th>
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
        )}

      </div>

      {/* Upgrade Modal ($10 Wallet Deposit) */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onConfirmUpgrade={handleConfirmUpgrade}
        moduleNumber={upgradePromptModule}
      />

      {/* Certificate Modal ($20 Fee) */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        guideName={guide?.name || 'Professional Tour Guide'}
      />

    </div>
  )
}
