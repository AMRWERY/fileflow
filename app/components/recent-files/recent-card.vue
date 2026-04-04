<template>
  <VCard :padding="variant === 'list' ? 'sm' : 'none'" :class="[
    'group cursor-pointer transition-all duration-300 border-white/[0.03] hover:border-white/10 shadow-lg hover:shadow-2xl overflow-hidden h-full',
    variant === 'list'
      ? 'flex items-center gap-6 !rounded-[20px] hover:bg-white/[0.03]'
      : 'flex flex-col !rounded-[24px]'
  ]">
    <!-- Thumbnail Area -->
    <div :class="[
      'bg-[#0e0e11] relative overflow-hidden flex items-center justify-center shrink-0 transition-all duration-500',
      variant === 'list' ? 'w-24 aspect-square rounded-[16px]' : 'aspect-[1.4/1] w-full border-b border-white/[0.02]'
    ]">
      <!-- Image Preview -->
      <img v-if="file.type === 'image' && file.imageUrl" :src="file.imageUrl"
        class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <!-- Icon Placeholder -->
      <div v-else
        class="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-110">
        <Icon v-if="file.type === 'doc'" name="ph:file-doc-duotone" :size="variant === 'list' ? 32 : 56"
          class="text-indigo-400 drop-shadow-lg" />
        <Icon v-if="file.type === 'folder'" name="ph:folder-duotone" :size="variant === 'list' ? 32 : 56"
          class="text-amber-400 drop-shadow-lg" />
      </div>

      <!-- Status Badge (Only in Grid Mode) -->
      <div v-if="variant === 'grid'" :class="statusStyles"
        class="absolute bottom-3 end-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black tracking-widest backdrop-blur-md shadow-xl transition-all group-hover:scale-105">
        <Icon name="ph:circle-fill" size="6" class="animate-pulse" />
        {{ file.status }}
      </div>
    </div>

    <!-- File Info -->
    <div :class="[
      'flex-1 min-w-0 flex flex-col justify-center',
      variant === 'list' ? 'flex items-center justify-between gap-8' : 'p-6'
    ]">
      <div class="min-w-0 flex-1">
        <h4 :class="[
          'font-bold text-gray-300 group-hover:text-white transition-colors truncate tracking-tight',
          variant === 'list' ? 'text-base mb-0' : 'text-sm mb-2'
        ]">
          {{ file.name }}
        </h4>
        <p v-if="variant === 'grid'"
          class="text-[11px] text-gray-600 font-black tracking-[0.05em] flex items-center gap-2">
          <span class="text-gray-500 font-bold text-[10px]">{{ file.status }} {{ file.time }}</span>
          <span class="w-1 h-1 rounded-full bg-gray-800"></span>
          <span class="text-[10px]">{{ file.size }}</span>
        </p>
        <p v-else class="text-xs text-gray-500 font-medium tracking-tight">
          {{ file.size }} • {{ file.time }}
        </p>
      </div>

      <!-- Extended Info for List Mode -->
      <div v-if="variant === 'list'" class="flex items-center gap-12 shrink-0 pe-2">
        <div
          :class="[statusStyles, 'px-4 py-1.5 rounded-full border text-[10px] font-black tracking-widest']">
          {{ file.status }}
        </div>
        <div class="text-gray-600 text-xs font-bold w-24 text-end tabular-nums">
          {{ file.time }}
        </div>
      </div>
    </div>
  </VCard>
</template>

<script lang="ts" setup>
import type { RecentFile } from '@/types/recent'

const props = withDefaults(defineProps<{
  file: RecentFile
  variant?: 'grid' | 'list'
}>(), {
  variant: 'grid'
})

const statusStyles = computed(() => {
  const styles: Record<string, string> = {
    'Modified': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20',
    'Uploaded': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
    'Viewed': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
    'Shared': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
    'Most Recent': 'bg-blue-900/40 text-blue-300 border-blue-700/30',
  };
  return styles[props.file.status] || 'bg-gray-500/20 text-gray-400';
});
</script>