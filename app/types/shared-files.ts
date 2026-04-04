export interface SharedFile {
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
  sharedBy: {
    name: string;
    avatar: string;
  };
  sharedAt: string;
  permissions: "Viewer" | "Editor" | "Owner";
  icon: string;
  iconColor: string;
}

export interface SharingStats {
  totalReceived: number;
  activeContributors: number;
  storageUsed: string;
  newThisWeek: number;
}
