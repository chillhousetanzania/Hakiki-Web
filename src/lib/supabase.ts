import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — only initialized on first call, not at module load time.
// This prevents build failures when env vars are not present at build time
// (e.g. on Vercel's build server before env vars are configured).

let _client: SupabaseClient | null = null
let _serverClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not configured')
    _client = createClient(url, key)
  }
  return _client
}

export function createServerClient(): SupabaseClient {
  if (!_serverClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase server env vars not configured')
    _serverClient = createClient(url, key)
  }
  return _serverClient
}

// Named export kept for backwards compatibility with dashboard/page.tsx
// which does: import { supabase } from '@/lib/supabase'
// This is a proxy object — the real client is created on first property access.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
