import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://geijvxhwkbbnmjffqyyk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWp2eGh3a2Jibm1qZmZxeXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjYyNTUsImV4cCI6MjEwNTA0MjI1NX0.XnmgPfayL3QKgpqa2lPAU3QL6t0MfgWVURO6Rs-Xva0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
