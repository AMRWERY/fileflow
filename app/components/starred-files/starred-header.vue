<template>
  <header class="flex justify-between items-start mb-16 relative z-10">
    <div class="space-y-4">
      <VBreadcrumb :items="breadcrumbItems" />

      <div>
        <h1 class="text-4xl font-bold mb-2 tracking-tight">{{ title }}</h1>
        <p class="text-gray-500 font-medium">{{ subtitle }}</p>
      </div>
    </div>

    <div class="flex flex-col items-end gap-6">
      <!-- Controls -->
      <div class="flex items-center gap-3">
        <div class="flex items-center bg-[#121214] border border-white/5 rounded-xl p-1 shadow-sm">
          <button @click="viewMode = 'grid'" :class="[
            'p-2 rounded-lg transition-all',
            viewMode === 'grid' ? 'bg-white/5 text-indigo-400 shadow-inner' : 'text-gray-600 hover:text-gray-400'
          ]">
            <icon name="ph:grid-four-fill" size="18" />
          </button>
          <button @click="viewMode = 'list'" :class="[
            'p-2 rounded-lg transition-all',
            viewMode === 'list' ? 'bg-white/5 text-indigo-400 shadow-inner' : 'text-gray-600 hover:text-gray-400'
          ]">
            <icon name="ph:list-bold" size="18" />
          </button>
        </div>

        <VButton variant="secondary" size="sm"
          class="!px-4 !py-2.5 !rounded-xl !text-xs !font-bold flex items-center gap-2">
          <icon name="ph:funnel-bold" size="16" />
          Filter
        </VButton>

        <VButton variant="secondary" size="sm"
          class="!px-4 !py-2.5 !rounded-xl !text-xs !font-bold flex items-center gap-2">
          <icon name="ph:sort-ascending-bold" size="16" />
          Newest First
        </VButton>
      </div>

      <!-- Avatar Group -->
      <div class="flex items-center -space-s-3">
        <template v-for="(avatar, i) in avatars" :key="i">
          <div class="group relative">
            <img :src="avatar.src"
              class="w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-indigo-900 shadow-lg cursor-pointer transform hover:translate-y-[-2px] transition-all"
              :alt="avatar.name" />
          </div>
        </template>
        <div
          class="w-8 h-8 rounded-full border-2 border-[#0a0a0c] bg-[#1c1c1f] flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-lg">
          +12
        </div>
      </div>
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

const viewMode = ref<'grid' | 'list'>('grid')

const avatars = [
  { name: 'Sarah', src: '/svg/sara-avatar.svg' },
  { name: 'Alex', src: '/svg/alex-avatar.svg' },
]
</script>