<template>
  <div class="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
    <!-- Navigation Arrows -->
    <button
      class="absolute start-6 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-500 hover:text-white z-10">
      <icon name="ph:caret-left-bold" size="24" />
    </button>

    <!-- Main Content Area (Image/File) -->
    <div class="relative max-w-4xl w-full aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      <img :src="previewUrl" class="w-full h-full object-cover grayscale opacity-60" alt="Preview" />
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-2 tracking-tighter">{{ title }}</h2>
          <p class="text-[10px] tracking-[0.3em] text-gray-400">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <button
      class="absolute end-6 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-500 hover:text-white z-10">
      <icon name="ph:caret-right-bold" size="24" />
    </button>

    <!-- Pagination Dots -->
    <div class="absolute bottom-24 flex gap-2">
      <div v-for="i in 3" :key="i" :class="['w-2 h-2 rounded-full', i === 2 ? 'bg-white' : 'bg-white/20']"></div>
    </div>

    <!-- Zoom Controls -->
    <div
      class="absolute bottom-8 start-1/2 -translate-x-1/2 bg-[#1c1c1f]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-4 shadow-2xl z-20">
      <button @click="zoom -= 5" class="p-1 hover:text-white transition-colors">
        <icon name="ph:minus-bold" size="14" />
      </button>
      <span class="text-[11px] font-bold w-10 text-center text-white">{{ zoom }}%</span>
      <button @click="zoom += 5" class="p-1 hover:text-white transition-colors">
        <icon name="ph:plus-bold" size="14" />
      </button>
      <div class="w-px h-4 bg-white/10 mx-1"></div>
      <button class="p-1 hover:text-white transition-colors">
        <icon name="ph:corners-out-bold" size="16" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  previewUrl: string
  title: string
  subtitle: string
}>()

const zoom = defineModel<number>('zoom', { default: 82 })
</script>