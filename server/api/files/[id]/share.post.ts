import { randomBytes } from 'node:crypto'
import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/database.types'
import { getServerAuthUserId } from '@/utils/supabase-auth'

function randomToken(): string {
  return randomBytes(24).toString('hex')
}

export default defineEventHandler(async (event) => {
  const userId = await getServerAuthUserId(event)
  if (!userId) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'File ID is required' })

  const supabase = serverSupabaseServiceRole<Database>(event)

  const { data: file, error: fErr } = await supabase
    .from('files')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .neq('is_deleted', true)
    .single()

  if (fErr || !file) throw createError({ statusCode: 404, statusMessage: 'File not found' })

  const { data: existingRows } = await supabase
    .from('share_links')
    .select('token')
    .eq('file_id', id)
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)

  let token = existingRows?.[0]?.token

  if (!token) {
    token = randomToken()
    const { error: insErr } = await supabase.from('share_links').insert({
      token,
      user_id: userId,
      file_id: id,
      folder_id: null,
      permission: 'view',
      password_hash: null,
      expires_at: null,
      max_downloads: null,
      is_active: true,
    } as never)

    if (insErr) throw createError({ statusCode: 500, statusMessage: insErr.message })
  }

  const origin = getRequestURL(event).origin
  const url = `${origin}/share/${token}`

  return { url, token }
})
