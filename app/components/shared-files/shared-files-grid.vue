<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em] mb-4">Shared with me</h3>
      <div class="flex items-center gap-2 bg-[#121214] border border-white/5 rounded-xl p-1 shadow-inner">
        <button v-for="mode in ['grid', 'list']" :key="mode" @click="viewMode = mode as 'grid' | 'list'" :class="[
          'p-1.5 rounded-lg transition-all duration-300',
          viewMode === mode ? 'bg-indigo-500/10 text-indigo-400 shadow-sm' : 'text-gray-600 hover:text-gray-400'
        ]">
          <icon :name="mode === 'grid' ? 'ph:grid-four-fill' : 'ph:list-bold'" size="18" />
        </button>
      </div>
    </div>

    <div v-if="files.length > 0" :class="[
      'grid gap-8',
      viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
    ]">
      <shared-files-card v-for="file in files" :key="file.id" :file="file" />
    </div>

    <!-- Empty State -->
    <VEmptyState
      v-else
      title="No shared files"
      description="Files and folders others have shared with you will appear here."
      icon="ph:users-three-duotone"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SharedFile } from '~/types/shared-files'

defineProps<{
  files: SharedFile[]
}>()

const viewMode = ref<'grid' | 'list'>('grid')
</script>