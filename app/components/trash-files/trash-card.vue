<template>
  <VCard padding="none"
    class="group h-full flex flex-col border-white/[0.03] hover:border-white/10 transition-all duration-300 cursor-default shadow-lg hover:shadow-2xl overflow-hidden !rounded-2xl">
    <!-- Thumbnail Area -->
    <div class="aspect-[2/3] bg-[#0e0e11] flex items-center justify-center relative overflow-hidden shrink-0">
      <!-- Image Preview with grayscale/dim effect for trash -->
      <template v-if="item.type === 'image' && item.previewUrl">
        <img :src="item.previewUrl"
          class="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-50 transition-opacity duration-500"
          alt="preview" />
      </template>

      <!-- Standard File Icon -->
      <template v-else>
        <div
          :class="['w-24 h-24 rounded-[32px] flex items-center justify-center bg-opacity-5 mb-2', iconBgClass(item.type)]">
          <icon :name="getFileIcon(item.type)" size="56"
            :class="[getIconColor(item.type), 'opacity-40 group-hover:opacity-70 transition-opacity']" />
        </div>
      </template>

      <!-- Quick Action Overlay (Visible on hover) -->
      <div
        class="absolute inset-0 bg-[#0a0a0c]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-5 transition-all duration-300 backdrop-blur-[2px]">
        <button @click="$emit('restore', item.id)"
          class="p-4 bg-indigo-600/90 rounded-[20px] hover:bg-indigo-500 transition-all hover:scale-110 active:scale-95 shadow-2xl"
          title="Restore">
          <icon name="ph:arrow-counter-clockwise-bold" size="28" class="text-white" />
        </button>
        <button @click="$emit('delete-permanently', item.id)"
          class="p-4 bg-red-900/90 rounded-[20px] hover:bg-red-800 transition-all hover:scale-110 active:scale-95 shadow-2xl"
          title="Delete Permanently">
          <icon name="ph:trash-bold" size="28" class="text-white" />
        </button>
      </div>
    </div>

    <!-- Item Info -->
    <div class="p-8 bg-[#161619]/50 border-t border-white/[0.02] flex-1 flex flex-col justify-center">
      <h3 class="text-lg font-bold text-white truncate mb-2.5 tracking-tight">{{ item.name }}</h3>
      <p class="text-xs font-black text-gray-500 tracking-[0.2em] opacity-60">
        Deleted {{ item.deletedTime }}
      </p>
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import type { TrashItem } from '@/types/trash'
import { getFileIcon, getIconColor, iconBgClass } from '@/utils/all-file-icons'

defineProps<{
  item: TrashItem
}>()

defineEmits<{
  restore: [id: number]
  'delete-permanently': [id: number]
}>()
</script>