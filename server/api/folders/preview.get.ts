import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

/**
 * GET /api/folders/preview?folderIds=id1,id2,...
 * Returns the first 3 files for each requested folder id.
 */
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const supabase = serverSupabaseServiceRole<Database>(event)
  const query = getQuery(event)
  const raw = query.folderIds

  const ids = String(raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  if (!ids.length) return {}

  const { data, error } = await supabase
    .from('files')
    .select('id, name, mime_type, folder_id')
    .eq('user_id', user.sub)
    .neq('is_deleted', true)
    .in('folder_id', ids)
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // Group by folder_id, keep first 3 per folder
  const result: Record<string, { id: string; name: string; mime_type: string }[]> = {}
  for (const row of data ?? []) {
    const fid = row.folder_id as string
    if (!fid) continue
    if (!result[fid]) result[fid] = []
    if (result[fid].length < 3) {
      result[fid].push({ id: row.id, name: row.name, mime_type: row.mime_type })
    }
  }

  return result
})
