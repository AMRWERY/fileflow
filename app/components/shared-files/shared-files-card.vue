<template>
  <VCard padding="none"
    class="group border border-white/[0.03] hover:border-white/10 overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
    <div class="p-6">
      <div class="flex items-start justify-between mb-6">
        <div
          :class="['w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden ring-1 ring-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105', getBgColor(file.type)]">
          <icon :name="file.icon" size="32"
            :class="[file.iconColor, 'opacity-80 group-hover:opacity-100 transition-opacity']" />
          <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div class="flex -space-s-2">
          <div class="relative group/avatar">
            <img :src="file.sharedBy.avatar" :alt="file.sharedBy.name"
              class="w-8 h-8 rounded-full border-2 border-[#121214] ring-1 ring-white/5" />
            <div
              class="absolute bottom-full start-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Shared by {{ file.sharedBy.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-1">
        <h4 class="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors">{{ file.name }}
        </h4>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-bold text-gray-600 tracking-tighter">{{ file.type }} • {{ file.size
          }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-800" />
          <span class="text-[10px] font-bold text-indigo-400/60 tracking-widest">{{ file.permissions }}</span>
        </div>
      </div>
    </div>

    <div class="px-6 py-4 bg-white/[0.02] border-t border-white/[0.03] flex items-center justify-between">
      <span class="text-[10px] font-bold text-gray-500 tracking-tight">{{ file.sharedAt }}</span>
      <div
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <button class="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
          <icon name="ph:download-simple-bold" size="14" />
        </button>
        <button class="p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
          <icon name="ph:dots-three-bold" size="14" />
        </button>
      </div>
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import type { SharedFile } from '~/types/shared-files'

defineProps<{
  file: SharedFile
}>()

const getBgColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'figma': return 'from-purple-900/40 to-indigo-900/40'
    case 'pdf': return 'from-rose-900/40 to-red-900/40'
    case 'video': return 'from-slate-900/40 to-black/40'
    case 'image': return 'from-emerald-900/40 to-teal-900/40'
    case 'png': return 'from-blue-900/40 to-indigo-900/40'
    case 'jpg': return 'from-orange-900/40 to-amber-900/40'
    default: return 'from-gray-800 to-gray-900'
  }
}
</script>