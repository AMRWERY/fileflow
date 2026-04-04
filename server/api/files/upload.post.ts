import { serverSupabaseUser } from '#supabase/server'
import { serverSupabaseServiceRole } from '#supabase/server'
import { readMultipartFormData, createError } from 'h3'
import type { Database } from '~/types/database.types'

const BUCKET = 'user-files'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const admin = serverSupabaseServiceRole<Database>(event)

  // Ensure bucket exists
  const { data: buckets } = await admin.storage.listBuckets()
  const bucketExists = buckets?.some((b) => b.name === BUCKET)
  if (!bucketExists) {
    const { error: bucketErr } = await admin.storage.createBucket(BUCKET, { public: false })
    if (bucketErr && !bucketErr.message.includes('already exists')) {
      throw createError({ statusCode: 500, statusMessage: `Could not create storage bucket: ${bucketErr.message}` })
    }
  }

  const parts = await readMultipartFormData(event)
  if (!parts?.length) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided.' })
  }

  const filePart = parts.find((p) => p.name === 'file')
  const folderIdPart = parts.find((p) => p.name === 'folder_id')

  if (!filePart?.data || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided.' })
  }

  const folderId =
    folderIdPart?.data
      ? String(Buffer.isBuffer(folderIdPart.data) ? folderIdPart.data.toString() : folderIdPart.data).trim()
      : null

  const safeFolderId =
    folderId && folderId !== 'undefined' && folderId !== 'null' && folderId !== ''
      ? folderId
      : null

  const ext = filePart.filename.split('.').pop() ?? ''
  const storagePath = `${user.sub}/${Date.now()}_${filePart.filename}`
  const mimeType = filePart.type ?? 'application/octet-stream'

  const { error: uploadErr } = await admin.storage
    .from(BUCKET)
    .upload(storagePath, filePart.data, { contentType: mimeType, upsert: false })

  if (uploadErr) {
    throw createError({ statusCode: 500, statusMessage: uploadErr.message })
  }

  const { error: insertErr } = await admin.from('files').insert({
    user_id: user.sub,
    folder_id: safeFolderId,
    name: filePart.filename,
    original_name: filePart.filename,
    storage_path: storagePath,
    mime_type: mimeType,
    extension: ext || null,
    size: filePart.data.byteLength,
    team_space_id: null,
  } as never)

  if (insertErr) {
    // Clean up the uploaded object so storage doesn't orphan
    await admin.storage.from(BUCKET).remove([storagePath])
    throw createError({ statusCode: 500, statusMessage: insertErr.message })
  }

  return { ok: true, storagePath }
})
