<template>
  <section class="mb-12">
    <div class="flex items-center gap-6 mb-8 group/header">
      <h3
        class="text-[10px] font-black text-gray-600 tracking-[0.25em] shrink-0 group-hover/header:text-gray-400 transition-colors">
        Folders
      </h3>
      <div class="h-px flex-1 bg-white/[0.03] group-hover/header:bg-white/[0.08] transition-colors"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <VCard v-for="folder in folders" :key="folder.id" padding="sm"
        class="border border-white/[0.03] hover:border-white/10 group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 !rounded-[24px]">
        <div
          class="w-12 h-12 rounded-[18px] bg-white/[0.01] border border-white/[0.03] flex items-center justify-center mb-6 group-hover:bg-white/[0.03] transition-colors">
          <icon name="ph:folder-duotone" size="32"
            :class="[folder.color, 'opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500']" />
        </div>
        <h4 class="text-base font-bold text-gray-300 group-hover:text-white transition-colors tracking-tight">{{
          folder.name }}</h4>
        <p class="text-[10px] font-black text-gray-600 tracking-widest mt-2">{{ folder.count }} items</p>
      </VCard>

      <!-- Add Folder CTA -->
      <button
        class="border-2 border-dashed border-white/5 rounded-[24px] p-6 flex flex-col items-center justify-center group cursor-pointer hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 aspect-square sm:aspect-auto">
        <icon name="ph:plus-circle-duotone" size="32"
          class="text-gray-700 group-hover:text-indigo-400 transition-all duration-500 transform group-hover:rotate-90" />
        <span
          class="text-[10px] font-black text-gray-600 tracking-widest mt-4 group-hover:text-gray-400 transition-colors">Create
          Folder</span>
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Folder } from '~/types/personal-space'

defineProps<{
  folders: Folder[]
}>()
</script>