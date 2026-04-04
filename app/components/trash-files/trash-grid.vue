<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <trash-card v-for="item in items" :key="item.id" :item="item" @restore="$emit('restore', $event)"
      @delete-permanently="$emit('delete-permanently', $event)" />
  </div>
</template>

<script lang="ts" setup>
import type { TrashItem } from '@/types/trash'

defineProps<{
  items: TrashItem[]
}>()

defineEmits<{
  restore: [id: number]
  'delete-permanently': [id: number]
}>()
</script>