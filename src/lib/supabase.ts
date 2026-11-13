import { createClient } from '@supabase/supabase-js'

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
  process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// For Admin APIs and migrations, we use the service role key to bypass RLS.
// Use cache: 'no-store' on the global fetch to ensure Next.js never serves stale cached queries after updation.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    fetch: (url, options = {}) => {
      // 4-second timeout to prevent hanging when network/Supabase is unreachable
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      return fetch(url, {
        ...options,
        signal: (options as any).signal || controller.signal,
        cache: 'no-store',
      }).finally(() => clearTimeout(timeoutId));
    },
  },
})

