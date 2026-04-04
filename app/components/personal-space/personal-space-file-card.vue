<template>
  <VCard padding="none" :class="[
    'group bg-[#121214] border border-white/[0.03] hover:border-white/10 rounded-[24px] overflow-hidden transition-all duration-300 p-4 relative',
    variant === 'list' ? 'flex items-center gap-6 py-3' : 'flex flex-col'
  ]">
    <div :class="[
      'bg-[#0e0e11] rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 transition-transform duration-500',
      variant === 'list' ? 'w-16 h-16' : 'aspect-[2/3] w-full mb-0'
    ]">
      <!-- Image Mock Gradient -->
      <div v-if="file.type === 'png' || file.type === 'jpg'"
        class="absolute inset-0 opacity-20 bg-gradient-to-br from-indigo-500/20 via-transparent to-black/40 group-hover:opacity-40 transition-opacity duration-700">
      </div>


      <icon :name="file.icon" :size="variant === 'list' ? 28 : 56"
        :class="[file.iconColor, 'z-10 group-hover:scale-110 transition-transform duration-500 transform group-hover:rotate-6']" />


      <div
        class="absolute bottom-4 start-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black tracking-[0.1em] text-gray-300">
        {{ file.type }}
      </div>
    </div>

    <div :class="[
      'flex items-center justify-between min-w-0 transition-all duration-300',
      variant === 'list' ? 'flex-1 p-0' : 'w-full p-8 bg-[#161619]/30 flex-1'
    ]">
      <div class="overflow-hidden flex-1 group/text">
        <h4 :class="[
          'font-bold text-gray-200 truncate group-hover:text-white transition-colors tracking-tight',
          variant === 'list' ? 'text-base mb-0' : 'text-lg mb-2.5'
        ]">{{ file.name }}</h4>
        <p class="text-[10px] font-black text-gray-500 tracking-[0.2em] opacity-60">{{ file.size }} • {{
          file.date }}</p>
      </div>
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import type { FileItem } from '~/types/personal-space'

defineProps<{
  file: FileItem
  variant?: 'grid' | 'list'
}>()
</script>