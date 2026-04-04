import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

type JwtUser = { sub?: string; id?: string } | null | undefined

/**
 * `@nuxtjs/supabase` may expose JWT `sub` or Supabase `id` depending on version / context.
 */
export async function getServerAuthUserId(event: H3Event): Promise<string | null> {
  const user = (await serverSupabaseUser(event)) as JwtUser
  if (!user || typeof user !== 'object') return null
  const v = user.sub ?? user.id
  return typeof v === 'string' && v.length > 0 ? v : null
}
