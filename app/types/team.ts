export interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: "Admin" | "Editor" | "Viewer";
  lastActive: string;
}
