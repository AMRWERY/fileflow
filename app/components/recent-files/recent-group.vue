<template>
  <div class="mb-12">
    <div class="flex items-center gap-6 mb-8 group/header">
      <h3
        class="text-[10px] font-black text-white/40 tracking-[0.25em] shrink-0 group-hover/header:text-white/80 transition-colors">
        {{ label }}
      </h3>
      <div class="h-px flex-1 bg-white/[0.03] group-hover/header:bg-white/[0.08] transition-colors"></div>
    </div>

    <div :class="[
      'grid gap-6',
      viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-1'
    ]">
      <recent-card v-for="file in files" :key="file.id" :file="file" :variant="viewMode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecentFile } from '@/types/recent'

defineProps<{
  label: string
  files: RecentFile[]
  viewMode: 'grid' | 'list'
}>()
</script>