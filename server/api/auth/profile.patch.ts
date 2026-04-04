import { defineEventHandler, readBody, createError } from 'h3'
import { useServerSupabase } from '../../../app/utils/supabase'

interface UpdateProfileBody {
  full_name?: string
  avatar_url?: string
}

/**
 * PATCH /api/auth/profile
 * Updates the authenticated user's editable profile fields.
 * Fields users cannot change (role, storage_quota, is_active) are ignored.
 * Protected: 401 if not signed in.
 */
export default defineEventHandler(async (event) => {
  const { client, user } = await useServerSupabase(event)
  const body = await readBody<UpdateProfileBody>(event)

  // Only allow safe fields — role / storage_quota / is_active are admin-only
  const allowed: UpdateProfileBody = {}
  if (body.full_name !== undefined) allowed.full_name = body.full_name.trim()
  if (body.avatar_url !== undefined) allowed.avatar_url = body.avatar_url

  if (Object.keys(allowed).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No valid fields to update.' })
  }

  const { data, error } = await client
    .from('profiles')
    .update(allowed)
    .eq('id', user.sub)
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
