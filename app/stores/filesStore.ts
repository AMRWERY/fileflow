import type { FileItem, FolderPreviewFile } from "~/types/all-files";
import { MOCK_FILES, MOCK_FOLDERS, type MockFile, type MockFolder } from "~/data/mock";

/**
 * Static, in-memory files store. All data comes from `~/data/mock` and
 * mutations (create / upload / delete) only live until the page is reloaded.
 */
export const useFilesStore = defineStore("files", () => {
  // In-memory "database"
  const db = reactive({
    folders: MOCK_FOLDERS.map((f): MockFolder => ({ ...f })),
    files: MOCK_FILES.map((f): MockFile => ({ ...f })),
  });

  const files = ref<FileItem[]>([]);
  const folders = ref<FileItem[]>([]);
  const currentFolderId = ref<string | null>(null);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /** True after the first root listing (`fetchContents(null)`) has run. */
  const hasRootListingFetched = ref(false);

  const toFolderItem = (f: MockFolder): FileItem => ({
    id: f.id,
    name: f.name,
    type: "folder",
    size: "--",
    meta: "-",
    selected: false,
    previewFiles: db.files
      .filter((file) => file.folder_id === f.id)
      .slice(0, 3)
      .map((p): FolderPreviewFile => ({
        id: p.id,
        name: p.name,
        type: mimeToType(p.mime_type),
        mime_type: p.mime_type,
      })),
  });

  const toFileItem = (f: MockFile): FileItem => ({
    id: f.id,
    name: f.name,
    type: mimeToType(f.mime_type) as FileItem["type"],
    size: formatBytes(f.size),
    date: f.created_at,
    meta: new Date(f.created_at).toLocaleDateString(),
    selected: false,
    previewUrl: f.mime_type.startsWith("image/") ? f.url ?? undefined : undefined,
  });

  /** Loads folders + files for the given parent. */
  const fetchContents = async (folderId: string | null = null): Promise<boolean> => {
    currentFolderId.value = folderId;
    error.value = null;
    folders.value = db.folders.filter((f) => f.parent_id === folderId).map(toFolderItem);
    files.value = db.files.filter((f) => f.folder_id === folderId).map(toFileItem);
    if (folderId === null) hasRootListingFetched.value = true;
    return true;
  };

  const getFolder = (id: string) => db.folders.find((f) => f.id === id) ?? null;
  const getFile = (id: string) => db.files.find((f) => f.id === id) ?? null;

  const createFolder = async (name: string, parentId: string | null = null): Promise<boolean> => {
    const trial = useTrialLimits();
    if (!trial.allow('folder')) return false;
    const trimmed = name.trim();
    if (!trimmed) {
      error.value = "Folder name is required.";
      return false;
    }
    db.folders.push({
      id: `f-${Date.now()}`,
      name: trimmed,
      parent_id: parentId,
      created_at: new Date().toISOString(),
    });
    trial.record('folder');
    return fetchContents(parentId);
  };

  const uploadFile = async (file: File, folderId: string | null = null): Promise<boolean> => {
    const trial = useTrialLimits();
    if (!trial.allow('upload')) return false;
    const dot = file.name.lastIndexOf(".");
    db.files.push({
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      mime_type: file.type || "application/octet-stream",
      size: file.size,
      created_at: new Date().toISOString(),
      folder_id: folderId,
      extension: dot > -1 ? file.name.slice(dot + 1).toLowerCase() : null,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    });
    trial.record('upload');
    return fetchContents(currentFolderId.value);
  };

  const deleteItems = async (fileIds: string[], folderIds: string[]) => {
    if (!useTrialLimits().allow('delete')) return;
    error.value = null;
    // Collect the whole subtree of every deleted folder.
    const doomed = new Set<string>(folderIds);
    let grew = true;
    while (grew) {
      grew = false;
      for (const f of db.folders) {
        if (f.parent_id && doomed.has(f.parent_id) && !doomed.has(f.id)) {
          doomed.add(f.id);
          grew = true;
        }
      }
    }
    db.folders = db.folders.filter((f) => !doomed.has(f.id));
    db.files = db.files.filter(
      (f) => !fileIds.includes(f.id) && !(f.folder_id && doomed.has(f.folder_id)),
    );
    await fetchContents(currentFolderId.value);
  };

  /** Static share link — nothing is persisted. */
  const createShareLink = async (fileId: string): Promise<string> => {
    if (!useTrialLimits().allow('share')) return '';
    return `${window.location.origin}/share/${encodeURIComponent(fileId)}`;
  };

  return {
    files,
    folders,
    currentFolderId,
    isLoading,
    error,
    hasRootListingFetched,
    fetchContents,
    getFolder,
    getFile,
    deleteItems,
    createFolder,
    uploadFile,
    createShareLink,
  };
});

function mimeToType(mime: string): string {
  if (!mime) return "document";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime === "application/pdf") return "pdf";
  if (mime.includes("zip") || mime.includes("compressed")) return "zip";
  if (mime.includes("sheet") || mime.includes("excel") || mime.includes("csv")) return "sheet";
  return "document";
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
