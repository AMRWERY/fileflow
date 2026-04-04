import { defineEventHandler, createError } from 'h3'
import { useServerSupabaseAdmin } from '../../../app/utils/supabase'

/**
 * Ensures a `profiles` row exists for the signed-in user (FK target for folders/files.user_id).
 * Call after login or before first file/folder write if `handle_new_user` trigger is missing in Supabase.
 */
export default defineEventHandler(async (event) => {
  const { admin, user } = await useServerSupabaseAdmin(event)

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const userId = user.sub

  const { data: existing, error: selErr } = await admin
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (selErr) {
    throw createError({ statusCode: 500, statusMessage: selErr.message })
  }

  if (existing) {
    return { ok: true as const, created: false }
  }

  const emailRaw = (user as { email?: unknown }).email
  const email = typeof emailRaw === 'string' ? emailRaw.trim() : ''
  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Your account has no email on the session token; cannot create a profile. Try signing out and back in.',
    })
  }

  const meta = (user as { user_metadata?: Record<string, unknown> }).user_metadata ?? {}
  const fullName =
    typeof meta.full_name === 'string'
      ? meta.full_name
      : typeof meta.name === 'string'
        ? meta.name
        : null
  const avatarUrl = typeof meta.avatar_url === 'string' ? meta.avatar_url : null

  const { error: insErr } = await admin.from('profiles').insert({
    id: userId,
    email,
    full_name: fullName,
    avatar_url: avatarUrl,
  } as never)

  if (insErr) {
    throw createError({ statusCode: 500, statusMessage: insErr.message })
  }

  return { ok: true as const, created: true }
})
