export interface Folder {
  id: number;
  name: string;
  count: number;
  color: string;
}

export interface FileItem {
  id: number;
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
    | "jpg"
    | "docx";
  size: string;
  date?: string;
  icon?: string;
  iconColor?: string;
  ext?: string;
  meta?: string; // items count for folders, date for files
  selected?: boolean;
  previewUrl?: string;
  previewColor?: string;
}


