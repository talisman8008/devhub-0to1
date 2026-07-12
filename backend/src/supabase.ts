import { createClient } from '@supabase/supabase-js'
import { requireSupabaseConfig } from './config.js'
import type { Database } from './database.types.js'

let serviceClient: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseServiceClient() {
  if (serviceClient) return serviceClient

  const { supabaseUrl, serviceRoleKey } = requireSupabaseConfig()

  serviceClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  })

  return serviceClient
}
