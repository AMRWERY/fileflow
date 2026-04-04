<template>
  <section class="mb-12">
    <h3 class="text-[10px] font-black text-gray-600 tracking-[0.2em] mb-6">Folders</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <VCard v-for="f in folders" :key="f.name" padding="none"
        class="border border-white/[0.03] hover:border-white/10 p-6 group cursor-pointer transition-all duration-300">
        <icon name="ph:folder-fill" size="28"
          class="text-indigo-400 mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        <h4 class="text-base font-bold text-gray-200">{{ f.name }}</h4>
        <p class="text-[10px] font-bold text-gray-600 tracking-tighter mt-1">{{ f.items }} items • {{ f.size }}</p>
      </VCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { TeamFolder } from '~/types/team-space'

defineProps<{
  folders: TeamFolder[]
}>()
</script>