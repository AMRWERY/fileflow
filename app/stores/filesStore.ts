import { useSupabaseClient, useSupabaseUser } from "#imports";
import type { Database } from '~/types/database.types';
import type { FileItem, FolderPreviewFile } from "~/types/all-files";

function asRowArray<T>(data: unknown): T[] {
  if (data == null) return []
  return Array.isArray(data) ? data : []
}

type UserLike = { id?: string; sub?: string } | null | undefined

function idFromUserLike(u: UserLike): string | null {
  if (!u || typeof u !== 'object') return null
  const id = u.id ?? u.sub
  return typeof id === 'string' && id.length > 0 ? id : null
}

export const useFilesStore = defineStore("files", () => {
  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  const files = ref<FileItem[]>([]);
  const folders = ref<FileItem[]>([]);
  const currentFolderId = ref<string | null>(null);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /** True after the first root listing fetch (`fetchContents(null)`) has finished (success or error). */
  const hasRootListingFetched = ref(false);

  /**
   * Nuxt `useSupabaseUser()` can lag hydration or omit `id` while the client session is valid.
   * Prefer session / getUser() so folder create + API calls always get a real UUID.
   */
  async function resolveAuthUserId(): Promise<string | null> {
    const fromState = idFromUserLike(user.value as UserLike)
    if (fromState) return fromState

    const { data: { session } } = await supabase.auth.getSession()
    const fromSession = idFromUserLike(session?.user as UserLike)
    if (fromSession) return fromSession

    const { data: got, error: guErr } = await supabase.auth.getUser()
    if (!guErr && got.user) {
      const fromGet = idFromUserLike(got.user as UserLike)
      if (fromGet) return fromGet
    }

    return null
  }

  function fetchErrorMessage(e: unknown): string {
    if (e && typeof e === 'object') {
      const err = e as Record<string, unknown>
      const data = err.data as Record<string, unknown> | undefined
      const sm = data?.statusMessage ?? data?.message
      if (typeof sm === 'string' && sm) return sm
      if (typeof err.message === 'string' && err.message) return err.message
    }
    return 'Request failed'
  }

  /** Loads folders + files for the given parent. Returns false on failure (error ref is set). */
  const fetchContents = async (folderId: string | null = null): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    currentFolderId.value = folderId

    try {
      const parentQuery = folderId ? { parentId: folderId } : {}
      const folderQuery = folderId ? { folderId } : {}

      const [foldersData, filesData] = await Promise.all([
        $fetch('/api/folders', { method: 'GET', query: parentQuery, credentials: 'include' }),
        $fetch('/api/files', { method: 'GET', query: folderQuery, credentials: 'include' }),
      ])

      const rawFolders = asRowArray<Record<string, unknown>>(foldersData)
      const folderIds = rawFolders.map((f) => f.id as string).filter(Boolean)

      // Fetch preview files for all folders in one request
      let previewMap: Record<string, { id: string; name: string; mime_type: string }[]> = {}
      if (folderIds.length) {
        try {
          const preview = await $fetch('/api/folders/preview', {
            method: 'GET',
            query: { folderIds: folderIds.join(',') },
            credentials: 'include',
          })
          previewMap = (preview as typeof previewMap) ?? {}
        } catch {
          // preview is best-effort, don't block the main render
        }
      }

      folders.value = rawFolders.map((f) => {
        const fid = f.id as string
        const previews = previewMap[fid] ?? []
        return {
          id: fid,
          name: f.name as string,
          type: 'folder' as const,
          size: '--',
          meta: '-',
          selected: false,
          previewFiles: previews.map((p): FolderPreviewFile => ({
            id: p.id,
            name: p.name,
            type: mimeToType(p.mime_type),
            mime_type: p.mime_type,
          })),
        }
      })

      files.value = asRowArray<Record<string, unknown>>(filesData).map((f): FileItem => {
        const mime = String(f.mime_type ?? '')
        let simpleType = 'document'
        if (mime.startsWith('image/')) simpleType = 'image'
        else if (mime.startsWith('video/')) simpleType = 'video'
        else if (mime === 'application/pdf') simpleType = 'pdf'
        else if (mime.includes('zip')) simpleType = 'zip'

        const createdAt = String(f.created_at ?? '')
        return {
          id: f.id as string,
          name: f.name as string,
          type: simpleType as FileItem['type'],
          size: formatBytes(Number(f.size) || 0),
          date: createdAt,
          meta: createdAt ? new Date(createdAt).toLocaleDateString() : '-',
          selected: false,
          // preview_url is the batch-signed URL returned by the files API (images only).
          // Fall back to thumbnail_path public URL for any legacy rows that have one.
          previewUrl: f.preview_url
            ? String(f.preview_url)
            : f.thumbnail_path
              ? supabase.storage.from('thumbnails').getPublicUrl(String(f.thumbnail_path)).data.publicUrl
              : undefined,
        }
      })

      return true
    } catch (e: unknown) {
      console.error('Error fetching contents:', e)
      error.value = fetchErrorMessage(e) || 'Failed to fetch files'
      return false
    } finally {
      isLoading.value = false
      if (folderId === null) {
        hasRootListingFetched.value = true
      }
    }
  }

  const createFolder = async (name: string, parentId: string | null = null): Promise<boolean> => {
    if (!(await resolveAuthUserId())) {
      error.value = 'You must be signed in to create a folder.'
      return false
    }

    const trimmed = name.trim()
    if (!trimmed) {
      error.value = 'Folder name is required.'
      return false
    }

    const parent = toValue(parentId) ?? null

    try {
      isLoading.value = true
      error.value = null

      await $fetch('/api/auth/ensure-profile', { method: 'POST', credentials: 'include' })

      await $fetch('/api/folders', {
        method: 'POST',
        credentials: 'include',
        body: { name: trimmed, parent_id: parent },
      })

      const refreshed = await fetchContents(parent)
      if (!refreshed) {
        if (!error.value) error.value = 'Folder was created but the list could not be refreshed.'
        return false
      }

      return true
    } catch (e: unknown) {
      error.value = fetchErrorMessage(e) || 'Failed to create folder'
      console.error('[files] createFolder', e)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const uploadFile = async (file: File, folderId: string | null = null): Promise<boolean> => {
    if (!(await resolveAuthUserId())) {
      error.value = 'You must be signed in to upload files.'
      return false
    }
    const folder = toValue(folderId) ?? null
    try {
      isLoading.value = true
      error.value = null
      await $fetch('/api/auth/ensure-profile', { method: 'POST', credentials: 'include' })

      const form = new FormData()
      form.append('file', file, file.name)
      if (folder) form.append('folder_id', folder)

      await $fetch('/api/files/upload', {
        method: 'POST',
        credentials: 'include',
        body: form,
      })

      await fetchContents(currentFolderId.value)
      return true
    } catch (e: unknown) {
      error.value = fetchErrorMessage(e) || 'Upload failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteItems = async (fileIds: string[], folderIds: string[]) => {
    if (!(await resolveAuthUserId())) {
      error.value = 'You must be signed in to delete items.'
      return
    }
    try {
      isLoading.value = true;
      await $fetch('/api/files/delete', {
        method: 'POST',
        credentials: 'include',
        body: { fileIds, folderIds }
      });
      await fetchContents(currentFolderId.value);
    } catch (e: any) {
      error.value = e.data?.statusMessage || e.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    files,
    folders,
    currentFolderId,
    isLoading,
    error,
    hasRootListingFetched,
    fetchContents,
    deleteItems,
    createFolder,
    uploadFile
  };
});

function mimeToType(mime: string): string {
  if (!mime) return 'document'
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime === 'application/pdf') return 'pdf'
  if (mime.includes('zip') || mime.includes('compressed')) return 'zip'
  if (mime.includes('sheet') || mime.includes('excel') || mime.includes('csv')) return 'sheet'
  return 'document'
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
