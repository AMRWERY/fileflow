import { serverSupabaseClient, serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import { createError, type H3Event } from 'h3'

export { serverSupabaseClient, serverSupabaseServiceRole }

/**
 * Returns the authenticated user or throws a 401.
 * Use this at the top of every protected API route.
 */
export async function requireAuth(event: H3Event) {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}

/**
 * Returns the authenticated Supabase client (scoped to the current user session).
 * Use this for row-level-security-protected queries.
 */
export async function useServerSupabase(event: H3Event) {
  const [client, user] = await Promise.all([
    serverSupabaseClient(event),
    requireAuth(event),
  ])
  return { client, user }
}

/**
 * Returns the service-role Supabase client (bypasses RLS).
 * Only use server-side for admin operations that must bypass RLS.
 */
export async function useServerSupabaseAdmin(event: H3Event) {
  const admin = serverSupabaseServiceRole(event)
  const user = await requireAuth(event)
  return { admin, user }
}
