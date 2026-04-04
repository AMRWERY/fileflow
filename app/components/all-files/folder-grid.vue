<template>
  <div :class="[
    view === 'list' ? 'flex flex-col gap-3' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'
  ]">
    <all-files-card v-for="file in files" :key="file.id" :file="file" :variant="view"
      @toggle="$emit('toggle-selection', $event)" />
  </div>
</template>

<script lang="ts" setup>
import type { FileItem } from '@/types/all-files'

defineProps<{
  files: FileItem[]
  view?: 'grid' | 'list'
}>()

defineEmits<{
  'toggle-selection': [id: number]
}>()
</script>