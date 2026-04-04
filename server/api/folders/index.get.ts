import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const query = getQuery(event);
  const rawParent = query.parentId;
  const parentId =
    rawParent && rawParent !== 'undefined' && rawParent !== 'null'
      ? String(rawParent)
      : '';

  let foldersQuery = supabase
    .from('folders')
    .select('*')
    .eq('user_id', user.sub)
    .neq('is_deleted', true);

  if (parentId) {
    foldersQuery = foldersQuery.eq('parent_id', parentId);
  } else {
    foldersQuery = foldersQuery.is('parent_id', null);
  }

  const { data, error } = await foldersQuery;

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message, data: error });
  }

  return data ?? [];
});
