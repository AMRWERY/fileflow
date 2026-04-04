import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  // Use the service-role client for the insert so the server-side RLS check
  // (auth.uid() = user_id) is bypassed. Auth is still enforced manually below.
  const supabase = serverSupabaseServiceRole<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const body = await readBody(event);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Folder name is required.' });
  }

  const parentId =
    body.parent_id && body.parent_id !== 'undefined' && body.parent_id !== 'null'
      ? String(body.parent_id)
      : null;

  const path = parentId ? `${parentId}/${name}` : `/${name}`;

  const { error } = await supabase.from('folders').insert({
    user_id: user.sub,
    name,
    parent_id: parentId,
    team_space_id: null,
    path,
    is_deleted: false,
  } as never);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message, data: error });
  }

  return { success: true };
});
