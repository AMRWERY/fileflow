<template>
  <div class="mb-10">
    <!-- Top Navigation Bar -->
    <header class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <VButton variant="secondary" size="sm"
          class="!p-2 !rounded-lg !bg-transparent hover:!bg-white/5 !border-white/5 shadow-none"
          @click="$router.back()">
          <icon name="ph:arrow-left-bold" size="18" />
        </VButton>
        <VBreadcrumb :items="breadcrumbItems" />
      </div>

      <div class="flex items-center gap-3">
        <VSearchInput
          v-model="searchQuery"
          wrapper-class="w-56 shrink-0"
          :placeholder="searchPlaceholder ?? 'Search…'"
          icon="ph:funnel-duotone"
          input-class="!bg-[#121214] !border-white/5 !rounded-xl !py-2"
          aria-label="Filter folder"
        />
        <VButton variant="secondary" size="sm"
          class="flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-sm !font-semibold">
          Name
          <icon name="ph:arrow-up-bold" size="14" />
        </VButton>
        <div class="flex items-center bg-[#121214] border border-white/5 rounded-xl p-1">
          <button class="p-1.5 rounded-lg transition-colors"
            :class="viewMode === 'grid' ? 'bg-white/5 text-indigo-400' : 'text-gray-600 hover:text-gray-400'"
            @click="viewMode = 'grid'">
            <icon name="ph:grid-four-fill" size="18" />
          </button>
          <button class="p-1.5 rounded-lg transition-colors"
            :class="viewMode === 'list' ? 'bg-white/5 text-indigo-400' : 'text-gray-600 hover:text-gray-400'"
            @click="viewMode = 'list'">
            <icon name="ph:list-bold" size="18" />
          </button>
        </div>
      </div>
    </header>

    <!-- Folder Title & Stats -->
    <div class="mb-4">
      <h1 class="text-4xl font-bold mb-2">{{ title }}</h1>
      <p class="text-sm text-gray-500 font-medium tracking-widest">
        {{ itemsCount }} items • {{ totalSize }} total
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

defineProps<{
  title: string
  itemsCount: number | string
  totalSize: string
  breadcrumbItems: BreadcrumbItem[]
  searchPlaceholder?: string
}>()

const searchQuery = ref('')
const viewMode = defineModel<'grid' | 'list'>('viewMode', { default: 'grid' })
</script>