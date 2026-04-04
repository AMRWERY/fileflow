import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Folder ID is required' })
  }

  const supabase = serverSupabaseServiceRole<Database>(event)

  const { data, error } = await supabase
    .from('folders')
    .select('id, name, parent_id, path, created_at')
    .eq('id', id)
    .eq('user_id', user.sub)
    .neq('is_deleted', true)
    .single()

  if (error || !data) {
    throw createError({ statusCode: 404, statusMessage: 'Folder not found' })
  }

  return data
})
