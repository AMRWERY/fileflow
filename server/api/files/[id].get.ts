import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

const BUCKET = 'user-files'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user?.sub) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'File ID is required' })

  const supabase = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await supabase
    .from('files')
    .select('id, name, mime_type, size, created_at, storage_path, thumbnail_path, folder_id, extension')
    .eq('id', id)
    .eq('user_id', user.sub)
    .neq('is_deleted', true)
    .single()

  if (error || !data) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  // Generate a 1-hour signed URL so the client can display the file directly
  let signedUrl: string | null = null
  if (data.storage_path) {
    const { data: signed } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(data.storage_path, 3600)
    if (signed?.signedUrl) signedUrl = signed.signedUrl
  }

  return { ...data, signedUrl }
})
