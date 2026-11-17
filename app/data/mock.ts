import type { Profile } from '~/types/database.types'

/** Static stand-in for the signed-in user. Replace with a real backend later. */
export const MOCK_USER = {
  id: 'user-1',
  email: 'amr@fileflow.app',
  user_metadata: {
    full_name: 'Amr Mohamed',
    avatar_url: null as string | null,
  },
}

export const MOCK_PROFILE: Profile = {
  id: MOCK_USER.id,
  email: MOCK_USER.email,
  full_name: MOCK_USER.user_metadata.full_name,
  avatar_url: null,
  storage_used: 2.4 * 1024 ** 3,
  storage_quota: 5 * 1024 ** 3,
  role: 'user',
  is_active: true,
  created_at: '2025-01-10T09:00:00.000Z',
  updated_at: '2025-01-10T09:00:00.000Z',
}

export interface MockFolder {
  id: string
  name: string
  parent_id: string | null
  created_at: string
}

export interface MockFile {
  id: string
  name: string
  mime_type: string
  size: number
  created_at: string
  folder_id: string | null
  extension: string | null
  /** Static URL used for preview / download (images only). */
  url: string | null
}

export const MOCK_FOLDERS: MockFolder[] = [
  { id: 'f-design', name: 'Design Assets', parent_id: null, created_at: '2025-02-01T10:00:00.000Z' },
  { id: 'f-docs', name: 'Documents', parent_id: null, created_at: '2025-02-03T10:00:00.000Z' },
  { id: 'f-media', name: 'Media', parent_id: null, created_at: '2025-02-05T10:00:00.000Z' },
  { id: 'f-brand', name: 'Brand', parent_id: 'f-design', created_at: '2025-02-06T10:00:00.000Z' },
]

const img = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`

export const MOCK_FILES: MockFile[] = [
  { id: 'file-1', name: 'Q4_Brand_Strategy.jpg', mime_type: 'image/jpeg', size: 1_258_291, created_at: '2025-03-01T08:30:00.000Z', folder_id: null, extension: 'jpg', url: img('brand') },
  { id: 'file-2', name: 'Product_Requirements.pdf', mime_type: 'application/pdf', size: 5_033_164, created_at: '2025-03-02T11:00:00.000Z', folder_id: null, extension: 'pdf', url: null },
  { id: 'file-3', name: 'Demo_Walkthrough.mp4', mime_type: 'video/mp4', size: 48_234_496, created_at: '2025-03-03T14:20:00.000Z', folder_id: null, extension: 'mp4', url: null },
  { id: 'file-4', name: 'Budget_2025.xlsx', mime_type: 'application/vnd.ms-excel.sheet', size: 312_000, created_at: '2025-03-04T09:10:00.000Z', folder_id: null, extension: 'xlsx', url: null },
  { id: 'file-5', name: 'Assets_Bundle.zip', mime_type: 'application/zip', size: 22_020_096, created_at: '2025-03-05T16:45:00.000Z', folder_id: null, extension: 'zip', url: null },
  { id: 'file-6', name: 'Hero_Banner.png', mime_type: 'image/png', size: 2_097_152, created_at: '2025-03-06T12:00:00.000Z', folder_id: 'f-design', extension: 'png', url: img('hero') },
  { id: 'file-7', name: 'Logo_Concepts.jpg', mime_type: 'image/jpeg', size: 870_400, created_at: '2025-03-07T13:15:00.000Z', folder_id: 'f-design', extension: 'jpg', url: img('logo') },
  { id: 'file-8', name: 'Style_Guide.pdf', mime_type: 'application/pdf', size: 3_145_728, created_at: '2025-03-08T10:05:00.000Z', folder_id: 'f-brand', extension: 'pdf', url: null },
  { id: 'file-9', name: 'Meeting_Notes.docx', mime_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 98_304, created_at: '2025-03-09T15:30:00.000Z', folder_id: 'f-docs', extension: 'docx', url: null },
  { id: 'file-10', name: 'Contract_Draft.pdf', mime_type: 'application/pdf', size: 1_048_576, created_at: '2025-03-10T09:00:00.000Z', folder_id: 'f-docs', extension: 'pdf', url: null },
  { id: 'file-11', name: 'Team_Photo.jpg', mime_type: 'image/jpeg', size: 3_670_016, created_at: '2025-03-11T17:00:00.000Z', folder_id: 'f-media', extension: 'jpg', url: img('team') },
]
