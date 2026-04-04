<template>
  <header class="flex items-start justify-between mb-12">
    <div class="space-y-4 shrink-0">
      <VBreadcrumb :items="breadcrumbItems" />
      <div>
        <h1 class="text-3xl font-bold mb-2 tracking-tight text-white">{{ title }}</h1>
        <p class="text-gray-500 text-sm font-medium">{{ subtitle }}</p>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- View Layout Toggle -->
      <div class="flex items-center bg-[#121214] border border-white/5 rounded-xl p-1 shadow-sm">
        <button @click="viewMode = 'grid'" :class="[
          'p-2 rounded-lg transition-all',
          viewMode === 'grid' ? 'bg-white/5 text-indigo-400 shadow-inner' : 'text-gray-600 hover:text-gray-400'
        ]" title="Grid View">
          <icon name="ph:grid-four-fill" size="18" />
        </button>
        <button @click="viewMode = 'list'" :class="[
          'p-2 rounded-lg transition-all',
          viewMode === 'list' ? 'bg-white/5 text-indigo-400 shadow-inner' : 'text-gray-600 hover:text-gray-400'
        ]" title="List View">
          <icon name="ph:list-bold" size="18" />
        </button>
      </div>

      <!-- Sort Toggle -->
      <VButton variant="secondary" size="sm"
        class="!px-5 !py-2.5 !rounded-xl !text-xs !font-bold flex items-center gap-3 !bg-[#121214] !border-white/5 hover:!bg-white/5 group"
        @click="isRecentlyModified = !isRecentlyModified">
        <span class="text-gray-300">Last modified</span>
        <icon name="ph:caret-down-bold" size="14" :class="[
          'transition-transform duration-300',
          isRecentlyModified ? 'rotate-180 text-indigo-400' : 'opacity-40 text-gray-500'
        ]" />
      </VButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

defineProps<{
  title: string
  subtitle: string
  breadcrumbItems: BreadcrumbItem[]
}>()

const viewMode = defineModel<'grid' | 'list'>('viewMode', { default: 'grid' })
const isRecentlyModified = ref(false)
</script>