<template>
  <section class="p-6 border-b border-white/5">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em]">Versions</h3>
      <span class="px-2 py-0.5 bg-white/10 rounded text-[9px] font-black tracking-widest text-gray-400">v{{
        currentVersion }}
        Current</span>
    </div>
    <div class="space-y-4">
      <div v-for="v in versions" :key="v.id" class="flex items-center gap-4 group cursor-pointer">
        <span class="text-xs font-bold text-gray-600 group-hover:text-indigo-400 transition-colors">{{ v.id
        }}</span>
        <div class="flex-1">
          <p class="text-[11px] font-bold text-gray-400">{{ v.date }}</p>
          <p class="text-[10px] font-bold text-gray-600 tracking-tighter">{{ v.size }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  versions: { id: string, date: string, size: string }[]
  currentVersion: string | number
}>()
</script>