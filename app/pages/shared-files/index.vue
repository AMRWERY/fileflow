<template>
  <div class="selection:bg-orange-500/30 min-h-screen">
    <shared-files-header title="Shared Files" subtitle="Files and folders others have shared with you"
      :breadcrumb-items="breadcrumbItems" />

    <shared-files-stats :stats="stats" />

    <shared-files-grid :files="sharedFiles" />
  </div>
</template>

<script lang="ts" setup>
import type { SharedFile, SharingStats } from '~/types/shared-files'

const breadcrumbItems = [
  { label: 'Monolith', to: '/dashboard' },
  { label: 'Shared Files' }
]

const stats = ref<SharingStats>({
  totalReceived: 124,
  activeContributors: 8,
  storageUsed: '1.8 GB',
  newThisWeek: 15
})

const sharedFiles = ref<SharedFile[]>([
  {
    id: 1,
    name: 'Brand_Assets_2024.zip',
    type: 'zip',
    size: '450 MB',
    sharedBy: { name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    sharedAt: '2 hours ago',
    permissions: 'Viewer',
    icon: 'ph:file-archive-duotone',
    iconColor: 'text-amber-400'
  },
  {
    id: 2,
    name: 'Product_Mockups_Final.fig',
    type: 'image',
    size: '1.2 GB',
    sharedBy: { name: 'David Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    sharedAt: '5 hours ago',
    permissions: 'Editor',
    icon: 'ph:figma-logo-duotone',
    iconColor: 'text-purple-400'
  },
  {
    id: 3,
    name: 'Q3_Financial_Projections.pdf',
    type: 'pdf',
    size: '2.4 MB',
    sharedBy: { name: 'Elena Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    sharedAt: 'Yesterday',
    permissions: 'Viewer',
    icon: 'ph:file-pdf-duotone',
    iconColor: 'text-rose-400'
  },
  {
    id: 4,
    name: 'Marketing_Campaign_Video.mp4',
    type: 'video',
    size: '850 MB',
    sharedBy: { name: 'Marcus Thorne', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
    sharedAt: '2 days ago',
    permissions: 'Owner',
    icon: 'ph:video-camera-duotone',
    iconColor: 'text-indigo-400'
  },
  {
    id: 5,
    name: 'User_Research_Notes.docx',
    type: 'docx',
    size: '125 KB',
    sharedBy: { name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    sharedAt: '3 days ago',
    permissions: 'Editor',
    icon: 'ph:file-text-duotone',
    iconColor: 'text-blue-400'
  },
  {
    id: 6,
    name: 'Competitive_Analysis.sheet',
    type: 'sheet',
    size: '1.8 MB',
    sharedBy: { name: 'David Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    sharedAt: '4 days ago',
    permissions: 'Viewer',
    icon: 'ph:table-duotone',
    iconColor: 'text-emerald-400'
  }
])

definePageMeta({
  layout: 'dashboard',
})
</script>