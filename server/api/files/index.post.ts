import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readBody(event);

  const { error } = await supabase.from('files').insert({
    user_id: user.sub,
    folder_id: body.folder_id || null,
    name: body.name,
    original_name: body.original_name,
    storage_path: body.storage_path,
    mime_type: body.mime_type,
    size: body.size,
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message, data: error });
  }

  return { success: true };
});
