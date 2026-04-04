// ─── Profiles ───────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  storage_used: number
  storage_quota: number
  role: 'user' | 'admin'
  is_active: boolean
  created_at: string
  updated_at: string
}

// ─── Folders ────────────────────────────────────────────────────────────────

export interface Folder {
  id: string
  user_id: string
  team_space_id: string | null
  parent_id: string | null
  name: string
  color: string | null
  path: string
  is_deleted: boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface FolderTree {
  id: string
  parent_id: string | null
  name: string
  color: string | null
  path: string
  depth: number
}

// ─── Files ──────────────────────────────────────────────────────────────────

export type ScanStatus = 'pending' | 'clean' | 'infected' | 'skipped'

export interface FileMetadata {
  // Image / Video
  width?: number
  height?: number
  color_profile?: string
  // Video / Audio
  duration?: number
  fps?: number
  bitrate?: number
  sample_rate?: number
  // Document
  pages?: number
}

export interface FileRecord {
  id: string
  user_id: string
  folder_id: string | null
  team_space_id: string | null
  name: string
  original_name: string
  storage_path: string
  thumbnail_path: string | null
  mime_type: string
  extension: string | null
  size: number
  hash: string | null
  is_starred: boolean
  is_deleted: boolean
  deleted_at: string | null
  expires_at: string | null
  scan_status: ScanStatus
  version_count: number
  download_count: number
  metadata: FileMetadata
  created_at: string
  updated_at: string
}

// ─── File Versions ───────────────────────────────────────────────────────────

export interface FileVersion {
  id: string
  file_id: string
  user_id: string
  version_number: number
  storage_path: string
  size: number
  hash: string | null
  label: string | null
  created_at: string
}

// ─── File Tags ───────────────────────────────────────────────────────────────

export interface FileTag {
  id: string
  file_id: string
  user_id: string
  tag: string
  created_at: string
}

// ─── Share Links ─────────────────────────────────────────────────────────────

export type SharePermission = 'view' | 'download'

export interface ShareLink {
  id: string
  token: string
  user_id: string
  file_id: string | null
  folder_id: string | null
  permission: SharePermission
  password_hash: string | null
  expires_at: string | null
  max_downloads: number | null
  download_count: number
  view_count: number
  is_active: boolean
  created_at: string
}

// ─── File Requests ───────────────────────────────────────────────────────────

export interface FileRequest {
  id: string
  token: string
  user_id: string
  folder_id: string | null
  title: string
  description: string | null
  allowed_types: string[] | null
  max_file_size: number | null
  max_files: number | null
  expires_at: string | null
  is_active: boolean
  created_at: string
}

// ─── Upload Sessions ─────────────────────────────────────────────────────────

export type UploadSessionStatus = 'in_progress' | 'assembling' | 'complete' | 'failed'

export interface UploadSession {
  id: string
  user_id: string
  file_name: string
  mime_type: string
  total_size: number
  total_chunks: number
  uploaded_chunks: number
  chunk_size: number
  temp_path: string | null
  target_folder_id: string | null
  status: UploadSessionStatus
  created_at: string
  updated_at: string
}

// ─── Team Spaces ─────────────────────────────────────────────────────────────

export interface TeamSpace {
  id: string
  name: string
  slug: string
  avatar_color: string | null
  owner_id: string
  storage_used: number
  storage_quota: number
  created_at: string
  updated_at: string
}

// ─── Team Members ────────────────────────────────────────────────────────────

export type TeamMemberRole = 'admin' | 'editor' | 'viewer'

export interface TeamMember {
  id: string
  team_space_id: string
  user_id: string
  role: TeamMemberRole
  invited_by: string | null
  joined_at: string | null
  invited_at: string
}

// ─── Activity Logs ───────────────────────────────────────────────────────────

export type ActivityAction =
  | 'upload'
  | 'file_delete'
  | 'folder_create'
  | 'folder_delete'
  | 'file_view'
  | 'file_download'
  | 'file_rename'
  | 'file_move'
  | 'file_restore'
  | 'file_star'
  | 'file_version'
  | 'file_share'
  | 'link_create'
  | 'link_disable'
  | 'link_access'
  | 'member_invite'
  | 'member_join'
  | 'member_remove'
  | 'member_role'
  | 'space_create'

export interface ActivityLog {
  id: string
  user_id: string | null
  team_space_id: string | null
  file_id: string | null
  folder_id: string | null
  action: ActivityAction
  meta: Record<string, unknown>
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

// ─── File Comments ───────────────────────────────────────────────────────────

export interface FileComment {
  id: string
  file_id: string
  user_id: string
  content: string
  is_edited: boolean
  created_at: string
  updated_at: string
}

// ─── Notifications ───────────────────────────────────────────────────────────

export type NotificationType =
  | 'upload_complete'
  | 'share_activity'
  | 'comment_added'
  | 'member_invited'
  | 'member_joined'
  | 'quota_warning'
  | 'file_infected'
  | 'link_expired'
  | 'file_request_received'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string | null
  data: Record<string, unknown>
  is_read: boolean
  created_at: string
}

// ─── API Keys ────────────────────────────────────────────────────────────────

export type ApiKeyScope = 'read' | 'write' | 'delete' | 'share' | 'admin'

export interface ApiKey {
  id: string
  user_id: string
  name: string
  key_hash: string
  key_prefix: string
  scopes: ApiKeyScope[]
  last_used_at: string | null
  expires_at: string | null
  is_active: boolean
  created_at: string
}
