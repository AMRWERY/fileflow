<template>
  <section>
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-6 group/header">
        <h3
          class="text-[10px] font-black text-gray-600 tracking-[0.25em] shrink-0 group-hover/header:text-gray-400 transition-colors">
          Files
        </h3>
        <div class="h-px w-24 bg-white/[0.03] group-hover/header:bg-white/[0.08] transition-colors"></div>
      </div>

      <div class="flex items-center gap-4">
        <!-- View Toggle -->
        <div class="flex items-center bg-[#121214] border border-white/5 rounded-xl p-1 shadow-inner">
          <button @click="viewMode = 'grid'" :class="[
            'p-1.5 rounded-lg transition-all duration-300',
            viewMode === 'grid' ? 'bg-indigo-500/10 text-indigo-400 shadow-sm' : 'text-gray-600 hover:text-gray-400'
          ]">
            <icon name="ph:grid-four-fill" size="18" />
          </button>
          <button @click="viewMode = 'list'" :class="[
            'p-1.5 rounded-lg transition-all duration-300',
            viewMode === 'list' ? 'bg-indigo-500/10 text-indigo-400 shadow-sm' : 'text-gray-600 hover:text-gray-400'
          ]">
            <icon name="ph:list-bold" size="18" />
          </button>
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div
      class="flex items-center justify-between mb-8 bg-[#121214]/50 backdrop-blur-sm border border-white/[0.02] p-2 rounded-2xl">
      <div class="flex gap-2">
        <VButton v-for="filter in ['Type', 'Modified', 'Size']" :key="filter" variant="ghost" size="sm"
          class="!text-[10px] !font-black !tracking-widest !text-gray-500 hover:!text-white !bg-transparent border border-transparent hover:border-white/5 !rounded-xl transition-all">
          {{ filter }}
          <icon name="ph:caret-down-bold" size="12" class="ms-1 op-60" />
        </VButton>
      </div>

      <button
        class="flex items-center gap-2 text-[10px] font-bold text-gray-500 tracking-widest hover:text-indigo-400 transition-all px-4 py-2 rounded-xl group/sort">
        <icon name="ph:sort-ascending-bold" size="16"
          class="group-hover/sort:rotate-180 transition-transform duration-500" />
        <span>Last Opened</span>
      </button>
    </div>

    <!-- Files Container -->
    <div :class="[
      'transition-all duration-500',
      viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'flex flex-col gap-3'
    ]">
      <PersonalSpaceFileCard v-for="file in files" :key="file.id" :file="file" :variant="viewMode" />
    </div>

    <!-- Empty State -->
    <VEmptyState
      v-if="!files.length"
      title="No files in this space"
      description="Encryption is active. Uploaded files will be stored in your private vault."
      icon="ph:lock-key-duotone"
    />
  </section>
</template>

<script lang="ts" setup>
import type { FileItem } from '~/types/personal-space'

defineProps<{
  files: FileItem[]
}>()

const viewMode = ref<'grid' | 'list'>('grid')
</script>