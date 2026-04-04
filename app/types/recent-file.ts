export interface RecentFile {
  id: number;
  name: string;
  size: string;
  updated: string;
  type: "image" | "video" | "doc" | "sheet";
  previewColor?: string;
  icon: string;
}
