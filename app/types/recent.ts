export interface RecentFile {
  id: number;
  name: string;
  type: "image" | "doc" | "folder";
  status: "Modified" | "Uploaded" | "Viewed" | "Shared" | "Most Recent";
  time: string;
  size: string;
  imageUrl?: string;
}

export interface DateGroup {
  label: string;
  files: RecentFile[];
}
