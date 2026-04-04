<template>
  <div class="selection:bg-red-500/30 flex flex-col">
    <!-- Warning Top Bar -->
    <trash-banner @empty="emptyTrash" />

    <!-- Main Content -->
    <div class="p-7 max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
      <!-- Header -->
      <trash-header title="Trash" subtitle="Review and restore items before they are permanently purged."
        :breadcrumb-items="breadcrumbItems" />

      <!-- Trash Grid -->
      <trash-grid v-if="trashItems.length > 0" :items="trashItems" @restore="restoreItem"
        @delete-permanently="deletePermanently" />

      <!-- Empty State -->
      <trash-empty-state v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TrashItem } from '@/types/trash'

const trashItems = ref<TrashItem[]>([
  { id: 1, name: 'old_draft.docx', type: 'doc', deletedTime: '2 days ago' },
  { id: 2, name: 'temp_image.png', type: 'image', deletedTime: '5 days ago' },
  { id: 3, name: 'legacy_assets.zip', type: 'zip', deletedTime: '1 week ago' },
  { id: 4, name: 'unsupported_clip.mp4', type: 'video', deletedTime: '12 days ago' },
  { id: 5, name: 'q3_projections_final.xlsx', type: 'sheet', deletedTime: '15 days ago' },
  { id: 6, name: 'contract_v1_old.pdf', type: 'pdf', deletedTime: '18 days ago' },
  { id: 7, name: 'mockup_unused.jpg', type: 'image', deletedTime: '22 days ago' },
  { id: 8, name: 'meeting_notes_2023.txt', type: 'text', deletedTime: '25 days ago' },
]);

const emptyTrash = () => {
  if (confirm('Are you sure you want to permanently delete all items?')) {
    trashItems.value = [];
  }
};

const restoreItem = (id: number) => {
  trashItems.value = trashItems.value.filter(item => item.id !== id);
  // In a real app, we'd call an API here
};

const deletePermanently = (id: number) => {
  if (confirm('Are you sure you want to permanently delete this item?')) {
    trashItems.value = trashItems.value.filter(item => item.id !== id);
  }
};

const breadcrumbItems = [
  { label: 'Monolith', to: '/dashboard' },
  { label: 'Trash' }
]

definePageMeta({
  layout: 'dashboard',
})
</script>