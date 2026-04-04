<template>
  <div>
    <personal-space-header title="My Personal Space" subtitle="Your private encrypted vault — only visible to you"
      :breadcrumb-items="breadcrumbItems" />

    <personal-space-stats :file-count="247" :folder-count="18" used-storage="2.3 GB" total-storage="5 GB"
      :storage-percentage="46" />

    <personal-space-folders :folders="folders" />

    <personal-space-files :files="files" />
  </div>
</template>

<script lang="ts" setup>
import type { Folder, FileItem } from '~/types/personal-space'

const folders = ref<Folder[]>([
  { id: 1, name: 'Q4 Strategy', count: 42, color: 'text-indigo-500' },
  { id: 2, name: 'Design Assets', count: 128, color: 'text-orange-500' },
  { id: 3, name: 'Financials', count: 12, color: 'text-purple-500' },
  { id: 4, name: 'Personal', count: 65, color: 'text-gray-400' },
]);

const files = ref<FileItem[]>([
  { id: 1, name: 'Brand_Guidelines_v2.png', size: '2.4 MB', date: 'Oct 12, 2023', type: 'png', icon: 'ph:image-duotone', iconColor: 'text-indigo-400' },
  { id: 2, name: 'Project_Contract_Final.pdf', size: '452 KB', date: 'Oct 11, 2023', type: 'pdf', icon: 'ph:file-pdf-duotone', iconColor: 'text-orange-400' },
  { id: 3, name: 'Website_Mockup_V4.jpg', size: '11 MB', date: 'Oct 09, 2023', type: 'jpg', icon: 'ph:image-duotone', iconColor: 'text-rose-400' },
  { id: 4, name: 'Financial_Report_Q3.sheet', size: '85 KB', date: 'Oct 08, 2023', type: 'sheet', icon: 'ph:table-duotone', iconColor: 'text-emerald-400' },
]);

const breadcrumbItems = [
  { label: 'FileFlow', to: '/' },
  { label: 'Spaces', to: '/dashboard' },
  { label: 'Personal Space' }
]

useHead({
  titleTemplate: () => 'Personal Space',
});

definePageMeta({
  layout: 'dashboard',
})
</script>