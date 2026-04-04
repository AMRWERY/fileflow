import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { useServerSupabaseAdmin } from '../../../app/utils/supabase'

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

/**
 * POST /api/auth/avatar
 * Accepts a multipart/form-data upload with a single "avatar" file field.
 * Uploads it to the `avatars` Supabase Storage bucket at `avatars/{userId}/{filename}`,
 * then updates the user's profiles.avatar_url.
 *
 * Uses the service-role client because storage bucket policy for `avatars`
 * only allows INSERT via `avatars/{user_id}/*` — the service role bypasses
 * this to let us enforce our own validation logic here.
 *
 * Protected: 401 if not signed in.
 */
export default defineEventHandler(async (event) => {
  const { admin, user } = await useServerSupabaseAdmin(event)

  const parts = await readMultipartFormData(event)
  const filePart = parts?.find((p) => p.name === 'avatar')

  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'No avatar file provided.' })
  }

  const mimeType = filePart.type ?? 'application/octet-stream'

  if (!ALLOWED_MIME.includes(mimeType)) {
    throw createError({
      statusCode: 415,
      statusMessage: `Unsupported file type. Allowed: ${ALLOWED_MIME.join(', ')}`,
    })
  }

  if (filePart.data.byteLength > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Avatar must be under 5 MB.' })
  }

  const ext = filePart.filename.split('.').pop() ?? 'jpg'
  const storagePath = `${user.sub}/${Date.now()}.${ext}`

  // Upload to the `avatars` bucket (public bucket per DATABASE.md)
  const { error: uploadError } = await admin.storage
    .from('avatars')
    .upload(storagePath, filePart.data, {
      contentType: mimeType,
      upsert: true,
    })

  if (uploadError) {
    throw createError({ statusCode: 500, statusMessage: uploadError.message })
  }

  // Get the public URL
  const { data: urlData } = admin.storage.from('avatars').getPublicUrl(storagePath)
  const avatarUrl = urlData.publicUrl

  // Update the profile row
  const { data: profile, error: updateError } = await admin
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.sub)
    .select()
    .single()

  if (updateError) {
    throw createError({ statusCode: 500, statusMessage: updateError.message })
  }

  return { avatar_url: avatarUrl, profile }
})
