import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readBody(event);
  
  if (body.fileIds && body.fileIds.length > 0) {
    const { error } = await supabase
      .from('files')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() } as never)
      .eq('user_id', user.sub)
      .in('id', body.fileIds);

    if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (body.folderIds && body.folderIds.length > 0) {
    const { error } = await supabase
      .from('folders')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() } as never)
      .eq('user_id', user.sub)
      .in('id', body.folderIds);

    if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
