import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: '.env.local' })
dotenv.config()

const envSchema = z.object({
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  IP_HASH_SALT: z.string().min(16).optional(),
  FRONTEND_ORIGIN: z.string().url().default('http://localhost:3000'),
  TRUST_PROXY: z
    .string()
    .default('false')
    .transform((value) => {
      const normalized = value.trim().toLowerCase()

      if (normalized === 'true') return true
      if (normalized === 'false') return false

      const numericValue = Number(normalized)
      if (Number.isInteger(numericValue) && numericValue >= 0) {
        return numericValue
      }

      return value
    }),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
})

export const config = envSchema.parse(process.env)

export function requireSupabaseConfig() {
  const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'IP_HASH_SALT'] as const
  const missing = required.filter((key) => !config[key])

  if (missing.length > 0) {
    throw new Error(`Missing required backend environment variables: ${missing.join(', ')}`)
  }

  return {
    supabaseUrl: config.SUPABASE_URL as string,
    serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY as string,
    ipHashSalt: config.IP_HASH_SALT as string
  }
}
