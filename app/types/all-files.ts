export interface FolderPreviewFile {
  id: string
  name: string
  type: string
  mime_type: string
}

export interface FileItem {
  id: string | number;
  name: string;
  type:
    | "folder"
    | "image"
    | "pdf"
    | "zip"
    | "video"
    | "sheet"
    | "svg"
    | "png"
    | "docx"
    | "document";
  size: string;
  date?: string;
  icon?: string;
  iconColor?: string;
  ext?: string;
  meta?: string; // items count for folders, date for files
  selected?: boolean;
  previewUrl?: string;
  previewColor?: string;
  /** First 3 files inside this folder (only populated for type==='folder') */
  previewFiles?: FolderPreviewFile[]
}

