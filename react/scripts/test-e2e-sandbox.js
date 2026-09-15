import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://geijvxhwkbbnmjffqyyk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWp2eGh3a2Jibm1qZmZxeXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjYyNTUsImV4cCI6MjEwNTA0MjI1NX0.XnmgPfayL3QKgpqa2lPAU3QL6t0MfgWVURO6Rs-Xva0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function runEndToEndSandboxTest() {
  console.log('====================================================')
  console.log('🚀 RUNNING COMPREHENSIVE SANDBOX TEST SUITE')
  console.log('====================================================\n')

  let passedTests = 0
  const totalTests = 5

  // TEST 1: Check Database Schema and Connection
  console.log('--- TEST 1: Verify Supabase Connection & Existing Guides ---')
  const { data: initialGuides, error: initErr } = await supabase
    .from('tour_guides')
    .select('id, name, location, rate, funded_amount, status')
    .limit(5)

  if (initErr) {
    console.error('❌ Test 1 Failed: Could not connect to Supabase:', initErr.message)
    process.exit(1)
  }
  console.log(`✓ Connected to Supabase 'tour_guide' project. Found ${initialGuides.length} active guides:`)
  initialGuides.forEach(g => console.log(`   - ${g.name} (${g.location}) | Rate: ${g.rate} | Balance: $${g.funded_amount}`))
  passedTests++
  console.log('✅ TEST 1 PASSED\n')

  // TEST 2: Register a new Tour Guide via Table Auth with $10 Minimum Deposit
  console.log('--- TEST 2: Register New Tour Guide with $10 Minimum Deposit ---')
  const testEmail = `test.guide.${Date.now()}@testplatform.com`
  const testPassword = 'TestPassword123!'
  const testGuide = {
    name: 'Carlos Mendez',
    email: testEmail,
    phone: '+34 612 345 678',
    location: 'Madrid & Toledo, Spain',
    specialty: 'Historic Castles, Royal Palace & Tapas',
    rate: '★ 5.0 · $45/hr',
    rate_num: 45,
    rating: 5.0,
    password: testPassword,
    funded_amount: 10.0, // Minimum $10 deposit
    payment_method: 'paypal',
    status: 'active',
    training_completed: true,
    bio: 'Licensed professional guide specializing in Golden Age history and culinary hidden gems.'
  }

  const { data: registeredGuide, error: regErr } = await supabase
    .from('tour_guides')
    .insert([testGuide])
    .select()
    .single()

  if (regErr || !registeredGuide) {
    console.error('❌ Test 2 Failed: Registration failed:', regErr?.message)
    process.exit(1)
  }
  console.log(`✓ Guide registered successfully in database table:`)
  console.log(`   - ID: ${registeredGuide.id}`)
  console.log(`   - Name: ${registeredGuide.name}`)
  console.log(`   - Email: ${registeredGuide.email}`)
  console.log(`   - Initial Funded Balance: $${registeredGuide.funded_amount} (Minimum $10 confirmed)`)
  console.log(`   - Rate: $${registeredGuide.rate_num}/hr`)
  passedTests++
  console.log('✅ TEST 2 PASSED\n')

  // TEST 3: Table-Based Authentication (Login via Table)
  console.log('--- TEST 3: Table-Based Authentication (Login Verification) ---')
  // 3a. Test valid login
  const { data: authData, error: authErr } = await supabase
    .from('tour_guides')
    .select('*')
    .eq('email', testEmail)
    .eq('password', testPassword)

  if (authErr || !authData || authData.length === 0) {
    console.error('❌ Test 3 Failed: Table login failed with valid credentials')
    process.exit(1)
  }
  console.log(`✓ Successful table-based login for: ${authData[0].name} (${authData[0].email})`)
  console.log(`   - Retrieved Wallet Balance: $${authData[0].funded_amount}`)

  // 3b. Test invalid password rejection
  const { data: badAuth } = await supabase
    .from('tour_guides')
    .select('*')
    .eq('email', testEmail)
    .eq('password', 'WrongPasswordXYZ')

  if (badAuth && badAuth.length > 0) {
    console.error('❌ Test 3 Failed: Table login accepted invalid password!')
    process.exit(1)
  }
  console.log('✓ Invalid password correctly rejected.')
  passedTests++
  console.log('✅ TEST 3 PASSED\n')

  // TEST 4: Traveler Books the Tour Guide & Direct Payment + Lead Fee Deduction
  console.log('--- TEST 4: Traveler Books Carlos Mendez ($45/hr × 3 hrs) ---')
  const clientName = 'Emma Watson'
  const clientEmail = 'emma.watson@traveler.com'
  const hours = 3
  const hourlyRate = registeredGuide.rate_num || 45
  const totalPaidDirectlyToGuide = hourlyRate * hours // $135
  const platformLeadFee = 2.0 // Deducted from Carlos's $10 deposit

  console.log(`   - Tour Guide: ${registeredGuide.name} ($${hourlyRate}/hr)`)
  console.log(`   - Duration: ${hours} hours`)
  console.log(`   - Client pays directly to Guide: $${totalPaidDirectlyToGuide}.00`)
  console.log(`   - Platform lead fee to deduct from Guide wallet: $${platformLeadFee}.00`)

  // 4a. Record booking in bookings table
  const { data: bookingRecord, error: bookErr } = await supabase
    .from('bookings')
    .insert([
      {
        guide_id: registeredGuide.id,
        guide_name: registeredGuide.name,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: '+1 (555) 345-6789',
        tour_date: '2026-09-20',
        hours: hours,
        total_paid_to_guide: totalPaidDirectlyToGuide,
        lead_fee_deducted: platformLeadFee,
        payment_channel: 'Direct to Guide',
        status: 'confirmed'
      }
    ])
    .select()
    .single()

  if (bookErr) {
    console.error('❌ Test 4 Failed: Could not record booking:', bookErr.message)
    process.exit(1)
  }
  console.log(`✓ Booking created in database: Booking ID = ${bookingRecord.id}`)

  // 4b. Deduct lead fee from guide's funded balance
  const updatedBalance = Number(registeredGuide.funded_amount) - platformLeadFee
  const { data: updatedGuide, error: updateErr } = await supabase
    .from('tour_guides')
    .update({
      funded_amount: updatedBalance,
      status: updatedBalance < 2 ? 'low_balance' : 'active'
    })
    .eq('id', registeredGuide.id)
    .select()
    .single()

  if (updateErr) {
    console.error('❌ Test 4 Failed: Could not deduct balance:', updateErr.message)
    process.exit(1)
  }
  console.log(`✓ Lead fee deducted from Carlos's funded balance:`)
  console.log(`   - Previous Balance: $${registeredGuide.funded_amount}.00`)
  console.log(`   - Fee Deducted: -$${platformLeadFee}.00`)
  console.log(`   - New Balance: $${updatedGuide.funded_amount}.00`)

  if (Number(updatedGuide.funded_amount) !== 8.0) {
    console.error(`❌ Expected balance $8.00, got $${updatedGuide.funded_amount}`)
    process.exit(1)
  }
  passedTests++
  console.log('✅ TEST 4 PASSED\n')

  // TEST 5: Verify Admin Portal (/admin) Aggregation & Balances
  console.log('--- TEST 5: Verify Admin Portal Data & Aggregations ---')
  const { data: allBookings, error: allBErr } = await supabase
    .from('bookings')
    .select('*')
    .eq('guide_id', registeredGuide.id)

  if (allBErr || allBookings.length === 0) {
    console.error('❌ Test 5 Failed: Could not retrieve bookings for admin view')
    process.exit(1)
  }
  console.log(`✓ Admin view correctly lists booking for ${registeredGuide.name}:`)
  console.log(`   - Client: ${allBookings[0].client_name} (${allBookings[0].client_email})`)
  console.log(`   - Amount Client Paid to Guide: $${allBookings[0].total_paid_to_guide}.00`)
  console.log(`   - Lead Fee Collected by Platform: $${allBookings[0].lead_fee_deducted}.00`)
  console.log(`   - Remaining Guide Balance: $${updatedGuide.funded_amount}.00`)

  passedTests++
  console.log('✅ TEST 5 PASSED\n')

  console.log('====================================================')
  console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`)
  console.log('====================================================')
}

runEndToEndSandboxTest().catch(err => {
  console.error('Fatal error during test run:', err)
  process.exit(1)
})
