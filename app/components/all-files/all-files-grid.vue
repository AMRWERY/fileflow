<template>
  <div :class="view === 'list'
    ? 'flex flex-col gap-3'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
    ">
    <all-files-card v-for="file in files" :key="file.id" :file="file" :variant="view"
      @toggle="$emit('toggle', $event)" />
  </div>
</template>

<script lang="ts" setup>
import type { FileItem } from '@/types/all-files'

withDefaults(
  defineProps<{
    files: FileItem[]
    view?: 'grid' | 'list'
  }>(),
  { view: 'grid' }
)

defineEmits<{ toggle: [id: number] }>()
</script>