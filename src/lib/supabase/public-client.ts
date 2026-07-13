import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-less anon client for READ-ONLY public data.
// Because it never touches cookies/headers, pages using it can be cached
// (ISR) instead of forcing dynamic rendering on every request.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
