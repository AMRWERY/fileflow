import { defineEventHandler } from 'h3'
import { useServerSupabase } from '../../../app/utils/supabase'

/**
 * GET /api/auth/me
 * Returns the authenticated user combined with their full profiles row.
 * Protected: 401 if not signed in.
 */
export default defineEventHandler(async (event) => {
  const { client, user } = await useServerSupabase(event)

  const { data: profile, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.sub)
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return {
    user: {
      id: user.sub,
      email: user.email,
    },
    profile,
  }
})
