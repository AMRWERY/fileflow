<template>
  <section>
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em] shrink-0">Recent Files</h3>

      <!-- View Toggle -->
      <div class="flex items-center bg-[#121214] border border-white/5 rounded-xl p-1 shadow-inner shrink-0">
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

    <div :class="[
      'grid gap-6',
      viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
    ]">
      <VCard v-for="file in files" :key="file.n" padding="none" :class="[
        'group border border-white/[0.03] hover:border-white/10 overflow-hidden transition-all duration-300 p-4',
        viewMode === 'list' ? 'flex flex-row items-center gap-6 py-3' : 'flex flex-col'
      ]">

        <div :class="[
          file.bg,
          'rounded-xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden ring-1 ring-white/5 shrink-0 transition-transform duration-500',
          viewMode === 'list' ? 'w-16 h-16 mb-0' : 'aspect-[1.5/1] w-full mb-4'
        ]">
          <icon v-if="file.t === 'FIGMA'" name="ph:figma-logo-duotone" :size="viewMode === 'list' ? 28 : 44"
            class="text-white/20 group-hover:scale-110 transition-transform group-hover:rotate-6" />
          <icon v-if="file.t === 'PDF'" name="ph:file-pdf-duotone" :size="viewMode === 'list' ? 28 : 44"
            class="text-white/20 group-hover:scale-110 transition-transform group-hover:rotate-6" />
          <icon v-if="file.t === 'VIDEO'" name="ph:video-camera-duotone" :size="viewMode === 'list' ? 28 : 44"
            class="text-white/20 group-hover:scale-110 transition-transform group-hover:rotate-6" />
        </div>

        <div :class="[
          'min-w-0 flex-1',
          viewMode === 'list' ? 'flex items-center justify-between gap-4' : ''
        ]">
          <div class="truncate">
            <h4 class="text-sm font-bold text-gray-300 truncate group-hover:text-white transition-colors mb-1">
              {{ file.n }}
            </h4>
            <p class="text-[10px] font-bold text-gray-600 tracking-tighter">
              {{ file.t }} • {{ file.s }}
            </p>
          </div>
        </div>
      </VCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TeamFile } from '~/types/team-space'

defineProps<{
  files: TeamFile[]
}>()

const viewMode = ref<'grid' | 'list'>('grid')
</script>