<template>
  <div class="p-6 max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
    <!-- Top Header & Controls -->
    <recent-header title="Recent" v-model:view-mode="viewMode" subtitle="Files you've accessed, uploaded, or modified"
      :breadcrumb-items="breadcrumbItems" />

    <!-- Grouped Content -->
    <recent-group v-for="group in groups" :key="group.label" :view-mode="viewMode" :label="group.label"
      :files="group.files" />
  </div>
</template>

<script lang="ts" setup>
import type { DateGroup } from '@/types/recent'

const viewMode = ref<'grid' | 'list'>('grid')

const groups = ref<DateGroup[]>([
  {
    label: 'Today',
    files: [
      { id: 1, name: 'Q4 Strategy Road...', type: 'image', status: 'Modified', time: '2h ago', size: '4.2 MB', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80' },
      { id: 2, name: 'Project_Specs_Fi...', type: 'image', status: 'Uploaded', time: '5h ago', size: '850 KB', imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80' },
      { id: 3, name: 'Hardware_Schem...', type: 'image', status: 'Viewed', time: '8h ago', size: '12.8 MB', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
      { id: 6, name: 'Budget_Overview_Q4.xlsx', type: 'image', status: 'Shared', time: '10h ago', size: '1.2 MB', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
    ]
  },
  {
    label: 'Yesterday',
    files: [
      { id: 4, name: 'Archive_2023_As...', type: 'image', status: 'Shared', time: 'yesterday', size: '141 MB', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80' },
      { id: 5, name: 'Brand_Identity_Gu...', type: 'image', status: 'Most Recent', time: 'yesterday', size: '22.4 MB', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80' },
    ]
  }
]);

const breadcrumbItems = [
  { label: 'Monolith', to: '/dashboard' },
  { label: 'Recent Files' }
]

definePageMeta({
  layout: 'dashboard',
})
</script>