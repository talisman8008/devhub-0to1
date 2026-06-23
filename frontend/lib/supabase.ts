import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// True only when both env vars are present. Used by the waitlist form to show a
// helpful message instead of failing silently when Supabase isn't configured.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Fall back to a syntactically-valid placeholder URL so createClient does not
// throw at module-eval time when env vars are missing (which would crash the
// entire landing page, including static pages like /privacy and /terms).
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'public-anon-key-placeholder'
)
