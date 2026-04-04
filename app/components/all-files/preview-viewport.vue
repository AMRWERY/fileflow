<template>
  <div class="flex-1 flex flex-col min-h-0">
    <!-- Scrollable preview (min-h-0 so flex child can shrink; no overflow-hidden hiding the toolbar) -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-10 min-h-0 overflow-auto">
      <div
        class="relative w-full max-w-4xl rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-200 ease-out origin-center"
        :style="{ transform: `scale(${zoom / 100})` }">
        <div class="aspect-square w-full overflow-hidden rounded-2xl bg-[#0a0a0c]">
          <img :src="previewUrl" class="w-full h-full object-contain" alt="Preview" />
        </div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-center px-4">
            <h2 class="text-2xl font-bold text-white mb-2 tracking-tighter drop-shadow-lg">{{ title }}</h2>
            <p class="text-[10px] tracking-[0.3em] text-gray-400 drop-shadow-md">{{ subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Zoom bar: flex footer so it’s always visible (not clipped by overflow-hidden) -->
    <div class="shrink-0 flex justify-center py-3 px-4 bg-[#0a0a0c]/95 backdrop-blur-md border-t border-white/5 z-30">
      <div
        class="inline-flex items-center gap-4 bg-[#1c1c1f]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 shadow-2xl text-gray-400">
        <button type="button" class="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Zoom out" @click="zoom = Math.max(25, zoom - 5)">
          <icon name="ph:minus-bold" size="14" />
        </button>
        <span class="text-[11px] font-bold w-11 text-center text-white tabular-nums">{{ zoom }}%</span>
        <button type="button" class="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Zoom in" @click="zoom = Math.min(200, zoom + 5)">
          <icon name="ph:plus-bold" size="14" />
        </button>
        <div class="w-px h-4 bg-white/10" />
        <button type="button" class="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Reset zoom" @click="zoom = 100">
          <icon name="ph:corners-out-bold" size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  previewUrl: string
  title: string
  subtitle: string
}>()

const zoom = defineModel<number>('zoom', { default: 100 })
</script>