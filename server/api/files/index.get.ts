import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/database.types';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user?.sub) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const query = getQuery(event);
  const rawFolder = query.folderId;
  const folderId =
    rawFolder && rawFolder !== 'undefined' && rawFolder !== 'null'
      ? String(rawFolder)
      : '';

  let filesQuery = supabase
    .from('files')
    .select('*')
    .eq('user_id', user.sub)
    .neq('is_deleted', true);

  if (folderId) {
    filesQuery = filesQuery.eq('folder_id', folderId);
  } else {
    filesQuery = filesQuery.is('folder_id', null);
  }

  const { data, error } = await filesQuery;

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message, data: error });
  }

  type FileRow = Record<string, unknown> & { mime_type?: string | null; storage_path?: string | null }
  const rows = (data ?? []) as FileRow[];

  // Batch-generate 1-hour signed URLs for image files so the client
  // can render real thumbnails without a separate per-file request.
  const imagePaths = rows
    .filter((f) => String(f.mime_type ?? '').startsWith('image/') && f.storage_path)
    .map((f) => String(f.storage_path));

  const signedUrlMap: Record<string, string> = {};
  if (imagePaths.length) {
    const { data: signed } = await supabase.storage
      .from('user-files')
      .createSignedUrls(imagePaths, 3600);
    for (const item of signed ?? []) {
      if (item.signedUrl && item.path) signedUrlMap[item.path] = item.signedUrl;
    }
  }

  return rows.map((f) => ({
    ...f,
    preview_url: f.storage_path ? (signedUrlMap[f.storage_path] ?? null) : null,
  }));
});
